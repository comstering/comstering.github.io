# SKILLS.md

이 사이트 개발에 쓰는 Claude Code skill 목록. 다른 PC/clone에서 `git pull` 한 뒤, 또는 skill이 지워졌을 때 여기 명령으로 복구한다.

## 복구 방법

```bash
# 1. 프로젝트 스코프 skill 복원 (.claude/skills, skills-lock.json 기준)
npx skills experimental_install

# 2. 전역/미설치 skill은 아래 표의 명령으로 개별 설치
npx skills check     # 업데이트 확인
npx skills update    # 업데이트
```

- 설치는 `--agent claude-code -y` 로 비대화형 실행. 설치 후 `skills.sh` 보안 평가(Gen/Socket/Snyk)를 확인한다.
- skill은 full agent permission으로 실행되므로 새 skill은 내용을 검토하고 설치한다.
- 다른 스레드/세션에서 전역(`~/.claude`)에 이미 설치된 skill은 중복 설치하지 않는다.

## Skill 목록

| Skill | 용도 | 설치 명령 | 위치 / 상태 |
|---|---|---|---|
| find-skills | 필요한 skill 검색·추천 | `npx skills add vercel-labs/skills --skill find-skills --agent claude-code -y` | 프로젝트 `.claude/skills/` — 설치됨 |
| design-taste-frontend (taste-skill) | 웹 디자인 품질/반AI슬롭 | `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend --agent claude-code -y` | 전역 설치됨(anthropic-skills) |
| ui-ux-pro-max | UI/UX 가이드 DB | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --agent claude-code -y` 또는 `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` → `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` | 전역 설치됨(anthropic-skills) |
| impeccable | 디자인 critique/polish/audit | `npx skills add pbakaus/impeccable --agent claude-code -y` 후 `/impeccable init` | 전역 설치됨(anthropic-skills) |
| agent-browser | 브라우저 테스트·자동화 | `npx skills add vercel-labs/agent-browser --agent claude-code -y` (CLI 본체 `agent-browser`도 별도 필요) | 프로젝트 `.claude/skills/` — 설치됨 |
| vercel-react-best-practices, vercel-composition-patterns | React/Next 모범사례 (GSD 웹 팩) | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --skill vercel-composition-patterns --agent claude-code -y` | 프로젝트 `.claude/skills/` — 설치됨 |
| frontend-design | 프론트엔드 디자인 (GSD 웹 팩) | `npx skills add anthropics/skills --skill frontend-design --agent claude-code -y` | 프로젝트 `.claude/skills/` — 설치됨 |

## 출처

- find-skills: https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md
- taste-skill: https://www.tasteskill.dev/ (repo: Leonxlnx/taste-skill)
- ui-ux-pro-max: https://ui-ux-pro-max-skill.com/ (repo: nextlevelbuilder/ui-ux-pro-max-skill)
- impeccable: https://impeccable.style/ (repo: pbakaus/impeccable)
- agent-browser: https://agent-browser.dev/skills
- GSD skills 가이드: https://github.com/gsd-build/gsd-2/blob/main/docs/user-docs/skills.md
