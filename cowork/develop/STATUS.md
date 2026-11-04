# 개발 진행 현황

_최종 갱신: 2026-11-04 · 기준 커밋 `58e0090`(main, #58 머지) · 기준 기획서 PRD-004(2026-11-02 최종) · 디자인 25번(2026-11-03)_

이 문서는 **지금 진행 중인 Phase의 상태와 다음 작업**만 담는다. 끝난 Phase는 [archive](./archive/README.md)에 요약돼 있다(Phase 0 안정화, Phase 1 읽기 경험).

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | 완료. [요약](./archive/phase0-summary.md) |
| Phase 1 읽기 경험 (PRD-003) | 완료. [요약](./archive/phase1-summary.md). About 성능·CLS·TBT `warn` 예외는 PR-19까지 |
| Phase 2 포트폴리오 (PRD-004) | **approved, 개발 시작 전.** 기획이 2026-11-02에 재검토해 **PR-18~PR-25**로 재정리(홈=블로그, About=경력, 헤더 검색 팔레트 포함, About 인쇄 → `resume.pdf`). 디자인 25번 답변까지 나옴. 작성자 결정(히어로 안·문구) 대기 |
| 지금 막힌 것 | 없음. PR-18은 바로 시작 가능(히어로 안은 PR-21 전에 필요). 열린 질문은 REQUESTS Q16~Q18 |

## 다음 작업 (새 세션은 여기서 시작)

1. `git checkout main && git pull`, `gh pr list`로 열린 PR을 본다(tracked 변경이 있으면 `git stash` 후 pull, `git stash -u` 금지).
   - **로컬 미커밋 파일을 구분한다.** 커밋하지 않는다: 기획·디자인 세션 파일(`cowork/prd/*`, `cowork/design/`의 22~25번·`site/*`·`system/*`·`tools/*`, 작성자가 별도 PR로 올림), `resume.pdf`(2026-11-04 시험 산출물, 6쪽, PR-22에서 빌드 때 자동 생성할 것), `resume.md`(작성자 파일), `.claude/launch.json`. 커밋할 때는 항상 파일을 지정해 `git add`한다
   - **환경:** Next 16.4.3(Turbopack), React 19.3.1, Tailwind 4.3.3, eslint는 `eslint .` + flat config. `sharp`는 0.33.5 고정. 보류한 메이저: typescript 7, eslint 10, lucide-react 1.x, @types/node 26, sharp 0.35(필요하면 사용자 검토 후 따로)
   - **Chrome:** 이 세션 끝에는 확장은 응답하나 이 세션의 탭 그룹이 없었다. 새 세션은 시작하자마자 `tabs_context_mcp {createIfEmpty:true}`로 탭을 열고, **눈에 보이는 변경은 실제 Chrome으로 매번 확인**한다(메모리 `feedback-verify-in-chrome`). 실제 Chrome 창은 406px 아래로 줄지 않으니 360px은 Playwright Chromium으로 잰다
   - **PR 규칙(메모리에 반영됨):** 작업이 끝나면 커밋·push·PR까지 바로 올리고 후속은 같은 브랜치에 커밋한다. **눈에 보이는 결과물이 있으면 PC·Mobile 스크린샷을 PR을 열 때 본문에 넣는다**(`tools/shoot.mjs`·`publish-shots.sh`). 새 의존성·CI 액션은 먼저 알린다
2. **PR-18 데이터 분리·검증부터**: `cowork/prd/004_portfolio_projects-and-about.md` 4장(데이터 `content/profile.yaml`·`experience.yaml`·`site.yaml`, 4.2·4.3 스키마, 4.5 검증 규칙)을 먼저 읽는다. **문장은 바꾸지 않고 옮긴다**(바뀌는 것은 기술 스택 7그룹뿐). 원본은 **현재 About(`src/app/about/page.tsx`·`Bio.tsx`), 루트 `resume.md`는 쓰지 않는다.** `site.yaml`(홈 제목·한 줄 소개)은 히어로 안이 정해진 뒤 값이 확정되므로 PR-18에서는 스키마와 임시값. 수용: 규칙별 깨진 fixture에서 빌드 실패, 전후 텍스트 비교를 PR 설명에 첨부, 화면은 아직 그대로
3. **PR-19(About 다시 그리기)에서** 디자인 `site/about.html`·25번 2장(경력 전부 펼침, 회사 바로가기 3개, what i do·관련 글 없음, 밀도)을 구현하고, **About CLS ≤ 0.1(CI 3회 중앙값)을 해결한 뒤 `lighthouserc.json`의 About 예외(`assertMatrix[2]`)를 지운다.** 해법은 디자인 D-5 폴백 `@font-face`(22번 3장, `design/tools/measure-fallback-cls.mjs`). 원인은 [archive/phase1-summary.md](./archive/phase1-summary.md) 4장(소개 문단이 글꼴 도착 뒤 줄 수가 바뀜, preload는 효과 없었음). 결과는 REQUESTS Q16으로 디자인에 알린다
4. 작성자 할 일(개발이 기다리는 것): **히어로 안·문구 선택**(디자인 25번 Q1, `index.html?hero=2b` 등으로 비교, PR-21 전), **`GOATCOUNTER_TOKEN` 발급 → 저장소 Secrets 등록**(PR-23 전), `custom-networking-karpenter-eni-troubleshooting.md` 제목 오타 `Kapenter`→`Karpenter`(디자인 25번 Q6, 파일명은 그대로)
5. 이월(작성자 작업): 카카오·LinkedIn OG 미리보기(LinkedIn Post Inspector는 로그인 필요), Search Console·네이버 sitemap 재제출, 사이트 1차 완성 후 branch protection
6. 열린 질문: REQUESTS **Q16(PR-19 CLS)·Q17(PR-22 PDF)·Q18(PR-20 검색)**, 다음 번호 Q19

## Phase 2 PR별 상태

PRD-004 기준(2026-11-02 최종). 한 번에 PR 하나, 사용자가 머지하면 다음으로 간다. 디자인 입력은 [디자인 25번](../design/25-phase2-revision-design-response.md) 7장.

| PR | 내용 | 디자인 입력 | 상태 | 링크 |
| --- | --- | --- | --- | --- |
| (문서) | Phase 0·1 개발 요약 보관(`archive/`)과 개발 문서 정리 | | ✅ 머지 | #58 |
| (문서) | 세션 인수인계(STATUS 갱신, `resume.pdf` 시험 스크립트) | | 🔍 PR 오픈(브랜치 `docs/status-handoff-2026-11-04`) | |
| PR-18 | 데이터 분리·검증(`profile.yaml`·`experience.yaml`·`site.yaml`, zod) | 없음(화면 그대로) | ⏳ 다음 | |
| PR-19 | About 다시 그리기 + **About CLS ≤ 0.1·예외 해제** | `about.html`, 2장, D-5 폴백 `@font-face` | ⏳ 대기 | |
| PR-20 | 헤더 검색 팔레트(`/search-index.json`, 홈 검색창 제거) | 4장, 소제목 인덱스, `role="status"` | ⏳ 대기 | |
| PR-21 | 홈 히어로·사이드바(인기글·시리즈·태그) | 5·6장, 선택된 히어로 안 | ⏳ 대기(히어로 안 결정 필요) | |
| PR-22 | `resume.pdf` 생성(`scripts/build-resume-pdf.mjs`, CI·배포 단계) | 3장 `@media print`, 한글 글꼴 | ⏳ 대기 | |
| PR-23 | 인기글 데이터(GoatCounter, 일 1회) | | ⏳ 대기(`GOATCOUNTER_TOKEN` 필요) | |
| PR-24 | SEO(JSON-LD `Person` 등) | | ⏳ 대기 | |
| PR-25 | 게이트·E2E J1·5초 테스트·문서 | | ⏳ 대기 | |

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
| 2026-11-04 | **세션 종료 인수인계.** ① Phase 0·1 보관·정리 완료(#58, 기획·디자인 정리 포함 머지) ② 기획·디자인 개정 확인: PRD-004가 PR-18~25로 재정리됨(2026-11-02), 디자인 25번 답변(2026-11-03)이 나옴 → 이 문서의 Phase 2 PR 표를 새 구성으로 교체, REQUESTS Q16~Q18 추가 ③ **`resume.pdf` 시험 제작**(작성자 요청): 현재 About을 PRD-004 5.3 기준(라이트, 사진·헤더·푸터·버튼 숨김, URL 표시, 프로젝트 쪽 보호)으로 A4 인쇄해 6쪽·552KB, 한글 텍스트 검색 확인. 저장소 루트 `resume.pdf`는 미추적(커밋하지 않음), 스크립트는 `tools/resume-pdf-prototype.mjs`로 보관. 한계: 직함·연차·회사 바로가기는 PR-19 이후, 쪽 수 6쪽(PRD 예상 4~5쪽), `resume.md` 기준판(주요 성과 요약 포함)은 요청 시 ④ 작업 규칙 재확인(스크린샷 PR 본문에·Chrome 확인 매번·작업 후 PR까지)은 메모리와 위 "다음 작업"에 반영 | 새 세션: 이 문서 → CONTEXT 읽고 `tabs_context_mcp {createIfEmpty:true}` 후 **PR-18 시작** |
| 2026-11-01 | Phase 0·1 종료와 정리. 개발 요약을 `archive/phase0-summary.md`·`phase1-summary.md`로 보관하고, 이 폴더의 이력성 내용(Phase 1 PR 표·PR별 동작 표·측정 이력·질문 Q1~Q15·성능 브리프)을 걷어냄(원문은 git 기록과 PR 본문). CONTEXT는 규칙·함정만 남김. PR #58 | #58 머지 후 Phase 2 PR-18 시작 |
