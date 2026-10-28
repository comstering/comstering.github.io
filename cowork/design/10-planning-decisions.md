# 10. 사용자 결정 반영 + 08·09 질문 답변 (디자인 v1.4 요청)

작성: 기획 세션 · 2026-10-27
근거: [07-planning-rereview.md](./07-planning-rereview.md)의 남은 결정 4건에 대한 사용자 답변, [08-ux-review.md](./08-ux-review.md)·[09-final-review.md](./09-final-review.md)의 기획 확인 요청
PRD: [`prd/001_site_master-plan.md`](../prd/001_site_master-plan.md) v1.3에 반영 완료

> 이 문서는 처음에 `08-planning-decisions.md`로 저장했지만 디자인 세션의 `08-ux-review.md`와 번호가 겹쳐 10번으로 옮겼다. v1.3 시안(23:14)은 이 결정보다 먼저 만들어져 D1~D3이 아직 반영되지 않았다.

## 1. 사용자 결정

| # | 질문 | 결정 | PRD |
| --- | --- | --- | --- |
| 1 | Pod IP 수치가 About(500 → 16,000)과 블로그(약 760 → 약 24,000)에서 다름 | **둘 다 맞다.** About은 회사 EKS, 블로그는 개인 EKS다. 오류가 아니라 **표기 문제** | F-PJ-03 |
| 2 | AdSense | **지금은 제거, 추후 재논의.** 시안의 제거 상태 유지 | F-SE-09 |
| 3 | 카테고리 | **`infra / backend / frontend / oss / note`.** 기존 체계에 `oss`만 추가. `web` 통합은 하지 않는다 | 6.1 |
| 4 | 공개 범위 (F-PJ-05) | **블로그·About에 이미 공개된 내용은 문제없다.** 새 사내 정보를 추가할 때만 작성자 확인 | F-PJ-05 |

### 작성자 직무 (카피 기준, PRD 1.0)

- 주 직무는 **DevOps · Cloud Native Engineer**다. backend 개발자가 아니다.
- Class101 경력은 backend 비중이 큰 웹 개발이었다. 웹 개발 영역 안에서 backend가 강점이라 카테고리에서 backend·frontend를 구분한다.

## 2. 디자인 수정 요청 (v1.4)

| # | 우선 | 위치 | 요청 |
| --- | --- | --- | --- |
| D1 | 필수 | `index.html` 필터 칩·글 목록 메타, `og.html`, 팔레트 | `web` → `frontend`. 칩 순서 `all · infra · backend · frontend · oss · note`. 글 0편인 칩은 숨긴다(현재 `backend`). 시안에서는 숨김 규칙을 주석 한 줄로 표시 |
| D2 | 필수 | `project.html`, `projects.html` | `근거 글` → **`관련 글`**. 프로젝트 상세 섹션 아래 한 줄: "개인 EKS에서 같은 기술을 재현하고 정리한 글입니다. 수치는 회사 환경과 다릅니다." 각 행 meta에 `personal`(모노, mute). 헤더 메타의 `근거 글 4 →`도 `관련 글 4 →`로 |
| D3 | 필수 | `project.html` 구조 다이어그램 | 회사 프로젝트이므로 블로그(개인 환경) 값 `10.0.0.0/24`, `100.64.0.0/16`, `t4g.large`를 쓰지 않는다. **구성만 보여 주는 다이어그램**으로: node subnet(기존 대역) / pod subnet(VPC secondary CIDR) / ENI 분리 / VPC CNI → Cilium chaining. 수치는 About의 `Pod IP 500 → 16,000`만 |
| D4 | 필수 | `about.html` 직함 (`.ph` 2개) | CJ Olive Young: **`DevOps · Cloud Native Engineer`**. Class101: **`Web Developer (backend 중심)`**. 확정값이므로 `.ph` 해제. 이름 아래 역할 줄(M2)도 `DevOps · 클라우드 네이티브 엔지니어 · 경력 4년+` |
| D5 | 권장 | `design-system.html`, `04-design-system.md` | 원칙 4 "증명의 연결선"에 한 줄: "회사 성과와 개인 실습 글을 섞어 보이지 않는다. 개인 환경 글은 `personal`로 표기한다." |
| D6 | 확인 | AdSense 자리 | 시안에 광고 자리를 두지 않는다. 재도입은 글 상세 본문 하단 한 곳만(F-SE-09 조건) |

`post.html` 본문은 블로그 글 자체이므로 개인 환경 수치를 그대로 쓴다.

## 3. 08·09 기획 확인 요청에 대한 답

| 출처 | 질문 | 답 |
| --- | --- | --- |
| 08 H3 | F-PO-06 관련 글 규칙 보완 | **채택.** "같은 시리즈 글과 이전/다음 글 제외, 점수 0인 글로 채우지 않음, 0편이면 섹션 숨김"을 PRD에 반영했다 |
| 08 | About ↔ Projects 범위 | **하나의 데이터 파일, 전체 수록.** About 경력에 있는 모든 프로젝트(`CLASS101+ 구독 앱 런칭` 포함)를 `content/projects`에 넣는다. Projects 목록도 전부 보여 주고, 상세 페이지는 `detail: true`인 항목만 만든다. 상세가 없는 행은 링크 없이 한 줄로. Phase 2 작업이라 시안은 지금 14건이면 충분 |
| 08 M1 | 헤더 메타 줄 `근거 글 4 →` | 채택하되 D2대로 `관련 글 4 →` |
| 09 V1 | 썸네일 A안 vs B안 | **A안 채택.** OG 자동 생성(F-SE-02)을 Phase 3에서 **Phase 1로 당겼다.** 그 전까지(Phase 0)는 현재 썸네일을 그대로 쓴다 |
| 09 | `agent-browser` CLI 설치 | 사용자 결정 사항. 저장소 규칙상 새 도구 설치는 사용자 확인 후 |

## 4. 다음 단계

1. 디자인: D1~D4 반영(v1.4) → `04-design-system.md` 기준으로 `/DESIGN.md` 갱신
2. 기획: `prd/002_platform_phase0-stabilization.md` 작성. 디자인 시안 중 Phase 0에 쓰는 범위를 명시
