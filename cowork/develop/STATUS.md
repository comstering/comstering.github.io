# 개발 진행 현황

_최종 갱신: 2026-11-01 · 기준 커밋 `ccb7361`(main, #57 머지) · 기준 기획서 PRD-003(approved)·PRD-004(review) · 디자인 v1.4_

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | **완료.** PR-0~PR-8, 배포 재개, 배포 후 점검까지 |
| Phase 1 읽기 경험 (PRD-003) | **완료(2026-11-01, 기획이 PRD-003 `done` 처리).** PR-9~PR-17, Q14 접근성 PR까지. G1-1~G1-6 결과는 CONTEXT 6.1. About 성능·CLS·TBT `warn` 예외는 Phase 2 PR-19까지 |
| Phase 2 포트폴리오 (PRD-004) | **approved. 개발 시작 가능.** 순서 PR-18(데이터 분리·검증) → PR-19(About 강화, About CLS ≤ 0.1·예외 해제 포함) → PR-20 → PR-21 → PR-22 → PR-23 |
| 지금 막힌 것 | 없음. **도구 확정(사용자 승인 2026-11-01): OG는 `next/og`(새 의존성 없음), 글꼴 서브셋은 Node `subset-font`(새 devDependency 1개, 설치 전 알림).** 의존성 갱신 #50·Next 16 #51 머지 완료 |

## 다음 작업 (새 세션은 여기서 시작)

1. `git checkout main && git pull`, `gh pr list`로 열린 PR을 본다(tracked 변경이 있으면 `git stash` 후 pull, `git stash -u` 금지). 미추적 `resume.md`·`.claude/launch.json`은 내 것이 아니니 커밋하지 않는다. 기획·디자인 세션이 `cowork/prd`·`cowork/design`을 로컬에서 고쳐 두었을 수 있다(작성자가 별도 PR로 올린다, 개발은 커밋하지 않는다)
   - **환경(2026-11-01):** Next 16.4.3(Turbopack), React 19.3.1, Tailwind 4.3.3, eslint는 `eslint .` + flat config. `sharp`는 0.33.5 고정. 보류한 메이저: typescript 7, eslint 10, lucide-react 1.x, @types/node 26, sharp 0.35(필요하면 사용자 검토 후 따로)
   - 현재 CI 관측(PR #56): 홈 97·LCP 1.7s·CLS 0.058·TBT 128ms, 글 97·1.8s·0.030·131ms, About 92·1.8s·CLS 0.125·178ms(About 예외)
   - **Claude in Chrome이 켜져 있으면 화면 확인은 실제 Chrome으로 매번 한다**(시키지 않아도, 메모리 `feedback-verify-in-chrome`). **눈에 보이는 결과물이 있으면 PC·Mobile 스크린샷을 PR을 열 때 본문에 넣는다**(메모리 `feedback-pr-screenshots`). 작업이 끝나면 커밋·push·PR까지 바로 올린다(`feedback-always-commit-and-pr`)
2. **Phase 2 PR-18(데이터 분리·검증)부터**: `cowork/prd/004_portfolio_projects-and-about.md` 0장·7장·PR-18 절과 디자인 D-1~D-5 요청을 먼저 읽는다. 첫 단계에서 `content/profile.yaml`·`content/experience.yaml`·zod 스키마를 만든다. 문장은 바꾸지 않고 옮긴다(바뀌는 것은 기술 스택 7그룹뿐)
3. PR-19에서 **About CLS ≤ 0.1(관측 3회 중앙값)을 해결하고 `lighthouserc.json`의 About 예외(`assertMatrix[2]`)를 지운다.** 원인과 해법 후보는 CONTEXT 6.1(소개 둘째 문단이 글꼴 도착 뒤 줄 수가 바뀜, preload는 효과 없었음)
4. 이월(작성자 작업): 카카오·LinkedIn OG 미리보기(LinkedIn Post Inspector는 로그인 필요), Search Console·네이버 sitemap 재제출, 사이트 1차 완성 후 branch protection
5. 열린 질문: 없음(Q9·Q14·Q15 closed)

## Phase 1 PR별 상태

| PR | 내용 | 상태 | 링크 |
| --- | --- | --- | --- |
| PR-10 | E2E(Playwright)·Lighthouse CI | ✅ 머지 | #27 |
| PR-11 | 본문: 코드 블록·콜아웃·표 | ✅ 머지 | #28 |
| (추가) | PR 댓글 Lighthouse 요약 | ✅ 머지 | #29 |
| PR-9 | categories 다중화·`updated` 삭제·필터 URL·목록 썸네일 제거 | ✅ 머지 | #30 |
| (추가) | CLAUDE.md에 개발 인수인계 지침(기록 규칙) | ✅ 머지 | #31 |
| PR-12 | 글 상단 바: 목차·시리즈 | ✅ 머지 | #33 |
| PR-13 | 관련 글 | ✅ 머지 | #35 |
| (수정) | PR-12 `font:` 단축 속성 무효 수정 + 빌드 CSS 검사(Q8) | ✅ 머지 | #37 |
| PR-14 | 이미지 파이프라인(sharp WebP·lazy·확대 dialog), favicon 1.7MB→4.7KB | ✅ 머지 | #38 |
| (수정) | G1-4를 첫 본문 블록 기준으로(기획 Q6) | ✅ 머지 | #39 |
| (수정) | Q9 접근성 3건 + 접근성 `error` | ✅ 머지 | #41 |
| (수정) | Q10 목록 링크 범위·`SectionHead` 굵기(디자인 20번) | ✅ 머지 | #43 |
| (문서) | Q11 성능 게이트 정리 문서 | ✅ 머지 | #44 |
| (설정) | Lighthouse 관측 측정 + 차단/목표선(Q12) | ✅ 머지 | #45 |
| (문서) | cowork 전체(기획 PRD-004·디자인 18번 포함) 커밋, Q13 결정 반영 | 🔍 리뷰 대기 | #47 |
| (작업) | 글꼴 서브셋(디자인 19번 ①, Q9 남은 건) | ✅ 머지 | #53 |
| PR-15 | OG 이미지 자동 생성, `thumbnail` 필드 삭제 | ✅ 머지 | #54 |
| PR-16 | 읽기 진행률·링크 체커 | ✅ 머지 | #55 |
| PR-17 | 게이트 측정·문서 + 성능 차단선 `error` + About 예외 | ✅ 머지 | #56 |
| (수정) | Q14 접근성·반응형(디자인 21번 impeccable audit) | ✅ 머지 | #57 |
| (문서) | Phase 1 개발 요약 보관(`archive/phase1-summary.md`) | 🔍 PR 오픈(브랜치 `docs/archive-phase1`) | |

개발 순서(PRD-003): …→ PR-14 → PR-15 → PR-16 → PR-17. 한 번에 PR 하나, 사용자가 머지하면 다음으로 간다.

## 사용자에게 보이는 현재 상태 (라이브 사이트, #57 머지 기준)

- 디자인 시스템 v1.3~1.4(Terminal Graphite) 적용, 자동 배포 가동
- 홈: 연도별 세로 리스트(썸네일 없음), 카테고리 칩(숫자 대비 6.5:1), 검색, `?category=` 필터(뒤로가기 복원), 시리즈 메타 `series eks 3/5`
- 글 상세: 한 줄 도구 바(목차·시리즈), 오른쪽 sticky 목차, 시리즈 박스, 코드 블록(파일명·줄 하이라이트·복사), 콜아웃, 표 흐림, 이미지 확대, 관련 글(최대 3편), 이전/다음, 저자 박스, Giscus
- 접근성 100·SEO 100 (CI `error`), 본문 이미지 WebP(≤ 200KB), favicon 4.7KB
- 글 상세 읽기 진행률(헤더 아래 2px), 글마다 자동 생성되는 OG 이미지, 글꼴 서브셋(요청 2개), 주간 링크 체커(`Links` 워크플로)
- Phase 1 종료. 요약은 [archive/phase1-summary.md](./archive/phase1-summary.md)

## 측정값 (Lighthouse, 리눅스 CI, 실제 Chrome 관측, 3회 중앙값, PR #45 2회 실행)

| 페이지 | 성능 | LCP | CLS | TBT | 차단선(성능 ≥ 90·LCP ≤ 2.5s·CLS ≤ 0.1·TBT ≤ 300ms) |
| --- | --- | --- | --- | --- | --- |
| 홈 | 98 / 98 | 1.9s / 1.9s | 0.035 / 0.058 | 36 / 50ms | 통과 |
| 글 상세 | 97 / 97 | 2.0s / 2.0s | 0.030 / 0.029 | 107 / 116ms | 통과 |
| About | 90 / 88 | 2.0s / 2.0s | 0.051 / 0.051 | 344 / 376ms | **성능·TBT 미달 → PR-17에서 예외(Phase 2 PR-19까지)** |

- LCP 흔들림 ≤ 0.1s(기획 기준 ±0.3s 이내). 목표선(성능 ≥ 95·LCP ≤ 2.0s·CLS ≤ 0.05·TBT ≤ 200ms)은 LCP 2.0s 경계, About TBT·성능 미달, 홈 CLS 경계
- CI 시간 5m28s ~ 9m27s(Playwright 의존성 설치 변동), timeout 15분

## Q10 디자인 20번 반영 (#43)

| # | 요청 | 처리 |
| --- | --- | --- |
| F1 | 목록·관련 글 링크 이름을 제목만으로(136~176자 → 제목), 클릭은 행 전체 | `PostListItem`: 링크를 `h3` 안으로, `::before`로 행 전체를 덮음, 행 `article`에 `has-[a:focus-visible]` 포커스 링(시안 `.post-item:has(a:focus-visible)`). 홈·404·관련 글 모두 공용이라 한 번에 바뀜 |
| F2 | `SectionHead` 라벨 굵기 700 | `font-normal` → `font-bold`(`//`는 400 유지) |
| 부수 | 전역 `:focus-visible`이 레이어 밖이라 Tailwind `outline-none`이 안 먹음 | `.post-link:focus-visible { outline: none }`을 `globals.css`에 추가(행에만 링을 그린다) |

설명 `<p>`는 링크의 `::before`에 덮여서 Playwright `click()`이 "가로챈다"며 기다린다. E2E는 좌표(`mouse.click`)로 누른다.

## Q9 디자인 답변 반영 (design/19번, #41)

| # | 요청 | 처리 |
| --- | --- | --- |
| ② | 칩 숫자 `opacity-60` 제거(대비 3.05:1 → 6.53:1) | 완료. `PostsBlock.tsx` |
| ③ | 복사 버튼 `aria-label` 제거(보이는 글자 `copy`와 이름 일치, WCAG 2.5.3) | 완료. `rehype-code-meta.ts`, E2E 이름 검사를 `copy`로 |
| ④ | About 항목 제목 `h4` → `h3`(h2 바로 아래 h4 건너뜀) | 완료. `ActivityCard`(활동·기타 경력에 쓰임)와 자격증 카드. 시각 변화 없음. 전 페이지 제목 단계 E2E 추가(홈·About·글 2편) |
| 결과 | 접근성 | 로컬 Lighthouse 3페이지 모두 **100**(About 98→100, 홈 96→100). 그래서 `lighthouserc.json`의 접근성을 `error`로 올렸다. 리눅스 CI 결과는 PR의 CI에서 확인 |
| ① | 글꼴 서브셋 | **미착수**(다음 작업 2번) |

## 기획 답변 반영 (2026-10-29)

| # | 내용 | 개발 쪽 변경 |
| --- | --- | --- |
| Q4 | 기존 글에 콜아웃·셸 블록·파일명을 소급 적용하지 않는다(ENI 트러블슈팅 글 1편만) | 없음(지금 그대로) |
| Q6 | G1-4를 "모든 글의 첫 본문 블록(첫 문단 또는 첫 h2)이 360×640에서 ≤640px에서 시작"으로 변경. 서문이 있는 글도 통과 | E2E `post-toolbar.spec.ts`에서 `LONG_INTRO` 예외 목록을 지우고 첫 본문 블록으로 측정. 14편 모두 통과, 가장 아래는 `install-cilium-eks` 620px(여유 20px) |
| (정정) | PRD PR-12 시리즈 박스 "다음 편 링크"는 목록의 각 글 링크로 충족(디자인 17번 Q7) | 없음 |

## PR-14(#38)에서 정한 동작 (디자이너 확인 요청)

| # | 내용 |
| --- | --- |
| P-13 | 본문 이미지는 빌드 전 `sharp`(0.33.5 고정)로 WebP 변환(최대 폭 1440px, 200KB 이하까지 품질→폭 순으로 낮춤): 64개 26.5MB → 3.3MB, 가장 큰 변환본 191KB. 원본은 저장소에 그대로 두고 배포물(`out/`)에서는 본문 원본을 뺀다(48MB → 15MB) |
| P-14 | 확대는 **변환본 폭이 720px보다 큰 이미지에만** 붙는다(E3). 60개 중 59개가 해당, 720px 이하는 `introduce-cilium-cni`의 `compare-latency-service` 1개. 확대 가능한 이미지는 `role="button"`·`tabindex=0`·`aria-label="… 확대"`, 확대가 없으면 아무 표시도 없다 |
| P-15 | 이미지만 든 문단은 `<figure>`로 바뀌고, 마크다운 이미지 title(`![alt](src "캡션")`)이 있으면 `<figcaption>`과 확대 창 캡션이 된다. 지금 글에는 title이 없어 캡션은 안 보인다 |
| P-16 | 확대 창은 시안(`dialog.lightbox`)대로: Esc·배경 클릭·44px 닫기 버튼, 닫으면 누른 이미지로 포커스 복귀, `prefers-reduced-motion`이면 애니메이션 없음 |
| P-17 | `src/app/favicon.ico`가 사실 **1024×1024 PNG 1.7MB**여서 모든 페이지 전송량의 약 75%였다. 같은 그림을 16·32·48px 레이어의 진짜 ICO(4.7KB)로 바꿨다. 로고가 글자("Comstering's Dev Notes")라 16px에서는 읽히지 않는다. 파비콘용 심볼이 필요하면 디자인에 요청 |
| P-18 | Lighthouse: SEO 100만 `error`로 올렸다. 성능 ≥ 95, 접근성 100, LCP ≤ 2s, **CLS ≤ 0.05**는 `warn`으로 남겼다. CLS는 처음 `error`로 올렸다가 CI에서 About이 0.125~0.132(원인: 한글 웹폰트 로드 후 문단 재배치)라 되돌렸다(Q9). 측정은 페이지마다 3회, 요약 댓글은 중앙값. `.lighthouseci`가 점 폴더라 아티팩트에 안 올라가던 것도 고쳤다(`include-hidden-files`) |

## PR-13에서 정한 동작 (디자이너 확인 요청)

| # | 내용 |
| --- | --- |
| P-10 | 관련 글 섹션은 이전/다음 아래·댓글 위, 제목 `// related`. 항목은 시안 `post-item--compact`(메타 → 제목 → 설명 1줄, 태그 없음). 0편이면 섹션을 그리지 않는다(현재 3편 글 11개, 0편 글 3개: `implement-my-site`, `first-contribute-opensource`, `2025-retrospective…`) |
| P-11 | 같은 `compact` 스타일을 쓰는 404의 최신 글 목록도 시안(`404.html`)대로 함께 바뀐다(패딩·제목 18px·설명 1줄) |
| P-12 | 점수는 태그 교집합 수뿐이다(카테고리는 점수에 안 넣음). 시리즈가 다른 글끼리는 시리즈 위치 메타(`series cilium 3/3`)가 목록에 그대로 보인다 |

## PR-12(#33)에서 정한 동작 (디자이너 확인 요청)

| # | 내용 |
| --- | --- |
| P-5 | 목차는 본문 h2가 3개 이상일 때만 만든다(sticky·inline 모두). `install-cilium-eks`(h2 2개)는 목차 없이 시리즈 박스만 한 줄 전체를 쓴다 |
| P-6 | 시리즈 박스는 시안대로 `<button aria-expanded>`로 연다(PRD는 `<details>`라고 했지만 시안·E2E 기준이 aria-expanded라 시안을 따랐다). 목차(inline)는 `<details>` |
| P-7 | 시리즈 박스 이름은 시안대로 slug(`eks-from-scratch`), 모바일(<640)은 `series eks`. `series.yaml`의 `title`은 화면에 안 나오고 목록의 `aria-label`로만 쓴다 |
| P-8 | 목차 링크를 누르면 inline 목차가 닫힌다. 현재 항목은 `aria-current="true"`, 굵기 600 + accent 왼쪽선 |
| P-9 | 홈 목록 메타 `series eks 3/5`의 분모는 발행된 시리즈 글 수 |

## PR-9(#30)에서 정한 동작 (디자이너 확인 완료: design/16번)

| # | 내용 |
| --- | --- |
| P-1 | 정적 export라 서버가 `?category=`를 모른다. 처음 받는 HTML은 **필터 없는 전체 목록**이고, JS가 켜지면 URL 값으로 필터가 걸린다. `/?category=infra`로 직접 들어가면 전체 목록이 잠깐 보였다가 필터된다(검색엔진용 HTML에는 전체 목록이 들어 있어 SEO에는 이득). **디자인 16번: 허용**(PC 약 80ms, 모바일 CPU 4배 느림 약 420ms, CLS 0). 다시 볼 조건: 실기기·느린 네트워크에서 약 1초 이상 보이거나 필터 URL 유입이 늘 때 → 항목 `data-categories` + 하이드레이션 전 인라인 스크립트가 `<html data-filter>`를 붙여 CSS로 숨기는 방법(권장). 목록을 투명하게 두는 방법은 LCP가 늦어져 비권장 |
| P-2 | (16번 확인) 글이 0편인 카테고리(`?category=backend`)나 모르는 값은 `all`로 본다 |
| P-3 | (16번 확인) 글 상세 헤더의 카테고리는 각각 `/?category=값` 링크(accent), 쉼표는 mute·링크 밖 |
| P-4 | (16번 확인) 시리즈 label 8자 이하 규칙을 빌드가 검사한다. 현재 `eks`, `cilium`은 통과 |

## 사용자(작성자) 작업

- Search Console·네이버 서치어드바이저 sitemap 재제출
- LinkedIn Post Inspector로 OG 확인 (로그인 필요)
- 사이트 1차 완성 후 branch protection 켜기(PR CI 통과 필수)
- `cowork/` 폴더를 저장소에 커밋할지 결정. 저장소가 public이라 올리면 기획·시안이 공개된다. **지금은 미커밋 상태**

## 변경 이력

| 날짜 | 내용 |
| --- | --- |
| 2026-10-28 | PR-9 오픈(#30), Q2 종료(현재 label 모두 8자 이하). PR-11을 최종 시안과 대조해 D-1~D-4 수정, Q1·Q3 종료. 문서 신설. PR-10 머지(#27), PR-11 오픈(#28) |

## 세션 기록

| 날짜 | 한 일 | 남은 일 / 다음 첫 명령 |
| --- | --- | --- |
| 2026-11-01 | **Phase 1 종료.** #57 머지 확인(`ccb7361`). Phase 1 개발 내용을 핵심만 요약해 `cowork/develop/archive/phase1-summary.md`로 보관(결과·PR 표·핵심 결정·성능 게이트 이력·함정·Phase 2 이월). README에 `archive/` 안내. 원본 STATUS·CONTEXT·REQUESTS는 그대로 둠 | Phase 2 PR-18 시작 |
| 2026-11-01 | #56 머지 확인(`cc88433`). 기획이 Q15 답함: About 예외를 성능·CLS·TBT로 확대 승인, PRD-003 `done`·PRD-001 체크 완료, PR-19 수용 기준에 About CLS ≤ 0.1 추가. **Q14(디자인 21번) 처리(브랜치 `fix/a11y-audit-q14`, PR #57):** P1 코드 `<pre>` `tabindex=0`·`role=region`·`aria-label`(`rehype-code-meta`) ② 헤더 `flex-wrap`·`min-h-16`, 링크·로고·칩 히트 영역 44px(`after:`), 칩 줄에 `py-1.5 -my-1.5`(`overflow-x-auto`가 `::after`를 잘라서), 테마 토글 36→44px ③ PC 목차 `aside`→`div[data-toc-aside]`, 폭·간격을 px로(글자 확대 때 넘침 방지) ④ 외부 링크 `rel`에 `noopener noreferrer` 추가(`nofollow` 정책은 그대로) ⑤ **추가 발견:** About이 글자 200%·360px에서 185px 넘침(디자인 감사는 헤더만 봄) → 카드·그리드 자식에 `min-w-0`, `Button`의 `whitespace-nowrap` 제거(`min-h-(--tap)`+줄바꿈 허용). 보류: P3-3 번들·렌더링 차단 CSS(`optimize`, 게이트 통과 중이라 별도), 헤딩 앵커 `#`·코드 복사 버튼 터치 크기(보조 요소, 간격 예외). E2E 14건 추가(109건 통과), 실제 Chrome에서 `<pre>` Tab 포커스·360px·200% 넘침 0 확인. **Phase 1 종료 기록** | Phase 2 PR-18 시작 |
| 2026-11-01 | #55 머지 확인(`e01c7a8`, `Links` 워크플로가 PR에서 실행돼 성공). PR-17 작업(브랜치 `feat/gate-docs`): 차단선 `error` 승격 + About 성능·CLS·TBT `warn` 예외, README·DESIGN·CONTEXT(6.1 게이트 측정 결과) 문서, REQUESTS Q15 신설. **#55 CI 관측: About CLS 0.125 그대로**. 원인을 CI 리포트로 확인: About 둘째 소개 문단이 글꼴 도착 뒤 줄 수가 바뀜. 서브셋 글꼴 preload를 시험으로 넣음(결과는 CI에서). **Q14(디자인 21번 감사)가 REQUESTS에 open으로 남아 이 목록에서 빠져 있던 것을 발견**해 "다음 작업"에 추가. 로컬: lint·tokens·build·check:output·E2E 통과 | (후속) PR #56 CI 결과: preload로도 About CLS 0.125 그대로(이동 원인 `Web font loaded` 동일, 글꼴 도착 약 3.0s > FCP 1.8s) → preload 되돌림, About CLS 예외 확정, 문서·Q15 갱신 | #56 머지 후 Q14 별도 PR |
| 2026-11-01 | #54 머지 확인(`37b3b45`). PR-16 구현(브랜치 `feat/reading-progress`): ① 진행률 `PostProgress`(글 상세에만, `globals.css` `.reading-progress`: `@supports (animation-timeline: scroll())` + `prefers-reduced-motion: no-preference`일 때만 보임, scroll 리스너 없음, 미지원 브라우저는 PRD대로 숨김 — 시안 app.js의 IntersectionObserver 대체는 넣지 않음) ② 링크 체커 `.github/workflows/links.yaml`(주 1회 월 09:00 KST·수동은 전체 글, PR은 바뀐 글만·요약만, 깨지면 이슈 1개를 만들거나 갱신) + `lychee.toml`(429 허용, 예시 주소 제외), `lycheeverse/lychee-action`을 v2.9.0 커밋 SHA(`e747777`)로 고정해 사용(새 CI 의존성, 사용자가 1번 안으로 확정·SHA 고정 지시). 첫 실행 대신 로컬 curl로 글의 외부 링크 40개를 조사: 실제 깨진 것 0, `my-app.default.svc.cluster.local`(예시)은 exclude, faqs.org·hashicorp.com/ko는 429라 accept. E2E 6건 추가(95건 통과), 실제 Chrome에서 스크롤 25/50/75/100%에 scaleX가 0.25/0.5/0.75/1.0. 못 한 것: lychee 실제 실행(CI에서 처음 돈다), 모바일 360px 육안 | PR 오픈 → PR-17(About CLS 조사 포함)
| 2026-11-01 | #53 머지 확인(`ee3759d`). **#53 CI 관측값: About 성능 90·CLS 0.125(차단선 0.1 초과)·TBT 210ms, 홈 96·CLS 0.058, 글 96·0.030. 서브셋을 적용해도 About CLS가 개선되지 않았다**(원인은 글꼴이 아닌 다른 레이아웃 이동으로 보임, 미조사). PR-17에서 CLS를 error로 올리기 전에 About 원인 조사나 About 예외가 필요하다. PR-15 구현(브랜치 `feat/og-images`): `src/lib/og.tsx`(`next/og` ImageResponse, 색은 globals.css `.dark` 토큰을 빌드 때 읽음, Pretendard-Bold.otf + `@fontsource/jetbrains-mono` woff), 라우트 `posts/[id]/og.png`·`og.png`·`about/og.png`(16개 PNG 1200×630, 약 40~47KB, 시안과 시각 대조 일치), og:image·JSON-LD 교체, `thumbnail` 필드·검증·README·frontmatter 14편·`public/images/posts/thumbnails/`(10개) 삭제, `check:output`에 PNG 서명·1200×630·글별 고유(해시) 검사. 새 devDependency `@fontsource/jetbrains-mono`(사용자 승인). lint·tokens·build·check:output·E2E 89건 통과. 실제 Chrome(빌드 `out/`) 확인 완료: og:image·twitter:image·JSON-LD가 글별 PNG를 가리키고, 글·홈·About PNG 모두 200·image/png·1200×630, 육안 시안 일치, 콘솔 에러 0. 못 한 것: 카카오·LinkedIn 실제 미리보기(사용자 작업), `public/blog-logo.png`는 더는 안 쓰지만 남겨 둠 | 사용자 OK 후 커밋·PR → PR-16 |
| 2026-11-01 | 글꼴 서브셋 구현(브랜치 `feat/font-subset`): `subset-font@2.9.0` devDependency 추가, 서브셋 스크립트·`@font-face`·`check:output` 검사. 기존 `pretendardvariable-dynamic-subset.css` import 제거. 로컬 검증 통과(E2E 89건). 커밋·PR은 사용자 요청 대기(루트 CLAUDE.md: 커밋은 요청 시에만). 실제 Chrome(Claude in Chrome, 빌드 `out/`) 확인 완료: 홈·글 2편·About 모두 글꼴 요청 2개(Pretendard 서브셋 + JetBrains Mono), `Pretendard Variable` loaded, 콘솔 에러 0, 4개 페이지 본문 글자 중 서브셋 밖(폴백 의심) 글자 0, h1 700·본문 400 적용. **못 한 것:** 라이트 테마 육안(토글 셀렉터 불일치로 다크만 확인), 창 폭이 406px·1403px 두 가지뿐이라 정밀한 모바일 360 확인, CI CLS 미확인 | 사용자 OK 후 커밋·push·PR → CI CLS 확인 → PR-15 OG |
| 2026-11-01 | PR-A(#50) 머지 확인. Next 16 PR-B 오픈(브랜치 `chore/next-16`): next·eslint-config-next 16.4.3(Turbopack 빌드). 수정 3건: ① `src/app/favicon.ico` 안의 PNG가 팔레트(RGBA 아님)라 Turbopack이 디코딩 실패 → RGBA로 재인코딩(5.3KB) ② `next lint` 제거 → `eslint .` + `eslint.config.mjs`를 `eslint-config-next/core-web-vitals`·`typescript` flat config로 교체(ignores: out, .next, public/_img, cowork 등) ③ 새 react-hooks 규칙(`set-state-in-effect`) 때문에 `ThemeToggle`의 mounted를 `useSyncExternalStore`로 변경. `tsconfig.json`은 Next가 자동 수정(`jsx: react-jsx`). lint·tokens·build·check:output·E2E 89건 통과 | CI(Lighthouse 포함) 확인, 머지 후 PR-15(OG) |
| 2026-11-01 | 사용자 승인: OG `next/og`, 서브셋 `subset-font`(A1+B1). #50(의존성 마이너 갱신, `SiAmazon`·`SiLinkedin` 제거 대응으로 `FaAws`·`FaLinkedin`)·#51(Next 16.4.3: favicon RGBA 재인코딩, `eslint .` 전환, ThemeToggle `useSyncExternalStore`) 머지. 세션을 Chrome 확장 문제로 종료하며 기록 정리 | 다음 첫 명령: main pull 후 **글꼴 서브셋 PR**(설치 전 알림) → **PR-15 OG** → PR-16 → PR-17 |
| 2026-11-01 | 의존성 갱신 PR-A 오픈(브랜치 `chore/deps-update-a`): react 19.3.1, next 15.5.28, tailwind 4.3.3, typography, react-icons 5.7 등. react-icons 5.7에서 브랜드 아이콘 `SiAmazon`·`SiLinkedin`이 제거돼 `FaAws`·`FaLinkedin`(react-icons/fa)으로 교체. lint·tokens·build·check:output·E2E 89건 통과 | 머지 후 Next 16 PR-B. 메이저(typescript 7, eslint 10, lucide 1.x, @types/node 26, sharp 0.35)는 보류 |
| 2026-11-01 | 도구 선택: OG는 `next/og`(A1), 글꼴 서브셋은 Node `subset-font`(B1) 확정(사용자 승인). `subset-font@2.9.0`이 `wght 400–700` 축 제한을 지원함을 저장소 밖에서 확인(설치 전 시험). Next 15.2.4→16.4.3 업그레이드와 의존성 갱신은 사용자 검토 후 진행 | 사용자 검토 대기: 의존성 갱신 범위 |
| 2026-10-29 | 기획 답변(Q4·Q6) 확인: G1-4 기준 변경을 E2E에 반영(PR #39). #38·#39 CI 실패(리눅스에서 sharp libvips 못 찾음) → sharp 0.33.5 고정으로 수정. PR-14 오픈(#38, #37 위): sharp 이미지 파이프라인, 확대 `<dialog>`, favicon 1.7MB→4.7KB, Lighthouse SEO·CLS error. 디자인 17번(Q8) 반영: PR-12의 `font:` 단축 속성 6개가 CSS 압축에서 무효가 되던 것을 longhand로 수정, `check:output`에 검사 추가, PR #37. PR-14는 그다음 | #37 머지 확인 → PR-14 시작 |
| 2026-10-28 | PR-13 오픈(#35): 관련 글(점수·시리즈/이전·다음 제외), compact 목록 시안 맞춤(404도 같이 바뀜), E2E 7건. #33·#32 머지 확인, main pull(`691c01b`). 로컬 미추적 `cowork` 58개가 머지본과 동일함을 확인하고 scratchpad 백업으로 옮긴 뒤 pull(삭제는 하지 않음) | PR-13 시작: `git checkout -b feat/related-posts` |
| 2026-10-28 | PR-10(#27), PR-11(#28), Lighthouse 댓글(#29) 머지. PR-9(#30) 오픈, CI 통과. CLAUDE.md 지침 PR(#31) 오픈, 기록 규칙을 CONTEXT 4.5장·메모리에 명시. `cowork/develop` 문서·도구 신설(CONTEXT, STATUS, REQUESTS, tools/) | #30 머지 확인 → PR-12 시작. `gh pr view 30 --json state` |
