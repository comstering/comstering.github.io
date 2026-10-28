# 04. comstering 디자인 시스템 v1.3

> v1.1 (2026-10-27): 기획 리뷰 R1~R10과 디자인 스킬 점검 결과를 반영했다. 상세는 [06-review-response.md](./06-review-response.md).
> v1.3 (2026-10-27): 사용자 관점 검토 [08-ux-review.md](./08-ux-review.md) H1~L2 반영. 아래 "v1.3 규칙 추가" 참고.
> v1.2 (2026-10-27): 기획 재검토 [07-planning-rereview.md](./07-planning-rereview.md) 승인. N1 표시, 외부 링크 스크린리더 문구, 시리즈 표기 규칙을 반영했다.

`design-system.html`의 내용을 글로 정리한 명세. 합의되면 이 문서를 기준으로 `/DESIGN.md`를 갱신하고, `system/tokens.css`를 `src/app/globals.css`로 옮긴다.

## 1. 브랜드

| 항목 | 정의 |
|---|---|
| 이름 | comstering |
| 컨셉 | **Terminal Graphite**: 인프라 엔지니어의 작업 환경인 터미널. 어두운 그래파이트 위에 형광 그린 커서 하나. "정확하고 조용한" 인상 |
| 워드마크 | `~/comstering_`: JetBrains Mono 700. 커서 `_`만 accent. 480px 미만에서는 `~/_` |
| 마크 | `~/_`를 다크 라운드 스퀘어(모서리 25%)에 담은 것. favicon, OG, 아바타 대체용으로 쓰며 항상 다크 |
| 보이스 | 짧은 존댓말 + 다음 행동. UI 라벨은 영어 소문자 모노(`copy`, `next →`). 대문자 라벨·느낌표·사과문체는 쓰지 않음 |

### 시그니처 5가지 (어느 화면에서든 브랜드를 알아보게 하는 요소)

1. **cursor** `_`: 로고에 항상 둔다. 깜빡임은 홈 히어로 한 곳에서만.
2. **path** `~/posts/slug`: 모든 페이지 상단에 둔다. breadcrumb 역할을 함께 한다.
3. **comment label** `// featured ────`: 섹션 제목 형식.
4. **mono meta** `2025-07-10 · infra`: 날짜·분류·수치는 모노 소문자로.
5. **arrow**: 내부 이동은 오른쪽 화살표, 외부 링크는 대각선 화살표. 글리프가 아닌 SVG 아이콘(mask)으로 그리고, 다음 행동은 항상 화살표로 표시한다. 대각선 화살표가 전하던 "외부 링크" 의미는 `target="_blank"` 링크마다 스크린리더용 텍스트 `(새 창에서 열림)`으로 남긴다.

## 2. 원칙

1. 글이 주인공이다.
2. 포인트 색은 하나만 쓰고, 아껴서 쓴다. (`warn`은 경고·오류에만 쓰는 예외)
3. 토큰만 쓴다. hex, `gray-*`, `dark:` 색 클래스는 금지.
4. 증명의 연결선을 보이게 한다. 성과 수치 옆에는 근거 링크를 둔다. 회사 성과와 개인 실습 글을 섞어 보이지 않는다. 개인 환경 글은 `personal`로 표기한다.
5. 한 화면에는 한 목적만 둔다. primary 버튼은 화면당 하나.
6. 리스트 문법은 하나로 통일한다: meta → title → support.

## 3. 토큰 (`system/tokens.css`)

### 색

| 토큰 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| canvas | `#F3F6F4` | `#0C0F0E` | 페이지 배경 |
| surface | `#FFFFFF` | `#111715` | 패널, 입력창 |
| surface-2 | `#E9EEEB` | `#161D1A` | hover, 인라인 코드 |
| fg | `#0E1512` | `#E6EDE9` | 본문 (17.0 / 16.2:1) |
| mute | `#5A6B63` | `#8A9A92` | 메타 (5.19 / 6.53:1) |
| line | `#D5DED9` | `#1F2A26` | 구분선 (장식 전용) |
| **line-strong** | `#7D8E86` | `#5A6D65` | 조작 요소 테두리 (≥3:1) · 신규 |
| accent | `#087A41` | `#5BF29B` | 링크·활성·포커스·주 CTA (4.99 / 13.4:1) |
| accent-on | `#FFFFFF` | `#06210F` | accent 위 글자 |
| **warn** | `#8A5A00` | `#F2C14E` | 경고 콜아웃·오류 상태 · 신규 |
| **overlay** | `rgb(12 15 14/.6)` | `rgb(0 0 0/.72)` | 모달 딤 · 신규 |
| **code-hl** | `rgb(91 242 155/.09)` | 동일 | 코드 줄 하이라이트 · 신규 |

사용 비율: canvas 약 68% · surface 약 14% · fg/mute 약 15% · accent **3% 이하**.

### 타이포

| 역할 | 서체 | 크기 / 행간 (데스크톱 → 모바일) |
|---|---|---|
| display | Pretendard 700, −0.04em | 48 / 1.2 → 32 |
| title (h1) | Pretendard 700, −0.03em | 40 / 1.3 → 30 |
| h2 / h3 | Pretendard 700 / 600 | 26 / 20 → 22 / 18 |
| list title | Pretendard 600 | 22 → 20 |
| body | Pretendard 400 | **17 / 1.8** → 16 |
| small | Pretendard 400 | 15 / 1.65 |
| meta · nav | JetBrains Mono 400 | 13 |
| caption · tag | JetBrains Mono 400 | 12 |
| metric | JetBrains Mono 600, tabular-nums | 32 |

`word-break: keep-all`은 전역에 적용한다.

### 간격 · 모양 · 레이아웃

- 간격은 4px 그리드(`--s-1`~`--s-24`). 목록 항목 사이는 24 + 구분선, 섹션 사이는 80–96.
- 모서리 반경: sm 6(인라인 코드·토큰), md 10(버튼·칩·코드), lg 16(패널·모달), full(아바타만).
- 폭: container 1120, read 720, toc 200. 헤더 64, gutter 20/24, **tap 44**.
- 브레이크포인트: 480(로고 축약) · 640(모바일) · 768(2단) · 1024(홈 사이드) · 1280(TOC).
- 그림자는 쓰지 않는다. 층은 `line-strong` 테두리와 `overlay` 딤으로 구분한다. z-index는 40 header · 41 progress · 50 overlay · 60 modal · 70 toast.
- 모션은 160ms ease-out으로 색 전환 위주. `prefers-reduced-motion`이면 모두 끈다.

## 4. 컴포넌트 (`system/components.css`)

| 그룹 | 컴포넌트 | 비고 |
|---|---|---|
| brand | `logo`, `mark`, `cursor-blink` | |
| shell | `site-header`, `nav`, `search-trigger`, `progress`, `site-footer` | 360px에서 한 줄 유지 확인 |
| primitive | `btn`(primary·secondary·ghost, sm), `icon-btn`, `link-arrow`, `chip`, `tag`, `stack-token`, `badge`, `kbd`, `field`, `avatar`, `path`, `sec-head` | chip = 필터, tag = 링크, stack-token = 정보 |
| list | `post-item`(default·compact), `proj-item`, `feat-row`, `metrics`, `leader`, `timeline`, `def-list`, `caps`, `year-head` | 모두 meta → title → support 구조, 행 전체 클릭 |
| article | `code`, `callout`(note·warn), `toc`, `toc-inline`, `series`, `author`, `pager`, `comments`, `diagram` | |
| overlay | `palette`, `lightbox`, `toast` | 포커스 트랩, Esc 닫기 |
| pattern | `hero`, `page-head`, `post-head`, `intro`, `star-sec`, `empty`, `term`, `og` | |

상태 표현: `aria-pressed`(chip), `aria-current`(nav, toc, path, series), `aria-selected`(palette), `[hidden]`(필터 결과), `data-copied`(code).

### v1.1 규칙 추가

- 섹션 번호와 eyebrow를 쓰지 않는다. 섹션 제목이 직접 말한다.
- 색이 들어간 굵은 측면선(>1px)을 쓰지 않는다. 콜아웃은 1px 틴트 테두리와 아이콘 라벨, TOC 활성 표시는 1px.
- 장식용 점(배지 점 등)과 em dash를 쓰지 않는다. 기간은 `2025.12 ~ 2026.02`.
- 행 링크는 앵커 자체가 44px 이상이어야 한다. 태그는 32px에 간격 12px로 WCAG 2.5.8 예외를 적용한다.
- 스크롤 연동은 CSS scroll-driven animation이나 IntersectionObserver로만 구현하고, scroll 리스너는 쓰지 않는다.
- 시안용 값은 `.ph`(점선 밑줄)과 `.ph-block`(점선 테두리)로 표시하며, 구현할 때 데이터로 교체한다.
- Giscus는 iframe이라 `system/giscus-{dark,light}.css`(토큰 값 복사본)를 `data-theme` URL로 넘긴다.
- 코드 주석 색 `--syntax-comment`는 `#7F9A8C` (하이라이트 줄 위에서 5.05:1).

### v1.2 규칙 추가

- **시리즈 표기:** 글 목록 메타에는 레지스트리의 `label`을 쓴다(`series eks 5/5`). 시리즈 박스와 홈 사이드에는 `slug`를 쓴다(`eks-from-scratch 5/5`). 정의는 `content/series.yaml` (PRD 6.1).
- **시안 표시는 구현에 넘기지 않는다:** `.ph`, `.ph-block`, `.ph-note`, 푸터 범례는 `cowork/design`에만 둔다. CI grep으로 `src/`에 `ph-block`이나 `class="ph"`가 0건인지 확인한다 (PRD 5.1).
- **스크롤 연동 대체 경로:** CSS scroll-driven animation을 지원하지 않는 브라우저(Safari·Firefox 일부 버전)에서는 IntersectionObserver 대체 경로가 동작하는지 구현 단계에서 확인한다.

### v1.3 규칙 추가

- **글 상단 도구 줄:** 1280 미만에서 목차와 시리즈 박스는 한 줄에 나란히 둔다. 연 쪽이 줄 전체를 쓴다. 640 미만에서는 라벨을 `contents N`, `series <label> n/N`으로 줄인다(시리즈 박스 안 목록은 계속 slug). 목표: 360×640 첫 화면에 본문 첫 문단이 보일 것.
- **관련 글:** 같은 시리즈 글과 prev/next 글은 제외한다. 태그 점수 0인 글로 채우지 않는다.
- **본문 강조에 accent를 쓰지 않는다.** 강조는 굵기로만. accent는 링크·활성·포커스·주 CTA 전용이다.
- **링크인 행에는 화살표를 붙인다.** 경력 타임라인처럼 행 전체가 링크면 끝에 `→`(`mute`, hover `accent`).
- **증명 링크는 위에도 둔다.** 프로젝트 상세 헤더 메타 줄 끝에 `관련 글 N →`.
- **About 첫 줄 위계:** 이름 다음 줄은 한국어 직무 + 연차를 본문 크기 `fg`로. 영문 직함·회사는 그 아래 모노 `mute`.
- **넓은 표:** 가로 스크롤이 남아 있으면 오른쪽 가장자리를 흐리게 표시한다(배경 그라데이션, 그림자 아님).

## 5. 화면 (`site/`)

| 파일 | 경로 | PRD |
|---|---|---|
| index.html | `/` | F-HM-01~04 · 1280×720에서 첫 글 제목이 보임 |
| post.html | `/posts/[id]` | F-PO-01~11 |
| projects.html · project.html | `/projects`, `/projects/[slug]` | F-PJ-02~04 |
| about.html | `/about` | F-AB-01~03 · 360×640 첫 화면에 직무·연차·연락처 |
| tags.html · tag.html | `/tags`, `/tags/[tag]` | F-SR-04 |
| 404.html | — | F-GL-04 |
| og.html | — | F-SE-02 |

공통 동작(`system/app.js`): 다크 기본 테마 토글 · ⌘K / `/` 명령 팔레트 · 코드 복사 · TOC 현재 위치 표시 · 읽기 진행률 · 이미지 라이트박스 · URL과 연동되는 필터 · 모바일 시리즈 접기.

## 6. 검증 결과 (2026-10-27)

- 360px 폭에서 9개 화면 모두 가로 스크롤 0건 (코드 블록·표·다이어그램 내부 스크롤 제외)
- 상호작용 확인: 테마 토글, 필터 → URL 반영 → 뒤로가기 복원, `?category=infra` 직접 진입, ⌘K → "카펜터" 검색 → ↓ → Esc, TOC 클릭 시 제목이 헤더 아래 88px에 위치, 진행률 바
- 색 대비: 모든 텍스트 조합 AA 이상, `line-strong` 3:1 이상

## 7. 열려 있는 것

- 프로젝트 수치·사내 아키텍처는 PRD F-PJ-05 체크리스트(공개 가능 여부)를 통과한 뒤 게시해야 한다. 시안의 수치는 현재 About에 공개된 값을 그대로 썼다.
- 아키텍처 다이어그램은 손으로 그린 SVG 예시다. 실제로는 Mermaid를 빌드 타임에 SVG로 만들고 토큰 테마를 입히는 방식을 권장한다.
- `resume.pdf`, Credly 링크, RSS는 자리만 잡아 두었다.
