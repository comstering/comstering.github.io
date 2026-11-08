---
paths:
  - "e2e/**"
  - "playwright.config.*"
  - "lighthouserc.json"
  - ".github/workflows/**"
---

# E2E·CI 함정 (겪은 것)

- E2E는 `out/`을 쓴다. 코드를 고치고 `yarn build`(와 `yarn build:resume`) 없이 테스트하면 이전 결과로 돈다.
- **링크가 `::before`로 행 전체를 덮으면** Playwright `locator.click()`이 대상이 가로채였다며 30초를 기다린다. 좌표(`page.mouse.click`)로 누른다.
- **홈 글 목록은 하이드레이션 때 정적 HTML에서 클라이언트 렌더로 교체된다**(`useSearchParams`). 교체 직전 요소를 재면 `boundingBox()`가 null이라 E2E가 간헐 실패하므로 위치·크기 검사는 `expect(async () => …).toPass()`로 통째로 재시도한다(PR-21 CI).
- **CI에서만 나오는 문제가 있다.** 리눅스 CI Lighthouse는 맥 로컬과 글꼴·CPU가 달라 CLS가 다르게 나온다(About 로컬 0 vs CI 0.125). Lighthouse 단계를 `error`로 올리기 전에 CI 결과를 본다. 리포트는 아티팩트 `e2e-lighthouse-reports`(`.lighthouseci`)에서 받는다(`gh run download <run> -n e2e-lighthouse-reports`).
- Lighthouse 차단선을 넘으면 기준을 조용히 낮추지 않고 기획에 묻는다. 게이트 기준값은 `cowork/develop/CONTEXT.md` 6장.
