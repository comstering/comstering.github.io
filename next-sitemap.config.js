// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://comstering.github.io/", // 실제 GitHub Pages URL로 변경
  generateRobotsTxt: true, // robots.txt 자동 생성
  sitemapSize: 7000,
  outDir: "./out", // next export output directory
};
