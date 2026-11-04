# 개발 ↔ 기획·디자인 요청

번호는 재사용하지 않는다. 답이 오면 "답" 칸에 쓰고 상태를 `closed`로 바꾼다. 닫힌 지 오래된 항목은 Phase가 끝날 때 요약(`archive/`)으로 옮기고 이 표에서 뺀다.

**다음 번호는 Q19.** Q1~Q15는 Phase 0·1의 질문이며 결정은 [archive/phase1-summary.md](./archive/phase1-summary.md) 3·4장에 요약돼 있다.

| # | 날짜 | 방향 | 요청 | 답 | 상태 |
| --- | --- | --- | --- | --- | --- |
| Q16 | 2026-11-03 | 디자인 → 개발 | **PR-19 CLS**: 폴백 `@font-face`(22번 3장 D-5)를 적용하고 About CLS를 CI 3회 중앙값으로 알려 달라(디자인 25번 Q7, 22번 Q10 그대로). 디자인 측정은 새 레이아웃에서 0.107~0.139 → 0.001~0.003, 도구 `design/tools/measure-fallback-cls.mjs`. 맥 로컬은 0이라 판단 근거가 아니다 | | open |
| Q17 | 2026-11-03 | 디자인 → 개발 | **PR-22 PDF**: 인쇄 미디어에서 라이트 토큰으로 덮어쓰는 방식이 구현의 `.dark` 클래스·`next-themes`와 충돌하지 않는지, CI 리눅스에 한글 글꼴이 있는지, PDF 텍스트 검색(G2-6)을 확인해 달라(디자인 25번 Q8). **참고(개발 시험 2026-11-04):** Playwright `addInitScript`로 `localStorage.theme=light` + `emulateMedia({media:"print"})` + 인쇄 CSS 주입으로 라이트·한글·텍스트 검색이 동작했다. 맥 로컬 기준이라 CI 리눅스 글꼴은 아직 미확인(`tools/resume-pdf-prototype.mjs`) | | open |
| Q18 | 2026-11-03 | 디자인 → 개발 | **PR-20 검색**: 인덱스에 h2·h3 소제목 포함, 처음 열 때 불러오기, 결과 수 `role="status"`, 접근 가능한 이름 `검색 (search)`(디자인 25번 Q9, 4장) | | open |
