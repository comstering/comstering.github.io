# 29. 기획 답변: 히어로 확정 반영과 남은 디자인 정리 (28번 후속)

작성: 기획 세션 · 2026-11-05
대상: [28-hero-copy-design-response.md](./28-hero-copy-design-response.md) 8장
반영: [`prd/004_portfolio_projects-and-about.md`](../prd/004_portfolio_projects-and-about.md) 5.2·5.6, [`prd/001_site_master-plan.md`](../prd/001_site_master-plan.md) 6.2

## 1. 반영 완료

| 항목 | 내용 |
| --- | --- |
| PRD-004 5.2 | 히어로 확정값 기재: `$ history` + 커서, h1 `sr-only` `Comstering's Dev Notes`, 문구 `실행해 본 것만 씁니다`, `site.yaml`(`title`·`command`·`tagline`), 첫 화면 수치(437/458px). 0장 "결정 대기" 없음 |
| PRD-004 5.6 | 홈 `description`(RSS 설명 겸용): "실행해 본 것만 씁니다. DevOps · Cloud Native 개발 블로그." + 다루는 주제 한 줄, 80~160자 |
| PRD-001 6.2 | 작성 원칙 "실행해 본 것만"을 추가. 홈 문구가 독자에게 하는 약속이라 글 작성 규칙으로 둔다 |
| 28번 Q1·Q2 | 종결(Q2는 g3를 쓰지 않아 해당 없음) |

## 2. 디자인에 남은 것

| # | 우선 | 내용 |
| --- | --- | --- |
| D-12 | 권장 | **홈 OG 이미지:** 지금 홈 OG(`src/app/og.png`)는 `Comstering's Dev Notes` + `blog`, `kubernetes, eks, terraform`이다. 히어로와 같은 말투로 `$ history` / `실행해 본 것만 씁니다`를 넣을지 `og.html`에 홈 카드 시안을 추가해 정해 달라. 넣지 않는 쪽이 낫다고 보면 그 이유만 적어도 된다 |
| D-13 | 필수 | **`DESIGN.md` Phase 2 반영안:** 히어로 터미널 패턴(명령 줄·커서·`sr-only` h1), 헤더 검색 팔레트, 홈 사이드바 3블록(1024 미만 배치 포함), About 전부 펼침·회사 바로가기·밀도 V3, About 인쇄 규칙(`@media print`), 폴백 글꼴 `size-adjust`. 시안이 확정됐으니 개발 PR-19~21이 기준으로 삼을 수 있게 `DESIGN.md`에 넣을 내용을 정리해 달라(반영 자체는 기존 흐름대로) |
| D-14 | 필수 | **디자인 문서 정리:** `STATUS.md`의 2026-11-04 인수인계 절에 남은 히어로 비교 도구(`?hero=…`) 안내, 22번 `resume.html` 언급 등 지난 내용 정리. `cowork/design` 미커밋 변경(22~29번, 시안, `tools/`, `system/`)은 작성자 확인 후 별도 PR로 |
| — | 확인 | **O-8**(확대 `<dialog>` 배경 스크롤 잠김 없음): 개발에 보낼지 정해 달라. 기획 의견은 **보낸다**(Phase 2 검색 팔레트도 같은 모달이라 PR-20에서 함께 처리하면 비용이 작다) |
| — | 작성자 | 실제 Chrome 인쇄 미리보기(⌘P)로 About A4 5쪽 확인(25번 요청, 작성자에게 다시 전달함) |

## 3. 개발에 넘어가는 값 (PRD-004 기준)

28번 8장 표와 같다. 추가로 PRD-004 5.6의 `description` 문구와 `WebSite` 구조화 데이터.
