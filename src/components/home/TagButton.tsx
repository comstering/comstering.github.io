"use client";

import { SEARCH_OPEN_EVENT } from "@/lib/search";

// 태그 페이지(F-SR-04)는 Phase 3이라, 지금은 태그 이름으로 검색 팔레트를 연다(태그는 검색 대상이다).
export const TagButton = ({ name, count }: { name: string; count: number }) => (
  <button
    type="button"
    aria-haspopup="dialog"
    onClick={() =>
      window.dispatchEvent(
        new CustomEvent(SEARCH_OPEN_EVENT, { detail: { query: name } }),
      )
    }
  >
    #{name}
    <small>{count}</small>
  </button>
);
