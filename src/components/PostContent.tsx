"use client";

import { useEffect, useRef } from "react";

interface PostContentProps {
  html: string;
}

// 본문 HTML을 렌더링하고 코드 블록마다 복사 버튼을 붙인다.
export const PostContent = ({ html }: PostContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const timers = new Set<number>();
    const buttons: HTMLButtonElement[] = [];

    root.querySelectorAll("pre").forEach((pre) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.textContent = "copy";
      button.setAttribute("aria-label", "코드 복사");
      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "copied";
        } catch {
          button.textContent = "failed";
        }
        const timer = window.setTimeout(() => {
          button.textContent = "copy";
          timers.delete(timer);
        }, 1600);
        timers.add(timer);
      });
      pre.appendChild(button);
      buttons.push(button);
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      buttons.forEach((button) => button.remove());
    };
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
