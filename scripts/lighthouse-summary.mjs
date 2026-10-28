// Lighthouse CI 결과(.lighthouseci/lhr-*.json)를 PR 댓글용 마크다운 표로 만든다.
//   node scripts/lighthouse-summary.mjs [출력 파일]   (기본: lighthouse-summary.md)
// 목표값은 lighthouserc.json의 assertions를 그대로 읽는다. 목표 미달은 ⚠️로만 표시하고 실패시키지 않는다.
import fs from "node:fs";
import path from "node:path";

export const MARKER = "<!-- lighthouse-ci-summary -->";

const DIR = path.resolve(process.env.LHCI_DIR ?? ".lighthouseci");
const outFile = process.argv[2] ?? "lighthouse-summary.md";

const assertions =
  JSON.parse(fs.readFileSync("lighthouserc.json", "utf8")).ci?.assert
    ?.assertions ?? {};
const minScore = (key) => assertions[`categories:${key}`]?.[1]?.minScore;
const maxValue = (key) => assertions[key]?.[1]?.maxNumericValue;

const reports = fs.existsSync(DIR)
  ? fs
      .readdirSync(DIR)
      .filter((name) => /^lhr-.*\.json$/.test(name))
      .map((name) => JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8")))
  : [];

if (reports.length === 0) {
  fs.writeFileSync(
    outFile,
    `${MARKER}\n### Lighthouse\n\n결과 파일이 없어서 요약하지 못했어요. Lighthouse CI 단계를 확인해 주세요.\n`,
  );
  process.exit(0);
}

const mark = (ok) => (ok ? "✅" : "⚠️");
const score = (report, key) => {
  const value = report.categories[key]?.score;
  if (value == null) return "-";
  const min = minScore(key);
  return `${Math.round(value * 100)} ${min == null ? "" : mark(value >= min)}`.trim();
};
const metric = (report, id, format) => {
  const value = report.audits[id]?.numericValue;
  if (value == null) return "-";
  const max = maxValue(id);
  return `${format(value)} ${max == null ? "" : mark(value <= max)}`.trim();
};
const seconds = (ms) => `${(ms / 1000).toFixed(1)}s`;
const shift = (value) => value.toFixed(3);

const rows = reports
  .map((report) => ({
    page: new URL(report.finalDisplayedUrl ?? report.requestedUrl).pathname,
    report,
  }))
  .sort((a, b) => a.page.localeCompare(b.page))
  .map(
    ({ page, report }) =>
      `| \`${page}\` | ${score(report, "performance")} | ${score(report, "accessibility")} | ${score(report, "best-practices")} | ${score(report, "seo")} | ${metric(report, "largest-contentful-paint", seconds)} | ${metric(report, "cumulative-layout-shift", shift)} |`,
  );

const goal = [
  minScore("performance") != null &&
    `성능 ≥ ${Math.round(minScore("performance") * 100)}`,
  minScore("accessibility") != null &&
    `접근성 ${Math.round(minScore("accessibility") * 100)}`,
  minScore("seo") != null && `SEO ${Math.round(minScore("seo") * 100)}`,
  maxValue("largest-contentful-paint") != null &&
    `LCP ≤ ${seconds(maxValue("largest-contentful-paint"))}`,
  maxValue("cumulative-layout-shift") != null &&
    `CLS ≤ ${maxValue("cumulative-layout-shift")}`,
]
  .filter(Boolean)
  .join(" · ");

fs.writeFileSync(
  outFile,
  `${MARKER}
### Lighthouse (모바일, 정적 빌드)

| 페이지 | 성능 | 접근성 | 권장사항 | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
${rows.join("\n")}

목표: ${goal}. ⚠️는 목표 미달이고 지금은 경고만 해요(이미지 작업 PR-14 이후 실패로 전환).
CI 서버 한 번 측정값이라 점수가 조금씩 흔들려요. 상세 리포트는 이 실행의 아티팩트 \`e2e-lighthouse-reports\`에 있어요.
`,
);
console.log(`요약을 ${outFile}에 썼습니다 (${reports.length}개 리포트)`);
