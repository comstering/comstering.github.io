// G2-2: content/experience.yaml의 프로젝트·활동 제목 문자열이 src/ 안에 하드코딩돼 있으면 실패한다.
import fs from "fs";
import path from "path";
import { parse } from "yaml";

const root = process.cwd();
const data = parse(fs.readFileSync(path.join(root, "content/experience.yaml"), "utf8"));
const titles = [
  ...data.companies.flatMap((company) => company.projects.map((project) => project.title)),
  ...data.openSource.map((item) => item.title),
  ...data.sideProjects.map((item) => item.title),
];

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(tsx?|css|mjs)$/.test(entry.name) ? [full] : [];
  });

const files = walk(path.join(root, "src"));
const hits = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const title of titles) {
    // 짧은 이름(예: Lomeone)은 링크·문구에 쓰일 수 있어 길이 10자 이상만 본다
    if (title.length >= 10 && text.includes(title)) {
      hits.push(`${path.relative(root, file)}: "${title}"`);
    }
  }
}

if (hits.length > 0) {
  console.error("src/에 경력 제목이 하드코딩돼 있습니다. content/experience.yaml에서 읽으세요:");
  for (const hit of hits) console.error(`  - ${hit}`);
  process.exit(1);
}
console.log(`하드코딩 검사 통과 (제목 ${titles.length}개, 파일 ${files.length}개)`);
