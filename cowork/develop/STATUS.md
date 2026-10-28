# 개발 진행 현황

_최종 갱신: 2026-10-28 · 기준 커밋 `5d0874b`(main) + PR #33 · 기준 기획서 PRD-003(approved) · 디자인 v1.4_

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | **완료.** PR-0~PR-8, 배포 재개, 배포 후 점검까지 |
| Phase 1 읽기 경험 (PRD-003) | **진행 중.** PR-9·10·11 완료, PR-12 리뷰 대기, 나머지 대기 |
| 지금 막힌 것 | 없음. 기획(PRD-003 approved)·디자인(v1.4, 썸네일 C안)이 확정돼 PR-9 바로 시작 가능 |

## 다음 작업 (새 세션은 여기서 시작)

1. `gh pr list`로 #33(PR-12) 머지 여부 확인. 머지됐으면 `git checkout main && git pull`(다른 세션의 미커밋 변경이 있으면 `git stash` 후 pull, `stash pop`), 안 됐으면 사용자에게 묻는다
2. **PR-13 관련 글** (`cowork/prd/003_blog_reading-experience.md` PR-13 절)
   - 먼저 시안 대조: `cowork/design/site/post.html`의 관련 글 영역과 `post-item--compact`(`components.css`)
   - 규칙(F-PO-06): 태그 교집합 수가 점수, 같으면 최신순. **같은 시리즈 글과 이전/다음 글은 제외**, 점수 0은 채우지 않음, 최대 3편, 0편이면 섹션 숨김, draft 제외, 빌드 타임 계산
   - 위치: 이전/다음(`PostPager`) 아래, 댓글 위. 신규 `post/RelatedPosts.tsx`, `posts.ts`에 `getRelatedPosts(id)`
   - 수용 기준: 같은 글이 시리즈 박스·이전/다음·관련 글에 두 번 이상 나오지 않음(단위 테스트 또는 산출물 검사). E2E 추가
3. 이후 PR-14(이미지, Lighthouse 경고→error) → PR-15 → PR-16 → PR-17

## Phase 1 PR별 상태

| PR | 내용 | 상태 | 링크 |
| --- | --- | --- | --- |
| PR-10 | E2E(Playwright)·Lighthouse CI | ✅ 머지 | #27 |
| PR-11 | 본문: 코드 블록·콜아웃·표 | ✅ 머지 | #28 |
| (추가) | PR 댓글 Lighthouse 요약 | ✅ 머지 | #29 |
| PR-9 | categories 다중화·`updated` 삭제·필터 URL·목록 썸네일 제거 | ✅ 머지 | #30 |
| (추가) | CLAUDE.md에 개발 인수인계 지침 추가(기록 규칙) | ✅ 머지 | #31 |
| PR-12 | 글 상단 바: 목차·시리즈 | 🔍 리뷰 대기 | #33 |
| PR-13 | 관련 글 | ⏳ 대기 | |
| PR-14 | 이미지 파이프라인(WebP·lazy·확대) | ⏳ 대기. Lighthouse 경고→실패 전환 | |
| PR-15 | OG 이미지 자동 생성, `thumbnail` 필드 삭제 | ⏳ 대기. 첫 단계는 정적 export PoC | |
| PR-16 | 읽기 진행률·링크 체커 | ⏳ 대기 | |
| PR-17 | 게이트 측정·문서 | ⏳ 대기 | |

개발 순서(PRD-003 확정): PR-10 → PR-9 → PR-11·12·13 → PR-14 → PR-15 → PR-16 → PR-17. 한 번에 PR 하나, 사용자가 머지하면 다음으로 간다.

## 사용자에게 보이는 현재 상태 (라이브 사이트)

- 디자인 시스템 v1.3(Terminal Graphite) 적용, 자동 배포 가동
- 홈: 연도별 세로 리스트, 카테고리 칩, 검색. PR #30 머지 전까지는 목록 썸네일이 있고 필터가 URL에 반영되지 않는다
- 글 상세: 오른쪽 sticky 목차(1280 이상만), 코드 복사, 이전/다음, 저자 박스, Giscus
- 아직 없음: 모바일 목차·시리즈 바, 시리즈 박스, 관련 글, 이미지 확대, 진행률, OG 자동 생성
- 머지됨(#28): 코드 파일명·줄 하이라이트·복사 아이콘, 콜아웃 2종, 표 가장자리 흐림
- PR #30 머지 후: categories 2개(`infra, oss`), 필터 URL(`/?category=infra`), 목록 썸네일 없음, 수정일 없음

## 시안 대비 차이 (디자이너 확인 요청)

PR #28(PR-11)을 최종 시안(`cowork/design/system/components.css`, `site/post.html`)과 대조했다. 처음 구현에서 달랐던 곳은 모두 시안대로 고쳤고, 지금 남은 차이는 없다.

| # | 항목 | 처음 구현 | 처리 |
| --- | --- | --- | --- |
| D-1 | 콜아웃 라벨 | 텍스트만, `warn` | 아이콘 추가, 라벨 `note`/`warning` ✅ |
| D-2 | 복사 버튼 | 텍스트만 | 아이콘 + `.code__copy-label`(aria-live), 2초 복귀 ✅ |
| D-3 | 셸 `$ ` 프롬프트 | 화면에 그대로 | `.p` 분리(선택 불가, 녹색) ✅ |
| D-4 | 표 가장자리 | 양쪽 | 오른쪽만, `fg 14%` ✅ |

확인 못 한 것: **실제 Chrome(Claude in Chrome) 확인**은 도구가 세션에 없어 못 했다. Playwright Chromium으로만 봤다. Safari·Firefox 미확인.

## 측정값 (Lighthouse, 로컬 정적 빌드, 모바일)

PR-10 시점. 이미지 작업(PR-14) 전이라 목표 미달이 정상이다.

| 지표 | 목표(G1) | 현재 |
| --- | --- | --- |
| 성능 | ≥ 95 | 0.74 (홈) |
| 접근성 | 100 | 0.98 (홈) |
| LCP | ≤ 2.0s | 약 5.0s |
| CLS | ≤ 0.05 | About 0.128이 Phase 0 측정에서 발견됨. 원인 미확인 → PR-14에서 확인 |

## 기획·디자인이 결정해야 하는 것

| # | 질문 | 누구 | 영향 PR |
| --- | --- | --- | --- |
| Q4 | 기존 글에 콜아웃·`$ ` 셸 블록 적용 여부. 지금은 기능 확인용 1편(values.yaml)에만 적용했다. 나머지 글에 소급 적용할지 | 기획 | 글 작성 |

## PR-12(#33)에서 정한 동작 (디자이너 확인 요청)

| # | 내용 |
| --- | --- |
| P-5 | 목차는 본문 h2가 3개 이상일 때만 만든다(sticky·inline 모두). `install-cilium-eks`(h2 2개)는 목차 없이 시리즈 박스만 한 줄 전체를 쓴다 |
| P-6 | 시리즈 박스는 시안대로 `<button aria-expanded>`로 연다(PRD는 `<details>`라고 했지만 시안·E2E 기준이 aria-expanded라 시안을 따랐다). 목차(inline)는 `<details>` |
| P-7 | 시리즈 박스 이름은 시안대로 slug(`eks-from-scratch`), 모바일(<640)은 `series eks`. `series.yaml`의 `title`은 화면에 안 나오고 목록의 `aria-label`로만 쓴다 |
| P-8 | 목차 링크를 누르면 inline 목차가 닫힌다. 현재 항목은 `aria-current="true"`, 굵기 600 + accent 왼쪽선 |
| P-9 | 홈 목록 메타 `series eks 3/5`의 분모는 발행된 시리즈 글 수 |

## PR-9(#30)에서 정한 동작 (디자이너 확인 완료: design/16번)

| # | 내용 |
| --- | --- |
| P-1 | 정적 export라 서버가 `?category=`를 모른다. 처음 받는 HTML은 **필터 없는 전체 목록**이고, JS가 켜지면 URL 값으로 필터가 걸린다. `/?category=infra`로 직접 들어가면 전체 목록이 잠깐 보였다가 필터된다(검색엔진용 HTML에는 전체 목록이 들어 있어 SEO에는 이득). **디자인 16번: 허용**(PC 약 80ms, 모바일 CPU 4배 느림 약 420ms, CLS 0). 다시 볼 조건: 실기기·느린 네트워크에서 약 1초 이상 보이거나 필터 URL 유입이 늘 때 → 항목 `data-categories` + 하이드레이션 전 인라인 스크립트가 `<html data-filter>`를 붙여 CSS로 숨기는 방법(권장). 목록을 투명하게 두는 방법은 LCP가 늦어져 비권장 |
| P-2 | (16번 확인) 글이 0편인 카테고리(`?category=backend`)나 모르는 값은 `all`로 본다 |
| P-3 | (16번 확인) 글 상세 헤더의 카테고리는 각각 `/?category=값` 링크(accent), 쉼표는 mute·링크 밖 |
| P-4 | (16번 확인) 시리즈 label 8자 이하 규칙을 빌드가 검사한다. 현재 `eks`, `cilium`은 통과 |

## 사용자(작성자) 작업

- Search Console·네이버 서치어드바이저 sitemap 재제출
- LinkedIn Post Inspector로 OG 확인 (로그인 필요)
- 사이트 1차 완성 후 branch protection 켜기(PR CI 통과 필수)
- `cowork/` 폴더를 저장소에 커밋할지 결정. 저장소가 public이라 올리면 기획·시안이 공개된다. **지금은 미커밋 상태**

## 변경 이력

| 날짜 | 내용 |
| --- | --- |
| 2026-10-28 | PR-9 오픈(#30), Q2 종료(현재 label 모두 8자 이하). PR-11을 최종 시안과 대조해 D-1~D-4 수정, Q1·Q3 종료. 문서 신설. PR-10 머지(#27), PR-11 오픈(#28) |

## 세션 기록

| 날짜 | 한 일 | 남은 일 / 다음 첫 명령 |
| --- | --- | --- |
| 2026-10-28 | PR-10(#27), PR-11(#28), Lighthouse 댓글(#29) 머지. PR-9(#30) 오픈, CI 통과. CLAUDE.md 지침 PR(#31) 오픈, 기록 규칙을 CONTEXT 4.5장·메모리에 명시. `cowork/develop` 문서·도구 신설(CONTEXT, STATUS, REQUESTS, tools/) | #30 머지 확인 → PR-12 시작. `gh pr view 30 --json state` |
