// PR 스크린샷: 정적 빌드(out/)를 띄운 서버에서 PC(1280x800)·Mobile(390x844 @2x)로 찍는다.
//   yarn build && (yarn serve out -l 4000 --no-clipboard &)
//   node cowork/develop/tools/shoot.mjs <출력 폴더> <이름>=<경로>[@<CSS 선택자>] ...
//   예) node cowork/develop/tools/shoot.mjs /tmp/shots home=/ post-head=/posts/karpenter oss=/?category=oss
// <선택자>를 주면 그 요소가 헤더 아래에 오도록 스크롤한 뒤 찍는다. 결과: <이름>-pc.png, <이름>-mobile.png
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(path.resolve("package.json"));
const { chromium } = require("@playwright/test");

const [outDir, ...jobs] = process.argv.slice(2);
if (!outDir || jobs.length === 0) {
  console.error("사용법: shoot.mjs <출력 폴더> <이름>=<경로>[@<선택자>] ...");
  process.exit(1);
}
const BASE = process.env.BASE ?? "http://localhost:4000";
const VIEWPORTS = [
  ["pc", { width: 1280, height: 800 }, 1],
  ["mobile", { width: 390, height: 844 }, 2],
];

const browser = await chromium.launch();
for (const [suffix, viewport, deviceScaleFactor] of VIEWPORTS) {
  const page = await (
    await browser.newContext({ viewport, deviceScaleFactor })
  ).newPage();
  for (const job of jobs) {
    const [name, rest] = [job.slice(0, job.indexOf("=")), job.slice(job.indexOf("=") + 1)];
    const at = rest.indexOf("@");
    const route = at === -1 ? rest : rest.slice(0, at);
    const selector = at === -1 ? null : rest.slice(at + 1);
    await page.goto(BASE + route);
    await page.waitForLoadState("networkidle");
    if (selector) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) throw new Error(`선택자를 찾을 수 없습니다: ${sel}`);
        window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 90);
      }, selector);
    }
    const file = path.join(outDir, `${name}-${suffix}.png`);
    await page.screenshot({ path: file });
    console.log(file);
  }
}
await browser.close();
