# 31. 디자인 답변: About 문구 변경(D-15), 홈 OG(D-12), 문서 정리(D-14), O-8

작성: 디자인 세션 · 2026-11-05
답변 대상: 기획 30번(D-15), 29번 2장(D-12·D-14·O-8). `DESIGN.md` 반영안(D-13)은 [32번](./32-designmd-phase2-proposal.md).
시안: `site/about.html`(D-15, 생성기 `tools/build-phase2-mockups.py`), `site/og.html`(D-12), 측정 `tools/measure-about-first.mjs`

## 1. 결론

| # | 요청 | 답 |
|---|---|---|
| D-15 ① | 소개에서 현재 회사 제거 | **완료.** `CJ Olive Young` 줄을 뺐고 간격이 남지 않는다. 첫 화면 요소가 23px 올라왔다(2장) |
| D-15 ② | 클래스101 직함 | **완료.** `Software Engineer`(화면·인쇄본). 인쇄본은 **그대로 A4 5쪽** |
| D-12 | 홈 OG | 3종을 `og.html`에 추가. **추천 B**: 제목은 사이트 이름 그대로, 하단 mono 줄에 `$ history · 실행해 본 것만 씁니다`(3장) |
| D-13 | `DESIGN.md` 반영안 | [32번](./32-designmd-phase2-proposal.md). **기획 확인 1건**(원칙 4가 Phase 2와 충돌, X-1) |
| D-14 | 문서 정리 | **완료**(4장) |
| O-8 | 확대 `<dialog>` 스크롤 잠김 | **개발에 보낸다**(5장). 기획 의견과 같다 |

## 2. D-15 About 문구 변경

**변경:** 생성기에서 `intro__facts`(현재 회사 줄)를 삭제하고, 클래스101 직함을 `ROLE_OVERRIDE`로 덮어썼다(`src/app/about/page.tsx`는 고치지 않았다. 개발 PR-18 전까지 시안 한정). 쓰이지 않게 된 `.intro__facts` CSS(화면·479px 이하·인쇄)도 걷어 냈다. 회사 이름은 experience 섹션에만 남는다(첫 화면 텍스트에 `Olive` 없음 확인).

**측정**(Playwright Chromium, 로컬 서버, `node cowork/design/tools/measure-about-first.mjs`):

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| 360×640 직함 줄 하단 | 230px | 230px |
| 360×640 버튼 하단 | 369px | **346px (−23)** |
| 360×640 한 줄 소개(headline) 하단 | 460px | **437px (−23)** |
| 1280×720 버튼 하단 | 323px | **301px (−22)** |
| 1280×720 한 줄 소개 하단 | 437px | **414px (−23)** |
| 전체 높이(360 / 1280) | 11,418 / 7,242px | 11,395 / 7,219px (둘 다 −23) |
| 인쇄(A4) | 5쪽, 632KB | **5쪽, 629KB** |
| 가로 넘침 | 0 | 0 |

- 변경 전 수치는 25번 2.1(버튼 369px, 한 줄 소개 460px / 323px, 437px)과 같다. 회사 줄(높이 약 23px) 만큼 모두 올라왔다.
- 직함 줄 아래에 빈 줄이 남지 않는다(스크린샷 확인). 인쇄 첫 쪽도 이름 → 직함 줄 → 연락처 한 줄 → 소개 순으로 자연스럽다(Chromium print 미디어 렌더).
- 화면 검사: `check-site.mjs` 8화면 × PC·모바일 가로 넘침 0, h1 1개.
- **못 한 것:** 실제 Chrome 인쇄 미리보기(⌘P). 작성자가 확인한 A4 5쪽과 이번 변경 후 5쪽이 일치하는지는 작성자 재확인이 필요하다(제 환경은 Chromium `page.pdf()`).

**개발에 넘기는 값**(PRD-004 PR-18 문구 변경 3건과 같다):

| 항목 | 값 |
|---|---|
| 현재 회사 표시 | 첫 화면(`AboutIntro`)에 없음. JSON-LD `worksFor`도 넣지 않는다(5.6) |
| 클래스101 직함 | `Software Engineer` |
| 기술 스택 | 7그룹(PRD-004 4.4) |

## 3. D-12 홈 OG

> **11-07 문구 변경:** 홈 하단 줄 문구는 `실행해 본 것만 씁니다`에서 `실행해 본 것만 기록합니다`로 바뀌었다(개발 `site.yaml`). 아래 표·본문의 옛 문구는 선택 당시 기록이다.

현재 홈 OG는 정적 파일 `src/app/og.png`다(`Comstering's Dev Notes` + `blog` + `kubernetes, eks, terraform`). 다른 카드(글·About)는 `renderOg({ title, site, meta })` 템플릿으로 생성한다. `site/og.html`의 `site / home` 절에 3종을 같은 템플릿으로 그렸다.

| 안 | 구성 | 평가 |
|---|---|---|
| 지금 | 제목 이름 · 하단 `blog` + `kubernetes, eks, terraform` | 이름은 보이지만 문구(사이트가 무엇을 하는지)가 없고, 기술 나열은 About·프로필의 말투에 가깝다 |
| A 히어로 그대로 | 제목 `$ history_`(mono 112px) · 하단 `실행해 본 것만 씁니다` + 이름 | 터미널 느낌이 가장 강하다. 그러나 메신저·검색 미리보기에서 `$ history`만 크게 보이면 **사이트 이름과 정체를 알기 어렵다**(링크 카드는 맥락 없이 읽힌다) |
| **B 추천** | 제목 `Comstering's Dev Notes` · 하단 `$ history`(accent) + `실행해 본 것만 씁니다` | 이름이 제목이라 카드·검색 결과에서 읽히고, 히어로의 명령 줄·문구는 다른 카드의 mono 한 줄 자리(첫 항목 accent)에 들어가 **같은 말투가 이어진다**. 새 레이아웃이 필요 없다 |

**넣을지 말지:** 넣는다(B). 히어로 문구를 빼면 OG가 "블로그 이름 + 기술 나열"이라 홈 `description`("실행해 본 것만 씁니다. DevOps · Cloud Native 개발 블로그.")과 어긋난다.

**개발에 넘기는 것(PR-21, 선택):**
- 홈 OG를 정적 `og.png` 대신 `renderOg({ title: site.title, site: "comstering.github.io", meta: ["$ history", "실행해 본 것만 씁니다"] })`로 생성하면 문구가 `site.yaml` 한 곳에서 나온다(문구를 바꾸면 OG도 바뀜). 정적 이미지를 유지해도 내용은 B로 다시 만든다.
- **확인할 것:** 하단 mono 줄에 한글(`실행해 본 것만 씁니다`)이 들어간다. `renderOg`는 JetBrains Mono 400(라틴)과 Pretendard 700만 싣는다. About 카드의 `최한수`가 이미 같은 자리에 한글을 쓰므로 폴백은 동작하는 것으로 보이지만(`og.html`은 브라우저 폴백), satori 빌드에서 글리프 누락(□)이 없는지 PR-21에서 확인한다.
- 이 환경에서는 `og.html`(브라우저 렌더)까지만 확인했다. satori로 만든 실제 PNG는 못 봤다.

## 4. D-14 문서 정리

| 한 일 | 내용 |
|---|---|
| STATUS | 전체 재작성. 11-04 인수인계 절의 지난 내용(히어로 비교 도구 `?hero=…`, "사용자 답을 기다리는 중", `resume.html`)을 걷어 내고 현재 상태·다음 작업·재개 방법만 남김. 루트 `resume.pdf`는 개발 세션이 작성자 요청으로 만든 시험 산출물임을 정정(개발 STATUS) |
| README | `check-site.mjs` 설명 9화면(resume 포함) → **8화면**, 파일 표에 26~32번·`measure-about-first.mjs` 추가 |
| CONTEXT | About 결정(현재 회사 없음·직함)과 결정 근거에 31·32번 추가, 번호 최신 32 |
| 22번 | 상단에 철회 안내가 이미 있어 그대로 둠 |
| 커밋 | 작성 당시(11-05)에는 하지 않았다. 11-07에 작성자 요청으로 별도 worktree에서 파일을 지정해 PR(`docs/phase2-design-prd`)로 올렸다 |

## 5. O-8 개발에 보낸다

확대 `<dialog>`(이미지 확대)를 연 채 휠을 돌리면 뒤 페이지가 스크롤된다(Chrome에서 500px 이동 확인, `html`·`body` overflow `visible`). Phase 2에서 **검색 팔레트도 같은 종류의 모달**이 되므로 PR-20에서 둘을 함께 처리하면 비용이 작다. 기획 의견과 같아 보내기로 했다.

**개발 요청(PR-20 포함):**
- 모달(확대 창·검색 팔레트)이 열려 있는 동안 배경 스크롤을 잠근다(`body`에 `overflow: hidden` 또는 `overscroll-behavior: contain` + 스크롤바 폭 보정). 닫으면 원래 스크롤 위치.
- 확인: 열린 채 휠·터치·`Space`/`PgDn`으로 뒤 페이지가 움직이지 않는지, 닫은 뒤 위치가 그대로인지. 모바일 Safari 확인은 작성자 몫.
- 이 파일에서 개발 `REQUESTS.md`에 번호만 링크한다(개발 규칙). 개발 파일은 디자인이 고치지 않았다.

## 6. 질문 (2026-11-07 모두 종결)

| # | 질문 | 대상 |
|---|---|---|
| Q1 | **홈 OG를 B로 정하나?**(A도 가능, "넣지 않기"는 비추천) | ✅ **B 확정**(작성자 11-07, 기획도 B 의견 33번) |
| Q2 | `DESIGN.md` 원칙 4 변경(32번 X-1) 확인 | ✅ 동의·문장 확정(기획 33번) |
| Q3 | 실제 Chrome 인쇄 미리보기(⌘P)에서 About이 **지금도** A4 5쪽인지(회사 줄이 빠진 뒤) | ✅ 작성자 확인함(11-07) |

## 7. 재현

```bash
python3 cowork/design/tools/build-phase2-mockups.py          # about.html·index.html·search-index.js 생성
python3 -m http.server 4174 &                                  # 저장소 루트에서
node cowork/design/tools/measure-about-first.mjs              # 첫 화면 요소 위치·인쇄 쪽수
node cowork/design/tools/check-site.mjs <스크린샷 폴더>        # 8화면 검사
open http://localhost:4174/cowork/design/site/og.html          # 홈 OG 3종(site / home 절)
```
