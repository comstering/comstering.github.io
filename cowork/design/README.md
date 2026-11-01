# cowork/design

디자인 담당(Claude, Cowork)의 작업 공간. 기획서(PRD)를 사용자가 보기 편한 화면으로 옮기기 위한 분석, 제안, 시안을 여기서 관리한다.

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
| [archive/README.md](./archive/README.md) | **보관 폴더 안내.** 요약본 2개, 원문이 남은 12·19·21번, 삭제한 번호(01~03, 05~11, 13~17, 20)의 위치와 Git 복구 방법 |
| `tools/check-site.mjs` | 시안 8개 화면 × PC·모바일 검사 스크립트 |
| [design-system.html](./design-system.html) | **디자인 시스템 문서**: 브랜드, 색, 타이포, 간격, 컴포넌트, 패턴, 화면 목록. 브라우저로 열어서 본다 |
| `site/*.html` | **최종 화면 시안 9종**: home, post, projects, project, about, tags, tag, 404, og. 그 밖에 `phase1-compare.html`(Phase 1 비교), `og-render.html`(OG 렌더용 단독 페이지)과 생성 결과 `og/*.png` |
| `system/` | 시안이 공유하는 `tokens.css` · `base.css` · `components.css` · `app.js` · `giscus-{dark,light}.css` |
| [04-design-system.md](./04-design-system.md) | 디자인 시스템 명세 (v1.3 + v1.4 D5) (DESIGN.md 반영 후보) |
| [12-phase1-design-response.md](./archive/12-phase1-design-response.md) | **Phase 1 답변**: categories B안 추천, 목록 썸네일 제거 추천(09 A안 철회), PRD-003 의견 E1~E9, v1.4 반영 |
| [18-planning-request-phase2.md](./18-planning-request-phase2.md) | **기획 요청: Phase 2 디자인 D-1~D-4 (2026-10-30 개정, About 강화).** About 경력 시안(관련 글·앵커·펼침), 이력서 시안, About 갱신, 홈 히어로·대표 프로젝트. `/projects`·상세·Mermaid는 취소. 기준 PRD-004 |
| [19-design-answer-q9-font-a11y.md](./archive/19-design-answer-q9-font-a11y.md) | **디자인 답변(개발 Q9): 글꼴 로딩·접근성 98→100·게이트 문구.** 단일 서브셋+`swap` 권장(측정), 접근성 3건(칩 숫자 대비·복사 버튼 이름·About 제목 단계), 시안 결함 2건 수정 |
| [21-impeccable-audit.md](./archive/21-impeccable-audit.md) | **impeccable audit(컴포넌트~페이지).** 합계 16/20 Good: 접근성 3·성능 3·테마 4·반응형 3·구현 3. P1 1건(코드 블록 키보드 접근), P2 2건(글자 200% 넘침, 터치 대상) → 개발 Q14. 번들 감지기는 실행하지 못함 |

### 보는 방법

`design-system.html`을 브라우저로 연다. 맨 아래 `09 screens`에서 각 화면으로 이동할 수 있다. 이미지는 `../../public`을 상대 경로로 참조하므로 저장소 안에서 열어야 보인다. 모든 화면에서 `⌘K`(또는 `/`)로 검색할 수 있고, 오른쪽 위 버튼으로 테마를 바꿀 수 있다.

## 작업 규칙

- 파일명은 `NN-주제.md`. 시안은 `site/<page>.html`이고, 모든 시안은 `system/`의 토큰과 컴포넌트만 쓴다.
- PRD 기능 ID(F-PO-03 등)와 문제 ID(P1 등)를 그대로 인용해 추적 가능하게 한다.
- DESIGN.md에 반영된 항목은 해당 문서에 `✅ 반영됨 (날짜)` 표시.

_최종 갱신: 2026-10-31 (v1.4 확정. impeccable audit는 21번. 현재 상태는 STATUS.md)_
