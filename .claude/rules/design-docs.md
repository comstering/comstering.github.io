---
paths:
  - "cowork/design/**"
---

# 디자인 문서 규칙

- 질문·답변·제안은 `NN-주제.md`로 추가한다. **번호는 재사용하지 않는다**(삭제된 번호 포함). 새 번호를 쓰기 전에 `cowork/design/README.md`와 `archive/README.md`에서 마지막 번호를 확인한다.
- 문서를 추가하면 `cowork/design/README.md` 파일 목록에 한 줄 넣는다.
- 시안은 `site/<page>.html`이고, 모든 시안은 `system/`의 토큰과 컴포넌트만 쓴다(UI 규칙은 [ui.md](./ui.md), 접근성은 [a11y.md](./a11y.md)).
- `DESIGN.md`에 반영된 항목은 해당 문서에 `✅ 반영됨 (날짜)` 표시를 한다.
- 디자인 세션은 `/DESIGN.md`와 `src/`를 고치지 않는다(구현 세션 작업).
- 결정이 바뀌면 `cowork/design/CONTEXT.md` 4장(확정된 디자인 결정)도 고친다.
- 기획 결정이 필요한 것은 사용자에게 알리고, 문서에는 "기획 결정 대기"로 표시한다.
- 저장소에 쓰지 않고 한 시안·측정은 재현할 수 있게 방법을 문서에 적는다.
