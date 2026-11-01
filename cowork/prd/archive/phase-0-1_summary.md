---
title: Phase 0~1 기획 정리 (요약 보관본)
period: 2026-10-26 ~ 2026-11-01
written: 2026-11-01 · 기획 세션
sources: prd/001(v1.9), 002(done), 003(done), design/archive(원문 05~21 중 일부는 삭제, README 참고), develop/REQUESTS Q1~Q15
---

# Phase 0~1 기획 정리

> 원문 전체가 아니라 다음 Phase를 진행할 때 다시 볼 핵심만 남긴 요약이다. 세부 근거는 각 원문(PRD·디자인 문서·REQUESTS)에 있다.

## 1. 한눈에

| 단계 | 기간 | 결과 | PR |
| --- | --- | --- | --- |
| 기획·디자인 기반 | 10-26 ~ 10-27 | 마스터 PRD(001), 디자인 시스템 v1.0 → v1.4 확정 | #11, #13~#15, #32 |
| Phase 0 안정화 (PRD-002) | 10-27 | 토큰 이전, 죽은 코드 정리, frontmatter 검증, SEO·RSS, AdSense 제거, CI, 자동 배포 재개 | #16~#26 |
| Phase 1 읽기 경험 (PRD-003) | 10-28 ~ 11-01 | 카테고리 다중화·필터 URL, 코드 블록·콜아웃, 목차·시리즈, 관련 글, 이미지 최적화, OG 자동 생성, 진행률·링크 체커, 성능 게이트 | #27~#57 |
| 부수 | 11-01 | Next.js 16.4.3 업그레이드(백로그 항목 완료), 디자인 접근성 감사 반영 | #50, #51, #57 |

## 2. 사이트 방향 (계속 유효)

| 항목 | 결정 |
| --- | --- |
| 정체성 | 혼합형: 글 목록이 메인, 홈 히어로는 짧은 포트폴리오 소개 |
| 작성자 | 주 직무 **DevOps · Cloud Native Engineer**(CJ 올리브영 2024.06~). Class101은 **Web Developer (backend 중심)**. 웹 영역 안에서 backend가 강점일 뿐 backend 개발자로 소개하지 않는다 |
| 디자인 | Terminal Graphite(다크 기본, 그린 포인트 하나, 세로 리스트, 그림자 없음). 기준 문서는 저장소 `DESIGN.md` |
| 운영 | 정적 export + GitHub Pages, 운영비 0원. main 머지 시 자동 배포, PR마다 CI 품질 게이트 |
| 광고 | AdSense 제거, 추후 재논의(재도입 조건: 글 상세 하단 1곳, 성능 기준 유지). `ads.txt`·계정은 유지 |
| 공개 범위 | 블로그·About에 이미 공개된 내용은 사용 가능. 새 사내 정보만 작성자 확인 |
| 회사 vs 개인 | 회사 성과 수치(About)와 개인 EKS 실습 글(블로그)은 다른 환경이라 수치가 다르다. 섞어 보이지 않고 개인 글은 `personal`로 표시 |
| 합산 수치 | 성과를 합쳐 하나의 큰 숫자로 만들지 않는다(실제 절감과 회피 비용이 섞임) |

## 3. 콘텐츠 규칙 (Phase 1 종료 시점)

```yaml
title: "..."                 # 필수
description: "..."           # 필수, 글마다 고유
date: "2025-07-07"           # 필수, 작성자가 직접 적은 날짜만 사용
categories: [oss, infra]     # 필수, 1~2개: infra | backend | frontend | oss | note
tags: [kubernetes, eks]      # 필수, content/tags.yaml에 등록된 값만
series: eks-from-scratch     # 선택, content/series.yaml에 등록
seriesOrder: 3               # series가 있으면 필수
draft: false                 # 선택, true면 프로덕션에서 제외
relatedProject: ...          # 선택 (Phase 2에서 사용)
```

| 항목 | 결정과 이유 |
| --- | --- |
| categories | 최대 2개, **대표 없음**. 고정 순서로 정렬해 `infra, oss`처럼 표시. 필터는 모든 값으로 걸림. 대표 카테고리는 공간·위계 이유뿐이었는데 실측으로 공간 문제가 없었다(디자인 12번) |
| 0편 카테고리 | 필터 칩에서 숨김(현재 backend) |
| `updated` | 삭제. 수정일은 표시하지 않고 Git 날짜도 쓰지 않는다 |
| `thumbnail` | 삭제. 목록 썸네일은 이미지 톤·비율이 제각각이고 정리 비용을 들이지 않기로 해서 제거. 공유 이미지는 OG 자동 생성 |
| 시리즈 | `eks-from-scratch` 5편, `cilium-on-eks` 3편. 목록 라벨(`label`)은 8자 이하 |
| 기존 글 소급 | 콜아웃·셸 프롬프트·파일명 표기는 새 글과 고치는 글에만 적용 |
| MDX | 도입하지 않음. remark/rehype 플러그인으로 충분 |

## 4. 품질 기준 (Phase 2 이후에도 적용)

**측정:** Lighthouse CI, 모바일 프리셋, `throttlingMethod: "devtools"`(실제 Chrome에 느린 4G·CPU 4배 제한을 걸고 관측), 리눅스 CI, 3회 중앙값.

| 등급 | 성능 | LCP | CLS | TBT | 접근성 / SEO |
| --- | --- | --- | --- | --- | --- |
| 차단 (error) | ≥ 90 | ≤ 2.5s | ≤ 0.1 | ≤ 300ms | 100 / 100 |
| 목표 (warn) | ≥ 95 | ≤ 2.0s | ≤ 0.05 | ≤ 200ms | 모범사례 ≥ 95(`is-on-https` 제외) |

- 처음엔 Lighthouse 기본 **시뮬레이션**으로 정했다가 바꿨다(Q11 → Q12). 시뮬레이션은 웹 글꼴 크기를 LCP에 그대로 더하는 계산 모델이라 같은 사이트가 76~83점·LCP 3.8~4.5s, 실제 관측은 98점·1.9s였다. **측정 조건을 문구에 반드시 적는다**는 교훈.
- 차단선을 넘으면 숫자를 조용히 낮추지 않고 기획에 묻는다. 예외는 범위와 기한을 정해서만 둔다.
- **현재 예외:** About의 성능·CLS·TBT는 `warn`(Q13·Q15). Phase 2 PR-19(About 재작성)에서 해제해야 한다. CLS 0.125의 원인은 한글 소개 문단이 웹 글꼴 도착 뒤 줄 수가 바뀌는 것이고, 글꼴 서브셋·preload로는 안 풀렸다.

## 5. Phase 1 게이트 결과 (2026-11-01)

| 게이트 | 결과 |
| --- | --- |
| 성능 | 홈 97·LCP 1.7s, 글 97·1.8s 통과. About 92·1.8s, CLS 0.125만 예외 |
| 접근성·SEO | 세 페이지 100·100, 모범사례 96 |
| E2E | 95건 통과 |
| 모바일 첫 화면 | 14편 모두 첫 본문 블록이 640px 안(기준을 "첫 h2"에서 "첫 본문 블록"으로 바꿈, Q6) |
| 이미지 | 60개 WebP 변환, 26.5MB → 3.3MB, 최대 191KB. 배포물 48MB → 15MB |
| OG | 글 14 + 홈 + About = 16개 고유 PNG |
| 글꼴 | Pretendard 단일 서브셋(사이트가 쓰는 글자만) 자체 호스팅, `swap`, preload 없음 |

## 6. 바꾸거나 철회한 결정 (다시 같은 논의를 하지 않도록)

| 처음 결정 | 바뀐 결정 | 이유 |
| --- | --- | --- |
| 카테고리 `web` 통합(디자인 제안) | `backend`·`frontend` 유지 + `oss` 추가 | 작성자가 웹 영역에서 backend 강점을 구분하길 원함 |
| 카테고리 단일 `category` | 배열 최대 2개 | 오픈소스이면서 인프라인 글이 필터에서 빠짐 |
| 대표 카테고리(A안) | 대표 없음(B안) | 실측상 공간 문제 없음, 둘 다 필터 링크라 동등 표시가 규칙에 맞음 |
| OG 축소본을 목록 썸네일로 | 목록 썸네일 제거 | 128px로 줄이면 글자가 7px라 정보가 없음. 로고 썸네일은 톤 통일 비용 문제 |
| `updated` 수정일 표시 | 삭제 | 작성자가 적은 날짜 하나만 쓰기로 |
| 성능 LCP ≤ 2.0s(조건 없음) | 관측 기준 차단 2.5s / 목표 2.0s | 측정 방식에 따라 결과가 크게 달라짐 |
| 프로젝트 상세 페이지·`/projects` | 만들지 않음(Phase 2 C안) | About에 이미 같은 내용이 있음 |
| `resume.md`를 데이터 원본으로 | 현재 About이 원본 | `resume.md`는 임시 문서 |

## 7. 협업 방식 (cowork)

| 항목 | 방식 |
| --- | --- |
| 폴더 | `cowork/prd`(기획), `cowork/design`(디자인), `cowork/develop`(개발). 세션별 `STATUS.md`·`CONTEXT.md`로 시작·종료 기록 |
| 기획서 파일명 | `<번호>_<영역>_<주제>.md`. 영역: site / blog / portfolio / discovery / seo / platform / design |
| 질문 | 개발 ↔ 기획·디자인 질문은 `develop/REQUESTS.md`에 번호(Q1~)로. 답은 "답" 칸, 상세는 원문 문서 |
| 디자인 문서 | `design/NN-주제.md` 번호 순. 기획 답변도 같은 번호 체계 |
| 시안 표시 | 시안용 예시 값은 `.ph`(점선)로 구분, 실제 코드에는 0건(CI 검사) |
| 주의 | 커밋 전 `cowork/` 문서를 다른 세션이 예전 버전으로 덮어쓴 일이 있었다(10-30). 동기화 커밋은 최신본 기준으로 |

## 8. Phase 2로 넘어간 것

| 항목 | 위치 |
| --- | --- |
| About CLS·성능·TBT 예외 해제 | PRD-004 PR-19, 디자인 D-5 |
| 경력 데이터 분리, About 강화, 이력서 PDF, 홈 히어로·대표 프로젝트 | PRD-004 (approved) |
| Phase 3 기획 전 작성자에게 먼저 물을 것 | 커스텀 도메인 사용 여부, 영문 About 필요 여부 (`prd/README.md`) |
| 백로그 정리 대상 | PRD-001 8.2의 끝난 결정(초안 글 처리, Phase 순서), 백로그의 Mermaid·Git 수정일 항목 |

## 9. 원문

| 문서 | 내용 |
| --- | --- |
| `prd/001_site_master-plan.md` | 마스터 기획(v2.0부터 Phase 0~1 내용 제거, v1.9까지는 git 기록) |
| `prd/002_platform_phase0-stabilization.md` | Phase 0 원문. **2026-11-01 삭제**, git 기록에서 확인 |
| `prd/003_blog_reading-experience.md` | Phase 1 원문(9장 결과 포함). **2026-11-01 삭제**, git 기록에서 확인. 성능 측정 기준은 PRD-001 5.1로 이동 |
| `design/archive/` | 디자인 요약 2개와 12·19·21번 원문(나머지 번호는 `design/archive/README.md`에서 Git 복구) |
| `develop/REQUESTS.md` Q1~Q15 | 질문과 답 |
| `develop/briefs/Q11-performance-gate.md` | 성능 측정 방식 비교 |
| `develop/CONTEXT.md` 6.1 | Phase 1 게이트 측정 상세 |
