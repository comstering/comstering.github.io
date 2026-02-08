"use client";

import React, { useState, useMemo } from "react";
import type { PostMetadata } from "@/lib/posts";
import PostCard from "./PostCard";

interface PostsBlockProps {
  posts: PostMetadata[];
}

export const PostsBlock: React.FC<PostsBlockProps> = ({ posts }) => {
  const [selected, setSelected] = useState<string>("all");
  const categories = useMemo(() => {
    const setCats = new Set<string>();
    posts.forEach((p) => p.categories.forEach((c) => setCats.add(c)));
    return ["all", ...Array.from(setCats)];
  }, [posts]);
  const filtered = useMemo(
    () =>
      selected === "all"
        ? posts
        : posts.filter((p) => p.categories.includes(selected)),
    [selected, posts],
  );

  return (
    <div>
      <div className="sticky top-20 z-40 py-4 backdrop-blur-md bg-slate-50/50 dark:bg-gray-950/50 -mx-4 px-4 overflow-x-auto flex justify-center">
        <div className="flex items-center gap-2 min-w-max pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`px-6 py-2 rounded-full text-xs font-black tracking-widest transition-all ${selected === category ? "bg-sky-500 text-white shadow-lg" : "bg-white dark:bg-gray-900 text-gray-500 border border-gray-200 dark:border-gray-800"}`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
