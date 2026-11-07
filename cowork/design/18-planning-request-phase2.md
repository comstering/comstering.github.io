# 18. 기획 요청: Phase 2 포트폴리오 디자인 (D-1 ~ D-5)

> **2026-11-02 재검토:** D-1(관련 글·접기)·D-2(`/resume` 페이지)·D-4(히어로·대표 프로젝트)는 [24번](./24-planning-request-phase2-revision.md)으로 대체됐다. About과 블로그 글은 서로 링크하지 않고, `/resume` 페이지와 홈 대표 프로젝트는 만들지 않는다. D-3·D-5는 유효.

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
| D-5 | 필수 | **About CLS 해법 (2026-11-01 추가, 개발 Q15):** 지금 About 둘째 소개 문단(한글 7줄)이 Pretendard 도착 뒤 줄 수가 바뀌어 CLS 0.125(차단 ≤ 0.1). 글꼴 서브셋·preload로는 안 풀렸다(글꼴이 느린 4G에서 약 3.0s 도착). Phase 2 About 시안에서 해법을 정해 달라: 폴백 글꼴 크기 보정(`size-adjust`·`ascent-override`), 소개 문단 구성 변경 등(19번 1.4 다음 단계). PR-19 수용 기준이 About CLS ≤ 0.1 |

## 작업 순서 (2026-11-02 추가)

개발은 PR-18(데이터 분리)부터 바로 시작한다. PR-18은 시안이 필요 없다. 그다음 PR이 쓰는 시안 순서대로 요청한다.

| 순서 | 시안 | 쓰는 개발 PR |
| --- | --- | --- |
| 1 | D-1 About 경력 + D-3 About 나머지 + D-5 CLS 해법 (`about.html` 한 화면) | PR-19 About 강화 |
| 2 | D-4 홈 히어로·대표 프로젝트 (`index.html`) | PR-20 |
| 3 | D-2 이력서 (`resume.html`, 신규) | PR-21 |

- STATUS O-1의 `projects.html`·`project.html` `.ph` 잔존은 정리하지 않아도 된다. 두 화면은 Phase 2에서 만들지 않아 보관만 한다.
- D-5의 "19번 1.4"는 지금 `archive/19-design-answer-q9-font-a11y.md`에 있다.

## 확정된 것 (PRD-004 7장)

| 항목 | 결정 |
| --- | --- |
| 대표 프로젝트 | EKS 네트워킹, Okta SSO, Argo Workflows |
| 이력서 | 빌드 때 자동 PDF, 사진 없음 |
| 자격증 | Terraform Associate Credly 링크 |
| 기술 스택 | 7그룹 |
| Temporal 기간 | 2개 기간 그대로 |

답변은 `19-…-response.md`로 남겨 주세요.
