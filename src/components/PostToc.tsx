"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PostHeading } from "@/lib/posts";
import { hasToc } from "@/lib/toc";

interface PostTocProps {
  headings: PostHeading[];
  /** sticky: 1280px 이상 오른쪽 목차 / inline: 1280px 미만 접이식 목차 */
  variant: "sticky" | "inline";
}

const useActiveHeading = (headings: PostHeading[]) => {
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

  return activeId;
};

export const PostToc = ({ headings, variant }: PostTocProps) => {
  const activeId = useActiveHeading(headings);
  const [open, setOpen] = useState(false);

  if (!hasToc(headings)) return null;

  const list = (
    <ol className="toc__list">
      {headings.map(({ id, text, depth }) => (
        <li key={id} className={depth === 3 ? "lvl-3" : "lvl-2"}>
          <a
            href={`#${id}`}
            aria-current={activeId === id ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details
        className="toc-inline"
        open={open}
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary>
          <span>
            <span className="toc-inline__long">on this page</span>
            <span className="toc-inline__short">contents</span>{" "}
            <span className="num text-mute">{headings.length}</span>
          </span>
          <ChevronDown aria-hidden />
        </summary>
        <nav className="toc" aria-label="목차">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="목차" className="toc">
      <p className="toc__label">on this page</p>
      {list}
      <p className="toc__top">
        <a href="#top" className="font-mono text-cap text-mute hover:text-fg">
          ↑ 맨 위로
        </a>
      </p>
    </nav>
  );
};
