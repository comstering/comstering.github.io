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
    [selected, posts]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selected === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
