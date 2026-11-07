import fs from "node:fs";
import path from "node:path";

// 인기글: 빌드 직전에 만든 `.cache/popular.json`을 읽는다(PRD-004 5.5, 생성은 PR-23의 scripts/fetch-popular.mjs).
// 모양: { "items": [{ "id": "<글 id>", "views": 12 }, ...] } (조회수 내림차순).
// 파일이 없거나 깨졌거나 비어 있으면 빈 목록이다 → 홈에서 popular 블록을 숨긴다. 빌드는 절대 실패시키지 않는다.
const popularPath = () => path.join(process.cwd(), ".cache", "popular.json");
export const POPULAR_LIMIT = 5;

export interface PopularItem {
  id: string;
  views: number;
}

export const loadPopular = (publishedIds: Set<string>): PopularItem[] => {
  try {
    const raw: unknown = JSON.parse(fs.readFileSync(popularPath(), "utf8"));
    const items = (raw as { items?: unknown })?.items;
    if (!Array.isArray(items)) return [];
    return items
      .filter(
        (item): item is PopularItem =>
          typeof item?.id === "string" &&
          typeof item?.views === "number" &&
          publishedIds.has(item.id),
      )
      .slice(0, POPULAR_LIMIT);
  } catch {
    return [];
  }
};
