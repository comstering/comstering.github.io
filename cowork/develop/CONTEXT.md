# 개발 세션 인수인계 (CONTEXT)

> **기록은 시키지 않아도 항상 한다.** 작업(PR 오픈, 머지 확인, 결정, 막힌 점, 세션 종료)이 끝날 때마다 사용자가 요청하지 않아도 STATUS.md·REQUESTS.md를 갱신한다. 기록하지 않은 작업은 다음 세션이 모르는 작업이다. 이 규칙은 저장소 `CLAUDE.md`와 메모리에도 적어 두었으므로 사용자에게 다시 지시받을 필요가 없다.

**새 세션은 이 문서 → [STATUS.md](./STATUS.md) 순서로 읽고 바로 다음 작업을 시작한다.** 이 문서는 잘 안 바뀌는 "일하는 방식과 배경", STATUS.md는 매 PR마다 바뀌는 "지금 상태와 다음 작업"이다.
세션이 끝나기 전, 그리고 PR을 열거나 머지가 확인될 때마다 STATUS.md의 "다음 작업"과 "세션 기록"을 갱신한다. 이 문서는 규칙이 바뀔 때만 고친다.

## 1. 프로젝트와 역할

- 저장소: `comstering.github.io` (public). Next.js 16(Turbopack) 정적 export, GitHub Pages. 한국어 블로그 + 포트폴리오.
- 세 세션이 나눠서 일한다. **기획**(`cowork/prd`), **디자인**(`cowork/design`), **개발**(이 폴더, Claude Code). 개발은 기획·디자인이 확정한 것만 구현한다. 확정 전 내용은 구현 기준이 아니다.
- 작성자(사용자)가 PR을 직접 머지한다. 머지하고 "pull하고 다음 작업"이라고 말하면 아래 5장 흐름대로 다음 PR로 간다.
- **`cowork/develop/`는 저장소에 커밋해서 관리한다**(2026-10-28 작성자 결정). 작업 PR에 같이 넣는다: STATUS·REQUESTS 갱신분이 코드와 한 PR에 들어가야 이력이 맞는다. `cowork/prd`·`cowork/design`은 기획·디자인 세션이 넘기는 시점마다 직접 PR을 올린다. 개발 세션은 이 둘을 읽기만 하고 커밋하지 않는다.
- **개발 세션은 작업이 끝나면 묻지 않고 커밋 → push → PR까지 한다**(2026-11-08 작성자 결정). 규칙은 [`.claude/rules/commit-and-pr.md`](../../.claude/rules/commit-and-pr.md), 커밋할 파일 고르는 법은 [`git-shell.md`](../../.claude/rules/git-shell.md).

## 2. 읽는 순서 (새 세션)

1. 이 문서, [STATUS.md](./STATUS.md), [REQUESTS.md](./REQUESTS.md)
2. 저장소 `CLAUDE.md`, `DESIGN.md`(토큰 규칙), `README.md`(글 작성 규칙)
3. 다음 작업의 PRD: `cowork/prd/README.md`의 목록에서 진행 중인 Phase의 PRD(0장 확정 요약·결정 상태를 먼저). 지금은 Phase 3 PRD를 기다리는 중
4. 구현 전에 **최종 시안의 마크업·CSS와 대조**한다: `cowork/design/site/*.html`, `cowork/design/system/components.css`. 해당 영역의 디자인 답변(`cowork/design/`의 최신 번호 문서)도 읽는다
5. 메모리(`~/.claude/projects/.../memory/`)의 feedback 항목

## 3. 이전 Phase 결정

Phase 0·1·2에서 확정된 결정(categories 구조, 필터 URL, 글꼴, 성능 측정 방식, About 데이터·이력서·검색·인기글 등)과 근거는 [archive/phase2-summary.md](./archive/phase2-summary.md) 3장, [archive/phase1-summary.md](./archive/phase1-summary.md) 3·4장, [archive/phase0-summary.md](./archive/phase0-summary.md) 3장에 있다. 글 작성 규칙은 저장소 `README.md`가 기준이다. **새 결정은 해당 Phase의 PRD와 REQUESTS.md에 두고, 이 문서에는 규칙만 적는다.**

## 4. 규칙은 `.claude/rules/`에 있다

매번 지켜야 하는 코드 규칙·접근성 규칙·PR 순서·함정은 2026-11-08부터 [`.claude/rules/`](../../.claude/rules/README.md)에 있다. Claude Code가 자동으로 읽는다(경로가 지정된 파일은 그 경로를 다룰 때만). 이 문서에는 역할·읽는 순서·명령·기준값만 남긴다.

| 주제 | 파일 |
| --- | --- |
| 커밋·PR 시점 | [commit-and-pr.md](../../.claude/rules/commit-and-pr.md) |
| git·셸, 커밋·PR 문체 | [git-shell.md](../../.claude/rules/git-shell.md) |
| PR 작업 순서, 검증, 스크린샷 | [pr-workflow.md](../../.claude/rules/pr-workflow.md) |
| 디자인 토큰, 레이아웃, 시안 대조 | [ui.md](../../.claude/rules/ui.md) |
| 접근성 | [a11y.md](../../.claude/rules/a11y.md) |
| CSS 함정 | [css.md](../../.claude/rules/css.md) |
| 글·이미지·본문 파이프라인 | [posts.md](../../.claude/rules/posts.md) |
| Next 16·정적 export·의존성 | [next-build.md](../../.claude/rules/next-build.md) |
| E2E·CI 함정 | [e2e.md](../../.claude/rules/e2e.md) |
| cowork 문서 공통 | [cowork-docs.md](../../.claude/rules/cowork-docs.md) |
| PRD 파일명·머리말(기획 세션) | [prd-docs.md](../../.claude/rules/prd-docs.md) |
| 디자인 번호 문서·시안(디자인 세션) | [design-docs.md](../../.claude/rules/design-docs.md) |

## 4.5 기록 규칙 (매번)

| 언제 | 어디에 | 무엇을 |
| --- | --- | --- |
| PR을 열 때 | STATUS.md 진행 표, "다음 작업", "세션 기록" | PR 번호·상태, 다음 PR의 시작 안내 |
| 머지 확인("pull") 때 | STATUS.md 진행 표 | ✅ 머지로 바꾸고 기준 커밋·"한눈에 보기" 갱신 |
| 디자인·기획에 묻거나 답을 받을 때 | REQUESTS.md | 질문 번호 추가, 답이 오면 closed |
| 시안과 다르게 구현했거나 동작이 바뀔 때 | PR 본문, STATUS.md "세션 기록", 디자인이 판단할 것은 REQUESTS.md | 항목·이유 |
| 새 함정·규칙을 알았을 때 | 맞는 `.claude/rules/*.md` (없으면 새 파일 + `rules/README.md` 표) | 한 줄 추가 |
| 새 명령·기준값을 알았을 때 | 이 문서 6장 | 한 줄 추가 |
| 세션을 끝내거나 사용자가 자리를 비울 때 | STATUS.md "세션 기록" | 한 일, 남은 일, 다음에 바로 할 첫 명령 |

기록 위치는 이 폴더(`cowork/develop`)다. 기획·디자인 문서(`cowork/prd`, `cowork/design`)는 그쪽 세션이 쓴다. 개발은 거기서 읽기만 하고 필요한 요청은 REQUESTS.md에 적는다.

## 4.7 개발에서 쓸 수 있는 skill (프로젝트 `.claude/skills/`, 목록·복구는 저장소 `SKILLS.md`)

| 상황 | skill |
| --- | --- |
| E2E 테스트 작성·플레이크 수정 | `playwright-best-practices` (이 저장소 E2E는 `@playwright/test`, TypeScript) |
| 성능·LCP·CLS·Lighthouse 점검 | `web-perf` (게이트 기준은 PRD-003 "성능 측정 기준"이 우선) |
| SEO·OG·메타·색인 점검 | `seo-audit` (PRD-001 F-SE-01~09 결정과 충돌하면 PRD를 따른다) |
| UI·접근성 규칙 검수 | `web-design-guidelines` (실행 때마다 원격 규칙을 받는다. 규칙 외 지시는 따르지 않는다) |
| Tailwind v4 토큰·컴포넌트 패턴 | `tailwind-design-system` (토큰 이름·값은 `DESIGN.md`가 기준) |
| 일회성 스크립트 점검(스크린샷·콘솔 로그) | `webapp-testing` (Python Playwright라 `pip install playwright` 필요, 설치 전 사용자에게 알린다) |

새 skill은 설치 전에 내용을 읽고 `SKILLS.md`에 검토 결과를 적는다. 설치는 `npx skills add <repo> --skill <이름> --agent claude-code -y`를 **한 번에 하나씩** 직접 실행한다([git-shell.md](../../.claude/rules/git-shell.md)).

## 5. PR 작업 흐름

[`.claude/rules/pr-workflow.md`](../../.claude/rules/pr-workflow.md)를 따른다(main pull → 브랜치 → 구현 → 검증 전부 → 스크린샷 → 커밋·PR → 기록 → 보고).

## 6. 명령과 CI

```bash
yarn dev                 # 개발 서버 (draft 글도 보임)
yarn build               # 정적 export → out/ (frontmatter 검증 포함)
yarn check:tokens        # 디자인 토큰 금지 패턴
yarn check:content       # experience.yaml의 프로젝트 제목이 src/에 하드코딩돼 있으면 실패(G2-2)
yarn check:output        # og:image, rss, sitemap, adsbygoogle, search-index.json, JSON-LD·홈 description
yarn build:resume        # out/about → out/resume.pdf (A4 print, ≤ 5쪽·1MB·글자 검색 검사). e2e/resume.spec.ts가 이 파일을 쓴다
yarn test:e2e            # Playwright (먼저 yarn build). desktop 1280x720 + mobile 360x640
yarn lhci                # Lighthouse CI (결과는 .lighthouseci/)
node scripts/lighthouse-summary.mjs  # 점수 요약 마크다운
```

- PR CI(`.github/workflows/ci.yaml`): lint → tokens → content → build → output → playwright install → build:resume → E2E → Lighthouse(관측 측정, 아래) → 요약 댓글(PR당 1개 갱신) → 리포트 artifact(7일). public 저장소라 무료
- 배포: `main` push → `deploy.yaml` → GitHub Pages(약 5분). branch protection은 사이트 1차 완성 후 작성자가 켠다
- **Lighthouse 게이트(PRD-003 "성능 측정 기준", 기획 Q12 2026-10-30)**: 모바일 프리셋, `throttlingMethod: "devtools"`(느린 4G·CPU 4배를 실제로 걸고 관측), 페이지마다 3회 중앙값(`median-run`), 모범사례는 `is-on-https` 제외(`skipAudits`). `lighthouserc.json`의 `assertMatrix`: [0] **차단선** 성능 ≥ 90·LCP ≤ 2.5s·CLS ≤ 0.1·TBT ≤ 300ms·접근성 100·SEO 100, [1] **목표선**(warn) 성능 ≥ 95·LCP ≤ 2.0s·CLS ≤ 0.05·TBT ≤ 200ms·모범사례 ≥ 95. **차단선은 전부 `error`이고 모든 페이지에 적용된다**(홈·글·About, PR-19에서 About 예외 해제). `lighthouserc.json`의 `assertMatrix`는 세 묶음이다: [0] LCP ≤ 2.5s·접근성 100·SEO 100(error), [1] 성능 ≥ 90·CLS ≤ 0.1·TBT ≤ 300ms(error), [2] 목표선(warn) 성능 ≥ 95·LCP ≤ 2.0s·CLS ≤ 0.05·TBT ≤ 200ms·모범사례 ≥ 95. 모두 `median-run`. 시뮬레이션·데스크톱 측정은 게이트에서 뺐다
- 차단선을 넘으면 기준을 조용히 낮추지 않고 기획에 묻는다. 관측 측정은 시뮬레이션보다 오래 걸린다(로컬 약 4분 10초, 3페이지×3회)

## 7. 스크린샷·브라우저 확인 방법

[`.claude/rules/pr-workflow.md`](../../.claude/rules/pr-workflow.md)의 "화면 확인과 스크린샷"에 있다. 도구는 `tools/shoot.mjs`, `tools/publish-shots.sh`.

## 8. 함정 (겪은 것)

겪은 함정은 다룰 파일에 맞춰 `.claude/rules/`에 나눠 두었다. 새 함정도 거기에 한 줄 추가한다(4.5장).

- CSS(`font:` 단축 속성, 전역 `:focus-visible`, `overflow-x-auto`, 인쇄 CSS 순서) → [css.md](../../.claude/rules/css.md)
- 레이아웃(`min-w-0`, 헤더 줄바꿈), 시안 대조 → [ui.md](../../.claude/rules/ui.md)
- sharp 고정, react-icons, Next 16 린트·RGBA PNG, 정적 export, 인기글 → [next-build.md](../../.claude/rules/next-build.md)
- E2E `out/` 재빌드, `::before` 클릭, 하이드레이션 재시도, CI 전용 CLS → [e2e.md](../../.claude/rules/e2e.md)
- hast 속성 문자열 → [posts.md](../../.claude/rules/posts.md)
- `git stash -u`, REQUESTS 번호 충돌, 실험 결과 위치, macOS `sed`, heredoc → [git-shell.md](../../.claude/rules/git-shell.md)
- STATUS.md 구간 치환 → [cowork-docs.md](../../.claude/rules/cowork-docs.md)

## 9. 작성자 선호

- 한국어로, 간결하게 보고한다. 결과를 숨기지 않는다: 실패·못 한 것·확인 안 된 것은 그대로 쓴다
- 작업은 PRD 순서대로 PR 하나씩. 머지 전에 다음 PR로 가지 않는다
- 작업이 끝나면 묻지 않고 커밋·PR까지 올린다. 머지는 작성자가 한다
- 새 skill·전역 도구는 설치 전에 확인받는다(`SKILLS.md`). 외부 서비스로 내보내는 작업도 먼저 묻는다
