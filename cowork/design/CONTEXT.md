# 디자인 세션 CONTEXT

**새 세션은 이 문서를 가장 먼저 읽고, 다음에 [STATUS.md](./STATUS.md)를 읽는다.** 그러면 바로 다음 작업을 이어갈 수 있다. 이 문서는 잘 바뀌지 않는 배경과 규칙이고, 지금 상태와 할 일은 STATUS.md에 있다.

## 1. 이 세션의 역할

- 디자인 담당(Claude). 기획서(PRD)를 읽는 사람이 가장 편하게 볼 수 있는 화면으로 옮긴다.
- 하는 일: 시안(`site/*.html`)·디자인 시스템 명세 작성, 기획·개발의 질문에 디자인 답변, 구현된 화면을 시안과 대조해 검토.
- 하지 않는 일: `/DESIGN.md`와 `src/` 수정(구현 세션 작업). 합의 전 제안은 구현 기준이 아니다.
- 사용자(작성자, comstering)가 기획·디자인·개발 세션 사이를 직접 중계한다. 세션끼리는 **문서로** 소통한다.

## 2. 프로젝트 한 줄 요약

개인 개발 블로그 + 포트폴리오(comstering.github.io). Next.js 16 정적 export, GitHub Pages 배포. 어두운 "Terminal Graphite" 디자인, 글 목록은 카드 그리드가 아니라 **세로 리스트**, 포인트 색은 accent 하나. 주 독자는 모바일 검색 유입(J2).

## 3. 문서 지도

| 위치 | 역할 | 쓰는 세션 |
|---|---|---|
| `/DESIGN.md` | 확정된 디자인 시스템. 코드가 따르는 단일 기준 | 구현(합의된 것만) |
| `cowork/prd/` | 기획서. `README.md`에 목록·규칙. 마스터 001, Phase 0 002, Phase 1 003(approved) | 기획 |
| `cowork/design/` | 시안·디자인 명세·디자인 답변 (이 폴더) | **디자인(이 세션)** |
| `cowork/develop/` | 개발 진행(`STATUS.md`)과 개발→기획·디자인 질문(`REQUESTS.md`, Q1~). 저장소에 커밋됨(#33부터) | 개발 |
| `/CONTEXT.md` | 사이트 전체의 현재 상태와 알려진 이슈 | 구현 |

흐름: PRD 요구사항 → `cowork/design` 제안·시안 → 리뷰·합의 → `/DESIGN.md` 반영 → 구현.

### cowork/design 안

| 경로 | 내용 |
|---|---|
| `README.md` | 파일 목록과 보는 방법. 문서를 추가하면 여기 표도 갱신 |
| `NN-*.md` | 시간순 대화·결정 기록. **번호 재사용 금지**(삭제된 번호 포함, 최신 35). 질문·답이 오갈 때마다 새 번호. 현역은 04·18번, 12·19·21번은 `archive/`, 나머지는 삭제(위치는 `archive/README.md`) |
| `design-system.html` | 디자인 시스템 문서(브라우저로 연다) |
| `site/*.html` | 최종 시안: index, post, projects, project, about, tags, tag, 404, og. 그 밖에 `phase1-compare.html`(기록용), `og-render.html`, `og/*.png` |
| `system/` | 시안 공용 `tokens.css`·`base.css`·`components.css`·`app.js`·`giscus-*.css` |
| `tools/check-site.mjs` | 시안 검사 스크립트(아래 6장) |
| `tools/build-phase2-mockups.py` | `about.html`·`index.html`·`system/search-index.js` 생성기(데이터 원본 `src/app/about/page.tsx`·`posts/`). 생성물 |
| `tools/render-favicons.mjs`·`tools/build-favicon-final.mjs` | 파비콘 후보 렌더, 확정안의 ICO·apple-icon 생성(35번) |
| `tools/measure-about-first.mjs` | About 첫 화면 요소 위치·인쇄 쪽수 측정(31번) |
| `tools/measure-fallback-cls.mjs` | About·홈 CLS 폴백 글꼴 보정 측정 |
| `archive/phase0-summary.md` | Phase 0 디자인 요약 보관본(01~11번) |
| `archive/phase1-summary.md` | Phase 1 디자인 요약 보관본(결정·검토 결과·함정·못 한 것). 원문은 `archive/README.md`의 번호표로 찾는다 |

## 4. 확정된 디자인 결정 (되돌릴 때는 근거 문서 번호를 확인)

| 결정 | 내용 | 근거 |
|---|---|---|
| categories | 배열, 최대 2개, **대표 없음**. 고정 순서 `infra · backend · frontend · oss · note`로 정렬해 `infra, oss`처럼 쉼표로 묶음. 글 상세 헤더는 값마다 필터 링크(accent), 쉼표는 mute·링크 밖 | 12번, PRD-003 4장 |
| 칩 숫자 | 칩마다 "누르면 나오는 글 수". 합이 전체와 달라도 됨. 글이 0편인 카테고리(`backend`)는 숨김 | 12번 |
| `updated` | 필드 삭제. 작성자가 적은 `date`만 사용 | PRD-003 4.1 |
| **목록 썸네일** | **홈·태그 목록에서 제거(C안 확정).** 이유: 썸네일 목적(어떤 기술인지 한눈에)은 유효하나 지금 이미지는 원본 비율·배경·로고 색이 제각각이라 어두운 목록에 맞지 않고, CSS로 통일되지 않으며, 약 11장을 새로 만들 비용을 작성자가 들이지 않기로 함. **되돌리려면** Git에서 `thumbnail` 필드·썸네일 열을 복구하고 목록용 이미지 규격을 새로 정의해야 한다 | 12·14·15번 |
| OG 이미지 | 1200×630 PNG, 다크 고정, 하단 `categories · 날짜 · 시리즈`, **accent 선 없음**, Pretendard 700 + JetBrains Mono 400 | 12번 E4~E6 |
| URL 필터 | `router.push(url, { scroll: false })`로 방문 기록을 남김 | 12번 E1 |
| 코드 복사 | `bash`·`sh`·`shell`·`console` 블록은 `$ `를 빼고 복사 | 12번 E2 |
| 이미지 확대 | 원본 폭 > 표시 폭(720px)인 이미지에만 `<dialog>` 확대 | 12번 E3 |
| 목차 숨김 | h2 3개 미만이면 숨기되 본문 위치는 그대로 | 12번 E7 |
| 시리즈 label | 8자 이하 | 12번 E8 |
| 직함·역할 | `DevOps · 클라우드 네이티브 엔지니어 · 경력 4년+`. 회사 성과와 개인 실습 글은 섞지 않고 개인 글은 `personal` 표기 | 10번 D4·D5 |
| `?category=` 직접 진입 시 전체 목록이 잠깐 보임 | 허용 | 16번(삭제, `archive/phase1-summary.md` 3장) |
| 글꼴 로딩 | Pretendard **단일 서브셋**(사이트가 쓰는 글자만, `wght 400–700`, 약 102KB) 자체 호스팅 + `font-display: swap`, **preload 없음**. `optional`은 쓰지 않는다(첫 방문이 시스템 글꼴로 보임). 구현은 개발 대기 | 19번 |
| 파비콘 | **C `c_` 확정(작성자, 11-07).** 어두운 둥근 사각형(`canvas`) + 흰 `c`(`fg`) + 초록 커서 `_`(`accent`). 파일은 `favicon/final/`(`icon.svg`·`favicon.ico` 16·32·48·`apple-icon.png` 180 꽉 찬 정사각형). 소스 SVG를 고치면 `tools/build-favicon-final.mjs`로 다시 생성. 현재 파비콘(흰 바탕 필기체)은 16px에서 읽히지 않아 교체 | 35번 |
| 홈 OG(Phase 2) | **B안 확정(작성자, 11-07):** 제목 `Comstering's Dev Notes`, 하단 mono 줄 `$ history`(accent) + `실행해 본 것만 씁니다`. 기존 `renderOg` 템플릿 그대로. 한글 글리프는 개발이 satori 빌드에서 확인 | 31번 3장, 34번 |
| `DESIGN.md` 원칙 4(Phase 2) | **홈은 블로그, About은 경력.** 서로 링크하지 않는다(헤더 `about`·저자 박스 일반 `about` 링크만 예외), 성과 수치 합산 금지, 외부 근거(PR·`verify ↗`·사이드 프로젝트 저장소)는 링크. `personal`/`work` 표기 없음. 시그니처 3번 예시는 `// popular ────` | 33번(기획 확정) |
| About 첫 화면(Phase 2) | 사진 · 이름(한·영) · `직함 · 경력 N년+` · 버튼. **현재 회사는 두지 않는다**(회사는 experience에서만). 클래스101 직함은 `Software Engineer`. 버튼 하단 346px(360×640) | 30·31번 |
| About 경력(Phase 2) | **전부 펼침**(접이식·`expand all` 없음). experience 위에 회사 바로가기 3개(`CJ 올리브영 · 클래스101 · 오픈소스`, 44px), 앵커 강조 없음. 길이는 기간 열 제거 + 간격·불릿 밀도로 줄임(데스크톱 −19%, 360px −9%, 본문 14px는 토큰 밖이라 안 씀). **About에는 기술 태그를 두지 않는다.** what i do·관련 글·`personal`/`work`·About↔블로그 링크 없음. 기술 스택은 7그룹 | 25번, 22번 2.5 |
| About 인쇄 = `resume.pdf` | `/resume` 페이지 없음. About을 `@media print`로 A4(5쪽): 라이트 고정(다크 토큰 덮어쓰기), 사진·헤더·푸터·버튼·바로가기 숨김, 인쇄 전용 연락처 한 줄, 외부 링크 `(URL)` 표시, 프로젝트 블록은 쪽 경계에서 갈리지 않게 | 25번 3장 |
| About CLS | 폴백 글꼴 폭 보정 `@font-face { src: local(Noto Sans CJK KR…); size-adjust: 86.4% }`를 Pretendard 바로 뒤에. 풀폭 CJK 폴백(한글 1.0em)이 Pretendard(0.864em)보다 넓어 줄 수가 바뀌는 것이 원인 | 22번 3장, 25번 7장 |
| 검색 | 헤더 `search ⌘K` + 팔레트를 이번 Phase에 사용. **글만** 검색(제목·설명·태그·카테고리·소제목), 결과 = 제목 · 날짜 · 카테고리, 빈 입력 = 최근 글 5편, 접근 가능한 이름 `검색 (search)`(보이는 글자 포함), 홈 글 검색창 없음 | 25번 4장 |
| 홈 사이드바 | 인기글(순위 번호 5, 데이터 없으면 숨김) · 시리즈(편수) · 태그(상위 10). 1024 이상 오른쪽 열, 미만은 글 목록 아래. 카테고리·최근글·About 링크 없음 | 25번 6장 |
| 홈 히어로 | **확정(11-05, 작성자): 2b, `$ history` + "실행해 본 것만 씁니다"(h2).** 터미널 명령 줄(`aria-hidden`, 커서 깜빡임은 이 한 곳만, reduced motion이면 정지) + 아래 `mute` 문구 `p`. h1은 `sr-only` `Comstering's Dev Notes`. 실명·직함·기술 태그·성과·`about me`/`resume` 버튼 없음. 첫 글 제목 437/458px(첫 화면 안). PRD-004 5.2 확정값 기재는 기획 몫 | 25·28번 |
| 접근성 규칙 | 글자색은 `opacity`로 낮추지 않고 토큰을 쓴다(4.5:1). 버튼 이름은 보이는 글자를 포함한다. 제목 단계는 건너뛰지 않는다 | 19번 2장 |

## 5. 코드 규칙 (시안과 구현 공통)

- 색은 토큰만 쓴다. hex, `dark:` 색상 클래스, Tailwind 기본 팔레트(`gray-*`, `sky-*` 등)는 금지. 구현 쪽 `yarn check:tokens`가 `src/`에서 검사한다.
- 시안은 `system/`의 토큰·컴포넌트만 쓴다. 시안 표시는 `.ph` 클래스(구현에서는 검사에 걸리므로 시안 단계에만 쓴다).
- 모든 시안은 360px에서 가로 넘침 0. 터치 대상은 가능하면 44px.
- `<img>`에는 `alt`를 둔다(장식은 `alt=""`). h1은 화면당 1개.
- PRD 기능 ID(F-PO-03 등)와 문제 ID(P1 등)를 그대로 인용한다. 디자인 문서 번호는 `12번 E1`처럼 쓴다.
- 접근성: 글자색을 `opacity`로 낮추지 않는다(`mute`는 6.53:1, `opacity 0.7`이면 3.73:1로 AA 미달). 버튼의 접근 가능한 이름(`aria-label`)은 보이는 글자를 포함해야 한다. 제목 단계(`h2`→`h3`)를 건너뛰지 않는다.

## 6. 검증하는 법

Playwright는 저장소 `node_modules`에 있다. 임시 스크립트는 scratchpad에 두지 말고 아래처럼 한다.

```bash
node cowork/design/tools/check-site.mjs <스크린샷 저장 폴더>
```

8개 화면 × PC(1280)·모바일(360)에서 가로 넘침, h1 수, alt 누락, 깨진 이미지, 썸네일 수, `.ph` 수, `updated` 표시, 24px 미만 터치 대상을 출력하고 스크린샷을 저장한다. 구현된 사이트를 볼 때는 `yarn build` 후 `out/`을 `python3 -m http.server`로 띄운다.

- **실제 Chrome(Claude in Chrome) 확인은 규칙**(메모리 `feedback-verify-in-chrome`). 도구가 세션에 없으면 못 했다고 적는다. 지금까지는 Playwright Chromium으로만 확인했고, Safari·Firefox는 미확인.
- 스크린샷은 PR마다 PC·Mobile을 `pr-screenshots` 브랜치로 올려 본문에 넣는 것이 규칙(메모리 `feedback-pr-screenshots`, 개발 쪽 `cowork/develop/tools/publish-shots.sh`).

## 7. 작업 규칙

(이 규칙의 원본은 저장소 `/CLAUDE.md`의 "세션별 기록 (cowork)" 절이다. 세션 시작 때 자동으로 읽힌다.)

1. **작업이 끝날 때마다 STATUS.md를 갱신한다**(할 일 체크, 변경 이력 한 줄, 최종 갱신 날짜). 세션이 갑자기 끝나도 다음 세션이 이어갈 수 있어야 한다.
2. 새 질문·답변은 `NN-주제.md`로 추가하고 `README.md` 파일 목록에 한 줄 넣는다. 이 폴더의 답은 개발 쪽 `REQUESTS.md`에 **번호만 링크**한다(개발의 규칙).
3. 결정이 바뀌면 이 문서 4장도 고친다.
4. 확인하지 못한 것은 "못 했다"고 적는다. 측정값에는 환경(로컬 서버, 브라우저)을 같이 적는다.
5. 기획 결정이 필요한 것은 사용자에게 알리고, 문서에는 "기획 결정 대기"로 표시한다.
6. 저장소에 쓰지 않고 한 시안·측정은 재현할 수 있게 방법을 문서에 적는다.
7. `cowork/`(prd·design·develop)는 저장소에 커밋한다(PR #32로 prd·design, #33으로 develop). 저장소가 public이므로 비밀·연락처·내부 수치는 쓰지 않는다. 커밋·푸시는 사용자가 요청할 때만 한다. 개발 세션이 같은 작업 폴더를 쓰는 중이면 브랜치를 바꾸지 말고 `origin/main` 기준 별도 `git worktree`에서 PR을 만든다.
