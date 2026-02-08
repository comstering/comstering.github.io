"use client";

import React, { useState, useMemo } from "react";
import type { PostMetadata } from "@/lib/posts";
import PostCard from "./PostCard";
import { Search, X } from "lucide-react";

interface PostsBlockProps {
  posts: PostMetadata[];
}

export const PostsBlock: React.FC<PostsBlockProps> = ({ posts }) => {
  const categories = useMemo(() => {
    const setCats = new Set<string>();
    posts.forEach((p) => p.categories.forEach((c) => setCats.add(c)));
    return ["all", ...Array.from(setCats)];
  }, [posts]);

  const [selected, setSelected] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selected === "all" || post.categories.includes(selected);
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selected, searchQuery, posts]);

  const clearFilters = () => {
    setSelected("all");
    setSearchQuery("");
  };

  return (
    <div>
      <div className="sticky top-20 z-40 space-y-6 py-6 backdrop-blur-md bg-slate-50/70 dark:bg-gray-950/70 -mx-4 px-4 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-sky-500/5">
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="포스트 제목 또는 내용 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-14 pr-12 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none text-lg font-medium shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
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
      {filtered.length > 0 ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-6 bg-white dark:bg-gray-900/40 rounded-[40px] border border-dashed border-gray-200 dark:border-gray-800">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl text-gray-400">
            <Search className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              &quot;{searchQuery}&quot;에 대한 포스트를 찾을 수 없습니다.
              <br />
              다른 키워드로 검색하거나 필터를 초기화해 보세요.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-xs tracking-widest rounded-2xl hover:bg-sky-500 dark:hover:bg-sky-500 dark:hover:text-white transition-all shadow-lg"
          >
            필터 및 검색 초기화
          </button>
        </div>
      )}
    </div>
  );
};
