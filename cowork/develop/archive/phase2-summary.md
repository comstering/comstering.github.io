# Phase 2 포트폴리오 (PRD-004) 개발 요약

_기간 2026-11-04 ~ 2026-11-08 · PR #60 ~ #76 · 기획 PRD-004 · 최종 기준 커밋 `23b6d23`_

이 문서는 Phase 2 개발 기록의 **핵심만** 모은 보관본이다. 세부(PR별 동작, 세션 기록, 질문 원문)는 각 PR 본문과 git 기록(8장)에 있다. 규칙·함정은 `../CONTEXT.md`와 `.claude/rules/`. 새 세션은 이 문서를 읽지 않아도 된다.

## 1. 결과

G2-2~G2-8은 통과했다. **G2-1(채용 5초 테스트, 지인 3명)은 사람 테스트라 미실시**이고 작성자 몫으로 넘어간다(방법·기록 표는 저장소 루트 `CONTEXT.md`). 게이트별 근거도 같은 문서에 있다.

| 게이트 | 기준 | 결과 |
| --- | --- | --- |
| G2-1 5초 테스트 | 3명 중 3명이 이름·직무·연차·연락 방법을 말함 | **미실시.** 1280×720·360×640 첫 화면은 E2E와 스크린샷으로 확인(PR #76) |
| G2-2 하드코딩 0건 | `src/`에 경력·프로젝트 문자열 없음, About·PDF 같은 데이터 | 통과. `yarn check:content`(제목 25개·파일 69개, CI) |
| G2-3 About ↔ 글 링크 0건 | E2E | 통과 |
| G2-4 J1 | 홈 → about → 회사 바로가기 → `resume.pdf`(200, PDF) | 통과(`e2e/j1.spec.ts`) |
| G2-5 성능·접근성·SEO | 차단선 통과, 접근성 100, SEO 100, About 예외 해제 | 통과(아래 성능 값) |
| G2-6 `resume.pdf` | 데이터와 같은 내용, 한글·검색, ≤ 1MB, 라이트 배경 | 5쪽·550KB, 글자 412종, 통과 |
| G2-7 인기글 | 일일 워크플로로 5편 표시, 실패해도 빌드 성공 | 통과. 라이브 `최근 30일 5편`(2026-11-08), 실패 5종은 모의 서버 E2E |
| G2-8 검색 | 마우스 없이 `⌘K`/`/` → 검색어 → ↓ → Enter | 통과(3개 페이지 E2E) |

**성능(Lighthouse, 리눅스 CI, 관측, 3회 중앙값, PR #74):** 홈 99·LCP 1.7s·CLS 0.028·TBT 59ms, 글 99·1.8s·0.030·41ms, **About 99·1.7s·CLS 0.029·74ms**(Phase 1 말 0.125 → 해결, 예외 해제). 접근성·SEO 100. E2E 265건 통과(3 skip).

## 2. 만든 것 (PR 순서)

| PR | 내용 |
| --- | --- |
| #60 PR-18 | `content/profile.yaml`·`experience.yaml`·`site.yaml` + zod 검증·교차 검증(id 중복, 회사 기간 밖 프로젝트), 하드코딩 검사 `check:content` |
| #61 PR-19 | About 다시 그리기(첫 화면·회사 바로가기·경력 전부 펼침·skills 7그룹), 폴백 `@font-face`로 **About CLS 0.125 → 0.029**, 예외 해제 |
| #63 PR-20 | 헤더 `search ⌘K` 팔레트(빌드 타임 `/search-index.json`, 처음 열 때 불러옴), 홈 검색창 제거, 모달 배경 스크롤 잠금(O-8) |
| #64 PR-21 | 홈 히어로(`$ history`)·사이드바(인기글·시리즈·태그)·홈 OG, 태그는 눌러서 검색 팔레트를 그 태그로 엶 |
| #66 PR-22 | `resume.pdf` 생성(`scripts/build-resume-pdf.mjs`: About을 print 미디어 A4로 인쇄, 크기·쪽 수·글자 검색 검사), CI·배포 단계 추가 |
| #67 | 디자인 36번 반영: 직함 360px 1줄, `~ / about` 경로, 히어로 위 여백, 팔레트 닫기 버튼 |
| #68 | 파비콘 `c_`(앱 폴더 파일 규약 3종) |
| #69 PR-23 | 인기글: `scripts/fetch-popular.mjs`(GoatCounter 최근 30일 상위 5편), 배포 `schedule` 매일 03:00 KST, Actions 캐시, **빌드를 절대 막지 않음** |
| #72 PR-24 | SEO: 홈 `WebSite`, About `ProfilePage > Person`(`profile.yaml`에서, `worksFor` 없음), 홈 description 97자, `check:output`에 JSON-LD 검사 |
| #71·#73·#74 | 규칙·함정을 `.claude/rules/`로 이관(항상/경로 지정 12개), 낡은 문서 정리, 작성자의 `experience.yaml` 수정(US몰 런칭 등) 반영 |
| #75 | `actions/cache` v6·`upload-artifact` v7(Node 24), 경고 제거 |
| #76 PR-25 | J1 E2E, README "경력 수정 방법"·"인기글 토큰", 게이트 기록, DESIGN 갱신, `ABOUT_LAST_MODIFIED` 갱신 |

## 3. 핵심 결정 (기획·디자인·작성자)

- **역할 분리:** 홈 = 블로그, About = 경력·이력서·기술. **About과 글은 서로 링크하지 않는다**(회사 일처럼 읽히는 것 방지). 홈에 이름·직함·기술 태그를 두지 않는다
- **이력서:** `/resume` 페이지 없이 About 인쇄본을 빌드 때 `resume.pdf`로 만든다(축약 없음, 사진 없음, 라이트 고정)
- **데이터:** 경력·프로필·사이트 문구는 YAML 한 곳. 지운 필드(`featured`, `metric`, `stack`, `relatedPosts`, `capabilities`, `resume`)는 쓰면 이유와 함께 빌드가 실패한다. About 소개에 현재 회사를 두지 않는다(`worksFor`도 없음)
- **검색:** 헤더 팔레트 하나(홈 검색창 없음), 인덱스는 빌드 타임 JSON(Pagefind 안 씀). 초성·별칭·태그 페이지는 Phase 3
- **홈:** 히어로 `$ history` + "실행해 본 것만 기록합니다"(작성자가 `씁니다` → `기록합니다`로 변경). 사이드바 popular·series·tags. 태그는 링크 대신 검색 팔레트를 연다
- **인기글:** GoatCounter 통계 API(토큰은 `Read statistics`만)를 Actions가 하루 한 번 받아 다시 빌드. 토큰 없음·API 실패는 직전 결과(캐시) 또는 빈 목록
- **SEO:** `Person`만으로는 Rich Results가 인식하지 않아 `ProfilePage`로 감쌌다(PRD는 `Person`만 적었음, 기획 Q24)
- **About CLS(Q16):** 해법은 폴백 글꼴 `size-adjust 86.4%` + `html{scroll-padding-top}`. CI 3회 중앙값 0.029로 확인
- **규칙 위치(2026-11-08, 작성자):** 매번 지키는 규칙·함정은 `cowork/`가 아니라 `.claude/rules/`에, 지금 상태·결정은 `cowork/`에

## 4. 이력서·경력 데이터 (작성자 입력)

- 작성자가 직접 고친 내용: Okta·Keycloak 자동화 문구, Temporal 두 번째 기간, skills observability에 OpenTelemetry·Prometheus, US몰 런칭 프로젝트(20개 이상 마이크로서비스, 6개 이상 DB Cluster, us-east-1 단일 리전·EKS 1개, 런칭 이후 장애 0건), Istio Ambient Mode(필요한 구간 Waypoint Proxy)
- 서비스·클러스터 **이름은 공개 저장소라 쓰지 않고 개수만** 쓴다

## 5. 겪은 함정 (재발 방지, 상세는 `.claude/rules/`)

- **인쇄 CSS 순서:** 인쇄 레이아웃을 `globals.css`에 두면 나중에 로드되는 `about.css`의 화면 규칙에 덮여 PDF가 6쪽이 된다 → `about.css` 끝 `@media print`에 둔다(`css.md`)
- **CI에서만 보이는 CLS:** 맥 로컬 About CLS 0, 리눅스 CI 0.125였다. 판단은 CI 중앙값으로(`e2e.md`)
- **홈 글 목록 하이드레이션:** 정적 HTML에서 클라이언트 렌더로 교체되는 순간 `boundingBox()`가 null → `expect(...).toPass()`로 재시도(`e2e.md`)
- **E2E의 하드코딩 개수:** About 프로젝트 수 `21`을 박아 두었다가 경력을 추가하자 깨졌다 → YAML에서 센다
- **`ABOUT_LAST_MODIFIED`:** About 데이터를 고쳐도 sitemap 수정일이 2026-04-28로 남아 있었다 → README "경력 수정 방법"에 갱신 절차
- **GitHub `schedule`:** 저장소 활동이 60일 없으면 꺼진다 → Deploy 수동 실행
- **rtk 훅 + worktree 가드:** rtk 0.45의 훅이 `git`을 `rtk git`으로 바꿔 격리 가드가 모든 `git`을 거부했다. **rtk 1.1.0(`rtk hook claude`)에서 해결.** `git -C`·직접 `rtk git`·`git`이 든 긴 heredoc은 가드가 계속 거부한다(`git-shell.md`)
- **STATUS.md 구간 치환:** 사이 절이 지워진다 → 치환 전후 `grep -n "^## "`
- **LHCI `GitHub token not set`:** 업로드 대상이 `filesystem`이라 상태 체크가 안 돌아 의미 없는 경고다(그대로 둠)

## 6. 일하는 방식에서 굳어진 것

- 한 PR씩, 머지 후 다음. 끝나면 묻지 않고 커밋·push·PR, 후속은 같은 브랜치
- 화면이 바뀌는 PR은 PC·Mobile 스크린샷(`tools/shoot.mjs`, `publish-shots.sh`). 안 바뀌는 PR은 생략
- 작성자가 직접 고친 파일(`experience.yaml` 등)은 **그대로 한 커밋**에 넣고 내 수정은 다음 커밋으로 나눠 PR에서 구분되게 한다
- 사실 확인이 안 되는 문구(예: "런칭 이후")는 임의로 넣지 않고 작성자에게 묻는다
- 새 의존성·CI 액션은 먼저 알린다(이번 단계 신규 없음, 액션 버전만 올림)

## 7. Phase 3으로 넘기는 것

- **작성자 대기:** ① G2-1 5초 테스트 3명(루트 `CONTEXT.md` 표에 기록) ② PR-24 라이브 Rich Results Test(`/`, `/about`, 오류 0) ③ 카카오·LinkedIn OG 미리보기, Search Console·네이버 sitemap 재제출, 사이트 1차 완성 후 branch protection
- **열린 질문:** REQUESTS **Q24**(기획: PRD 5.6의 옛 문구, `ProfilePage` 반영)
- **Phase 3(탐색·확장):** 기획이 PRD를 쓴 뒤 시작. 후보는 PRD-001 로드맵: 검색 초성·별칭(F-SR-03), 태그 페이지(F-SR-04), 영문 About·Projects, MDX 검토, 커스텀 도메인
- **보류:** 번들·렌더링 차단 CSS 최적화(JS 150~174KB gzip), 메이저 의존성(typescript 7, eslint 10, lucide-react 1.x, @types/node 26, sharp 0.35), `main` 브랜치 보호

## 8. 원본 위치

| 무엇 | 어디 |
| --- | --- |
| 일하는 방식·함정 | `../CONTEXT.md`, `.claude/rules/` |
| PR별 동작·측정·세션 기록·질문(Q16~Q24)의 원문 | git 기록: `git log -p -- cowork/develop/STATUS.md cowork/develop/REQUESTS.md`(마지막 전체본은 `23b6d23` 시점), 각 PR 본문 |
| 게이트 근거·5초 테스트 방법 | 저장소 루트 `CONTEXT.md` "Phase 2 게이트 기록" |
| 기획 | `cowork/prd/004_portfolio_projects-and-about.md`(Phase 정리는 기획 세션이 `cowork/prd/archive`로) |
| 디자인 답변·검토 | `cowork/design/`(22~37번) |
