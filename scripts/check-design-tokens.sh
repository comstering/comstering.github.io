#!/usr/bin/env bash
# 디자인 토큰 규칙(DESIGN.md) 위반 검사. src/ 에서 금지 패턴이 발견되면 실패한다.
#   1) Tailwind 기본 팔레트 색 클래스 (gray-500, sky-400 ...)
#   2) dark: 변형 (라이트/다크는 CSS 변수가 처리한다)
#   3) hex 색상 값 (색은 globals.css의 토큰으로만 정의한다)
#   4) 시안 전용 표시 (class="ph", ph-block, ph-note)
# 단어 경계를 써서 translate-y-1/2(slate-와 겹침)나 gray-matter 패키지명 같은 오탐을 피한다.
set -u

ROOT="${1:-src}"
EXCLUDE="globals.css"
fail=0

check() {
  local title="$1" pattern="$2" hint="$3"
  local hits
  hits=$(grep -rnE --include='*.ts' --include='*.tsx' --include='*.css' --include='*.mdx' \
    --exclude="$EXCLUDE" -e "$pattern" "$ROOT" || true)
  if [ -n "$hits" ]; then
    echo "::error::${title}"
    echo "✗ ${title}"
    echo "  ${hint}"
    echo "$hits" | sed 's/^/    /'
    echo
    fail=1
  else
    echo "✓ ${title}"
  fi
}

PALETTES='gray|grey|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'

check "Tailwind 기본 팔레트 색 클래스 금지" \
  "(^|[^A-Za-z])(${PALETTES})-[0-9]{2,3}([^0-9]|$)" \
  "토큰 유틸리티(bg-canvas, text-fg, border-line, text-accent ...)를 쓰세요."

check "dark: 변형 금지" \
  '(^|[^A-Za-z0-9_-])dark:' \
  "라이트/다크는 CSS 변수가 바꿉니다. dark: 클래스를 붙이지 마세요."

check "hex 색상 값 금지" \
  "\[#[0-9A-Fa-f]{3,8}\]|(['\"(\`]|:[[:space:]]|,[[:space:]])#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?([^0-9A-Za-z]|$)|['\"]#[0-9A-Fa-f]{3}['\"]" \
  "색은 src/app/globals.css의 토큰으로만 정의합니다."

check "시안 전용 표시(ph) 금지" \
  'class(Name)?="ph"|class(Name)?="ph |ph-block|ph-note' \
  "cowork/design 시안의 표시는 구현에 넘기지 않습니다."

if [ "$fail" -ne 0 ]; then
  echo "디자인 토큰 검사 실패. 규칙은 DESIGN.md 참고."
  exit 1
fi
echo "디자인 토큰 검사 통과"
