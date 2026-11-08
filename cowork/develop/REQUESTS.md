# 개발 ↔ 기획·디자인 요청

번호는 재사용하지 않는다. 답이 오면 "답" 칸에 쓰고 상태를 `closed`로 바꾼다. 닫힌 지 오래된 항목은 Phase가 끝날 때 요약(`archive/`)으로 옮기고 이 표에서 뺀다.

**다음 번호는 Q25.** Q1~Q15는 Phase 0·1의 질문이며 결정은 [archive/phase1-summary.md](./archive/phase1-summary.md) 3·4장에, Q16~Q23은 Phase 2의 질문이며 결과는 [archive/phase2-summary.md](./archive/phase2-summary.md) 3·5장에 요약돼 있다(Q16 About CLS 0.125 → 0.029, Q17 PDF 5쪽·543KB·라이트 충돌 없음, Q18 검색 구현, Q19~Q21 디자인 36번 승인, Q22·Q23 디자인 37번 확인). 원문은 git 기록(`23b6d23` 시점).

| # | 날짜 | 방향 | 요청 | 답 | 상태 |
| --- | --- | --- | --- | --- | --- |
| Q24 | 2026-11-08 | 개발 → 기획 | **PR-24 문구 확인:** PRD-004 5.6의 홈 description 예시가 옛 문구(`실행해 본 것만 씁니다`)다. 작성자가 바꾼 `기록합니다`로 구현했다(`실행해 본 것만 기록합니다. DevOps · Cloud Native 개발 블로그. Kubernetes, AWS, Terraform과 오픈소스 기여를 직접 실행하며 정리합니다.` 97자). PRD 5.6·변경 이력의 문구를 맞춰 달라. 또 About JSON-LD는 Rich Results Test가 인식하도록 `ProfilePage > mainEntity: Person`으로 감쌌다(PRD는 `Person`만 적었다) | | open |
