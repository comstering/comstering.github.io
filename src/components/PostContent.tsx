"use client";

import { useEffect, useRef } from "react";

interface PostContentProps {
  html: string;
}

const SHELL_LANGS = new Set(["bash", "sh", "shell", "console", "zsh"]);

// 줄 래퍼(.ln)를 합쳐 원문을 복원한다. 셸 블록은 줄 맨 앞 "$ "를 뺀다.
const rawCode = (block: HTMLElement): string => {
  const lines = Array.from(block.querySelectorAll("pre .ln")).map(
    (line) => line.textContent ?? "",
  );
  const shell = SHELL_LANGS.has(block.dataset.lang ?? "");
  return lines
    .map((line) => (line === " " ? "" : line))
    .map((line) => (shell ? line.replace(/^\$ /, "") : line))
    .join("\n");
};

// 본문 HTML을 렌더링하고 코드 블록의 복사 버튼 클릭을 처리한다.
export const PostContent = ({ html }: PostContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const timers = new Map<HTMLElement, number>();

    const onClick = async (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
        ".code__copy",
      );
      const block = button?.closest<HTMLElement>(".code");
      if (!button || !block) return;

      try {
        await navigator.clipboard.writeText(rawCode(block));
        button.textContent = "copied";
        button.dataset.copied = "true";
      } catch {
        button.textContent = "failed";
      }
      window.clearTimeout(timers.get(button));
      timers.set(
        button,
        window.setTimeout(() => {
          button.textContent = "copy";
          delete button.dataset.copied;
          timers.delete(button);
        }, 1600),
      );
    };

    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("click", onClick);
      timers.forEach((timer) => window.clearTimeout(timer));
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
