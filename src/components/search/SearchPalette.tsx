"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import {
  searchEntries,
  splitMatch,
  type SearchEntry,
} from "@/lib/search";

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
  /** 처음 열 때 채울 검색어(홈 사이드바 태그) */
  initialQuery?: string;
}

// 인덱스는 팔레트를 처음 열 때 한 번만 내려받는다(PRD-004 5.7). 실패하면 다음에 다시 시도한다.
let indexPromise: Promise<SearchEntry[]> | null = null;
const loadIndex = (): Promise<SearchEntry[]> => {
  indexPromise ??= fetch("/search-index.json")
    .then((response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.json() as Promise<SearchEntry[]>;
    })
    .catch((error) => {
      indexPromise = null;
      throw error;
    });
  return indexPromise;
};

const Marked = ({ text, query }: { text: string; query: string }) => {
  const [before, match, after] = splitMatch(text, query);
  return (
    <>
      {before}
      {match && <mark>{match}</mark>}
      {after}
    </>
  );
};

// 헤더 검색 팔레트: 네이티브 <dialog>(포커스 가두기·Esc·배경 비활성은 브라우저가 한다) + combobox/listbox.
const SearchPalette = ({
  open,
  onClose,
  initialQuery = "",
}: SearchPaletteProps) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lockScroll();
      loadIndex().then(
        (entries) => {
          setIndex(entries);
          setFailed(false);
        },
        () => setFailed(true),
      );
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // 닫힐 때(Esc·배경 클릭·결과 선택) 스크롤 잠금을 풀고 입력을 비운다. 포커스는 <dialog>가 열기 전 자리로 돌려준다.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onDialogClose = () => {
      unlockScroll();
      setQuery("");
      setSelected(0);
      onClose();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => {
      dialog.removeEventListener("close", onDialogClose);
      if (dialog.open) {
        dialog.close();
        unlockScroll();
      }
    };
  }, [onClose]);

  const hits = useMemo(
    () => (index ? searchEntries(index, query) : []),
    [index, query],
  );
  const q = query.trim();
  const active = Math.min(selected, Math.max(hits.length - 1, 0));

  const go = (entry: SearchEntry) => {
    router.push(entry.u);
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!hits.length) return;
      const next =
        (active + (event.key === "ArrowDown" ? 1 : -1) + hits.length) %
        hits.length;
      setSelected(next);
      document
        .getElementById(`${listId}-${next}`)
        ?.scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter") {
      const hit = hits[active];
      if (hit) {
        event.preventDefault();
        go(hit.entry);
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  let status = "";
  if (failed) status = "검색 목록을 불러오지 못했습니다";
  else if (!index) status = "검색 목록을 불러오는 중";
  else if (!hits.length) status = "검색 결과 없음";
  else status = q ? `글 ${hits.length}개` : `최근 글 ${hits.length}편`;

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="사이트 검색"
      onClick={(event) => {
        // ::backdrop을 누르면 대상이 dialog 자신이다
        if (event.target === dialogRef.current) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div className="palette__input-wrap">
        <Search aria-hidden size={18} />
        <input
          ref={inputRef}
          className="palette__input"
          type="text"
          role="combobox"
          aria-expanded={hits.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            hits.length ? `${listId}-${active}` : undefined
          }
          aria-label="글 검색"
          placeholder="제목, 태그, 소제목으로 글 검색"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
        />
        {/* 터치 기기에는 Esc가 없어 닫기 버튼을 겸한다(보이는 글자 esc를 이름에 포함) */}
        <button
          type="button"
          className="kbd palette__close"
          aria-label="esc 닫기"
          onClick={onClose}
        >
          <span className="palette__close-key">esc</span>
          <span className="palette__close-label">닫기</span>
        </button>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {status}
      </div>

      <div
        id={listId}
        className="palette__results"
        role="listbox"
        aria-label="검색 결과"
      >
        {failed && (
          <div className="palette__empty">
            검색 목록을 불러오지 못했습니다. 잠시 뒤 다시 열어 주세요.
          </div>
        )}
        {!failed && index && !hits.length && (
          <div className="palette__empty">
            ‘{query}’에 대한 글이 없습니다.
            <br />
            <span className="font-mono text-xs">
              제목, 태그, 소제목으로 찾습니다. 다른 키워드나 영문 표기로 검색해
              보세요.
            </span>
          </div>
        )}
        {hits.length > 0 && (
          <div className="palette__group" role="presentation">
            {q ? `posts ${hits.length}` : "recent"}
          </div>
        )}
        {hits.map(({ entry, heading }, i) => (
          <a
            key={entry.u}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={i === active}
            href={entry.u}
            className="palette__item"
            onClick={(event) => {
              event.preventDefault();
              go(entry);
            }}
            onMouseMove={() => i !== active && setSelected(i)}
          >
            <span className="palette__item-main">
              <span className="palette__item-title">
                <Marked text={entry.t} query={q} />
              </span>
              {heading && (
                <span className="palette__item-sub">
                  # <Marked text={heading} query={q} />
                </span>
              )}
            </span>
            <span className="palette__item-meta">
              {entry.d} · {entry.c.join(", ")}
            </span>
          </a>
        ))}
      </div>

      <div className="palette__foot" aria-hidden>
        <span>
          <span className="kbd">↑</span>
          <span className="kbd">↓</span> 이동
        </span>
        <span>
          <span className="kbd">↵</span> 열기
        </span>
        <span>
          <span className="kbd">esc</span> 닫기
        </span>
      </div>
    </dialog>
  );
};

export default SearchPalette;
