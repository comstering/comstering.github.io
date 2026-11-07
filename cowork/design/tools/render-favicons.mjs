// 파비콘 후보(favicon/*.svg)를 16·32·48·180px PNG로 렌더링한다(35번). 투명 배경 유지.
//   저장소 루트에서: node cowork/design/tools/render-favicons.mjs
// 환경: Playwright Chromium. 16px 같은 작은 크기도 브라우저가 SVG를 그린 결과 그대로다(탭에서 보이는 모양에 가장 가깝다).
import { chromium } from '/Users/comstering/Programming/comstering.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('cowork/design/favicon');
const out = path.join(dir, 'png');
fs.mkdirSync(out, { recursive: true });
const sizes = [16, 32, 48, 180];
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg'));
const b = await chromium.launch();
for (const f of files) {
  const svg = fs.readFileSync(path.join(dir, f), 'utf8');
  const name = f.replace(/\.svg$/, '');
  for (const s of sizes) {
    const page = await (await b.newContext({ viewport: { width: s, height: s }, deviceScaleFactor: 1 })).newPage();
    await page.setContent(`<html><body style="margin:0;background:transparent"><div style="width:${s}px;height:${s}px">${svg.replace(/width="32" height="32"/, `width="${s}" height="${s}"`)}</div></body></html>`);
    await page.screenshot({ path: path.join(out, `${name}-${s}.png`), omitBackground: true, clip: { x: 0, y: 0, width: s, height: s } });
    await page.close();
  }
}
await b.close();
console.log(files.length, 'svg ->', files.length * sizes.length, 'png', out);
