"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { SITE_URL } from "@/lib/site";

interface GiscusCommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
  strict?: "0" | "1";
  reactionsEnabled?: "0" | "1";
  emitMetadata?: "0" | "1";
  inputPosition?: "top" | "bottom";
  lang?: string;
  loading?: "lazy" | "eager";
}

const GISCUS_ORIGIN = "https://giscus.app";

// giscus는 iframe이라 사이트 CSS 변수를 읽지 못한다. 배포된 사이트의 커스텀 CSS(public/giscus)를
// 테마로 넘기고, 로컬 개발(localhost)에서는 접근할 수 없으므로 내장 테마로 대체한다.
const toGiscusTheme = (resolvedTheme: string): string => {
  const mode = resolvedTheme === "dark" ? "dark" : "light";
  return window.location.origin === SITE_URL
    ? `${SITE_URL}/giscus/${mode}.css`
    : mode;
};

const postTheme = (frame: HTMLIFrameElement, theme: string) => {
  frame.contentWindow?.postMessage(
    { giscus: { setConfig: { theme } } },
    GISCUS_ORIGIN,
  );
};

const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping,
  strict = "0",
  reactionsEnabled = "1",
  emitMetadata = "0",
  inputPosition = "bottom",
  lang = "ko",
  loading = "lazy",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  // 테마가 바뀌어도 스크립트를 다시 넣지 않도록 최신 값은 ref로 읽는다.
  const themeRef = useRef<string | null>(null);
  const hasTheme = Boolean(resolvedTheme);

  // 1) 사이트 테마가 확정/변경되면 ref를 갱신하고, 새로고침 없이 iframe에 setConfig 메시지를 보낸다.
  //    (아래 스크립트 주입 effect보다 먼저 선언해야 최초 주입 때 테마 값이 준비되어 있다)
  useEffect(() => {
    if (!resolvedTheme) return;
    themeRef.current = toGiscusTheme(resolvedTheme);
    const frame = containerRef.current?.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );
    if (frame) postTheme(frame, themeRef.current);
  }, [resolvedTheme]);

  // 2) 테마가 확정된 뒤 한 번만 giscus 스크립트를 넣는다.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !hasTheme || !themeRef.current) return;

    const script = document.createElement("script");
    script.src = `${GISCUS_ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-strict", strict);
    script.setAttribute("data-reactions-enabled", reactionsEnabled);
    script.setAttribute("data-emit-metadata", emitMetadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-theme", themeRef.current);
    script.setAttribute("data-lang", lang);
    script.setAttribute("data-loading", loading);

    container.replaceChildren(script);
    return () => container.replaceChildren();
  }, [
    hasTheme,
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    strict,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    lang,
    loading,
  ]);

  return <div className="giscus-container mt-4" ref={containerRef} />;
};

export default GiscusComments;
