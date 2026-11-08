---
title: Phase 2 기획 정리 (요약 보관본)
period: 2026-10-29 ~ 2026-11-08
written: 2026-11-08 · 기획 세션
sources: prd/004(done, 원문 삭제), prd/001 v2.1~v2.2, design 18·22~37번, develop/REQUESTS Q16~Q24, 루트 CONTEXT.md "Phase 2 게이트 기록"
---

# Phase 2 기획 정리 (포트폴리오)

> 원문 전체가 아니라 다음 Phase를 진행할 때 다시 볼 핵심만 남긴 요약이다. PRD-004 원문은 git 기록(마지막 커밋 `origin/main` 2026-11-08)에서 볼 수 있다.

## 1. 한눈에

| 항목 | 내용 |
| --- | --- |
| 기간 | 2026-10-29 기획 시작 → 11-02 재검토 → 11-07~08 개발 PR-18~25 머지 |
| 기준 문서 | PRD-004 `004_portfolio_projects-and-about.md` (done) |
| 결과 | 경력 데이터 분리(YAML), About 다시 그리기(전부 펼침), `resume.pdf` 자동 생성, 헤더 검색 팔레트, 홈 터미널 히어로 + 사이드바(인기글·시리즈·태그), GoatCounter 인기글, JSON-LD, 파비콘 `c_` |
| PR | #60 PR-18 · #61 PR-19 · #63 PR-20 · #64 PR-21 · #66 PR-22 · #69 PR-23 · #72 PR-24 · #76 PR-25, 디자인 반영 #67, 파비콘 #68 |

## 2. 사이트 방향 (계속 유효)

| 항목 | 결정 |
| --- | --- |
| 역할 분리 | **홈 = 블로그, About = 경력·이력서·기술.** 홈에 이름·직함·기술 태그·성과·경력 링크를 두지 않는다. About으로 가는 길은 헤더 `about` |
| About ↔ 블로그 | **서로 링크하지 않는다.** 블로그는 개인 학습·프로젝트 기록이라 회사 경력과 연결하면 회사 일처럼 읽힌다. 예외: 헤더 `about`, 글 하단 저자 박스의 일반 `about` 링크 |
| 홈 히어로 | `$ history` + 커서 `_` / "실행해 본 것만 기록합니다". h1은 `sr-only` `Comstering's Dev Notes`. 값은 `content/site.yaml` |
| 작성 원칙 | 블로그 글은 직접 실행해 본 것만 쓴다(홈 문구가 독자에게 하는 약속, PRD-001 6.2) |
| 이력서 | `/resume` 페이지 없음. 빌드 때 `/about`을 인쇄 스타일(A4, 라이트 고정)로 `resume.pdf` 생성. About 전체, 축약 없음(5쪽) |
| 작성자 표기 | CJ 올리브영 `DevOps · Cloud Native Engineer`, 클래스101 **`Software Engineer`**(11-05 변경). About 첫 화면에 현재 회사를 두지 않고, JSON-LD에 `worksFor`를 넣지 않는다 |
| 검색 | 헤더 `search ⌘K` 팔레트(모든 페이지). 글만 검색(제목·설명·태그·카테고리·소제목), 빌드 타임 `/search-index.json`을 처음 열 때 불러옴. Pagefind 쓰지 않음. 홈 글 검색창 제거 |
| 인기글 | GoatCounter 통계 API(토큰은 GitHub Secrets `GOATCOUNTER_TOKEN`)를 배포 때 받아 최근 30일 상위 5편. 실패하면 직전 캐시 → 빈 목록(블록 숨김), 빌드는 실패하지 않음. 브라우저에서 통계 API를 부르지 않음 |
| 합산 수치 | 성과를 합쳐 하나의 숫자로 만들지 않는다 |

## 3. 데이터·콘텐츠 규칙

| 파일 | 내용 |
| --- | --- |
| `content/profile.yaml` | 이름, 직함, `careerStart`(연차는 빌드 때 계산), 연락처, `headline`·`intro`, 기술 스택 7그룹, 학력, 자격증(Terraform Associate Credly `verifyUrl`), 기타 경험 |
| `content/experience.yaml` | 회사 → 프로젝트(`id`, `title`, `period`(여러 기간 가능), `description`, `points`), 오픈소스, 사이드 프로젝트 |
| `content/site.yaml` | 홈 `title`·`command`·`tagline` |

- 없앤 필드: `featured`, `metric`, `stack`, `relatedPosts`(`context` personal/work), `capabilities`(what i do), `points[].resume`, 글 frontmatter `relatedProject`. 다시 쓰면 빌드 실패.
- 기간 표시: 같은 달은 한 번, 재직 중은 `now`, 여러 기간은 쉼표.
- 기술 스택 7그룹: platform / cloud · iac / ci/cd · workflow / data · messaging / auth · security / backend / observability. 넣지 않은 것: Drone CI, React Native, Braze, CloudFront, MWAA.
- `src/`에 경력 문자열 하드코딩 금지(CI 검사). 경력 수정 방법은 저장소 `README.md`.

## 4. 화면 결정

| 화면 | 결정 |
| --- | --- |
| About | 첫 화면: 사진·이름·직함·경력 N년+·버튼(`email`, `resume.pdf`, `github ↗`, `linkedin ↗`). 경력은 **전부 펼침**(접기 없음), 위에 회사 바로가기 3개, 도착 강조 없음, 프로젝트 기간 열 없이 전폭(밀도 V3). what i do 없음. 자격증은 `verify ↗`만 |
| About 인쇄 | 사진·헤더·푸터·버튼·바로가기 숨김, 인쇄용 연락처 한 줄, 외부 링크 URL 표시, 프로젝트가 쪽 경계에서 갈리지 않음 |
| 홈 | 히어로 → 카테고리 칩 → 연도별 글 목록. 사이드바(1024px 이상 오른쪽, 미만은 목록 아래): 인기글 5 · 시리즈 · 태그 상위 10(글 수 표시). 카테고리·최근글·About 링크는 넣지 않음 |
| 검색 팔레트 | 버튼 이름 `검색 (search)`, `Cmd/Ctrl+K`·`/`, 빈 입력은 최근 글 5편, 소제목에서만 맞으면 `# 소제목` 보조 줄, 결과 수 `role="status"`, 모달 뒤 스크롤 잠금(O-8) |
| 홈 OG | B안: 제목 `Comstering's Dev Notes`, 하단 `$ history` + 문구 |
| 글꼴 CLS | 폴백 `@font-face "Pretendard Fallback"`(`size-adjust: 86.4%`)으로 About CLS 0.125 → 차단선 안. About 성능 예외 해제(PR-19) |

## 5. 게이트 결과 (2026-11-08, 루트 `CONTEXT.md` 기준)

| 게이트 | 결과 |
| --- | --- |
| G2-1 채용 5초 테스트 3명 | **작성자 실시 대기**(첫 화면 요소는 E2E·스크린샷으로 확인) |
| G2-2 하드코딩 0, About·PDF 같은 데이터 | 통과 |
| G2-3 About ↔ 글 링크 0 | 통과(E2E) |
| G2-4 J1 홈 → about → 회사 바로가기 → resume.pdf | 통과(E2E) |
| G2-5 성능·접근성·SEO | 통과. 홈·About·글 성능 99, 접근성·SEO 100, LCP 1.7~1.8s, CLS ≤ 0.03, TBT ≤ 74ms(CI 3회 중앙값) |
| G2-6 resume.pdf | 통과. 5쪽·550KB, 텍스트 검색 가능, 라이트 배경 |
| G2-7 인기글 | 통과. 라이브 배포 로그 "최근 30일 5편" |
| G2-8 검색 | 통과(E2E 3개 페이지) |
| 남은 작성자 확인 | G2-1, 라이브 Rich Results Test(`/`, `/about`) |

## 6. 바꾸거나 철회한 결정 (다시 같은 논의를 하지 않도록)

| 처음 결정 | 바뀐 결정 | 이유 |
| --- | --- | --- |
| `/projects` 목록·프로젝트 상세(10-29) | 만들지 않음, About 강화(C안, 10-30) | About에 같은 내용이 이미 있음 |
| About 프로젝트별 접기, `expand all`(22·23번) | 전부 펼침 + 회사 바로가기 | 채용 담당자는 내용을 읽으러 온다. 접힌 내용은 거의 열리지 않음 |
| 관련 글 확대, `personal`/`work` 표시, 글 `relatedProject` | About ↔ 블로그 링크 전부 삭제 | 회사 경력과 개인 글은 다른 것 |
| what i do 3개 | 삭제 | 경력·기술 스택과 겹침 |
| 홈 히어로: 엔지니어 문구 + 이름 + 기술 태그 + `about me`·`resume` 버튼 + 대표 프로젝트 3건 | 블로그 히어로(터미널 명령 + 한 줄) | 홈 정체성은 블로그, 헤더에 `about`이 이미 있음 |
| `/resume` 웹 페이지 + A4 3쪽 축약 PDF | 페이지 없음, About 인쇄본 PDF, 축약 없음 | 흐름은 About → PDF, 데이터 하나로 항상 같음 |
| 헤더 `⌘K` 검색은 Phase 3, 홈 검색창 유지 | Phase 2에 헤더 검색, 홈 검색창 제거 | 시안이 있었고, 글 상세에서도 검색해야 다음 글로 이어짐 |
| 히어로 후보: git log / "씁니다" | `history` / "기록합니다" | 문구의 "실행해 보고"가 실행한 명령의 기록(history)과 맞음. "씁니다"는 어색함(작성자) |
| 인기글 브라우저 조회(공개 카운터) | 빌드 때 통계 API + 토큰 | 순위·기간 조회는 토큰이 필요하고 토큰을 페이지에 넣을 수 없음 |
| 사이드바에 분류(카테고리)·최근글 | 넣지 않음 | 칩·본문 목록과 중복 |
| 클래스101 `Web Developer (backend 중심)`, About에 현재 회사 표시 | `Software Engineer`, 현재 회사 표시 없음 | 작성자 요청(11-05) |
| `DESIGN.md` 원칙 4 "근거 링크, `personal` 표기" | "홈은 블로그, About은 경력, 서로 링크하지 않음" | 위 결정과 맞춤(33번) |

## 7. 협업 방식 변화

| 항목 | 내용 |
| --- | --- |
| 규칙 위치 | 2026-11-08부터 매번 지킬 규칙은 `.claude/rules/`(PRD 파일명·머리말은 `prd-docs.md`). 상태·결정은 `cowork/` |
| 폴더 | 각 세션은 자기 폴더에만 쓴다. 기획의 디자인 요청은 PRD 안 "디자인 요청" 장에 둔다(Phase 2 중에는 `cowork/design`에 번호 문서로 썼음: 18·23·24·26·27·29·30·33번) |
| 커밋·PR | 기획·디자인 세션도 문서를 넘길 때마다 커밋·PR(`commit-and-pr.md`). 머지는 작성자 |
| 함정 | 연결 폴더에서 파일 전송 도구가 예전 버전을 다시 보내 문서가 되돌려진 일(10-30), 로컬 `main`이 뒤처진 상태에서 고쳐 옛 문구가 섞인 일(11-08). 고치기 전에 `origin/main` 최신본과 비교한다 |

## 8. Phase 3로 넘어간 것

| 항목 | 위치 |
| --- | --- |
| 태그 페이지, 태그 링크·팔레트 태그 결과, 한글 검색(초성·별칭), 시리즈 페이지 | PRD-005 |
| 홈 사이드바 태그(지금은 검색 팔레트를 엶) → 태그 페이지 링크, `all tags →` | PRD-005 5.4 |
| 작성자 확인: G2-1 5초 테스트, Rich Results Test, Search Console·네이버 sitemap 재제출, branch protection | 개발 STATUS "작성자 작업" |
| 보류: 영문 About(나중에 결정), 페이지네이션(30편 초과) | PRD-001 4.2·4.3 |
| 결정됨: 커스텀 도메인 쓰지 않음(`comstering.github.io` 유지) | PRD-001 8.2 |

## 9. 원문

| 문서 | 내용 |
| --- | --- |
| `prd/004_portfolio_projects-and-about.md` | Phase 2 원문. **2026-11-08 삭제**, git 기록에서 확인 |
| `design/18·22~37번` | 디자인 요청·시안 답변·검토(디자인 세션이 정리) |
| `develop/REQUESTS.md` Q16~Q24 | 개발 질문과 답 |
| 루트 `CONTEXT.md` "Phase 2 게이트 기록" | 게이트 측정 상세, G2-1 기록 표 |
