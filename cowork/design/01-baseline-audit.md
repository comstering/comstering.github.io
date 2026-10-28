# 01. 현황 진단 — DESIGN.md와 실제 코드

기준: 저장소 2026-10-27 상태, `DESIGN.md`, `src/app/globals.css`, `src/components/**`.

## 1. 요약

- **좋은 점:** 방향(Terminal Graphite), 토큰, 금지 패턴이 문서화되어 있고, 홈과 레이아웃 셸은 이미 이 기준을 따른다. 색 대비도 대부분 충분하다.
- **빈 곳:** DESIGN.md는 **홈 목록까지**만 구체적이다. PRD가 새로 요구하는 화면(Projects, 명령 팔레트, 태그 페이지, 404, OG 이미지)과 요소(목차, 코드 블록 헤더, 콜아웃, 시리즈 박스, 저자 박스)에 대한 규칙이 없다.
- **어긋난 점:** 터치 영역(44px)과 360px 헤더 한 줄 유지는 현재 컴포넌트 크기로는 만족하지 못한다. About·글 상세는 금지 패턴이 남아 있다.

## 2. DESIGN.md 단계별 진행

| 단계 | 내용 | 상태 |
|---|---|---|
| 1 | 토큰·폰트·본문 타이포·코드 하이라이트 | 완료 |
| 2 | 공통 UI(Container, IconButton, Chip, Input) + Header/Footer | 완료 |
| 3 | 홈 세로 리스트, 필터 | 완료 |
| 4 | 글 상세(본문, 목차, 이전/다음) | **미착수** |
| 5 | About, 404 | **미착수** |
| 6 | 접근성/반응형 검증 | 미착수 |

## 3. 색 대비 측정 (WCAG 2.2)

| 조합 | 라이트 | 다크 | 판정 |
|---|---|---|---|
| `fg` / `canvas` | 17.0 | 16.2 | 충분 |
| `mute` / `canvas` | 5.19 | 6.53 | AA 통과 |
| `mute` / `surface-2` (hover 배경 위 보조 글자) | 4.81 | — | AA 통과(여유 적음) |
| `accent` / `canvas` (링크) | 4.99 | 13.4 | AA 통과. 라이트는 여유 적음 |
| `accent-on` / `accent` (CTA 버튼 글자) | 5.43 | 11.9 | AA 통과 |
| syntax-comment / `code-bg` | 4.94 | 5.33 | AA 통과 |
| **`line` / `canvas`** | **1.26** | **1.30** | 구분선으로는 OK. **입력창·칩처럼 조작 가능한 요소의 경계로는 3:1 미달** (WCAG 1.4.11) |

→ 조작 요소용 경계 토큰(`line-strong`)이 필요하다. [02-direction.md §3.1](./02-direction.md) 참고.

## 4. 컴포넌트 점검

| 컴포넌트 | 현재 | PRD/NF 기준 | 이슈 |
|---|---|---|---|
| `Header` | 높이 64px, 내비 `posts` `about` 2개 + 테마 토글 | F-GL-01: `projects` + 검색 버튼 추가, 360px에서 한 줄 | 아래 §5 계산상 360px에서 넘침 |
| `Chip` | `py-1.5 text-xs` ≈ 높이 30px | NF-04: 터치 44×44px | 미달 |
| `IconButton` | 36×36px | NF-04 | 미달 |
| `Input` | 높이 ≈ 50px, `border-line` | NF-03 | 경계 대비 1.26:1 (포커스 시에만 accent) |
| `Footer` | © + github 링크 | F-GL-03: GitHub, LinkedIn, 이메일, RSS | 링크 부족 |
| `PostListItem` | 메타(모노) → 제목 → 설명 2줄 → 태그 → 썸네일 | F-HM-03 | 기준 충족. 카테고리를 `/`로 이어 붙임(→ 단일 category로 바뀌면 정리) |
| 홈 히어로 | "Comstering's Dev Notes" + 한 줄 소개 | F-HM-01: 직무 한 줄, 스택 ≤5, About·Projects CTA | 포트폴리오 역할 부족 |

## 5. 360px 헤더 폭 계산

가용 폭 = 360 − 좌우 패딩 20×2 = **320px**. JetBrains Mono 14px ≈ 글자당 8.4px, 13px ≈ 7.8px.

| 요소 | 폭(13px 기준) |
|---|---|
| 로고 `~/comstering_` (13자) | ≈ 101px |
| `posts` `projects` `about` (18자) | ≈ 140px |
| 내비 간격 12px × 3 | 36px |
| 검색·테마 아이콘 36px × 2 + 간격 | ≈ 80px |
| 로고–내비 최소 간격 | 16px |
| **합계** | **≈ 373px > 320px** |

→ 모바일에서는 로고를 `~/_` 형태로 줄여야 한 줄이 유지된다(≈ 295px). [02-direction.md §4.1](./02-direction.md)

## 6. 금지 패턴 잔존 (grep)

| 파일 | 주요 위반 |
|---|---|
| `app/about/page.tsx` (592줄) | `dark:text-gray-*` 20, `sky-500` 15, `shadow-sm/md` 15, `gray-*` 다수 |
| `components/Bio.tsx`, `ExperienceItem.tsx` | `sky-500`, `dark:bg-gray-*`, `shadow-sm` |
| `app/posts/[id]/page.tsx` | `dark:border-gray-*` 등 (PRD P11 포함) |

About은 단순 색 교체가 아니라 **구조 재설계**(요약 우선, 프로젝트 분리)와 함께 다시 만드는 편이 낫다.

## 7. DESIGN.md에 없는 것 (PRD가 요구)

| 영역 | PRD ID | 필요한 규칙 |
|---|---|---|
| 목차 TOC | F-PO-03 | 위치, 폭, 활성 표시, 모바일 접이식 |
| 코드 블록 헤더 | F-PO-04 | 파일명·언어 라벨, 복사 버튼, 줄 하이라이트 색 |
| 콜아웃 | F-PO-12 | NOTE/WARNING 색 — 포인트 색 1개 원칙과 충돌 |
| 시리즈 박스, 저자 박스, 이전/다음, 관련 글 | F-PO-05~09 | 리스트 원칙 안에서의 표현 |
| 읽기 진행률 | F-PO-10 | 색, 두께, 모션 |
| 이미지 라이트박스 | F-PO-11 | 오버레이 배경 토큰 |
| Projects 목록·상세 | F-PJ-02, 03 | 숫자 강조, 스택 칩, STAR 구조, 다이어그램 |
| About 첫 화면 | F-AB-01, 02 | 요약 블록, 타임라인 |
| 명령 팔레트 | F-SR-01 | 모달 스타일(그림자 금지 규칙 안에서), 결과 그룹 |
| 태그 페이지 | F-SR-04 | 목록 형태 |
| OG 이미지 | F-SE-02 | 1200×630 템플릿 |
| 오버레이·레이어 | — | `z-index`, 딤 배경 토큰 |
| 상태 색 | — | 성공/경고 (복사 완료, merged 표시) |
