// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  categories: string[]; // always an array
  thumbnail: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const dir = path.join(process.cwd(), "posts");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, fileName), "utf8");
      const { data } = matter(raw);

      // frontmatter may have either `category: "foo"` or `category: ["a","b"]`
      const rawCats = data.categories ?? data.category ?? [];
      const categories = Array.isArray(rawCats)
        ? rawCats.map(String)
        : [String(rawCats)];

      return {
        slug,
        title: String(data.title),
        description: String(data.description),
        date: String(data.date),
        categories,
        thumbnail: String(data.thumbnail),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── 특정 슬러그 포스트 가져오기 ───────────────────────────
export async function getPostBySlug(
  slug: string
): Promise<PostMeta & { contentHtml: string }> {
  const file = path.join(process.cwd(), "posts", slug + ".md");
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const rawCats = data.categories ?? data.category ?? [];
  const categories = Array.isArray(rawCats)
    ? rawCats.map(String)
    : [String(rawCats)];

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    categories,
    thumbnail: String(data.thumbnail),
    contentHtml,
  };
}
