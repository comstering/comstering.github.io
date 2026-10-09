# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

개인 개발 사이트 및 블로그 포스팅 사이트. Next.js 기반 정적 사이트로 GitHub Pages에 배포.

## Commands

```bash
yarn dev          # Start dev server (localhost:3000, Turbopack enabled)
yarn build        # Production build (static export)
yarn start        # Start production server
yarn lint         # Run ESLint
yarn deploy       # Deploy to GitHub Pages (gh-pages branch)
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
- **Deployment**: gh-pages (static files to gh-pages branch)
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
├── api/              # API-like data fetching
│   └── posts/        # Post data fetching logic
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

1. `yarn build` - Generates static files in `/out` directory
2. `yarn deploy` - Creates `.nojekyll` file and pushes to gh-pages branch
3. GitHub Pages serves from gh-pages branch

## Path Aliases

- `@/*` → `./src/*`

## Skills

사용하는 skill 목록과 설치/복구 명령은 [SKILLS.md](./SKILLS.md)에 기록한다. skill을 추가/삭제하면 SKILLS.md를 같이 갱신한다. 새 skill 설치 전에는 반드시 사용자에게 확인받는다.
