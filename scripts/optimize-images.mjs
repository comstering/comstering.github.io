// public/images 의 png·jpg 를 WebP 로 변환해 public/_img 에 둔다 (PRD-003 PR-14). `yarn build`/`yarn dev` 전에 자동 실행된다.
//   - 원본은 저장소에 그대로 두고, 변환본(public/_img, git 제외)을 사이트에 쓴다
//   - 본문 이미지 최대 폭 1440px, 용량 200KB 이하(G1-5)가 되도록 품질 → 폭 순서로 낮춘다
//   - public/images/posts/thumbnails/ 는 변환하지 않는다(PR-15 전까지 og:image로 쓰이고 일부 메신저가 WebP 미리보기를 못 읽음)
//   - 입력 파일 해시로 캐시해 바뀐 파일만 다시 변환한다. 결과 목록은 public/_img/manifest.json
//     (rehype-images.ts 가 src·width·height를 채우는 데 쓴다)
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("public/images");
const OUTPUT_DIR = path.resolve("public/_img");
const MANIFEST = path.join(OUTPUT_DIR, "manifest.json");
const SKIP_DIRS = [path.join(SOURCE_DIR, "posts", "thumbnails")];

const MAX_WIDTH = 1440;
const MAX_BYTES = 200 * 1024;
const QUALITIES = [82, 76, 70, 64];
const WIDTH_STEPS = [1200, 1000, 800];
// 변환 방식을 바꾸면 값을 올려 캐시를 무효화한다
const PIPELINE_VERSION = 2; // 2: sharp 0.33.5(libvips 8.15)로 고정하며 변환본을 다시 만든다

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (SKIP_DIRS.includes(full)) return [];
    return entry.isDirectory() ? walk(full) : [full];
  });

const sources = fs.existsSync(SOURCE_DIR)
  ? walk(SOURCE_DIR).filter((file) => /\.(png|jpe?g)$/i.test(file))
  : [];

const previous = fs.existsSync(MANIFEST)
  ? JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
  : {};
const manifest = {};
let converted = 0;
let cached = 0;
let originalBytes = 0;
let outputBytes = 0;

const encode = async (file, originalWidth) => {
  const render = (width, quality) =>
    sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5, smartSubsample: true })
      .toBuffer({ resolveWithObject: true });

  let result;
  for (const quality of QUALITIES) {
    result = await render(Math.min(originalWidth, MAX_WIDTH), quality);
    if (result.data.length <= MAX_BYTES) return result;
  }
  for (const width of WIDTH_STEPS) {
    if (width >= originalWidth) continue;
    result = await render(width, QUALITIES.at(-1));
    if (result.data.length <= MAX_BYTES) return result;
  }
  return result;
};

for (const file of sources) {
  const rel = path.relative(SOURCE_DIR, file).split(path.sep).join("/");
  const key = `/images/${rel}`;
  const outRel = rel.replace(/\.(png|jpe?g)$/i, ".webp");
  const outFile = path.join(OUTPUT_DIR, outRel);
  const bytes = fs.readFileSync(file);
  const hash = crypto
    .createHash("sha1")
    .update(bytes)
    .update(String(PIPELINE_VERSION))
    .digest("hex");
  originalBytes += bytes.length;

  const old = previous[key];
  if (old && old.hash === hash && fs.existsSync(outFile)) {
    manifest[key] = old;
    outputBytes += old.bytes;
    cached += 1;
    continue;
  }

  const meta = await sharp(bytes).rotate().metadata();
  // rotate()로 EXIF 방향을 반영하면 가로세로가 바뀔 수 있어 변환 결과 기준으로 기록한다
  const { data, info } = await encode(file, meta.autoOrient?.width ?? meta.width);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, data);
  manifest[key] = {
    src: `/_img/${outRel}`,
    width: info.width,
    height: info.height,
    bytes: data.length,
    hash,
  };
  outputBytes += data.length;
  converted += 1;
}

// 원본이 사라졌거나 이름이 바뀐 변환본 정리 (생성 폴더 안에서만)
if (fs.existsSync(OUTPUT_DIR)) {
  const keep = new Set(
    Object.values(manifest).map((entry) =>
      path.join(OUTPUT_DIR, entry.src.replace(/^\/_img\//, "")),
    ),
  );
  for (const file of walk(OUTPUT_DIR)) {
    if (file !== MANIFEST && file.endsWith(".webp") && !keep.has(file)) {
      fs.rmSync(file);
    }
  }
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

const mb = (value) => (value / 1024 / 1024).toFixed(1);
const oversize = Object.entries(manifest).filter(
  ([, entry]) => entry.bytes > MAX_BYTES,
);
console.log(
  `이미지 ${sources.length}개: 변환 ${converted}, 캐시 ${cached} (${mb(originalBytes)}MB → ${mb(outputBytes)}MB)`,
);
for (const [key, entry] of oversize) {
  console.warn(
    `  경고: ${key} 변환본이 ${Math.round(entry.bytes / 1024)}KB로 200KB를 넘습니다`,
  );
}
