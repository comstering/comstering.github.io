# 34. 개발 인수 문서: Phase 2 디자인 확정 사항 (PR-18 ~ PR-22)

작성: 디자인 세션 · 2026-11-07
용도: 디자인 시안이 확정돼 **개발 세션으로 넘긴다.** 작성자가 이 문서를 개발 세션에 중계한다. 개발은 PR마다 아래 "입력"의 문서와 시안을 기준으로 구현하고, 시안과 다르게 구현해야 하면 `REQUESTS.md`로 묻는다(디자인은 `/DESIGN.md`와 `src/`를 직접 고치지 않는다).
기준: PRD-004(2026-11-05), 기획 26·29·33번, 디자인 25·28·31·32번

## 0. 확정된 것 한눈에

| 항목 | 확정 내용 | 근거 |
|---|---|---|
| 홈 히어로 | `$ history`(+ 커서) / `실행해 본 것만 씁니다`. h1은 `sr-only` `Comstering's Dev Notes` | 28번 8장 |
| 홈 사이드바 | `popular`(데이터 없으면 숨김) · `series` · `tags`(상위 10, 글 수). 1024 이상 오른쪽 열, 미만은 글 목록 아래 | 25번 6장, 26번 Q2·Q4 |
| About 첫 화면 | 사진 · 이름 · `직함 · 경력 N년+` · 버튼. **현재 회사 없음.** 클래스101 직함 `Software Engineer` | 30·31번 |
| About 경력 | 전부 펼침, 회사 바로가기 3개(도착 강조 없음), 밀도 V3, 기술 태그 없음 | 25번 2장 |
| 헤더 검색 | 글만 검색, 결과 제목·날짜·카테고리, `# 소제목` 보조 줄, 이름 `검색 (search)` | 25번 4장, 26번 Q3·Q5 |
| 인쇄 `resume.pdf` | About을 `@media print` A4로. 작성자가 실제 Chrome 인쇄 미리보기 확인함(11-07) | 25번 3장, 32번 |
| 홈 OG | **B안** 확정: 제목 `Comstering's Dev Notes`, 하단 `$ history`(accent) + `실행해 본 것만 씁니다` | 31번 3장, `site/og.html` |
| `DESIGN.md` | 원칙 4 문장 확정(기획 33번), 시그니처 3번 예시 `// popular ────` | 32번, 33번 |

## 1. PR별 입력

### PR-18 데이터 분리·검증 (화면 그대로)
- PRD-004 문구 변경 **3건**: 기술 스택 7그룹(4.4), 클래스101 직함 `Software Engineer`(이전 `Web Developer (backend 중심)`), 현재 회사 표시 제거. JSON-LD `Person`에 `worksFor`를 넣지 않는다(5.6).
- `site.yaml`: `title`(`Comstering's Dev Notes`), `command`(`history`), `tagline`(`실행해 본 것만 씁니다`). 히어로 확정값이 정해졌으므로 임시값이 아니라 이 값을 쓴다.

### PR-19 About 다시 그리기 + CLS 예외 해제
- 시안: `site/about.html`(생성물, 원본 `tools/build-phase2-mockups.py`). 규칙: 25번 2장, 31번 2장, 32번 "About".
- **첫 화면 기준 수치**(Playwright Chromium, 로컬): 360×640에서 직함 줄 하단 230px, 버튼 하단 **346px**, 한 줄 소개 하단 **437px**. 1280×720에서 버튼 301px, 한 줄 소개 414px. `/about`의 `/posts/` 링크 0.
- 폴백 글꼴 `@font-face`(`size-adjust: 86.4%`): 32번 "글꼴 폴백". **About CLS는 CI 3회 중앙값으로 확인하고 `lighthouserc.json`의 About 예외를 해제**(25번 Q7: 결과를 REQUESTS로 알려 달라).
- 앵커 위치는 `html { scroll-padding-top }` 하나(`scroll-margin-top` 추가 금지).
- **`/DESIGN.md` 반영:** 32번 1·2·3장을 옮긴다(1.2는 기획 33번 확정문, 1.3b 시그니처 3번 포함). 반영하면 32번에 `✅ 반영됨 (날짜)`를 표시해 달라.

### PR-20 헤더 검색 팔레트
- 시안: 모든 `site/*.html`의 헤더·`.palette`, 인덱스 `system/search-index.js`(14편에서 생성). 규칙: 25번 4장, 32번 "헤더 검색 팔레트".
- 검색 대상 h2·h3 소제목 포함, 처음 열 때 불러오기(dynamic import + `/search-index.json`), 결과 수 `role="status"`, `aria-keyshortcuts`.
- **O-8 같이 처리:** 모달(이미지 확대 `<dialog>`·검색 팔레트)이 열린 동안 배경 스크롤 잠금. 상세·확인 방법은 31번 5장. `REQUESTS.md`에 번호로 링크해 달라(디자인은 개발 파일을 고치지 않는다).
- 시안 인덱스 예: `karpenter` → 3편, `ENI` → 3편(소제목 일치 포함). 구현 결과가 같아야 한다.

### PR-21 홈 히어로·사이드바·**홈 OG**
- 시안: `site/index.html`(생성물). 규칙: 28번 8장, 32번 "홈".
- **첫 글 제목 하단 458px(1280×720) / 437px(360×640)**, 문구 한 줄, 가로 넘침 0. 커서 깜빡임은 사이트에서 이 한 곳만, `prefers-reduced-motion`이면 정지.
- 인기글 데이터가 없는 상태(블록 숨김, 시리즈가 맨 위로)를 확인한다.
- **홈 OG (B안):** `renderOg({ title: site.title, site: "comstering.github.io", meta: ["$ history", "실행해 본 것만 씁니다"] })`로 생성하면 문구가 `site.yaml` 한 곳에서 나온다(정적 `src/app/og.png`를 대체). 정적 이미지를 유지하더라도 내용은 B로 다시 만든다. 시안: `site/og.html`의 `home · B 확정`.
  - **개발이 확인하기로 한 것(작성자):** 하단 mono 줄의 한글(`실행해 본 것만 씁니다`)이 satori 빌드에서 깨지지(□) 않는지. `renderOg`는 JetBrains Mono 400(라틴)과 Pretendard 700만 싣는다. About 카드의 `최한수`가 같은 자리에 한글을 이미 쓰지만, 디자인은 브라우저 렌더(`og.html`)까지만 확인했다. 깨지면 Pretendard 폴백을 mono 줄에 명시하는 쪽이 디자인 의견이다(글자 모양이 달라져도 허용).

### PR-22 `resume.pdf`
- 규칙: 25번 3장, 32번 "인쇄". 라이트 토큰 덮어쓰기가 구현의 `.dark` 클래스·`next-themes`와 충돌하지 않는지(25번 Q8), 한글 글꼴이 CI(리눅스)에 있는지, 텍스트 검색(G2-6).
- 기준: A4 **5쪽**, ≤ 1MB(시안 렌더 629KB). 개발의 시험 산출물(6쪽)은 직함·연차·회사 바로가기 처리 전이라 쪽수가 달랐다. PR-19 이후 다시 비교해 달라.

## 2. 디자인이 확인하지 못한 것 (개발 PR에서 확인)

- 홈 OG 한글 글리프(위, 개발 확인).
- 실제 리눅스 CI의 About CLS(대역 측정 0.107~0.139 → 0.001~0.003).
- PDF 텍스트 추출·한글 글꼴 포함(G2-6).
- Safari·Firefox, 실기기, 스크린리더 낭독(검색 `role="status"` 포함), 정확한 360px의 실제 Chrome(창 최소폭 406px이라 Playwright로 잼).

## 3. 디자인 쪽 후속

- 구현 PR이 올라오면 시안과 대조해 검토한다(기준: 25번 7장, 32번). 검토 요청은 REQUESTS에 올려 달라.
- 시안 파일(`site/*`, `system/`, `tools/`, 22~34번 문서)은 **PR `docs/phase2-design-prd`로 `main`에 올라간다.** 머지 전에는 작성자의 작업 폴더에서, 머지 뒤에는 `main`에서 같은 방법으로 열어 본다(`python3 -m http.server 4174`, 저장소 루트).
