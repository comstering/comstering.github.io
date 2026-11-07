// About 첫 화면 요소 위치(360×640, 1280×720)와 인쇄 쪽수(A4). D-15(31번) 전후 비교용.
//   저장소 루트에서: python3 -m http.server 4174 & 후  node cowork/design/tools/measure-about-first.mjs
// 환경: Playwright Chromium. 쪽수는 page.pdf()의 /Type /Page 개수.
import { chromium } from '/Users/comstering/Programming/comstering.github.io/node_modules/playwright/index.mjs';
const url = 'http://localhost:4174/cowork/design/site/about.html';
const b = await chromium.launch();
for (const [w, h] of [[360, 640], [1280, 720]]) {
  const page = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage();
  await page.goto(url); await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(() => {
    const bot = s => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null; };
    const lines = [...document.querySelectorAll('.intro p, .intro__name')].map(e => e.className + ':' + Math.round(e.getBoundingClientRect().top + scrollY));
    return { nameBottom: bot('.intro__name'), roleBottom: bot('.intro__role'), factsBottom: bot('.intro__facts'), contactBottom: bot('.intro__contact'), headlineBottom: bot('.intro__headline'),
      pageH: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth, orgRoles: [...document.querySelectorAll('.tl-org__role')].map(e => e.textContent), lines };
  });
  console.log(`\n== ${w}×${h}`, JSON.stringify(r, null, 1));
}
const page = await (await b.newContext()).newPage(); await page.goto(url); await page.evaluate(() => document.fonts.ready); await page.emulateMedia({ media: 'print' });
const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
console.log('\nprint pages:', (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length, 'size KB:', Math.round(pdf.length / 1024));
await b.close();
