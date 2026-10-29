// `yarn build` 뒤에 실행(postbuild). 본문 이미지 원본은 변환본(/_img)으로 대체돼 쓰이지 않으므로
// 배포 산출물(out/)에서만 뺀다. 저장소의 원본은 그대로 둔다. (썸네일은 og:image라 남긴다)
import fs from "node:fs";
import path from "node:path";

const target = path.resolve("out", "images", "posts", "contents");
if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true });
  console.log("out/images/posts/contents 제거 (변환본 /_img 사용)");
}
