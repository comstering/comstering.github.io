# cowork/design/archive

Phase 0~2 디자인 기록의 보관 폴더. 요약본과, 요약에 없는 세부가 남아 코드·E2E·문서에서 인용되는 원문 7개만 둔다. 나머지 원문은 삭제했고 Git에서 복구한다.

## 요약본

| 파일 | 범위 |
|---|---|
| [phase0-summary.md](./phase0-summary.md) | 01~11번: 진단·방향·명세·시안·기획 검토·v1.3·사용자 결정 |
| [phase1-summary.md](./phase1-summary.md) | 12~21번: categories·썸네일·글꼴·접근성 결정, 구현 검토, 함정 |
| [phase2-summary.md](./phase2-summary.md) | 18~37번: 홈=블로그·About=경력, 히어로·검색·인쇄·OG·파비콘 결정, PR-19~22 검토, 함정 |

## 원문이 남은 것

| 번호 | 파일 | 남긴 이유 |
|---|---|---|
| 12 | [12-phase1-design-response.md](./12-phase1-design-response.md) | PRD-003 의견 E1~E9 전체와 실측. 코드·PRD가 "디자인 12번 E3·E8"로 인용 |
| 19 | [19-design-answer-q9-font-a11y.md](./19-design-answer-q9-font-a11y.md) | 글꼴 3방식 측정, CLS 미검증 사유, About CLS 다음 단계. PRD-004 D-5가 인용 |
| 21 | [21-impeccable-audit.md](./21-impeccable-audit.md) | 5차원 점수와 P1~P3 전체. 코드·E2E가 "디자인 21번 P1"로 인용 |
| 25 | [25-phase2-revision-design-response.md](./25-phase2-revision-design-response.md) | About·인쇄·검색·홈 사이드바의 치수·규칙 전체. 코드·E2E·개발 STATUS가 "디자인 25번 2·3·4·6장"으로 인용 |
| 31 | [31-design-response-d12-d15.md](./31-design-response-d12-d15.md) | About 현재 회사 제거(D-15), 홈 OG 3종 비교(D-12), O-8 발송. 코드가 "디자인 31번 3장·5장"으로 인용 |
| 32 | [32-designmd-phase2-proposal.md](./32-designmd-phase2-proposal.md) | `DESIGN.md` Phase 2 반영안(히어로·검색·홈·About·인쇄·글꼴 폴백). 코드 주석이 "디자인 32번 홈·About·인쇄·글꼴 폴백"으로 인용 |
| 36 | [36-design-review-pr19-21.md](./36-design-review-pr19-21.md) | PR-19~21 측정 대조와 수정 요청 4건의 근거(3.1 직함, 3.2 인쇄 순서, 3.3 히어로 여백). 코드·E2E가 인용. 스크린샷은 `../review/` |

## 삭제한 번호 (코드·문서가 번호로만 인용할 때 찾아가는 곳)

복구: `git show 0012ede:cowork/design/<파일명>` (파일명은 아래 표)

| 번호 | 파일명 | 내용이 남은 곳 |
|---|---|---|
| 01 | 01-baseline-audit.md | phase0-summary 2장 |
| 02 | 02-direction.md | phase0-summary 2·3장 |
| 03 | 03-references.md | phase0-summary 2장 |
| 05 | 05-planning-review.md | phase0-summary 3장(R1~R10) |
| 06 | 06-review-response.md | phase0-summary 3장 |
| 07 | 07-planning-rereview.md | phase0-summary 2장 |
| 08 | 08-ux-review.md | phase0-summary 3장(H1~L2) |
| 09 | 09-final-review.md | phase0-summary 2·5장(V1) |
| 10 | 10-planning-decisions.md | phase0-summary 3장(D1~D6) |
| 11 | 11-planning-request-categories.md | phase0-summary 5장, phase1-summary 3장 |
| 13 | 13-planning-response-phase1.md | phase1-summary 3장 |
| 14 | 14-thumbnail-decision-request.md | phase1-summary 3장(썸네일 제거) |
| 15 | 15-planning-final-phase1.md | phase1-summary 3장 |
| 16 | 16-design-answer-filter-flash.md | phase1-summary 3장(필터 깜빡임, 측정값 포함) |
| 17 | 17-design-review-pr9-pr12.md | phase1-summary 4장 |
| 20 | 20-design-review-pr13-pr14.md | phase1-summary 4장 |

### Phase 2 (2026-11-08 삭제)

복구: `git show 23b6d23:cowork/design/<파일명>` (삭제 직전 `main`)

| 번호 | 파일명 | 내용이 남은 곳 |
|---|---|---|
| 18 | 18-planning-request-phase2.md | phase2-summary 2장(대부분 24번으로 대체됨) |
| 22 | 22-phase2-design-response.md | phase2-summary 3장(유효분: 기술 태그 없음, 기간 표기, 글꼴 폴백 `size-adjust`). 접이식·관련 글·`resume.html`·홈 대표 3건은 철회됨 |
| 23 | 23-planning-response-phase2.md | phase2-summary 2장(유효분 Q2·Q5·Q7·Q8만) |
| 24 | 24-planning-request-phase2-revision.md | phase2-summary 3장(역할 분리·링크 없음·전부 펼침·이력서=인쇄 PDF·검색 결정) |
| 26 | 26-planning-response-phase2-revision.md | phase2-summary 3장(사이드바 위치·검색 보조 줄·글 수·`검색 (search)`) |
| 27 | 27-planning-request-hero-copy.md | phase2-summary 3장(히어로) |
| 28 | 28-hero-copy-design-response.md | phase2-summary 3장(히어로 확정과 첫 글 수치). 비교 16조합 전체는 Git에서 |
| 29 | 29-planning-response-hero-final.md | phase2-summary 3장 |
| 30 | 30-planning-request-about-bio.md | phase2-summary 3장(About 현재 회사 제거) |
| 33 | 33-planning-response-designmd.md | phase2-summary 3장(원칙 4 확정 문장) |
| 34 | 34-handoff-to-develop.md | phase2-summary 3장(확정 사항 표). 개발 PR-18~22로 소화됨 |
| 35 | 35-favicon-proposal.md | phase2-summary 3장(파비콘 C `c_`). 후보 렌더는 이미 삭제됨 |
| 37 | 37-design-review-pr22-favicon.md | phase2-summary 4장 |

04번(`../04-design-system.md`)은 현역이라 `archive/` 밖에 있다.
