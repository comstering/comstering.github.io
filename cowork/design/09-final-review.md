# 09. 최종 디자인 검토 (v1.3)

검토: 디자인 세션 (Claude Code) · 2026-10-27
대상: `site/*.html` 9종, `system/*` v1.3 (08 반영본)
사용 skill: `frontend-design`(시각 완성도), `agent-browser`(QA 기준. CLI 미설치라 내장 브라우저 + 헤드리스 Chrome으로 대체), `vercel-composition-patterns`·`vercel-react-best-practices`(구현 전환)

## 결론

**구현 착수 가능.** 레이아웃·위계·접근성 구조는 완성 단계다. 남은 시각 문제는 **목록 썸네일 하나**이고, 이건 시안이 아니라 이미지 자산 문제라 결정이 필요하다(V1). 이번 검토에서 바로 고친 것은 3건이다.

## 1. 시각 완성도 (`frontend-design`)

### 브리프가 정한 것은 그대로 둔다

이 skill은 생성형 디자인에서 자주 보이는 기본값을 경고하는데, 그중 두 가지가 이 브랜드의 확정 방향과 겹친다: **검정 배경 + 형광 그린 포인트 하나**, **모노 메타·가운뎃점·`→` 화살표**. 둘 다 DESIGN.md와 PRD가 정한 Terminal Graphite 정체성이므로 유지한다. 브리프가 우선한다.

그래서 이번 검토는 "브리프가 비워 둔 영역에서 기본값을 썼는가"와 "기억에 남는 요소가 한 곳에 모여 있는가"를 봤다.

- **기억 요소:** 홈 히어로의 깜빡이는 커서 `_` 하나. 다른 화면은 조용하다. 의도대로다.
- **타이포:** Pretendard + JetBrains Mono 두 가족, 역할이 분명하다. 본문 17px / 720px(한 줄 약 40자)는 skill 기준(80자 미만)도 만족한다.
- **구조 장치:** 섹션 번호를 v1.1에서 없앤 것은 skill 기준("순서가 아닌 내용에 번호 금지")과 일치한다. 프로젝트 상세의 문제 → 접근 → 구조 → 결과 → 배운 점은 실제 순서라 제목으로 둔 것이 맞다.
- **문구:** 404 "주소가 바뀌었거나 삭제된 글일 수 있어요. 검색하거나 최신 글에서 찾아보세요"는 사과 없이 다음 행동을 준다. 좋다.

### 발견 사항

| # | 우선 | 내용 | 조치 |
|---|---|---|---|
| V1 | **높음 (결정 필요)** | **목록 썸네일이 화면에서 가장 시끄럽다.** 흰 AWS 카드, 보라 Karpenter, 크림색 EKS, 어두운 배경에 어두운 글씨라 안 보이는 Cilium 로고(`cilium.png`, 투명 PNG)가 섞여 있다. 커서 하나로 모은 시선을 썸네일이 가져간다. 같은 `eks.png`를 두 글이 같이 쓴다 | 이번에 썸네일 비율을 4:3 → OG 비율(1200:630)로 바꿔 가로 로고가 덜 잘리게 했다. 근본 해결은 둘 중 하나: **A안(추천)** F-SE-02 OG 자동 생성 이미지를 목록 썸네일로도 쓴다(한 톤, 글마다 고유). **B안** 목록에서 썸네일을 빼고 OG에만 쓴다 |
| V2 | 중간 → **수정함** | About 경력 줄 끝 화살표가 제목 안의 `→`와 겹쳐 `Airflow MWAA → Argo Workflows 전환 →`처럼 읽혔다 | 화살표를 기간 뒤, 줄 맨 끝으로 옮겼다 |
| V3 | 낮음 → **수정함** | 모바일 About에서 `경력 4년+`가 `경력 / 4년+`로 갈라졌다 | 구절 단위 줄바꿈 금지 |
| V4 | 낮음 | 본문 속 AWS 공식 다이어그램(흰 라벨, 주황·파랑 아이콘)이 다크 톤과 부딪힌다 | 남의 이미지라 그대로 둔다. 직접 그리는 다이어그램만 `project.html`처럼 토큰 SVG(빌드 타임 Mermaid)로 |
| V5 | 참고 | `//` 섹션 라벨이 About 5개, 홈 사이드 3개로 많은 편이다. 시그니처 3번이라 유지하되, 새 화면에서는 제목만으로 뜻이 통하면 라벨을 더하지 않는다 | 규칙으로만 남김 |

## 2. QA (`agent-browser` 기준)

`agent-browser` CLI가 설치돼 있지 않아 같은 항목(스크린샷, 접근성 트리, 키보드)을 앱 내장 브라우저와 헤드리스 Chrome으로 확인했다. 헤드리스 Chrome은 창 최소 폭 때문에 360px 캡처가 잘리므로 모바일은 내장 브라우저로만 판정했다.

| 항목 | 결과 (9개 화면) |
|---|---|
| h1 개수 | 모두 1 |
| 제목 단계 건너뜀 | 0 |
| alt 없는 이미지 / 이름 없는 링크·버튼 / 중복 id | 0 / 0 / 0 |
| 360px 가로 스크롤 | 0 |
| `lang="ko"`, 스킵 링크, `:focus-visible`, `prefers-reduced-motion` | 모두 있음 |
| 명령 팔레트 | `/`로 열림 → 입력창 포커스 → 검색 3건 → ↓ 선택(`aria-activedescendant`) → Tab 갇힘 → Esc 닫힘 → 직전 포커스로 복귀 |
| 24px 미만 터치 영역 | 경로의 `~` 링크(폭 8px) 1건 → **수정함**(보이는 위치는 그대로, 누르는 영역만 24px) |
| 빈 링크 | `#rss`, `#resume`, `#credly`: 시안용 자리. 구현 시 실제 경로로 |

## 3. 구현 전환 (`vercel-composition-patterns`, `vercel-react-best-practices`)

시안 → Next.js 15(정적 export) 전환 때 지킬 구조. 현재 `src/` 상태와 같이 봤다.

### 컴포넌트 구조

| 시안 | React 구조 | 근거 규칙 |
|---|---|---|
| `post-item` / `post-item--compact` | `<PostItem>`과 `<PostItemCompact>`를 따로 둔다. `compact`·`showThumb` 같은 boolean prop을 늘리지 않는다 | `patterns-explicit-variants`, `architecture-avoid-boolean-props` |
| 글 상단 도구 줄(목차 + 시리즈) | 둘 다 네이티브 `<details>`로 만들면 JS 0. 시리즈 토글을 `app.js` 대신 `<details>`로 바꾸는 것을 권장. 연 쪽이 한 줄을 차지하는 것은 CSS(`details[open]`)만으로 된다 | 번들 최소화 |
| 명령 팔레트 | `PaletteProvider`가 열림 상태를 소유하고, 헤더 검색 버튼·404의 `검색 ⌘K` 버튼은 `use(PaletteContext).open()`만 호출 | `state-lift-state`, `state-decouple-implementation`, `react19-no-forwardref` |
| 카테고리·스택 칩 필터 | 상태는 URL(`?category=`)이 전부. 렌더 중에 `searchParams`에서 파생하고 effect로 동기화하지 않는다. 정적 export에서 `useSearchParams`는 `<Suspense>` 경계 필요 | `rerender-derived-state-no-effect` |

### 번들·렌더링 (초기 JS ≤ 120KB 목표)

| 지금 코드 | 바꿀 것 | 근거 |
|---|---|---|
| `layout.tsx`에서 AdSense·GoatCounter를 모든 페이지에 `<script async>`로 로드 | AdSense는 제거(디자인·기획 의견) 또는 글 상세만. GoatCounter는 `next/script` `lazyOnload` | `bundle-defer-third-party`, PRD NF-01·F-SE-09 |
| `Header.tsx` 전체가 `"use client"`(현재 경로 표시 때문) | 헤더는 서버 컴포넌트로 두고 `NavLink`(usePathname)·`ThemeToggle`·`SearchTrigger`만 클라이언트 섬으로 | `server-serialization` |
| `not-found.tsx`가 `"use client"` | 서버 컴포넌트로. 최신 글 3편은 빌드 타임 데이터 | 불필요한 클라이언트 경계 |
| (신규) 팔레트·검색 인덱스 | 팔레트 UI와 `/search-index.json`은 처음 열 때 로드하고, 트리거에 hover·focus하면 미리 받는다 | `bundle-dynamic-imports`, `bundle-conditional`, `bundle-preload` |
| (신규) Giscus | 댓글 영역이 뷰포트에 들어올 때 로드. 테마 변경은 `postMessage` | `bundle-dynamic-imports`, F-PO-08 |
| 테마 | 다크 기본 + 첫 페인트 전 인라인 스크립트(next-themes가 처리)로 깜빡임 없음 유지 | `rendering-hydration-no-flicker` |
| 읽기 진행률·TOC | 진행률은 CSS scroll-driven(JS 0), TOC는 IntersectionObserver 하나. scroll 리스너 금지(v1.1 규칙과 같음) | `client-passive-event-listeners` |

## 4. 이번에 바꾼 파일

- `system/components.css`: 경력 화살표 위치(V2), 썸네일 비율 1200:630, 경로 `~` 터치 영역, `.nowrap`
- `site/about.html`: 직무·연차 줄바꿈(V3)
- `site/*.html`: 썸네일 `width/height` 112×84 → 128×67 (CLS 방지용 비율 일치)

## 5. 남은 결정

1. **V1 썸네일:** A안(OG 자동 생성 이미지를 목록에도) vs B안(목록에서 썸네일 제거)
2. 08에서 넘어온 기획 확인 2건: F-PO-06 관련 글 규칙, About ↔ Projects 범위
3. `agent-browser` CLI 설치 여부(설치하면 이후 QA를 E2E 스크립트로 반복 가능. `npm i -g agent-browser && agent-browser install`)
