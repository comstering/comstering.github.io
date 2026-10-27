import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { frontmatterSchema, type Frontmatter } from "./schema";
import { loadSeriesRegistry, loadTagRegistry } from "./registry";

const postsDirectory = path.join(process.cwd(), "posts");
const thumbnailDirectory = path.join(
  process.cwd(),
  "public",
  "images",
  "posts",
  "thumbnails",
);

export interface PostSource {
  id: string;
  data: Frontmatter;
  content: string;
}

const isProduction = process.env.NODE_ENV === "production";

const parsePosts = (): PostSource[] => {
  const issues: string[] = [];
  const posts: PostSource[] = [];
  const tagRegistry = loadTagRegistry();
  const seriesRegistry = loadSeriesRegistry();

  for (const fileName of fs.readdirSync(postsDirectory)) {
    if (!fileName.endsWith(".md")) continue;
    const id = fileName.replace(/\.md$/, "");
    const file = `posts/${fileName}`;
    const { data: rawData, content } = matter(
      fs.readFileSync(path.join(postsDirectory, fileName), "utf8"),
    );

    const parsed = frontmatterSchema.safeParse(rawData);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const hint =
          issue.code === "unrecognized_keys" &&
          issue.keys.includes("categories")
            ? " (categories는 단일 category로 바뀌었습니다)"
            : "";
        const field = issue.path.length ? `${issue.path.join(".")}: ` : "";
        issues.push(`${file}: ${field}${issue.message}${hint}`);
      }
      continue;
    }

    const data = parsed.data;

    const seenTags = new Set<string>();
    for (const tag of data.tags) {
      if (seenTags.has(tag)) {
        issues.push(`${file}: tags: "${tag}"가 중복되었습니다`);
      }
      seenTags.add(tag);
      if (!tagRegistry.canonical.has(tag)) {
        const suggestion = tagRegistry.aliases.get(tag.toLowerCase());
        issues.push(
          suggestion
            ? `${file}: tags: "${tag}" 대신 "${suggestion}"를 사용하세요`
            : `${file}: tags: "${tag}"는 content/tags.yaml에 등록되지 않았습니다`,
        );
      }
    }

    if (
      data.thumbnail &&
      !fs.existsSync(path.join(thumbnailDirectory, data.thumbnail))
    ) {
      issues.push(
        `${file}: thumbnail: public/images/posts/thumbnails/${data.thumbnail} 파일이 없습니다`,
      );
    }

    if (data.series && !seriesRegistry[data.series]) {
      issues.push(
        `${file}: series: "${data.series}"는 content/series.yaml에 등록되지 않았습니다`,
      );
    }

    posts.push({ id, data, content });
  }

  // 초안(draft)은 고유성·시리즈 순서 검사에서 제외한다.
  const published = posts.filter((post) => !post.data.draft);

  const byDescription = new Map<string, string[]>();
  for (const post of published) {
    const key = post.data.description.trim();
    byDescription.set(key, [...(byDescription.get(key) ?? []), post.id]);
  }
  for (const [description, ids] of byDescription) {
    if (ids.length > 1) {
      issues.push(
        `description이 중복됩니다 (${ids.map((id) => `posts/${id}.md`).join(", ")}): "${description}"`,
      );
    }
  }

  const bySeries = new Map<string, PostSource[]>();
  for (const post of published) {
    if (!post.data.series) continue;
    bySeries.set(post.data.series, [
      ...(bySeries.get(post.data.series) ?? []),
      post,
    ]);
  }
  for (const [series, members] of bySeries) {
    const orders = members
      .map((post) => post.data.seriesOrder ?? 0)
      .sort((a, b) => a - b);
    const expected = members.map((_, index) => index + 1);
    if (orders.some((order, index) => order !== expected[index])) {
      issues.push(
        `series "${series}": seriesOrder가 1부터 빠짐없이 이어져야 합니다 (현재: ${orders.join(", ")})`,
      );
    }
  }

  if (issues.length > 0) {
    throw new Error(
      `콘텐츠 검증에 실패했습니다 (${issues.length}건):\n${issues.map((issue) => `  - ${issue}`).join("\n")}`,
    );
  }

  return posts;
};

let cached: PostSource[] | null = null;

// 빌드 중에는 한 번만 검증하고, dev에서는 글을 고칠 때마다 다시 읽는다.
// 프로덕션 빌드에서는 draft 글을 제외한다.
export const loadPostSources = (): PostSource[] => {
  const posts = isProduction ? (cached ??= parsePosts()) : parsePosts();
  return isProduction ? posts.filter((post) => !post.data.draft) : posts;
};
