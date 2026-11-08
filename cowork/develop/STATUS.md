# 개발 진행 현황

_최종 갱신: 2026-11-08 · 기준 커밋 `23b6d23`(main, #76 머지) · Phase 2 개발 완료·보관_

이 문서는 **지금 진행 중인 Phase의 상태와 다음 작업**만 담는다. 끝난 Phase는 [archive](./archive/README.md)에 요약돼 있다(Phase 0 안정화, Phase 1 읽기 경험, Phase 2 포트폴리오).

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | 완료. [요약](./archive/phase0-summary.md) |
| Phase 1 읽기 경험 (PRD-003) | 완료. [요약](./archive/phase1-summary.md) |
| Phase 2 포트폴리오 (PRD-004) | **개발 완료(PR-18~25, #60~#76).** [요약](./archive/phase2-summary.md). 게이트 G2-2~G2-8 통과, **G2-1(5초 테스트)은 작성자 몫으로 대기** |
| Phase 3 탐색·확장 | **대기.** 기획이 PRD를 쓴 뒤 시작한다(PRD-001 로드맵) |
| 지금 막힌 것 | 없음. 개발이 기다리는 것은 기획의 Phase 3 PRD와 아래 "사용자(작성자) 작업" |

## 다음 작업 (새 세션은 여기서 시작)

1. `git fetch` 후 `origin/main` 기준으로 새 브랜치를 만들고(`git checkout -b <브랜치> origin/main`), `gh pr list`로 열린 PR을 본다. `git stash -u` 금지.
   - **로컬 미커밋 파일을 구분한다.** 커밋하지 않는다: 기획·디자인 세션 파일(`cowork/prd/*`, `cowork/design/*`, 그 세션이 넘기는 시점마다 직접 PR을 올림), `resume.pdf`(저장소 루트의 옛 시험 산출물, 빌드가 `out/resume.pdf`를 만든다), `resume.md`(작성자 파일), `.claude/launch.json`. 커밋할 때는 항상 파일을 지정해 `git add`한다
   - **환경:** Next 16.4.3(Turbopack), React 19.3.1, Tailwind 4.3.3, eslint는 `eslint .` + flat config. `sharp`는 0.33.5 고정. rtk는 1.1.0 이상(`rtk hook claude`). 보류한 메이저: typescript 7, eslint 10, lucide-react 1.x, @types/node 26, sharp 0.35(필요하면 사용자 검토 후 따로)
   - **Chrome:** 새 세션은 시작하자마자 `tabs_context_mcp {createIfEmpty:true}`로 탭을 열고, **눈에 보이는 변경은 실제 Chrome으로 매번 확인**한다(메모리 `feedback-verify-in-chrome`). 실제 Chrome 창은 406px 아래로 줄지 않으니 360px은 Playwright Chromium으로 잰다
   - **규칙 위치:** 코드·접근성 규칙, PR 순서, 함정은 `.claude/rules/`(`rules/README.md` 표). 새 함정은 거기에 한 줄 추가한다
   - **PR 규칙:** 작업이 끝나면 커밋·push·PR까지 바로 올리고 후속은 같은 브랜치에 커밋한다. 눈에 보이는 결과물이 있으면 PC·Mobile 스크린샷을 PR 본문에 넣는다(`tools/shoot.mjs`·`publish-shots.sh`). 새 의존성·CI 액션은 먼저 알린다
2. **Phase 3은 기획이 PRD를 `approved`로 넘긴 뒤** 시작한다. 그전에는 작성자 요청(경력·글 수정 등)과 작은 유지보수만 한다. 후보(PRD-001 로드맵): 검색 초성·별칭(F-SR-03), 태그 페이지(F-SR-04), 영문 About·Projects, MDX 검토, 커스텀 도메인
3. **작성자 확인 대기:** ① G2-1 5초 테스트 3명(루트 `CONTEXT.md` "G2-1 5초 테스트 방법과 결과" 표에 기록, 보여 줄 화면은 PR #76 본문 스크린샷) ② PR-24 라이브 Rich Results Test(`/`, `/about`, 오류 0) ③ 이월: 카카오·LinkedIn OG 미리보기(LinkedIn Post Inspector는 로그인 필요), Search Console·네이버 sitemap 재제출, 사이트 1차 완성 후 branch protection
4. 열린 질문: REQUESTS **Q24**(기획: PRD 5.6 옛 문구·`ProfilePage` 반영), 다음 번호 Q25

## 사용자에게 보이는 현재 상태 (라이브 사이트, #76 머지 기준)

- 디자인 시스템 v1.4(Terminal Graphite), 자동 배포 가동(`main` push + 매일 03:00 KST). 홈은 히어로 `$ history`·연도별 세로 리스트·카테고리 필터·사이드바(인기글·시리즈·태그), 헤더 검색 팔레트(`⌘K`), 글 상세는 목차·시리즈·관련 글·읽기 진행률·OG 자동 생성
- About은 `content/*.yaml`에서 그려지고 `resume.pdf`(A4 5쪽)가 빌드마다 생성된다. JSON-LD(글 `BlogPosting`, 홈 `WebSite`, About `ProfilePage > Person`)
- 접근성 100·SEO 100(CI `error`), 본문 이미지 WebP(≤ 200KB), 글꼴 서브셋, 주간 링크 체커(`Links` 워크플로)

## 현재 성능 기준값 (Lighthouse, 리눅스 CI, 실제 Chrome 관측, 3회 중앙값, PR #74)

| 페이지 | 성능 | LCP | CLS | TBT | 비고 |
| --- | --- | --- | --- | --- | --- |
| 홈 | 99 | 1.7s | 0.028 | 59ms | 차단선·목표선 통과 |
| 글 상세 | 99 | 1.8s | 0.030 | 41ms | 차단선·목표선 통과 |
| About | 99 | 1.7s | 0.029 | 74ms | 예외 해제(PR-19), 차단선·목표선 통과 |

차단선: 성능 ≥ 90·LCP ≤ 2.5s·CLS ≤ 0.1·TBT ≤ 300ms. 목표선(warn): 성능 ≥ 95·LCP ≤ 2.0s·CLS ≤ 0.05·TBT ≤ 200ms. 맥 로컬 Lighthouse의 CLS는 리눅스 CI와 달라 판단 근거가 아니다.

## 사용자(작성자) 작업

- G2-1 5초 테스트(지인 3명), PR-24 라이브 Rich Results Test
- Search Console·네이버 서치어드바이저 sitemap 재제출
- LinkedIn Post Inspector로 OG 확인 (로그인 필요)
- 사이트 1차 완성 후 branch protection 켜기(PR CI 통과 필수)

## 세션 기록

| 날짜 | 한 일 | 남은 일 / 다음 첫 명령 |
| --- | --- | --- |
| 2026-11-08 | **경력 문구 정리(작성자 답 반영).** ① US몰 `무중단 런칭 달성`·`런칭 이후 인프라 장애 0건` 두 줄 → `런칭 당일 인프라 장애 없이 무중단(Zero Downtime) 오픈 달성` 한 줄(이후 운영 중 장애가 있어 범위를 런칭 당일로 한정) ② 1개월짜리 `oauth2-proxy-zero-trust` 프로젝트를 `security-ops`의 한 줄(`(2026.03)`)로 이동 ③ `us-mall-cdc` 프로젝트 추가(2026-08, Debezium MySQL/PostgreSQL Connector 4개, Topic 13개, Avro, 데이터엔지니어링팀과 협업. **본인이 한 DB → Kafka 구간만** 쓰고 Consumer·Tableau 구간은 쓰지 않음). ④ `schema-registry-apicurio` 프로젝트 추가(2026-08~09: Bitnami 무료 컨테이너 이미지 제공 중단과 Helm Chart 업데이트 중단(2025.08, 공지 원문 bitnami/containers 이슈 #83267로 확인: 2025-08-28 적용, 차트 소스는 Apache 2.0으로 유지) 대응으로 Schema Registry를 Apicurio Registry로 전환, OLM Subscription으로 Apicurio Operator 설치, 기존 Schema 100% 마이그레이션·불일치 없음(서울·버지니아 2개 리전 합산 Topic 407·Subject 732·버전 900). 설치는 8월, 마이그레이션·전환은 9월에 끝남). 프로젝트 수는 23개. 검증: lint·content·build·output·build:resume(5쪽 554KB)·E2E 265 통과. **못 한 것:** CI | 머지 후 라이브 About 확인은 작성자 |
| 2026-11-08 | **Phase 2 압축 정리·보관.** `archive/phase2-summary.md` 작성(결과·게이트, PR 순서, 핵심 결정, 함정, 일하는 방식, Phase 3 이월, 원본 위치). 이 STATUS에서 Phase 2 PR 표·세션 기록·PR별 안내를 걷어내고 현재 상태·성능 값(PR #74 CI)만 남김. REQUESTS의 Q16~Q23(모두 답·구현 확인)을 요약으로 옮기고 열린 Q24만 남김. `archive/README.md`·루트 `CONTEXT.md`·`DESIGN.md`·develop `CONTEXT.md`의 Phase 2 안내를 갱신. 원문은 git 기록(`23b6d23` 시점의 STATUS·REQUESTS). **못 한 것:** 기획·디자인 폴더의 Phase 2 보관(그쪽 세션 몫), G2-1 | 기획의 Phase 3 PRD 대기. 새 PR 전 `git fetch` 후 `origin/main` 기준 브랜치 |
