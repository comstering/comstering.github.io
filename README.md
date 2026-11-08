# comstering.github.io

DevOps · Cloud Native Engineer **Comstering**의 개발 블로그와 프로필 사이트입니다.
Kubernetes, AWS, 오픈소스 기여, 일하는 방식을 기록합니다.

- 사이트: https://comstering.github.io
- 스택: Next.js 16 (App Router, 정적 export) · React 19 · TypeScript · Tailwind CSS v4 · Markdown 블로그

## 개발

```bash
yarn install
yarn dev       # http://localhost:3000 (Turbopack)
yarn lint      # ESLint
yarn build     # 정적 사이트를 out/ 에 생성
```

## 배포

GitHub Actions(`.github/workflows/deploy.yaml`)가 `yarn build` 결과(`out/`)를 GitHub Pages에 배포합니다. 수동 배포 스크립트나 별도 배포 브랜치는 쓰지 않습니다.

## 구조

```
posts/        블로그 글 (Markdown + frontmatter)
public/       정적 파일 (이미지, ads.txt 등)
src/app/      페이지 (홈, 글 상세, About, 404, sitemap, robots)
src/components/  UI 컴포넌트 (ui/ 는 공통 컴포넌트)
src/lib/      글 파싱 등 유틸리티
content/      About·홈 데이터와 태그·시리즈(YAML, 빌드 때 검증)
cowork/       기획서(prd), 디자인 시안/명세(design), 개발 진행 기록(develop)
.claude/rules 에이전트가 매번 지키는 규칙과 함정
DESIGN.md     디자인 시스템 (UI 작업 전에 확인)
```

## 글 작성 가이드

글은 `posts/<slug>.md`에 둡니다. **파일명이 URL(`/posts/<slug>`)이므로 한 번 발행한 뒤에는 바꾸지 않습니다.**

```yaml
---
title: "글 제목"
description: "이 글만의 한두 문장 요약 (80~160자 권장, 글마다 달라야 함)"
date: "2026-10-27"        # 따옴표 필수, YYYY-MM-DD
categories: [infra]       # 1~2개. infra | backend | frontend | oss | note
tags: [kubernetes, eks]   # content/tags.yaml에 등록된 정규 태그만
series: eks-from-scratch  # 선택. content/series.yaml에 등록된 slug
seriesOrder: 1            # series를 쓰면 필수. 1부터 빠짐없이
draft: true               # 선택. 기본 false
---
```

- **날짜**: 작성한 `date` 하나만 씁니다. 수정일(`updated`)은 없고, 쓰면 빌드가 실패합니다.
- **카테고리**: `infra`(클라우드·쿠버네티스·IaC), `backend`, `frontend`, `oss`(오픈소스 기여), `note`(회고·메모). 1~2개를 고르고(중복 금지) 표시 순서는 항상 `infra · backend · frontend · oss · note` 고정이라 작성 순서는 상관없습니다. 홈 필터는 두 값 모두로 걸립니다(`[infra, oss]` 글은 `infra`와 `oss` 필터 둘 다에 나옵니다). 글이 0편인 카테고리는 홈 필터에서 숨겨집니다.
- **태그**: `content/tags.yaml`에 정규 태그(소문자 kebab-case)를 추가한 뒤 글에서 씁니다. 별칭(`k8s` 등)을 쓰면 빌드가 정규 태그를 안내하며 실패합니다. 카테고리 이름은 태그로 쓰지 않습니다.
- **시리즈**: `content/series.yaml`에 `slug`, `label`, `title`을 등록합니다. 글 목록 메타에는 `label`(8자 이하), 시리즈 박스에는 `slug`를 씁니다.
- **OG 이미지**: 글마다 빌드 때 자동 생성됩니다(`/posts/<slug>/og.png`, 제목·카테고리·날짜·시리즈). 직접 만들 필요가 없고 `thumbnail` 필드는 없습니다.
- **이미지**: 본문 이미지는 `public/images/posts/contents/<slug>/`에 두고 `/images/posts/contents/<slug>/파일명`으로 참조합니다.
- **초안**: `draft: true`인 글은 `yarn dev`에서만 보이고(`draft` 표시), 프로덕션 빌드의 목록·상세·sitemap·RSS에서는 제외됩니다.
- **검증**: `yarn build`(및 `yarn dev`)가 frontmatter를 검사합니다. 필수 필드 누락, 잘못된 카테고리, 미등록 태그, 중복 description, 미등록 시리즈, 어긋난 `seriesOrder`가 있으면 파일명과 이유를 모아 보여 주고 실패합니다.

### 본문 문법

- **코드 블록**: 펜스 뒤에 파일명과 강조 줄을 적습니다. 언어 라벨과 복사 버튼은 자동으로 붙습니다(`$ ` 셸 프롬프트는 복사에서 빠집니다).

  ````md
  ```yaml title="values.yaml" {3,5-6}
  replicas: 2
  ```
  ````
- **콜아웃**: GitHub 문법을 씁니다. `> [!NOTE]`(안내), `> [!WARNING]`(주의). 마커 다음 줄부터 본문입니다.

  ```md
  > [!WARNING]
  > 이 설정은 노드를 재시작합니다.
  ```
- **표**: 그대로 GFM 표를 쓰면 됩니다. 폭이 넘치면 가로 스크롤되고 가장자리가 흐려집니다.
- **이미지**: `![alt](/images/posts/contents/<slug>/파일.png "캡션")`. alt는 필수에 가깝습니다(비면 빌드 경고). title을 쓰면 캡션이 됩니다. 원본은 PNG/JPG로 두면 빌드가 WebP로 변환하고(최대 폭 1440px, 200KB 이하), 화면보다 큰 이미지는 눌러서 확대됩니다.
- **목차**: 본문 `h2`가 3개 이상이면 자동으로 만들어집니다(`h3`까지).
- **관련 글**: 태그가 겹치는 글(최대 3편)이 자동으로 붙습니다. 시리즈·이전/다음 글은 제외됩니다.

### 시리즈 만들기

1. `content/series.yaml`에 slug를 등록합니다. `label`은 목록 메타용 짧은 이름(8자 이하, 예: `series eks 3/5`), `title`은 시리즈 박스 제목입니다.
2. 시리즈에 들어갈 글마다 frontmatter에 `series: <slug>`와 `seriesOrder`(1부터 빠짐없이)를 적습니다.
3. 빌드가 미등록 slug와 빠진·중복된 순서를 잡아 줍니다.

### 자동으로 만들어지는 것

- **OG 이미지**: 글마다 빌드 때 `/posts/<slug>/og.png`(1200×630)가 만들어지고 `og:image`로 쓰입니다. 제목·카테고리·날짜·시리즈가 들어가니 따로 만들 필요가 없습니다.
- **읽기 진행률**: 글 상세 헤더 아래의 얇은 바(CSS만 사용, 지원하지 않는 브라우저에서는 숨김).
- **링크 검사**: `Links` 워크플로가 매주 월요일에 모든 글의 외부 링크를 검사하고, 깨진 링크가 있으면 이슈를 만듭니다(PR에서는 바뀐 글만, 실패시키지 않음). 예외는 `lychee.toml`.

## 경력 수정 방법

About과 `resume.pdf`는 같은 데이터에서 나옵니다. 코드(`src/`)에 경력 문구를 쓰지 않고 아래 파일만 고칩니다.

| 파일 | 내용 |
| --- | --- |
| `content/profile.yaml` | 이름·직함·연락처·소개·기술 스택(7그룹)·학력·자격증 |
| `content/experience.yaml` | 회사별 프로젝트(`companies`), 오픈소스(`openSource`), 사이드 프로젝트(`sideProjects`) |
| `content/site.yaml` | 사이트 이름, 홈 히어로 문구 |

1. 파일을 고칩니다. 프로젝트는 `id`(영문 kebab-case, 파일 전체에서 유일), `title`, `description`, `points`(성과 한 줄씩)를 갖고, 기간 `period`는 선택입니다.
2. 기간은 `YYYY-MM` 문자열입니다. 한 달이면 `start`와 `end`를 같게, 진행 중이면 `end`를 생략하고(화면에는 `now`), 중단 후 재개는 기간을 여러 개로 씁니다. 프로젝트 기간은 회사 기간 안이어야 합니다.
3. 고친 뒤 확인합니다. 형식이 틀리면 빌드가 실패하고 어느 파일의 어느 항목인지 알려 줍니다.

```bash
yarn check:content   # src/에 프로젝트 제목이 하드코딩됐는지 검사
yarn build           # content/*.yaml 검증 포함
yarn build:resume    # out/resume.pdf 생성 (5쪽 이하·1MB 이하·글자 검색 가능을 검사, Playwright 브라우저 필요)
```

4. About 데이터를 고쳤으면 `src/lib/site.ts`의 `ABOUT_LAST_MODIFIED`(sitemap의 수정일)도 오늘 날짜로 바꿉니다.
5. `resume.pdf`는 저장소에 두지 않고 CI와 배포 때 새로 만듭니다. 경력을 고치면 PDF도 자동으로 따라 바뀝니다.

지워진 필드(`featured`, `metric`, `stack`, `relatedPosts`, `capabilities`, `resume`)를 쓰면 이유와 함께 빌드가 실패합니다. About과 글은 서로 링크하지 않습니다.

## 인기글 (GoatCounter 토큰)

홈 사이드바의 인기글은 GoatCounter 통계에서 최근 30일 조회수 상위 5편입니다. `Deploy` 워크플로가 매일 03:00 KST와 `main` push 때 `scripts/fetch-popular.mjs`로 받아 다시 빌드합니다.

1. GoatCounter 사이트 설정의 API 토큰 화면에서 토큰을 만듭니다. 권한은 **`Read statistics`만** 줍니다.
2. 저장소 Settings → Secrets and variables → Actions에 `GOATCOUNTER_TOKEN`으로 등록합니다.
3. 배포 로그의 `인기글:` 줄을 봅니다. 성공이면 `인기글: 최근 30일 N편 (…)`, 실패면 `통계를 받지 못했습니다 (원인)`입니다. 403이면 토큰 권한 문제입니다.

- 토큰이 없거나 API가 실패해도 **빌드는 성공**합니다. 직전 결과(Actions 캐시)를 쓰고, 그것도 없으면 인기글 블록이 숨겨집니다.
- 저장소 활동이 60일 없으면 GitHub이 `schedule`을 끕니다. 그때는 Actions 탭에서 `Deploy`를 수동 실행합니다.
- 로컬에서 보려면 `.cache/popular.json`에 `{ "items": [{ "id": "<글 id>", "views": 10 }] }`를 직접 만들고 `yarn build`합니다(`.cache/`는 커밋되지 않습니다).

## 문서

- 디자인 시스템: [DESIGN.md](./DESIGN.md)
- 사용하는 Claude Code skill: [SKILLS.md](./SKILLS.md)
- 기획서: [cowork/prd](./cowork/prd)

