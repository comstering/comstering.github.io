# comstering.github.io

DevOps · Cloud Native Engineer **Comstering**의 개발 블로그와 프로필 사이트입니다.
Kubernetes, AWS, 오픈소스 기여, 일하는 방식을 기록합니다.

- 사이트: https://comstering.github.io
- 스택: Next.js 15 (App Router, 정적 export) · React 19 · TypeScript · Tailwind CSS v4 · Markdown 블로그

## 개발

```bash
yarn install
yarn dev       # http://localhost:3000 (Turbopack)
yarn lint      # ESLint
yarn build     # 정적 사이트를 out/ 에 생성
```

## 배포

GitHub Actions(`.github/workflows/deploy.yaml`)가 `yarn build` 결과(`out/`)를 GitHub Pages에 배포합니다. 수동 배포 스크립트나 별도 배포 브랜치는 쓰지 않습니다.

## 구조

```
posts/        블로그 글 (Markdown + frontmatter)
public/       정적 파일 (이미지, ads.txt 등)
src/app/      페이지 (홈, 글 상세, About, 404, sitemap, robots)
src/components/  UI 컴포넌트 (ui/ 는 공통 컴포넌트)
src/lib/      글 파싱 등 유틸리티
cowork/       기획서(prd)와 디자인 시안/명세(design)
DESIGN.md     디자인 시스템 (UI 작업 전에 확인)
```

## 글 작성 가이드

글은 `posts/<slug>.md`에 둡니다. **파일명이 URL(`/posts/<slug>`)이므로 한 번 발행한 뒤에는 바꾸지 않습니다.**

```yaml
---
title: "글 제목"
description: "이 글만의 한두 문장 요약 (80~160자 권장, 글마다 달라야 함)"
date: "2026-10-27"        # 따옴표 필수, YYYY-MM-DD
updated: "2026-11-02"     # 선택. 수정했을 때만
category: infra           # infra | backend | frontend | oss | note 중 하나
tags: [kubernetes, eks]   # content/tags.yaml에 등록된 정규 태그만
series: eks-from-scratch  # 선택. content/series.yaml에 등록된 slug
seriesOrder: 1            # series를 쓰면 필수. 1부터 빠짐없이
thumbnail: "eks.png"      # 선택. public/images/posts/thumbnails/ 안의 파일명
draft: true               # 선택. 기본 false
---
```

- **카테고리**: `infra`(클라우드·쿠버네티스·IaC), `backend`, `frontend`, `oss`(오픈소스 기여), `note`(회고·메모). 하나만 고릅니다. 글이 0편인 카테고리는 홈 필터에서 숨겨집니다.
- **태그**: `content/tags.yaml`에 정규 태그(소문자 kebab-case)를 추가한 뒤 글에서 씁니다. 별칭(`k8s` 등)을 쓰면 빌드가 정규 태그를 안내하며 실패합니다. 카테고리 이름은 태그로 쓰지 않습니다.
- **시리즈**: `content/series.yaml`에 `slug`, `label`, `title`을 등록합니다. 글 목록 메타에는 `label`, 시리즈 박스에는 `slug`를 씁니다.
- **이미지**: 썸네일은 `public/images/posts/thumbnails/`, 본문 이미지는 `public/images/posts/contents/<slug>/`에 두고 `/images/posts/contents/<slug>/파일명`으로 참조합니다.
- **초안**: `draft: true`인 글은 `yarn dev`에서만 보이고(`draft` 표시), 프로덕션 빌드의 목록·상세·sitemap·RSS에서는 제외됩니다.
- **검증**: `yarn build`(및 `yarn dev`)가 frontmatter를 검사합니다. 필수 필드 누락, 잘못된 카테고리, 미등록 태그, 중복 description, 없는 썸네일, 미등록 시리즈, 어긋난 `seriesOrder`가 있으면 파일명과 이유를 모아 보여 주고 실패합니다.

## 문서

- 디자인 시스템: [DESIGN.md](./DESIGN.md)
- 사용하는 Claude Code skill: [SKILLS.md](./SKILLS.md)
- 기획서: [cowork/prd](./cowork/prd)

