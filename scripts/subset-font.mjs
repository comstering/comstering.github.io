// Pretendard Variable 을 사이트에서 쓰는 글자만 남긴 단일 woff2 로 줄인다 (디자인 19번 1.3, Q9 ①).
//   - posts/ · content/ · src/ 의 글자 + 기본 ASCII 를 모아 wght 400–700 으로 서브셋한다
//   - 결과: public/_font/pretendard-subset.woff2 (git 제외). `yarn build`/`yarn dev` 전에 자동 실행된다
//   - 입력(글자 집합·원본 글꼴·스크립트 버전)이 같으면 다시 만들지 않는다
//   - 서브셋에 없는 글자(검색창에 입력한 글자 등)는 시스템 글꼴로 보인다
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import subsetFont from "subset-font";

const SOURCE_FONT = path.resolve(
  "node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
);
const OUTPUT_DIR = path.resolve("public/_font");
const OUTPUT = path.join(OUTPUT_DIR, "pretendard-subset.woff2");
const HASH_FILE = path.join(OUTPUT_DIR, ".hash");
const SCAN_DIRS = ["posts", "content", "src"];
const SCAN_EXT = new Set([".md", ".yaml", ".yml", ".ts", ".tsx", ".css", ".json"]);
// 변환 방식을 바꾸면 값을 올려 캐시를 무효화한다
const SCRIPT_VERSION = 1;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const collectText = () => {
  let text = "";
  for (const dir of SCAN_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
      if (SCAN_EXT.has(path.extname(file))) text += fs.readFileSync(file, "utf8");
    }
  }
  // 기본 ASCII(0x20–0x7E) + 자주 쓰는 기호
  for (let c = 0x20; c <= 0x7e; c++) text += String.fromCharCode(c);
  text += "·…—–“”‘’→←↑↓✓×©";
  // 제어 문자·서러게이트 제외, 중복 제거
  return [...new Set([...text])]
    .filter((ch) => {
      const cp = ch.codePointAt(0);
      return cp >= 0x20 && cp !== 0x7f && !(cp >= 0x80 && cp < 0xa0);
    })
    .sort()
    .join("");
};

const chars = collectText();
const source = fs.readFileSync(SOURCE_FONT);
const hash = crypto
  .createHash("sha256")
  .update(`${SCRIPT_VERSION}\n${chars}`)
  .update(source)
  .digest("hex");

if (
  fs.existsSync(OUTPUT) &&
  fs.existsSync(HASH_FILE) &&
  fs.readFileSync(HASH_FILE, "utf8") === hash
) {
  console.log(`subset-font: 변경 없음 (${chars.length}자)`);
  process.exit(0);
}

const out = await subsetFont(source, chars, {
  targetFormat: "woff2",
  variationAxes: { wght: { min: 400, max: 700 } },
});
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT, out);
fs.writeFileSync(HASH_FILE, hash);
console.log(
  `subset-font: ${chars.length}자 → ${(out.length / 1024).toFixed(1)}KB (원본 ${(source.length / 1024 / 1024).toFixed(2)}MB)`,
);
