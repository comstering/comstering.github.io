// `yarn build` 산출물(out/) 검사. 하나라도 어긋나면 비정상 종료한다.
//   1) 모든 글 HTML의 og:image 경로가 out/ 안에 실제로 존재
//   2) rss.xml / sitemap.xml 이 올바른 XML이고, 항목 수가 발행된 글 수와 일치(search-index.json도 글 수·모양·크기)
//   3) 산출물에 adsbygoogle 문자열이 없음 (AdSense 제거 유지)
//   4) 빌드 CSS에 무효가 된 font 단축 속성이 없음 (`font:400 var(--x),var(--y)`)
//   5) 글 본문 이미지가 모두 변환본(/_img)이고 파일이 있으며 200KB 이하, width·height 지정 (G1-5)
//   6) 홈 WebSite·About Person JSON-LD(worksFor 없음)와 홈 description 길이 80~160자 (PRD-004 5.6)
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { XMLValidator } from "fast-xml-parser";

const OUT = path.resolve(process.env.OUT_DIR ?? "out");
const SITE_URL = "https://comstering.github.io";
const errors = [];

const fail = (message) => errors.push(message);
const read = (...parts) => fs.readFileSync(path.join(OUT, ...parts), "utf8");

if (!fs.existsSync(OUT)) {
  console.error(`산출물 디렉터리가 없습니다: ${OUT} (yarn build를 먼저 실행하세요)`);
  process.exit(1);
}

// 1) og:image
const postsDir = path.join(OUT, "posts");
const postFiles = fs.readdirSync(postsDir).filter((file) => file.endsWith(".html"));
if (postFiles.length === 0) fail("out/posts 에 글 HTML이 없습니다");

// og:image는 글마다 고유한 PNG(1200×630)여야 한다 (G1-6)
const ogHashes = new Map();
const checkPng = (where, target) => {
  const bytes = fs.readFileSync(target);
  const isPng = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (!isPng) return fail(`${where}: og:image가 PNG가 아닙니다`);
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width !== 1200 || height !== 630) fail(`${where}: og:image가 ${width}×${height}입니다 (1200×630)`);
  const hash = crypto.createHash("sha256").update(bytes).digest("hex");
  if (ogHashes.has(hash)) fail(`${where}: og:image가 ${ogHashes.get(hash)}와 같습니다 (글마다 고유해야 함)`);
  else ogHashes.set(hash, where);
};

for (const file of postFiles) {
  const html = read("posts", file);
  const match = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!match) {
    fail(`posts/${file}: og:image 메타가 없습니다`);
    continue;
  }
  const url = match[1];
  if (!url.startsWith(SITE_URL)) {
    fail(`posts/${file}: og:image가 ${SITE_URL}로 시작하지 않습니다 (${url})`);
    continue;
  }
  const target = path.join(OUT, decodeURIComponent(url.slice(SITE_URL.length)));
  if (!fs.existsSync(target)) {
    fail(`posts/${file}: og:image 파일이 없습니다 (${url})`);
    continue;
  }
  checkPng(`posts/${file}`, target);
}
for (const [file, expected] of [["index.html", "/og.png"], ["about.html", "/about/og.png"]]) {
  const html = fs.existsSync(path.join(OUT, file)) ? read(file) : "";
  const url = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (url !== `${SITE_URL}${expected}`) fail(`${file}: og:image가 ${SITE_URL}${expected}여야 합니다 (${url ?? "없음"})`);
  else if (fs.existsSync(path.join(OUT, expected))) checkPng(file, path.join(OUT, expected));
  else fail(`${file}: og:image 파일이 없습니다 (${url})`);
}

// 2) XML
const countMatches = (text, regex) => (text.match(regex) ?? []).length;

const checkXml = (name, expected) => {
  if (!fs.existsSync(path.join(OUT, name))) {
    fail(`${name}: 파일이 없습니다`);
    return;
  }
  const xml = read(name);
  const result = XMLValidator.validate(xml);
  if (result !== true) {
    fail(`${name}: XML 파싱 실패 (${result.err.msg}, line ${result.err.line})`);
    return;
  }
  expected(xml);
};

checkXml("rss.xml", (xml) => {
  const items = countMatches(xml, /<item>/g);
  if (items !== postFiles.length) {
    fail(`rss.xml: 항목 ${items}개, 발행된 글 ${postFiles.length}개로 일치해야 합니다`);
  }
});

checkXml("sitemap.xml", (xml) => {
  const urls = countMatches(xml, /<url>/g);
  // 홈 + About + 글
  if (urls !== postFiles.length + 2) {
    fail(`sitemap.xml: URL ${urls}개, 글 ${postFiles.length}개 + 홈·About 2개로 일치해야 합니다`);
  }
});

// 검색 인덱스(PRD-004 5.7): 글 수와 같고, 항목 모양이 맞고, gzip 50KB(글 100편 기준 목표)를 넘지 않는다
{
  const indexPath = path.join(OUT, "search-index.json");
  if (!fs.existsSync(indexPath)) {
    fail("search-index.json: 파일이 없습니다");
  } else {
    const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    if (!Array.isArray(index) || index.length !== postFiles.length) {
      fail(`search-index.json: 항목 ${index.length}개, 발행된 글 ${postFiles.length}개로 일치해야 합니다`);
    } else if (
      index.some(
        (item) =>
          typeof item.t !== "string" ||
          typeof item.d !== "string" ||
          !Array.isArray(item.h) ||
          !String(item.u).startsWith("/posts/"),
      )
    ) {
      fail("search-index.json: 항목 모양(t, d, h, u)이 맞지 않습니다");
    }
    const gzipped = zlib.gzipSync(fs.readFileSync(indexPath)).length;
    if (gzipped > 50 * 1024) fail(`search-index.json: gzip ${Math.round(gzipped / 1024)}KB로 50KB를 넘습니다`);
  }
}

// 3) adsbygoogle
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

for (const file of walk(OUT)) {
  if (!/\.(html|js|txt|xml|css|json)$/.test(file)) continue;
  if (fs.readFileSync(file, "utf8").includes("adsbygoogle")) {
    fail(`${path.relative(OUT, file)}: adsbygoogle 가 남아 있습니다`);
  }
}

// 4) CSS 압축이 `font: 400 var(--size) var(--family)`의 var 사이에 쉼표를 끼워 넣으면
//    선언이 통째로 무효가 된다(PR-12에서 발생). font 단축 대신 font-family/size/weight를 쓴다.
const BROKEN_FONT = /font:[^;}]*\),\s*var\(/;
for (const file of walk(OUT)) {
  if (!file.endsWith(".css")) continue;
  const match = fs.readFileSync(file, "utf8").match(BROKEN_FONT);
  if (match) {
    fail(
      `${path.relative(OUT, file)}: 무효가 된 font 단축 속성이 있습니다 (${match[0]}). font-family·font-size·font-weight로 나눠 쓰세요`,
    );
  }
}

// 5) 본문 이미지(G1-5): 원본(/images/posts/contents) 대신 변환본, 용량·크기 속성 확인
const MAX_IMAGE_BYTES = 200 * 1024;
let imageCount = 0;
for (const file of postFiles) {
  const html = read("posts", file);
  const start = html.indexOf('class="prose');
  const article = html.slice(start, html.indexOf("<footer", start));
  for (const [tag] of article.matchAll(/<img\b[^>]*>/g)) {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (!src || !src.startsWith("/")) continue;
    imageCount += 1;
    const where = `posts/${file}: ${src}`;
    if (src.startsWith("/images/posts/contents/")) {
      fail(`${where}: 변환본(/_img)이 아니라 원본을 쓰고 있습니다`);
      continue;
    }
    const imagePath = path.join(OUT, decodeURIComponent(src));
    if (!fs.existsSync(imagePath)) {
      fail(`${where}: 이미지 파일이 없습니다`);
      continue;
    }
    if (src.startsWith("/_img/") && fs.statSync(imagePath).size > MAX_IMAGE_BYTES) {
      fail(`${where}: ${Math.round(fs.statSync(imagePath).size / 1024)}KB로 200KB를 넘습니다`);
    }
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) {
      fail(`${where}: width·height 속성이 없습니다 (레이아웃 이동 방지)`);
    }
  }
}

// 글꼴 서브셋: 단일 woff2가 있고 150KB 이하, 빌드 CSS가 그것을 가리킨다(조각 CSS로 되돌아가지 않았는지)
const FONT_PATH = path.join(OUT, "_font", "pretendard-subset.woff2");
if (!fs.existsSync(FONT_PATH)) {
  fail("_font/pretendard-subset.woff2 가 없습니다 (scripts/subset-font.mjs)");
} else if (fs.statSync(FONT_PATH).size > 150 * 1024) {
  fail(`글꼴 서브셋이 ${Math.round(fs.statSync(FONT_PATH).size / 1024)}KB로 150KB를 넘습니다`);
}
const cssDir = path.join(OUT, "_next", "static", "chunks");
const cssText = fs
  .readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => fs.readFileSync(path.join(cssDir, f), "utf8"))
  .join("\n");
if (!cssText.includes("/_font/pretendard-subset.woff2")) {
  fail("빌드 CSS가 글꼴 서브셋(/_font/pretendard-subset.woff2)을 참조하지 않습니다");
}

// 6) JSON-LD와 홈 description
const jsonLdOf = (html, where) => {
  const found = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return found.flatMap(([, raw]) => {
    try {
      return [JSON.parse(raw)];
    } catch {
      fail(`${where}: JSON-LD가 올바른 JSON이 아닙니다`);
      return [];
    }
  });
};

const homeHtml = read("index.html");
const webSite = jsonLdOf(homeHtml, "index.html").find((data) => data["@type"] === "WebSite");
if (!webSite) fail("index.html: WebSite JSON-LD가 없습니다");
else if (!webSite.name || !String(webSite.url).startsWith(SITE_URL)) {
  fail("index.html: WebSite JSON-LD의 name 또는 url이 올바르지 않습니다");
}

const description = homeHtml.match(/<meta name="description" content="([^"]*)"/)?.[1];
const descriptionLength = description ? [...description].length : 0;
if (descriptionLength < 80 || descriptionLength > 160) {
  fail(`index.html: description이 ${descriptionLength}자입니다 (80~160자)`);
}

const aboutHtml = read("about.html");
const profilePage = jsonLdOf(aboutHtml, "about.html").find((data) => data["@type"] === "ProfilePage");
const person = profilePage?.mainEntity;
if (person?.["@type"] !== "Person") {
  fail("about.html: ProfilePage > Person JSON-LD가 없습니다");
} else {
  for (const key of ["name", "jobTitle", "sameAs", "alumniOf", "hasCredential"]) {
    if (!person[key] || person[key].length === 0) fail(`about.html: Person.${key}가 비어 있습니다`);
  }
  if ("worksFor" in person) fail("about.html: Person.worksFor는 넣지 않습니다 (PRD-004 5.6)");
}

if (errors.length > 0) {
  console.error(`산출물 검사 실패 (${errors.length}건):`);
  for (const message of errors) console.error(`  - ${message}`);
  if (process.env.GITHUB_ACTIONS) {
    for (const message of errors) console.log(`::error::${message}`);
  }
  process.exit(1);
}
console.log(
  `산출물 검사 통과: 글 ${postFiles.length}편, og:image 고유 PNG 1200×630, rss·sitemap 유효, adsbygoogle 0건, CSS font 단축 속성 정상, 본문 이미지 ${imageCount}개 변환본·200KB 이하, 글꼴 서브셋 단일 woff2, 홈 WebSite·About Person JSON-LD, 홈 description ${descriptionLength}자`,
);
