# git·셸 규칙과 함정

## git

- 커밋할 때는 항상 파일을 지정해서 `git add`한다. `git add -A`와 `git add .`는 쓰지 않는다.
- 작성자 파일은 건드리지 않고 커밋에 넣지 않는다: `resume.md`, `resume.pdf`, `.claude/launch.json`, `.claude/settings.local.json`, 다른 세션이 남긴 미커밋 변경.
- **`git stash -u`를 쓰지 않는다.** 작성자의 미추적 파일(`resume.md`, `.claude/launch.json`)까지 stash에 들어간다(한 번 겪고 `stash pop`으로 복구). 작업 중 브랜치를 옮길 땐 먼저 커밋하고 `git rebase --onto`를 쓴다.
- 브랜치는 `main`을 pull한 뒤 새로 만든다. 이전 PR이 머지되기 전에는 그 브랜치 위에서 이어 가지 않는다(파일이 겹침).
- **여러 세션이 같은 문서(REQUESTS.md 등)에 번호를 붙이면 충돌한다.** 새 번호를 쓰기 전에 `git fetch` 후 `origin/main`의 마지막 번호를 확인한다.

## 커밋·PR 문체

- 제목: `feat:` / `fix:` / `refactor:` / `chore:` + 영어. 본문은 한국어.
- 커밋 끝에 `Co-Authored-By`·`Claude-Session` 줄, PR 본문 끝에 `🤖 Generated with [Claude Code]` + 세션 링크(세션이 알려 주는 값을 쓴다).

## 셸

- macOS `sed -i`는 `sed -i '' 's/…/…/'` 형식이어야 한다. 실패하면 `&&` 뒤 명령이 안 돈다.
- heredoc에 백틱이 든 텍스트를 넣을 땐 `<<'EOF'`(따옴표)로 쓴다. 안 그러면 셸이 백틱 안을 실행한다.
- zsh는 변수를 공백으로 나누지 않는다. 여러 개를 반복문으로 돌리는 명령(예: `npx skills add`)은 한 번에 하나씩 직접 실행한다.
- **실험 결과를 저장소 안 폴더에 남기지 않는다.** `.lighthouseci`처럼 다른 세션이 읽는 폴더에 실험(글꼴 2MB 등) 측정을 남겼다가 기획이 그 값(성능 56)을 근거로 삼았다(Q11). 실험은 scratchpad 경로로 출력하고, 끝나면 정상 빌드로 다시 측정해 둔다.
