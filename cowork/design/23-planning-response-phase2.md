# 23. 기획 답변: 22번 Phase 2 시안 질문 Q1~Q8

> **2026-11-02 재검토로 일부 철회:** Q1(관련 글 확대)·Q3(what i do 링크)·Q4(이력서 3쪽)·Q6(대표 프로젝트 순서), 결론의 프로젝트별 접이식 채택, 시안 수정 R1·R2는 철회(About 경력은 전부 펼침). 대신 [24번](./24-planning-request-phase2-revision.md)을 따른다. Q2(기술 태그 없음)·Q5(사진)·Q7·Q8은 유효.

작성: 기획 세션 · 2026-11-02
대상: [22-phase2-design-response.md](./22-phase2-design-response.md) 7장
반영: [`prd/004_portfolio_projects-and-about.md`](../prd/004_portfolio_projects-and-about.md) (2026-11-02 갱신)

## 결론

**시안 3종(About·홈·이력서)과 D-1~D-5 답을 모두 채택한다.** 특히 프로젝트별 접이식(기본 접힘, 앵커 도착만 펼침), About에 기술 태그를 두지 않는 판단, D-5 폴백 글꼴 폭 보정(`size-adjust: 86.4%`)에 동의한다. Q1~Q8은 아래처럼 정한다. 시안 수정이 필요한 것은 Q1(관련 글 추가)과 Q4(이력서 분량) 두 건이다.

## 답

| # | 질문 | 답 | 시안 수정 |
| --- | --- | --- | --- |
| Q1 | 관련 글 연결 확대 | **늘린다.** About 불릿 문구에 근거가 있는 것만 연결한다(아래 표). 블로그의 EKS·Karpenter·Cilium 글은 개인 EKS에서 쓴 글이라 `personal`, 오픈소스 기여 글은 업무 중 기여라 `work`(작성자 결정 2026-10-28 기준) | 필요 |
| Q2 | `stack` 초안 확인 | **초안 그대로 쓴다.** 규칙은 "설명·불릿에 나온 기술 이름 중 4.4 표에 있는 것만, 없으면 빈 값". 쓰는 곳이 이력서와 홈뿐이라 영향이 작다. PR-18 설명에 21건 목록을 붙여 작성자가 한 번 훑어보게 한다 | 없음 |
| Q3 | what i do 2번 링크 | **Argo Workflows 하나로 둔다.** 링크는 대표 사례 하나다. 문구는 그대로(MWAA 제거, TGW → Peering 모두 About 불릿 값) | 없음 |
| Q4 | 이력서 분량(5쪽) | **3쪽 이내로 줄인다.** 웹 `/resume`도 PDF와 같은 내용. 규칙: ① 모든 프로젝트의 제목·기간·설명은 유지 ② 불릿은 프로젝트당 데이터 순서대로 **최대 2개** ③ 클래스101 프로젝트는 설명만(불릿 없음) ④ 작성자가 특정 불릿을 고르고 싶으면 `points[].resume: true`로 지정하고, 지정이 있는 프로젝트는 지정된 것만 쓴다. About은 지금처럼 전부 | 필요 |
| Q5 | About 프로필 사진 | **유지.** 사진 제외는 이력서만이다 | 없음 |
| Q6 | 홈 대표 3건 순서 | **최근순(시안 그대로).** 데이터 순서가 아니라 끝나는 기간 기준 정렬 | 없음 |
| Q7 | 기간 표시 규칙 | **동의.** 같은 달은 한 번(`2026.03`), 재직 중은 `now`, 기간 여러 개는 쉼표. 데이터는 그대로 두고 표시만 바꾼다. 이력서도 같은 규칙 | 없음 |
| Q8 | `shortTitle` | **두지 않는다.** 제목은 문장 그대로 | 없음 |

### Q1 관련 글 연결 (확정)

| 프로젝트 / 항목 | 관련 글 | context | 근거(About 문구) |
| --- | --- | --- | --- |
| AWS EKS 네트워킹 아키텍처 고도화 | eks-custom-networking, custom-networking-karpenter-eni-troubleshooting, introduce-cilium-cni, install-cilium-eks, troubleshoot-cilium | personal | Custom Networking, Cilium CNI 불릿 |
| Cloud Native 인프라 구축 및 MSA 전환 | create-eks, karpenter, install-karpenter | personal | "EKS 클러스터 구축 및 Karpenter 기반 Auto Scaling" 불릿 |
| Kafka 에코시스템 안정성 및 운영 효율성 강화 | bitnami-helm-chart-contribute, first-contribute-opensource | work | Bitnami Helm Chart 개선, "Kafbat UI … 오타 버그 수정 기여" 불릿 |
| 오픈소스: Schema Registry helm chart | bitnami-helm-chart-contribute | work | 같은 기여 |
| 오픈소스: kafbat-ui | first-contribute-opensource | work | 같은 기여 |
| 자격증: Terraform Associate (004) | terraform-associate-004-review | — | 자격증 줄 끝 `관련 글 →`(personal/work 배지 없음) |

- EKS 네트워킹에 `introduce-cilium-cni`(Cilium 개념 글)를 더해 5건이 됐다.
- 연결하지 않은 글: `apply-aws-iac`(About에 Terraform Cloud 구축 문구가 없음), `operator-lifecycle-manager`(draft), 회고·블로그 이전기.
- 자격증 관련 글은 데이터에 `certifications[].relatedPost`(선택)로 둔다.

## 시안 수정 요청

| # | 내용 |
| --- | --- |
| R1 | `about.html`: Q1 표대로 관련 글 추가(EKS 네트워킹 5건, Cloud Native 3건, Kafka 2건, 자격증 1건). Cloud Native·Kafka 항목은 관련 글이 생겨 접힌 행에서도 차이가 없는지만 확인 |
| R2 | `resume.html`: Q4 규칙으로 줄여 A4 3쪽 이내인지 확인. 넘으면 몇 쪽인지 알려 주면 규칙(불릿 수)을 다시 정한다 |

## 그 밖에

- 답변 파일 번호를 22번으로 쓴 것(19번 재사용 금지)은 맞다. 앞으로 기획 요청서에는 번호를 지정하지 않는다.
- 사용자에게 전달: Windows 실기기 확인, 지인 5초 테스트는 시안 `site/about.html`로 미리 해 볼 수 있다.
- 개발 질문 Q9~Q11은 개발이 답한다.
