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
  thumbnail?: string;
  contentHtml: string;
}

export const getSortedPostsData = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const { title, date, description, tags, categories, thumbnail } =
      matterResult.data as {
        title: string;
        date: string;
        description?: string;
        tags?: string[];
        categories?: string[];
        thumbnail?: string;
      };

    return {
      id,
      title,
      date,
      description: description || "",
      tags: tags || [],
      categories: categories || [],
      thumbnail: thumbnail || "",
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
};

// src/lib/posts.ts 에 아래 함수 추가 (기존 코드의 가장 아래에 추가하세요)

// 모든 고유한 카테고리 목록을 가져오는 함수
export const getAllCategories = (): string[] => {
  const allPosts = getSortedPostsData(); // 이미 정의된 모든 포스트 데이터 가져오기 함수 재활용

  const categoriesSet = new Set<string>();
  allPosts.forEach((post) => {
    post.categories?.forEach((category) => {
      categoriesSet.add(category);
    });
  });

  // Set을 배열로 변환하고 알파벳 순으로 정렬
  const categoriesArray = Array.from(categoriesSet).sort();

  // 'All' 옵션을 맨 앞에 추가하여 반환
  return ["All", ...categoriesArray];
};

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

  const { title, date, description, tags, categories, thumbnail } =
    matterResult.data as {
      title: string;
      date: string;
      description?: string;
      tags?: string[];
      categories?: string[];
      thumbnail?: string;
    };

  return {
    id,
    title,
    date,
    description: description || "",
    tags: tags || [],
    categories: categories || [],
    thumbnail: thumbnail || "",
    contentHtml,
  };
};
