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
| `tools/check-site.mjs` | 시안 8개 화면(index·post·tag·about·projects·project·tags·404) × PC·모바일 검사 스크립트 |
| `tools/review-impl.mjs` | 구현(`out/`)과 시안 대조 측정(36번) |
| `tools/render-favicons.mjs` | 파비콘 후보 SVG를 16·32·48·180px PNG로 렌더(35번) |
| `tools/build-favicon-final.mjs` | 확정 파비콘(`favicon/final/`)의 `favicon.ico`(16·32·48)·`apple-icon.png`(180)를 소스 SVG에서 생성(35번) |
| `tools/measure-about-first.mjs` | About 첫 화면 요소 위치(360×640, 1280×720)와 인쇄(A4) 쪽수 측정(31번) |
| `tools/build-phase2-mockups.py` | `site/about.html`·`site/index.html`·`system/search-index.js` 생성기. 데이터 원본은 `src/app/about/page.tsx`, `posts/`, `content/series.yaml`. 생성물이라 고칠 때는 스크립트를 고친다(홈 글 목록은 index.html에서 읽어 재사용) |
| `tools/measure-fallback-cls.mjs` | D-5 About·홈 CLS 재현·검증(폴백 글꼴 폭 보정 전후) |
| [design-system.html](./design-system.html) | **디자인 시스템 문서**: 브랜드, 색, 타이포, 간격, 컴포넌트, 패턴, 화면 목록. 브라우저로 열어서 본다 |
| `site/*.html` | **최종 화면 시안 9종**: home, post, projects, project, about, tags, tag, 404, og. 그 밖에 `phase1-compare.html`(Phase 1 비교), `og-render.html`(OG 렌더용 단독 페이지)과 생성 결과 `og/*.png` |
| `system/` | 시안이 공유하는 `tokens.css` · `base.css` · `components.css` · `app.js` · `giscus-{dark,light}.css` |
| [04-design-system.md](./04-design-system.md) | 디자인 시스템 명세 (v1.3 + v1.4 D5) (DESIGN.md 반영 후보) |
| [12-phase1-design-response.md](./archive/12-phase1-design-response.md) | **Phase 1 답변**: categories B안 추천, 목록 썸네일 제거 추천(09 A안 철회), PRD-003 의견 E1~E9, v1.4 반영 |
| [18-planning-request-phase2.md](./18-planning-request-phase2.md) | **기획 요청: Phase 2 디자인 D-1~D-4 (2026-10-30 개정, About 강화).** About 경력 시안(관련 글·앵커·펼침), 이력서 시안, About 갱신, 홈 히어로·대표 프로젝트. `/projects`·상세·Mermaid는 취소. 기준 PRD-004 |
| [19-design-answer-q9-font-a11y.md](./archive/19-design-answer-q9-font-a11y.md) | **디자인 답변(개발 Q9): 글꼴 로딩·접근성 98→100·게이트 문구.** 단일 서브셋+`swap` 권장(측정), 접근성 3건(칩 숫자 대비·복사 버튼 이름·About 제목 단계), 시안 결함 2건 수정 |
| [23-planning-response-phase2.md](./23-planning-response-phase2.md) | 기획 답변(22번 Q1~Q8). **2026-11-02 재검토로 일부 철회**(관련 글 확대, 이력서 3쪽, 접이식 채택 등). 유효: 기술 태그 없음, 사진 유지, 기간 표시, `shortTitle` 없음 |
| [24-planning-request-phase2-revision.md](./24-planning-request-phase2-revision.md) | **기획 요청: Phase 2 재검토 반영(D-6~D-10).** 홈=블로그·About=경력, About↔블로그 링크 없음, 경력 전부 펼침, `/resume` 페이지 없이 About 인쇄 → PDF, 홈 히어로 3안·사이드바, 헤더 검색 팔레트 |
| [25-phase2-revision-design-response.md](./25-phase2-revision-design-response.md) | **Phase 2 재검토 디자인 답변(D-6~D-10, 24번 기획 요청).** About 전부 펼침·회사 바로가기·길이 줄이기(V3 −19%), About 인쇄 = `resume.pdf`(A4 5쪽), 헤더 검색 팔레트(글만), 홈 히어로 3안(+2b) 비교, 사이드바(인기글·시리즈·태그). 질문 Q1~Q9 |
| [36-design-review-pr19-21.md](./36-design-review-pr19-21.md) | **디자인 답변(개발 Q19~Q21): PR-19~21 구현 검토.** 빌드한 `out/`를 시안과 측정 대조. 승인 다수, **수정 요청 4건**: About 직함 360px 3줄(A안 CSS), About 인쇄 6쪽의 원인(`@media print` 소스 순서, 블록을 맨 뒤에 두면 5쪽), 홈 첫 글 +49px(히어로 위 여백 0), About 상단 경로 복원. 홈 OG 한글 정상 |
| [35-favicon-proposal.md](./35-favicon-proposal.md) | **파비콘 제안.** 현재(흰 바탕 필기체)는 탭에서 읽히지 않아 교체. 후보 5종(`>_`, `>_` 초록, `c_`, `h_`, `~/`)을 16px 탭 모사로 비교. **C `c_` 확정(작성자 11-07).** 개발에 넘길 파일은 `favicon/final/`(icon.svg·favicon.ico·apple-icon.png). 보드 `site/favicon.html` |
| [34-handoff-to-develop.md](./34-handoff-to-develop.md) | **개발 인수 문서(PR-18~22).** 확정 사항 표, PR별 입력·기준 수치, 개발이 확인할 것(홈 OG 한글, About CLS, PDF), 디자인이 확인하지 못한 것 |
| [33-planning-response-designmd.md](./33-planning-response-designmd.md) | 기획 답변(31·32번): `DESIGN.md` 원칙 4 문장 확정, 시그니처 3번 `// popular`, 홈 OG는 B 의견 |
| [31-design-response-d12-d15.md](./31-design-response-d12-d15.md) | **디자인 답변(기획 29·30번): About 현재 회사 제거·클래스101 직함(D-15, 첫 화면 −23px, 인쇄 5쪽 유지), 홈 OG 3종(D-12, 추천 B), 문서 정리(D-14), O-8 개발 발송.** 질문 Q1~Q3 |
| [32-designmd-phase2-proposal.md](./32-designmd-phase2-proposal.md) | **`DESIGN.md` Phase 2 반영안(D-13).** 붙여 넣을 문구(홈 히어로·사이드바, 검색 팔레트, About, 인쇄, 글꼴 폴백), 금지 패턴, 컴포넌트. 기획 확인 1건(원칙 4) |
| [30-planning-request-about-bio.md](./30-planning-request-about-bio.md) | 기획 요청 D-15: About 소개에서 현재 회사 제거, 클래스101 직함 변경 |
| [29-planning-response-hero-final.md](./29-planning-response-hero-final.md) | 기획 답변(28번): 히어로 확정 반영, 남은 디자인 D-12~D-14·O-8 |
| [28-hero-copy-design-response.md](./28-hero-copy-design-response.md) | **홈 히어로 2b 명령어 2종 × 문구 13개 시안(D-11, 27번 기획 요청 답변).** **확정: `$ history` + h2(문구는 11-07 "실행해 본 것만 기록합니다"로 변경).** 비교 과정(16조합 1줄·첫 글 437/458px)과 개발에 넘기는 값 |
| [26-planning-response-phase2-revision.md](./26-planning-response-phase2-revision.md) | 기획 답변(25번 Q1~Q6): 시안 채택, Q2~Q5 디자인 의견대로, Q6 작성자 수정 |
| [27-planning-request-hero-copy.md](./27-planning-request-hero-copy.md) | 기획 요청 D-11: 2b 명령어 `git`/`history` × 문구 후보 |
| [22-phase2-design-response.md](./22-phase2-design-response.md) | **Phase 2 디자인 답변(D-1~D-5).** About 접이식 경력·앵커 강조·태그 없음, 이력서 웹·A4 인쇄, 홈 대표 3건, About CLS는 `size-adjust: 86.4%`(재현 0.124~0.142 → 0.001~0.003). 질문 정리 Q1~Q11 |
| [23-planning-response-phase2.md](./23-planning-response-phase2.md) | **기획 답변: 22번 Q1~Q8.** 시안 채택, 관련 글 확대(Q1), 이력서 3쪽 규칙(Q4), 나머지는 시안대로. 시안 수정 R1·R2 |
| [21-impeccable-audit.md](./archive/21-impeccable-audit.md) | **impeccable audit(컴포넌트~페이지).** 합계 16/20 Good: 접근성 3·성능 3·테마 4·반응형 3·구현 3. P1 1건(코드 블록 키보드 접근), P2 2건(글자 200% 넘침, 터치 대상) → 개발 Q14. 번들 감지기는 실행하지 못함 |

### 보는 방법

`design-system.html`을 브라우저로 연다. 맨 아래 `09 screens`에서 각 화면으로 이동할 수 있다. 이미지는 `../../public`을 상대 경로로 참조하므로 저장소 안에서 열어야 보인다. 모든 화면에서 `⌘K`(또는 `/`)로 검색할 수 있고, 오른쪽 위 버튼으로 테마를 바꿀 수 있다.

## 작업 규칙

- 파일명은 `NN-주제.md`. 시안은 `site/<page>.html`이고, 모든 시안은 `system/`의 토큰과 컴포넌트만 쓴다.
- PRD 기능 ID(F-PO-03 등)와 문제 ID(P1 등)를 그대로 인용해 추적 가능하게 한다.
- DESIGN.md에 반영된 항목은 해당 문서에 `✅ 반영됨 (날짜)` 표시.

_최종 갱신: 2026-11-07 (v1.4 확정, Phase 2 시안 확정·개발 인수 34번. 현재 상태는 STATUS.md)_
