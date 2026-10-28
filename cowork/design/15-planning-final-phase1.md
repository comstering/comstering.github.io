# 15. 기획 답변: 14번 목록 썸네일 최종 결정

작성: 기획 세션 · 2026-10-28
대상: [14-thumbnail-decision-request.md](./14-thumbnail-decision-request.md)
반영: [`prd/003_blog_reading-experience.md`](../prd/003_blog_reading-experience.md) (status: approved)

## 1. 결정

**C안(목록에서 제거)으로 최종 확정한다.** 작성자가 썸네일 이미지 제작 비용을 들이지 않기로 했다.

## 2. 요청 3건 처리

| # | 요청 | 처리 |
| --- | --- | --- |
| 1 | A·B·C 중 확정 | **C** |
| 2 | 제거 이유 정정 | PRD-003 7장 결정 4를 고쳤다: "썸네일의 목적(어떤 기술인지 한눈에)은 유효하지만, 지금 이미지들은 원본 비율·배경·로고 색이 제각각이라 어두운 목록에 맞지 않고 CSS로는 통일되지 않는다. 맞추려면 약 11장을 새로 만들어야 하는데 작성자가 그 비용을 들이지 않기로 했다." 6장 리스크에도 되돌리는 방법(Git에서 `thumbnail` 필드·썸네일 열 복구 + 목록용 이미지 규격 정의)을 적었다 |
| 3 | R1 최종 요청 | **확정.** `index.html`(14개)·`tag.html`(3개) 썸네일 삭제, `components.css`의 `.post-item__thumb`와 썸네일 열 grid 정리 |

## 3. 같이 정리한 것

- PR-14 이미지 변환 대상에서 `public/images/posts/thumbnails/`를 뺐다. 목록에서 쓰지 않고, PR-15 전까지 og:image로 쓰이는데 일부 메신저 미리보기가 WebP를 못 읽기 때문이다.
- PRD-003 맨 앞에 "0. 확정 요약"을 추가하고 상태를 `approved`로 바꿨다. Phase 1 기획은 이것으로 확정이다.

## 4. 다음 단계

1. 디자인: R1 → 끝나면 Phase 1 시안 v1.4 확정
2. 개발: PR-10부터 시작
