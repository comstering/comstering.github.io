// src/lib/posts.ts

import { cache } from "react";
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
import { loadPostSources, type PostSource } from "./content/load";
import type { Category } from "./content/schema";

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  description: string;
  updated?: string;
  tags: string[];
  category: Category;
  series?: string;
  seriesOrder?: number;
  thumbnail?: string;
  draft: boolean;
  relatedProject?: string;
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

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

// 목차 텍스트용: 이름 엔티티(&amp;)와 숫자 엔티티(&#x26;, &#38;)를 복원한다
const decodeEntities = (value: string): string =>
  value.replace(
    /&(?:#x([0-9a-f]+)|#(\d+)|([a-z]+));/gi,
    (match, hex, dec, name) => {
      if (hex) return String.fromCodePoint(parseInt(hex, 16));
      if (dec) return String.fromCodePoint(Number(dec));
      return NAMED_ENTITIES[name.toLowerCase()] ?? match;
    },
  );

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

const toMetadata = (
  { id, data, content }: PostSource,
  contentHtml = "",
  headings: PostHeading[] = [],
): PostMetadata => ({
  id,
  title: data.title,
  description: data.description,
  date: data.date,
  updated: data.updated,
  tags: data.tags,
  category: data.category,
  series: data.series,
  seriesOrder: data.seriesOrder,
  thumbnail: data.thumbnail,
  draft: data.draft,
  relatedProject: data.relatedProject,
  contentHtml,
  readingTime: estimateReadingTime(content),
  headings,
});

export const getSortedPostsData = (): PostMetadata[] =>
  loadPostSources()
    .map((source) => toMetadata(source))
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return a.id < b.id ? -1 : 1;
    });

export const getPostData = cache(async (id: string): Promise<PostMetadata> => {
  const source = loadPostSources().find((post) => post.id === id);
  if (!source) {
    throw new Error(`글을 찾을 수 없습니다: ${id}`);
  }

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
    .process(source.content);
  const contentHtml = processedContent.toString();

  return toMetadata(source, contentHtml, extractHeadings(contentHtml));
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
