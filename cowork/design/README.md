# cowork/design

디자인 담당(Claude Code)의 작업 공간. 기획서(PRD)를 사용자가 보기 편한 화면으로 옮기기 위한 분석, 제안, 시안을 여기서 관리한다.

## 문서 관계

| 문서 | 역할 | 권한 |
|---|---|---|
| `/DESIGN.md` (저장소 최상단) | 확정된 디자인 시스템. 코드가 따르는 **단일 기준** | 합의된 내용만 반영 |
| [PRD](https://claude.ai/artifact/XdKSaRVCspv3yckqG8TKAT) | 무엇을, 왜 만드는지 (기획) | 기획 세션 |
| `cowork/design/*` | DESIGN.md를 어떻게 바꾸고 넓힐지에 대한 **제안**과 시안 | 디자인 세션 |

흐름: PRD 요구사항 → `cowork/design`에서 제안·시안 → 리뷰·합의 → `DESIGN.md`에 반영 → 구현.
`cowork/design`의 내용은 합의 전까지 구현 기준이 아니다.

## 파일 목록

| 파일 | 내용 |
|---|---|
| [CONTEXT.md](./CONTEXT.md) | **새 세션이 가장 먼저 읽는 문서.** 역할, 문서 지도, 확정된 디자인 결정, 코드 규칙, 검증 방법, 작업 규칙 |
| [STATUS.md](./STATUS.md) | **지금 상태와 다음 작업.** 열린 항목, 확인된 것, 변경 이력. 작업이 끝날 때마다 갱신 |
| [archive/phase0-summary.md](./archive/phase0-summary.md) | **Phase 0 디자인 요약 보관본.** 01~11번(진단·방향·명세·시안·기획 검토·v1.3·사용자 결정)의 핵심 |
| [archive/phase1-summary.md](./archive/phase1-summary.md) | **Phase 1 디자인 요약 보관본.** 결과, 확정 결정, 구현 검토 결과, 함정, 못 한 것, Phase 2로 넘기는 것. |
| [archive/phase2-summary.md](./archive/phase2-summary.md) | **Phase 2 디자인 요약 보관본.** 18~37번(홈=블로그·About=경력, 히어로·검색·인쇄·OG·파비콘 결정, PR-19~22 검토, 함정, 못 한 것, Phase 3로 넘기는 것) |
| [archive/README.md](./archive/README.md) | **보관 폴더 안내.** 요약본 3개, 원문이 남은 12·19·21·25·31·32·36번, 삭제한 번호의 위치와 복구 방법 |
| `tools/check-site.mjs` | 시안 8개 화면(index·post·tag·about·projects·project·tags·404) × PC·모바일 검사 스크립트 |
| `tools/review-impl.mjs` | 구현(`out/`)과 시안 대조 측정(36번) |
| `tools/build-favicon-final.mjs` | 확정 파비콘(`favicon/final/`)의 `favicon.ico`(16·32·48)·`apple-icon.png`(180)를 소스 SVG에서 생성(35번) |
| `tools/measure-about-first.mjs` | About 첫 화면 요소 위치(360×640, 1280×720)와 인쇄(A4) 쪽수 측정(31번) |
| `tools/build-phase2-mockups.py` | `site/about.html`·`site/index.html`·`system/search-index.js` 생성기. 데이터 원본은 `src/app/about/page.tsx`, `posts/`, `content/series.yaml`. 생성물이라 고칠 때는 스크립트를 고친다(홈 글 목록은 index.html에서 읽어 재사용) |
| `tools/measure-fallback-cls.mjs` | D-5 About·홈 CLS 재현·검증(폴백 글꼴 폭 보정 전후) |
| [design-system.html](./design-system.html) | **디자인 시스템 문서**: 브랜드, 색, 타이포, 간격, 컴포넌트, 패턴, 화면 목록. 브라우저로 열어서 본다 |
| `site/*.html` | **최종 화면 시안 9종**: home, post, projects, project, about, tags, tag, 404, og. 그 밖에 `phase1-compare.html`(Phase 1 비교), `og-render.html`(OG 렌더용 단독 페이지)과 생성 결과 `og/*.png` |
| `system/` | 시안이 공유하는 `tokens.css` · `base.css` · `components.css` · `app.js` · `giscus-{dark,light}.css` |
| [04-design-system.md](./04-design-system.md) | 디자인 시스템 명세 (v1.3 + v1.4 D5) (DESIGN.md 반영 후보) |

### 보는 방법

`design-system.html`을 브라우저로 연다. 맨 아래 `09 screens`에서 각 화면으로 이동할 수 있다. 이미지는 `../../public`을 상대 경로로 참조하므로 저장소 안에서 열어야 보인다. 모든 화면에서 `⌘K`(또는 `/`)로 검색할 수 있고, 오른쪽 위 버튼으로 테마를 바꿀 수 있다.

## 작업 규칙

[`.claude/rules/design-docs.md`](../../.claude/rules/design-docs.md)에 있다(번호 문서, 시안, `✅ 반영됨` 표시, 인용 규칙). 커밋·PR 시점은 [commit-and-pr.md](../../.claude/rules/commit-and-pr.md).

_최종 갱신: 2026-11-08 (Phase 2 종료·보관: 18~37번 중 25·31·32·36번만 archive로, 나머지는 삭제. 현재 상태는 STATUS.md)_
