import fs from "fs";
import path from "path";
import { parse } from "yaml";
import { seriesRegistrySchema, type SeriesRegistry } from "./schema";

const contentDirectory = path.join(process.cwd(), "content");

const readYaml = (fileName: string): unknown =>
  parse(fs.readFileSync(path.join(contentDirectory, fileName), "utf8"));

export interface TagRegistry {
  canonical: Set<string>;
  /** 소문자로 바꾼 별칭 → 정규 태그 */
  aliases: Map<string, string>;
}

// content/tags.yaml: 정규 태그를 키로, 별칭 목록을 값으로 둔다.
export const loadTagRegistry = (): TagRegistry => {
  const raw = (readYaml("tags.yaml") ?? {}) as Record<string, string[] | null>;
  const canonical = new Set<string>();
  const aliases = new Map<string, string>();

  for (const [tag, tagAliases] of Object.entries(raw)) {
    canonical.add(tag);
    for (const alias of tagAliases ?? []) {
      aliases.set(alias.toLowerCase(), tag);
    }
  }
  return { canonical, aliases };
};

// content/series.yaml: slug → { label, title }
export const loadSeriesRegistry = (): SeriesRegistry =>
  seriesRegistrySchema.parse(readYaml("series.yaml") ?? {});
