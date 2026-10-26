# DESIGN.md

comstering.github.io 디자인 시스템. UI를 만들거나 고칠 때 이 문서의 토큰과 규칙만 사용한다.

- 방향: **Terminal Graphite** — 개발자/인프라 감성, 다크 중심, 단일 형광 그린 포인트
- 읽기 구조: **세로 리스트** (joshwcomeau.com, toss.tech 참고). 카드 그리드를 쓰지 않는다.
- 상태: 토큰 구현 완료(`src/app/globals.css`), 레이아웃 셸(Header/Footer/ThemeToggle, `ui/Container`, `ui/IconButton`) 적용 완료. 홈/글 상세/About 마이그레이션은 다음 PR.

## 원칙

1. **글이 주인공이다.** 장식보다 읽기 편한 본문과 목록 스캔이 우선.
2. **포인트 색은 하나, 아껴서 쓴다.** `accent`는 링크, 활성 상태, 포커스, 핵심 CTA에만.
3. **토큰만 쓴다.** 컴포넌트에 hex 값, `gray-*`/`sky-*` 같은 기본 팔레트, `dark:` 색상 클래스를 쓰지 않는다. 라이트/다크는 CSS 변수가 처리한다.
4. **긴 한글 본문은 Pretendard, 라벨과 메타는 모노.** 모노스페이스는 정체성을 주는 용도이지 본문용이 아니다.

## 색상 토큰

Tailwind 유틸리티 이름 = `bg-canvas`, `text-fg`, `border-line`, `text-accent` 형태.

| 토큰 | 용도 | 라이트 | 다크 |
|---|---|---|---|
| `canvas` | 페이지 배경 | `#F3F6F4` | `#0C0F0E` |
| `surface` | 카드/패널/입력창 배경 | `#FFFFFF` | `#111715` |
| `surface-2` | 인라인 코드, hover 배경 | `#E9EEEB` | `#161D1A` |
| `fg` | 본문/제목 | `#0E1512` | `#E6EDE9` |
| `mute` | 보조 텍스트, 메타 | `#5A6B63` | `#8A9A92` |
| `line` | 구분선, 테두리 | `#D5DED9` | `#1F2A26` |
| `accent` | 링크, 활성, 포커스 | `#087A41` | `#5BF29B` |
| `accent-on` | accent 위의 글자 | `#FFFFFF` | `#06210F` |

코드 블록은 라이트에서도 어두운 배경(`code-bg`)을 유지한다. 하이라이트 색은 `--syntax-*` 토큰.

접근성: 본문(`fg`/`canvas`)과 `mute`/`canvas`는 4.5:1 이상을 목표로 한다. `accent`를 작은 글자에 쓸 때는 대비를 확인할 것.

## 타이포그래피

| 역할 | 폰트 | 비고 |
|---|---|---|
| 본문, 글 제목 | Pretendard Variable (`font-sans`) | 본문 line-height 1.8 |
| 라벨, 날짜, 태그, 내비, 히어로 한 줄 | JetBrains Mono (`font-mono`) | 소문자/숫자 중심, 대문자 남발 금지 |
| 코드 | JetBrains Mono | 0.85em |

권장 스케일: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64. 제목은 자간 `-0.02em ~ -0.04em`.

## 레이아웃과 간격

- 리스트 컬럼 최대폭 `720px`, 글 본문 `720px`(prose), 전체 컨테이너 `1120px`.
- 간격은 4px 배수. 섹션 사이 `64–96px`, 목록 항목 사이는 구분선(`line`)으로 나눈다.
- 모서리: `sm 6px`(인라인 코드), `md 10px`(코드 블록, 입력창, 칩), `lg 16px`(큰 패널). 완전 둥근(`rounded-full`)은 칩/아바타만.
- 그림자는 쓰지 않는다. 구분은 `line` 테두리와 `surface` 배경으로.

## 글 목록 (홈)

세로 한 줄 리스트. 한 항목 구조:

```
2025-07-06 · INFRA                         ┌──────┐
Karpenter로 유연한 Node Autoscaling 하기    │ thumb│
Node Group보다 빠르고 유연하게 ...           └──────┘
#karpenter #eks
```

- 왼쪽: 메타(모노, `mute`) → 제목(Pretendard 600, 20–24px) → 설명(`mute`, 2줄 말줄임) → 태그
- 오른쪽: 작은 썸네일(96–128px, 4:3, `md` 모서리). 모바일에서는 숨기거나 제목 아래로.
- hover: 제목 `accent`, 썸네일 살짝 확대 없이 테두리만 `accent`.
- 필터는 상단 칩 한 줄(스크롤 가능). 검색은 `Cmd+K` 팔레트(추후).
- 연도별 그룹 헤더(모노, `mute`)를 고려한다.

## 글 상세

- 상단: 카테고리/날짜(모노) → 제목(32–48px) → 설명 → 읽기 시간/조회수. 큰 썸네일 헤더는 제거하거나 선택.
- 본문: `prose`(토큰 연결 완료), 최대폭 720px. 우측(≥1280px)에 sticky 목차.
- 코드 블록: `code-bg`, `line` 테두리, `md` 모서리, 복사 버튼.
- 하단: 이전/다음 글, 관련 글, 댓글(giscus).

## 컴포넌트 규칙 (마이그레이션 대상)

`src/components/ui/` 공통 컴포넌트. 만든 것: `Container`, `IconButton`. 처음 쓰는 PR에서 추가할 것: `Tag`, `Chip`, `Button`, `Input`, `PostListItem`.

- variant는 boolean prop 대신 명시적 variant(`variant="primary" | "ghost"`)로. (vercel-composition-patterns)
- 포커스 링은 전역 `:focus-visible`(accent)을 사용, 제거하지 않는다.
- 아이콘은 `lucide-react`로 통일 (`react-icons`는 브랜드 아이콘이 필요할 때만).

## 모션

- 기본 `150–200ms ease-out`. hover/focus 색 전환 위주.
- 장식 애니메이션 금지. 커서 깜빡임 같은 터미널 모티프는 히어로 한 곳에서만.
- `prefers-reduced-motion`을 존중한다.

## 금지 패턴

- 컴포넌트 안의 hex 값, `dark:` 색상 클래스, `gray-*`/`sky-*`/`blue-*` 팔레트
- 카드 그리드형 글 목록, 큰 그림자, 글래스모피즘, 그라디언트 텍스트
- 보라/파랑 AI 그라디언트, 떠다니는 블롭 장식
- 포인트 색을 여러 개 쓰는 것

## 구현 위치

- 토큰: `src/app/globals.css` (`:root`, `.dark`, `@theme inline`)
- 폰트: Pretendard(`pretendard` 패키지), JetBrains Mono(`next/font/google`, `--font-jetbrains-mono`) — `src/app/layout.tsx`
- 테마 전환: `next-themes` (`attribute="class"`)
- 시안 참고: A/B/C 방향 비교 중 B 선택 (스크래치 시안은 repo에 포함하지 않음)

## 작업 순서 (단계별 PR)

1. 토큰·폰트·본문 타이포·코드 하이라이트 + 이 문서 (완료)
2. 공통 UI 컴포넌트 + Header/Footer + 레이아웃 셸 (완료)
3. 홈: 세로 리스트(PostListItem), 필터
4. 글 상세: 본문, 목차, 이전/다음 글
5. About, 404 정리
6. 접근성/반응형 검증, 문서 갱신
