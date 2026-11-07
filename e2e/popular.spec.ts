import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { expect, test } from "@playwright/test";

// 순수 ESM 스크립트(import.meta 사용)라 Playwright의 CJS 변환 대신 네이티브 동적 import로 불러온다
const load = () => import("../scripts/fetch-popular.mjs");
type Popular = Awaited<ReturnType<typeof load>>;
let LIMIT: Popular["LIMIT"];
let fetchHits: Popular["fetchHits"];
let readPublishedPosts: Popular["readPublishedPosts"];
let run: Popular["run"];
let selectPopular: Popular["selectPopular"];
let toPostId: Popular["toPostId"];
test.beforeAll(async () => {
  ({ LIMIT, fetchHits, readPublishedPosts, run, selectPopular, toPostId } = await load());
});

// PRD-004 5.5·G2-7: 인기글 수집. 모의 GoatCounter 서버로 요청 모양·가공·실패 처리·토큰 비노출을 검사한다.
const posts = new Map<string, string>([
  ["a", "2026-01-01"],
  ["b", "2026-02-01"],
  ["c", "2026-03-01"],
  ["d", "2026-04-01"],
  ["e", "2026-05-01"],
  ["f", "2026-06-01"],
]);

test.describe("가공 규칙", () => {
  test("경로 정규화: 끝 슬래시·쿼리, 글이 아닌 경로는 null", () => {
    expect(toPostId("/posts/a")).toBe("a");
    expect(toPostId("/posts/a/")).toBe("a");
    expect(toPostId("/posts/a?utm=1")).toBe("a");
    for (const other of ["/", "/about", "/posts/", "/posts/a/b", "", null, undefined]) {
      expect(toPostId(other as string), String(other)).toBeNull();
    }
  });

  test("존재하고 draft 아닌 글만, 조회수 내림차순, 같으면 최신 글 먼저, 최대 5편", () => {
    const hits = [
      { path: "/", count: 999 },
      { path: "/about", count: 500 },
      { path: "/posts/a", count: 10 },
      { path: "/posts/b", count: 10 },
      { path: "/posts/ghost", count: 90 }, // 없는 글(또는 draft)
      { path: "/posts/c", count: 30 },
      { path: "/posts/d", count: 20 },
      { path: "/posts/e", count: 5 },
      { path: "/posts/f", count: 1 },
    ];
    const result = selectPopular(hits, posts);
    expect(result.map((item: { id: string }) => item.id)).toEqual(["c", "d", "b", "a", "e"]); // b·a 동률 → b(더 최신) 먼저
    expect(result).toHaveLength(LIMIT);
  });

  test("같은 글의 경로 표기가 여러 개면 합치고, 0·음수·숫자가 아닌 값은 버린다", () => {
    const result = selectPopular(
      [
        { path: "/posts/a", count: 3 },
        { path: "/posts/a/", count: 4 },
        { path: "/posts/b", count: 0 },
        { path: "/posts/c", count: "x" },
      ],
      posts,
    );
    expect(result).toEqual([{ id: "a", views: 7 }]);
  });

  test("실제 posts/에서 draft는 빠진다", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "posts-"));
    fs.writeFileSync(path.join(dir, "ok.md"), '---\ndate: "2026-01-01"\n---\nx');
    fs.writeFileSync(path.join(dir, "wip.md"), '---\ndate: "2026-01-02"\ndraft: true\n---\nx');
    fs.writeFileSync(path.join(dir, "note.txt"), "x");
    expect([...readPublishedPosts(dir).keys()]).toEqual(["ok"]);
    fs.rmSync(dir, { recursive: true });
    expect(readPublishedPosts(path.resolve("posts")).size).toBeGreaterThan(5);
  });
});

// ── 모의 통계 서버
interface Mock {
  base: string;
  requests: { url: URL; auth: string | undefined }[];
  close: () => Promise<void>;
}
const startMock = async (handler: (url: URL, count: number) => { status: number; body: unknown }): Promise<Mock> => {
  const requests: Mock["requests"] = [];
  const server = http.createServer((request, response) => {
    const url = new URL(request.url!, "http://x");
    requests.push({ url, auth: request.headers.authorization });
    const { status, body } = handler(url, requests.length);
    response.writeHead(status, { "content-type": "application/json" });
    response.end(typeof body === "string" ? body : JSON.stringify(body));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as { port: number };
  return {
    base: `http://127.0.0.1:${port}`,
    requests,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
};

const sandbox = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "popular-"));
  fs.mkdirSync(path.join(root, "posts"));
  for (const [id, date] of posts) {
    fs.writeFileSync(path.join(root, "posts", `${id}.md`), `---\ndate: "${date}"\n---\nx`);
  }
  return root;
};
const quiet = { log: () => {}, warn: () => {} };
const TOKEN = "secret-token-value";

test.describe("수집 실행", () => {
  test("성공: 최근 30일 요청(Bearer 토큰, 기간·limit), 결과를 .cache/popular.json에", async () => {
    const mock = await startMock(() => ({
      status: 200,
      body: {
        hits: [
          { path_id: 1, path: "/posts/b", count: 40 },
          { path_id: 2, path: "/posts/a", count: 25 },
          { path_id: 3, path: "/", count: 900 },
        ],
        more: false,
      },
    }));
    const root = sandbox();
    const now = new Date("2026-11-07T00:00:00Z");
    const result = await run({ env: { GOATCOUNTER_TOKEN: TOKEN, GOATCOUNTER_API_BASE: mock.base }, root, now, ...quiet });
    await mock.close();

    expect(result.status).toBe("updated");
    const request = mock.requests[0];
    expect(request.auth).toBe(`Bearer ${TOKEN}`);
    expect(request.url.pathname).toBe("/api/v0/stats/hits");
    expect(request.url.searchParams.get("start")).toBe("2026-10-08");
    expect(request.url.searchParams.get("end")).toBe("2026-11-07");
    expect(request.url.searchParams.get("limit")).toBe("100");
    const saved = JSON.parse(fs.readFileSync(path.join(root, ".cache", "popular.json"), "utf8"));
    expect(saved.items).toEqual([{ id: "b", views: 40 }, { id: "a", views: 25 }]);
    expect(saved.generatedAt).toBe("2026-11-07T00:00:00.000Z");
    fs.rmSync(root, { recursive: true });
  });

  test("여러 쪽: more=true면 받은 경로를 exclude_paths로 빼고 이어 받는다", async () => {
    const mock = await startMock((url, count) =>
      count === 1
        ? { status: 200, body: { hits: [{ path_id: 11, path: "/posts/a", count: 5 }, { path_id: 12, path: "/posts/b", count: 4 }], more: true } }
        : { status: 200, body: { hits: [{ path_id: 13, path: "/posts/c", count: 3 }], more: false } },
    );
    const hits = await fetchHits({ base: mock.base, token: TOKEN, now: new Date("2026-11-07T00:00:00Z") });
    await mock.close();
    expect(hits).toHaveLength(3);
    expect(mock.requests[1].url.searchParams.get("exclude_paths")).toBe("11,12");
  });

  test("토큰 없음: 요청 없이 빈 목록을 쓴다(빌드는 성공)", async () => {
    const mock = await startMock(() => ({ status: 200, body: { hits: [] } }));
    const root = sandbox();
    const result = await run({ env: { GOATCOUNTER_API_BASE: mock.base }, root, ...quiet });
    await mock.close();
    expect(result.status).toBe("empty");
    expect(mock.requests).toHaveLength(0);
    expect(JSON.parse(fs.readFileSync(path.join(root, ".cache", "popular.json"), "utf8")).items).toEqual([]);
    fs.rmSync(root, { recursive: true });
  });

  for (const [name, handler] of [
    ["서버 500", () => ({ status: 500, body: { error: "boom" } })],
    ["권한 없음 403", () => ({ status: 403, body: { error: "forbidden" } })],
    ["JSON이 아닌 응답", () => ({ status: 200, body: "<html>" })],
    ["hits 없는 응답", () => ({ status: 200, body: { nope: true } })],
  ] as const) {
    test(`API 실패(${name}): 직전 결과를 그대로 두고 토큰은 출력하지 않는다`, async () => {
      const mock = await startMock(handler);
      const root = sandbox();
      fs.mkdirSync(path.join(root, ".cache"));
      const previous = `${JSON.stringify({ generatedAt: "old", items: [{ id: "c", views: 9 }] })}\n`;
      fs.writeFileSync(path.join(root, ".cache", "popular.json"), previous);
      const logs: string[] = [];
      const result = await run({
        env: { GOATCOUNTER_TOKEN: TOKEN, GOATCOUNTER_API_BASE: mock.base },
        root,
        log: (message: string) => logs.push(message),
        warn: (message: string) => logs.push(message),
      });
      await mock.close();
      expect(result.status).toBe("kept");
      expect(fs.readFileSync(path.join(root, ".cache", "popular.json"), "utf8")).toBe(previous);
      expect(logs.join("\n")).not.toContain(TOKEN);
      fs.rmSync(root, { recursive: true });
    });
  }

  test("API 실패 + 직전 결과도 없음: 빈 목록, 예외 없음", async () => {
    const mock = await startMock(() => ({ status: 500, body: {} }));
    const root = sandbox();
    const result = await run({ env: { GOATCOUNTER_TOKEN: TOKEN, GOATCOUNTER_API_BASE: mock.base }, root, ...quiet });
    await mock.close();
    expect(result.status).toBe("empty");
    fs.rmSync(root, { recursive: true });
  });

  test("연결 실패(서버 없음)도 예외 없이 처리한다", async () => {
    const root = sandbox();
    const result = await run({ env: { GOATCOUNTER_TOKEN: TOKEN, GOATCOUNTER_API_BASE: "http://127.0.0.1:9" }, root, ...quiet });
    expect(result.status).toBe("empty");
    fs.rmSync(root, { recursive: true });
  });

  test("명령으로 실행해도 토큰이 없으면 종료 코드 0", async () => {
    const { spawnSync } = await import("node:child_process");
    const root = sandbox();
    const result = spawnSync(process.execPath, [path.resolve("scripts/fetch-popular.mjs")], {
      cwd: root,
      env: { PATH: process.env.PATH ?? "" } as unknown as NodeJS.ProcessEnv,
      encoding: "utf8",
    });
    expect(result.status).toBe(0);
    expect(fs.existsSync(path.join(root, ".cache", "popular.json"))).toBe(true);
    fs.rmSync(root, { recursive: true });
  });
});
