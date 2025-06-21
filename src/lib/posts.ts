// src/lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostData {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  categories?: string[];
  contentHtml: string;
}

// <-- 수정: function 선언을 const 화살표 함수로 변경
export const getSortedPostsData = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const { title, date, description, tags, categories } =
      matterResult.data as {
        title: string;
        date: string;
        description?: string;
        tags?: string[];
        categories?: string[];
      };

    return {
      id,
      title,
      date,
      description: description || "",
      tags: tags || [],
      categories: categories || [],
      contentHtml: "",
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}; // <-- 끝에 세미콜론(;)을 추가합니다.

// <-- 수정: function 선언을 const 화살표 함수로 변경
export const getPostData = async (id: string): Promise<PostData> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const { title, date, description, tags, categories } = matterResult.data as {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    categories?: string[];
  };

  return {
    id,
    title,
    date,
    description: description || "",
    tags: tags || [],
    categories: categories || [],
    contentHtml,
  };
}; // <-- 끝에 세미콜론(;)을 추가합니다.
