// D-5 About CLS 재현·검증 (22번). 풀폭 CJK 폴백(여기서는 AppleGothic = 한글 advance 1.0em)을 대역으로 쓴다.
// Pretendard 도착을 2.5초 늦추고, 보정 없음(A)과 size-adjust 86.4%(B)의 CLS를 4개 폭에서 비교한다.
//   저장소 루트에서: python3 -m http.server 4174 & 후  node cowork/design/tools/measure-fallback-cls.mjs about.html
// 한계: macOS에는 Noto Sans CJK가 없어 AppleGothic이 대역이다. 실제 리눅스 CI 값은 PR-19의 Lighthouse CI(3회 중앙값)로 확인한다.
import { chromium } from '/Users/comstering/Programming/comstering.github.io/node_modules/playwright/index.mjs';
const page_ = process.argv[2] || 'about.html';
const base = 'http://localhost:4174/cowork/design/site/';
const V = {
  'A 보정 없음(풀폭 폴백)': ':root{--font-sans:"Pretendard Variable",Pretendard,AppleGothic,sans-serif !important}',
  'B size-adjust 86.4%': '@font-face{font-family:"PFtest";src:local("AppleGothic");size-adjust:86.4%}:root{--font-sans:"Pretendard Variable",Pretendard,PFtest,sans-serif !important}',
};
const b = await chromium.launch();
for (const [name, css] of Object.entries(V)) {
  const rows = [];
  for (const [w, h] of [[360, 640], [412, 823], [768, 1024], [1280, 720]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage();
    await page.route(/pretendard.*\.woff2/i, async r => { await new Promise(res => setTimeout(res, 2500)); r.continue(); });
    await page.addInitScript(() => { window.__cls = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
    await page.goto(base + page_, { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: css }); await page.waitForTimeout(5500);
    rows.push(`${w}: ${(await page.evaluate(() => window.__cls)).toFixed(3)}`);
    await ctx.close();
  }
  console.log(name.padEnd(24), rows.join('  '));
}
await b.close();
