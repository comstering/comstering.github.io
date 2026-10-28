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

const CLOSE_ICON =
  "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' aria-hidden='true'><path d='M18 6 6 18M6 6l12 12'/></svg>";

// 이미지 확대용 <dialog>를 처음 쓸 때 만든다. showModal()이 포커스 가두기와 Esc 닫기를 해 준다.
const createLightbox = (): HTMLDialogElement => {
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "이미지 확대 보기");
  dialog.innerHTML = `<button class="lightbox__close" type="button" aria-label="닫기">${CLOSE_ICON}</button><figure class="lightbox__fig"><img alt=""><figcaption></figcaption></figure>`;
  document.body.appendChild(dialog);
  // 바깥(배경) 클릭이나 닫기 버튼으로 닫는다
  dialog.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target === dialog || target.closest(".lightbox__close")) dialog.close();
  });
  return dialog;
};

// 본문 HTML을 렌더링하고 코드 복사 버튼과 이미지 확대 클릭을 처리한다.
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

      const label = button.querySelector(".code__copy-label") ?? button;
      try {
        await navigator.clipboard.writeText(rawCode(block));
        label.textContent = "copied";
        button.dataset.copied = "true";
      } catch {
        label.textContent = "failed";
      }
      window.clearTimeout(timers.get(button));
      timers.set(
        button,
        window.setTimeout(() => {
          label.textContent = "copy";
          delete button.dataset.copied;
          timers.delete(button);
        }, 2000),
      );
    };

    // 확대: 변환본이 본문 폭보다 넓은 이미지(img.zoomable)에만 붙는다
    let lightbox: HTMLDialogElement | null = null;
    let from: HTMLElement | null = null;
    const onClose = () => from?.focus(); // 닫으면 누른 이미지로 포커스를 돌려준다
    const openImage = (img: HTMLImageElement) => {
      if (!lightbox) {
        lightbox = createLightbox();
        lightbox.addEventListener("close", onClose);
      }
      const view = lightbox.querySelector("img");
      const caption = lightbox.querySelector("figcaption");
      if (!view || !caption) return;
      view.src = img.currentSrc || img.src;
      view.alt = img.alt;
      caption.textContent =
        img.closest("figure")?.querySelector("figcaption")?.textContent ?? "";
      from = img;
      lightbox.showModal();
    };
    const onImageClick = (event: MouseEvent) => {
      const img = (event.target as HTMLElement).closest<HTMLImageElement>(
        "img.zoomable",
      );
      if (img) openImage(img);
    };
    const onImageKey = (event: KeyboardEvent) => {
      const img = (event.target as HTMLElement).closest<HTMLImageElement>(
        "img.zoomable",
      );
      if (!img || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      openImage(img);
    };

    root.addEventListener("click", onClick);
    root.addEventListener("click", onImageClick);
    root.addEventListener("keydown", onImageKey);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("click", onImageClick);
      root.removeEventListener("keydown", onImageKey);
      lightbox?.removeEventListener("close", onClose);
      lightbox?.remove();
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
