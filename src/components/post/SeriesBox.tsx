"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SeriesInfo } from "@/lib/posts";
import { cn } from "@/lib/cn";

// 한 줄로 접힌 시리즈 박스. 누르면 시리즈 전체 목록이 펼쳐진다 (F-PO-07).
export const SeriesBox = ({ series }: { series: SeriesInfo }) => {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const current = series.items.find((item) => item.current);

  return (
    <section
      className={cn("series", expanded && "is-expanded")}
      aria-labelledby={`${id}-title`}
    >
      <div className="series__head">
        <button
          type="button"
          className="series__toggle"
          aria-expanded={expanded}
          aria-controls={`${id}-list`}
          onClick={() => setExpanded((value) => !value)}
        >
          <span id={`${id}-title`}>
            <span className="series__name">{series.slug}</span>
            <span className="series__label">series {series.label}</span>{" "}
            <span className="num">
              {series.order}/{series.total}
            </span>
          </span>
          <span className="series__now">{current?.title}</span>
          <ChevronDown aria-hidden />
          <span className="sr-only">
            {expanded ? "시리즈 전체 목록 닫기" : "시리즈 전체 목록 열기"}
          </span>
        </button>
      </div>
      <ol className="series__list" id={`${id}-list`} aria-label={series.title}>
        {series.items.map((item) => (
          <li key={item.id}>
            {item.current ? (
              <span className="is-current" aria-current="page">
                {item.title}
              </span>
            ) : (
              <Link href={`/posts/${item.id}`}>{item.title}</Link>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};
