# CONTEXT.md

**프로젝트**: comstering.github.io
**목적**: DevOps · Cloud Native Engineer 최한수(Comstering)의 개발 블로그와 프로필 사이트
**마지막 업데이트**: 2026-11-08 (Phase 2 개발 완료·보관 시점)

이 문서는 **요약과 배포 정보**만 담는다. 진행 중인 작업·다음 작업·측정 기준값은 [cowork/develop/STATUS.md](./cowork/develop/STATUS.md), 규칙과 함정은 [.claude/rules/](./.claude/rules/README.md), 결정과 요구사항은 [cowork/prd/](./cowork/prd/README.md)에 있다. 여기에 진행 상황을 복사하지 않는다(어긋난다).

## 현재 상태

- Phase 0(안정화), Phase 1(읽기 경험)은 끝났다([개발 요약](./cowork/develop/archive/README.md)).
- **Phase 2(포트폴리오, PRD-004) 개발 완료**(PR-18~25, [개발 요약](./cowork/develop/archive/phase2-summary.md)). About 재작성·검색 팔레트·홈 히어로와 사이드바·`resume.pdf` 생성·인기글(GoatCounter)·SEO(JSON-LD)·게이트 기록까지 머지됐다. 남은 것은 작성자의 G2-1 5초 테스트와 PR-24 Rich Results Test. 다음은 Phase 3(기획이 PRD를 쓴 뒤).
- 디자인은 Terminal Graphite 디자인 시스템([DESIGN.md](./DESIGN.md)), 자동 배포 가동.

### 기능 개요

- 블로그: frontmatter v2(단일 `category`, 정규 태그, 시리즈, `draft`)를 빌드 때 zod로 검증. 홈은 연도별 세로 리스트·카테고리 필터, 헤더 검색 팔레트(`⌘K`), 사이드바(인기글·시리즈·태그). 글 상세는 목차·시리즈·관련 글·읽기 진행률·OG 자동 생성
- About: `content/profile.yaml`·`experience.yaml`에서 그린다. 경력 전부 펼침, 회사 바로가기, `resume.pdf`(빌드 때 About 인쇄본으로 생성)
- SEO: `metadataBase`, canonical, OG/Twitter, JSON-LD(글 `BlogPosting`, 홈 `WebSite`, About `ProfilePage > Person`), `/rss.xml`, sitemap
- 인기글: 배포 워크플로가 GoatCounter 통계(최근 30일)를 하루 한 번 받아 홈 사이드바에 표시
- 품질: PR CI(`Quality`)가 lint·토큰·콘텐츠·빌드·산출물 검사·E2E·Lighthouse를 돌린다(순서와 기준값은 `cowork/develop/CONTEXT.md` 6장)

## Phase 2 게이트 기록 (PRD-004 3장, 2026-11-08 로컬·CI·라이브 기준)

| 게이트 | 결과 | 근거 |
| --- | --- | --- |
| G2-1 채용 5초 테스트 3명 | **미실시(사람 테스트)** | 첫 화면 이름·직함·경력·email·resume.pdf가 1280×720·360×640에서 스크롤 없이 보임은 E2E(`about.spec.ts` 첫 화면)와 스크린샷으로 확인. 지인 3명 결과는 아래 표에 기록 |
| G2-2 하드코딩 0건, About·PDF 같은 데이터 | 통과 | `yarn check:content`(제목 25개·파일 69개, CI). `resume.pdf`는 `/about`을 인쇄해 만들어 같은 `content/*.yaml`에서 나옴 |
| G2-3 About ↔ 글 링크 0건 | 통과 | E2E `about.spec.ts` G2-3 |
| G2-4 J1 시나리오 | 통과 | E2E `j1.spec.ts`: 홈 → 상단바 about → 회사 바로가기 → resume.pdf 다운로드(200, `application/pdf`) |
| G2-5 성능 차단선·접근성 100·SEO 100, About 예외 해제 | 통과 | CI Lighthouse(PR #74, 3회 중앙값): 홈·About·글 성능 99, 접근성 100, SEO 100, LCP 1.7~1.8s, CLS ≤ 0.03, TBT ≤ 74ms. `lighthouserc.json`에 About 예외 없음(PR-19) |
| G2-6 resume.pdf | 통과 | `yarn build:resume`: 5쪽·550KB, 글자 412종 검색 가능, 라이트 배경, 쪽 경계 검사. E2E `resume.spec.ts` |
| G2-7 인기글 | 통과 | 라이브 배포 로그 `인기글: 최근 30일 5편`(2026-11-08, 캐시 복원·저장 포함). 토큰 없음·API 실패에도 빌드 성공은 E2E `popular.spec.ts`(모의 서버) |
| G2-8 검색 | 통과 | E2E `search.spec.ts`(`⌘K`·`/` → 검색어 → ↓ → Enter, 3개 페이지). 처음 열 때 불러와 Lighthouse 차단선 유지 |

### G2-1 5초 테스트 방법과 결과

- 방법: About 첫 화면(1280×720 PC, 360×640 모바일)을 5초 보여 주고 숨긴 뒤 **이름·직무·연차·연락 방법**을 말하게 한다. 3명 모두 4가지를 말하면 통과.
- 보여 줄 화면: `yarn build && yarn serve out` 후 `/about`을 해당 크기로 연다(PR-25 본문에 같은 크기의 스크린샷을 붙였다).

| 일시 | 사람(익명) | 기기 | 이름 | 직무 | 연차 | 연락 방법 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | 아직 안 했다 |

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
