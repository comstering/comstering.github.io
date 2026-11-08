# .claude/rules

Claude Code가 자동으로 읽는 규칙 파일. 세션 역할(기획·디자인·개발)과 상관없이 이 저장소에서 일하는 모든 세션에 적용된다.

- `paths`가 있는 파일은 그 경로의 파일을 다룰 때만 읽힌다. 없는 파일은 항상 읽힌다.
- 경로 지정 규칙은 `Read`·`Write`·`Edit`으로 맞는 파일을 열 때 불려온다. Bash는 `cat`·`head`처럼 파일 하나를 읽을 때만 된다(공식 문서, 2026-11-08 확인). `grep`·리다이렉트·스크립트로만 파일을 다루면 안 불려오니, 그런 작업 전에는 해당 규칙을 직접 읽는다. `/compact` 뒤에는 그 경로 파일을 다시 열어야 다시 불려온다. 작업 폴더가 아닌 형제 worktree의 규칙은 그 worktree에서 시작하거나 `/cd`로 옮겨야 적용된다. 규칙이 불려오는지는 `InstructionsLoaded` 훅으로 볼 수 있다.
- **여기에는 매번 지켜야 하는 규칙과 겪은 함정만 둔다.** 지금 상태·결정 기록·질문은 `cowork/`(STATUS·REQUESTS·CONTEXT·번호 문서)에 둔다.
- 새 함정이나 규칙을 알게 되면 맞는 파일에 한 줄 추가한다. 맞는 파일이 없으면 새 파일을 만들고 아래 표에 넣는다.

| 파일 | 적용 범위 | 내용 |
| --- | --- | --- |
| [commit-and-pr.md](./commit-and-pr.md) | 항상 | 세션 역할별 커밋·PR 시점 |
| [git-shell.md](./git-shell.md) | 항상 | git·셸 사용 규칙과 함정, 커밋·PR 문체 |
| [pr-workflow.md](./pr-workflow.md) | 항상 | 개발 PR 순서, 검증 명령, 스크린샷 |
| [ui.md](./ui.md) | `src/`, 시안 | 디자인 토큰, 레이아웃, 시안 대조 |
| [a11y.md](./a11y.md) | `src/`, `e2e/`, 시안 | 접근성 규칙 |
| [css.md](./css.md) | CSS, `src/` | CSS 함정 |
| [posts.md](./posts.md) | 글, 콘텐츠, 본문 파이프라인 | 글 작성·이미지·본문 처리 |
| [next-build.md](./next-build.md) | 의존성, 빌드, 스크립트 | Next 16·정적 export·의존성 함정 |
| [e2e.md](./e2e.md) | `e2e/`, Playwright·Lighthouse 설정 | E2E·CI 함정 |
| [cowork-docs.md](./cowork-docs.md) | `cowork/` | 세션 기록 문서 공통 규칙 |
| [prd-docs.md](./prd-docs.md) | `cowork/prd/` | PRD 파일명·머리말 |
| [design-docs.md](./design-docs.md) | `cowork/design/` | 디자인 번호 문서·시안 규칙 |
