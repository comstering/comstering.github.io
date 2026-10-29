"use client";

import React, { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { PostMetadata } from "@/lib/posts";
import { CATEGORIES } from "@/lib/content/schema";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
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
  const [query, setQuery] = useState("");

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const inCategory = selected === ALL || post.categories.some((category) => category === selected);
      const inQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [posts, selected, query]);

  const groups = useMemo(() => {
    const byYear = new Map<string, PostMetadata[]>();
    filtered.forEach((post) => {
      const year = post.date.slice(0, 4);
      byYear.set(year, [...(byYear.get(year) ?? []), post]);
    });
    return Array.from(byYear.entries());
  }, [filtered]);

  const reset = () => {
    onSelect(ALL);
    setQuery("");
  };

  return (
    <div>
      <div className="relative">
        <Search
          aria-hidden
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute"
        />
        <Input
          type="search"
          aria-label="포스트 검색"
          placeholder="제목, 설명, 태그로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11 pr-10"
        />
        {query && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-mute transition-colors hover:text-fg"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div
        role="group"
        aria-label="카테고리 필터"
        className="no-scrollbar mt-4 flex gap-2 overflow-x-auto"
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

      {groups.length > 0 ? (
        groups.map(([year, items]) => (
          <section key={year} aria-labelledby={`year-${year}`} className="mt-12">
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
        ))
      ) : (
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-fg">검색 결과가 없습니다</p>
          <p className="mt-2 text-mute">
            다른 키워드로 검색하거나 필터를 초기화해 보세요.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer rounded-md border border-line px-4 py-2 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
          >
            초기화
          </button>
        </div>
      )}
    </div>
  );
};
