---
paths:
  - "posts/**"
  - "content/**"
  - "public/images/**"
  - "src/lib/**"
---

# 글·콘텐츠·본문 파이프라인

글 작성 규칙의 기준은 저장소 `README.md`의 "글 작성 가이드"다.

- 글은 `posts/*.md`. **파일명이 URL이므로 발행 후 바꾸지 않는다.**
- frontmatter는 `src/lib/content/schema.ts`의 zod가 빌드 때 검증한다. `draft: true` 글은 프로덕션 빌드(목록·상세·sitemap·RSS)에서 빠진다.
- 태그는 `content/tags.yaml`, 시리즈는 `content/series.yaml`(label 8자 이하).
- 본문 파이프라인: `src/lib/posts.ts`(remark → rehype). 코드 블록은 `src/lib/content/rehype-code-meta.ts`, 콜아웃·표는 `rehype-article-blocks.ts`, 아이콘은 `hast-icons.ts`. 코드 복사 클릭은 `PostContent.tsx`에서 이벤트 위임.
- hast 속성 값은 문자열이어야 한다(`strokeWidth: "2"`). 숫자를 넣으면 `next build`가 타입 오류.

## 이미지

- 원본은 `public/images`(git). `yarn build`/`yarn dev` 전에 `scripts/optimize-images.mjs`가 sharp로 `public/_img/*.webp`(git 제외)와 `manifest.json`을 만든다.
- 본문 `<img>`는 `rehype-images.ts`가 변환본·`width`/`height`·lazy·확대 표시를 채우고, `postbuild`(`prune-output.mjs`)가 배포물에서 본문 원본을 뺀다.
- 새 이미지는 `public/images/posts/contents/<slug>/`에 PNG/JPG로 두면 된다. 변환 방식을 바꾸면 `PIPELINE_VERSION`을 올린다. `thumbnails/`는 변환하지 않는다.
