"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { PostMetadata } from "@/lib/posts";
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState<string>("");
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [filtered, setFiltered] = useState<PostMetadata[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [isOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setFiltered(
      q
        ? posts.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q)
          )
        : []
    );
  }, [query, posts]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-xl shadow-lg">
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
        <ul className="max-h-60 overflow-y-auto">
          {filtered.length > 0
            ? filtered.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/post/${post.id}`}
                    onClick={onClose}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <div className="font-medium">{post.title}</div>
                    <div className="text-xs text-gray-500">
                      {post.categories.join(" · ")} · {post.date}
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
};
