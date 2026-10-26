// src/lib/posts.ts

import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { common } from "lowlight";
import { hcl } from "./hljs-hcl";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: string[];
  thumbnail: string;
  contentHtml: string;
  readingTime: number;
  headings: PostHeading[];
}

export interface PostHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

// 한글은 분당 500자, 영문 단어는 분당 220개 기준 (코드 블록 제외)
const estimateReadingTime = (markdown: string): number => {
  const text = markdown.replace(/```[\s\S]*?```/g, " ");
  const hangul = (text.match(/[가-힣]/g) ?? []).length;
  const words = (text.replace(/[가-힣]/g, " ").match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.round(hangul / 500 + words / 220));
};

const decodeEntities = (value: string): string =>
  value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&");

// rehype-slug가 부여한 id를 사용해 h2/h3 목차를 추출한다
const extractHeadings = (html: string): PostHeading[] =>
  Array.from(html.matchAll(/<h([23]) id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)).map(
    ([, depth, id, inner]) => ({
      id,
      depth: Number(depth) as 2 | 3,
      text: decodeEntities(
        inner
          .replace(/<a [^>]*class="heading-anchor"[^>]*>[\s\S]*?<\/a>/g, "")
          .replace(/<[^>]+>/g, "")
          .trim(),
      ),
    }),
  );

export const getSortedPostsData = (): PostMetadata[] => {
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
        description: string;
        tags: string[];
        categories: string[];
        thumbnail: string;
      };

    return {
      id,
      title,
      date,
      description,
      tags,
      categories,
      thumbnail,
      contentHtml: "",
      readingTime: estimateReadingTime(matterResult.content),
      headings: [],
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

export const getPostData = cache(async (id: string): Promise<PostMetadata> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        ariaLabel: "이 섹션 링크",
      },
      content: { type: "text", value: "#" },
    })
    .use(rehypeHighlight, { detect: true, languages: { ...common, hcl } })
    .use(rehypeStringify)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: "nofollow",
    })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const { title, date, description, tags, categories, thumbnail } =
    matterResult.data as PostMetadata;

  return {
    id,
    title,
    date,
    description,
    tags,
    categories,
    thumbnail,
    contentHtml,
    readingTime: estimateReadingTime(matterResult.content),
    headings: extractHeadings(contentHtml),
  };
});

// 정렬된 목록 기준으로 이전(더 오래된) 글과 다음(더 최신) 글
export const getAdjacentPosts = (
  id: string,
): { older: PostMetadata | null; newer: PostMetadata | null } => {
  const posts = getSortedPostsData();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return { older: null, newer: null };
  return {
    newer: posts[index - 1] ?? null,
    older: posts[index + 1] ?? null,
  };
};
