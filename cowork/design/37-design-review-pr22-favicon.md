# 37. 디자인 답변: 36번 수정 반영 · PR-22 `resume.pdf` · 파비콘 검토 (개발 Q22·Q23)

작성: 디자인 세션 · 2026-11-07
답변 대상: 개발 [`REQUESTS.md`](../develop/REQUESTS.md) Q22(PR #67: 36번 수정 반영), Q23(PR #68: 파비콘). 함께 PR-22(#66, `resume.pdf`)를 검토했다.
기준: `main`(`e5b46d4`)을 `yarn build` + `yarn build:resume`한 `out/`, 측정 `tools/review-impl.mjs`(Playwright Chromium) + 실제 Chrome(창 1488px)
배포 사이트: `https://comstering.github.io/`

## 1. 결론

**수정 요청 4건이 모두 반영됐고, 새로 발견한 문제는 없다. 파비콘과 `resume.pdf`도 합격이다.**

| 항목 | 결과 |
|---|---|
| 36번 3.1 About 직함 360px | ✅ 360·412px 1줄, 340px 이하 2줄(구분점 숨김). 가로 넘침 0 |
| 36번 3.2 인쇄 6쪽(PR-22) | ✅ **5쪽·543KB**, 의도 값 적용(Chrome PDF 뷰어로 쪽 경계 확인) |
| 36번 3.3 홈 +49px | ✅ 449px(1280×720) / 453px(360×640). 36번에서 제안한 값과 정확히 같다 |
| 36번 3.4 About 상단 경로 | ✅ `~/about`, `aria-current="page"`, 인쇄에서 숨김(PDF에 없음) |
| 선택: 모바일 팔레트 닫기 | ✅ 640px 미만에서 보이는 글자 `닫기`(접근 가능한 이름 `esc 닫기`는 보이는 글자를 포함) |
| PR-22 `resume.pdf` | ✅ A4 5쪽, 543KB(≤ 1MB), 글자 407종 검색 가능, 라이트 배경, 프로젝트가 쪽 경계에서 갈라지지 않음 |
| 파비콘 #68 | ✅ 링크 3종·파일 일치·16/32px 모양 확인. 배포 사이트에도 반영됨 |

## 2. 36번 수정 반영 (Q22) 측정

| 항목 | 36번 이전 | 지금 | 비고 |
|---|---|---|---|
| 홈 첫 글 제목 하단 1280×720 / 360×640 | 505 / 485px | **449 / 453px** | 시안 458 / 437px, ±16px 이내, 화면 안. 히어로 위 여백 0px |
| About 직함 줄 수 412 / 360 / 340 / 320px | 2 / 3 / 3 / 3줄 | **1 / 1 / 2 / 2줄** | 340px 이하는 직함·경력이 줄로 나뉘고 구분점 `·`은 숨겨짐(`display: none`) |
| About 첫 화면 버튼 하단 360 / 1280 | 359 / 269px | 409 / 313px | 경로 한 줄이 생겨 늘었다. 시안(346 / 301px)보다 +63 / +12px, 소개 하단 500 / 426px로 모두 첫 화면(640 / 720px) 안 |
| About `/posts/` 링크 | 0 | 0 | |
| 팔레트 닫기(360px) | `esc 닫기` 32×20(터치 46×42) | 보이는 글자 `닫기`, 31×20 | 접근 가능한 이름 `esc 닫기` |

- **360px 버튼 하단 409px(시안 346px):** 시안에는 경로가 없는 상태의 숫자였고, 36번 3.1 A안(직함 전폭) + 3.4(경로)가 합쳐 생긴 차이다. 두 수정을 모두 요청한 결과라 문제가 아니다. 첫 화면에 이름·직함·연차·버튼이 모두 보인다.
- 경로를 감싼 `<div class="no-print">`로 인쇄에서 숨겨진다. 인쇄 미디어로 경로 요소의 `display`만 재면 `flex`가 나오지만 숨겨진 부모 안이라 측정상 착시이고, 실제 PDF에는 없다(Chrome PDF 뷰어로 1쪽 확인).

## 3. PR-22 `resume.pdf` 검토

`yarn build:resume`: **5쪽, 543KB, 글자 407종 검색 가능**(생성 스크립트의 자체 검사). 36번 3.2에서 `@media print` 블록을 맨 뒤에 붙여 시험했을 때와 같은 수치(5쪽·543KB)다.

**실제 Chrome PDF 뷰어(1/5쪽~5/5쪽)로 확인한 것**
- 1쪽: 흰 배경, 이름 · 직함 `DevOps · Cloud Native Engineer · 경력 4년+` · 인쇄 전용 연락처 한 줄 · 한 줄 소개, **상단 경로·사진·버튼 없음**.
- 2·3쪽: 각 쪽이 새 프로젝트로 시작하고, 쪽 끝에서 프로젝트가 갈라지지 않는다(1쪽 아래에 짧은 여백). 3쪽에 `CLASS 101` · `Software Engineer`.
- 4쪽: skills 7그룹(`observability`에 `OpenTelemetry`·`Prometheus`), 오픈소스·`github (https://github.com/lomeone)`, 자격증 `verify (https://www.credly.com/…)`처럼 **링크 URL이 글자로 표시**됨.
- 5쪽: 학력·`BoB 10기`·활동.

**관찰(요청 아님):** 자격증 섹션이 4/5쪽 경계에서 나뉜다. 제목 + 두 항목은 4쪽, 세 번째(`정보보안산업기사`)는 5쪽 맨 위다. 행(항목) 단위로는 갈라지지 않아 규칙(`break-inside: avoid`)대로이고, 섹션 전체를 붙이면 4쪽 아래 여백이 커지는 대신 5쪽에서 시작해야 한다. **지금은 그대로 두는 것을 권한다**(분량 5쪽 유지).

## 4. 파비콘 #68 (Q23)

| 확인 | 결과 |
|---|---|
| `out/` HTML 링크 3종 | `rel="icon"` `/favicon.ico`(48x48), `rel="icon"` `/icon.svg`(any), `rel="apple-touch-icon"` `/apple-icon.png`(180x180) |
| 파일 | Chrome에서 3종 모두 200. 바이트 크기가 디자인 파일과 같다(`favicon.ico` 3,577 / `icon.svg` 368 / `apple-icon.png` 3,591). `apple-icon.png`는 180×180으로 디코딩됨 |
| 모양(실제 Chrome, 라이트·다크 탭 배경 위) | SVG·ICO를 16px·32px로 그려 보았다. `c_`가 모두 또렷하다. `apple-icon`은 둥근 모서리 없이 꽉 찬 정사각형(60px에 마스크를 씌워도 자연스러움) |
| 배포 사이트 | `curl`로 `comstering.github.io`의 링크 3종과 `icon.svg`·`resume.pdf`(200, `application/pdf`)가 이미 반영됨 |

**RGB PNG(알파 없음):** `apple-icon.png`가 알파 없는 RGB인 것은 의도다(iOS 홈 화면 아이콘은 투명 영역이 검게 칠해지므로 불투명이 맞다).

**한계:** Chrome **탭 줄 자체**는 도구가 브라우저 UI를 캡처하지 못하고 `chrome://favicon2`도 막혀 직접 보지 못했다. 대신 같은 파일을 탭 모양 배경 위에 16·32px로 그려 확인했다. 작성자가 탭을 한 번 보시고, 이전 아이콘이 남아 있으면 강력 새로고침(`⌘⇧R`)이나 시크릿 창으로 본다(브라우저 파비콘 캐시).

## 5. 확인하지 못한 것

- 실제 탭 줄에 뜨는 파비콘(위), Safari·Firefox·Windows 작업 표시줄·iOS 홈 화면 추가 모양.
- 실제 Chrome에서 정확한 360px(창 최소폭 406px): 좁은 폭 수치는 Playwright Chromium. Chrome은 1488px 창에서 PDF 뷰어와 파비콘 렌더를 확인했다.
- 인쇄 시 ⌘P 미리보기는 작성자 확인 몫(PDF는 확인함).
- 인기글(popular) 블록은 데이터가 없어 빈 상태만 확인했다(PR-23).

## 6. 다음

| 항목 | 상태 |
|---|---|
| 개발 Q22·Q23 | 이 문서로 답했다(`REQUESTS.md`에 번호 링크는 개발 몫) |
| PR-23 인기글, PR-24 SEO, PR-25 게이트·E2E·문서 | 개발 대기. 올라오면 같은 방법으로 검토 |
| 기획 | PRD-004 4.4 skills 표(`OpenTelemetry`·`Prometheus`), 5.2·5.6 문구 `기록합니다` 반영 여부 확인 필요(디자인은 PRD를 고치지 않는다) |

## 7. 재현

```bash
yarn build && yarn build:resume && python3 -m http.server 4176 --directory out &   # 저장소 루트
node cowork/design/tools/review-impl.mjs <스크린샷 폴더>                           # 홈·사이드바·팔레트·About·인쇄
# resume.pdf는 Chrome에서 http://localhost:4176/resume.pdf 로 열어 쪽 경계를 본다
```
