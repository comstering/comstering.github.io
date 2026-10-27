# DESIGN.md

comstering.github.io 디자인 시스템 (v1.3 기준). UI를 만들거나 고칠 때 이 문서의 토큰과 규칙만 사용한다.

- 원본 명세: `cowork/design/04-design-system.md` (+ `10-planning-decisions.md`), 시안은 `cowork/design/site/`
- 구현 위치: 토큰 `src/app/globals.css`, 폰트 `src/app/layout.tsx`
- 작업 계획: `cowork/prd/002_platform_phase0-stabilization.md`

## 1. 브랜드

| 항목 | 정의 |
|---|---|
| 이름 | comstering |
| 컨셉 | **Terminal Graphite**. 어두운 그래파이트 위에 형광 그린 커서 하나. "정확하고 조용한" 인상 |
| 워드마크 | `~/comstering_` (JetBrains Mono 700). 커서 `_`만 accent. 480px 미만에서는 `~/_` |
| 보이스 | 짧은 존댓말 + 다음 행동. UI 라벨은 영어 소문자 모노(`copy`, `next →`). 대문자 라벨, 느낌표, 사과문체를 쓰지 않는다 |

### 시그니처 5가지

1. **cursor** `_`: 로고에 항상 둔다. 깜빡임은 홈 히어로 한 곳에서만.
2. **path** `~/posts/slug`: 모든 페이지 상단. breadcrumb 역할을 겸한다.
3. **comment label** `// featured ────`: 섹션 제목 형식.
4. **mono meta** `2025-07-10 · infra`: 날짜, 분류, 수치는 모노 소문자.
5. **arrow**: 내부 이동은 오른쪽 화살표, 외부 링크는 대각선 화살표. 글리프가 아닌 SVG 아이콘(mask)으로 그린다. 외부 링크(`target="_blank"`)에는 스크린리더용 `(새 창에서 열림)`을 붙인다.

## 2. 원칙

1. 글이 주인공이다.
2. 포인트 색은 하나만, 아껴서 쓴다. (`warn`은 경고·오류에만 쓰는 예외)
3. 토큰만 쓴다. hex, `gray-*`/`sky-*`/`zinc-*`/`blue-*`, `dark:` 색 클래스는 금지. 라이트/다크는 CSS 변수가 처리한다.
4. 증명의 연결선을 보이게 한다. 성과 수치 옆에는 근거 링크를 둔다. **회사 성과와 개인 실습 글을 섞어 보이지 않는다.** 개인 환경 글은 `personal`로 표기한다.
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

## 8. 금지 패턴

- 컴포넌트 안의 hex 값, `dark:` 색상 클래스, `gray-*`/`sky-*`/`zinc-*`/`blue-*` 팔레트
- 카드 그리드형 글 목록, 큰 그림자, 글래스모피즘, 그라디언트 텍스트
- 보라/파랑 AI 그라디언트, 떠다니는 블롭 장식
- 포인트 색을 여러 개 쓰는 것, **본문 강조에 accent 쓰기**
- **관련 글을 시리즈나 이전/다음 글과 중복해서 보여주는 것**
- 섹션 번호, eyebrow, 장식용 점, em dash

## 9. 컴포넌트

공통 UI는 `src/components/ui/`에 두고, variant는 boolean prop 대신 명시적 variant(`variant="primary" | "ghost"`)로 만든다.

- 만든 것: `Container`, `IconButton`, `Chip`, `Input`, `SectionHead` (+ `components/PostListItem`, `Header`, `Footer`, `ThemeToggle`, `PostToc`, `PostContent`, `post/PostPath`, `post/PostHeader`, `post/AuthorBox`, `post/PostPager`)
- 처음 쓰는 PR에서 추가할 것: `Tag`, `Button`, `Badge`, `Field`
- 전체 목록과 상태 표현(`aria-pressed`, `aria-current`, `aria-selected`, `[hidden]`, `data-copied`)은 `cowork/design/04-design-system.md` 4장 참고.

## 10. 진행 상황

Phase 0 안정화(PRD-002)를 PR 단위로 진행한다. 이 문서는 PR-0에서 v1.3 기준으로 갱신했다.

| PR | 내용 | 상태 |
|---|---|---|
| PR-0 ~ PR-4 | 토큰 v1.3, 죽은 코드 정리, frontmatter v2, SEO·RSS·푸터, 서드파티·Giscus | 완료 |
| PR-5 | 글 상세 v1.3 정렬 | 진행 중 |
| PR-6 ~ PR-8 | About·404 토큰 정리, PR CI, 자동 배포 재개 | 예정 |
