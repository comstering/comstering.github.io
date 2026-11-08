---
paths:
  - "package.json"
  - "yarn.lock"
  - "next.config.*"
  - "eslint.config.mjs"
  - "tsconfig.json"
  - "scripts/**"
  - "src/**"
  - ".github/workflows/**"
---

# Next 16·정적 export·의존성 함정

## 정적 export

- 서버 기능·런타임 searchParams 없음. `useSearchParams`는 `<Suspense>` 안에서만 쓴다.
- `generateStaticParams`에 없는 경로는 404. `dynamicParams = false`.
- 홈 필터는 `PostsBlock.tsx`. Suspense 폴백이 전체 목록이라 정적 HTML에 모든 글이 들어간다.

## Next 16 (2026-11-01 이후)

- `next lint`가 없다. `yarn lint`는 `eslint .`이고 설정은 `eslint.config.mjs`(flat, `eslint-config-next/core-web-vitals`·`typescript`). 린트 제외는 그 파일의 `ignores`에 쓴다.
- 빌드는 Turbopack이 기본이라 `src/app/favicon.ico`처럼 앱 폴더의 이미지는 **RGBA PNG**여야 한다(팔레트 PNG는 "The PNG is not in RGBA format"으로 실패).
- `useEffect` 안에서 바로 `setState`하면 `react-hooks/set-state-in-effect`로 린트가 실패한다(mounted 플래그는 `useSyncExternalStore`).
- `tsconfig.json`은 Next가 `yarn build` 때 자동으로 고친다.

## 의존성

- **`sharp`는 0.33.5로 고정한다(`--exact`).** Next.js가 자체로 `sharp@^0.33.5`를 선택 의존성으로 가져와서, 새 버전(0.35.x)을 같이 설치하면 libvips 버전 두 개가 한 `node_modules/@img` 아래 섞여 **리눅스 CI에서만** `libvips-cpp.so: cannot open shared object file`로 빌드가 실패한다(맥에서는 통과해서 PR #38 첫 CI가 실패함). 올리려면 Next가 쓰는 버전과 함께 올리고 리눅스 CI로 확인한다.
- **react-icons 5.7**에서 `SiAmazon`·`SiLinkedin` 같은 브랜드 아이콘이 `react-icons/si`에서 제거됐다. 쓰기 전에 `grep -o "SiXxx" node_modules/react-icons/si/index.d.ts`로 있는지 본다(대체: `react-icons/fa`의 `FaAws`·`FaLinkedin`).
- 새 의존성·skill·전역 도구는 설치 전에 사용자에게 확인받는다(skill은 `SKILLS.md`에 검토 결과를 적는다).

## 인기글

- `scripts/fetch-popular.mjs`는 배포 워크플로에서만 돈다(PR CI·로컬은 토큰이 없어 `.cache/popular.json`이 비어 홈 popular 블록이 숨겨진다).
- 로컬에서 보려면 `.cache/popular.json`에 `{ "items": [{ "id": "<글 id>", "views": 10 }] }`를 직접 만들고 `yarn build`(`.cache/`는 gitignore).
- GitHub는 저장소 활동이 60일 없으면 `schedule`을 끈다. 그때는 Actions 탭에서 Deploy를 수동 실행한다.
