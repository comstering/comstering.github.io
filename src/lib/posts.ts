// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ── 타입 정의 ───────────────────────────────────────────
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

// ── 경로 설정 ───────────────────────────────────────────
const postsDirectory = path.join(process.cwd(), "posts");

// ── 모든 포스트 메타 정보 가져오기 ───────────────────────
export function getAllPosts(): PostMeta[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fn) => fn.endsWith(".md"));

  const posts: PostMeta[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      category: data.category as string,
      thumbnail: data.thumbnail as string,
    };
  });

  // 날짜 내림차순 정렬
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ── 특정 슬러그 포스트 가져오기 ───────────────────────────
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    category: data.category as string,
    thumbnail: data.thumbnail as string,
    contentHtml,
  };
}
