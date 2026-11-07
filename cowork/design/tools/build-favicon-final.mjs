// 확정 파비콘 C(`c_`) 파일 세트를 만든다(35번). 소스는 favicon/final/icon.svg, apple-icon.svg.
//   저장소 루트에서: node cowork/design/tools/build-favicon-final.mjs
// 산출물(favicon/final/): favicon.ico(16·32·48 PNG 내장), apple-icon.png(180×180, 꽉 찬 정사각형), icon-48.png(확인용)
// 환경: Playwright Chromium이 SVG를 그린 결과를 PNG로 저장한다. ICO는 PNG를 그대로 담는 컨테이너다.
import { chromium } from '/Users/comstering/Programming/comstering.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('cowork/design/favicon/final');
const b = await chromium.launch();

const render = async (svgFile, size) => {
  const svg = fs.readFileSync(path.join(dir, svgFile), 'utf8').replace(/width="32" height="32"/, `width="${size}" height="${size}"`);
  const page = await (await b.newContext({ viewport: { width: size, height: size }, deviceScaleFactor: 1 })).newPage();
  await page.setContent(`<html><body style="margin:0;background:transparent"><div style="width:${size}px;height:${size}px">${svg}</div></body></html>`);
  const png = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  await page.close();
  return png;
};

// favicon.ico: 16·32·48
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await render('icon.svg', s));
const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync(path.join(dir, 'favicon.ico'), Buffer.concat([head, ...entries, ...pngs]));

// apple-icon.png: 180×180, 모서리·테두리 없는 꽉 찬 정사각형(iOS가 마스크를 씌운다)
fs.writeFileSync(path.join(dir, 'apple-icon.png'), await render('apple-icon.svg', 180));
fs.writeFileSync(path.join(dir, 'icon-48.png'), pngs[2]);

await b.close();
for (const f of ['favicon.ico', 'apple-icon.png']) console.log(f, fs.statSync(path.join(dir, f)).size, 'bytes');
