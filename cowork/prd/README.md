# PRD (기획서) 모음

comstering.github.io를 발전시키기 위한 기획서를 모아 두는 곳이다. 새 기획서는 아래 규칙대로 이 디렉토리에 추가하고, 맨 아래 목록도 같이 갱신한다.

## 작성 규칙

파일명(`<번호>_<영역>_<주제>.md`), 영역 코드, 머리말 frontmatter, 작성 순서는 [`.claude/rules/prd-docs.md`](../../.claude/rules/prd-docs.md)에 있다. 이 폴더의 파일을 다룰 때 Claude Code가 자동으로 읽는다. 커밋·PR 시점은 [commit-and-pr.md](../../.claude/rules/commit-and-pr.md).

## 목록

| ID | 파일 | 영역 | 제목 | 상태 |
| --- | --- | --- | --- | --- |
| PRD-001 | [001_site_master-plan.md](./001_site_master-plan.md) | site | 전체 기획서 (마스터 PRD) v2.1 | active |
| PRD-004 | [004_portfolio_projects-and-about.md](./004_portfolio_projects-and-about.md) | portfolio | Phase 2 포트폴리오 (About 강화·이력서 PDF·홈 블로그 정비·검색) | approved (11-02 최종) |

### 보관 (archive)

끝난 Phase의 기획서는 요약본만 archive에 남기고 원문은 삭제한다(원문은 git 기록).

| 파일 | 내용 |
| --- | --- |
| [archive/phase-0-1_summary.md](./archive/phase-0-1_summary.md) | Phase 0~1 요약: 유효한 결정, 콘텐츠 규칙, 품질 기준, 게이트 결과, 철회한 결정, 협업 방식, Phase 2로 넘어간 것 |

### 작성 예정 (마스터 PRD 로드맵 기준)

| 예정 파일명 | 로드맵 단계 |
| --- | --- |
| `005_discovery_search-and-tags.md` | Phase 3 탐색(태그 페이지, 검색 초성·별칭. 검색 팔레트 본체는 Phase 2로 이동). **작성 전에 작성자에게 먼저 물을 것: ① 커스텀 도메인 사용 여부 ② 영문 About 필요 여부** (2026-10-31 약속) |
