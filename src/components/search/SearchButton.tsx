"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";

// 팔레트 코드는 처음 열 때 불러온다(초기 JS·TBT에 영향 없음, PRD-004 5.7).
const SearchPalette = dynamic(() => import("./SearchPalette"), { ssr: false });

const isTyping = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  return (
    !!el &&
    (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
  );
};

// 헤더 `search ⌘K` 버튼과 전역 단축키(Cmd/Ctrl+K, 입력란 밖에서 `/`).
export const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const show = useCallback(() => {
    setLoaded(true);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLoaded(true);
        setOpen((value) => !value);
      } else if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTyping(event.target)
      ) {
        event.preventDefault();
        show();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show]);

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        aria-label="검색 (search)"
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        onClick={show}
      >
        <Search aria-hidden size={15} />
        <span className="search-trigger__label">search</span>
        <span className="kbd" aria-hidden>
          ⌘K
        </span>
      </button>
      {loaded && <SearchPalette open={open} onClose={close} />}
    </>
  );
};
