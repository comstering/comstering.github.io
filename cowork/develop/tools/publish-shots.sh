#!/usr/bin/env bash
# PR 스크린샷을 orphan 브랜치 pr-screenshots의 pr-<번호>/ 폴더로 올리고, PR 본문에 쓸 raw URL 기준을 출력한다.
#   cowork/develop/tools/publish-shots.sh <PR 번호> <png가 있는 폴더>
# PR 본문: ![](<출력된 URL>/<이름>-pc.png) 처럼 PC | Mobile 표로 넣는다. 같은 파일명을 다시 올리면 ?v=2를 붙여 캐시를 피한다.
set -euo pipefail
pr="${1:?PR 번호}"; src="${2:?png 폴더}"
repo_root="$(git rev-parse --show-toplevel)"
work="$(mktemp -d)"
trap 'git -C "$repo_root" worktree remove --force "$work" 2>/dev/null || true' EXIT
git -C "$repo_root" fetch -q origin pr-screenshots
git -C "$repo_root" worktree add -q "$work" origin/pr-screenshots
cd "$work"
git checkout -q -B pr-screenshots origin/pr-screenshots
mkdir -p "pr-$pr"
cp "$src"/*.png "pr-$pr/"
git add "pr-$pr"
git commit -q -m "Add PR-$pr screenshots" || echo "변경 없음"
git push -q origin pr-screenshots
slug="$(git -C "$repo_root" remote get-url origin | sed -E 's#.*github.com[:/]##; s#\.git$##')"
echo "https://raw.githubusercontent.com/$slug/pr-screenshots/pr-$pr"
