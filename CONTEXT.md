# CONTEXT.md

**프로젝트**: comstering.github.io
**목적**: DevOps · Cloud Native Engineer 최한수(Comstering)의 개발 블로그와 프로필 사이트
**마지막 업데이트**: 2026-11-08 (Phase 2 PR-24 머지 시점)

이 문서는 **요약과 배포 정보**만 담는다. 진행 중인 작업·다음 작업·측정 기준값은 [cowork/develop/STATUS.md](./cowork/develop/STATUS.md), 규칙과 함정은 [.claude/rules/](./.claude/rules/README.md), 결정과 요구사항은 [cowork/prd/](./cowork/prd/README.md)에 있다. 여기에 진행 상황을 복사하지 않는다(어긋난다).

## 현재 상태

- Phase 0(안정화), Phase 1(읽기 경험)은 끝났다([개발 요약](./cowork/develop/archive/README.md)).
- **Phase 2(포트폴리오, PRD-004) 진행 중.** About 재작성·검색 팔레트·홈 히어로와 사이드바·`resume.pdf` 생성·인기글(GoatCounter)·SEO(JSON-LD)까지 머지됐고, 남은 것은 PR-25(게이트·문서)다.
- 디자인은 Terminal Graphite 디자인 시스템([DESIGN.md](./DESIGN.md)), 자동 배포 가동.

### 기능 개요

- 블로그: frontmatter v2(단일 `category`, 정규 태그, 시리즈, `draft`)를 빌드 때 zod로 검증. 홈은 연도별 세로 리스트·카테고리 필터, 헤더 검색 팔레트(`⌘K`), 사이드바(인기글·시리즈·태그). 글 상세는 목차·시리즈·관련 글·읽기 진행률·OG 자동 생성
- About: `content/profile.yaml`·`experience.yaml`에서 그린다. 경력 전부 펼침, 회사 바로가기, `resume.pdf`(빌드 때 About 인쇄본으로 생성)
- SEO: `metadataBase`, canonical, OG/Twitter, JSON-LD(글 `BlogPosting`, 홈 `WebSite`, About `ProfilePage > Person`), `/rss.xml`, sitemap
- 인기글: 배포 워크플로가 GoatCounter 통계(최근 30일)를 하루 한 번 받아 홈 사이드바에 표시
- 품질: PR CI(`Quality`)가 lint·토큰·콘텐츠·빌드·산출물 검사·E2E·Lighthouse를 돌린다(순서와 기준값은 `cowork/develop/CONTEXT.md` 6장)

## 알려진 이슈 / 확인 필요

- `operator-lifecycle-manager` 글은 본문이 작성 중이다(`draft: true`라 배포에는 나가지 않음).
- 조회수는 GoatCounter가 `localhost`에서 집계하지 않아 로컬에서는 0으로 보인다.
- Giscus 커스텀 CSS는 배포된 URL에서만 읽힌다. 로컬은 내장 테마로 대체.
- `main` 브랜치 보호(필수 체크 `Quality`)는 만들어 두었지만 **사이트 1차 완성 전까지 적용하지 않는다**. 적용 전에는 CI가 실패해도 머지가 가능하다.
- 작성자 이월 작업: Search Console·네이버 sitemap 재제출, LinkedIn Post Inspector 확인

## 배포 정보

- **배포**: `main` push 또는 매일 03:00 KST `schedule`(인기글 갱신) → `.github/workflows/deploy.yaml` → GitHub Pages(artifact 배포). 이전 커밋 재배포는 Actions의 `workflow_dispatch`
- **PR 검증**: `.github/workflows/ci.yaml`(`Quality`)
- **URL**: https://comstering.github.io

## 참고 사항

- 이미지는 unoptimized 모드(정적 export 요구사항), 동적 라우팅은 빌드 타임에 생성
- PR 규칙은 [.claude/rules/commit-and-pr.md](./.claude/rules/commit-and-pr.md)·[pr-workflow.md](./.claude/rules/pr-workflow.md). 머지는 작성자가 GitHub에서 직접 한다

## Skills

이 프로젝트에서 사용하는 skill 목록과 설치/복구 방법은 [SKILLS.md](./SKILLS.md) 참고.
