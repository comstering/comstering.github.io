// src/components/GiscusComments.tsx
"use client"; // 이 컴포넌트는 클라이언트 컴포넌트입니다.

import React, { useEffect, useRef } from "react";

// Giscus 컴포넌트가 받을 props의 타입을 정의합니다.
interface GiscusCommentsProps {
  repo: string; // GitHub 저장소 이름 (예: 'your-username/your-blog-repo')
  repoId: string; // Giscus 앱 설치 후 얻는 Repo ID
  category: string; // Discussion 카테고리 이름 (예: 'Comments', 'General')
  categoryId: string; // Discussion 카테고리 ID
  mapping: "pathname" | "url" | "title" | "og:title" | "specific" | "number"; // 댓글-게시글 매핑 방식
  strict?: "0" | "1"; // Strict 매핑 여부
  reactionsEnabled?: "0" | "1"; // 이모지 반응 활성화 여부
  emitMetadata?: "0" | "1"; // Giscus 메타데이터 전송 여부
  inputPosition?: "top" | "bottom"; // 댓글 입력창 위치
  theme?:
    | "light"
    | "dark"
    | "preferred_color_scheme"
    | "transparent_dark"
    | "dark_dimmed"
    | "light_high_contrast"
    | "light_protanopia"
    | "light_tritanopia"
    | "dark_high_contrast"
    | "dark_protanopia"
    | "dark_tritanopia"
    | "dark_blue"
    | "purple_dark"
    | "custom"; // 테마
  lang?: string; // 언어 설정 (예: 'ko', 'en')
  loading?: "lazy" | "eager"; // 로딩 방식
}

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
  theme = "preferred_color_scheme", // 시스템 테마를 따르도록 기본값 설정
  lang = "ko",
  loading = "lazy",
}) => {
  const ref = useRef<HTMLDivElement>(null); // Giscus 스크립트를 삽입할 DOM 요소를 참조합니다.

  useEffect(() => {
    // Giscus 스크립트 요소를 생성합니다.
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://giscus.app/client.js"; // Giscus 클라이언트 스크립트 URL
    scriptElement.async = true; // 비동기 로딩
    scriptElement.crossOrigin = "anonymous"; // CORS 보안 설정

    // Giscus 설정을 데이터 속성(data-*)으로 스크립트에 추가합니다.
    scriptElement.setAttribute("data-repo", repo);
    scriptElement.setAttribute("data-repo-id", repoId);
    scriptElement.setAttribute("data-category", category);
    scriptElement.setAttribute("data-category-id", categoryId);
    scriptElement.setAttribute("data-mapping", mapping);
    scriptElement.setAttribute("data-strict", strict);
    scriptElement.setAttribute("data-reactions-enabled", reactionsEnabled);
    scriptElement.setAttribute("data-emit-metadata", emitMetadata);
    scriptElement.setAttribute("data-input-position", inputPosition);
    scriptElement.setAttribute("data-theme", theme); // 테마 설정
    scriptElement.setAttribute("data-lang", lang); // 언어 설정
    scriptElement.setAttribute("data-loading", loading); // 로딩 방식

    // Giscus 인스턴스가 이미 존재하면 제거하여 중복 로딩을 방지하고 테마 변경을 반영합니다.
    if (ref.current) {
      while (ref.current.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
      ref.current.appendChild(scriptElement); // 새로운 Giscus 스크립트를 DOM에 추가합니다.
    }
  }, [
    // props 값이 변경될 때마다 useEffect가 다시 실행되도록 의존성 배열에 추가합니다.
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    strict,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    theme,
    lang,
    loading,
  ]);

  return (
    <div className="giscus-container mt-16" ref={ref}>
      {/* Giscus 댓글 시스템이 여기에 로드됩니다 */}
    </div>
  );
};

export default GiscusComments;
