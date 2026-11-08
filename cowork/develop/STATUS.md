# 개발 진행 현황

_최종 갱신: 2026-11-08 · 기준 커밋 `7b07fbb`(main, #71 머지) · 기준 기획서 PRD-004(2026-11-05 최종) · 디자인 36번 검토(2026-11-07)_

이 문서는 **지금 진행 중인 Phase의 상태와 다음 작업**만 담는다. 끝난 Phase는 [archive](./archive/README.md)에 요약돼 있다(Phase 0 안정화, Phase 1 읽기 경험).

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | 완료. [요약](./archive/phase0-summary.md) |
| Phase 1 읽기 경험 (PRD-003) | 완료. [요약](./archive/phase1-summary.md). About 성능·CLS·TBT `warn` 예외는 PR-19까지 |
| Phase 2 포트폴리오 (PRD-004) | **진행 중.** PR-18~22 ✅, 디자인 36번 반영 ✅, 파비콘 ✅(#68). PR-23(인기글) ✅(#69), PR-24(SEO) ✅(#72). 남은 것: PR-25(게이트·문서) |
| 지금 막힌 것 | 없음. PR-23의 실제 GoatCounter 응답은 2026-11-08 배포 로그로 확인됐다(`인기글: 최근 30일 5편`). 열린 질문은 Q16, Q18, Q24 |

## 다음 작업 (새 세션은 여기서 시작)

1. `git checkout main && git pull`, `gh pr list`로 열린 PR을 본다(tracked 변경이 있으면 `git stash` 후 pull, `git stash -u` 금지).
   - **로컬 미커밋 파일을 구분한다.** 커밋하지 않는다: 기획·디자인 세션 파일(`cowork/prd/*`, `cowork/design/*`, 그 세션이 넘기는 시점마다 직접 PR을 올림), `resume.pdf`(2026-11-04 시험 산출물, 6쪽, PR-22에서 빌드 때 자동 생성할 것), `resume.md`(작성자 파일), `.claude/launch.json`. 커밋할 때는 항상 파일을 지정해 `git add`한다
   - **환경:** Next 16.4.3(Turbopack), React 19.3.1, Tailwind 4.3.3, eslint는 `eslint .` + flat config. `sharp`는 0.33.5 고정. 보류한 메이저: typescript 7, eslint 10, lucide-react 1.x, @types/node 26, sharp 0.35(필요하면 사용자 검토 후 따로)
   - **Chrome:** 이 세션 끝에는 확장은 응답하나 이 세션의 탭 그룹이 없었다. 새 세션은 시작하자마자 `tabs_context_mcp {createIfEmpty:true}`로 탭을 열고, **눈에 보이는 변경은 실제 Chrome으로 매번 확인**한다(메모리 `feedback-verify-in-chrome`). 실제 Chrome 창은 406px 아래로 줄지 않으니 360px은 Playwright Chromium으로 잰다
   - **규칙 위치(2026-11-08):** 코드·접근성 규칙, PR 순서, 함정은 `.claude/rules/`로 옮겼다(`rules/README.md` 표). 새 함정은 거기에 한 줄 추가한다
   - **PR 규칙(메모리에 반영됨):** 작업이 끝나면 커밋·push·PR까지 바로 올리고 후속은 같은 브랜치에 커밋한다. **눈에 보이는 결과물이 있으면 PC·Mobile 스크린샷을 PR을 열 때 본문에 넣는다**(`tools/shoot.mjs`·`publish-shots.sh`). 새 의존성·CI 액션은 먼저 알린다
2. **PR-25(게이트·E2E J1·5초 테스트·문서)부터.** PRD-004 6장 PR-25 행: E2E J1(G2-4), G2-3 검사, 5초 테스트(G2-1), `README.md`에 "경력 수정 방법"·"인기글 토큰", `DESIGN.md`·`CONTEXT.md` 갱신, G2-1~G2-8 기록. 작성자 확인 대기: PR-24 라이브 Rich Results Test(`/`, `/about`), REQUESTS Q24(기획)
3. **PR-19에서 남은 확인:** About CLS ≤ 0.1은 CI 3회 중앙값으로 본다(`lighthouserc.json`의 About 예외는 이 PR에서 지웠다). CI가 실패하면 폴백 `@font-face`(`ascent-override`·폴백 목록 확대, 디자인 22번 3장)를 조정하고 결과를 REQUESTS Q16으로 알린다
4. 작성자 할 일(개발이 기다리는 것): **히어로 안·문구 선택**(디자인 25번 Q1, `index.html?hero=2b` 등으로 비교, PR-21 전), **`GOATCOUNTER_TOKEN` 발급 → 저장소 Secrets 등록**(PR-23 전), `custom-networking-karpenter-eni-troubleshooting.md` 제목 오타 `Kapenter`→`Karpenter`(디자인 25번 Q6, 파일명은 그대로)
5. 이월(작성자 작업): 카카오·LinkedIn OG 미리보기(LinkedIn Post Inspector는 로그인 필요), Search Console·네이버 sitemap 재제출, 사이트 1차 완성 후 branch protection
6. 열린 질문: REQUESTS **Q16(PR-19 CLS)·Q17(PR-22 PDF)·Q18(PR-20 검색)**, 다음 번호 Q19

## Phase 2 PR별 상태

PRD-004 기준(2026-11-02 최종). 한 번에 PR 하나, 사용자가 머지하면 다음으로 간다. 디자인 입력은 [디자인 25번](../design/25-phase2-revision-design-response.md) 7장.

| PR | 내용 | 디자인 입력 | 상태 | 링크 |
| --- | --- | --- | --- | --- |
| (문서) | Phase 0·1 개발 요약 보관(`archive/`)과 개발 문서 정리 | | ✅ 머지 | #58 |
| (문서) | 세션 인수인계(STATUS 갱신, `resume.pdf` 시험 스크립트) | | ✅ 머지 | #59 |
| PR-18 | 데이터 분리·검증(`profile.yaml`·`experience.yaml`·`site.yaml`, zod) | 없음(화면 그대로) | ✅ 머지 | #60 |
| PR-19 | About 다시 그리기 + **About CLS ≤ 0.1·예외 해제** + `DESIGN.md` 반영 | `about.html`, 2장, D-5 폴백 `@font-face` | ✅ 머지 | #61 |
| PR-20 | 헤더 검색 팔레트(`/search-index.json`, 홈 검색창 제거) + O-8 스크롤 잠금 | 4장, 소제목 인덱스, `role="status"` | ✅ 머지 | #63 |
| PR-21 | 홈 히어로·사이드바(인기글·시리즈·태그)·홈 OG | 5·6장, 확정 히어로 `$ history`, `og.html` B안 | ✅ 머지 | #64 |
| PR-22 | `resume.pdf` 생성(`scripts/build-resume-pdf.mjs`, CI·배포 단계) | 25번 3장, 32번 "인쇄" | ✅ 머지 | #66 |
| PR-23 | 인기글 데이터(`scripts/fetch-popular.mjs`, 배포 `schedule` 일 1회, Actions 캐시) | | ✅ 머지, 라이브 5편 확인 | #69 |
| PR-24 | SEO(JSON-LD `Person` 등) | | ✅ 머지 | #72 |
| PR-25 | 게이트·E2E J1·5초 테스트·문서 | | ⏳ 대기 | |

## 사용자에게 보이는 현재 상태 (라이브 사이트, #57 머지 기준)

- 디자인 시스템 v1.4(Terminal Graphite), 자동 배포 가동. 홈은 연도별 세로 리스트·카테고리 필터·검색, 글 상세는 목차·시리즈·관련 글·읽기 진행률·OG 자동 생성
- 접근성 100·SEO 100(CI `error`), 본문 이미지 WebP(≤ 200KB), 글꼴 서브셋, 주간 링크 체커(`Links` 워크플로)

## 현재 성능 기준값 (Lighthouse, 리눅스 CI, 실제 Chrome 관측, 3회 중앙값, PR #56)

| 페이지 | 성능 | LCP | CLS | TBT | 비고 |
| --- | --- | --- | --- | --- | --- |
| 홈 | 97 | 1.7s | 0.058 | 128ms | 차단선 통과 |
| 글 상세 | 97 | 1.8s | 0.030 | 131ms | 차단선 통과 |
| About | 92 | 1.8s | **0.125** | 178ms | PR-19 이전 값(예외는 PR-19에서 해제, 새 값은 PR-19 CI 댓글) |

차단선: 성능 ≥ 90·LCP ≤ 2.5s·CLS ≤ 0.1·TBT ≤ 300ms. 목표선(warn): 성능 ≥ 95·LCP ≤ 2.0s·CLS ≤ 0.05·TBT ≤ 200ms. 맥 로컬 Lighthouse의 CLS는 리눅스 CI와 달라(About 로컬 0) 판단 근거가 아니다.

## 사용자(작성자) 작업

- Search Console·네이버 서치어드바이저 sitemap 재제출
- LinkedIn Post Inspector로 OG 확인 (로그인 필요)
- 사이트 1차 완성 후 branch protection 켜기(PR CI 통과 필수)

## 세션 기록

| 날짜 | 한 일 | 남은 일 / 다음 첫 명령 |
| --- | --- | --- |
| 2026-11-08 | **문서 정리 + experience.yaml 검토 PR.** ① 작성자가 미커밋으로 고친 `content/experience.yaml`(US몰 런칭 프로젝트 추가, Istio ambient mode, `security-ops` 기간 삭제)을 그대로 한 커밋에 넣고, 표기 정리(`CJ 올리브영`, `이커머스`, `마이크로서비스`, `Ambient Mode`)를 다음 커밋으로 분리. ② `.claude/rules` 이관 점검: `pr-workflow`에 `check:content` 누락, 없는 STATUS "시안 대비 차이" 절 참조(ui.md·develop README·CONTEXT 4.5), CONTEXT 6장의 낡은 Lighthouse 설명(About 예외는 PR-19에서 해제), CLAUDE.md 명령·CI·구조 누락, **루트 CONTEXT.md가 2026-10-27(Phase 0, Next 15) 내용**, AGENTS.md가 Next 15.2.4 시절 복사본, README 스택 `Next.js 15` → 수정. ③ E2E `about.spec.ts`의 프로젝트 수 21 하드코딩을 YAML에서 읽도록 변경(프로젝트 추가로 깨졌음). 검증: lint·tokens·content·build·output·build:resume(5쪽 548KB)·E2E 전체. Q22·Q23은 디자인 37번(#70)으로 닫음. **작성자 답 반영:** US몰 `런칭 이후 인프라 장애 0건`, 인프라 항목에 `us-east-1 단일 리전·EKS 1개` 명시, Istio ambient는 필요한 구간에 Waypoint Proxy가 있어 JWT 줄을 `Waypoint Proxy를 추가하고 AuthorizationPolicy로…`로 수정, US몰 기간 겹침은 동시 진행 맞음(그대로). **못 한 것:** CI, 실제 Chrome(화면 변경은 About 경력 항목 1개 추가뿐) | 이 PR 머지 후 PR-25 |
| 2026-11-08 | **규칙을 `.claude/rules/`로 이동(작성자 요청).** develop CONTEXT 4·4.6·5·7·8·9장, design CONTEXT 5·7장, design README 작업 규칙, prd README 파일명 규칙을 주제별 rules 12개로 옮기고(경로 지정: ui·a11y·css·posts·next-build·e2e·cowork-docs·prd-docs·design-docs, 항상: commit-and-pr·git-shell·pr-workflow) 원래 자리는 링크로 바꿈. **커밋 규칙 확정:** 개발 세션은 묻지 않고 커밋·PR, 디자인·기획 세션은 다른 세션에 넘기는 시점마다 커밋·PR(CLAUDE.md도 수정). design README의 `Cowork` 표기를 `Claude Code`로. **못 한 것:** 새 세션에서 경로 지정 rules가 실제로 불려오는지 확인 | PR 머지 후 STATUS "다음 작업" |
| 2026-11-08 | **PR-24 구현·PR 오픈.** 홈 `WebSite` JSON-LD와 About `ProfilePage > Person`(`src/lib/structured-data.ts`, `profile.yaml`에서: name, alternateName=handle, jobTitle, sameAs, alumniOf=학력, hasCredential=자격증(발급처·Credly URL), **worksFor 없음**). 홈 description을 `실행해 본 것만 기록합니다. …`(97자)로 교체(RSS·메타에 반영). `check:output`에 JSON-LD·description 길이(80~160자) 검사 추가. E2E `seo.spec.ts`(3개). **확인한 것:** PR-23 머지 후 배포와 일 1회 schedule 배포 성공, 로그 `인기글: 최근 30일 5편` → 실제 응답 모양 확인됨. **못 한 것:** Rich Results Test·Schema Markup Validator(라이브 URL 필요, 작성자), 눈에 보이는 변경 없음 | PR-24 머지 후 PR-25, Q24는 기획이 답 |
| 2026-11-07 | **PR-23 구현·PR 오픈(#69).** `scripts/fetch-popular.mjs`: GoatCounter `/api/v0/stats/hits`(Bearer `GOATCOUNTER_TOKEN`, 최근 30일, limit 100, `more`면 `exclude_paths`로 이어 받음)에서 `/posts/<id>`(끝 슬래시·쿼리 정규화, 같은 글 합산) 중 존재하고 draft 아닌 글을 조회수 내림차순(같으면 최신 글 먼저) 5편 → `.cache/popular.json`(`generatedAt`, `items`). **빌드를 절대 막지 않는다**(토큰 없음·API 실패·이상한 응답이면 직전 결과 유지, 없으면 빈 목록, 종료 코드 항상 0, 로그에 토큰 없음). 배포 워크플로: `schedule` 매일 03:00 KST, `actions/cache`로 `.cache` 복원·저장(`popular-<run_id>`, restore-keys `popular-`), `Fetch popular posts` 단계(토큰은 이 단계 env만). CI(PR)에는 넣지 않아 포크·로컬은 빈 목록 → 홈 popular 숨김. E2E `popular.spec.ts`(모의 GoatCounter 서버로 요청 모양·가공·여러 쪽·실패 5종·토큰 비출력·명령 실행 종료 코드, 28개). **못 한 것:** 실제 API 응답 모양 확인(토큰 없이는 401, 문서의 모양을 가정), 첫 배포 로그 | #69 머지 후 PR-24 |
| 2026-11-07 | **파비콘 `c_` 교체(#68).** 디자인 34번 인수대로 `cowork/design/favicon/final/`의 `favicon.ico`로 `src/app/favicon.ico` 교체, `icon.svg`·`apple-icon.png` 추가(파일 규약 이름 그대로, `layout.tsx`의 `icons` 설정 없이). `yarn build` 후 홈·About·글 HTML에 `rel="icon"`(ico 48x48·svg)·`apple-touch-icon`(180x180) 링크가 생기고 3개 파일이 `out/`에 있음을 확인. E2E `favicon.spec.ts`(3개 페이지의 링크 3종·파일 200·content-type, ICO 구조). **못 한 것:** 실제 Chrome 탭 아이콘(라이트·다크, 16px) 육안 확인 — 확장 프로그램으로 SVG 문서 스크린샷이 시간 초과, 디자인이 확인한다(REQUESTS Q23) | #68 머지 후 PR-23 |
| 2026-11-07 | **디자인 36번 검토 반영(#67).** ① About 직함: 480px 미만에서 직함 줄을 아바타 행 아래 전폭으로(`display: contents`), 340px 이하는 직함·경력을 줄 단위로 나누고 구분점 숨김(360px 1줄, 320px 2줄) ② About 상단 경로 `~ / about`(`PostPath`에 `section` 옵션, 인쇄에서 숨김) ③ 홈 히어로 위 여백 0(첫 글 제목 하단 1280×720 449px, 360×640 453px, 시안 458/437) ④ 팔레트 닫기 버튼 보이는 글자: 640px 이상 `esc`, 미만 `닫기`(이름 `esc 닫기`는 둘 다 포함) ⑤ 인쇄 순서 문제(36번 3.2)는 PR-22에서 이미 about.css로 옮겨 5쪽(543KB). 36번 표의 의도 값(`.about-section` 16px, `.stack-token` inline 등)을 E2E로 고정. E2E `about.spec.ts`(경로·직함 1줄)·`resume.spec.ts`·`home.spec.ts`(상한 ±20px)·`search.spec.ts` 갱신. **못 한 것:** 실제 Chrome 확인(Playwright만), CI | #67 머지 후 파비콘, PR-23 |
| 2026-11-07 | **PR-22 구현·PR 오픈(#66).** `yarn build:resume`(`scripts/build-resume-pdf.mjs`): out/을 임시 서버로 띄우고 다크 테마로 연 `/about`을 print 미디어 A4로 인쇄해 `out/resume.pdf` 생성. 검사(실패하면 종료 코드 1, 파일 삭제): 인쇄 배경 라이트, 헤더·푸터·바로가기·버튼 숨김, ≤ 1MB, ≤ 5쪽, 글꼴 ToUnicode 매핑에 이름·직함·회사·연락처·자격증 글자가 모두 있음(글자 검색 가능). **PR-19의 6쪽 원인을 찾아 5쪽·543KB로 맞춤:** 인쇄 레이아웃 규칙이 globals.css에 있어 나중에 로드되는 about.css 화면 규칙에 덮이고 있었다 → 인쇄 레이아웃을 about.css 끝 `@media print`로 이동(globals.css에는 라이트 토큰·숨김만). CI Quality(E2E 전)·deploy(build 뒤)에 `playwright install` + `build:resume` 단계 추가(새 의존성 없음). E2E `resume.spec.ts`(200·application/pdf·%PDF·≤1MB, 버튼 다운로드, 링크 URL 표시, 쪽 경계, 9pt). **작성자 요청:** 토큰 권한 안내(Read statistics만, 사이트 한정). **못 한 것:** PDF를 이미지로 본 것은 print 미디어 스크린샷(PDF 뷰어 없음), CI 리눅스 실행 | PR-22 머지 후 PR-23 |
| 2026-11-07 | **PR-21 구현·PR 오픈(#64).** 홈을 시안대로: 히어로(`components/home/HeroTerminal`, `content/site.yaml`의 `$ history` + 문구, h1은 sr-only 사이트 이름, 커서 깜빡임은 여기 한 곳·reduced-motion 정지), 사이드바(`HomeSidebar`: popular는 `.cache/popular.json`(`lib/popular.ts`)이 없거나 비면 숨김, series는 `series.yaml` 전체·첫 글로 링크, tags는 글 수 상위 10개). 1024px 이상 오른쪽 열(sticky), 미만은 글 목록 아래(DOM 순서는 목록 다음). **태그는 태그 페이지(Phase 3)가 없어 눌러서 검색 팔레트를 그 태그로 연다**(`TagButton` + `search:open` 이벤트, 팔레트 `initialQuery`). 홈 OG는 `renderOg`로 생성(`app/og.png/route.tsx`, `site.yaml` 한 곳): **satori에서 하단 mono 줄의 한글이 깨지지 않음을 `out/og.png`로 확인**. `.gitignore`에 `/.cache/`. 헤더 로고는 480px 미만에서 `~/_`(DESIGN.md 규칙, 검색 버튼이 들어와 360px에서 헤더가 두 줄로 접혀서). E2E `home.spec.ts`. **작성자 요청으로 문구를 `실행해 본 것만 기록합니다`로 변경(PRD 5.6 description도 PR-24에서 같은 문구).** **시안과 다른 점(Q21):** 실제 레이아웃의 `main` 위쪽 여백 48px 때문에 첫 글 제목 하단이 360×640에서 약 486px(시안 437px), 1280×720도 그만큼 아래다. **못 한 것:** 실제 Chrome 확인(Playwright 스크린샷만), CI Lighthouse | PR-21 머지 후 PR-22 |
| 2026-11-07 | **PR-20 구현·PR 오픈(#63).** 헤더 `search ⌘K` 버튼(`components/search/SearchButton`, 단축키 Cmd/Ctrl+K·`/`)과 네이티브 `<dialog>` 팔레트(`SearchPalette`, `next/dynamic`으로 처음 열 때 코드와 `/search-index.json`을 받음). 인덱스는 `app/search-index.json/route.ts`(글 14편, h2·h3 포함, gzip 약 3KB), 검색 규칙은 `lib/search.ts`(제목 > 설명·태그·카테고리 > 소제목, 최신 우선). 홈 `PostsBlock`의 검색 입력 제거(카테고리 필터 URL 그대로). **O-8:** `lib/scroll-lock.ts`로 팔레트·이미지 확대 `<dialog>`가 열린 동안 배경 스크롤 잠금(스크롤바 폭 보정, 겹쳐도 안전). `check:output`에 검색 인덱스 검사 추가. E2E `search.spec.ts`(G2-8 J: 3개 페이지, 규칙, 포커스 복귀, status, 스크롤 잠금)·`images.spec.ts` O-8. **작성자 요청:** 로컬에서 고친 경력 문구 2건(Okta·Keycloak 자동화, Temporal 두 번째 기간 `2025-09`)을 이 PR에 포함. **디자인에 알릴 것(Q20):** 모바일 전체 화면 팔레트에 닫기 수단이 없어 `esc` 표시를 버튼(`esc 닫기`)으로 만들었다. **못 한 것:** Safari·모바일 Safari 스크롤 잠금, 스크린리더 낭독, CI Lighthouse 값 | PR-20 머지 후 PR-21 |
| 2026-11-07 | **PR-19 구현·PR 오픈.** About을 디자인 시안대로 다시 그림(`components/about/AboutIntro`·`ExperienceSection`, `app/about/about.css`): 첫 화면(직함 · 경력 N년+, 버튼 4개, 현재 회사 없음), 회사 바로가기 3개, 경력 전부 펼침(h2→h3→h4), 오픈소스·skills 7그룹·자격증·학력/활동. 기간 표기는 PRD 규칙(같은 달 한 번, `now`). 인쇄 `@media print`는 `globals.css`(A4, 라이트 고정, URL 표시, 쪽 경계), 폴백 `@font-face`(size-adjust 86.4%)와 `html{scroll-padding-top}`, `ExperienceItem`·`ActivityCard`·`Bio` 삭제. **`lighthouserc.json`의 About 예외 해제.** `DESIGN.md`에 32번 1·2·3장 반영(v1.4). **작성자 요청 반영:** skills observability에 OpenTelemetry·Prometheus 추가(PRD-004 4.4 표에도 반영 필요 → 기획). E2E `about.spec.ts`(G2-3·첫 화면·바로가기·인쇄), 글자 200% 넘침 수정. **못 한 것:** 실제 Chrome 확인, CI 리눅스 CLS 값, PDF는 Playwright로 6쪽·559KB(시안 기준 5쪽, PR-22에서 맞춤) | PR-19 머지 후 PR-20 |
| 2026-11-07 | **PR-18 구현·PR 오픈(#60).** `content/profile.yaml`·`experience.yaml`·`site.yaml`, zod 스키마·교차 검증(`src/lib/content/profile-schema.ts`, `profile.ts`), About·Bio·`site.ts`(AUTHOR·SITE_NAME)가 데이터를 읽음. 글 frontmatter `relatedProject` 제거(없앤 필드). `yarn check:content`(G2-2 하드코딩 검사)를 CI에 추가. E2E `profile-schema.spec.ts`(규칙별 깨진 fixture), 실제 빌드에서 `stack` 필드를 넣으면 빌드 실패 확인. 전후 텍스트 비교(`/about`): 차이는 기술 스택 7그룹·클래스101 직함뿐. 같이 넣은 것: Karpenter 제목 오타 수정. **결정(작성자):** headline은 현재 Bio 문장 유지. **못 한 것:** 실제 Chrome 확인(Playwright Chromium 스크린샷만) | #60 머지 후 PR-19 |
| 2026-11-04 | **세션 종료 인수인계.** ① Phase 0·1 보관·정리 완료(#58, 기획·디자인 정리 포함 머지) ② 기획·디자인 개정 확인: PRD-004가 PR-18~25로 재정리됨(2026-11-02), 디자인 25번 답변(2026-11-03)이 나옴 → 이 문서의 Phase 2 PR 표를 새 구성으로 교체, REQUESTS Q16~Q18 추가 ③ **`resume.pdf` 시험 제작**(작성자 요청): 현재 About을 PRD-004 5.3 기준(라이트, 사진·헤더·푸터·버튼 숨김, URL 표시, 프로젝트 쪽 보호)으로 A4 인쇄해 6쪽·552KB, 한글 텍스트 검색 확인. 저장소 루트 `resume.pdf`는 미추적(커밋하지 않음), 스크립트는 `tools/resume-pdf-prototype.mjs`로 보관. 한계: 직함·연차·회사 바로가기는 PR-19 이후, 쪽 수 6쪽(PRD 예상 4~5쪽), `resume.md` 기준판(주요 성과 요약 포함)은 요청 시 ④ 작업 규칙 재확인(스크린샷 PR 본문에·Chrome 확인 매번·작업 후 PR까지)은 메모리와 위 "다음 작업"에 반영 | 새 세션: 이 문서 → CONTEXT 읽고 `tabs_context_mcp {createIfEmpty:true}` 후 **PR-18 시작** |
| 2026-11-01 | Phase 0·1 종료와 정리. 개발 요약을 `archive/phase0-summary.md`·`phase1-summary.md`로 보관하고, 이 폴더의 이력성 내용(Phase 1 PR 표·PR별 동작 표·측정 이력·질문 Q1~Q15·성능 브리프)을 걷어냄(원문은 git 기록과 PR 본문). CONTEXT는 규칙·함정만 남김. PR #58 | #58 머지 후 Phase 2 PR-18 시작 |
