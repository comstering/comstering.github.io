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
  categories: string[];
  thumbnail: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

export const getAllPosts = (): PostMeta[] => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fn) => fn.endsWith(".md"));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
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
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
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
};
