import { chromium } from '/Users/comstering/Programming/comstering.github.io/node_modules/playwright/index.mjs';
const base='file:///Users/comstering/Programming/comstering.github.io/cowork/design/site/';
const S=process.argv[2];
const b=await chromium.launch();
const pages=['index','post','tag','about','projects','project','tags','404'];
for (const [name,w,h] of [['pc',1280,800],['m',360,640]]) {
  const ctx=await b.newContext({viewport:{width:w,height:h}});
  for (const p of pages) {
    const pg=await ctx.newPage();
    await pg.goto(base+p+'.html'); await pg.waitForTimeout(400);
    const r=await pg.evaluate(()=>({
      overflow: document.documentElement.scrollWidth-innerWidth,
      h1: document.querySelectorAll('h1').length,
      noAlt: [...document.images].filter(i=>!i.hasAttribute('alt')).length,
      brokenImg: [...document.images].filter(i=>i.complete&&!i.naturalWidth).length,
      thumbs: document.querySelectorAll('.post-item__thumb').length,
      ph: document.querySelectorAll('.ph').length,
      updated: /updated\s*20/.test(document.body.innerText),
      small: [...document.querySelectorAll('a,button')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.height<24)&&getComputedStyle(e).display!=='inline'}).length,
    }));
    console.log(name,p,JSON.stringify(r));
    await pg.screenshot({path:`${S}/${name}-${p}.png`,fullPage:p==='index'||p==='post'});
    await pg.close();
  }
}
await b.close();
