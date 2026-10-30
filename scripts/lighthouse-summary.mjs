// Lighthouse CI 결과(.lighthouseci/lhr-*.json)를 PR 댓글용 마크다운 표로 만든다.
//   node scripts/lighthouse-summary.mjs [출력 파일]   (기본: lighthouse-summary.md)
// 차단선·목표선은 lighthouserc.json의 assertMatrix를 그대로 읽는다. 이 스크립트는 표시만 하고 CI를 실패시키지 않는다.
import fs from "node:fs";
import path from "node:path";

export const MARKER = "<!-- lighthouse-ci-summary -->";

const DIR = path.resolve(process.env.LHCI_DIR ?? ".lighthouseci");
const outFile = process.argv[2] ?? "lighthouse-summary.md";

// PRD-003 "성능 측정 기준": assertMatrix[0]이 차단선, [1]이 목표선이다.
const matrix =
  JSON.parse(fs.readFileSync("lighthouserc.json", "utf8")).ci?.assert
    ?.assertMatrix ?? [];
const tier = (index) => matrix[index]?.assertions ?? {};
const blockTier = tier(0);
const targetTier = tier(1);
const minScore = (source, key) => source[`categories:${key}`]?.[1]?.minScore;
const maxValue = (source, key) => source[key]?.[1]?.maxNumericValue;

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

// 차단선 미달 ❌, 차단선은 넘었지만 목표선 미달 ⚠️, 목표선까지 통과 ✅ (선이 없는 지표는 표시하지 않는다)
const grade = (pass, block, target) => {
  if (block != null && !pass(block)) return "❌";
  if (target != null && !pass(target)) return "⚠️";
  return block == null && target == null ? "" : "✅";
};
const median = (values) => {
  const sorted = values.filter((v) => v != null).sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

// 같은 페이지를 여러 번 잰 결과는 중앙값으로 합친다
const byPage = new Map();
for (const report of reports) {
  const page = new URL(report.finalDisplayedUrl ?? report.requestedUrl).pathname;
  byPage.set(page, [...(byPage.get(page) ?? []), report]);
}

const score = (runs, key) => {
  const value = median(runs.map((report) => report.categories[key]?.score));
  if (value == null) return "-";
  const mark = grade(
    (min) => value >= min,
    minScore(blockTier, key),
    minScore(targetTier, key),
  );
  return `${Math.round(value * 100)} ${mark}`.trim();
};
const metric = (runs, id, format) => {
  const value = median(runs.map((report) => report.audits[id]?.numericValue));
  if (value == null) return "-";
  const mark = grade(
    (max) => value <= max,
    maxValue(blockTier, id),
    maxValue(targetTier, id),
  );
  return `${format(value)} ${mark}`.trim();
};
const seconds = (ms) => `${(ms / 1000).toFixed(1)}s`;
const shift = (value) => value.toFixed(3);
const millis = (ms) => `${Math.round(ms)}ms`;

const rows = [...byPage.entries()]
  .sort(([x], [y]) => x.localeCompare(y))
  .map(
    ([page, runs]) =>
      `| \`${page}\` | ${score(runs, "performance")} | ${score(runs, "accessibility")} | ${score(runs, "best-practices")} | ${score(runs, "seo")} | ${metric(runs, "largest-contentful-paint", seconds)} | ${metric(runs, "cumulative-layout-shift", shift)} | ${metric(runs, "total-blocking-time", millis)} |`,
  );
const runCount = Math.max(...[...byPage.values()].map((runs) => runs.length));

const line = (source) =>
  [
    minScore(source, "performance") != null &&
      `성능 ≥ ${Math.round(minScore(source, "performance") * 100)}`,
    maxValue(source, "largest-contentful-paint") != null &&
      `LCP ≤ ${seconds(maxValue(source, "largest-contentful-paint"))}`,
    maxValue(source, "cumulative-layout-shift") != null &&
      `CLS ≤ ${maxValue(source, "cumulative-layout-shift")}`,
    maxValue(source, "total-blocking-time") != null &&
      `TBT ≤ ${maxValue(source, "total-blocking-time")}ms`,
    minScore(source, "accessibility") != null &&
      `접근성 ${Math.round(minScore(source, "accessibility") * 100)}`,
    minScore(source, "seo") != null &&
      `SEO ${Math.round(minScore(source, "seo") * 100)}`,
    minScore(source, "best-practices") != null &&
      `모범사례 ≥ ${Math.round(minScore(source, "best-practices") * 100)}`,
  ]
    .filter(Boolean)
    .join(" · ");

fs.writeFileSync(
  outFile,
  `${MARKER}
### Lighthouse (모바일, 실제 Chrome 관측, 정적 빌드)

| 페이지 | 성능 | 접근성 | 모범사례 | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rows.join("\n")}

- ❌ 차단선 미달 · ⚠️ 목표선 미달 · ✅ 통과
- 차단선: ${line(blockTier)}
- 목표선: ${line(targetTier)}
- 측정: \`throttlingMethod: devtools\`(느린 4G·CPU 4배를 실제로 걸고 관측), 페이지마다 ${runCount}회 중앙값, 모범사례는 \`is-on-https\` 제외(로컬 http라 항상 실패). 접근성·SEO는 지금도 CI 실패 조건이고, 성능·LCP·CLS·TBT 차단선은 PR-17부터 실패 조건이에요. 그 전에는 경고만 해요.
- 상세 리포트는 이 실행의 아티팩트 \`e2e-lighthouse-reports\`에 있어요.
`,
);
console.log(`요약을 ${outFile}에 썼습니다 (${reports.length}개 리포트)`);
