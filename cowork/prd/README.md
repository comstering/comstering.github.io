# PRD (기획서) 모음

comstering.github.io를 발전시키기 위한 기획서를 모아 두는 곳이다. 새 기획서는 아래 규칙대로 이 디렉토리에 추가하고, 맨 아래 목록도 같이 갱신한다.

## 파일명 규칙

```
<번호>_<영역>_<주제>.md
예) 003_blog_reading-experience.md
```

| 부분 | 규칙 | 예 |
| --- | --- | --- |
| 번호 | 3자리, 추가 순서대로 1씩 증가. 재사용하지 않음 | `001`, `002` |
| 영역 | 이 기획서가 발전시키는 제품 영역. 아래 표 중 하나만 사용 | `blog` |
| 주제 | 영문 소문자 kebab-case, 2–5단어. 무엇을 만드는지 드러나게 | `reading-experience` |

### 영역 코드

| 코드 | 대상 | 주로 다루는 기능 ID |
| --- | --- | --- |
| `site` | 사이트 전체 방향, 여러 영역에 걸친 마스터 기획 | 전체 |
| `blog` | 글 목록·글 상세·읽기 경험·콘텐츠 작성 | F-HM, F-PO |
| `portfolio` | Projects, About, 이력서 | F-PJ, F-AB |
| `discovery` | 검색, 태그, 시리즈, 탐색 | F-SR |
| `seo` | 메타데이터, OG, RSS, sitemap, 색인 | F-SE-01 ~ 05 |
| `platform` | 빌드, 배포, CI, 콘텐츠 파이프라인, 성능, 보안 | F-SE-06 ~ 09, NF |
| `design` | 디자인 시스템, 공통 UI, 테마, 접근성 | F-GL, DESIGN.md |

## 문서 머리말

모든 기획서는 첫머리에 아래 frontmatter를 둔다.

```yaml
---
id: PRD-003                 # 파일 번호와 같게
area: blog                  # 영역 코드
title: 글 상세 읽기 경험 개선
status: draft               # draft | review | approved | in-progress | done | dropped
owner: comstering
created: 2026-10-27
updated: 2026-10-27
related: [PRD-001]          # 상위·관련 기획서
---
```

영역 PRD는 마스터 PRD(001)의 기능 ID(F-PO-03 등)를 그대로 쓰고, 기능 명세 → Success Criteria → 작업 목록 순으로 상세화한다.

## 목록

| ID | 파일 | 영역 | 제목 | 상태 |
| --- | --- | --- | --- | --- |
| PRD-001 | [001_site_master-plan.md](./001_site_master-plan.md) | site | 전체 기획서 (마스터 PRD) v1.5 | review |
| PRD-002 | [002_platform_phase0-stabilization.md](./002_platform_phase0-stabilization.md) | platform | Phase 0 안정화 (배포 재개 전 정리) | done |
| PRD-003 | [003_blog_reading-experience.md](./003_blog_reading-experience.md) | blog | Phase 1 읽기 경험 (글 상세·홈 탐색·이미지) | approved |

### 작성 예정 (마스터 PRD 로드맵 기준)

| 예정 파일명 | 로드맵 단계 |
| --- | --- |
| `004_portfolio_projects-and-about.md` | Phase 2 포트폴리오 |
| `005_discovery_search-and-tags.md` | Phase 3 탐색 |
