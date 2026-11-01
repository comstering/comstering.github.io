# 디자인 세션 STATUS

_최종 갱신: 2026-11-01 · 디자인 v1.4 확정 · Phase 0·1 종료(보관) · 기준 기획서 PRD-004(Phase 2) · 배경과 규칙은 [CONTEXT.md](./CONTEXT.md)_

## 한눈에 보기

| 항목 | 상태 |
|---|---|
| Phase 0·1 | **종료·보관.** 요약 [archive/phase0-summary.md](./archive/phase0-summary.md), [archive/phase1-summary.md](./archive/phase1-summary.md). 삭제한 번호는 [archive/README.md](./archive/README.md)에서 찾는다 |
| Phase 2 | PRD-004 approved, 개발 PR-18부터 시작 가능. 디자인 요청은 [18번](./18-planning-request-phase2.md) D-1~D-5 |
| 열린 질문 | 없음(개발 Q14·Q15 closed) |
| 지금 막힌 것 | 없음 |
| 저장소 상태 | 개발 쪽 기준 `main` `ccb7361`(#57 머지). 이 폴더의 정리(archive, README·CONTEXT·STATUS 개정)는 **미커밋**. 작업 폴더를 개발·기획과 같이 쓰므로 PR은 별도 worktree에서 만든다 |

## 다음 작업 (위에서부터)

1. **Phase 2 시안(18번).** D-1 About 경력 시안(관련 글·앵커·펼침), D-2 이력서 `resume.html`(웹 + A4 인쇄), D-3 About 갱신(기술 스택 7그룹, Credly `verify ↗`), D-4 홈 히어로·대표 프로젝트, D-5 About CLS 해법(폴백 글꼴 크기 보정 `size-adjust` 등). 기준은 PRD-004 4~5장, 새 시안도 `system/`의 토큰·컴포넌트만 쓴다.
2. **Q14(#57) 반영 재확인.** 코드 블록 `tabindex`(Safari 등), 글자 200% 헤더·PC 목차 넘침, 터치 대상 44px. 빌드한 `out/`으로 하고 도구(Playwright, 실제 Chrome)를 같이 적는다.
3. O-8을 개발에 보낼지 결정(아래).
4. 시안용 `site/og/*.png`(16개, 약 0.7MB)를 대표 2~3장만 남기고 정리. PR-15(OG)가 머지됐으므로 가능하다.

## 열린 항목 (디자인이 판단하거나 사용자 확인이 필요한 것)

| # | 항목 | 내용 | 담당 |
|---|---|---|---|
| O-1 | `.ph`(시안 표시) 잔존 | `site/post.html` 4개, `projects.html` 5개, `project.html` 1개. 조회수(`1,204 views`)는 실제 기능의 샘플 숫자라 오류가 아니다. 나머지는 Phase 2 값이라 그때 정한다 | Phase 2 기획 |
| O-2 | 모바일 `#` 앵커 높이 | 360px에서 23px(권장 44px 미달). 호버에서만 보이는 보조 링크라 심각하지 않음. 터치에서 항상 보이게 할 계획이면 히트 영역 확대 | 디자인(판단 보류) |
| O-3 | 실제 Chrome 확인 잔여 | Chrome 156으로 홈·글·확대·라이트는 확인함(archive/phase1-summary 4장). **못 한 것:** 정확한 360px(Chrome 창 최소폭 406px), 핀치 확대, Safari·Firefox, 실기기, 스크린리더 낭독, 확대 창 캡션(`figcaption` 있는 글이 아직 없음) | 사용자(실기기·Safari) |
| O-5 | 필터 깜빡임 재검토 조건 | 실기기·느린 네트워크에서 약 1초 이상 보이거나 필터 URL 유입이 늘면 (a)안(data 속성 + 인라인 스크립트) 검토. 측정값은 `archive/phase1-summary.md` 3장 | 데이터가 생기면 |
| O-7 | impeccable 완전 사본·감지기 | 번들 감지기는 `scripts/impeccable` 런처가 **GitHub release 바이너리를 내려받아 실행**한다. 결과가 필요하면 설치와 실행을 사용자가 승인해야 한다 | 사용자 |
| O-8 | 확대 `<dialog>` 배경 스크롤 잠김 없음 | 실제 Chrome에서 확대 창을 연 채 휠을 돌리면 뒤 페이지가 스크롤된다(500px 이동, `html`·`body` overflow `visible`). 이전 Playwright 확인은 이를 못 잡았다. 영향은 낮음(닫으면 뒤 페이지 위치만 바뀜) | 디자인 → 개발 (미발송) |

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-10-27 ~ 10-31 | 디자인 검토·답변 이력(시안 v1.0→v1.4, 개발 Q5·Q7~Q10·Q14 답변, PR-9~PR-14 구현 검토, impeccable audit 16/20). 상세는 `archive/phase0-summary.md`, `archive/phase1-summary.md` |
| 2026-11-01 | 로컬 세션에서 `/chrome` 연결, 빌드 산출물을 Chrome 156으로 확인. 새 항목 O-8, Q14 P1은 Chrome에서 증상 없음으로 보정 |
| 2026-11-01 | **Phase 0·1 종료·보관.** 요약 2개를 `archive/`에 작성. 원문 01~21번 중 12·19·21번만 `archive/`로 이동, 04·18번은 유지, 나머지 16개는 삭제(Git `0012ede`에서 복구). 이 폴더의 README·CONTEXT·STATUS와 `/DESIGN.md`·PRD의 경로 링크를 정리. STATUS를 Phase 2 중심으로 재작성 |
