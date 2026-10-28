# 03. 참고 자료

"통째로 따라 하기"가 아니라 **무엇을 가져올지**를 기준으로 정리한다. Terminal Graphite 톤과 충돌하는 요소(그라디언트, 일러스트, 다색 포인트)는 가져오지 않는다.

## 1. 사이트

| 사이트 | 가져올 것 | 적용 위치 |
|---|---|---|
| [toss.tech](https://toss.tech) | 한글 기술 글의 본문 폭·줄간격, 세로 글 목록, 큰 제목과 짧은 설명의 위계 | 글 목록, 글 상세 타이포 |
| [joshwcomeau.com](https://www.joshwcomeau.com) | sticky 목차와 현재 섹션 표시, 코드 블록 파일명 헤더, 콜아웃 | F-PO-03, 04, 12 |
| [overreacted.io](https://overreacted.io) | 장식 없는 글 목록, 본문만 남긴 집중도 | 원칙 1 |
| [leerob.com](https://leerob.com) | 모노 메타와 미니멀한 내비, 짧은 소개 | 헤더, 홈 히어로 |
| [brittanychiang.com](https://brittanychiang.com) | 경력 리스트: 왼쪽 기간 열 + 오른쪽 내용 + 기술 칩, 프로젝트 근거 링크 | About 타임라인, Projects 목록 |
| [rauchg.com](https://rauchg.com) | 연도별 글 목록, 극단적으로 단순한 정보 구조 | 홈 연도 그룹 |
| [Linear / Raycast](https://raycast.com) 명령 팔레트 | 그룹 라벨, 키 힌트, 선택 행 표시 | F-SR-01 |

## 2. 규칙·표준

| 자료 | 용도 |
|---|---|
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — 1.4.3 대비, 1.4.11 비텍스트 대비, 2.5.8 타깃 크기 | NF-03, NF-04, `line-strong` 근거 |
| [WAI-ARIA APG: Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) · [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | 명령 팔레트 포커스 트랩·키보드 |
| [GitHub alerts 문법](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) | `> [!NOTE]` 콜아웃(F-PO-12) |
| [Giscus](https://giscus.app) — 커스텀 테마·postMessage | F-PO-08 테마 동기화 |
| [Pagefind](https://pagefind.app) | F-SR-02 검색 결과 스니펫 UI 참고 |

## 3. 저장소 안 기준 문서

- `/DESIGN.md`: 확정 디자인 시스템 (토큰, 금지 패턴)
- `/src/app/globals.css`: 토큰 구현
- `/SKILLS.md`: 디자인 작업 시 쓰는 skill (impeccable, ui-ux-pro-max, design-taste-frontend)
- PRD: https://claude.ai/artifact/XdKSaRVCspv3yckqG8TKAT
