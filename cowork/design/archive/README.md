# cowork/design/archive

Phase 0~1 디자인 기록의 보관 폴더. 요약본과, 요약에 없는 세부가 남아 인용되는 원문 3개만 둔다. 나머지 원문은 삭제했고 Git에서 복구한다.

## 요약본

| 파일 | 범위 |
|---|---|
| [phase0-summary.md](./phase0-summary.md) | 01~11번: 진단·방향·명세·시안·기획 검토·v1.3·사용자 결정 |
| [phase1-summary.md](./phase1-summary.md) | 12~21번: categories·썸네일·글꼴·접근성 결정, 구현 검토, 함정 |

## 원문이 남은 것

| 번호 | 파일 | 남긴 이유 |
|---|---|---|
| 12 | [12-phase1-design-response.md](./12-phase1-design-response.md) | PRD-003 의견 E1~E9 전체와 실측. 코드·PRD가 "디자인 12번 E3·E8"로 인용 |
| 19 | [19-design-answer-q9-font-a11y.md](./19-design-answer-q9-font-a11y.md) | 글꼴 3방식 측정, CLS 미검증 사유, About CLS 다음 단계. PRD-004 D-5가 인용 |
| 21 | [21-impeccable-audit.md](./21-impeccable-audit.md) | 5차원 점수와 P1~P3 전체. 코드·E2E가 "디자인 21번 P1"로 인용 |

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

04번(`../04-design-system.md`)과 18번(`../18-planning-request-phase2.md`)은 현역이라 `archive/` 밖에 있다.
