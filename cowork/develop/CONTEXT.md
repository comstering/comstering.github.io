# 개발 세션 인수인계 (CONTEXT)

> **기록은 시키지 않아도 항상 한다.** 작업(PR 오픈, 머지 확인, 결정, 막힌 점, 세션 종료)이 끝날 때마다 사용자가 요청하지 않아도 STATUS.md·REQUESTS.md를 갱신한다. 기록하지 않은 작업은 다음 세션이 모르는 작업이다. 이 규칙은 저장소 `CLAUDE.md`와 메모리에도 적어 두었으므로 사용자에게 다시 지시받을 필요가 없다.

**새 세션은 이 문서 → [STATUS.md](./STATUS.md) 순서로 읽고 바로 다음 작업을 시작한다.** 이 문서는 잘 안 바뀌는 "일하는 방식과 배경", STATUS.md는 매 PR마다 바뀌는 "지금 상태와 다음 작업"이다.
세션이 끝나기 전, 그리고 PR을 열거나 머지가 확인될 때마다 STATUS.md의 "다음 작업"과 "세션 기록"을 갱신한다. 이 문서는 규칙이 바뀔 때만 고친다.

## 1. 프로젝트와 역할

- 저장소: `comstering.github.io` (public). Next.js 15 정적 export, GitHub Pages. 한국어 블로그 + 포트폴리오.
- 세 세션이 나눠서 일한다. **기획**(`cowork/prd`), **디자인**(`cowork/design`), **개발**(이 폴더, Claude Code). 개발은 기획·디자인이 확정한 것만 구현한다. 확정 전 내용은 구현 기준이 아니다.
- 작성자(사용자)가 PR을 직접 머지한다. 머지하고 "pull하고 다음 작업"이라고 말하면 아래 5장 흐름대로 다음 PR로 간다.
- **`cowork/develop/`는 저장소에 커밋해서 관리한다**(2026-10-28 작성자 결정). 작업 PR에 같이 넣는다: STATUS·REQUESTS 갱신분이 코드와 한 PR에 들어가야 이력이 맞는다. `cowork/prd`·`cowork/design`은 기획·디자인 세션 몫이라 작성자가 별도 PR(#32)로 올린다. 개발 세션은 이 둘을 읽기만 하고 커밋하지 않는다.
- `.claude/launch.json`, `resume.md`, 다른 세션이 남긴 미커밋 변경(예: `CLAUDE.md` 일부)은 작성자 파일이므로 건드리지 않고 `git add`에 포함하지 않는다. 커밋할 때는 항상 파일을 지정해서 `git add`한다(`git add -A` 금지).

## 2. 읽는 순서 (새 세션)

1. 이 문서, [STATUS.md](./STATUS.md), [REQUESTS.md](./REQUESTS.md)
2. 저장소 `CLAUDE.md`, `DESIGN.md`(토큰 규칙), `README.md`(글 작성 규칙)
3. 다음 작업의 PRD: `cowork/prd/003_blog_reading-experience.md`의 해당 PR 절. 0장 "확정 요약"과 7장 "결정 상태"를 먼저 본다
4. 구현 전에 **최종 시안의 마크업·CSS와 대조**한다: `cowork/design/site/*.html`, `cowork/design/system/components.css`. 해당 영역의 디자인 답변(`cowork/design/12-…`~`15-…`)과 `E1~E9` 의견도 읽는다
5. 메모리(`~/.claude/projects/.../memory/`)의 feedback 항목

## 3. 확정된 결정 (PRD-003, 2026-10-28 approved)

- categories: 배열 최대 2개, 대표 없음(B안), 고정 순서 `infra · backend · frontend · oss · note`
- `updated` 필드 삭제, 글 날짜는 `date`만
- 목록 썸네일: 홈·태그 목록에서 제거(C안). `thumbnail` 필드는 PR-15에서 og:image가 자동 생성으로 바뀐 뒤 삭제
- 필터: `/?category=` + `router.push`, 직접 진입은 전체 목록 → JS 후 필터(정적 export 한계). **디자인 16번이 허용**. 실기기에서 1초 이상 깜빡이면 `data-categories` + 인라인 스크립트로 숨기는 방법을 다시 검토
- OG 이미지: 글마다 빌드 시 자동 생성, PNG, accent 선 없음
- MDX는 Phase 1에서 도입하지 않음
- PR 순서: PR-10 → PR-9 → PR-11·12·13 → PR-14 → PR-15 → PR-16 → PR-17 (STATUS.md에 진행 표)

## 4. 코드 규칙과 알아 둘 구조

- UI는 `DESIGN.md` 토큰만 쓴다. hex, `dark:` 색, Tailwind 기본 팔레트(`gray-*` 등)는 `yarn check:tokens`가 실패시킨다. 글 목록은 세로 리스트(카드 그리드 금지)
- 글: `posts/*.md`(파일명=URL), frontmatter는 `src/lib/content/schema.ts`의 zod가 빌드 때 검증. 태그는 `content/tags.yaml`, 시리즈는 `content/series.yaml`(label 8자 이하)
- 본문 파이프라인: `src/lib/posts.ts`(remark → rehype). 코드 블록은 `src/lib/content/rehype-code-meta.ts`, 콜아웃·표는 `rehype-article-blocks.ts`, 아이콘은 `hast-icons.ts`. 코드 복사 클릭은 `PostContent.tsx`에서 이벤트 위임
- **이미지**: 원본은 `public/images`(git), `yarn build`/`yarn dev` 전에 `scripts/optimize-images.mjs`가 sharp로 `public/_img/*.webp`(git 제외)와 `manifest.json`을 만든다. 본문 `<img>`는 `rehype-images.ts`가 변환본·`width`/`height`·lazy·확대 표시를 채우고, `postbuild`(`prune-output.mjs`)가 배포물에서 본문 원본을 뺀다. 새 이미지는 `public/images/posts/contents/<slug>/`에 PNG/JPG로 두면 된다. 변환 방식을 바꾸면 `PIPELINE_VERSION`을 올린다. `thumbnails/`는 변환하지 않는다(PR-15 전까지 og:image)
- 홈 필터는 `PostsBlock.tsx`(Suspense 폴백이 전체 목록이라 정적 HTML에 14편이 모두 들어간다)
- 정적 export 제약: 서버 기능·런타임 searchParams 없음. `useSearchParams`는 `<Suspense>` 안에서만
- 커밋·PR 문체: `feat:/fix:/refactor:/chore:` + 영어 제목, 본문은 한국어. 커밋 끝에 `Co-Authored-By`·`Claude-Session` 줄, PR 본문 끝에 `🤖 Generated with [Claude Code]` + 세션 링크(세션이 알려 주는 값을 쓴다)

## 4.5 기록 규칙 (매번)

| 언제 | 어디에 | 무엇을 |
| --- | --- | --- |
| PR을 열 때 | STATUS.md 진행 표, "다음 작업", "세션 기록" | PR 번호·상태, 다음 PR의 시작 안내 |
| 머지 확인("pull") 때 | STATUS.md 진행 표 | ✅ 머지로 바꾸고 기준 커밋·"한눈에 보기" 갱신 |
| 디자인·기획에 묻거나 답을 받을 때 | REQUESTS.md | 질문 번호 추가, 답이 오면 closed |
| 시안과 다르게 구현했거나 동작이 바뀔 때 | STATUS.md "시안 대비 차이" / 별도 확인 요청 절 | 항목·이유 |
| 새 함정·명령·규칙을 알았을 때 | CONTEXT.md 6~8장 | 한 줄 추가 |
| 세션을 끝내거나 사용자가 자리를 비울 때 | STATUS.md "세션 기록" | 한 일, 남은 일, 다음에 바로 할 첫 명령 |

기록 위치는 이 폴더(`cowork/develop`)다. 기획·디자인 문서(`cowork/prd`, `cowork/design`)는 그쪽 세션이 쓴다. 개발은 거기서 읽기만 하고 필요한 요청은 REQUESTS.md에 적는다.

## 5. PR 작업 흐름 (반드시 이 순서)

1. `git checkout main && git pull`, 새 브랜치 `feat/<주제>`. 이전 PR이 머지되기 전에는 그 브랜치 위에서 이어 가지 않는다(파일이 겹침)
2. STATUS.md의 "다음 작업" 절 + PRD 해당 PR 절 + 최종 시안을 읽는다
3. 구현
4. 검증(전부): `yarn lint` → `yarn check:tokens` → `yarn build` → `yarn check:output` → `yarn test:e2e`(**build 후**, `out/`을 띄운다). 새 기능에는 E2E를 같이 추가한다
5. **화면이 바뀌는 PR은 PC·Mobile 스크린샷을 PR 본문에 넣는다**(7장). CI·문서만 바뀌는 PR은 생략
6. 커밋 → push → `gh pr create`. CI(`Quality`)가 돌고 Lighthouse 점수 댓글이 자동으로 달린다
7. **기록**: STATUS.md(진행 표, 다음 작업, 세션 기록), REQUESTS.md 갱신(4.5장). 사용자가 시키지 않아도 한다
8. 작업자에게 보고: 한 일 / 검증 결과 / 못 한 것 / 디자이너·기획이 봐야 할 것 / 다음 작업. 머지는 기다린다

## 6. 명령과 CI

```bash
yarn dev                 # 개발 서버 (draft 글도 보임)
yarn build               # 정적 export → out/ (frontmatter 검증 포함)
yarn check:tokens        # 디자인 토큰 금지 패턴
yarn check:output        # og:image, rss, sitemap, adsbygoogle
yarn test:e2e            # Playwright (먼저 yarn build). desktop 1280x720 + mobile 360x640
yarn lhci                # Lighthouse CI (결과는 .lighthouseci/)
node scripts/lighthouse-summary.mjs  # 점수 요약 마크다운
```

- PR CI(`.github/workflows/ci.yaml`): lint → tokens → build → output → E2E → Lighthouse(경고만) → 요약 댓글(PR당 1개 갱신) → 리포트 artifact(7일). public 저장소라 무료
- 배포: `main` push → `deploy.yaml` → GitHub Pages(약 5분). branch protection은 사이트 1차 완성 후 작성자가 켠다
- Lighthouse는 CI 서버에서 한 번만 재서 점수가 크게 흔들린다(LCP 5~23초). 비교는 경향만 본다. 성능 목표는 PR-14(이미지) 이후 error로 전환

## 7. 스크린샷·브라우저 확인 방법

- **실제 Chrome(Claude in Chrome) 확인이 원칙**이다. 도구 `mcp__claude-in-chrome__*`가 세션에 있으면 ToolSearch로 불러서 PC 폭·모바일 폭·콘솔 에러를 확인한다(자세한 요령은 메모리 `feedback-verify-in-chrome`). 도구가 없으면 Playwright Chromium으로 확인하고 **PR 본문에 "실제 Chrome 확인은 못 했다"고 적는다**
- 스크린샷은 `yarn dev`가 아니라 **정적 빌드**로 찍는다(dev는 draft를 보여 줌)

```bash
yarn build && (yarn serve out -l 4000 --no-clipboard &)
node cowork/develop/tools/shoot.mjs /tmp/shots-<PR> home=/ post=/posts/<slug>@h1   # 이름=경로[@선택자] → <이름>-pc.png / -mobile.png
pkill -f "serve out"
cowork/develop/tools/publish-shots.sh <PR번호> /tmp/shots-<PR>   # pr-screenshots 브랜치에 올리고 raw URL 기준 출력
```

- PR 본문 표: `| | PC | Mobile |` 행마다 `![](<URL>/<이름>-pc.png)`. 다시 올릴 땐 `?v=2`로 캐시를 피한다
- 기존 글에 없는 요소(콜아웃, `$ ` 셸 등)는 `posts/zz-preview.md` 같은 **임시 글**을 만들어 찍고 **커밋 전에 지운다**(`git status`로 확인)
- 임시 파일은 세션 scratchpad나 `/tmp`에 둔다. 세션이 끝나면 scratchpad는 사라진다

## 8. 함정 (겪은 것)

- **CSS `font:` 단축 속성에 `var()`를 여러 개 쓰지 않는다.** 빌드 CSS 압축이 `font:400 var(--a),var(--b)`로 쉼표를 끼워 넣어 선언이 통째로 무효가 된다(dev 서버에서는 정상으로 보여 PR 스크린샷으로는 안 잡힌다, PR-12). `font-family`·`font-size`·`font-weight`로 나눠 쓴다. `check:output`이 빌드 CSS에서 이 패턴을 잡는다
- **화면 확인은 `yarn build` 결과(`out/`)로 한다.** dev 서버와 빌드 CSS가 다를 수 있다
- **`git stash -u`를 쓰지 않는다.** 작성자의 미추적 파일(`resume.md`, `.claude/launch.json`)까지 stash에 들어간다(한 번 겪고 `stash pop`으로 복구). 작업 중 브랜치를 옮길 땐 먼저 커밋하고 `git rebase --onto`를 쓴다
- 셸 heredoc에 백틱이 든 텍스트를 넣을 땐 `<<'EOF'`(따옴표)로 쓴다. 안 그러면 셸이 백틱 안을 실행한다

- macOS `sed -i`는 `sed -i '' 's/…/…/'` 형식이어야 한다. 실패하면 `&&` 뒤 명령이 안 돈다
- hast 속성 값은 문자열이어야 한다(`strokeWidth: "2"`). 숫자를 넣으면 `next build`가 타입 오류
- `output: "export"`라 `generateStaticParams`에 없는 경로는 404. `dynamicParams = false`
- E2E는 `out/`을 쓰므로 코드를 고치고 `yarn build` 없이 테스트하면 이전 결과로 돈다
- 시안에 있는 클래스·마크업을 먼저 대조하지 않으면 PR 후에 시안과 어긋난 곳이 나온다(PR-11에서 겪음: 아이콘·`warning` 라벨·`$ ` 프롬프트 분리·표 흐림 방향)
- `cowork/design/README.md`의 일부 문구가 뒤처질 수 있다. 의심되면 PRD-003과 최신 번호 문서(15번 등)를 기준으로 본다

## 9. 작성자 선호

- 한국어로, 간결하게 보고한다. 결과를 숨기지 않는다: 실패·못 한 것·확인 안 된 것은 그대로 쓴다
- 작업은 PRD 순서대로 PR 하나씩. 머지 전에 다음 PR로 가지 않는다
- 새 skill·전역 도구는 설치 전에 확인받는다(`SKILLS.md`). 외부 서비스로 내보내는 작업도 먼저 묻는다
