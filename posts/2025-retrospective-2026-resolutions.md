---
title: "2025 Retrospective & 2026 Resolutions"
description: "지난 한 해의 성장을 되짚어보고, 더 나은 개발자와 블로그를 향한 2026년의 이정표를 세우자"
date: "2026-01-06"
categories: [note]
tags: [retrospective, resolution, new year]
thumbnail: "2025-retrospective-2026-resolutions.png"
---

오랜만에 글을 쓴다.

자주 쓰려고 했는데 회사일이 바쁘단 핑계로 계속 미루고 미뤄 작성을 안하고 있었다. 그래서 새해도 되었으니 작년 회고를 하는 것과 함께 이 포스팅을 시작으로 새로운 마음으로 다시 시작해보려고 해본다.

## Looking Back at 2025

### Cloud Infra Engineer & Devops 직무 전환

2024년도 하반기부터 시작된 나의 큰 변화이다. 원래는 Back-End Engineer였지만 24년 하반기 이직을 하면서 직무를 전환하게 되었다.

Legacy System을 신규 Cloud Native Architecture로 전환하는 프로젝트에 참여하게 되었고 더불어 Kafka를 이용한 Event Driven Architecture를 구현하는 것까지 주도적으로 참여하였다.

Back-End Engineer를 할 때부터 Kubernetes에 대해 계속 공부하고 AWS Cloud Infra에 관심이 많았기에 너무 좋은 기회라고 생각하여 참여하였고 높은 만족도를 가지고 회사 생활을 하고 있다.

### 개발 블로그 배포

긴 시간동안 계속 목표를 했던 나만의 사이트를 배포했다.

기본은 나의 개발자로써의 기록을 써내려 가려고 했기 때문에 개발 블로그 사이트를 만들고자 했었고 아직 부족하지만 드디어 배포를 했다.

Front-End 개발자가 아니다 보니 어떻게 개발해야 할지를 계속 고민했었는데 AI가 나왔고 AI를 사용한 vibe coding을 통해 개발을 진행했다.

만약 AI가 없었다면 아직까지 개발블로그를 배포할 수 있었을지 잘 모르겠다.

### 첫 오픈소스 기여

#### Kafbat UI 오타 수정

시작은 kafka system을 구축하면서 시작되었다. Kafka System을 구축하면서 Kafka UI Management 도구가 필요했고 [Kafbat UI](https://ui.docs.kafbat.io/)를 도입했다. 사용을 하다가 UI에 너무 보기 싫은 오타를 발견하고 처음으로 Contribution이란 것을 찾아보고 해보게 되었다.

#### Bitnami schema registry helm chart 수정

이것도 Kafka System을 구축할 때 발견한 오류를 수정하면서 기여하였다.

Cloud로 AWS를 사용하고 있었고 그래서 Kafka를 AWS Managed인 AWS MSK로 구축해놓은 상태였다.

MSK는 다른 Kafka의 SSL 통신방식과 방식이 다르다. 보통 SSL/TLS라고 하면 mTLS방식을 통해 상호인증을 기반으로 통신 인증을 처리한다. 이 과정에서 대표적으로 JKS라는 파일을 필요로한다. 하지만 MSK는 SASL_SSL 인증방식을 사용할 때 mTLS 방식을 사용하지 않기 때문에 JKS 파일이 필요가 없다.

Bitnami의 Schema Registry helm chart에서 SASL_SSL를 통한 kafka 인증방식을 사용할 때 mTLS를 전제로 chart가 구성되어 있었고 SSL 통신방식에서는 JKS와 같은 인증파일을 필수로 주입받고 있었다.

그래서 schema registry가 SASL_SSL 인증방식을 사용하더라도 JKS 파일을 필수로 받지 않도록 제거하는 기여를 하였다.([PR](https://github.com/bitnami/charts/pull/35772))

하지만 올해 하반기 Bitnami가 오픈소스를 중단하면서 더이상 오픈소스로써의 가치가 줄어든 것 같아서 아쉬웠다.

## 2025 Retrospective

### Keep

- 개인 프로젝트 인프라 고도화하기
- Cloud Native 인프라 환경 계속 공부하기

### Problem

- 너무 적은 Blog 포스팅
- 개인 프로젝트 진척률이 너무 느리다

### Try

- 2주일에 1번이상 블로그 포스팅하기
- 1주일에 개인 프로젝트 Git Commit 2회 이상하기

## 2026 Resolutions

### 개인 프로젝트 서비스 런칭하기

작년 초부터 서비스 런칭하여 유저의 인입을 받아보려고 계속 프로젝트를 만들어가려고 했다. 그럴려고 개인 AWS Account에 내 개인 사비를 써가면서 Infra도 구축하였지만.... Infra 구축 고도화만 점점 진행하고 있을 뿐 실제 서비스 개발을 진행하지 않았다.

더더욱 귀찮다는 핑계로 개인 프로젝트에 점점 손을 놓기가지 하게 되었다.

그래서 올해는 꼭 서비스를 런칭하고 유저의 인입을 받아보려고 한다.

- 1차 런칭 Q1 목표

### 블로그 사이트 고도화

블로그 사이트를 AI를 통해서 Vibe Coding으로 만들었다보니 아직 원하는 목표까지 구현을 하지 못했다.

아직 너무 조잡하기도하고 기능적으로 추가할 부분들이 많아서 해야할 일이 많다.
