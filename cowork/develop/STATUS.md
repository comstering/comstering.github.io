# 개발 진행 현황

_최종 갱신: 2026-10-28 · 기준 커밋 `3db7a98`(main) + PR #37 · 기준 기획서 PRD-003(approved) · 디자인 v1.4_

## 한눈에 보기

| 단계 | 상태 |
| --- | --- |
| Phase 0 안정화 (PRD-002) | **완료.** PR-0~PR-8, 배포 재개, 배포 후 점검까지 |
| Phase 1 읽기 경험 (PRD-003) | **진행 중.** PR-9·10·11 완료, PR-12 머지, PR-13 머지, 나머지 대기 |
| 지금 막힌 것 | 없음. 기획(PRD-003 approved)·디자인(v1.4, 썸네일 C안)이 확정돼 PR-9 바로 시작 가능 |

## 다음 작업 (새 세션은 여기서 시작)

1. #37(font 수정) 머지 여부 확인(`gh pr list`). 머지됐으면 `git checkout main && git pull`(`would be overwritten`으로 막히면 미추적 파일이 머지본과 같은지 비교하고 백업으로 옮긴 뒤 pull, 삭제는 하지 않는다)
2. **PR-14 이미지 파이프라인** (`cowork/prd/003_blog_reading-experience.md` PR-14 절, 디자인 12번 E3, 시안 `app.js`의 lightbox)
   - 변환: 빌드 전 sharp로 `public/images/**` png·jpg → WebP, 본문 이미지 최대 폭 1440px, 결과는 `public/_img/`(git 제외), 해시 캐시. **`public/images/posts/thumbnails/`는 변환하지 않는다**(PR-15 전까지 og:image)
   - rehype 플러그인: `src`를 변환본으로, 실제 `width`·`height`, 첫 이미지 외 `loading="lazy" decoding="async"`, alt 비면 빌드 경고
   - 확대: 네이티브 `<dialog>` 라이트박스, **원본 폭이 표시 폭(720px)보다 큰 이미지에만**(E3), Esc·바깥 클릭·44px 닫기·포커스 복귀·캡션
   - 수용: G1-5(본문 이미지 ≤200KB), CLS ≤ 0.05, **Lighthouse 경고를 error로 전환**(`lighthouserc.json`)
   - 새 의존성(sharp)이 필요하다. 설치 전 사용자에게 알린다
3. 이후 PR-15(OG 자동 생성, PoC 먼저) → PR-16 → PR-17

## PR-13에서 정한 동작 (디자이너 확인 요청)

| # | 내용 |
| --- | --- |
| P-10 | 관련 글 섹션은 이전/다음 아래·댓글 위, 제목 `// related`. 항목은 시안 `post-item--compact`(메타 → 제목 → 설명 1줄, 태그 없음). 0편이면 섹션을 그리지 않는다(현재 3편 글 11개, 0편 글 3개: `implement-my-site`, `first-contribute-opensource`, `2025-retrospective…`) |
| P-11 | 같은 `compact` 스타일을 쓰는 404의 최신 글 목록도 시안(`404.html`)대로 함께 바뀐다(패딩·제목 18px·설명 1줄) |
| P-12 | 점수는 태그 교집합 수뿐이다(카테고리는 점수에 안 넣음). 시리즈가 다른 글끼리는 시리즈 위치 메타(`series cilium 3/3`)가 목록에 그대로 보인다 |

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
| 2026-10-29 | 디자인 17번(Q8) 반영: PR-12의 `font:` 단축 속성 6개가 CSS 압축에서 무효가 되던 것을 longhand로 수정, `check:output`에 검사 추가, PR #37. PR-14는 그다음 | #37 머지 확인 → PR-14 시작 |
| 2026-10-28 | PR-13 오픈(#35): 관련 글(점수·시리즈/이전·다음 제외), compact 목록 시안 맞춤(404도 같이 바뀜), E2E 7건. #33·#32 머지 확인, main pull(`691c01b`). 로컬 미추적 `cowork` 58개가 머지본과 동일함을 확인하고 scratchpad 백업으로 옮긴 뒤 pull(삭제는 하지 않음) | PR-13 시작: `git checkout -b feat/related-posts` |
| 2026-10-28 | PR-10(#27), PR-11(#28), Lighthouse 댓글(#29) 머지. PR-9(#30) 오픈, CI 통과. CLAUDE.md 지침 PR(#31) 오픈, 기록 규칙을 CONTEXT 4.5장·메모리에 명시. `cowork/develop` 문서·도구 신설(CONTEXT, STATUS, REQUESTS, tools/) | #30 머지 확인 → PR-12 시작. `gh pr view 30 --json state` |
