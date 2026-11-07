"use client";

import React, { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PostMetadata } from "@/lib/posts";
import { CATEGORIES } from "@/lib/content/schema";
import { Chip } from "@/components/ui/Chip";
import { PostListItem } from "./PostListItem";

interface PostsBlockProps {
  posts: PostMetadata[];
}

const ALL = "all";

interface PostsViewProps extends PostsBlockProps {
  selected: string;
  onSelect: (category: string) => void;
}

// 선택된 카테고리는 URL(?category=)이 정한다. 정적 HTML에는 필터 없는 전체 목록이 들어간다.
export const PostsBlock: React.FC<PostsBlockProps> = ({ posts }) => (
  <Suspense
    fallback={<PostsView posts={posts} selected={ALL} onSelect={() => {}} />}
  >
    <PostsWithUrlFilter posts={posts} />
  </Suspense>
);

const PostsWithUrlFilter: React.FC<PostsBlockProps> = ({ posts }) => {
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams().get("category");

  // 글이 있는 카테고리만 유효하다. 그 밖의 값(?category=xyz)은 all로 본다.
  const selected =
    param && posts.some((post) => post.categories.some((c) => c === param))
      ? param
      : ALL;

  const onSelect = (category: string) => {
    // push: 뒤로가기로 이전 필터가 복원되도록 방문 기록을 남긴다.
    router.push(
      category === ALL ? pathname : `${pathname}?category=${category}`,
      { scroll: false },
    );
  };

  return <PostsView posts={posts} selected={selected} onSelect={onSelect} />;
};

const PostsView: React.FC<PostsViewProps> = ({ posts, selected, onSelect }) => {
  // 칩 순서는 CATEGORIES 순서를 따르고, 글이 0편인 카테고리는 숨긴다.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((post) =>
      post.categories.forEach((category) =>
        counts.set(category, (counts.get(category) ?? 0) + 1),
      ),
    );
    return [
      { name: ALL, count: posts.length },
      ...CATEGORIES.filter((name) => counts.has(name)).map((name) => ({
        name,
        count: counts.get(name) ?? 0,
      })),
    ];
  }, [posts]);

  const filtered = useMemo(
    () =>
      posts.filter(
        (post) =>
          selected === ALL ||
          post.categories.some((category) => category === selected),
      ),
    [posts, selected],
  );

  const groups = useMemo(() => {
    const byYear = new Map<string, PostMetadata[]>();
    filtered.forEach((post) => {
      const year = post.date.slice(0, 4);
      byYear.set(year, [...(byYear.get(year) ?? []), post]);
    });
    return Array.from(byYear.entries());
  }, [filtered]);

  return (
    <div>
      <div
        role="group"
        aria-label="카테고리 필터"
        className="no-scrollbar -my-1.5 mt-10 flex gap-2 overflow-x-auto py-1.5"
      >
        {categories.map(({ name, count }) => (
          <Chip
            key={name}
            selected={selected === name}
            onClick={() => onSelect(name)}
          >
            {name} <span>{count}</span>
          </Chip>
        ))}
      </div>

      {groups.map(([year, items]) => (
        <section key={year} aria-labelledby={`year-${year}`} className="mt-10">
          <h2
            id={`year-${year}`}
            className="border-b border-line pb-3 font-mono text-xs tracking-wide text-mute"
          >
            {year}
          </h2>
          {items.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </section>
      ))}
    </div>
  );
};
