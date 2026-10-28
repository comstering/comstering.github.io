// src/lib/posts.ts

import { cache } from "react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { common } from "lowlight";
import { hcl } from "./hljs-hcl";
import { rehypeCodeMeta } from "./content/rehype-code-meta";
import { rehypeArticleBlocks } from "./content/rehype-article-blocks";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { loadPostSources, type PostSource } from "./content/load";
import { loadSeriesRegistry } from "./content/registry";
import { selectRelated } from "./related";
import type { Category } from "./content/schema";

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: Category[];
  series?: string;
  seriesOrder?: number;
  /** 글 목록 메타용: `series eks 3/5` */
  seriesLabel?: string;
  seriesTotal?: number;
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

// 시리즈 글 수(레지스트리 label과 함께 목록 메타 `series eks 3/5`에 쓴다)
const seriesCounts = (): Map<string, number> => {
  const counts = new Map<string, number>();
  loadPostSources().forEach(({ data }) => {
    if (data.series) counts.set(data.series, (counts.get(data.series) ?? 0) + 1);
  });
  return counts;
};

const toMetadata = (
  { id, data, content }: PostSource,
  contentHtml = "",
  headings: PostHeading[] = [],
): PostMetadata => ({
  id,
  title: data.title,
  description: data.description,
  date: data.date,
  tags: data.tags,
  categories: data.categories,
  series: data.series,
  seriesOrder: data.seriesOrder,
  seriesLabel: data.series
    ? loadSeriesRegistry()[data.series]?.label
    : undefined,
  seriesTotal: data.series ? seriesCounts().get(data.series) : undefined,
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
    .use(rehypeCodeMeta)
    .use(rehypeArticleBlocks)
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

// 관련 글: 태그가 겹치는 글(시리즈 글, 이전/다음 글 제외), 최대 3편
export const getRelatedPosts = (id: string): PostMetadata[] => {
  const posts = getSortedPostsData();
  const current = posts.find((post) => post.id === id);
  if (!current) return [];
  const { older, newer } = getAdjacentPosts(id);
  return selectRelated(
    current,
    posts,
    [older?.id, newer?.id].filter((value): value is string => Boolean(value)),
  );
};

export interface SeriesInfo {
  slug: string;
  label: string;
  title: string;
  order: number;
  total: number;
  items: { id: string; title: string; current: boolean }[];
}

// 글이 속한 시리즈의 전체 목록(순서대로). 시리즈가 아니면 null
export const getSeriesInfo = (id: string): SeriesInfo | null => {
  const sources = loadPostSources();
  const current = sources.find((source) => source.id === id);
  const slug = current?.data.series;
  if (!current || !slug) return null;
  const entry = loadSeriesRegistry()[slug];
  if (!entry) return null;

  const members = sources
    .filter((source) => source.data.series === slug)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
  return {
    slug,
    label: entry.label,
    title: entry.title,
    order: current.data.seriesOrder ?? 0,
    total: members.length,
    items: members.map((member) => ({
      id: member.id,
      title: member.data.title,
      current: member.id === id,
    })),
  };
};
