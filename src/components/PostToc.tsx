"use client";

import { useEffect, useState } from "react";
import type { PostHeading } from "@/lib/posts";
import { cn } from "@/lib/cn";

interface PostTocProps {
  headings: PostHeading[];
}

export const PostToc = ({ headings }: PostTocProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="목차"
      className="max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-line pl-4 text-sm"
    >
      <p className="mb-3 font-mono text-xs text-mute">on this page</p>
      <ul className="space-y-2">
        {headings.map(({ id, text, depth }) => (
          <li key={id} className={cn(depth === 3 && "pl-3")}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? "location" : undefined}
              className={cn(
                "block break-keep leading-snug transition-colors hover:text-fg",
                activeId === id ? "text-accent" : "text-mute",
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
