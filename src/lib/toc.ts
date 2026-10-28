import type { PostHeading } from "@/lib/posts";

// 목차를 보여 줄 h2 최소 개수. 그보다 적으면 목차(sticky·inline)를 만들지 않는다 (PRD-003 PR-12).
export const MIN_TOC_H2 = 3;

export const hasToc = (headings: PostHeading[]): boolean =>
  headings.filter(({ depth }) => depth === 2).length >= MIN_TOC_H2;
