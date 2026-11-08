---
paths:
  - "src/**"
  - "cowork/design/site/**"
  - "cowork/design/system/**"
---

# UI 규칙 (구현과 시안 공통)

- 색은 [DESIGN.md](../../DESIGN.md)의 토큰만 쓴다. hex, `dark:` 색상 클래스, Tailwind 기본 팔레트(`gray-*`, `sky-*` 등)는 금지. `yarn check:tokens`가 `src/`(`globals.css` 제외)에서 검사한다.
- 글 목록은 카드 그리드가 아니라 세로 리스트.
- 시안 표시용 `.ph` 클래스는 시안 단계에만 쓴다(구현에서는 `check:tokens`에 걸린다). 시안은 `cowork/design/system/`의 토큰·컴포넌트만 쓴다.
- 360px에서 가로 넘침 0. 터치 대상은 가능하면 44px.
- `<img>`에는 `alt`를 둔다(장식은 `alt=""`). h1은 화면당 1개.
- **그리드·플렉스 자식에는 `min-w-0`**을 붙인다. 안 붙이면 글자를 키울 때 내용 폭만큼 늘어나 가로 넘침이 난다(About 카드 185px). 확인은 E2E `글자 200%에서 가로로 넘치지 않는다`와 Chrome에서 `html{font-size:200%}` 주입.
- 헤더는 `flex-wrap`이라 360px·글자 200%에서 세 줄(약 217px)로 접힌다. 진행률 바는 `top: var(--header-h)`(64px) 고정이라 이때는 헤더 안쪽에 겹친다(가장자리 경우라 두었다).

## 구현 전에 시안과 대조

- 구현 전에 최종 시안의 마크업·CSS(`cowork/design/site/*.html`, `cowork/design/system/components.css`)와 해당 영역의 최신 디자인 답변(`cowork/design/`의 최신 번호 문서)을 대조한다. 안 하면 PR 후에 시안과 어긋난 곳이 나온다(PR-11에서 겪음: 아이콘·`warning` 라벨·`$ ` 프롬프트 분리·표 흐림 방향).
- 시안과 다르게 구현한 곳은 숨기지 않고 `cowork/develop/STATUS.md`의 "시안 대비 차이"에 적는다.
- `cowork/design/README.md`의 일부 문구가 뒤처질 수 있다. 의심되면 현재 PRD와 `cowork/design/`의 최신 번호 문서를 기준으로 본다.
