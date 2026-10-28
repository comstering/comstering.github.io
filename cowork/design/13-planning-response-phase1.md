# 13. 기획 답변: 12번 Phase 1 디자인 답변 + 시안 v1.4

작성: 기획 세션 · 2026-10-28
대상: [12-phase1-design-response.md](./12-phase1-design-response.md), `site/phase1-compare.html`, v1.4 시안
반영: [`prd/003_blog_reading-experience.md`](../prd/003_blog_reading-experience.md) 4장·7장 확정, [`prd/001_site_master-plan.md`](../prd/001_site_master-plan.md) v1.5

## 결론

**12번 제안을 모두 채택한다.** `phase1-compare.html`을 1280px·360px로 다시 렌더링해 확인했다. 카테고리 2개 메타 줄은 360px에서 한 줄에 들어가고, OG 축소 썸네일은 제목 글자를 읽을 수 없는 크기였다. 추가 요청은 썸네일 시안 정리 1건뿐이다.

## 1. 채택 내용

| # | 제안 | 결정 | PRD-003 반영 위치 |
| --- | --- | --- | --- |
| 1 | categories B안(대표 없음, 고정 순서, 쉼표 묶음) | **채택.** 기획 기본안이던 A안을 철회. 실측으로 A안의 공간 절약 이유가 사라졌고, "둘 다 필터 링크이니 둘 다 accent"가 08 M3·M4 규칙과 맞다는 근거에 동의 | 4장 확정 표시 규칙, PR-9 |
| 2 | 칩 숫자 유지 | **채택** | 4장, 6장 리스크 |
| 3 | 목록 썸네일 제거 (09 A안 철회) | **채택.** 10번에서 기획이 정한 "OG를 목록 썸네일로"를 철회한다. G1-5의 썸네일 기준 삭제, G1-6을 "고유 OG, 목록 썸네일 없음"으로 수정 | 1장 G1-5·G1-6, PR-9, PR-15 |
| E1 | URL 연동 `router.push` | **채택** | PR-9 |
| E2 | `$ ` 프롬프트 제외 복사 | **채택.** `bash`·`sh`·`shell`·`console` 블록 대상 | PR-11 |
| E3 | 원본 폭 > 표시 폭인 이미지만 확대 | **채택** | PR-14 |
| E4 | OG 하단 accent 선 없음 | **채택.** PRD의 "아래 accent 선" 삭제 | PR-15 |
| E5 | og:image PNG 유지 | **채택** | PR-15 |
| E6 | OG 글꼴 Pretendard 700 + JetBrains Mono 400 | **채택** | PR-15 |
| E7 | 목차 숨김 시 본문 위치 유지 | **채택** | PR-12 |
| E8 | 시리즈 `label` 8자 이하 검증 | **채택.** PR-9 스키마 검증에 포함 | PR-9 |
| E9 | G1-4는 제목이 가장 긴 글로 측정 | **채택** | G1-4 |

D1~D6 반영도 확인했다(`web` 0건, `관련 글`·`personal`, 다이어그램 수치 정리, 직함 확정, 원칙 4 문구).

## 2. 썸네일 제거에 따른 순서 주의 (구현 메모)

지금 og:image는 frontmatter `thumbnail`을 쓴다. 그래서 단계를 나눈다.

| PR | 작업 |
| --- | --- |
| PR-9 | 홈·태그 목록에서 썸네일 열만 삭제. `thumbnail` 필드는 그대로 둔다(og:image가 계속 사용) |
| PR-15 | og:image를 자동 생성 PNG로 바꾼 뒤 `thumbnail`을 스키마와 15편 frontmatter에서 삭제. 본문에서 쓰지 않는 `public/images/posts/thumbnails/` 파일 삭제 |

## 3. 디자인 요청

| # | 우선 | 위치 | 요청 |
| --- | --- | --- | --- |
| R1 | 필수 | `index.html`, `tag.html`, `components.css` | 썸네일을 빼고 `post-item`의 썸네일 열을 정리(12번 3장 마지막 문단에서 말한 작업). 지금 `index.html`은 OG 썸네일로 바뀌어 있다 |
| R2 | 확인 | `og/*.png` | 시안용 생성물이라 저장소 용량에 들어간다(16개, 약 0.7MB). 구현 PR-15가 끝나면 `cowork/design/site/og/`는 대표 2~3장만 남기고 정리해도 된다 |

## 4. 다음 단계

1. 디자인: R1
2. 개발: PR-10 → PR-9(이제 바로 시작 가능) → PR-11·12·13 → PR-14 → PR-15 → PR-16 → PR-17
3. 구현 세션은 PRD-003 4장 "확정 표시 규칙" 표와 12번 "B안 구현 메모"를 같이 본다
