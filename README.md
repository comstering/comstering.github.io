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

## 문서

- 디자인 시스템: [DESIGN.md](./DESIGN.md)
- 사용하는 Claude Code skill: [SKILLS.md](./SKILLS.md)
- 기획서: [cowork/prd](./cowork/prd)

글 작성 가이드(frontmatter 규칙, 카테고리, 태그, 이미지 경로)는 frontmatter 스키마를 정리하는 PR-2에서 추가합니다.
