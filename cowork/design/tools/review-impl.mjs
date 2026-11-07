// 구현(빌드한 out/)을 시안과 대조하는 측정 스크립트. 디자인 36번(개발 Q19~Q21 답변)용.
//   저장소 루트에서: yarn build && python3 -m http.server 4176 --directory out & 후
//   node cowork/design/tools/review-impl.mjs [스크린샷 폴더]
// 환경: Playwright Chromium, 로컬 서버. 360px은 실제 Chrome 창 최소폭(406px) 때문에 Chromium으로 잰다.
import { chromium } from '/Users/comstering/Programming/comstering.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base = 'http://localhost:4176';
const shots = process.argv[2]; if (shots) fs.mkdirSync(shots, { recursive: true });
const b = await chromium.launch();
const ready = async (page) => { await page.waitForLoadState('load'); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(1200); };

console.log('=== 홈: 첫 글 제목 하단(시안 458 / 437) ===');
for (const [w, h] of [[1280, 720], [360, 640]]) {
  const page = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage();
  await page.goto(base + '/'); await ready(page);
  const measure = () => page.evaluate(() => {
    const t = document.querySelector('.home__list .post-item__title') || document.querySelector('.home__list h3');
    const hero = document.querySelector('.hero'); const main = document.querySelector('main');
    const sub = document.querySelector('.hero__sub');
    return { firstBottom: Math.round(t.getBoundingClientRect().bottom + scrollY), heroTop: Math.round(hero.getBoundingClientRect().top + scrollY), heroPadTop: getComputedStyle(hero).paddingTop, mainPadTop: getComputedStyle(main).paddingTop, subLines: Math.round(sub.getBoundingClientRect().height / parseFloat(getComputedStyle(sub).lineHeight)), overflow: document.documentElement.scrollWidth > innerWidth, headerH: Math.round(document.querySelector('header').getBoundingClientRect().height), logo: document.querySelector('header a')?.textContent.trim() };
  });
  const now = await measure();
  await page.addStyleTag({ content: '.hero{padding-top:0 !important}' });
  const noHero = await measure();
  console.log(`${w}×${h} 지금`, JSON.stringify(now));
  console.log(`${w}×${h} 히어로 위 여백 0(main py-12만)`, JSON.stringify({ firstBottom: noHero.firstBottom, inScreen: noHero.firstBottom <= h }));
  if (shots) await page.screenshot({ path: `${shots}/home-${w}.png` });
  await page.close();
}

console.log('\n=== 홈: 사이드바 태그·시리즈 터치 대상 ===');
{
  const page = await (await b.newContext({ viewport: { width: 360, height: 640 }, reducedMotion: 'reduce' })).newPage();
  await page.goto(base + '/'); await ready(page);
  console.log(JSON.stringify(await page.evaluate(() => {
    const q = (s) => [...document.querySelectorAll(s)].slice(0, 3).map((e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.width)}×${Math.round(r.height)}`; });
    const tag = document.querySelector('.home__aside button');
    return { tagButtons: q('.home__aside button'), tagTag: tag?.tagName, tagAria: tag?.getAttribute('aria-haspopup'), seriesRows: q('.home__aside .feat-row a'), popularRows: q('.home__aside .rank-list a'), asideTop: Math.round(document.querySelector('.home__aside').getBoundingClientRect().top + scrollY), pageH: document.documentElement.scrollHeight };
  })));
  await page.close();
}

console.log('\n=== 검색 팔레트 모바일(Q20) ===');
{
  const page = await (await b.newContext({ viewport: { width: 360, height: 640 }, hasTouch: true })).newPage();
  await page.goto(base + '/'); await ready(page);
  await page.getByRole('button', { name: /검색/ }).first().click(); await page.waitForTimeout(500);
  const info = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('[role=dialog] button, .palette button')];
    return btns.map((e) => { const r = e.getBoundingClientRect(); return { name: e.getAttribute('aria-label') || e.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height) }; });
  });
  console.log(JSON.stringify(info));
  if (shots) await page.screenshot({ path: `${shots}/palette-360.png` });
  await page.close();
}

console.log('\n=== About 첫 화면(시안 360: 버튼 346·소개 437 / 1280: 301·414) ===');
for (const [w, h] of [[360, 640], [1280, 720]]) {
  const page = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage();
  await page.goto(base + '/about.html'); await ready(page);
  console.log(w, JSON.stringify(await page.evaluate(() => {
    const bot = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null; };
    const hl = document.querySelector('.about-intro__headline');
    return { role: document.querySelector('.about-intro__role')?.textContent.trim(), roleBottom: bot('.about-intro__role'), contactBottom: bot('.about-intro__contact'), headlineBottom: bot('.about-intro__headline'), headlineLines: Math.round(hl.getBoundingClientRect().height / parseFloat(getComputedStyle(hl).lineHeight)), pageH: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth, postsLinks: document.querySelectorAll('main a[href^="/posts/"]').length };
  })));
  if (shots) await page.screenshot({ path: `${shots}/about-${w}.png` });
  await page.close();
}

console.log('\n=== About 인쇄(시안 A4 5쪽 · 629KB) ===');
{
  const page = await (await b.newContext()).newPage();
  await page.goto(base + '/about.html'); await ready(page); await page.emulateMedia({ media: 'print' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log('쪽수', pages, '크기 KB', Math.round(pdf.length / 1024));
  if (shots) fs.writeFileSync(`${shots}/about-print.pdf`, pdf);
  // 마지막 쪽 채움 정도: 문서 높이를 A4 본문 높이(약 1018px)로 나눈 값
  console.log(JSON.stringify(await page.evaluate(() => ({ docH: document.documentElement.scrollHeight, perPagePx: Math.round((297 - 13 - 14) / 25.4 * 96) }))));
  await page.close();
}
await b.close();
