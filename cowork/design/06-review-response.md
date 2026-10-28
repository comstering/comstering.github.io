# 06. 기획 리뷰 반영 + 디자인 점검 결과 (v1.1 → v1.2)

대상: [05-planning-review.md](./05-planning-review.md)의 수정 요청 R1~R10, 디자인 스킬 점검 결과
작성: 디자인 세션 · 2026-10-27
결과: `design-system.html` v1.1, `site/*.html` 9종, `system/*` (giscus 테마 2종 추가)

## 1. 기획 수정 요청 반영

| # | 요청 | 반영 | 위치 |
|---|---|---|---|
| R1 | `$66K/yr` 합산 지표 제거 | **반영.** 상단 지표 줄을 통째로 삭제했다. 성과는 프로젝트 행마다 실측 숫자 1개만 둔다 | `projects.html` |
| R2 | "IP 부족 장애 0건" 삭제 | **반영.** "(VPC Secondary CIDR)"로 바꿨다 | `project.html` 결과 |
| R3 | 시안용 수치·문장 표시 | **반영.** `.ph`(점선 밑줄)와 `.ph-block`(점선 테두리)을 추가하고, 푸터에 범례를 넣었다. 대상: 조회수, 수정일, 댓글 반응 수, 프로젝트 역할, 문제 서술, 배운 점, About 직함 2개 | `components.css` · 전 화면 |
| R4 | 모바일 터치 영역 44px | **반영.** 행 링크의 앵커 자체를 44px 이상으로 만들었다(시각 크기는 그대로). 360px에서 측정한 결과, 태그와 제목 앵커(`#`)를 뺀 모든 조작 요소가 44px 이상이다. 태그는 32px에 간격 12px로 WCAG 2.5.8을 통과한다. `#` 앵커는 터치 기기에서 숨긴다 | `components.css` 끝의 touch targets |
| R5 | Giscus 범위 조정 | **반영.** 댓글을 직접 그린 UI 대신 iframe 자리 표시로 바꾸고, `system/giscus-dark.css`, `giscus-light.css`(토큰 값 복사본)를 추가했다 | `post.html`, `system/` |
| R6 | 시리즈 박스 기본 접힘 | **반영.** 모든 폭에서 한 줄(`eks-from-scratch 5/5 · 현재 글 제목 · 펼침 아이콘`)이다. 이제 1280×720 첫 화면에 본문 첫 문단이 보인다 | `post.html` |
| R7 | 프로젝트 목록에 근거 글 표시 | **반영.** 메타 열에 `근거 글 N →` 링크를 추가했다(EKS 네트워킹 4, Kafka 2, Cloud Native 3) | `projects.html` |
| R8 | 모바일 홈 첫 글이 너무 아래 | **반영.** 1024px 미만에서는 featured를 1개 + `projects →`로 줄였고, 히어로 eyebrow도 없앴다. 360px에서 첫 글 제목 위치가 888px에서 약 776px로 올라갔다 | `index.html` |
| R9 | og 페이지 컨테이너 | **반영** | `og.html` |
| R10 | Cilium 글 시리즈 표기 | **반영.** Q3 결정대로 `cilium-on-eks` 시리즈(3편)로 분리했다. 홈 사이드와 글 목록 메타에도 반영 | `og.html`, `index.html`, `data` |

## 2. 디자인 스킬 점검

| 스킬 | 사용 방식 | 비고 |
|---|---|---|
| **impeccable** (audit + critique, craft-floor) | 플레이북 기준으로 수동 점검하고 `impeccable detect`로 정적 검사 | 비평은 서브에이전트 없이 단일 컨텍스트로 진행 (degraded) |
| **design-taste-frontend** | 최종 pre-flight 체크리스트 | Design read: "개발자 포트폴리오 + 기술 블로그, 채용 담당자·엔지니어 대상, 차분한 dark-tech, 기존 브랜드 보존" · dial 4/3/4 |
| **ui-ux-pro-max** | `--design-system`, `--domain ux` 검색 | 방향 일치 확인: 다크, 그린 accent, JetBrains Mono. 이 도구가 제안한 글로우·IBM Plex는 브리프와 충돌해서 채택하지 않음 |

### detector 결과 (`impeccable detect`, 정적 HTML 검사)

| 규칙 | v1.0 | v1.1 | 판단 |
|---|---|---|---|
| side-tab (색 있는 굵은 측면선) | 5 | **0** | 콜아웃 3px 선을 1px 틴트 테두리 + 아이콘 라벨로 교체 |
| low-contrast | 3 | **0** (사이트) | 하이라이트 줄 위 주석 4.1 → 5.05:1 (`--syntax-comment` `#7f9a8c`). DS의 2건은 의도된 "don't" 예시 |
| skipped-heading | 2 | **0** | Reference h4 → h3, 태그 페이지에 sr-only h2 |
| tiny / undersized text | 13 | **0** (사이트) | DS 라벨 11 → 12px, 마크 데모 확대 |
| cramped-padding | 64 | 69 | **오탐.** 정적 검사가 패딩을 계산하지 못한다. 렌더링해서 확인하면 행마다 16~32px 여백이 있다 |

### 직접 판단한 결함 → 수정

| 항목 | 근거 | 수정 |
|---|---|---|
| 히어로 eyebrow (`$ whoami → ...`) | craft-floor: eyebrow 금지, taste: hero stack | 삭제. 이름은 제목 아래 한 줄로 |
| 섹션 번호 (`01 problem`, 역량 `01~03`, DS `01 brand`) | 번호가 정보가 아닌 장식 | 삭제. 프로젝트는 `문제 / 접근 / 구조 / 결과 / 배운 점` 제목 + 한 줄 요약 |
| 상단 지표 줄 (프로젝트 상세) | hero-metric 템플릿 | 결과 섹션 안으로 이동 |
| 유니코드 화살표·`▾`·`+/−` | 아이콘 체계 대신 글리프 | 링크 화살표와 펼침 표시를 SVG 아이콘(mask)으로 교체 |
| 장식용 점 (배지 점, 코드 파일명 점) | taste: 장식용 점 금지 | 삭제 |
| em dash, 범위 en dash | taste: 대시 금지 | 기간은 한국어 관례 `~`, 문장은 쉼표·콜론 |
| `scroll` 리스너 3곳 | taste: scroll 리스너 금지, 성능 | 진행률은 CSS scroll-driven(+IO 대체), TOC는 IntersectionObserver |
| 브라우저 기본 표면 | craft-floor: browser surfaces | `scrollbar-color`, `caret-color`, `touch-action: manipulation` |
| 버튼 눌림 피드백 없음 | taste: tactile | `:active` 1px 이동 |

### 브리프가 우선해서 유지한 것

- **모노 라벨·내비:** `DESIGN.md`가 정한 브랜드 규칙이라 유지했다. craft-floor의 "모노는 꾸밈용이 아니어야 한다"와 겹치지만, 브리프가 우선한다.
- **lucide 아이콘:** taste 스킬은 Phosphor를 권하지만, 프로젝트가 이미 `lucide-react`를 쓰고 있어서 유지했다.
- **글 상세 헤더의 `카테고리 · 날짜`:** PRD F-PO-01이 정한 순서라 유지했다. 제목 위의 메타 정보이지 eyebrow가 아니다.

## 3. 재검증

| 항목 | 결과 |
|---|---|
| 360px 가로 스크롤 | 9개 화면 + 디자인 시스템 페이지 0건 |
| 상호작용 | 테마 토글, 필터 → URL → 뒤로가기, `?category=infra`, ⌘K "카펜터" → ↓ → Esc, TOC 이동 시 제목 위치 88px, 진행률(CSS scroll-driven) |
| 대시 문자 | 모든 화면에서 `—` `–` 0건 |

## 4. 기획에 재검토 요청

1. R1~R10 반영 결과가 기획 의도와 맞는지
2. `.ph` 표시 범위(어떤 값이 시안용인지)가 맞는지
3. 시리즈를 2개(`eks-from-scratch` 5편, `cilium-on-eks` 3편)로 나눈 것을 PRD 6.1 스키마에 반영할지

## 5. 재검토 결과와 v1.2 반영

기획 재검토([07-planning-rereview.md](./07-planning-rereview.md)) 결과는 **승인**이다. R1~R10은 모두 통과했다.

| # | 요청 | 반영 |
|---|---|---|
| N1 | Pod IP 수치가 출처마다 다름 (About 500 → 16,000, 블로그 약 760 → 약 24,000, 다이어그램은 또 다른 값) | `project.html` 구조 다이어그램 전체를 `.ph-block`으로 표시하고 확정 대기 캡션을 달았다. **작성자 결정이 필요하다.** 결정되면 블로그와 같은 구성(노드 /24 ×3, Pod /19 ×3)으로 다시 그린다 |
| N2 | 시안 표시가 구현으로 넘어가면 안 됨 | `04-design-system.md`에 규칙과 CI grep 검사를 추가했다 |
| N3 | 시리즈 label과 slug 표기 규칙 | `04-design-system.md`에 규칙을 추가했다. 목록 메타는 label, 시리즈 박스와 홈 사이드는 slug. 시안은 이미 이 규칙대로다 |
| 의견 | 화살표 SVG화 이후 외부 링크 의미 보존 | 모든 `target="_blank"` 링크에 스크린리더용 텍스트 `(새 창에서 열림)`을 추가했다. 시그니처 5번 정의도 갱신했다 |
| 의견 | scroll-driven 대체 경로를 Safari·Firefox에서 확인 | 구현 단계 체크 항목으로 `04`에 기록했다 |

남은 사용자 결정: N1 수치 기준, AdSense 제거, 카테고리 승인, F-PJ-05 공개 범위.
