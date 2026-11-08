# 디자인 세션 STATUS

_최종 갱신: 2026-11-07 · 디자인 v1.4 확정 · Phase 0·1 종료(보관) · 기준 기획서 PRD-004(Phase 2) · 배경과 규칙은 [CONTEXT.md](./CONTEXT.md)_

## 최신 (2026-11-07 저녁): 개발 PR-19~22·파비콘 검토 완료

[37번](./37-design-review-pr22-favicon.md): 36번 수정 요청 4건이 모두 반영됐고(#67), `resume.pdf`는 5쪽·543KB(#66), 파비콘 #68은 합격이다. 홈 449/453px, About 직함 360px 1줄, 상단 경로 복원, 파비콘 3종이 배포 사이트(`comstering.github.io`)에도 반영돼 있다. 디자인 쪽 열린 요청 없음. 다음은 개발 PR-23(인기글)·PR-24(SEO)·PR-25(게이트) 검토다. 아래 "최신 (2026-11-07): 디자인 확정, 개발로 인수" 절은 직전 기록이다.

## 최신 (2026-11-07): 디자인 확정, 개발로 인수

기획 33번 수신(`DESIGN.md` 원칙 4 문장 확정, 시그니처 3번 `// popular`)과 작성자 결정(**홈 OG는 B**, 인쇄 미리보기 확인함)을 32·31번·`og.html`·CONTEXT에 반영했다. 개발 인수 문서는 **[34번](./34-handoff-to-develop.md)**(PR-18~22 입력·기준 수치). 작성자가 개발 세션에 중계한다. OG 한글 글리프는 개발이 satori 빌드에서 확인한다. **디자인에 남은 열린 질문 없음.** 아래 "다음 작업" 1번은 종결됐다.

## 새 세션 인수인계 (2026-11-05)

**읽는 순서:** `CONTEXT.md` → 이 문서 → 최신 답변 **[31번](./31-design-response-d12-d15.md)**(D-15·D-12·O-8)·**[32번](./32-designmd-phase2-proposal.md)**(`DESIGN.md` 반영안). 배경은 기획 [29번](./29-planning-response-hero-final.md)·[30번](./30-planning-request-about-bio.md)과 `../prd/004_portfolio_projects-and-about.md`. 22번(일부 철회, 상단 안내)과 25번 이전 문서는 필요할 때만 본다.

**지금 어디까지 했나**
- Phase 0·1은 끝나 `archive/`에 요약 보관(원문은 12·19·21번만 남기고 삭제, Git `0012ede`에서 복구).
- **Phase 2 시안은 확정 상태다.** 홈=블로그(히어로 확정: `$ history` + "실행해 본 것만 씁니다", 28번), About=경력(전부 펼침, 첫 화면에 현재 회사 없음·클래스101 직함 `Software Engineer`, 30·31번), 헤더 검색 팔레트(글만 검색), About 인쇄 = `resume.pdf`(A4 5쪽).
- 이번 세션(11-05)에 한 일: D-11 히어로 비교·확정(28번), D-15 About 문구 변경, D-12 홈 OG 3종 시안, D-13 `DESIGN.md` 반영안(32번), D-14 문서 정리(이 문서), O-8 개발에 보내기로 결정.

**작업 재개 방법**
```bash
cd <저장소 루트>
python3 cowork/design/tools/build-phase2-mockups.py     # about.html, index.html, search-index.js 재생성
python3 -m http.server 4174 &                            # 반드시 저장소 루트에서(프로필 사진 경로)
node cowork/design/tools/check-site.mjs <스크린샷 폴더>   # 8화면 × PC·모바일 검사
node cowork/design/tools/measure-about-first.mjs         # About 첫 화면 위치·인쇄 쪽수(31번)
node cowork/design/tools/measure-fallback-cls.mjs about.html   # D-5 CLS(폴백 글꼴)
# About: http://localhost:4174/cowork/design/site/about.html   홈: …/index.html   홈 OG 3종: …/og.html
```

**주의할 것 (겪은 함정)**
- **생성기 한계(11-07):** `tools/build-phase2-mockups.py`는 About 데이터를 `src/app/about/page.tsx`에서 읽는데, 개발 PR-18·19가 데이터를 `content/*.yaml`로 옮기고 그 파일을 없애 **지금은 실행되지 않는다**(`const experiences` 못 찾음). About·홈 시안은 확정·구현이 끝나 다시 만들 일이 거의 없고, 홈 문구는 `index.html`을 직접 고쳤다. 다시 만들어야 하면 생성기가 `content/experience.yaml`·`profile.yaml`을 읽도록 고친다.
- `about.html`·`index.html`은 **생성물**이다. 직접 고치면 다음 생성에서 사라진다. 고칠 때는 `tools/build-phase2-mockups.py`를 고친다(히어로 값은 `TAGLINE`·`HERO_CMD`, 클래스101 직함은 `ROLE_OVERRIDE`). 홈 글 목록(`.home__list`)만 `index.html`에서 읽어 재사용한다(손으로 관리). 생성기는 `index.html`을 껍데기(head·header·footer·팔레트)의 원본으로도 쓴다.
- 공통 CSS·JS는 `system/`. 이번 Phase 규칙은 `components.css` 맨 끝 구간(Phase 2)과 `app.js`의 팔레트 구간.
- **CSS를 일괄 치환할 때 한 줄에 `@media … { 규칙 }`가 같이 있는 줄을 조심한다.** `.intro__facts` 정규식이 `@media` 줄을 반쪽만 지워 중괄호가 깨진 적이 있다(576/575). 고친 뒤에는 `{`·`}` 개수를 세고 이전 Git 버전과 대조한다.
- `html { scroll-padding-top }`이 앵커 위치를 맡는다. 항목에 `scroll-margin-top`을 또 주면 두 번 더해진다.
- 실제 Chrome 창은 폭 406px 아래로 줄지 않는다. 360px 수치는 Playwright Chromium으로 잰다(문서에 도구를 같이 적는다).
- Chrome 확인은 `tabs_context_mcp {createIfEmpty:true}`로 **새 탭 그룹을 만든 뒤** 쓴다. 끝나면 탭을 닫는다.
- 백그라운드 세션은 `Write`/`Edit`이 worktree 격리를 요구한다. 11-05~11-07에는 변경이 전부 공유 체크아웃의 미커밋 파일이라 작성자 승인으로 거기서 Bash로 썼다. 11-07에 PR로 올린 뒤에는 `main`에 있으므로 새 작업은 worktree에서 한다.
- 격리된 worktree에서는 훅이 git 명령을 `rtk git …`으로 바꿔 격리 가드가 거부한다. 이때는 래퍼 없이 `/usr/bin/git`으로 직접 호출한다. 스크립트 본문에 "git"이 들어간 python도 가드가 막으므로 문서 수정은 Edit 도구로 한다.

**저장소 상태**
- **2026-11-07 Phase 2 디자인·기획 기록을 PR #62로 올렸다**(브랜치 `docs/phase2-design-prd`, 대상 `main`): Phase 2 시안, 22~34번 문서, README·CONTEXT·STATUS, `tools/`, `system/`, `site/*`, `cowork/prd/*`(기획 세션의 수정 포함). 머지 전에는 작성자의 작업 폴더 파일이 원본이다.
- **PR에 넣지 않은 것(내 것이 아님):** 루트 `resume.md`(작성자), 루트 `resume.pdf`(개발 세션이 작성자 요청으로 만든 시험 산출물, 개발 STATUS 참고), `.claude/launch.json`, `posts/custom-networking-karpenter-eni-troubleshooting.md`(제목 오타 수정은 개발 PR-18에서 이미 반영됨).
- 올릴 때는 별도 worktree에서 새 브랜치로 만들고 `git add`는 파일을 지정해서 한다(`-A` 금지). **커밋·PR은 작성자가 요청할 때만 한다.**

## 한눈에 보기

| 항목 | 상태 |
|---|---|
| Phase 0·1 | **종료·보관.** 요약 [archive/phase0-summary.md](./archive/phase0-summary.md), [archive/phase1-summary.md](./archive/phase1-summary.md). 삭제한 번호는 [archive/README.md](./archive/README.md) |
| Phase 2 | PRD-004 approved. **디자인 시안 확정(2026-11-05)**, 개발은 PR-18~22와 파비콘까지 머지(#60~#68, 11-07), 디자인 검토 완료(36·37번). 남은 개발: PR-23 인기글, PR-24 SEO, PR-25 게이트·문서 |
| 열린 질문 | 디자인 쪽 없음. 개발 REQUESTS Q19~Q23은 36·37번으로 답함(번호 링크는 개발 몫). 인쇄 미리보기·파비콘 탭은 작성자가 확인 |
| 지금 막힌 것 | 없음 |
| 저장소 상태 | 디자인·기획 기록 PR #62·#65와 이 검토 기록 PR이 `main`에 머지/오픈. 작업 폴더를 개발·기획과 같이 쓰므로 PR은 별도 worktree에서 만든다 |

## 다음 작업 (위에서부터)

0. **(종결 11-07) 개발 Q19~Q23 답변·검토 완료**(36·37번): 파비콘 C `c_`, 36번 수정 4건, `resume.pdf` 5쪽. 개발이 PR-23~25를 올리면 `tools/review-impl.mjs`와 실제 Chrome으로 검토한다.

1. **(종결 11-07) 31번 Q1~Q3.** OG B 확정, 원칙 4 확정(33번), 인쇄 미리보기 작성자 확인. 개발 인수는 34번.
2. **O-8을 개발에 보낸다**(31번 5장을 개발이 `REQUESTS.md`에 번호로 링크). PR-20에서 검색 팔레트와 함께 처리.
3. **(PR-19~22는 36·37번으로 검토 완료)** 이전 항목: PR-19: About CLS(`size-adjust`)를 CI 3회 중앙값으로 확인한 결과를 받고(25번 Q7), 첫 화면에 현재 회사 없음·직함 `Software Engineer`를 시안과 대조. PR-20(검색)·PR-21(홈, OG 포함)·PR-22(PDF, 한글·텍스트 검색 G2-6)는 시안과 대조. 검토 기준은 25번 7장·32번.
4. **`DESIGN.md` 반영**(개발 PR-19에서 32번 1~3장을 옮김). 반영하면 32번에 `✅ 반영됨 (날짜)`.
5. **Q14(#57) 반영 재확인.** 코드 블록 `tabindex`(Safari 등), 글자 200% 헤더·PC 목차 넘침, 터치 대상 44px. 빌드한 `out/`으로 하고 도구를 같이 적는다.
6. 시안용 `site/og/*.png`(16개, 약 0.7MB) 정리.

## 열린 항목 (디자인이 판단하거나 사용자 확인이 필요한 것)

| # | 항목 | 내용 | 담당 |
|---|---|---|---|
| O-1 | `.ph`(시안 표시) 잔존 | `site/post.html` 4개(조회수 `1,204 views` 등 샘플 값), `projects.html` 5개, `project.html` 1개. Phase 2에서 `projects`·`project`는 만들지 않아 보관만 한다. `about`·`index`는 0개 | 해당 없음(보관) |
| O-2 | 모바일 `#` 앵커 높이 | 360px에서 23px(권장 44px 미달). 호버에서만 보이는 보조 링크라 심각하지 않음. 터치에서 항상 보이게 할 계획이면 히트 영역 확대 | 디자인(판단 보류) |
| O-3 | 실제 Chrome 확인 잔여 | **못 한 것:** 정확한 360px(Chrome 창 최소폭 406px), 핀치 확대, Safari·Firefox, 실기기, 스크린리더 낭독(검색 `role="status"` 포함), 확대 창 캡션, satori로 만든 OG PNG(개발이 확인). 인쇄 미리보기는 작성자가 확인함(11-07) | 사용자(실기기·Safari) |
| O-5 | 필터 깜빡임 재검토 조건 | 실기기·느린 네트워크에서 약 1초 이상 보이거나 필터 URL 유입이 늘면 (a)안 검토. 측정값은 `archive/phase1-summary.md` 3장 | 데이터가 생기면 |
| O-7 | impeccable 완전 사본·감지기 | 번들 감지기는 GitHub release 바이너리를 내려받아 실행한다. 결과가 필요하면 설치와 실행을 사용자가 승인해야 한다 | 사용자 |
| O-8 | 확대 `<dialog>` 배경 스크롤 잠김 없음 | **개발에 보내기로 결정(31번 5장).** PR-20 검색 팔레트와 함께 처리 | 개발(PR-20) |

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-10-27 ~ 10-31 | 디자인 검토·답변 이력(시안 v1.0→v1.4, 개발 Q5·Q7~Q10·Q14 답변, PR-9~PR-14 구현 검토, impeccable audit 16/20). 상세는 `archive/phase0-summary.md`, `archive/phase1-summary.md` |
| 2026-11-08 | **`.claude/rules` 점검(작성자 요청).** 링크·파일 참조 이상 없음. 경로 지정 규칙은 Read·Write·Edit 때 불려오고 Bash는 `cat`·`head`만 해당(공식 문서)임을 확인해 `rules/README.md`에 적음. 이번 세션에서 worktree 안 Edit 때 `prd-docs`·`cowork-docs`가 실제로 불려옴. **작성자 요청으로 PRD-001·004의 옛 문구 "씁니다"를 "기록합니다"로 정정**(기획 폴더지만 작성자 지시, 현재값만 바꾸고 11-05 결정 기록은 유지). **못 한 것:** 새 세션에서 항상 읽히는 규칙 목록 확인, Bash만 쓰는 디자인 작업 경로 |
| 2026-11-01 | **Phase 0·1 종료·보관.** 요약 2개를 `archive/`에 작성. 원문 01~21번 중 12·19·21번만 `archive/`로 이동, 04·18번은 유지, 나머지 삭제(Git `0012ede`에서 복구). 로컬 세션에서 Chrome 156으로 빌드 산출물 확인, 새 항목 O-8 |
| 2026-11-02 ~ 11-03 | 기획 재검토(23·24번) 반영, **Phase 2 시안 재작업.** About 전부 펼침·회사 바로가기·밀도 V3(데스크톱 −19%), About 인쇄 `@media print`(A4 5쪽, 22번 `resume.html`은 삭제), 헤더 검색 팔레트(글만, `system/search-index.js`), 홈 히어로 3안+2b·사이드바. D-5 폴백 보정 0.107~0.139 → 0.001~0.003(대역 측정). 22번은 일부 철회, 25번 답변·질문 9건 |
| 2026-11-04 | 세션 종료 전 인수인계 정리 |
| 2026-11-07 | **개발 Q22·Q23 답변, PR-22·파비콘 검토(37번):** `main`(`e5b46d4`) 빌드. 36번 수정 4건 모두 반영 확인(홈 449/453px, About 직함 360px 1줄·340px 이하 2줄, 상단 경로·인쇄 숨김, 팔레트 `닫기`), `resume.pdf` 5쪽·543KB·글자 407종(실제 Chrome PDF 뷰어로 쪽 경계 확인, 자격증 섹션이 4/5쪽에 걸림은 허용), 파비콘 링크 3종·파일 일치·16/32px 라이트·다크 확인, 배포 사이트 반영 확인. 실제 탭 줄 파비콘은 도구 한계로 못 봄 |
| 2026-11-07 | **개발 Q19~Q21 답변(36번):** `main`(PR-21)을 빌드해 시안과 대조(`tools/review-impl.mjs`). 승인: 영문 직함·`최한수입니다`·`BoB 10기`·skills 2개·`esc 닫기`·태그 버튼·시리즈 링크·로고 `~/_`·홈 OG 한글(정상). 수정 요청: ① About 직함 360px 3줄 → 아바타 행 아래 전폭, ② About 상단 경로 복원, ③ 인쇄 6쪽은 `@media print` 규칙 순서 문제(블록을 맨 뒤에 두면 4.06쪽 분량·5쪽), ④ 홈 히어로 위 여백 0(+49px → −9/+16px). 32번 `✅ 반영됨` 표시, `about.html` skills 반영, CONTEXT 직함 결정 정정 |
| 2026-11-07 | **파비콘 제안(35번):** 현재 파비콘은 흰 바탕 필기체라 16px에서 읽히지 않아 후보 5종을 탭 모사·확대로 비교, 추천 C `c_`. **C `c_` 확정** 후 `favicon/final/`(icon.svg·favicon.ico·apple-icon.png)과 `tools/build-favicon-final.mjs` 작성(후보 A·B·D·E 이미지·비교 보드·후보 렌더 스크립트는 작성자 요청으로 삭제), 34번에 개발 인수 항목 추가 |
| 2026-11-07 | 기획 33번 반영: `DESIGN.md` 원칙 4 문장 확정·시그니처 3번 `// popular`을 32번에 반영, 31번 Q1~Q3 종결(홈 OG **B 확정**, 인쇄 미리보기 작성자 확인), `og.html` B 확정 표시, **개발 인수 문서 34번** 작성, README·CONTEXT·STATUS 갱신 |
| 2026-11-05 | 기획 26·27번 반영, **D-11 히어로 확정**(`$ history` + "실행해 본 것만 씁니다", 28번), 비교 도구·측정 스크립트 삭제. 기획 29·30번 반영: **D-15** About 첫 화면 현재 회사 제거(버튼·소개 −23px, 인쇄 5쪽 유지)·클래스101 직함 `Software Engineer`, **D-12** 홈 OG 3종(`og.html`, 추천 B), **D-13** `DESIGN.md` 반영안(32번, 기획 확인 X-1), **D-14** 문서 정리(STATUS 재작성, README·CONTEXT 갱신), O-8 개발 발송 결정. 31·32번 작성. 새 측정 스크립트 `tools/measure-about-first.mjs` |
