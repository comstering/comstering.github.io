# 17. 디자인 검토: 머지된 PR-9(#30)·PR-12(#33) 구현 + Q7 답변

작성: 디자인 세션 · 2026-10-28
대상: 개발 세션, (Q7 정정 요청은) 기획 세션
근거: [`prd/003_blog_reading-experience.md`](../prd/003_blog_reading-experience.md) PR-9·PR-12, [12번](./12-phase1-design-response.md) E1·E7·E8, 시안 `site/post.html`·`site/index.html`·`system/components.css`
검토 대상: `main` `594a289`를 별도 worktree에서 `yarn build`한 산출물(`out/`)

## 결론

1. **PR-12 도구 줄에 수정이 필요한 문제가 1건 있다(F1).** 빌드된 CSS에서 `font:` 단축 속성 6개가 무효가 되어 목차·시리즈 박스의 글꼴이 시안(모노 12~13px, 현재 글 제목 600)이 아니라 본문 글꼴(Pretendard 16px, 400)로 나온다. 개발에 요청한다(Q8).
2. **PR-9 구현은 시안과 맞다.** 수정 요청 없음.
3. **Q7(시리즈 박스 "다음 편 링크")은 시안을 바꾸지 않는다.** 따로 두지 않은 개발 판단을 수용한다. PRD 문구 정정은 기획에 요청한다.

## 1. F1 (필수): `font:` 단축 속성이 빌드에서 무효가 된다

### 증상

같은 요소의 계산된 스타일(360px, 글 `custom-networking-karpenter-eni-troubleshooting`):

| 요소 | 시안 | 구현(빌드) |
|---|---|---|
| `contents` 버튼(`.toc-inline > summary`) | JetBrains Mono 13px | Pretendard 16px |
| `series eks 5/5`(`.series__toggle`, `.series__label`) | JetBrains Mono 12px | Pretendard 16px |
| 현재 글 제목(`.series__now`) | Pretendard 15px, **600** | Pretendard 16px, **400** |
| 목차 개수(`.toc-inline .num`) | JetBrains Mono 13px | Pretendard 16px |

색과 높이(44px)는 같다. 글꼴 크기·굵기·종류만 본문 값으로 떨어진다. 화면에서도 `contents 10`이 산세리프로 보이고, 시리즈 박스의 현재 글 제목이 굵지 않다.

### 원인

소스는 맞게 썼다: `font: 400 var(--text-meta) var(--font-mono);`
빌드가 CSS를 압축하면서 **쉼표를 끼워 넣어** 선언이 무효가 된다: `font:400 var(--text-meta),var(--font-mono)`. 변수는 모두 정상 정의돼 있다(`--text-meta`, `--text-cap`, `--text-small`, `--font-mono`, `--font-sans` 확인).

빌드 CSS(`out/_next/static/css/*.css`)에서 같은 패턴 6개를 찾았다. 모두 PR-12에서 추가된 규칙이다:

| 선택자 | 소스 |
|---|---|
| `.toc__label` | `font: 400 var(--text-cap) var(--font-mono)` |
| `.toc-inline > summary` | `font: 400 var(--text-meta) var(--font-mono)` |
| `.series__toggle` | `font: 400 var(--text-cap) var(--font-mono)` |
| `.series__toggle .series__now` | `font: 600 var(--text-small) var(--font-sans)` |
| `.series__list a::before`, `span.is-current::before` | `font: 400 var(--text-cap) var(--font-mono)` |
| `.series__list .is-current::after` ("← 지금 글") | `font: 400 var(--text-cap) var(--font-mono)` |

### 요청 (개발)

- 위 6개를 `font` 단축 속성이 아니라 `font-family` · `font-size` · `font-weight`로 풀어 쓴다.
- 다시 생기지 않게 `scripts/check-build-output`에 빌드 CSS 검사를 추가하는 것을 권한다: `font:[^;}]*\),var\(` 패턴이 있으면 실패.
- 수정 후 360px에서 `contents`·`series` 버튼이 모노 12~13px, 현재 글 제목이 600인지 다시 확인한다.

### 확인 범위

- 계산된 스타일 비교와 빌드 CSS 확인은 했다. 시리즈 목록 번호(`01`)와 "← 지금 글"은 빌드 CSS에서 무효임을 확인했고, 화면은 360px 펼친 상태까지 봤다.
- **개발 서버(압축하지 않음)에서는 정상으로 보였을 가능성이 있다.** 확인하지 않았다. PR의 스크린샷이 개발 서버 기준이라면 이 문제가 보이지 않았을 것이다.

## 2. Q7 답변: 시리즈 박스에 "다음 편 링크"를 따로 두지 않는다

**시안은 바꾸지 않는다. 개발의 판단(목록의 각 글이 링크)을 수용한다.**

- 접힌 박스를 열면 현재 글 바로 아래가 다음 편이다. 번호와 `← 지금 글` 표시가 있어 다음 편이 한눈에 보인다.
- 글 끝 이전/다음(날짜 기준)이 **지금은 모든 시리즈 글에서 다음 편과 같다.** 게시된 시리즈 글 8편을 확인했다(`eks-from-scratch` 1~4편, `cilium-on-eks` 1~2편의 날짜상 다음 글 = 시리즈 다음 편. 마지막 편 `5/5`, `3/3`은 다음 편이 없다).
- 맨 위에 링크를 더하면 첫 화면 공간을 쓴다(G1-4).

**다시 볼 조건:** 시리즈 글 사이에 다른 글이 끼어 날짜상 다음 글이 시리즈 다음 편과 달라지는 경우. 그때는 시리즈 글의 이전/다음을 시리즈 기준으로 바꾸는 안을 검토하고, 시안이 필요하면 디자인이 만든다.

**기획에 요청:** PRD-003 PR-12 "시리즈 박스: … 다음 편 링크"를 "목록의 각 글 링크로 충족"으로 고쳐 주세요.

## 3. 그 밖의 확인 결과

### 낮음 (수정 요청 아님, F1 수정 후 재확인)

| # | 내용 |
|---|---|
| F2 | 360px에서 헤더 구분선과 도구 줄 사이 여백이 시안보다 약 16px 넓다. 스크린샷을 눈으로 비교한 값이라 정확하지 않다. F1 수정 후 다시 본다 |
| F3 | 목차 현재 항목 강조(600, `aria-current`)는 동작한다. 글 맨 위에서는 아무 항목도 강조되지 않는데(시안은 첫 항목이 강조된 정지 화면), 스크롤 전이므로 정상 동작으로 본다 |
| F4 | 목차 클릭 후 제목이 헤더에 가려지지 않는다(제목 top 88px, 헤더 65px). PRD의 `scroll-margin-top ≥ 헤더 + 24px`(89px)보다 1px 작지만 영향은 없다 |
| F5 | 1280px에서 본문 시작 x가 280px, 시안은 208px이다. 구현은 본문을 가운데에 두고 목차를 오른쪽 바깥에 걸고(Phase 0부터), 12번 E7이 정한 "목차가 없어도 본문 자리 유지"는 지킨다. 목차 오른쪽 끝이 헤더 오른쪽 끝(1176px)보다 바깥으로 약 60px 나간다(스크린샷 기준). 수정 요청 없음 |

### PR-9 (수정 요청 없음)

| 항목 | 결과 |
|---|---|
| 칩 | `all 14 · infra 11 · frontend 2 · oss 2 · note 1`, `backend` 숨김 |
| 칩 숫자 = 결과 수 | `?category=infra` 11, `frontend` 2, `oss` 2, `note` 1 모두 일치 |
| P-2 | `?category=backend`, `?category=xyz`는 14편·`all` 선택 |
| 목록 | `infra, oss`·`frontend, oss`가 한 요소, 360px 메타 줄 한 줄 유지(14편 모두), 목록 이미지 0개, 가로 넘침 0 |
| 글 상세 헤더 | 값마다 `/?category=값` 링크, 쉼표는 `aria-hidden`(P-3), `updated` 표시 0 |

### PR-12 (F1 외 시안과 맞음)

| 항목 | 결과 |
|---|---|
| G1-4(360×640 첫 h2 ≤ 640px) | 14편 중 12편 통과. 초과 2편(`2025-retrospective-2026-resolutions` 845px, `implement-my-site` 715px)은 개발 Q6이 이미 기획에 묻고 있다 |
| 목차 숨김 규칙 | `install-cilium-eks`는 본문 h2 2개라 목차가 숨는다(규칙에 맞음). 목차가 없어도 1280px에서 본문 x는 같다(E7) |
| 모바일 터치 대상 | `contents`·`series` 버튼 높이 44px, 가로 넘침 0 |
| `contents` 숫자 | 시안과 같은 기준(h2+h3 전체 개수) |
| 시리즈 박스 | 1280px에서 본문 위 한 줄, 모바일에서 `aria-expanded` 전환, 현재 글 `aria-current` |

## 4. 확인하지 못한 것

- 실제 Chrome(Claude in Chrome). Playwright Chromium과 로컬 정적 서버로만 확인했다. Safari·Firefox 미확인.
- 개발 서버(압축하지 않음)에서 F1이 보이는지.
- 1280px에서 시리즈 목록을 펼친 상태, 목차를 연 상태의 시각 비교(360px만 눈으로 비교).
