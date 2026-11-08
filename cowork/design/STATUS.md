# 디자인 세션 STATUS

_최종 갱신: 2026-11-08 · 디자인 v1.4 확정 · Phase 0·1·2 종료(보관) · 다음 기준 기획서: Phase 3 PRD(기획이 작성 예정) · 배경과 규칙은 [CONTEXT.md](./CONTEXT.md)_

## 최신 (2026-11-08): Phase 2 종료·보관

Phase 2 디자인 기록(18~37번)을 [archive/phase2-summary.md](./archive/phase2-summary.md)로 요약하고, 코드·E2E가 번호로 인용하는 25·31·32·36번 원문만 `archive/`로 옮겼다. 나머지(18, 22~24, 26~30, 33~35, 37번)는 삭제했고 복구법은 [archive/README.md](./archive/README.md). 개발 PR-18~25는 머지됐고(PR-25 #76), 디자인 쪽 열린 요청은 없다. 작성자 확인만 남았다: G2-1 5초 테스트, PR-24 라이브 Rich Results Test(개발 STATUS 참고).

## 새 세션 인수인계

**읽는 순서:** `CONTEXT.md` → 이 문서. 배경이 더 필요하면 `archive/phase2-summary.md`(필요할 때만). 기획 쪽은 `../prd/README.md`.

**지금 어디까지 했나**
- Phase 0·1·2 모두 끝나 `archive/`에 요약 보관. 시안(`site/`), 명세(`04-design-system.md`), `design-system.html`, `system/`은 그대로다.
- 개발이 PR-19~22와 파비콘을 구현했고 디자인이 시안과 대조해 검토를 마쳤다(36·37번). PR-23(인기글)·PR-24(SEO)·PR-25(게이트)는 디자인 검토를 하지 않았다(화면 변화가 작다).

**작업 재개 방법**
```bash
cd <저장소 루트>
yarn build && python3 -m http.server 4176 --directory out &   # 구현 확인은 항상 빌드한 out/으로
node cowork/design/tools/review-impl.mjs <스크린샷 폴더>        # 구현을 시안과 대조(홈·사이드바·팔레트·About·인쇄)
python3 -m http.server 4174 &                                   # 시안은 저장소 루트에서(프로필 사진 경로)
node cowork/design/tools/check-site.mjs <스크린샷 폴더>         # 시안 8화면 × PC·모바일 검사
node cowork/design/tools/measure-about-first.mjs                # About 첫 화면 위치·인쇄 쪽수
```

**주의할 것 (겪은 함정)**
- **생성기는 지금 실행되지 않는다.** `tools/build-phase2-mockups.py`는 About 데이터를 `src/app/about/page.tsx`에서 읽는데 개발이 `content/*.yaml`로 옮겼다. `about.html`·`index.html`은 확정·구현돼 직접 고치면 된다. 다시 생성해야 하면 생성기가 `content/experience.yaml`·`profile.yaml`을 읽게 고친다.
- 실제 Chrome 창은 폭 406px 아래로 줄지 않는다. 360px 수치는 Playwright Chromium으로 잰다(문서에 도구를 같이 적는다). 화면에 보이는 것은 실제 Chrome으로도 확인한다.
- Chrome 확인은 `tabs_context_mcp {createIfEmpty:true}`로 연 탭 그룹(작성자가 열어 둔 그룹)을 쓰고, 내가 연 탭만 닫는다.
- 백그라운드 세션은 Write/Edit 전에 worktree에 들어가야 한다. 격리 worktree에서는 훅이 `git`을 `rtk git`으로 바꿔 가드가 거부하므로 `/usr/bin/git`을 직접 쓰고, 복잡한 명령은 단순한 명령으로 나눈다.
- 삭제(`git rm`)는 자동 모드 분류기가 거부할 수 있다. 그때는 우회하지 않고 작성자에게 맡긴다.

## 한눈에 보기

| 항목 | 상태 |
|---|---|
| Phase 0·1·2 | **종료·보관.** 요약 [phase0](./archive/phase0-summary.md), [phase1](./archive/phase1-summary.md), [phase2](./archive/phase2-summary.md). 삭제한 번호는 [archive/README.md](./archive/README.md) |
| Phase 3 | 기획이 PRD를 쓴 뒤 시작. 디자인 요청이 오면 18~37번 방식으로 `NN-주제.md`(다음 번호 **38**)로 답한다 |
| 열린 질문 | 디자인 쪽 없음 |
| 지금 막힌 것 | 없음 |

## 다음 작업 (위에서부터)

1. **Phase 3 디자인 요청을 기다린다**(기획 PRD 이후). 요청이 오면 `CONTEXT.md` 4장의 확정 결정을 먼저 확인한다.
2. 개발이 화면이 바뀌는 PR을 올리면 `yarn build` → `tools/review-impl.mjs` → 실제 Chrome으로 검토한다.
3. 시안용 `site/og/*.png`(16개, 약 0.7MB)는 대표만 남기고 정리할 수 있다(급하지 않음).
4. 작성자 확인 대기(디자인 몫 아님): 실제 Chrome 탭 줄의 파비콘(옛 아이콘이 보이면 `⌘⇧R`), G2-1 5초 테스트.

## 열린 항목 (디자인이 판단하거나 사용자 확인이 필요한 것)

| # | 항목 | 내용 | 담당 |
|---|---|---|---|
| O-1 | `.ph`(시안 표시) 잔존 | `site/post.html` 4개, `projects.html` 5개, `project.html` 1개. `projects`·`project`는 만들지 않아 보관만 한다. `about`·`index`는 0개 | 해당 없음(보관) |
| O-2 | 모바일 `#` 앵커 높이 | 360px에서 23px(권장 44px 미달). 호버에서만 보이는 보조 링크라 판단 보류 | 디자인(판단 보류) |
| O-3 | 실제 Chrome 확인 잔여 | 정확한 360px(Chrome 창 최소폭 406px), 핀치 확대, Safari·Firefox, 실기기, 스크린리더 낭독, 확대 창 캡션, 실제 탭 줄 파비콘 | 사용자(실기기·Safari) |
| O-5 | 필터 깜빡임 재검토 조건 | 실기기·느린 네트워크에서 약 1초 이상 보이거나 필터 URL 유입이 늘면 재검토. 측정값은 `archive/phase1-summary.md` 3장 | 데이터가 생기면 |
| O-7 | impeccable 완전 사본·감지기 | 번들 감지기는 GitHub release 바이너리를 내려받아 실행한다. 결과가 필요하면 설치와 실행을 사용자가 승인해야 한다 | 사용자 |

(O-8 확대 `<dialog>` 배경 스크롤 잠금은 개발 PR-20에서 반영돼 닫았다.)

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-10-27 ~ 10-31 | Phase 0·1 이력(시안 v1.0→v1.4, 개발 Q5·Q7~Q10·Q14 답변, PR-9~PR-14 검토, impeccable audit 16/20). 상세는 `archive/phase0-summary.md`, `archive/phase1-summary.md` |
| 2026-11-01 | Phase 0·1 종료·보관. 원문 01~21번 중 12·19·21번만 `archive/`에 남김 |
| 2026-11-02 ~ 11-07 | Phase 2 이력(재검토 반영, 히어로 확정, About 현재 회사 제거, 홈 OG B, `DESIGN.md` 반영안, 개발 인수, 파비콘 C `c_`, 개발 Q19~Q23 답변·PR-19~22 검토). 상세는 `archive/phase2-summary.md` |
| 2026-11-08 | `.claude/rules` 점검: 링크·참조 이상 없음, 경로 지정 규칙은 Read·Write·Edit 때 불려오고 Bash는 `cat`·`head`만 해당(공식 문서). 작성자 지시로 PRD-001·004의 옛 문구 "씁니다"를 "기록합니다"로 정정(#73) |
| 2026-11-08 | **Phase 2 종료·보관(작성자 요청).** `archive/phase2-summary.md` 작성, 25·31·32·36번을 `archive/`로 이동하고 안의 링크를 고침, 나머지 13개 번호 삭제(복구는 `archive/README.md`). README·CONTEXT·STATUS 갱신. 기획의 PRD 정리(004 보관, 005 추가, 001·README 갱신)는 기획이 끝낸 작업이라 이 PR에 함께 담음. 개발 STATUS의 25번 링크 경로 1곳 수정 |
