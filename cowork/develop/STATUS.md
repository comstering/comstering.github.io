# 개발 진행 현황

_최종 갱신: 2026-10-31 · 기준 커밋 `d69ecab`(main, #45 머지) · 기준 기획서 PRD-003(approved)·PRD-004(review) · 디자인 v1.4_

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | **완료.** PR-0~PR-8, 배포 재개, 배포 후 점검까지 |
| Phase 1 읽기 경험 (PRD-003) | **진행 중.** PR-9~PR-14 완료, 성능 게이트(관측 측정) 반영 완료. **남은 것: PR-15(OG), 글꼴 서브셋, PR-16, PR-17** |
| Phase 2 포트폴리오 (PRD-004) | 기획 review 단계. 개발은 Phase 1 게이트(PR-17) 통과 후 시작 |
| 지금 막힌 것 | 없음. PR-15는 새 의존성(satori, @resvg/resvg-js)과 글꼴 서브셋 도구 선택(fonttools 또는 Node 패키지)이 정해지면 바로 시작 가능 |

## 다음 작업 (새 세션은 여기서 시작)

1. `gh pr list`로 #41(Q9 접근성 수정) 머지 여부 확인. 머지됐으면 `git checkout main && git pull`(tracked 변경이 있으면 `git stash` 후 pull, `stash pop` 충돌은 두 쪽을 모두 남긴다. `git stash -u` 금지)
2. **글꼴 서브셋 PR (Q9 ①, 디자인 19번 1.3)** — 디자인이 요청했고 설치할 도구를 정해야 해서 사용자 확인이 필요하다
   - 빌드 때 `posts/`·`content/`·`src/`의 글자를 모아 Pretendard Variable(`node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2`, 2.06MB)을 `wght 400–700` 단일 woff2(약 102KB)로 서브셋, 자체 호스팅, `font-display: swap`, **preload 없음**
   - 도구 후보: `fonttools`(`pyftsubset`, 디자인이 시험함) vs Node 패키지(`subset-font` 등, PR-15 OG 글꼴 서브셋과 로직 공유 가능). 새 의존성이라 설치 전에 사용자에게 알린다
   - 효과: 글꼴 요청 12~17개 → 2개, 272~370KB → 141KB. **FCP·LCP는 그대로**(디자인 측정). CLS는 미검증이라 적용 PR에서 CI Lighthouse About CLS 3회 중앙값을 확인해 STATUS에 적는다(0.05 이하면 CLS를 error로)
   - 한계: 사용자가 검색창에 입력하는 글자처럼 서브셋에 없는 글자는 시스템 글꼴로 보인다
3. **PR-15 OG 이미지 자동 생성** (PRD-003 PR-15 절, 디자인 12번 E4~E6, 시안 `site/og.html`·`og-render.html`)
   - **첫 단계는 PoC**: Next.js `opengraph-image.tsx` + `generateStaticParams`가 정적 export에서 동작하는지 확인. 안 되면 satori + resvg 빌드 스크립트로 `public/_og/<slug>.png`
   - 1200×630 다크 고정, 로고 `~/comstering_`, 제목 최대 3줄, 하단 `categories · 날짜 · 시리즈`(accent 선 없음), PNG. 글꼴은 Pretendard 700 + JetBrains Mono 400의 otf/ttf만(satori는 woff2 불가), 한글은 제목 글자만 서브셋(글꼴 서브셋 PR과 글자 수집 로직 공유)
   - 끝나면 `thumbnail` 필드를 스키마에서 삭제하고 15편 frontmatter에서 지운다. 새 의존성(satori, @resvg/resvg-js)은 설치 전에 사용자에게 알린다
   - **PoC 결과(2026-11-01, 임시 브랜치에서 시험 후 폐기):** `next/og`의 `ImageResponse`가 **정적 export에서 동작한다. 새 의존성이 필요 없다**(satori·resvg가 Next에 내장). 파일 규칙 `posts/[id]/opengraph-image.tsx`는 되지만 출력 파일 이름에 **확장자가 없어**(`out/posts/<id>/opengraph-image`) GitHub Pages가 이미지로 인식하지 못할 위험이 있다. **`posts/[id]/og.png/route.tsx`(`export const dynamic = "force-static"` + `generateStaticParams`)는 `out/posts/<id>/og.png`로 `.png` 확장자 파일이 나온다**(14편, 1200×630, 약 29KB, 한글 정상). 이 경로를 쓰고 `generateMetadata`의 `og:image`를 `https://comstering.github.io/posts/<id>/og.png`로 바꾼다. 글꼴은 `node_modules/pretendard/dist/public/static/Pretendard-Bold.otf`(700)를 읽어 `fonts`에 넣는다(woff2 불가). JetBrains Mono(로고)는 ttf/otf/woff가 필요한데 저장소에 없다(`next/font`가 받는 건 woff2). 아직 못 본 것: 빌드 시간 증가, 긴 제목 3줄 잘림, 시안(`og.html`)과 픽셀 대조, 카카오·LinkedIn 실제 미리보기
4. 이후 PR-16(진행률·링크 체커) → PR-17(게이트 측정·문서)
5. **PR-17(게이트 측정·문서)에서 할 성능 게이트 작업**(기획 Q12·Q13 결정, PRD-003 "성능 측정 기준"):
   - `lighthouserc.json` `assertMatrix[0]`(차단선)의 성능·LCP·CLS·TBT를 `warn` → `error`로 올린다(접근성·SEO는 이미 `error`)
   - **About 예외(사용자·기획 결정, 2026-10-31):** About은 이번 Phase에서 개선하지 않는다(Phase 2 PR-19에서 재작성). About 페이지만 성능·TBT를 `warn`으로 둔다: 차단선 항목을 `matchingUrlPattern`으로 About 제외, About 전용 항목을 `warn`으로 추가. 숫자(성능 ≥ 90, TBT ≤ 300ms)는 낮추지 않는다. PR-19 수용 기준에 "About 차단선 통과, 통과 시 예외 해제"가 있다(PRD-004)
   - 현재 리눅스 CI 값(2026-10-30, 관측): 홈 성능 98·LCP 1.9s, 글 97·2.0s는 차단선 통과. About 성능 88~90·TBT 344~376ms는 예외 대상
   - 홈 CLS는 0.035~0.058(차단 0.1 이하, 목표 0.05는 경계). 글꼴 서브셋 PR 뒤 재측정
6. 열린 질문: Q9(남은 건 글꼴 서브셋). Q10~Q13은 모두 결정됨

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
| (작업) | 글꼴 서브셋(디자인 19번 ①, Q9 남은 건) | ⏳ 도구 선택 대기 | |
| PR-15 | OG 이미지 자동 생성, `thumbnail` 필드 삭제 | ⏳ 첫 단계는 정적 export PoC. 새 의존성 알림 필요 | |
| PR-16 | 읽기 진행률·링크 체커 | ⏳ 대기 | |
| PR-17 | 게이트 측정·문서 + 성능 차단선 `error` + About 예외 | ⏳ 대기(위 "다음 작업" 5번) | |

개발 순서(PRD-003): …→ PR-14 → PR-15 → PR-16 → PR-17. 한 번에 PR 하나, 사용자가 머지하면 다음으로 간다.

## 사용자에게 보이는 현재 상태 (라이브 사이트, #45 머지 기준)

- 디자인 시스템 v1.3~1.4(Terminal Graphite) 적용, 자동 배포 가동
- 홈: 연도별 세로 리스트(썸네일 없음), 카테고리 칩(숫자 대비 6.5:1), 검색, `?category=` 필터(뒤로가기 복원), 시리즈 메타 `series eks 3/5`
- 글 상세: 한 줄 도구 바(목차·시리즈), 오른쪽 sticky 목차, 시리즈 박스, 코드 블록(파일명·줄 하이라이트·복사), 콜아웃, 표 흐림, 이미지 확대, 관련 글(최대 3편), 이전/다음, 저자 박스, Giscus
- 접근성 100·SEO 100 (CI `error`), 본문 이미지 WebP(≤ 200KB), favicon 4.7KB
- 아직 없음: 읽기 진행률(PR-16), OG 이미지 자동 생성(PR-15), 링크 체커(PR-16), 글꼴 서브셋

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
| 2026-11-01 | PR-A(#50) 머지 확인. Next 16 PR-B 오픈(브랜치 `chore/next-16`): next·eslint-config-next 16.4.3(Turbopack 빌드). 수정 3건: ① `src/app/favicon.ico` 안의 PNG가 팔레트(RGBA 아님)라 Turbopack이 디코딩 실패 → RGBA로 재인코딩(5.3KB) ② `next lint` 제거 → `eslint .` + `eslint.config.mjs`를 `eslint-config-next/core-web-vitals`·`typescript` flat config로 교체(ignores: out, .next, public/_img, cowork 등) ③ 새 react-hooks 규칙(`set-state-in-effect`) 때문에 `ThemeToggle`의 mounted를 `useSyncExternalStore`로 변경. `tsconfig.json`은 Next가 자동 수정(`jsx: react-jsx`). lint·tokens·build·check:output·E2E 89건 통과 | CI(Lighthouse 포함) 확인, 머지 후 PR-15(OG) |
| 2026-11-01 | 의존성 갱신 PR-A 오픈(브랜치 `chore/deps-update-a`): react 19.3.1, next 15.5.28, tailwind 4.3.3, typography, react-icons 5.7 등. react-icons 5.7에서 브랜드 아이콘 `SiAmazon`·`SiLinkedin`이 제거돼 `FaAws`·`FaLinkedin`(react-icons/fa)으로 교체. lint·tokens·build·check:output·E2E 89건 통과 | 머지 후 Next 16 PR-B. 메이저(typescript 7, eslint 10, lucide 1.x, @types/node 26, sharp 0.35)는 보류 |
| 2026-11-01 | 도구 선택: OG는 `next/og`(A1), 글꼴 서브셋은 Node `subset-font`(B1) 확정(사용자 승인). `subset-font@2.9.0`이 `wght 400–700` 축 제한을 지원함을 저장소 밖에서 확인(설치 전 시험). Next 15.2.4→16.4.3 업그레이드와 의존성 갱신은 사용자 검토 후 진행 | 사용자 검토 대기: 의존성 갱신 범위 |
| 2026-10-29 | 기획 답변(Q4·Q6) 확인: G1-4 기준 변경을 E2E에 반영(PR #39). #38·#39 CI 실패(리눅스에서 sharp libvips 못 찾음) → sharp 0.33.5 고정으로 수정. PR-14 오픈(#38, #37 위): sharp 이미지 파이프라인, 확대 `<dialog>`, favicon 1.7MB→4.7KB, Lighthouse SEO·CLS error. 디자인 17번(Q8) 반영: PR-12의 `font:` 단축 속성 6개가 CSS 압축에서 무효가 되던 것을 longhand로 수정, `check:output`에 검사 추가, PR #37. PR-14는 그다음 | #37 머지 확인 → PR-14 시작 |
| 2026-10-28 | PR-13 오픈(#35): 관련 글(점수·시리즈/이전·다음 제외), compact 목록 시안 맞춤(404도 같이 바뀜), E2E 7건. #33·#32 머지 확인, main pull(`691c01b`). 로컬 미추적 `cowork` 58개가 머지본과 동일함을 확인하고 scratchpad 백업으로 옮긴 뒤 pull(삭제는 하지 않음) | PR-13 시작: `git checkout -b feat/related-posts` |
| 2026-10-28 | PR-10(#27), PR-11(#28), Lighthouse 댓글(#29) 머지. PR-9(#30) 오픈, CI 통과. CLAUDE.md 지침 PR(#31) 오픈, 기록 규칙을 CONTEXT 4.5장·메모리에 명시. `cowork/develop` 문서·도구 신설(CONTEXT, STATUS, REQUESTS, tools/) | #30 머지 확인 → PR-12 시작. `gh pr view 30 --json state` |
