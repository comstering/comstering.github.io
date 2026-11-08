# comstering.github.io

DevOps · Cloud Native Engineer **Comstering**의 개발 블로그와 프로필 사이트입니다.
Kubernetes, AWS, 오픈소스 기여, 일하는 방식을 기록합니다.

- 사이트: https://comstering.github.io
- 스택: Next.js 16 (App Router, 정적 export) · React 19 · TypeScript · Tailwind CSS v4 · Markdown 블로그

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
content/      About·홈 데이터와 태그·시리즈(YAML, 빌드 때 검증)
cowork/       기획서(prd), 디자인 시안/명세(design), 개발 진행 기록(develop)
.claude/rules 에이전트가 매번 지키는 규칙과 함정
DESIGN.md     디자인 시스템 (UI 작업 전에 확인)
```

## 글 작성 가이드

글은 `posts/<slug>.md`에 둡니다. **파일명이 URL(`/posts/<slug>`)이므로 한 번 발행한 뒤에는 바꾸지 않습니다.**

```yaml
---
title: "글 제목"
description: "이 글만의 한두 문장 요약 (80~160자 권장, 글마다 달라야 함)"
date: "2026-10-27"        # 따옴표 필수, YYYY-MM-DD
categories: [infra]       # 1~2개. infra | backend | frontend | oss | note
tags: [kubernetes, eks]   # content/tags.yaml에 등록된 정규 태그만
series: eks-from-scratch  # 선택. content/series.yaml에 등록된 slug
seriesOrder: 1            # series를 쓰면 필수. 1부터 빠짐없이
draft: true               # 선택. 기본 false
---
```

- **날짜**: 작성한 `date` 하나만 씁니다. 수정일(`updated`)은 없고, 쓰면 빌드가 실패합니다.
- **카테고리**: `infra`(클라우드·쿠버네티스·IaC), `backend`, `frontend`, `oss`(오픈소스 기여), `note`(회고·메모). 1~2개를 고르고(중복 금지) 표시 순서는 항상 `infra · backend · frontend · oss · note` 고정이라 작성 순서는 상관없습니다. 홈 필터는 두 값 모두로 걸립니다(`[infra, oss]` 글은 `infra`와 `oss` 필터 둘 다에 나옵니다). 글이 0편인 카테고리는 홈 필터에서 숨겨집니다.
- **태그**: `content/tags.yaml`에 정규 태그(소문자 kebab-case)를 추가한 뒤 글에서 씁니다. 별칭(`k8s` 등)을 쓰면 빌드가 정규 태그를 안내하며 실패합니다. 카테고리 이름은 태그로 쓰지 않습니다.
- **시리즈**: `content/series.yaml`에 `slug`, `label`, `title`을 등록합니다. 글 목록 메타에는 `label`(8자 이하), 시리즈 박스에는 `slug`를 씁니다.
- **OG 이미지**: 글마다 빌드 때 자동 생성됩니다(`/posts/<slug>/og.png`, 제목·카테고리·날짜·시리즈). 직접 만들 필요가 없고 `thumbnail` 필드는 없습니다.
- **이미지**: 본문 이미지는 `public/images/posts/contents/<slug>/`에 두고 `/images/posts/contents/<slug>/파일명`으로 참조합니다.
- **초안**: `draft: true`인 글은 `yarn dev`에서만 보이고(`draft` 표시), 프로덕션 빌드의 목록·상세·sitemap·RSS에서는 제외됩니다.
- **검증**: `yarn build`(및 `yarn dev`)가 frontmatter를 검사합니다. 필수 필드 누락, 잘못된 카테고리, 미등록 태그, 중복 description, 미등록 시리즈, 어긋난 `seriesOrder`가 있으면 파일명과 이유를 모아 보여 주고 실패합니다.

### 본문 문법

- **코드 블록**: 펜스 뒤에 파일명과 강조 줄을 적습니다. 언어 라벨과 복사 버튼은 자동으로 붙습니다(`$ ` 셸 프롬프트는 복사에서 빠집니다).

  ````md
  ```yaml title="values.yaml" {3,5-6}
  replicas: 2
  ```
  ````
- **콜아웃**: GitHub 문법을 씁니다. `> [!NOTE]`(안내), `> [!WARNING]`(주의). 마커 다음 줄부터 본문입니다.

  ```md
  > [!WARNING]
  > 이 설정은 노드를 재시작합니다.
  ```
- **표**: 그대로 GFM 표를 쓰면 됩니다. 폭이 넘치면 가로 스크롤되고 가장자리가 흐려집니다.
- **이미지**: `![alt](/images/posts/contents/<slug>/파일.png "캡션")`. alt는 필수에 가깝습니다(비면 빌드 경고). title을 쓰면 캡션이 됩니다. 원본은 PNG/JPG로 두면 빌드가 WebP로 변환하고(최대 폭 1440px, 200KB 이하), 화면보다 큰 이미지는 눌러서 확대됩니다.
- **목차**: 본문 `h2`가 3개 이상이면 자동으로 만들어집니다(`h3`까지).
- **관련 글**: 태그가 겹치는 글(최대 3편)이 자동으로 붙습니다. 시리즈·이전/다음 글은 제외됩니다.

### 시리즈 만들기

1. `content/series.yaml`에 slug를 등록합니다. `label`은 목록 메타용 짧은 이름(8자 이하, 예: `series eks 3/5`), `title`은 시리즈 박스 제목입니다.
2. 시리즈에 들어갈 글마다 frontmatter에 `series: <slug>`와 `seriesOrder`(1부터 빠짐없이)를 적습니다.
3. 빌드가 미등록 slug와 빠진·중복된 순서를 잡아 줍니다.

### 자동으로 만들어지는 것

- **OG 이미지**: 글마다 빌드 때 `/posts/<slug>/og.png`(1200×630)가 만들어지고 `og:image`로 쓰입니다. 제목·카테고리·날짜·시리즈가 들어가니 따로 만들 필요가 없습니다.
- **읽기 진행률**: 글 상세 헤더 아래의 얇은 바(CSS만 사용, 지원하지 않는 브라우저에서는 숨김).
- **링크 검사**: `Links` 워크플로가 매주 월요일에 모든 글의 외부 링크를 검사하고, 깨진 링크가 있으면 이슈를 만듭니다(PR에서는 바뀐 글만, 실패시키지 않음). 예외는 `lychee.toml`.

## 문서

- 디자인 시스템: [DESIGN.md](./DESIGN.md)
- 사용하는 Claude Code skill: [SKILLS.md](./SKILLS.md)
- 기획서: [cowork/prd](./cowork/prd)

