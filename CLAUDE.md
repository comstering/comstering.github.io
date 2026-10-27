# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

개인 개발 사이트 및 블로그 포스팅 사이트. Next.js 기반 정적 사이트로 GitHub Pages에 배포.

## Commands

```bash
yarn dev          # Start dev server (localhost:3000, Turbopack enabled)
yarn build        # Production build (static export)
yarn start        # Start production server
yarn lint         # Run ESLint
yarn check:tokens # DESIGN.md 금지 패턴 검사 (src/)
yarn check:output # 빌드 산출물 검사 (yarn build 이후, out/)
```

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4 (@tailwindcss/postcss, @tailwindcss/typography)
- **Theme**: next-themes (dark/light mode support)
- **Icons**: lucide-react, react-icons
- **Markdown**: 
  - gray-matter (frontmatter parsing)
  - remark (markdown processing)
  - remark-gfm (GitHub Flavored Markdown)
  - remark-html (HTML conversion)
  - rehype-highlight (code syntax highlighting)
  - rehype-external-links (external link handling)
- **Deployment**: GitHub Actions (`.github/workflows/deploy.yaml`) → GitHub Pages
- **Package Manager**: Yarn

## Architecture

### Static Export Configuration
- **Output**: Static export mode (`output: "export"`)
- **Images**: Unoptimized (required for static export)
- **Trailing Slash**: Disabled

### Directory Structure

```
src/
├── app/              # App Router pages
│   ├── posts/        # Blog post listings
│   │   └── [id]/     # Individual post pages (dynamic route)
│   └── about/        # About page
├── components/       # React components
├── lib/              # Utility functions
└── context/          # React Context providers (e.g., theme)

posts/                # Markdown blog posts (*.md files)
public/               # Static assets
```

### Blog Post System
- Posts are stored as Markdown files in `/posts/` directory
- Frontmatter parsed with gray-matter
- Markdown converted to HTML with remark/rehype pipeline
- Syntax highlighting via rehype-highlight
- Dynamic routes: `/posts/[id]`

## Deployment Workflow

배포 경로는 GitHub Actions 하나다. 수동 배포 스크립트와 별도 배포 브랜치는 쓰지 않는다.

1. `main`에 push (또는 Actions의 `workflow_dispatch`) → `.github/workflows/deploy.yaml` 실행
2. `yarn build`로 `/out`에 정적 파일 생성 → Pages artifact로 업로드
3. `actions/deploy-pages`가 GitHub Pages에 배포

> 현재 디자인 리팩토링(PRD-002) 기간이라 `push` 트리거는 꺼져 있고 `workflow_dispatch`만 동작한다. PR-8에서 복구한다.

## CI

`pull_request`(대상 `main`)마다 `.github/workflows/ci.yaml`의 **Quality** 잡이 돈다: `yarn install --frozen-lockfile` → `yarn lint` → `yarn check:tokens` → `yarn build`(frontmatter 검증 포함) → `yarn check:output`. 로컬에서 PR 전에 같은 순서로 확인할 수 있다.

- `check:tokens`: `src/`(`globals.css` 제외)에서 Tailwind 기본 팔레트 색 클래스, `dark:`, hex 색상, 시안 표시(`ph`)를 찾으면 실패
- `check:output`: 모든 글의 og:image 파일 존재, `rss.xml`·`sitemap.xml` 유효성과 항목 수, `adsbygoogle` 0건

## Path Aliases

- `@/*` → `./src/*`

## Skills

사용하는 skill 목록과 설치/복구 명령은 [SKILLS.md](./SKILLS.md)에 기록한다. skill을 추가/삭제하면 SKILLS.md를 같이 갱신한다. 새 skill 설치 전에는 반드시 사용자에게 확인받는다.

## Design System

UI 작업은 [DESIGN.md](./DESIGN.md)의 토큰과 규칙만 사용한다. 컴포넌트에 hex 값, `dark:` 색상 클래스, Tailwind 기본 팔레트(`gray-*`, `sky-*` 등)를 쓰지 않는다. 글 목록은 카드 그리드가 아니라 세로 리스트.
