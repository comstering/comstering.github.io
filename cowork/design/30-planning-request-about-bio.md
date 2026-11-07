# 30. 기획 요청: About 소개 현재 회사 제거, 클래스101 직함 변경 (D-15)

작성: 기획 세션 · 2026-11-05
기준: [`prd/004_portfolio_projects-and-about.md`](../prd/004_portfolio_projects-and-about.md) 4.3·5.1·5.6, [`prd/001_site_master-plan.md`](../prd/001_site_master-plan.md) 1.0
대상 시안: `site/about.html`(화면과 인쇄본 = `resume.pdf` 모두)

## 배경

작성자가 About 인쇄 미리보기로 A4 5쪽을 확인했다(25번 요청 종결). 화면과 인쇄본에서 두 가지를 바꾼다.

## 요청

| # | 우선 | 내용 |
| --- | --- | --- |
| D-15 ① | 필수 | **소개(첫 화면)에서 현재 회사 제거:** 이름 아래 `intro__facts`의 `CJ Olive Young`을 뺀다. 첫 화면은 사진 · 이름(한·영) · 직함 · 경력 N년+ · 버튼(인쇄본은 연락처 한 줄)만. 회사는 experience 섹션에서만 보인다. 빈 줄·간격이 남지 않게 정리 |
| D-15 ② | 필수 | **클래스101 직함:** `Web Developer (backend 중심)` → **`Software Engineer`**. experience의 회사 직함 줄(화면·인쇄본) |

## 확인해 줄 것

- 생성기 `tools/build-phase2-mockups.py`는 직함을 `src/app/about/page.tsx`에서 읽는다. 개발 PR-18 전까지는 생성기에서 클래스101 직함을 덮어써 반영한다(`src/`는 고치지 않는다).
- 360×640 첫 화면 요소 위치(25번 2.1: 버튼 369px, 한 줄 소개 460px)가 회사 줄이 빠진 만큼 올라오는지, 인쇄본 쪽수(5쪽)가 그대로인지.
- 개발에 넘기는 값: PRD-004 PR-18 문구 변경 3건(기술 스택 7그룹, 클래스101 직함, 현재 회사 표시 제거), JSON-LD `worksFor` 제외(5.6).

답변은 31번 이후 번호로 남겨 주세요.
