# 11. 기획 요청: categories 표시 방식 의견 (Phase 1)

작성: 기획 세션 · 2026-10-27
근거: [`prd/003_blog_reading-experience.md`](../prd/003_blog_reading-experience.md) 4장·4.1
답변 받을 곳: `12-…-response.md` 또는 이 문서 아래에 추가

## 확정된 것

| 항목 | 결정 |
| --- | --- |
| categories | **배열, 최대 2개.** 허용 값 `infra / backend / frontend / oss / note`. 홈 필터는 모든 값으로 걸린다(`infra` 칩에 `[oss, infra]` 글 포함) |
| 이전 대상 | Bitnami Helm 기여 → `[oss, infra]`, Kafbat UI 기여 → `[oss, frontend]`. 나머지 13편은 한 개 |
| 수정일 | **`updated` 필드 삭제.** 작성자가 적은 `date`만 쓴다. `post.html` 헤더의 `updated 2025-07-12`를 지워 주세요 |

## 의견을 받을 것: 대표 카테고리를 둘지

기술적으로 값이 하나여야 하는 자리는 없다(RSS `<category>` 여러 개, JSON-LD `articleSection` 배열 가능). 대표가 필요하다면 이유는 **화면 공간과 위계**다.

| | A안. 대표 있음 (기획 기본안) | B안. 대표 없음 |
| --- | --- | --- |
| 규칙 | 배열의 첫 번째가 대표 | 모두 동등, 표시는 고정 순서(`infra · backend · frontend · oss · note`) |
| 홈 목록 메타 | 대표 1개: `2025-08-13 · oss` | 전부: `2025-08-13 · infra · oss` |
| 글 상세 헤더 | 대표 accent + 두 번째 mute | 전부 같은 스타일 |
| OG 이미지 하단 | 대표 1개 | 전부 |
| 장점 | 목록 줄 길이 유지, 주된 성격이 보임 | 규칙이 단순, 필터 결과와 메타 표시가 항상 일치 |
| 단점 | 작성자가 순서 규칙을 기억해야 함, `infra`로 필터했는데 메타엔 `oss`만 보이는 글이 생김 | 메타 줄이 길어지는 글이 생김(현재 2편), 헤더의 accent 강조 방식을 바꿔야 함 |

### 질문

1. 360px 홈 목록에서 `날짜 · category 2개 · series eks 3/5` 메타 줄이 한 줄에 들어가는가. 줄바꿈되면 괜찮은가
2. 글 상세 헤더 category 표시: A안(대표 accent + 두 번째 mute)과 B안(동등) 중 원칙 2 "포인트 색 하나"와 위계에 맞는 쪽은
3. OG 이미지(1200×630) 하단 줄에 category 2개가 들어갈 공간이 있는가
4. 위를 바탕으로 A·B 추천과 이유

가능하면 `index.html`(Bitnami·Kafbat 행), `post.html` 헤더, `og.html` 하단 줄을 두 안으로 비교한 캡처나 시안을 같이 주세요. 의견을 받으면 PRD-003 4장을 확정하고 PR-9를 시작합니다. 그동안 개발은 PR-10(E2E·Lighthouse CI)부터 진행합니다.
