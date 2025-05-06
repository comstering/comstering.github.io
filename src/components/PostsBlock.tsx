"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

interface PostsBlockProps {
  posts: PostMeta[];
}

export default function PostsBlock({ posts }: PostsBlockProps) {
  const [selected, setSelected] = useState<string>("all");

  // 모든 카테고리 수집
  const categories = useMemo(() => {
    const setCats = new Set<string>();
    posts.forEach((p) => p.categories.forEach((c) => setCats.add(c)));
    return ["all", ...Array.from(setCats)];
  }, [posts]);

  // 선택된 카테고리에 따른 필터링
  const filtered = useMemo(() => {
    if (selected === "all") return posts;
    return posts.filter((p) => p.categories.includes(selected));
  }, [selected, posts]);

  return (
    <div>
      {/* 카테고리 버튼 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${
                selected === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200"
              }
            `}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* 포스트 카드 리스트 */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={600}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">
                {post.categories.join(" · ")} · {post.date}
              </p>
              <h2 className="text-lg font-semibold mt-1">{post.title}</h2>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
