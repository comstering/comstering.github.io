// `yarn build` 산출물(out/) 검사. 하나라도 어긋나면 비정상 종료한다.
//   1) 모든 글 HTML의 og:image 경로가 out/ 안에 실제로 존재
//   2) rss.xml / sitemap.xml 이 올바른 XML이고, 항목 수가 발행된 글 수와 일치
//   3) 산출물에 adsbygoogle 문자열이 없음 (AdSense 제거 유지)
import fs from "node:fs";
import path from "node:path";
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
  }
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

if (errors.length > 0) {
  console.error(`산출물 검사 실패 (${errors.length}건):`);
  for (const message of errors) console.error(`  - ${message}`);
  if (process.env.GITHUB_ACTIONS) {
    for (const message of errors) console.log(`::error::${message}`);
  }
  process.exit(1);
}
console.log(
  `산출물 검사 통과: 글 ${postFiles.length}편, og:image 존재, rss·sitemap 유효, adsbygoogle 0건`,
);
