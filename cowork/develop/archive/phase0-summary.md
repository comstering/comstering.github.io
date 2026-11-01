# Phase 0 안정화 (PRD-002) 개발 요약

_기간 2026-10-26 ~ 2026-10-28 · PR #10 ~ #26 · 최종 게이트 G0-1~G0-6 통과 · 자동 배포 재개_

이 문서는 Phase 0 개발의 **핵심만** 모은 보관본이다. 계획 원문은 `cowork/prd/002_platform_phase0-stabilization.md`, 이후 규칙·함정은 `../CONTEXT.md`, 다음 단계 요약은 [phase1-summary.md](./phase1-summary.md)에 있다.

## 1. 목표와 결과

**목표:** 자동 배포를 다시 켰을 때 라이브 사이트 전체가 새 디자인 토큰(Terminal Graphite)을 쓰고, 공유·검색·배포가 깨지지 않는 상태.

리디자인이 여러 단계 PR로 main에 들어가는 동안 부분만 바뀐 사이트가 배포되지 않도록 **자동 배포를 멈춰 두었다가**(#12, 2026-10-26) 마지막 PR에서 다시 켰다(#25, 2026-10-27).

| 게이트 | 기준 | 결과 |
| --- | --- | --- |
| G0-1 | `src/`에 금지 패턴(Tailwind 기본 팔레트, `dark:` 색, hex) 0건 | 통과. CI `check:tokens`로 상시 검사(#23) |
| G0-2 | 홈·글·About Lighthouse SEO 100, 접근성 ≥ 95 (모바일) | **SEO 100, 접근성 96·100·98** 통과(배포 후). 성능은 홈 68·글 67·About 84로 게이트 밖 → Phase 1 |
| G0-3 | 모든 글 og:image가 실제 파일, Rich Results `BlogPosting` 오류 0 | 통과. JSON-LD 날짜를 KST ISO 형식으로 보정(#26) |
| G0-4 | `/rss.xml` W3C Feed Validator 통과 | "valid RSS feed" |
| G0-5 | frontmatter 위반 시 `yarn build` 실패 | 통과(zod, 깨진 fixture로 확인) |
| G0-6 | main 머지 후 10분 안에 라이브, PR CI에서 lint·build 실패 시 차단 | 배포 약 5분 34초 |

## 2. 한 일 (PR 순서)

| PR | 날짜 | 내용 |
| --- | --- | --- |
| #10 | 10-09 | 프로젝트 skills(Claude Code)와 `SKILLS.md` |
| #11 | 10-26 | 디자인 토큰·`DESIGN.md` 신설 |
| #12 | 10-26 | main push 자동 배포 일시 중지(리디자인 기간, `workflow_dispatch`만) |
| #13~#15 | 10-26 | 레이아웃 셸·헤더·푸터, 홈(세로 리스트), 글 상세를 토큰으로 이전 |
| #16 PR-0 | 10-27 | 토큰 v1.3(`line-strong`·`warn`·`overlay`·`code-hl` 등)·DESIGN.md 갱신 |
| #17 PR-1 | 10-27 | 죽은 코드(`SearchModal`, `src/api`, `gh-pages`)와 배포 경로 정리 → **배포는 GitHub Actions 하나** |
| #18 PR-2 | 10-27 | frontmatter v2 + zod 검증 + `content/tags.yaml`·`series.yaml` + 글 15편 이전 + `draft` |
| #19 PR-3 | 10-27 | SEO(`metadataBase`·canonical·JSON-LD)·RSS·sitemap·푸터 링크 |
| #20 PR-4 | 10-27 | AdSense 제거, GoatCounter `lazyOnload`, Giscus 테마(사이트 테마와 동기화) |
| #21 PR-5 | 10-27 | 글 상세 v1.3(경로 `~/posts/<slug>`, 헤더 메타, 저자 박스, 이전/다음) |
| #22 PR-6 | 10-27 | About·404 토큰 정리(금지 패턴 92건 → 0, 404는 서버 컴포넌트·최신 글 3편) |
| #23 PR-7 | 10-27 | PR CI 품질 게이트(lint → tokens → build → output) |
| #25 PR-8 | 10-27 | 자동 배포 재개, CONTEXT·CLAUDE.md 갱신 |
| #26 | 10-28 | JSON-LD datetime 수정, 배포 후 점검 결과 기록 |

(#3·#5~#9는 이 저장소에서 사이트를 만든 이전 작업이라 Phase 0 범위가 아니다.)

## 3. 핵심 결정

- **배포 경로는 Actions 하나.** 수동 배포 스크립트·별도 배포 브랜치는 쓰지 않고, `main` push → `deploy.yaml` → GitHub Pages. 되돌릴 때는 `workflow_dispatch`
- **URL은 파일명(`posts/<slug>.md`)이 정한다.** 발행 뒤 바꾸지 않는다(Giscus `mapping="pathname"`도 그대로)
- **frontmatter v2**: 필수 `title`·`description`(글마다 고유)·`date`·카테고리·`tags`, 선택 `series`+`seriesOrder`·`thumbnail`·`draft`. 태그는 정규 태그(`tags.yaml`)만, 시리즈는 레지스트리(`series.yaml`)에 등록. 위반하면 파일명과 이유를 모아 빌드 실패(카테고리는 이후 Phase 1에서 배열로, `thumbnail`·`updated`는 삭제됨)
- **draft 글**은 프로덕션 빌드의 목록·상세·sitemap·RSS에서 제외(dev에서는 `draft` 표시와 함께 보임). `operator-lifecycle-manager`는 `draft: true`로 보관
- **디자인 토큰은 `globals.css` 한 곳**에서만 정의. 컴포넌트의 hex·`dark:` 색·Tailwind 기본 팔레트는 CI가 막는다
- **AdSense 제거**(계정·`ads.txt`는 유지), 서드파티는 `lazyOnload`
- About 재구성은 Phase 2로 미루고, Phase 0에서는 **구조는 그대로 두고 색·글자·간격만** 토큰으로 바꿨다
- 협업 방식: 기획(`cowork/prd`)·디자인(`cowork/design`)·개발이 세션을 나눠 문서로 중계. 한 PR씩, 작성자가 직접 머지

## 4. 측정값과 점검 (배포 후, 2026-10-27)

- 배포 `main` push 후 약 5분 34초. 홈·About·글·404·RSS·sitemap·robots·giscus css·`ads.txt` 정상, 초안 글 404
- Giscus 커스텀 CSS: 라이트·다크·토글·새로고침 후 초기 테마 모두 정상
- 구조: canonical, og:image, JSON-LD, 모바일 390px 가로 스크롤 없음, h1 1개
- 성능은 당시 큰 썸네일 PNG(홈 전송량 약 2.7MB)와 렌더링 차단 CSS 때문에 낮았고(홈 68·글 67·About 84), About CLS 0.128은 원인 미확인으로 Phase 1에 넘겼다. Phase 1에서 이미지 WebP·글꼴 서브셋·관측 측정으로 풀었고, About CLS는 Phase 2 PR-19까지 예외로 남았다(phase1-summary 참고)

## 5. 겪은 일

- `package.json`의 `deploy` 스크립트 삭제가 작업 트리에만 있고 미커밋이던 것을 PR-1에서 정리했다
- 모든 게이트는 "자동 배포를 켜기 전 통과"를 기준으로 삼았다. 화면 확인은 PC·모바일 스크린샷을 PR 본문에 넣는 규칙이 이때 생겼다(`pr-screenshots` 브랜치 사용)
- 자동 배포가 멈춘 동안 리디자인 PR이 쌓이므로 "배포 재개를 마지막에" 두는 순서가 안전했다

## 6. Phase 1로 넘긴 것

- 성능(이미지·글꼴·렌더링 차단 CSS), 읽기 경험(목차·시리즈·관련 글·코드 블록), OG 자동 생성, 접근성 100, E2E·Lighthouse CI
- 작성자 작업: Search Console·네이버 서치어드바이저 sitemap 재제출, LinkedIn Post Inspector, 사이트 1차 완성 후 branch protection
