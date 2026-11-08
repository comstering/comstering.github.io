---
paths:
  - "cowork/prd/**"
---

# PRD 문서 규칙

## 파일명

```
<번호>_<영역>_<주제>.md
예) 004_portfolio_projects-and-about.md
```

| 부분 | 규칙 | 예 |
| --- | --- | --- |
| 번호 | 3자리, 추가 순서대로 1씩 증가. 재사용하지 않음 | `001`, `002` |
| 영역 | 이 기획서가 발전시키는 제품 영역. 아래 표 중 하나만 사용 | `blog` |
| 주제 | 영문 소문자 kebab-case, 2–5단어. 무엇을 만드는지 드러나게 | `reading-experience` |

| 영역 코드 | 대상 | 주로 다루는 기능 ID |
| --- | --- | --- |
| `site` | 사이트 전체 방향, 여러 영역에 걸친 마스터 기획 | 전체 |
| `blog` | 글 목록·글 상세·읽기 경험·콘텐츠 작성 | F-HM, F-PO |
| `portfolio` | Projects, About, 이력서 | F-PJ, F-AB |
| `discovery` | 검색, 태그, 시리즈, 탐색 | F-SR |
| `seo` | 메타데이터, OG, RSS, sitemap, 색인 | F-SE-01 ~ 05 |
| `platform` | 빌드, 배포, CI, 콘텐츠 파이프라인, 성능, 보안 | F-SE-06 ~ 09, NF |
| `design` | 디자인 시스템, 공통 UI, 테마, 접근성 | F-GL, DESIGN.md |

## 머리말

모든 기획서는 첫머리에 아래 frontmatter를 둔다.

```yaml
---
id: PRD-005                 # 파일 번호와 같게
area: blog                  # 영역 코드
title: 글 상세 읽기 경험 개선
status: draft               # draft | review | approved | in-progress | done | dropped
owner: comstering
created: 2026-10-27
updated: 2026-10-27
related: [PRD-001]          # 상위·관련 기획서
---
```

## 작성·관리

- 영역 PRD는 마스터 PRD(001)의 기능 ID(F-PO-03 등)를 그대로 쓰고, 기능 명세 → Success Criteria → 작업 목록 순으로 상세화한다.
- 새 기획서를 추가하면 `cowork/prd/README.md`의 목록도 같이 갱신한다.
- 끝난 Phase의 기획서는 요약본만 `archive/`에 남기고 원문은 삭제한다(원문은 git 기록).
