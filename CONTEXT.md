# CONTEXT.md

**프로젝트**: comstering.github.io
**목적**: DevOps · Cloud Native Engineer 최한수(Comstering)의 개발 블로그와 프로필 사이트
**마지막 업데이트**: 2026-10-27 (PRD-002 Phase 0 완료 시점)

## 현재 상태

Phase 0(안정화)가 끝났다. 디자인은 Terminal Graphite 디자인 시스템(v1.3)으로 전환됐고, 자동 배포가 다시 켜졌다. 다음은 Phase 1(읽기 경험)이다.

### 완료된 기능
- Next.js 15 App Router 정적 사이트, GitHub Actions → GitHub Pages 자동 배포
- 디자인 시스템 v1.3: 시맨틱 토큰(라이트/다크, 다크 기본), Pretendard + JetBrains Mono, [DESIGN.md](./DESIGN.md)
- 블로그 **14편 발행 + 초안 1편**(`operator-lifecycle-manager`, `draft: true`)
- frontmatter v2(단일 `category`, 정규 태그, 시리즈 필드, `draft`)와 빌드 시점 zod 검증
- 홈: 연도별 세로 리스트, 카테고리 칩(글 수 표시, 0편 숨김), 제목·설명·태그 검색
- 글 상세: `~/posts/<slug>` 경로, 메타(읽기 시간·조회수·수정일), 제목 앵커, 우측 sticky 목차(1280px 이상), 코드 복사·구문 하이라이트(HCL 포함), 이전/다음 글, 저자 박스, Giscus 댓글(사이트 테마 동기화)
- About·404 토큰 정리(About 구조는 유지), 404는 최신 글 3편
- SEO: `metadataBase`, 제목 템플릿, canonical, OG/Twitter, JSON-LD(BlogPosting·Person), `/rss.xml`, 안정적인 sitemap, 푸터 링크
- 서드파티: AdSense 제거(`ads.txt` 유지), GoatCounter 지연 로드
- PR CI(`Quality`): lint, 디자인 토큰 검사, 빌드(frontmatter 검증), 산출물 검사

### 진행 중인 작업
- 없음. 남은 사용자 작업: sitemap 재제출(Search Console·네이버), LinkedIn Post Inspector 확인.

## 배포 후 점검 (2026-10-27, PR-8 머지 직후)

배포는 `main` push 후 약 5분 34초에 끝났다(G0-6: 10분 이내 통과). PR CI는 약 80초.

| 항목 | 결과 |
| --- | --- |
| 라이브 반영 (홈·About·글·404·RSS·sitemap·robots·giscus css·ads.txt) | 통과. 초안 글은 404, 404 페이지는 `페이지를 찾을 수 없어요 · Comstering` |
| Giscus 커스텀 CSS (라이트·다크, 토글, 새로고침 후 초기 테마) | 통과. 배포 URL의 `giscus/{dark,light}.css`가 적용됨 |
| 라이브 구조 확인 (canonical, og:image, JSON-LD, 모바일 390px 가로 스크롤, h1 개수) | 통과 |
| W3C Feed Validator (`/rss.xml`) | 통과 ("valid RSS feed", G0-4) |
| Rich Results Test (글 1편) | `BlogPosting` 유효 1개, 오류 0. 선택 사항 경고 4개(`datePublished`·`dateModified`가 날짜만 있고 시간대 없음) → 이 날짜를 ISO datetime(+09:00)으로 고침 |
| Search Console, 네이버 서치어드바이저 sitemap 재제출 | 사용자 작업 (미완) |
| LinkedIn Post Inspector (OG 미리보기) | 사용자 작업 (LinkedIn 로그인 필요, 미완) |

### Lighthouse (PageSpeed Insights, 모바일, 2026-10-27)

| 페이지 | 성능 | 접근성 | 권장사항 | SEO | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 홈 `/` | 68 | 96 | 100 | 100 | 9.3s | 2.7s | 40ms | 0 |
| 글 상세 `/posts/karpenter` | 67 | 100 | 96 | 100 | 6.2s | 3.6s | 10ms | 0 |
| About `/about` | 84 | 98 | 100 | 100 | 3.5s | 2.4s | 20ms | 0.128 |

- **G0-2 통과**: 세 페이지 모두 SEO 100, 접근성 95 이상.
- 성능은 Phase 0 게이트가 아니다. LCP·CLS 목표(LCP ≤ 2.0s, CLS ≤ 0.05)는 Phase 1 품질 게이트다.
- 주된 원인: 목록 썸네일이 최적화되지 않은 큰 PNG라 홈 전송량이 약 2.7 MB(이미지 전송 개선 예상 절감 2,179 KiB), 렌더링 차단 요청(예상 절감 2.2s). About의 CLS 0.128은 원인 확인 필요.
- Phase 1 우선 작업: 이미지 WebP 변환과 크기 맞춤, LCP 이미지 우선 로드, 렌더링 차단 CSS(폰트) 점검, About 레이아웃 이동 원인 확인.

## TODO / 계획

로드맵 전체는 [cowork/prd/001_site_master-plan.md](./cowork/prd/001_site_master-plan.md) 7장.

### Phase 1 · 읽기 경험 (2026.12 ~ 2027.01)
- [ ] 모바일 목차·시리즈 한 줄 바, 시리즈 박스(필드와 검증은 이미 있음), 관련 글(시리즈·이전/다음 제외, 점수 0 제외)
- [ ] 코드 블록 파일명 바·줄 하이라이트, 콜아웃, 이미지 라이트박스, 읽기 진행률
- [ ] 이미지 WebP 변환, OG 이미지 자동 생성(목록 썸네일 겸용)
- [ ] 홈 필터 URL 쿼리 연동(`?category=`)
- [ ] 글 단위 수정 이력(Git 로그 기반), Lighthouse CI, 링크 체커 주간 스케줄
- [ ] 광고 재도입 검토(조건: LCP ≤ 2.0s, CLS ≤ 0.05, 글 상세 하단 1곳)

### Phase 2 · 포트폴리오 (2027.02 ~ 2027.03)
- [ ] 프로젝트 데이터 분리, `/projects` 목록·상세, About 요약 우선 재구성, 이력서 PDF, 오픈소스 기여 목록, 홈 대표 프로젝트, 헤더 `projects` 메뉴

### Phase 3 · 탐색·확장 (2027.04 이후)
- [ ] Cmd+K 검색 팔레트, 태그 페이지, 영문 About·Projects, MDX 전환 검토, 커스텀 도메인 검토

### 기타 후보
- [ ] Next.js 15.2 → 최신 안정 버전 업그레이드

## 알려진 이슈 / 확인 필요

- **Temporal 프로젝트 기간**(About: `2025.05 ~ 2026.03, 2026.01 ~ 2026.02`)이 두 구간으로 적혀 있다. 정확한 값 확인 후 수정(작성자 확인 필요).
- `operator-lifecycle-manager` 글은 본문이 작성 중이다(초안이라 배포에는 나가지 않음).
- `description` 길이(80~160자 권장)는 검증하지 않는다. 현재 글 대부분이 80자 미만.
- 조회수는 GoatCounter가 `localhost`에서 집계하지 않아 로컬에서는 0으로 보인다. 라이브에서는 방문이 쌓이면 표시된다(집계 전 경로는 API가 404라 0으로 표시).
- Giscus 커스텀 CSS는 배포된 URL에서만 읽힌다. 로컬은 내장 테마로 대체(라이브에서는 확인 완료).
- `main` 브랜치 보호(필수 체크 `Quality`) ruleset은 만들어 두었지만 **1차 완성 전까지 적용하지 않는다**. 적용 전에는 CI가 실패해도 머지가 가능하다.
- `src/app/robots.ts`의 `disallow: ["/api/"]`는 남아 있다(무해).

## 배포 정보

- **배포**: `main` push → `.github/workflows/deploy.yaml` → GitHub Pages (artifact 배포). 이전 커밋 재배포는 Actions의 `workflow_dispatch`
- **PR 검증**: `.github/workflows/ci.yaml`(`Quality`)
- **URL**: https://comstering.github.io

## 참고 사항

- 이미지는 unoptimized 모드(정적 export 요구사항), 동적 라우팅은 빌드 타임에 생성
- PR 작업 규칙: 브랜치 → 커밋(`feat:` / `refactor:` / `fix:` + 영어 메시지) → PR, 머지는 GitHub에서 직접. PR마다 PC·모바일 스크린샷 첨부(`pr-screenshots` 브랜치)

## Skills

이 프로젝트에서 사용하는 skill 목록과 설치/복구 방법은 [SKILLS.md](./SKILLS.md) 참고.
