---
title: "Terraform Associate 004 자격증 취득 후기"
description: "Terraform을 사용하고 있으니 terraform 지식 점검을 진행해보자."
date: "2026-04-27"
categories: [infra]
tags: [infra, terraform, IaC, associate, certification]
thumbnail: "hashicorp-certified-terraform-associate-004.png"
---

## Terraform 사용 기간

지금 회사에서 들어오고 나서 직무전환 후인 2024년 10월부터 terraform을 사용하고 있으니 약 1년 8개월 정도 되었다.

이제 우리팀이 관리하는 거의 모든 인프라에서는 terraform을 사용하고 있다. AWS뿐 아니라 Database, Cloudflare, Okta, Keycloak, Github까지 terraform provider가 존재한다면 거의 모든 작업을 IaC Code로 관리하고 Github로 Version Control을 하고 있다.

그동안 개인 프로젝트에서도 terraform으로 provisioning을 진행했고 이제는 terraform 명령어부터 문법까지 충분히 이해하고 사용하고 있다고 생각한다.

## Terraform Associate 취득 결심

Terraform Associate 시험은 계속 고민하고 있었다. terraform을 사용하고 있고 이걸 잘 사용하는지, 전문성이 있는지를 바로 눈으로 보여줄 수 있는 게 Terraform Associate였기 때문에 언젠간 자격증을 취득해야겠다고 생각했다.

하지만 한 번의 시험비용이 $70.50USD라는 금액은 선뜻 지불하기 부담스러운 금액이었다.

### 운 좋은 기회

이번에 회사에서 Terraform Skill Challenge라는 프로그램으로 Hashicorp 자격시험 프로그램을 진행해주었다.

한 달간의 자체 스터디 + 1주마다 한 번씩 Hashicorp 솔루션 엔지니어와의 Q&A 세션을 진행하고 Terraform Associate 시험비용을 지원해주는 프로그램이었다.

나는 이미 terraform을 계속 써왔기 때문에 자체 스터디 기간과 Q&A 세션을 활용하지는 않았고 시험 등록 기간 막바지에 맞춰 바우처를 통해 무료로 시험 등록을 진행했다. ($70.50USD를 아껴주셔서 정말 감사합니다.)

## 시험 진행

### 시험 스케줄 잡기

먼저 [Hashicorp Developer Certification](https://developer.hashicorp.com/certifications/infrastructure-automation) 페이지에서 Terraform Associate (004) 시험에 `Register for the exam`을 한다.

![hashicorp-certificate-page](/images/posts/contents/terraform-associate-004-review/hashicorp-certificate-page.png)

그다음 SCHEDULE/TAKE EXAM에 접속해서 시험 스케줄을 잡는다.

![exam-schedule-page](/images/posts/contents/terraform-associate-004-review/exam-schedule-page.png)

`GO TO CERTIVERSE EXAM PLATFORM`을 하면 CERTIVERSE 페이지로 넘어가게 된다. 여기서 응시할 시험을 고르고 Get Started를 클릭하면 시험 스케줄을 잡을 수 있다.

![get-started](/images/posts/contents/terraform-associate-004-review/get-started.png)

시스템 체크를 진행하여 현재 기기가 시험을 치를 수 있는 기기인지 확인하고

![verify-system](/images/posts/contents/terraform-associate-004-review/verify-system.png)

시험 일정을 선택한다. 시험 일정은 현재 당일 기준 이틀 뒤부터 진행 가능하다.

![exam-schedule-1](/images/posts/contents/terraform-associate-004-review/exam-schedule-1.png)

![exam-schedule-2](/images/posts/contents/terraform-associate-004-review/exam-schedule-2.png)

### 시험 당일 준비물

1. 개인 노트북: 시험은 원격으로 진행되기 때문에 반드시 개인 노트북이 필요하다.
2. 여권: 영어로 증명 가능한 신분증이 필요하다. 시험 당일 여권을 깜빡해서 급하게 시험 일정을 바꿨다..ㅠㅠ
3. 독립된 공간: 주변에 사람이 지나다닐 수 있는 오픈된 공간이 아닌 혼자만의 독립된 공간이 필요하다. 나는 회사 내 폰부스가 있어서 거기서 시험을 진행했다.

### 시험 난이도

모든 시험은 영어로 진행된다. 문제부터 답안지까지 모두 영어다. 나는 영어를 잘하는 편이 아니었기 때문에 언어가 영어라는 부분이 나의 시험 난이도를 매우 높였다.

시험 문제는 주관식 없이 객관식으로만 진행된다.

- 단일 답안 선택
- 다중 답안 선택
- True/False

문제 형식보다 더 중요한 건 내용인데, 실제 난이도는 생각보다 크게 어렵지 않았다. 1년이 넘는 기간 동안 terraform을 사용하고 있었어서 그런지 모르겠지만 심층적인 지식을 요구하는 수준의 문제들은 아니었다.

대부분 terraform cli에서 어떤 command를 입력해야 하는지, terraform code에서 resource/data 등의 선언 및 문법 사용 방식, root module/child module에서 output을 통해 각 resource 결과를 어떻게 가져오는지, terraform 명령어가 실행될 때 어떤 동작들이 이뤄지고 terraform state file은 어떻게 관리되는지 등에 대한 내용이었다.

## 시험 결과 및 후기

많은 시간을 공부에 투자하지 않았고 Gemini한테 예상 문제 50개만 뽑아달라고 해서 그 문제들만 한 번 쭉 읽고 시험을 진행했다.

결과는...!

![exam-pass](/images/posts/contents/terraform-associate-004-review/exam-pass.png)

당연한 결과인지는 모르겠지만, 합격이었다!

1년이 넘는 시간 동안 terraform을 썼는데 불합격했으면 자존심에 꽤 상처가 날 것 같아서 조마조마했는데 다행히(?) 합격했다.

terraform도 성공했고, 다음 목표는 Kubernetes Certification이다. 꾸준히 IaC와 컨테이너 오케스트레이션 양쪽의 전문성을 쌓아가고 싶다.
