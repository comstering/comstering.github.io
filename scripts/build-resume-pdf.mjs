// resume.pdf 생성 (PRD-004 5.3, 디자인 25번 3장·32번 "인쇄").
//   `yarn build` 뒤에 실행한다: out/ 의 /about 을 print 미디어 A4로 인쇄해 out/resume.pdf 를 만든다.
//   별도 공개 페이지는 없고, About과 같은 데이터(content/*.yaml)에서 나온다. 인쇄 규칙은 globals.css 의 @media print.
//   실패하면 종료 코드 1 → 배포를 막는다(About과 PDF가 어긋나지 않게).
//   확인하는 것(G2-6): 파일 크기 ≤ 1MB, 쪽 수 ≤ MAX_PAGES, 라이트 배경, 직함·회사·연락처가 PDF 안 글자로 들어 있음(텍스트 검색 가능)
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";
import { createRequire } from "node:module";
import { parse } from "yaml";

const { chromium } = createRequire(path.resolve("package.json"))("@playwright/test");

const OUT = path.resolve("out");
const PDF = path.join(OUT, "resume.pdf");
const MAX_BYTES = 1024 * 1024;
const MAX_PAGES = Number(process.env.RESUME_MAX_PAGES ?? 5); // 시안 기준 A4 5쪽
const errors = [];
const fail = (message) => errors.push(message);

if (!fs.existsSync(path.join(OUT, "about.html"))) {
  console.error("out/about.html 이 없습니다. 먼저 `yarn build` 를 실행하세요.");
  process.exit(1);
}

// ── out/ 을 임시 서버로 띄운다(정적 export라 /about → about.html)
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".woff2": "font/woff2", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://x").pathname);
  const candidates = [pathname, `${pathname}.html`, path.join(pathname, "index.html")];
  for (const candidate of candidates) {
    const file = path.join(OUT, candidate);
    if (file.startsWith(OUT) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      response.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
      fs.createReadStream(file).pipe(response);
      return;
    }
  }
  response.writeHead(404).end("not found");
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

try {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 1024 } });
  // 다크 테마로 열어도 PDF는 라이트여야 한다(인쇄 CSS의 라이트 토큰 덮어쓰기를 매번 검증)
  await context.addInitScript(() => {
    try {
      localStorage.setItem("theme", "dark");
    } catch {}
  });
  const page = await context.newPage();
  await page.goto(`${base}/about`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);

  const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  if (background !== "rgb(255, 255, 255)") fail(`인쇄 배경이 라이트가 아닙니다 (${background})`);
  const hiddenOk = await page.evaluate(() =>
    [".site-header", ".site-footer", ".jump", ".about-intro__contact"].every((selector) => {
      const el = document.querySelector(selector);
      return !el || getComputedStyle(el).display === "none";
    }),
  );
  if (!hiddenOk) fail("인쇄에서 헤더·푸터·바로가기·버튼이 숨겨지지 않았습니다");

  await page.pdf({ path: PDF, format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
} finally {
  server.close();
}

// ── PDF 검사
const pdf = fs.readFileSync(PDF);
if (pdf.length > MAX_BYTES) fail(`resume.pdf 가 ${Math.round(pdf.length / 1024)}KB 로 1MB 를 넘습니다`);

const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
if (pages === 0) fail("PDF 쪽 수를 읽지 못했습니다");
else if (pages > MAX_PAGES) fail(`resume.pdf 가 ${pages}쪽입니다 (기준 A4 ${MAX_PAGES}쪽 이하)`);

// 글자 검색 가능 여부: 글꼴의 ToUnicode 매핑에 찾을 글자가 모두 있는지 본다(글자가 그림이 아니라 글꼴 글리프로 들어 있다는 뜻)
const toUnicodeChars = new Set();
const latin = pdf.toString("latin1");
for (const match of latin.matchAll(/stream\r?\n/g)) {
  const start = match.index + match[0].length;
  const end = latin.indexOf("endstream", start);
  if (end < 0) continue;
  let body;
  try {
    body = zlib.inflateSync(pdf.subarray(start, end)).toString("latin1");
  } catch {
    continue;
  }
  if (!body.includes("begincmap")) continue;
  // ToUnicode 값은 UTF-16BE 16진수(Node에는 utf16be가 없어 바이트를 뒤집어 읽는다)
  const decode = (hex) => {
    const bytes = Buffer.from(hex.length % 4 ? hex.padStart(hex.length + 2, "0") : hex, "hex");
    return bytes.swap16().toString("utf16le");
  };
  for (const [, chunk] of body.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const [, , dst] of chunk.matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)) {
      for (const ch of decode(dst)) toUnicodeChars.add(ch);
    }
  }
  for (const [, chunk] of body.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
    for (const [, lo, hi, dst] of chunk.matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)) {
      const count = parseInt(hi, 16) - parseInt(lo, 16) + 1;
      const first = decode(dst).codePointAt(0);
      for (let i = 0; i < count && i < 65536; i += 1) toUnicodeChars.add(String.fromCodePoint(first + i));
    }
    for (const [, array] of chunk.matchAll(/<[0-9a-fA-F]+>\s*<[0-9a-fA-F]+>\s*\[([^\]]*)\]/g)) {
      for (const [, item] of array.matchAll(/<([0-9a-fA-F]+)>/g)) for (const ch of decode(item)) toUnicodeChars.add(ch);
    }
  }
}
const profile = parse(fs.readFileSync("content/profile.yaml", "utf8"));
const experience = parse(fs.readFileSync("content/experience.yaml", "utf8"));
const expected = [profile.name, profile.role, profile.contacts.email, ...experience.companies.flatMap((c) => [c.name, c.role]), ...profile.certifications.map((c) => c.name)];
const missing = new Set();
for (const text of expected) for (const ch of text) if (ch.trim() && !toUnicodeChars.has(ch)) missing.add(ch);
if (toUnicodeChars.size === 0) fail("PDF 글꼴에 ToUnicode 매핑이 없어 글자 검색이 안 됩니다");
else if (missing.size > 0) fail(`PDF 글자 매핑에 없는 글자: ${[...missing].join("")} (한글 글꼴이 빠졌을 수 있습니다)`);

if (errors.length > 0) {
  fs.rmSync(PDF, { force: true });
  for (const message of errors) {
    console.error(`resume.pdf: ${message}`);
    if (process.env.GITHUB_ACTIONS) console.log(`::error::resume.pdf: ${message}`);
  }
  process.exit(1);
}
console.log(`resume.pdf 생성: ${pages}쪽, ${Math.round(pdf.length / 1024)}KB, 글자 ${toUnicodeChars.size}종 검색 가능`);
