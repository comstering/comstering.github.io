# 22. Phase 2 디자인 답변: About 강화·홈·이력서 시안 (D-1 ~ D-5)

> **2026-11-03 일부 철회:** 기획 재검토([24번](./24-planning-request-phase2-revision.md))로 이 문서의 **프로젝트별 접이식·`expand all`(2.2), 관련 글·`personal` 배지(2.4), what i do, 앵커 강조(2.3), 홈 대표 3건·`resume` 버튼(4장), `resume.html`(5장)은 쓰지 않는다.** 대체: [25번](./25-phase2-revision-design-response.md). **유효:** 기술 태그를 About에 두지 않는 판단(2.5), 기간 표시 규칙(2.6), D-5 폴백 글꼴 폭 보정(3장), 앵커 `scroll-padding` 주의(2.3).

작성: 디자인 세션 · 2026-11-02
답변 대상: 기획 [`prd/004`](../prd/004_portfolio_projects-and-about.md) 8장, 요청 [18번](./18-planning-request-phase2.md) (18번은 답변 문서를 `19-…`로 쓰라고 했지만 19번은 보관 문서가 쓰고 있어 번호 재사용 금지 규칙에 따라 **22번**으로 썼다)
쓰는 개발 PR: PR-19 About, PR-20 홈, PR-21 이력서
시안: `site/about.html`(D-1·D-3·D-5), `site/index.html`(D-4), `site/resume.html`(D-2, 신규). 공용 규칙은 `system/`

## 1. 결론

| # | 요청 | 답 |
|---|---|---|
| D-1 | About 경력 시안 | 프로젝트별 **접이식**(회사는 항상 보임), 기본은 **전부 접힘**, 앵커로 들어오면 그 항목만 펼침 + `surface-2` 강조, `expand all` 버튼, **기술 태그는 About에 두지 않는다**, 관련 글은 펼친 항목 맨 아래 |
| D-2 | 이력서 시안 | `resume.html`(웹) + 인쇄 CSS(A4, 라이트 고정, 헤더·푸터·버튼 숨김, 링크 URL 표시, 사진 없음). 실제 데이터 전체로 A4 5쪽 |
| D-3 | About 나머지 | 기술 스택 7그룹, Terraform Associate `verify ↗`, `.ph` 0건. 새 문구 섹션 없음 |
| D-4 | 홈 | `resume` 버튼, 대표 3건이 `about.html#id`로 연결, `all tags` 삭제, 헤더 `posts · about` |
| D-5 | About CLS | **폴백 글꼴 폭 보정**: `@font-face`에 `size-adjust: 86.4%`. 측정으로 재현하고 해소를 확인했다(3장) |

시안은 실제 About(`src/app/about/page.tsx`)의 프로젝트 **21건을 문장 그대로** 읽어 만들었다(생성기: `tools/build-phase2-mockups.py`). 문장·수치는 바꾸지 않았다.

## 2. D-1·D-3 About

### 2.1 구조 (PRD 5.1 순서 그대로)

첫 화면 → 소개 → what i do → experience → open source · side → skills → certifications → education · activity.

**5초 테스트 기준(G2-1) 첫 화면 측정** (시안, Playwright Chromium):

| 화면 | 이름·직함·연차·회사·버튼 4개가 끝나는 y | 한 줄 소개까지 |
|---|---|---|
| 360×640 | 369px | 460px (소개 첫 문단이 첫 화면에 걸림) |
| 1280×720 | 323px | 437px |

버튼은 `email`(primary) · `resume.pdf` · `github ↗` · `linkedin ↗`. 프로필 사진은 지금 구현에 있어 유지했다(질문 Q5).

### 2.2 경력 21건 펼침 방식: 프로젝트별 접이식

세 안을 비교했다.

| 안 | 360px 페이지 높이 | 평가 |
|---|---|---|
| 전부 펼침 | 약 13,600px | 21건 불릿이 한꺼번에 나와 훑을 수 없다 |
| 회사별 접기 | 회사가 2개뿐이라 의미가 적다 | 접어도 14건이 한 덩어리 |
| **프로젝트별 접기 (채택)** | 접힘 6,146px / `expand all` 13,588px | 21개 제목을 약 1,000px에 훑고 관심 가는 것만 연다 |

- 접힌 행: 제목 + 기간(모노) + 화살표. 행 높이 최소 47px(터치 44px 충족), 제목이 길어도 최대 90px(3줄). 360px에서는 기간이 제목 아래로 내려간다.
- 펼친 내용: 설명(`mute`) → 성과 불릿(`fg`) → 관련 글. 불릿은 짧은 1px 가로선으로 표시한다(장식용 점 금지).
- 마크업은 `<details>`·`<summary>`라 키보드(Enter·Space)와 스크린리더가 기본으로 동작한다. 확인함: Enter로 열림.
- **`expand all` / `collapse all` 버튼**을 섹션 제목 줄 오른쪽에 둔다(44px). 개별 토글로 상태가 바뀌면 버튼 글자도 맞춰 바뀐다. 인쇄·훑어보기용 탈출구다.
- 접힌 항목의 내용도 브라우저 찾기(⌘F)로 검색되는지는 Chrome에서만 확인할 수 있어 미확인이다.

### 2.3 앵커 도착 (`/about#<id>`)

- 도착한 항목은 **자동으로 펼치고** `surface-2` 배경 + 1px `line-strong` 테두리로 강조한다(굵은 측면선 금지 준수). 다른 항목은 접힌 채로 둔다.
- 위치: 항목 상단이 헤더 아래 24px(88px)에 놓인다. 측정: 360·1280 모두 88px.
- 글꼴이 늦게 도착해 줄 수가 바뀌어도 위치가 밀리지 않도록 `document.fonts.ready` 뒤에 한 번 더 맞춘다(`system/app.js`).
- **개발 주의:** 시안은 `html { scroll-padding-top: 88px }`가 이미 앵커 위치를 맡는다. 항목에 `scroll-margin-top`을 또 주면 두 번 더해진다(처음 시안에서 176px로 어긋나 고쳤다). 구현의 전역 CSS를 확인할 것.
- 실제 Chrome에서 홈 `EKS 네트워킹` 클릭 → About 해당 항목 펼침·강조 → 관련 글 4건이 보임까지 확인했다(PRD G2-4의 J1 흐름 앞부분).

### 2.4 관련 글

- 펼친 항목 맨 아래, 점선 위 `관련 글` 라벨(모노) + 글 제목 행(44px 이상) + 끝 `→`. 개인 환경 글은 `personal` 배지, 회사 업무 기여 글은 배지 없음(PRD 5.4: 개인 환경 글만 표시).
- 시안의 연결은 **PRD 5.4 초안 그대로**다: EKS 네트워킹 ← Custom Networking, ENI 트러블슈팅, Cilium 설치, Cilium 트러블슈팅(`personal`). Kafka 에코시스템 ← Bitnami 기여 글. 오픈소스 두 줄 끝에도 `관련 글` 링크.
- 관련 글이 없는 항목(19건)은 이 영역이 없다.

### 2.5 기술 태그는 About에 두지 않는다 (D-1 ③)

| 근거 | 내용 |
|---|---|
| 이미 있다 | 불릿 문장이 기술 이름을 직접 말하고, `skills` 섹션이 7그룹 전체를 보여 준다 |
| 데이터가 고르지 않다 | `stack`은 4.4 표의 이름만 쓰므로 Drone CI·React Native 같은 항목은 못 쓴다. 설명·불릿에 나온 이름만으로 만든 초안에서 21건 중 **3건은 태그가 0개**(프로모션 코드, 성인 인증, CLASS101+ 앱), 클래스101 4건은 1~4개로 들쭉날쭉하다 |
| 잡음 | 접힌 행이 21개인데 태그 줄이 붙으면 행마다 한 줄씩 늘어 훑기가 나빠진다 |
| 쓸 곳이 따로 있다 | `stack`은 이력서(프로젝트 아래 `stack:` 한 줄)와 홈 대표 프로젝트가 쓴다(PRD 4.3). 시안 이력서에 그렇게 반영했다 |

되돌리기는 쉽다(펼친 영역에 `stack-token` 줄을 더하면 된다). 다만 시안의 `stack` 값은 **초안**이다(질문 Q2).

### 2.6 D-3 나머지

- **skills:** 4.4의 7그룹을 그룹 순서·항목 순서 그대로. 이름은 원문 표기(`Kubernetes`, `OAuth 2.0 / OIDC`)로 둔다(이전 시안의 소문자 변환은 고유명사를 바꾸므로 버렸다).
- **certifications:** Terraform Associate 줄 끝에 `verify ↗`(Credly, 새 창, 스크린리더 안내 포함).
- **open source · side:** 2건에 `merged` 배지와 `pull request ↗`, Lomeone은 `github ↗`.
- **education · activity:** 공주대 + 수강 과목(쉼표로 이은 한 줄), BoB 10기.
- **what i do:** 3개. 문구는 이전 시안 그대로이고 모든 수치가 About 불릿에 있는 값이다(MWAA 제거 연 $16,000, 네트워크 비용 50%). 링크는 같은 페이지 앵커(`#eks-networking`, `#argo-workflows`, `#okta-sso`).
- **`.ph` 0건**, 회사명은 데이터 표기 `CLASS 101`을 따랐다. 경력 기간 표시: `2026.03 ~ 2026.03`은 `2026.03`으로, `Present`는 `now`로 표시만 바꾼다(데이터는 그대로, 질문 Q7).
- 회사 줄의 도메인 설명(예: "클라우드 네이티브 인프라, 인증, 메시징")은 데이터에 없으므로 뺐다.
- 프로젝트 `id`(앵커)는 제안값이다: `eks-networking`, `argo-workflows`, `okta-sso`, `vpc-peering`, `kafka-stability` 등 21개. 확정은 개발 PR-18.

## 3. D-5 About CLS: 폴백 글꼴 폭 보정

### 3.1 원인을 재현했다

19번에서는 이 Mac에서 CLS가 0이라 CI의 0.125를 재현하지 못했다. 이유를 글자 폭으로 찾았다.

| 글꼴 | 한글 한 글자 폭 (em) | 같은 소개 문장 폭 (100px 기준) |
|---|---|---|
| Pretendard | **0.864** | 151.0 |
| Apple SD Gothic Neo (이 Mac의 폴백) | 0.865 | 151.6 |
| 풀폭 CJK 글꼴 (AppleGothic으로 대역) | **1.000** | 176.3 |

- 이 Mac의 폴백은 Pretendard와 폭이 같아 줄 수가 안 바뀐다. **풀폭 한글 글꼴을 쓰는 환경(리눅스의 Noto Sans CJK 등)은 같은 문장이 약 17% 넓어져 줄 수가 달라지고**, Pretendard가 도착하면 줄이 줄면서 아래 내용이 밀린다. CI가 리눅스라 거기서만 나타난 것으로 보인다.
- 풀폭 폴백(AppleGothic)을 대역으로 쓰고 Pretendard 도착을 2.5초 늦춰 재현했다(`tools/measure-fallback-cls.mjs`).

| 화면 | 폭 | 보정 없음 (A) | `size-adjust: 86.4%` (B) |
|---|---|---|---|
| 새 About 시안 | 360 | **0.142** | 0.003 |
| | 412 (Lighthouse 모바일) | **0.124** | 0.001 |
| | 768 | **0.126** | 0.001 |
| | 1280 | 0.025 | 0.001 |
| 이력서 시안 | 360 | 0.309 | 0.001 |
| | 412 / 768 / 1280 | 0.020 / 0.020 / 0.002 | 0.000 / 0.026 / 0.003 |
| 현재 구현 About(`main` 빌드) | 412 | 0.253 | 0.002 |

CI가 본 0.125와 같은 크기가 재현된다.

### 3.2 해법: `size-adjust`로 폴백 폭을 Pretendard에 맞춘다

```css
/* 풀폭 CJK 폴백(Noto Sans CJK KR 등)의 한글 폭 1.0em을 Pretendard 0.864em에 맞춘다 */
@font-face {
  font-family: "Pretendard Fallback";
  src: local("Noto Sans CJK KR"), local("NotoSansCJKkr-Regular"), local("Noto Sans KR");
  size-adjust: 86.4%;
}
/* --font-sans: "Pretendard Variable", Pretendard, "Pretendard Fallback", -apple-system, ... */
```

- 시안에는 `system/tokens.css`에 반영했다. 개발은 `src/app/globals.css`에 같은 `@font-face`를 두고 `--font-sans`에서 Pretendard **바로 뒤**에 넣는다.
- Apple SD Gothic Neo는 이미 0.865em로 같아 `local()` 목록에 넣지 않는다(넣으면 오히려 줄어든다).
- 소개 문단 구성은 바꾸지 않는다(문장 그대로 이전한다는 PRD-004의 원칙과 맞다). 예약 높이(`min-height`)는 쓰지 않는다. 줄 수가 폭마다 달라 값을 고정하기 어렵다.

### 3.3 검증은 PR-19의 CI가 한다 (한계)

- **대역(AppleGothic) 측정이다.** 실제 Noto Sans CJK KR을 이 Mac에서 쓸 수 없다. Noto CJK의 한글 폭이 1.0em이라는 점은 알려진 값이지만 이 환경에서 직접 재지는 못했다.
- **Windows(맑은 고딕)는 측정하지 못했고 `local()`에도 넣지 않았다.** 맑은 고딕의 한글 폭이 다르면 같은 문제가 남는다.
- PR-19 수용 기준(About CLS ≤ 0.1, 3회 중앙값)으로 확인하고, 남으면 다음 단계는 `ascent-override` 보정이나 폴백 목록 확대다.

## 4. D-4 홈

- 히어로 버튼: `about me →`(primary) · `resume`(secondary, `/resume` 웹 페이지). 시안의 `projects`는 없앴다.
- 대표 3건(`featured`), 위에서부터 **최근순**: Argo Workflow(`MWAA 제거 연 $16,000 절감`), Okta SSO(`IAM User 250+ 폐기`), EKS 네트워킹(`Pod IP 500 → 16,000`). 제목은 About 데이터의 실제 제목, 연도는 끝나는 해, 링크는 `about.html#<id>`. 질문 Q6.
- 목록 아래 `about →` 링크(1024 미만에서는 1건만 보이고 이 링크가 이어진다). `all tags →`는 삭제, 태그 상위 6개는 유지.
- 헤더는 모든 시안에서 `posts · about`. `projects.html`·`project.html`만 보관 화면이라 그대로 두었다.
- 검색 팔레트: 이전 `projects` 그룹을 **`experience`** 그룹으로 바꿔 항목이 `about.html#id`로 가게 했고, `resume` 페이지 항목을 추가했다.
- 1280×720에서 첫 글 제목이 보인다. 실제 Chrome에서 확인함.

## 5. D-2 이력서

- **웹**(`/resume`): 사이트 헤더·푸터 포함, 읽기 폭 720px, 상단 오른쪽에 `resume.pdf`(primary). 순서는 PRD 5.3: 연락처 → 소개 → 기술 스택 → 경력 → 오픈소스·사이드 → 학력 → 자격증 → 활동. 사진 없음.
- 프로젝트마다 제목·기간·설명·불릿, 그리고 `stack:` 한 줄(모노, 값이 있는 18건).
- **인쇄**(`@media print`): `@page` A4 여백 13/14mm, 라이트 토큰으로 덮어써 **다크 테마에서 열어도 라이트**, 헤더·푸터·경로 줄·다운로드 버튼 숨김, 본문 9.5pt, 프로젝트 블록은 쪽이 갈려도 중간에 잘리지 않게(`break-inside: avoid`), 외부 링크는 `(URL)`을 뒤에 붙여 종이에서도 보이게 한다. 연락처는 URL 자체가 글자로 보이므로 중복하지 않는다.
- 확인함(Chromium): 인쇄 미디어에서 헤더·푸터·버튼 `display:none`, 배경 흰색·글자 #111, 다크 클래스가 있어도 라이트. 같은 조건으로 `page.pdf()` **5쪽·543KB**. 본문·URL 표시는 미리보기로 확인.
- **분량:** 실제 데이터 21건 전부라 5쪽이다. 채용 담당자에게는 길 수 있다(질문 Q4).
- PDF 안 텍스트 검색 가능 여부와 한글 깨짐(G2-6)은 이 환경에서 PDF 텍스트를 추출하는 도구가 없어 **확인하지 못했다.** PR-21에서 확인한다.

## 6. 개발에 넘기는 것

| PR | 디자인 입력 |
|---|---|
| PR-18 | 프로젝트 `id` 제안 21개(2.6), `stack` 초안(`tools/build-phase2-mockups.py`의 `STACK`), `relatedPosts` PRD 초안 |
| PR-19 | `site/about.html`, 2.2~2.6, 3.2의 `@font-face`, 앵커 `scroll-padding` 주의(2.3), 접이식 마크업(`details.acc__item#id > summary.acc__sum`, 스크립트는 `system/app.js` 끝) |
| PR-20 | `site/index.html`, 4장 |
| PR-21 | `site/resume.html`, `components.css`의 `.resume`·`@media print`, 5장 |

CSS 클래스는 시안 전용 이름이다. 구현에서는 Tailwind 토큰 유틸리티로 옮긴다(DESIGN.md 규칙, hex·`dark:` 금지).

## 7. 질문 정리

### 기획·작성자에게

| # | 질문 | 디자인 의견 |
|---|---|---|
| Q1 | **관련 글 연결을 늘릴까?** 시안은 PRD 5.4 초안(21건 중 2건)뿐이다. 후보: Karpenter·EKS 구축 글(`create-eks`, `karpenter`, `install-karpenter`) → 「Cloud Native 인프라 구축 및 MSA 전환」, `first-contribute-opensource`(Kafbat) → 「Kafka 에코시스템」, `terraform-associate-004-review` → 자격증 줄 | 연결이 많을수록 "근거로 이어 읽기"가 강해진다. 단 `personal`·`work` 구분은 작성자만 안다 |
| Q2 | **프로젝트 `stack` 값을 확인해 달라.** 설명·불릿에 나온 이름만으로 만든 초안이고 4.4 표에 없는 기술(Drone CI, React Native 등)은 제외했다. 이력서·홈에서만 쓴다 | 초안은 `tools/build-phase2-mockups.py`에 있다 |
| Q3 | **what i do 두 번째 항목(「비용·성능 최적화」)의 링크를 어느 프로젝트로 할까?** 문구가 두 프로젝트(MWAA 제거, TGW → Peering)를 말하는데 링크는 하나(`capabilities[].link`)다. 시안은 Argo Workflows | 문구를 한 프로젝트로 좁히는 방법도 있다 |
| Q4 | **이력서 분량.** 전부 담으면 5쪽이다. 3쪽 이내로 줄일까(프로젝트당 불릿 상위 N개, 클래스101 축약 등)? 줄이면 `resume`용 `highlight` 표시가 데이터에 필요하다 | 채용 담당자 기준으로는 줄이는 쪽을 권한다. PRD 5.3은 "About과 같은 데이터"라 기획 결정이 필요하다 |
| Q5 | **About에 프로필 사진을 유지할까?** 이력서는 사진 없음으로 정해졌지만 About은 구현에 사진이 있어 유지했다 | 유지 |
| Q6 | **홈 대표 3건 순서:** 시안은 최근순. PRD 순서(EKS, Okta, Argo)로 할까? | 최근순(목록과 같은 규칙). 첫째는 아무 순서든 `$16,000`이 눈에 먼저 들어온다 |
| Q7 | **기간 표시 규칙에 동의하나?** 같은 달은 한 번만(`2026.03`), `Present`는 `now`, 기간이 여러 개면 쉼표(Temporal) | 데이터는 그대로, 표시만 바꾼다 |
| Q8 | **긴 제목:** 실제 제목이 360px에서 3줄(90px)까지 간다(예: Okta SSO 47자). 접힌 행용 `shortTitle`을 둘까? | 지금은 불필요하다. 제목이 문장 그대로 보이는 것이 이전 원칙과 맞고 훑기에도 문제없다 |

### 개발에게

| # | 확인 | 내용 |
|---|---|---|
| Q9 | 앵커 `scroll-padding` | 전역과 항목 `scroll-margin`이 겹치지 않게(2.3) |
| Q10 | 폴백 `@font-face` 위치 | `--font-sans`에서 Pretendard 바로 뒤. PR-19 CI(3회 중앙값)로 About CLS를 확인하고 결과를 알려 달라. 남으면 3.3의 다음 단계 |
| Q11 | 인쇄 PDF 텍스트·한글 | G2-6 확인은 PR-21에서. 한글 폰트가 CI(리눅스)에 있어야 한다(없으면 PDF 글자가 깨진다) |

### 사용자에게

- **Windows 실기기에서 About을 한 번 열어 보면 좋다.** 맑은 고딕 폴백은 측정하지 못했다.
- 5초 테스트(G2-1)는 첫 화면 구성이 정해진 뒤 지인에게 시안(`site/about.html`)으로 해 볼 수 있다. 360×640 첫 화면은 3장 표대로 나온다.

## 8. 확인하지 못한 것

- 실제 리눅스 CI의 About CLS(3.3).
- Safari·Firefox에서 `<details>` 앵커 자동 펼침. 스크립트가 보완하지만 직접 보지 못했다.
- 접힌 항목 내용의 브라우저 찾기(⌘F) 동작.
- 이력서 PDF의 텍스트 추출·한글 글꼴 포함(5장).
- 정확한 360px의 실제 Chrome(창 최소폭 406px). 360px 수치는 Playwright Chromium이고, 실제 Chrome(1488px)은 홈, About 앵커 도착, 이력서에서 확인했다.
- 스크린리더 낭독(`details`의 접근성 이름 포함).

## 9. 재현 방법

```bash
python3 cowork/design/tools/build-phase2-mockups.py     # about.html, resume.html 다시 생성 (데이터 원본 src/app/about/page.tsx)
python3 -m http.server 4174 &                           # 저장소 루트에서 (프로필 사진 경로 때문)
node cowork/design/tools/measure-fallback-cls.mjs about.html   # D-5 CLS 재현·검증
node cowork/design/tools/check-site.mjs <스크린샷 폴더>        # 9개 화면 × PC·모바일 (about, resume 추가)
```
