# Phase 1 읽기 경험 (PRD-003) 개발 요약

_기간 2026-10-28 ~ 2026-11-01 · PR #27 ~ #57 · 기획 PRD-003 `done` · 최종 기준 커밋 `ccb7361`_

이 문서는 Phase 1 개발 기록의 **핵심만** 모은 보관본이다. 세부(PR별 동작 표, 세션 기록, 질문 원문)는 `../STATUS.md`·`../REQUESTS.md`·`../CONTEXT.md`와 각 PR 본문에 있다. 새 세션은 이 문서를 읽지 않아도 된다(규칙은 `../CONTEXT.md`).

## 1. 결과

모든 게이트(G1-1~G1-6)를 통과했다. 예외는 하나다: About의 성능·CLS·TBT는 `warn`이고 Phase 2 PR-19에서 해제한다(기획 Q13·Q15).

| 게이트 | 기준 | 결과 |
| --- | --- | --- |
| G1-1 성능 차단선 | 성능 ≥ 90, LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 300ms (관측, 3회 중앙값) | 홈 97·1.7s·0.058·128ms, 글 97·1.8s·0.030·131ms 통과. About 92·1.8s·**CLS 0.125**·178ms(CLS만 미달, 예외) |
| G1-2 접근성·SEO | 100 / 100 | 세 페이지 모두 100·100(CI `error`) |
| G1-3 E2E | 목차·복사·시리즈·필터·확대 | 109건 통과(3 skip) |
| G1-4 첫 화면 | 360×640에서 모든 글의 첫 본문 블록 ≤ 640px | 14편 통과(최대 620px) |
| G1-5 이미지 | 변환본, 본문 이미지 ≤ 200KB | 60개, 26.5MB → 3.3MB, 최대 191KB |
| G1-6 OG | 모든 글 고유 PNG, 목록 썸네일 없음 | 16개 PNG(글 14 + 홈 + About), `thumbnail` 필드 0건 |

## 2. 만든 것 (PR 순서)

| PR | 내용 |
| --- | --- |
| #27 PR-10 | Playwright E2E, Lighthouse CI(PR마다), #29 PR 댓글 요약 |
| #28 PR-11 | 코드 블록(언어 라벨·`title`·`{줄}` 강조·복사), 콜아웃(`> [!NOTE]`/`[!WARNING]`), 표 흐림 |
| #30 PR-9 | `categories` 배열(최대 2, 고정 순서), `updated` 삭제, `?category=` 필터(뒤로가기 복원), 목록 썸네일 제거 |
| #33 PR-12 | 글 상단 도구 바(목차·시리즈), 1280↑ sticky 목차, 시리즈 박스 |
| #35 PR-13 | 관련 글(태그 점수, 시리즈·이전/다음 제외, 최대 3편) |
| #38 PR-14 | 이미지 파이프라인(sharp WebP·lazy·확대 `<dialog>`), favicon 1.7MB → 4.7KB |
| #53 | 글꼴 서브셋: Pretendard를 사용 글자만 담은 단일 woff2(107KB)로, 요청 12~17개 → 2개 |
| #54 PR-15 | OG 이미지 자동 생성(`next/og`, `/posts/<slug>/og.png`), `thumbnail` 필드 삭제 |
| #55 PR-16 | 읽기 진행률(CSS scroll-driven), lychee 링크 체커(주 1회, 깨지면 이슈) |
| #56 PR-17 | 성능 차단선 `error` 승격, About 예외, README·DESIGN·CONTEXT 문서 |
| #57 | 디자인 감사(Q14): 코드 블록 키보드 접근, 글자 200% 넘침, 터치 대상 44px |
| 수정·정리 | #37 `font:` 단축 속성, #39 G1-4 기준, #41 접근성 3건, #43 목록 링크 범위, #45 Lighthouse 관측 측정, #50·#51 의존성·Next 16 |

## 3. 핵심 결정 (기획·디자인)

- **categories**: 배열 최대 2개, 대표 없음, 표시 순서 `infra · backend · frontend · oss · note`. `updated`는 삭제, 날짜는 `date`만
- **목록 썸네일 제거**(C안), OG는 글마다 자동 생성. MDX는 도입하지 않음
- **필터 URL**: 정적 export라 직접 진입 시 전체 목록이 잠깐 보였다가 필터됨을 허용(디자인 16번, PC 약 80ms·모바일 약 420ms, CLS 0)
- **기존 글에는 콜아웃·셸 블록·파일명을 소급 적용하지 않음**(Q4)
- **G1-4**는 "첫 h2"가 아니라 **첫 본문 블록**이 첫 화면 안에서 시작하는 것으로 변경(Q6, 서문이 긴 글 2편 때문)
- **글꼴**: 단일 서브셋 + `swap` + **preload 없음**(디자인 19번). 시스템 글꼴 폴백은 서브셋 밖 글자에만 쓰임
- **성능 측정 방식(Q11 → Q12)**: Lighthouse 기본 시뮬레이션은 글꼴 바이트를 LCP에 그대로 더해 과하게 나빠서(글 76점·LCP 4.5s), **실제 느린 4G·CPU 4배를 거는 관측(`throttlingMethod: devtools`)**, 페이지마다 3회 중앙값으로 바꿨다. 같은 사이트가 관측에서는 성능 97~98·LCP 1.7~2.0s였다. 차단선(error)과 목표선(warn)을 나눴다
- **About 예외(Q13 → Q15)**: About은 Phase 2 PR-19에서 통째로 다시 만들어지므로 지금 고치지 않는다. 성능·TBT에 이어 CLS까지 `warn` 예외, **숫자는 낮추지 않았고** PR-19 수용 기준에 "About CLS ≤ 0.1, 예외 해제"가 들어갔다

## 4. 성능 게이트 이력 (교훈 중심)

- 처음 숫자(LCP ≤ 2.0s, 성능 ≥ 95)는 시뮬레이션에서는 불가능했고, 관측으로 재면 현실적이었다. **측정 방식이 숫자의 의미를 바꾼다**는 점을 기획이 받아들여 재결정했다(Q12)
- 개발 실험(글꼴 2MB 등)을 저장소 안 `.lighthouseci`에 남겨 기획이 그 값(성능 56)을 근거로 삼은 일이 있었다. 실험 결과는 scratchpad에 두고, 끝나면 정상 빌드로 다시 측정한다
- **About CLS 0.125**: 원인은 둘째 소개 문단(한글 7줄)이 글꼴 도착 뒤 줄 수가 바뀌는 것(Lighthouse "Web font loaded", 이동 1건). 글꼴 서브셋(요청 수 감소)과 preload 모두 효과가 없었다. 느린 4G 관측에서 글꼴(107KB)이 약 3.0s에 도착해 첫 페인트(1.8s) 뒤이기 때문이다. 해법은 PR-19(폴백 글꼴 `size-adjust` 또는 문단 구성 변경). 맥 로컬은 CLS 0이라 **리눅스 CI에서만 보인다**

## 5. 겪은 함정 (재발 방지, 상세는 CONTEXT 8장)

- CSS `font:` 단축 속성에 `var()`를 여러 개 쓰면 빌드 압축이 쉼표를 끼워 선언이 무효가 된다(dev에서는 정상). `check:output`이 잡는다
- `sharp`는 0.33.5 고정. Next가 가진 sharp와 섞이면 리눅스 CI에서만 libvips를 못 찾는다
- 링크가 `::before`로 행 전체를 덮으면 Playwright `click()`이 가로채여 멈춘다 → 좌표 클릭
- 전역 `:focus-visible`이 Tailwind 레이어 밖이라 `outline-none`이 안 먹는다
- `overflow-x-auto` 컨테이너는 안쪽 `::after` 히트 영역을 잘라 낸다. 그리드·플렉스 자식에는 `min-w-0`이 없으면 글자 확대 때 넘친다
- Next 16: `next lint` 없음(`eslint .`), `favicon.ico`는 RGBA PNG, `react-hooks/set-state-in-effect`. react-icons 5.7에서 일부 브랜드 아이콘 제거
- STATUS.md를 구간 치환하면 사이 절이 지워진다. 치환 전후 `grep -n "^## "`로 확인
- `git stash -u`는 작성자의 미추적 파일까지 stash한다 쓰지 않는다
- 서브셋 글꼴·OG 색은 코드에 hex를 두지 않는다. OG는 `globals.css`의 `.dark` 토큰을 빌드 때 읽는다

## 6. 일하는 방식에서 굳어진 것

- 한 PR씩, 머지 후 다음. 작업이 끝나면 커밋·push·PR까지 바로 올리고 후속은 같은 브랜치에 커밋한다
- **눈에 보이는 결과물이 있으면 PC·Mobile 스크린샷을 PR을 열 때 본문에 넣는다**(OG 이미지·진행률 바처럼 작은 것도 포함). 눈에 안 보이는 PR(CI·의존성·문서)만 생략
- **Claude in Chrome이 켜져 있으면 실제 Chrome 확인을 매번** 한다
- 새 의존성·skill·CI 액션은 설치 전에 알린다(이번 단계: `sharp`, `subset-font`, `@fontsource/jetbrains-mono`, `lychee-action`(커밋 SHA 고정))
- 기획·디자인 폴더(`cowork/prd`, `cowork/design`)는 읽기만 하고 개발은 커밋하지 않는다. 질문은 REQUESTS.md(Q1~Q15)

## 7. Phase 2로 넘기는 것

- **PR-18**(데이터 분리·검증) → PR-19(About 강화) → PR-20~PR-23 (PRD-004 approved)
- PR-19에서 **About CLS ≤ 0.1을 해결하고 `lighthouserc.json`의 About 예외(`assertMatrix[2]`)를 삭제**
- 보류: 번들·렌더링 차단 CSS 최적화(JS 150~174KB gzip), 메이저 의존성(typescript 7, eslint 10, lucide-react 1.x, @types/node 26, sharp 0.35)
- 작성자 작업: 카카오·LinkedIn OG 미리보기 확인(LinkedIn Post Inspector는 로그인), Search Console·네이버 sitemap 재제출, 사이트 1차 완성 후 branch protection

## 8. 원본 위치

| 무엇 | 어디 |
| --- | --- |
| 일하는 방식·함정 | `../CONTEXT.md` |
| PR별 동작·측정·세션 기록 | `../STATUS.md` |
| 질문·답 (Q1~Q15) | `../REQUESTS.md` |
| 성능 게이트 근거(시뮬 vs 관측) | `../briefs/Q11-performance-gate.md` |
| 기획서 | `cowork/prd/003_blog_reading-experience.md` |
| 디자인 답변·감사 | `cowork/design/12~21번` |
