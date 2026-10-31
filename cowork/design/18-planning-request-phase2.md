# 18. 기획 요청: Phase 2 포트폴리오 디자인 (D-1 ~ D-4)

> 2026-10-30 개정: 범위를 **C안(About 강화)**으로 줄였다. `/projects` 목록·상세, Mermaid 구조도는 만들지 않는다. 이전 요청(목록 구성, 상세 시안, Mermaid 테마)은 취소한다.

작성: 기획 세션 · 2026-10-29 (개정 2026-10-30)
기준: [`prd/004_portfolio_projects-and-about.md`](../prd/004_portfolio_projects-and-about.md) (status: approved)
데이터 원본: 현재 About 페이지(`src/app/about/page.tsx`, `Bio.tsx`). 저장소 루트 `resume.md`는 작성자의 임시 문서라 **보지 않는다**

## 배경

About의 프로젝트 21건(CJ 올리브영 14 + 클래스101 7)은 이미 설명·기간·성과 불릿을 갖고 있어, 별도 Projects·상세 페이지는 같은 내용을 다시 쓰는 것이 된다. 그래서 About을 강화하고, "어떻게 풀었는가"는 블로그 글 링크로 연결한다. `projects.html`·`project.html` 시안은 보관만 한다.

Phase 2 개발은 Phase 1 게이트(PRD-003 PR-17) 뒤에 시작한다. 디자인은 지금부터 준비한다.

## 요청

| # | 우선 | 내용 |
| --- | --- | --- |
| D-1 | 필수 | **About 경력 시안(실제 데이터 21건):** ① 프로젝트별 관련 글 목록(글 제목, 개인 EKS 글은 `personal`) ② `/about#<id>` 앵커 도착 항목 강조 ③ 프로젝트에 기술 태그를 보일지 ④ 21건 펼침 방식(전부 펼침 / 회사별 접기 / 프로젝트별 접기). 앵커로 들어온 항목은 펼친 상태. 360px 길이를 고려해 추천 |
| D-2 | 필수 | **이력서 시안 `resume.html`:** 웹 + A4 인쇄(라이트 고정, 헤더·푸터·버튼 숨김, 링크 URL 표시, **사진 없음**). 구성은 PRD-004 5.3 |
| D-3 | 필수 | **About 나머지 갱신:** 기술 스택 7그룹(PRD-004 4.4), Terraform Associate에 Credly `verify ↗`, `.ph` 잔존 정리. "주요 성과" 같은 새 문구 섹션은 두지 않는다 |
| D-4 | 필수 | **홈 히어로·대표 프로젝트:** 히어로 버튼 `projects` → `resume`, 대표 3건(EKS 네트워킹 `Pod IP 500 → 16,000`, Okta SSO `IAM User 250+ 폐기`, Argo Workflows `MWAA 제거 연 $16,000 절감`)은 `/about#<id>`로 연결, `all tags →` 제거, 헤더는 `posts · about` 유지 |

## 확정된 것 (PRD-004 7장)

| 항목 | 결정 |
| --- | --- |
| 대표 프로젝트 | EKS 네트워킹, Okta SSO, Argo Workflows |
| 이력서 | 빌드 때 자동 PDF, 사진 없음 |
| 자격증 | Terraform Associate Credly 링크 |
| 기술 스택 | 7그룹 |
| Temporal 기간 | 2개 기간 그대로 |

답변은 `19-…-response.md`로 남겨 주세요.
