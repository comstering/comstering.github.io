# 32. `DESIGN.md` Phase 2 반영안 (D-13)

작성: 디자인 세션 · 2026-11-05
요청: 기획 [29번](./29-planning-response-hero-final.md) 2장 D-13
기준 시안: `site/index.html`·`site/about.html`·`system/components.css`(Phase 2 구간) · 근거 문서 22·25·28·30번
쓰는 개발 PR: PR-19 About, PR-20 검색, PR-21 홈, PR-22 PDF

**상태(2026-11-07): 기획이 X-1을 확정했고([33번](./33-planning-response-designmd.md)) 1.2 문장과 1.6(시그니처 3번)이 바뀌었다. 개발이 PR-19에서 반영하면 된다.**

**이 문서는 제안이다.** `/DESIGN.md`는 구현 세션이 합의된 것만 반영한다(CONTEXT 1장). 아래 "붙여 넣을 문구"는 `DESIGN.md`의 말투(짧은 평서문, 표)로 썼고, 값은 모두 시안 CSS에서 읽었다. 시안 클래스 이름은 설명용이며 구현은 Tailwind 토큰 유틸리티로 옮긴다.

## 0. 먼저 결정할 것 (기획 확인)

| # | 내용 | 디자인 의견 |
|---|---|---|
| X-1 | **✅ 확정 (기획 33번, 2026-11-07).** **`DESIGN.md` 2장 원칙 4가 Phase 2와 충돌한다.** 지금 문장: "증명의 연결선을 보이게 한다. 성과 수치 옆에는 근거 링크를 둔다. 회사 성과와 개인 실습 글을 섞어 보이지 않는다. 개인 환경 글은 `personal`로 표기한다." PRD-004 7.2는 About↔블로그 링크와 `personal`/`work` 표기를 전부 없앴고, About 경력 성과 불릿에는 근거 링크가 없다 | 1.2의 새 문장으로 바꾼다(기획이 다듬어 확정) |

## 1. 기존 문장 수정

### 1.1 머리말(3행)

`comstering.github.io 디자인 시스템 (v1.3 기준)` → `comstering.github.io 디자인 시스템 (v1.4, Phase 2 반영)`. (`cowork/design/04-design-system.md`는 v1.3 + v1.4 D5까지다. Phase 2 규칙은 `DESIGN.md`가 기준이다.)

### 1.2 2장 원칙 4 (X-1)

**지금:** 4. 증명의 연결선을 보이게 한다. 성과 수치 옆에는 근거 링크를 둔다. **회사 성과와 개인 실습 글을 섞어 보이지 않는다.** 개인 환경 글은 `personal`로 표기한다.

**바꿈 (기획 33번 확정문):** 4. **홈은 블로그, About은 경력이다.** 두 쪽은 서로 링크하지 않는다(헤더 `about`과 글 하단 저자 박스의 일반 `about` 링크만 예외). 경력·성과·기술은 About에서 끝나고, 홈에는 이름·직함·기술 태그·성과를 두지 않는다. 성과 수치를 합쳐 하나의 숫자로 만들지 않는다. 밖에서 확인할 수 있는 근거(오픈소스 PR, 자격증 `verify ↗`, 사이드 프로젝트 저장소)에는 링크를 둔다.

### 1.3 1장 시그니처 1번

`cursor _: 로고에 항상 둔다. 깜빡임은 홈 히어로 한 곳에서만.` 뒤에 `(히어로 명령 줄 `$ history_`. 로고 커서는 정지)`를 덧붙인다.

### 1.3b 1장 시그니처 3번 (기획 33번)

`comment label `// featured ────`: 섹션 제목 형식.` → 예시를 `// popular ────`로. featured(대표 프로젝트)는 Phase 2에서 없어졌고, `popular`는 실제로 쓰는 사이드바 블록 이름이다.

### 1.4 4장 타이포그래피 끝에 한 줄

`- 한글 폴백 글꼴의 폭을 보정한다. Pretendard 바로 뒤에 `Pretendard Fallback`을 둔다(7장 "글꼴 폴백").`

### 1.5 5장 브레이크포인트

그대로(480·640·768·1024·1280). 1024는 홈 사이드바, 768은 검색 버튼 라벨이 쓴다.

## 2. 7장에 추가할 절 (붙여 넣을 문구)

### 홈

- **순서:** 히어로 → 카테고리 칩(글 수) → 연도별 글 목록. 글 목록 위에 검색창을 두지 않는다(검색은 헤더 팔레트 하나).
- **히어로:** 터미널 명령 줄 + 아래 문구 한 줄. 값은 `content/site.yaml`(`title`, `command`, `tagline`). 확정값은 `$ history` / `실행해 본 것만 기록합니다`(11-07 `씁니다`에서 변경, 개발 `site.yaml`과 동일).
  - 명령 줄: JetBrains Mono 700, `clamp(1.5rem, 0.9rem + 2.6vw, 2.5rem)`, 자간 -0.02em, 행간 1.3, `$`는 `mute`. 커서는 `accent`(너비 0.55em, 높이 0.12em, 1.1s `steps(1)` 깜빡임, `prefers-reduced-motion`이면 정지). **사이트에서 깜빡이는 곳은 여기 하나뿐이다.**
  - 문구: `text-lead`(18px), `mute`, 행간 1.6, 최대 34rem, 명령 줄과 간격 16px.
  - 접근성: `<h1>` 안에 `sr-only`로 사이트 이름(`Comstering's Dev Notes`), 보이는 명령 줄은 `aria-hidden`. 문구는 h1 다음 `<p>`라 낭독된다.
  - 위쪽 여백 32px(640px 이상 56px), 칩과 간격 40px.
  - 넣지 않는 것: 실명, 직함, 기술 태그, 성과 수치, `about me`·`resume` 버튼, 대표 프로젝트.
- **첫 화면:** 첫 글 제목 하단 1280×720에서 458px, 360×640에서 437px(둘 다 화면 안).
- **사이드바:** `popular · series · tags` 3블록. 카테고리·최근글·About 링크는 없다.
  - `popular`: 최근 30일 조회수 상위 5편, 순위 번호(mono, `mute`) + 제목, 한 행 44px 이상. **데이터가 없으면 블록을 숨기고** 시리즈가 맨 위로 올라온다.
  - `series`: `N편 · slug · 시리즈 제목`(`content/series.yaml` 전체).
  - `tags`: 글 수 상위 10개, `#tag` + 글 수(11px).
  - 배치: **1024px 이상** 오른쪽 열(`sticky`, 헤더 아래 32px, 블록 사이 48px, 열 위쪽 여백 56px). **1024px 미만**은 **글 목록 아래**에 위쪽 `line` 구분선과 함께 두고 블록 사이 40px. 모바일에서 사이드바는 목록 끝에 있어 거의 보이지 않지만, 모바일 첫 화면을 글로 채우려는 의도된 결정이다(26번 Q2).

### 헤더 검색 팔레트

- **버튼:** 헤더 `search ⌘K`(높이 36px, `line-strong` 테두리, hover `accent`). 768px 미만은 아이콘만(36px, 터치 영역은 `::after`로 46px). 접근 가능한 이름 `검색 (search)`(보이는 글자 `search`를 이름에 포함), `aria-keyshortcuts="Meta+K Control+K"`.
- **여는 법:** `⌘K`/`Ctrl+K`, `/`(입력란 밖에서). 열면 입력란 포커스와 포커스 트랩, 닫으면 열기 전 위치로 복귀(단축키로 열었으면 본문).
- **모양:** 폭 `min(640px, 100% - 32px)`, 위에서 14vh, `surface` + `line-strong` 테두리, 입력란 높이 56px, 결과 영역 최대 `min(56vh, 440px)`. 640px 미만은 **전체 화면**(`100dvh`, 모서리·테두리 없음).
- **내용:** **글만** 검색(draft 제외). 제목·설명·태그·카테고리·소제목(h2·h3). 입력란 문구 `제목, 태그, 소제목으로 글 검색`. 결과 한 줄 = 제목 · 날짜 · 카테고리(모바일은 날짜·카테고리가 제목 아래 줄). 소제목에서만 맞은 글은 제목 아래에 `# 소제목`을 작게 보인다. 빈 입력은 최근 글 5편(`recent`), 결과 없음은 안내 문구.
- **낭독:** 결과 수를 `role="status"`로 알린다. `role="combobox"` + `listbox`, 선택 행 `aria-selected`(배경 `surface-2`, 제목 `accent`), 맞은 글자는 `<mark>`(`accent`, 배경 없음).
- **성능:** 팔레트 코드와 인덱스(`/search-index.json`)는 처음 열 때 불러온다(초기 JS·TBT에 영향 없음).
- 검색은 이것 하나만 둔다.

### About

- **첫 화면:** 사진 · 이름(한·영) · `직함 · 경력 N년+` · 버튼. 직함 줄은 body 500 `fg`. **현재 회사는 첫 화면에 두지 않는다**(회사는 experience에서만, 30번 D-15). 버튼은 `email`(primary) · `resume.pdf`(다운로드) · `github ↗` · `linkedin ↗`. 360×640에서 버튼 하단 346px(스크롤 없이 모두 보임).
- **순서:** 첫 화면 → 소개 → experience → open source · side → skills → certifications → education · activity. `what i do`는 없다.
- **experience:**
  - 위에 회사 바로가기(`CJ 올리브영 · 클래스101 · 오픈소스`): 높이 44px, `line-strong` 외곽선, hover `accent`, 줄이 모자라면 줄바꿈. **도착 강조(배경색)는 없다.**
  - 회사 → 프로젝트 **전부 펼침**(접이식·`expand all` 없음). 기간은 회사 이름 **위** 한 줄(mono 12px `mute`), 왼쪽 기간 열은 없다. 제목 단계: 섹션 `h2`, 회사 `h3`, 프로젝트 `h4`.
  - 회사 `h3`는 `text-h3` 700, 직함은 `text-small` `mute`. 프로젝트: 제목 `text-small` 600(오른쪽에 기간 mono 12px), 설명 `mute` 행간 1.6, 성과 불릿 `fg`(5px 짧은 선 마커, `line-strong`).
  - **밀도(V3):** 행간 1.6, 불릿 간격 4px, 프로젝트 간격 12px, 불릿 들여쓰기 12px. 본문을 14px로 줄이지 않는다(`text-small` 15px 유지). 기술 태그는 두지 않는다.
  - 앵커 위치는 전역 `html { scroll-padding-top }`(헤더 + 24px) 하나로 맞춘다. 항목에 `scroll-margin-top`을 또 주지 않는다(두 번 더해진다).
- **링크:** About 안에 `/posts/` 링크를 두지 않는다. 경력 항목에 근거 링크를 달지 않는다. 오픈소스는 `merged` + `pull request ↗`, 자격증은 `verify ↗`만 링크.
- **skills:** 7그룹(platform / cloud · iac / ci/cd · workflow / data · messaging / auth · security / backend / observability). 그룹 순서와 그룹 안 순서는 PRD-004 4.4 표 그대로.

### 인쇄 (`resume.pdf`)

`/resume` 페이지는 없다. `/about`을 Playwright로 **print 미디어 A4**에 인쇄해 `resume.pdf`를 만든다. 규칙은 한 벌의 `@media print`다.

| 규칙 | 값 |
|---|---|
| 용지 | `@page` A4, 여백 13mm(위) · 14mm(좌우·아래), 본문 9.5pt(프로젝트 9pt) |
| 색 | 라이트 고정. `:root`/`.dark` 토큰을 덮어쓴다(`canvas`·`surface` `#fff`, `fg` `#111`, `mute` `#4a4a4a`, `line` `#cfcfcf`, `accent` `#111`). 다크 테마로 열어도 흰 배경 |
| 숨김 | 헤더, 푸터, skip 링크, 경로(`path`), 사진, 첫 화면 버튼, 회사 바로가기, `now` 배지, 검색 팔레트 |
| 연락처 | 화면에서는 숨기고 인쇄 때만 보이는 한 줄(이메일 · github · linkedin) |
| 링크 | 외부 링크 뒤에 `(URL)`. 화살표 아이콘(mask)은 URL 문구로 바뀐다(점무늬 깨짐 방지) |
| 쪽 경계 | 프로젝트 하나, 오픈소스·자격증 행은 쪽을 넘어 갈라지지 않게(`break-inside: avoid`), 섹션 제목은 다음 내용과 붙게(`break-after: avoid`) |
| 기술 스택 | 칩 모양을 쉼표로 이은 글자로(테두리가 종이에서는 잡음) |
| 글자 크기 | 이름 20pt, 직함 줄 10.5pt, 소개 문구 12pt, 섹션 제목 8.5pt |
| 결과 | A4 5쪽, 629KB(≤ 1MB). 한글 글꼴이 CI(리눅스)에 있어야 한다 |

### 글꼴 폴백

풀폭 CJK 폴백(한글 1.0em)이 Pretendard(0.864em)보다 넓어 About 소개 문단의 줄 수가 글꼴 도착 뒤 바뀌는 것이 CLS 원인이다. 폴백 폭을 보정한다.

```css
@font-face {
  font-family: "Pretendard Fallback";
  src: local("Noto Sans CJK KR"), local("NotoSansCJKkr-Regular"), local("Noto Sans KR");
  size-adjust: 86.4%;
}
/* --font-sans: "Pretendard Variable", Pretendard, "Pretendard Fallback", -apple-system, ... */
```

- Apple SD Gothic Neo는 이미 0.865em라 `local()`에 넣지 않는다(넣으면 오히려 줄어든다). `min-height` 예약은 쓰지 않는다.
- 대역 측정: About CLS 0.107~0.139 → 0.001~0.003. **실제 값은 PR-19의 CI 3회 중앙값으로 확인한다**(CLS ≤ 0.1, `lighthouserc.json`의 About 예외 해제).

## 3. 8장 금지 패턴에 추가

- 홈에 실명·직함·기술 태그·성과 수치·About 링크·대표 프로젝트
- About 안의 블로그 글 링크(`/posts/…`), `personal`/`work` 표기
- About 경력의 접이식·`expand all`
- 검색이 두 곳(홈 글 검색창 + 헤더 팔레트)이 되는 것
- 히어로 말고 다른 곳의 커서 깜빡임
- 인쇄 때 다크 배경(`resume.pdf`는 항상 라이트)

## 4. 9장 컴포넌트에 추가 (이름은 제안)

| PR | 컴포넌트 |
|---|---|
| PR-19 | `about/AboutIntro`(첫 화면), `about/CompanyJump`(회사 바로가기), `about/ExperienceCompany`·`ExperienceProject`, `about/SkillGroups`, 인쇄 스타일 |
| PR-20 | `SearchPalette`(dynamic import), 헤더 `SearchButton` |
| PR-21 | `home/HeroTerminal`, `home/HomeSidebar`(`PopularList`·`SeriesList`·`TagCloud`) |

## 5. 10장 진행 상황에 추가

`| Phase 2 (PR-18 ~ PR-25) | 데이터 분리, About 다시 그리기, 헤더 검색, 홈 히어로·사이드바, resume.pdf, 인기글, SEO, 게이트 | 진행 중 |`

## 6. OG 이미지 (D-12)

`DESIGN.md`의 OG 규칙(1200×630, 다크 고정, 하단 mono 한 줄, accent 선 없음)은 그대로다. 홈 OG는 **B안으로 확정**(작성자 2026-11-07, 31번 3장). 개발 입력은 [34번](./34-handoff-to-develop.md).

## 7. 반영 방법

1. ~~기획이 X-1(원칙 4)을 확인한다.~~ 완료(33번).
2. 개발이 PR-19 때 이 문서의 1·2·3장(1.2는 33번 확정문, 1.3b 포함)을 `DESIGN.md`에 옮긴다(디자인은 `/DESIGN.md`와 `src/`를 직접 고치지 않는다).
3. 반영한 항목에는 이 문서에 `✅ 반영됨 (날짜)`를 표시한다(아직 없음).
