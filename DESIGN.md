# DESIGN.md

comstering.github.io 디자인 시스템 (v1.4, Phase 2 반영). UI를 만들거나 고칠 때 이 문서의 토큰과 규칙만 사용한다.

- 원본 명세: `cowork/design/04-design-system.md` (+ `cowork/design/archive/phase0-summary.md`의 사용자 결정 D1~D6), 시안은 `cowork/design/site/`
- 구현 위치: 토큰 `src/app/globals.css`, 폰트 `src/app/layout.tsx`
- 작업 계획: 진행 중인 Phase의 PRD(`cowork/prd/`), 끝난 Phase는 `cowork/prd/archive/phase-0-1_summary.md`

## 1. 브랜드

| 항목 | 정의 |
|---|---|
| 이름 | comstering |
| 컨셉 | **Terminal Graphite**. 어두운 그래파이트 위에 형광 그린 커서 하나. "정확하고 조용한" 인상 |
| 워드마크 | `~/comstering_` (JetBrains Mono 700). 커서 `_`만 accent. 480px 미만에서는 `~/_` |
| 보이스 | 짧은 존댓말 + 다음 행동. UI 라벨은 영어 소문자 모노(`copy`, `next →`). 대문자 라벨, 느낌표, 사과문체를 쓰지 않는다 |

### 시그니처 5가지

1. **cursor** `_`: 로고에 항상 둔다. 깜빡임은 홈 히어로 한 곳에서만(히어로 명령 줄 `$ history_`. 로고 커서는 정지).
2. **path** `~/posts/slug`: 모든 페이지 상단. breadcrumb 역할을 겸한다.
3. **comment label** `// popular ────`: 섹션 제목 형식.
4. **mono meta** `2025-07-10 · infra`: 날짜, 분류, 수치는 모노 소문자.
5. **arrow**: 내부 이동은 오른쪽 화살표, 외부 링크는 대각선 화살표. 글리프가 아닌 SVG 아이콘(mask)으로 그린다. 외부 링크(`target="_blank"`)에는 스크린리더용 `(새 창에서 열림)`을 붙인다.

## 2. 원칙

1. 글이 주인공이다.
2. 포인트 색은 하나만, 아껴서 쓴다. (`warn`은 경고·오류에만 쓰는 예외)
3. 토큰만 쓴다. hex, `gray-*`/`sky-*`/`zinc-*`/`blue-*`, `dark:` 색 클래스는 금지. 라이트/다크는 CSS 변수가 처리한다.
4. **홈은 블로그, About은 경력이다.** 두 쪽은 서로 링크하지 않는다(헤더 `about`과 글 하단 저자 박스의 일반 `about` 링크만 예외). 경력·성과·기술은 About에서 끝나고, 홈에는 이름·직함·기술 태그·성과를 두지 않는다. 성과 수치를 합쳐 하나의 숫자로 만들지 않는다. 밖에서 확인할 수 있는 근거(오픈소스 PR, 자격증 `verify ↗`, 사이드 프로젝트 저장소)에는 링크를 둔다.
5. 한 화면에는 한 목적만 둔다. primary 버튼은 화면당 하나.
6. 리스트 문법은 하나로 통일한다: meta → title → support.

## 3. 색상 토큰

유틸리티 이름은 `bg-canvas`, `text-fg`, `border-line`, `text-accent`처럼 토큰 이름을 그대로 쓴다.

| 토큰 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| `canvas` | `#F3F6F4` | `#0C0F0E` | 페이지 배경 |
| `surface` | `#FFFFFF` | `#111715` | 패널, 입력창 |
| `surface-2` | `#E9EEEB` | `#161D1A` | hover, 인라인 코드 |
| `fg` | `#0E1512` | `#E6EDE9` | 본문 (17.0 / 16.2:1) |
| `mute` | `#5A6B63` | `#8A9A92` | 메타 (5.19 / 6.53:1) |
| `line` | `#D5DED9` | `#1F2A26` | 구분선 (장식 전용) |
| `line-strong` | `#7D8E86` | `#5A6D65` | 조작 요소 테두리 (3:1 이상) |
| `accent` | `#087A41` | `#5BF29B` | 링크, 활성, 포커스, 주 CTA (4.99 / 13.4:1) |
| `accent-on` | `#FFFFFF` | `#06210F` | accent 위 글자 |
| `accent-soft` | `rgb(8 122 65 / .08)` | `rgb(91 242 155 / .08)` | accent 틴트 배경 |
| `warn` | `#8A5A00` | `#F2C14E` | 경고 콜아웃, 오류 상태 |
| `overlay` | `rgb(12 15 14 / .6)` | `rgb(0 0 0 / .72)` | 모달 딤 |

코드 블록은 라이트에서도 어둡게 유지한다.

| 토큰 | 값 (라이트 / 다크) | 용도 |
|---|---|---|
| `code-bg` | `#0E1512` / `#070908` | 코드 배경 |
| `code-bar` | `#141C18` / `#0D1210` | 코드 상단 바 (파일명, Phase 1) |
| `code-fg` | `#CFE8DA` | 코드 글자 |
| `code-line` | `#1F2A26` | 코드 안 구분선 |
| `code-hl` | `rgb(91 242 155 / .09)` | 줄 하이라이트 |
| `--syntax-comment` | `#7F9A8C` | 주석 (하이라이트 줄 위 5.05:1) |
| `--syntax-keyword` / `string` / `number` / `title` / `meta` | `#5BF29B` / `#F2C14E` / `#7DD3FC` / `#E6EDE9` / `#C4A7F5` | 구문 색 |

사용 비율: canvas 약 68% · surface 약 14% · fg/mute 약 15% · accent **3% 이하**.

## 4. 타이포그래피

| 역할 | 서체 | 크기 (데스크톱 → 모바일) | 유틸리티 |
|---|---|---|---|
| display | Pretendard 700, -0.04em | 48 → 32 | `text-display` |
| title (h1) | Pretendard 700, -0.03em | 40 → 30 | `text-title` |
| h2 / h3 | Pretendard 700 / 600 | 26 / 20 → 22 / 18 | `text-h2` / `text-h3` |
| list title | Pretendard 600 | 22 → 20 | `text-item` |
| lead | Pretendard 400 | 18 | `text-lead` |
| body | Pretendard 400, 행간 1.8 | 17 → 16 | `text-body` |
| small | Pretendard 400 | 15 | `text-small` |
| meta, nav | JetBrains Mono 400 | 13 | `text-meta` |
| caption, tag | JetBrains Mono 400 | 12 | `text-cap` |
| metric | JetBrains Mono 600, tabular-nums | 32 | |

- `font-sans`는 Pretendard Variable, `font-mono`는 JetBrains Mono(`next/font`).
- 한글 폴백 글꼴의 폭을 보정한다. Pretendard 바로 뒤에 `Pretendard Fallback`을 둔다(7장 "글꼴 폴백").
- 시안의 `--text-sm`, `--leading-tight`는 Tailwind 기본 `text-sm`, `leading-tight`와 이름이 겹쳐 기존 화면이 바뀌므로 `--text-small`, `--leading-heading`으로 바꿔 구현했다. 그 외 `--leading-body`, `--tracking-title`, `--tracking-display`도 제공한다.
- `word-break: keep-all`을 한글 텍스트에 적용한다(`break-keep`).

## 5. 간격, 모양, 레이아웃

- 간격은 Tailwind 기본 4px 스케일을 그대로 쓴다. 목록 항목 사이는 24 + 구분선, 섹션 사이는 80-96.
- 모서리: `rounded-sm` 6(인라인 코드, 토큰), `rounded-md` 10(버튼, 칩, 코드), `rounded-lg` 16(패널, 모달), `rounded-full`은 아바타만.
- 폭 변수(`:root`): `--w-container` 1120, `--w-read` 720, `--w-toc` 200, `--header-h` 64, `--gutter` 20(640px 이상 24), `--tap` 44. 사용 예: `max-w-(--w-read)`.
- 브레이크포인트: 480(로고 축약) · 640(모바일) · 768(2단) · 1024(홈 사이드) · 1280(TOC).
- 그림자는 쓰지 않는다. 층은 `line-strong` 테두리와 `overlay` 딤으로 구분한다.
- z-index는 40 header · 41 progress · 50 overlay · 60 modal · 70 toast.
- 터치 영역은 44px 이상. 태그는 32px + 간격 12px로 WCAG 2.5.8 예외를 적용한다.

## 6. 모션

- 기본 `var(--dur)` 160ms, `var(--ease)` cubic-bezier(0.2, 0, 0, 1). 색 전환 위주.
- 장식 애니메이션 금지. 스크롤 연동은 CSS scroll-driven animation이나 IntersectionObserver로만 하고 scroll 리스너는 쓰지 않는다.
- `prefers-reduced-motion`이면 모두 끈다.

## 7. 규칙

### 구조와 표기
- 섹션 번호와 eyebrow를 쓰지 않는다. 섹션 제목이 직접 말한다.
- 색이 들어간 굵은 측면선(1px 초과)을 쓰지 않는다. 콜아웃은 1px 틴트 테두리 + 아이콘 라벨, TOC 활성 표시는 1px.
- 장식용 점과 em dash를 쓰지 않는다. 기간은 `2025.12 ~ 2026.02`.
- 행 링크는 앵커 자체가 44px 이상. 링크인 행에는 끝에 `→`(`mute`, hover `accent`)를 붙인다.
- 포커스 링은 전역 `:focus-visible`(accent)을 쓴다. 제거하지 않는다.
- 아이콘은 `lucide-react`로 통일한다.

### 글 상세
- 본문 강조에 accent를 쓰지 않는다. 강조는 굵기로만 한다. accent는 링크, 활성, 포커스, 주 CTA 전용.
- 관련 글은 같은 시리즈 글과 이전/다음 글을 제외한다. 점수 0인 글로 채우지 않고, 0편이면 섹션을 숨긴다.
- 시리즈 표기: 글 목록 메타는 레지스트리의 `label`(`series eks 5/5`), 시리즈 박스와 홈 사이드는 `slug`.
- 넓은 표는 가로 스크롤이 남으면 오른쪽 가장자리를 배경 그라데이션으로 흐리게 한다(그림자 아님).

### 리스트
- 글 목록은 카드 그리드가 아니라 세로 리스트다. 항목 구조는 meta → title → support, 행 전체가 클릭 영역.

### 시안 표시
- `.ph`, `.ph-block`, `.ph-note`는 `cowork/design`에만 둔다. `src/`에는 0건이어야 한다.

### 홈
- **순서:** 히어로 → 카테고리 칩(글 수) → 연도별 글 목록. 글 목록 위에 검색창을 두지 않는다(검색은 헤더 팔레트 하나).
- **히어로:** 터미널 명령 줄 + 아래 문구 한 줄. 값은 `content/site.yaml`(`title`, `command`, `tagline`). 확정값은 `$ history` / `실행해 본 것만 씁니다`.
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
  - 배치: **1024px 이상** 오른쪽 열(`sticky`, 헤더 아래 32px, 블록 사이 48px, 열 위쪽 여백 56px). **1024px 미만**은 **글 목록 아래**에 위쪽 `line` 구분선과 함께 두고 블록 사이 40px. 모바일 첫 화면을 글로 채우려는 의도된 결정이다.

### 헤더 검색 팔레트
- **버튼:** 헤더 `search ⌘K`(높이 36px, `line-strong` 테두리, hover `accent`). 768px 미만은 아이콘만(36px, 터치 영역은 `::after`로 46px). 접근 가능한 이름 `검색 (search)`(보이는 글자 `search`를 이름에 포함), `aria-keyshortcuts="Meta+K Control+K"`.
- **여는 법:** `⌘K`/`Ctrl+K`, `/`(입력란 밖에서). 열면 입력란 포커스와 포커스 트랩, 닫으면 열기 전 위치로 복귀(단축키로 열었으면 본문).
- **모양:** 폭 `min(640px, 100% - 32px)`, 위에서 14vh, `surface` + `line-strong` 테두리, 입력란 높이 56px, 결과 영역 최대 `min(56vh, 440px)`. 640px 미만은 **전체 화면**(`100dvh`, 모서리·테두리 없음).
- **내용:** **글만** 검색(draft 제외). 제목·설명·태그·카테고리·소제목(h2·h3). 입력란 문구 `제목, 태그, 소제목으로 글 검색`. 결과 한 줄 = 제목 · 날짜 · 카테고리(모바일은 날짜·카테고리가 제목 아래 줄). 소제목에서만 맞은 글은 제목 아래에 `# 소제목`을 작게 보인다. 빈 입력은 최근 글 5편(`recent`), 결과 없음은 안내 문구.
- **낭독:** 결과 수를 `role="status"`로 알린다. `role="combobox"` + `listbox`, 선택 행 `aria-selected`(배경 `surface-2`, 제목 `accent`), 맞은 글자는 `<mark>`(`accent`, 배경 없음).
- **성능:** 팔레트 코드와 인덱스(`/search-index.json`)는 처음 열 때 불러온다(초기 JS·TBT에 영향 없음).
- 검색은 이것 하나만 둔다.

### About
- **첫 화면:** 사진 · 이름(한·영) · `직함 · 경력 N년+` · 버튼. 직함 줄은 body 500 `fg`. **현재 회사는 첫 화면에 두지 않는다**(회사는 experience에서만). 버튼은 `email`(primary) · `resume.pdf`(다운로드) · `github ↗` · `linkedin ↗`. 360×640에서 버튼이 스크롤 없이 모두 보인다.
- **순서:** 첫 화면 → 소개 → experience → open source · side → skills → certifications → education · activity. `what i do`는 없다.
- **experience:**
  - 위에 회사 바로가기(`CJ 올리브영 · 클래스101 · 오픈소스`): 높이 44px, `line-strong` 외곽선, hover `accent`, 줄이 모자라면 줄바꿈. **도착 강조(배경색)는 없다.**
  - 회사 → 프로젝트 **전부 펼침**(접이식·`expand all` 없음). 기간은 회사 이름 **위** 한 줄(mono 12px `mute`), 왼쪽 기간 열은 없다. 제목 단계: 섹션 `h2`, 회사 `h3`, 프로젝트 `h4`.
  - 회사 `h3`는 `text-h3` 700, 직함은 `text-small` `mute`. 프로젝트: 제목 `text-small` 600(오른쪽에 기간 mono 12px), 설명 `mute` 행간 1.6, 성과 불릿 `fg`(5px 짧은 선 마커, `line-strong`).
  - **밀도(V3):** 행간 1.6, 불릿 간격 4px, 프로젝트 간격 12px, 불릿 들여쓰기 12px. 본문을 14px로 줄이지 않는다(`text-small` 15px 유지). 기술 태그는 두지 않는다.
  - 앵커 위치는 전역 `html { scroll-padding-top }`(헤더 + 24px) 하나로 맞춘다. 항목에 `scroll-margin-top`을 또 주지 않는다(두 번 더해진다).
- **링크:** About 안에 `/posts/` 링크를 두지 않는다. 경력 항목에 근거 링크를 달지 않는다. 오픈소스는 `merged` + `pull request ↗`, 자격증은 `verify ↗`만 링크.
- **skills:** 7그룹(platform / cloud · iac / ci/cd · workflow / data · messaging / auth · security / backend / observability). 그룹과 항목은 `content/profile.yaml`이 원본이다.

### 인쇄 (`resume.pdf`)
`/resume` 페이지는 없다. `/about`을 Playwright로 **print 미디어 A4**에 인쇄해 `resume.pdf`를 만든다. 규칙은 한 벌의 `@media print`(`globals.css`)다.

| 규칙 | 값 |
|---|---|
| 용지 | `@page` A4, 여백 13mm(위) · 14mm(좌우·아래), 본문 9.5pt(프로젝트 9pt) |
| 색 | 라이트 고정. `:root`/`.dark` 토큰을 덮어쓴다(`canvas`·`surface` `#fff`, `fg` `#111`, `mute` `#4a4a4a`, `line` `#cfcfcf`, `accent` `#111`). 다크 테마로 열어도 흰 배경 |
| 숨김 | 헤더, 푸터, skip 링크, 사진, 첫 화면 버튼, 회사 바로가기, `now` 배지, 검색 팔레트 |
| 연락처 | 화면에서는 숨기고 인쇄 때만 보이는 한 줄(이메일 · github · linkedin) |
| 링크 | 외부 링크 뒤에 `(URL)`. 화살표 아이콘(mask)은 URL 문구로 바뀐다 |
| 쪽 경계 | 프로젝트 하나, 오픈소스·자격증 행은 쪽을 넘어 갈라지지 않게(`break-inside: avoid`), 섹션 제목은 다음 내용과 붙게(`break-after: avoid`) |
| 기술 스택 | 칩 모양을 쉼표로 이은 글자로(테두리가 종이에서는 잡음) |
| 글자 크기 | 이름 20pt, 직함 줄 10.5pt, 소개 문구 12pt, 섹션 제목 8.5pt |

### 글꼴 폴백
풀폭 CJK 폴백(한글 1.0em)이 Pretendard(0.864em)보다 넓어 About 소개 문단의 줄 수가 글꼴 도착 뒤 바뀌는 것이 CLS 원인이다. 폴백 폭을 보정한다.

```css
@font-face {
  font-family: "Pretendard Fallback";
  src: local("Noto Sans CJK KR"), local("NotoSansCJKkr-Regular"), local("Noto Sans KR");
  size-adjust: 86.4%;
}
/* --font-sans: "Pretendard Variable", Pretendard, "Pretendard Fallback", system-ui, ... */
```

- Apple SD Gothic Neo는 이미 0.865em라 `local()`에 넣지 않는다. `min-height` 예약은 쓰지 않는다.

## 8. 금지 패턴

- 컴포넌트 안의 hex 값, `dark:` 색상 클래스, `gray-*`/`sky-*`/`zinc-*`/`blue-*` 팔레트
- 카드 그리드형 글 목록, 큰 그림자, 글래스모피즘, 그라디언트 텍스트
- 보라/파랑 AI 그라디언트, 떠다니는 블롭 장식
- 포인트 색을 여러 개 쓰는 것, **본문 강조에 accent 쓰기**
- **관련 글을 시리즈나 이전/다음 글과 중복해서 보여주는 것**
- 섹션 번호, eyebrow, 장식용 점, em dash
- 홈에 실명·직함·기술 태그·성과 수치·About 링크·대표 프로젝트
- About 안의 블로그 글 링크(`/posts/…`), `personal`/`work` 표기
- About 경력의 접이식·`expand all`
- 검색이 두 곳(홈 글 검색창 + 헤더 팔레트)이 되는 것
- 히어로 말고 다른 곳의 커서 깜빡임
- 인쇄 때 다크 배경(`resume.pdf`는 항상 라이트)

## 9. 컴포넌트

공통 UI는 `src/components/ui/`에 두고, variant는 boolean prop 대신 명시적 variant(`variant="primary" | "ghost"`)로 만든다.

- 만든 것: `Container`, `IconButton`, `Chip`, `Input`, `SectionHead`, `Button`(`buttonClass`) (+ `components/PostListItem`, `Header`, `Footer`, `ThemeToggle`, `PostToc`, `PostContent`, `post/PostPath`, `post/PostHeader`, `post/AuthorBox`, `post/PostPager`, `post/PostToolbar`(목차·시리즈 한 줄 바), `post/SeriesBox`, `post/RelatedPosts`, `post/PostProgress`(읽기 진행률), `about/AboutIntro`(첫 화면)·`about/ExperienceSection`(회사 바로가기 + 전부 펼친 경력), 이미지 확대 `<dialog>`·코드 블록·콜아웃·표 래퍼는 `rehype-*`가 만든다)
- 처음 쓰는 PR에서 추가할 것: `Tag`, `Button`, `Badge`, `Field`
- 전체 목록과 상태 표현(`aria-pressed`, `aria-current`, `aria-selected`, `[hidden]`, `data-copied`)은 `cowork/design/04-design-system.md` 4장 참고.

## 10. 진행 상황

Phase 0 안정화(PRD-002)를 PR 단위로 진행한다. 이 문서는 PR-0에서 v1.3 기준으로 갱신했다.

| PR | 내용 | 상태 |
|---|---|---|
| PR-0 ~ PR-5 | 토큰 v1.3, 죽은 코드 정리, frontmatter v2, SEO·RSS·푸터, 서드파티·Giscus, 글 상세 v1.3 | 완료 |
| PR-6 ~ PR-8 | About·404 토큰 정리, PR CI, 자동 배포 재개 | 완료 |
| Phase 1 (PR-9 ~ PR-17) | categories 다중화, 본문(코드·콜아웃·표), 글 상단 바(목차·시리즈), 관련 글, 이미지 파이프라인·확대, 글꼴 서브셋, OG 자동 생성, 읽기 진행률, 성능 게이트 | 완료. 측정은 `cowork/develop/CONTEXT.md` 6장 |
| Phase 2 (PR-18 ~ PR-25) | 데이터 분리, About 다시 그리기, 헤더 검색, 홈 히어로·사이드바, resume.pdf, 인기글, SEO, 게이트 | 진행 중 (PR-18·19 반영) |
