"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail: string;
}

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [filtered, setFiltered] = useState<PostMeta[]>([]);

  // 모달 켜질 때 포스트 메타 받아오기
  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [isOpen]);

  // 쿼리 변경 시 필터링
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) return setFiltered([]);
    setFiltered(
      posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    );
  }, [query, posts]);

  // ESC로 닫기
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-xl shadow-lg">
        {/* 입력창 & 닫기 */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-700 px-4 py-2">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full bg-transparent focus:outline-none text-black dark:text-white"
          />
          <button onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* 결과 리스트 */}
        <ul className="max-h-60 overflow-y-auto">
          {filtered.length > 0
            ? filtered.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/post/${post.slug}`}
                    onClick={onClose}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <div className="font-medium">{post.title}</div>
                    <div className="text-xs text-gray-500">
                      {post.category} · {post.date}
                    </div>
                  </Link>
                </li>
              ))
            : query && (
                <li className="px-4 py-2 text-sm text-gray-500">No results</li>
              )}
        </ul>
      </div>
    </div>,
    document.body
  );
}
