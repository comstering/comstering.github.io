// 인기글 데이터 생성 (PRD-004 5.5, F-HM-06). 빌드 직전에 실행한다: node scripts/fetch-popular.mjs
//   GoatCounter 통계 API(`/api/v0/stats/hits`)에서 최근 30일 조회수를 받아, 존재하고 draft가 아닌 글 `/posts/<id>`만
//   조회수 내림차순(같으면 최신 글 먼저) 5편을 `.cache/popular.json`({ items: [{ id, views }] })에 쓴다. 홈 사이드바가 읽는다(src/lib/popular.ts).
//   - 토큰은 환경변수 GOATCOUNTER_TOKEN(GitHub Secrets, 권한 `Read statistics`만)에서만 읽고 로그·산출물에 남기지 않는다
//   - **빌드를 절대 실패시키지 않는다**: 토큰 없음(로컬·포크 PR)·API 실패·응답 이상이면 직전 결과(Actions 캐시가 복원한 파일)를 그대로 두고,
//     그것도 없으면 빈 목록을 쓴다 → 홈에서 popular 블록이 숨겨진다
//   - 브라우저에서는 통계 API를 부르지 않는다(이 스크립트만)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

export const WINDOW_DAYS = 30;
export const LIMIT = 5;
const PAGE_LIMIT = 100; // API가 한 번에 주는 최대 항목 수
const MAX_PAGES = 5;

/** 글 목록(draft 제외)을 읽는다: id → 날짜 */
export const readPublishedPosts = (postsDir) => {
  const posts = new Map();
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith(".md")) continue;
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
    if (data.draft === true) continue;
    posts.set(file.replace(/\.md$/, ""), String(data.date));
  }
  return posts;
};

// GoatCounter 경로("/posts/<id>", 끝 슬래시·쿼리 가능)를 글 id로. 글이 아니면 null
export const toPostId = (rawPath) => {
  const match = /^\/posts\/([^/?#]+)\/?(?:[?#].*)?$/.exec(String(rawPath ?? ""));
  return match ? decodeURIComponent(match[1]) : null;
};

/** hits: [{ path, count }], posts: Map(id → date). 같은 글의 여러 경로 표기는 합친다. */
export const selectPopular = (hits, posts, limit = LIMIT) => {
  const views = new Map();
  for (const hit of hits) {
    const id = toPostId(hit?.path);
    const count = Number(hit?.count);
    if (!id || !posts.has(id) || !Number.isFinite(count) || count <= 0) continue;
    views.set(id, (views.get(id) ?? 0) + count);
  }
  return [...views.entries()]
    .sort((a, b) => b[1] - a[1] || (posts.get(a[0]) < posts.get(b[0]) ? 1 : -1))
    .slice(0, limit)
    .map(([id, count]) => ({ id, views: count }));
};

const toDay = (date) => date.toISOString().slice(0, 10);

/** 통계 API에서 hits를 모두 받는다(100개씩, 이미 받은 경로는 exclude_paths로 빼며 이어 받는다). */
export const fetchHits = async ({ base, token, now = new Date(), fetchImpl = fetch }) => {
  const end = toDay(now);
  const start = toDay(new Date(now.getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000));
  const hits = [];
  const seen = [];
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const url = new URL(`${base}/api/v0/stats/hits`);
    url.searchParams.set("start", start);
    url.searchParams.set("end", end);
    url.searchParams.set("limit", String(PAGE_LIMIT));
    if (seen.length) url.searchParams.set("exclude_paths", seen.join(","));
    const response = await fetchImpl(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error(`통계 API가 ${response.status}를 돌려줬습니다`);
    const body = await response.json();
    if (!Array.isArray(body?.hits)) throw new Error("통계 API 응답에 hits가 없습니다");
    hits.push(...body.hits);
    for (const hit of body.hits) if (hit?.path_id != null) seen.push(hit.path_id);
    if (!body.more || body.hits.length === 0) break;
  }
  return hits;
};

const writeAtomic = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
};

/**
 * 결과를 돌려주되 절대 throw하지 않는다. status: "updated" | "kept" | "empty"
 * @param {{
 *   env?: Record<string, string | undefined>,
 *   root?: string,
 *   now?: Date,
 *   fetchImpl?: typeof fetch,
 *   log?: (message: string) => void,
 *   warn?: (message: string) => void,
 * }} [options]
 */
export const run = async ({
  env = process.env,
  root = process.cwd(),
  now = new Date(),
  fetchImpl = fetch,
  log = (message) => console.log(message),
  warn = (message) => console.warn(message),
} = {}) => {
  const out = path.join(root, ".cache", "popular.json");
  const fallback = () => {
    if (fs.existsSync(out)) {
      log("인기글: 직전 결과(.cache/popular.json)를 그대로 씁니다");
      return { status: "kept" };
    }
    writeAtomic(out, `${JSON.stringify({ generatedAt: null, items: [] }, null, 2)}\n`);
    log("인기글: 데이터가 없어 빈 목록을 씁니다(홈에서 popular 블록이 숨겨집니다)");
    return { status: "empty" };
  };

  const token = env.GOATCOUNTER_TOKEN;
  if (!token) {
    log("인기글: GOATCOUNTER_TOKEN이 없어 통계를 받지 않습니다(로컬·포크 PR)");
    return fallback();
  }
  try {
    const site = env.GOATCOUNTER_SITE || "comstering";
    const base = env.GOATCOUNTER_API_BASE || `https://${site}.goatcounter.com`;
    const hits = await fetchHits({ base, token, now, fetchImpl });
    const posts = readPublishedPosts(path.join(root, "posts"));
    const items = selectPopular(hits, posts);
    writeAtomic(out, `${JSON.stringify({ generatedAt: now.toISOString(), items }, null, 2)}\n`);
    log(`인기글: 최근 ${WINDOW_DAYS}일 ${items.length}편 (${items.map((item) => `${item.id}:${item.views}`).join(", ") || "없음"})`);
    return { status: "updated", items };
  } catch (error) {
    // 토큰이 메시지에 섞이지 않도록 요청 자체의 정보는 쓰지 않고 원인만 남긴다
    const reason = error instanceof Error ? error.message : "알 수 없는 오류";
    warn(`인기글: 통계를 받지 못했습니다 (${reason})`);
    if (env.GITHUB_ACTIONS) console.log(`::warning::인기글: 통계를 받지 못했습니다 (${reason})`);
    return fallback();
  }
};

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  await run();
  process.exit(0); // 어떤 경우에도 빌드를 막지 않는다
}
