# 개발 PR 작업 흐름 (반드시 이 순서)

개발 세션이 PR 하나를 만들 때의 순서다. 작업은 PRD 순서대로 PR 하나씩 하고, 머지 전에 다음 PR로 가지 않는다.

1. `git fetch` 후 `origin/main` 기준으로 새 브랜치 `feat/<주제>`(`git checkout -b feat/<주제> origin/main`). worktree 세션이면 그 worktree 안에서 한다
2. `cowork/develop/STATUS.md`의 "다음 작업" 절 + PRD 해당 PR 절 + 최종 시안(`cowork/design/site/*.html`, `system/components.css`)을 읽는다
3. 구현
4. 검증(전부): `yarn lint` → `yarn check:tokens` → `yarn check:content` → `yarn build` → `yarn check:output` → `yarn build:resume`(PDF 생성, Playwright 브라우저 필요) → `yarn test:e2e`(**build·build:resume 후**, `out/`을 띄운다). 새 기능에는 E2E를 같이 추가한다
5. **화면이 바뀌는 PR은 PC·Mobile 스크린샷을 PR 본문에 넣는다**(아래). CI·문서만 바뀌는 PR은 생략
6. 커밋 → push → `gh pr create`([commit-and-pr.md](./commit-and-pr.md)). CI(`Quality`)가 돌고 Lighthouse 점수 댓글이 자동으로 달린다
7. **기록**: `cowork/develop/STATUS.md`(진행 표, 다음 작업, 세션 기록), `REQUESTS.md`. 사용자가 시키지 않아도 한다
8. 작업자에게 보고: 한 일 / 검증 결과 / 못 한 것 / 디자이너·기획이 봐야 할 것 / 다음 작업. 머지는 기다린다

## 화면 확인과 스크린샷

- **실제 Chrome(Claude in Chrome) 확인이 원칙**이다. `mcp__claude-in-chrome__*` 도구가 세션에 있으면 ToolSearch로 불러서 PC 폭·모바일 폭·콘솔 에러를 확인한다. 도구가 없거나 안 되면 `cowork/develop/tools/shoot.mjs`(Playwright Chromium)로 확인하고 **PR 본문에 "실제 Chrome 확인은 못 했다"고 적는다**.
- 화면 확인과 스크린샷은 `yarn dev`가 아니라 **정적 빌드(`out/`)**로 한다. dev는 draft 글을 보여 주고, 빌드 CSS와 다를 수 있다.

```bash
yarn build && (yarn serve out -l 4000 --no-clipboard &)
node cowork/develop/tools/shoot.mjs /tmp/shots-<PR> home=/ post=/posts/<slug>@h1   # 이름=경로[@선택자] → <이름>-pc.png / -mobile.png
pkill -f "serve out"
cowork/develop/tools/publish-shots.sh <PR번호> /tmp/shots-<PR>   # pr-screenshots 브랜치에 올리고 raw URL 기준 출력
```

- PR 본문 표: `| | PC | Mobile |` 행마다 `![](<URL>/<이름>-pc.png)`. 다시 올릴 땐 `?v=2`로 캐시를 피한다.
- 기존 글에 없는 요소(콜아웃, `$ ` 셸 등)는 `posts/zz-preview.md` 같은 **임시 글**을 만들어 찍고 **커밋 전에 지운다**(`git status`로 확인).
- 임시 파일은 세션 scratchpad나 `/tmp`에 둔다.
