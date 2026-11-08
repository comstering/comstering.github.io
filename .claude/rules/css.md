---
paths:
  - "**/*.css"
  - "src/**"
---

# CSS 함정 (겪은 것)

- **CSS `font:` 단축 속성에 `var()`를 여러 개 쓰지 않는다.** 빌드 CSS 압축이 `font:400 var(--a),var(--b)`로 쉼표를 끼워 넣어 선언이 통째로 무효가 된다(dev 서버에서는 정상으로 보여 PR 스크린샷으로는 안 잡힌다, PR-12). `font-family`·`font-size`·`font-weight`로 나눠 쓴다. `check:output`이 빌드 CSS에서 이 패턴을 잡는다.
- **전역 `:focus-visible`(globals.css)은 Tailwind 레이어 밖이라 `outline-none` 유틸리티가 안 먹는다.** 포커스 링을 끄려면 `globals.css`에 일반 CSS 규칙(예: `.post-link:focus-visible`)을 추가한다.
- **`overflow-x-auto` 컨테이너는 안쪽 요소의 `::after` 히트 영역 확장을 위아래로 잘라 낸다**(overflow-y도 auto가 됨). 칩 줄에 `py-1.5 -my-1.5`로 여유를 줘서 해결(Q14).
- **페이지 CSS(`about.css`·`home.css`)는 `globals.css`보다 나중에 로드돼 같은 선택자 우선순위면 이긴다.** 인쇄(`@media print`) 레이아웃 규칙을 globals.css에 두면 화면 규칙에 덮여 시안 크기가 안 먹는다(PR-22에서 쪽 수가 6쪽으로 나온 원인). 인쇄 레이아웃은 `about.css` 끝의 `@media print`에, 라이트 토큰 덮어쓰기·숨김(hex 필요)만 globals.css에 둔다.
- 화면 확인은 `yarn build` 결과(`out/`)로 한다. dev 서버와 빌드 CSS가 다를 수 있다.
