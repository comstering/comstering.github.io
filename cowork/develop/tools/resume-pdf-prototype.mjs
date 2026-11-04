// resume.pdf 시험 제작 스크립트 (2026-11-04, PRD-004 5.3 기준 시험판). PR-22의 scripts/build-resume-pdf.mjs 기초로 쓴다.
//   About을 print 미디어 A4로 인쇄한다: 라이트 고정, 사진·헤더·푸터·카드 테두리 숨김, 연락처·링크는 URL 표시, 프로젝트가 쪽 경계에서 갈리지 않게.
//   사용: yarn build && (yarn serve out -l 4000 --no-clipboard &) && node cowork/develop/tools/resume-pdf-prototype.mjs resume.pdf
//   결과(현재 About 기준): A4 6쪽, 약 550KB, 한글 텍스트 검색 가능. 쪽 수 확인에는 pdf.js(임시 페이지)를 썼다(poppler 없음).
//   한계: 인쇄 CSS는 이 파일에서 주입한다. 최종은 디자인 24·25번 `@media print`(About 마크업 안)로 대체하고, 직함·연차·회사 바로가기는 PR-19 이후 About에 생긴다.
import { createRequire } from "node:module"; import path from "node:path";
const { chromium } = createRequire(path.resolve("package.json"))("@playwright/test");
const out = process.argv[2];
const css = `
@page { size: A4; margin: 13mm 14mm; }
html, body { background: #fff !important; }
header.sticky, footer, img[alt*="프로필"], .reading-progress, script { display: none !important; }
main { max-width: none !important; padding: 0 !important; margin: 0 !important; }
a { color: inherit !important; text-decoration: none !important; }
/* 연락처 아이콘 링크는 글자로 */
a[aria-label] svg { display: none !important; }
a[aria-label^="GitHub"]::after { content: "GitHub  " attr(href); }
a[aria-label^="LinkedIn"]::after { content: "LinkedIn  " attr(href); }
a[aria-label^="이메일"]::after { content: "Email  comstering@gmail.com"; }
a[aria-label] { width: auto !important; height: auto !important; border: 0 !important; display: inline !important; font: 12px monospace; }
ul:has(> li > a[aria-label]) { display: block !important; }
ul:has(> li > a[aria-label]) > li { display: block !important; }
/* 본문 링크는 URL을 뒤에 표시(기술 스택 칩은 제외) */
main a[href^="http"]:not([aria-label]):not([class*="min-h-(--tap)"])::after { content: "  " attr(href); font-size: 10px; color: #5a6b63; word-break: break-all; }
/* 카드·칩 테두리 제거: 이력서는 글자 중심 */
[class*="rounded-lg"], [class*="rounded-md"] { border: 0 !important; background: transparent !important; box-shadow: none !important; padding: 0 !important; }
[class*="rounded-lg"] svg, [class*="rounded-md"] svg { display: none !important; }
ul.flex.flex-wrap { display: block !important; }
ul.flex.flex-wrap > li { display: inline !important; }
ul.flex.flex-wrap > li:not(:last-child)::after { content: " · "; }
ul.flex.flex-wrap a { display: inline !important; min-height: 0 !important; padding: 0 !important; border: 0 !important; }
section, .space-y-6, .space-y-12, .space-y-16 { margin-top: 0 !important; }
section { margin-bottom: 14px !important; }
/* 쪽 경계: 프로젝트 하나가 갈리지 않게, 제목은 다음 내용과 붙게 */
h2, h3 { break-after: avoid; }
div[class*="rounded-lg"] { break-inside: avoid; margin-bottom: 10px !important; }
`;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1000, height: 1400 } });
await ctx.addInitScript(() => { try { localStorage.setItem("theme", "light"); } catch {} });
const page = await ctx.newPage();
await page.goto("http://localhost:4000/about"); await page.waitForLoadState("networkidle");
await page.emulateMedia({ media: "print", colorScheme: "light" });
await page.addStyleTag({ content: css });
await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true, scale: 0.76 });
await browser.close();
