# 개발 진행 현황

_최종 갱신: 2026-11-01 · 기준 커밋 `ccb7361`(main, #57 머지) · 기준 기획서 PRD-004(approved) · 디자인 v1.4_

이 문서는 **지금 진행 중인 Phase의 상태와 다음 작업**만 담는다. 끝난 Phase는 [archive](./archive/README.md)에 요약돼 있다(Phase 0 안정화, Phase 1 읽기 경험).

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | 완료. [요약](./archive/phase0-summary.md) |
| Phase 1 읽기 경험 (PRD-003) | 완료. [요약](./archive/phase1-summary.md). About 성능·CLS·TBT `warn` 예외는 PR-19까지 |
| Phase 2 포트폴리오 (PRD-004) | **approved, 개발 시작 전.** PR-18 → PR-19 → PR-20 → PR-21 → PR-22 → PR-23 |
| 지금 막힌 것 | 없음. 열린 질문 없음 |

## 다음 작업 (새 세션은 여기서 시작)

1. `git checkout main && git pull`, `gh pr list`로 열린 PR을 본다(tracked 변경이 있으면 `git stash` 후 pull, `git stash -u` 금지). 미추적 `resume.md`·`.claude/launch.json`은 내 것이 아니니 커밋하지 않는다. 기획·디자인 세션이 `cowork/prd`·`cowork/design`을 로컬에서 고쳐 두었을 수 있다(작성자가 별도 PR로 올린다, 개발은 커밋하지 않는다)
   - **환경(2026-11-01):** Next 16.4.3(Turbopack), React 19.3.1, Tailwind 4.3.3, eslint는 `eslint .` + flat config. `sharp`는 0.33.5 고정. 보류한 메이저: typescript 7, eslint 10, lucide-react 1.x, @types/node 26, sharp 0.35(필요하면 사용자 검토 후 따로)
   - **Claude in Chrome이 켜져 있으면 화면 확인은 실제 Chrome으로 매번 한다**(시키지 않아도, 메모리 `feedback-verify-in-chrome`). **눈에 보이는 결과물이 있으면 PC·Mobile 스크린샷을 PR을 열 때 본문에 넣는다**(메모리 `feedback-pr-screenshots`). 작업이 끝나면 커밋·push·PR까지 바로 올린다(`feedback-always-commit-and-pr`)
2. **Phase 2 PR-18(데이터 분리·검증)부터**: `cowork/prd/004_portfolio_projects-and-about.md` 0장·7장·PR-18 절과 디자인 D-1~D-5 요청을 먼저 읽는다. 첫 단계에서 `content/profile.yaml`·`content/experience.yaml`·zod 스키마를 만든다. 문장은 바꾸지 않고 옮긴다(바뀌는 것은 기술 스택 7그룹뿐)
3. PR-19에서 **About CLS ≤ 0.1(관측 3회 중앙값)을 해결하고 `lighthouserc.json`의 About 예외(`assertMatrix[2]`)를 지운다.** 원인과 해법 후보는 [archive/phase1-summary.md](./archive/phase1-summary.md) 4장(소개 둘째 문단이 글꼴 도착 뒤 줄 수가 바뀜, preload는 효과 없었음, 근거는 CI 리포트 `layout-shifts`)
4. 이월(작성자 작업): 카카오·LinkedIn OG 미리보기(LinkedIn Post Inspector는 로그인 필요), Search Console·네이버 sitemap 재제출, 사이트 1차 완성 후 branch protection
5. 열린 질문: 없음(REQUESTS.md 비어 있음, 다음 번호 Q16)

## Phase 2 PR별 상태

| PR | 내용 | 상태 | 링크 |
| --- | --- | --- | --- |
| (문서) | Phase 0·1 개발 요약 보관(`archive/`)과 개발 문서 정리 | 🔍 PR #58 오픈 | #58 |
| PR-18 | 데이터 분리·검증(`content/profile.yaml`·`experience.yaml`, zod) | ⏳ 대기 | |
| PR-19 | About 강화 + **About CLS ≤ 0.1·예외 해제** | ⏳ 대기 | |
| PR-20 | 홈 히어로·대표 프로젝트 | ⏳ 대기 | |
| PR-21 | 이력서 웹·PDF | ⏳ 대기 | |
| PR-22 | SEO·OG·sitemap(`/resume`) | ⏳ 대기 | |
| PR-23 | 게이트·5초 테스트·문서 | ⏳ 대기 | |

한 번에 PR 하나, 사용자가 머지하면 다음으로 간다.

## 사용자에게 보이는 현재 상태 (라이브 사이트, #57 머지 기준)

- 디자인 시스템 v1.4(Terminal Graphite), 자동 배포 가동. 홈은 연도별 세로 리스트·카테고리 필터·검색, 글 상세는 목차·시리즈·관련 글·읽기 진행률·OG 자동 생성
- 접근성 100·SEO 100(CI `error`), 본문 이미지 WebP(≤ 200KB), 글꼴 서브셋, 주간 링크 체커(`Links` 워크플로)

## 현재 성능 기준값 (Lighthouse, 리눅스 CI, 실제 Chrome 관측, 3회 중앙값, PR #56)

| 페이지 | 성능 | LCP | CLS | TBT | 비고 |
| --- | --- | --- | --- | --- | --- |
| 홈 | 97 | 1.7s | 0.058 | 128ms | 차단선 통과 |
| 글 상세 | 97 | 1.8s | 0.030 | 131ms | 차단선 통과 |
| About | 92 | 1.8s | **0.125** | 178ms | 성능·CLS·TBT `warn` 예외(PR-19에서 해제) |

차단선: 성능 ≥ 90·LCP ≤ 2.5s·CLS ≤ 0.1·TBT ≤ 300ms. 목표선(warn): 성능 ≥ 95·LCP ≤ 2.0s·CLS ≤ 0.05·TBT ≤ 200ms. 맥 로컬 Lighthouse의 CLS는 리눅스 CI와 달라(About 로컬 0) 판단 근거가 아니다.

## 사용자(작성자) 작업

- Search Console·네이버 서치어드바이저 sitemap 재제출
- LinkedIn Post Inspector로 OG 확인 (로그인 필요)
- 사이트 1차 완성 후 branch protection 켜기(PR CI 통과 필수)

## 세션 기록

| 날짜 | 한 일 | 남은 일 / 다음 첫 명령 |
| --- | --- | --- |
| 2026-11-01 | Phase 0·1 종료와 정리. 개발 요약을 `archive/phase0-summary.md`·`phase1-summary.md`로 보관하고, 이 폴더의 이력성 내용(Phase 1 PR 표·PR별 동작 표·측정 이력·질문 Q1~Q15·성능 브리프)을 걷어냄(원문은 git 기록과 PR 본문). CONTEXT는 규칙·함정만 남김. PR #58 | #58 머지 후 Phase 2 PR-18 시작 |
