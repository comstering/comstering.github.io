---
title: "Bitnami helm chart open source contribute"
description: "두번째 오픈소스 기여, 이번엔 크리티컬한 이슈를 수정했다!"
date: "2025-08-13"
categories: [project, infra, backend]
tags: [project, kafka, open source, contribute, helm, schema registry, k8s]
thumbnail: "confluent.png"
---

## Schema Registry Helm Chart 배포 에러

![helm-install-error](/images/posts/contents/bitnami-helm-chart-contribute/helm-install-error.png)

bitnami의 helm chart를 사용해서 schema-registry를 배포하려고 했더니 위와 같은 에러가 났다. 로그에서 보인 문제는 jks secret이 설정되어 있지 않다는 것!

### helm values

내가 set한 values.yaml는 아래와 같다.

```yaml
global:
  imageRegistry: "{ECR Image pull through cache registry}"
  security:
    allowInsecureImages: true

usePasswordFiles: false

image:
  debug: true

auth:
  tls:
    enabled: false
  kafka:
    saslMechanism: SCRAM-SHA-512

extraEnvVars:
  - name: SCHEMA_REGISTRY_SCHEMA_REGISTRY_GROUP_ID
    value: schema-registry-prd

pdb:
  minAvailable: 1

autoscaling:
  enabled: true
  minReplicas: 2
  targetCPU: 80

service:
  ports:
    http: 80

serviceAccount:
  create: create
  annotations:
    eks.amazonaws.com/role-arn: "{iam role arn}"

kafka:
  enabled: false

externalKafka:
  brokers:
    - SASL_SSL://{msk-broker-1}:9096
    - SASL_SSL://{msk-broker-2}:9096
    - SASL_SSL://{msk-broker-3}:9096
  listener:
    protocol: SASL_SSL
  sasl:
    user: # scram username
    password: # scram password
```

### MSK 연동

나는 kafka broker를 MSK를 사용하고 있다. MSK는 SASL_SSL/AWS_MSK_IAM 인증 방식과 SASL_SSL/SCRAM 인증방식을 지원한다. bitnami의 schema registry는 iam 인증을 기본적으로 지원하지 않기 때문에 SCRAM 인증방식을 사용해서 인증해야한다.

#### kafka SSL 인증서

여기서 문제되는 부분은 SASL_SSL 통신방식에서가 문제가 된다. 인증은 SASL/SCRAM으로 인증은 하지만 네트워크 통신은 SSL/TLS 통신으로 암호화된 통신을 진행한다. 이때 kafka에서는 이 TLS를 위해서 인증서를 만들고 client에서는 이 인증에 필요한 jks라는 key를 가지고 있어야한다. 즉, 상호 인증이 필요하고 이 과정을 mTLS라고도 한다.

#### MSK SSL 통신

MSK는 mTLS를 하지 않는다. 기본적으로 암호화된 통신을 진행하고 여기에 사용되는 인증서는 CA에 정식으로 등록된 인증서를 사용하기 때문에 따로 Client에서 인증서 관련 jks를 가지고 있을 필요가 없다.

## Helm chart 문제점

helm chart의 문제점은 명확하다. kafka와의 통신에서 security.protocol에 SSL이 있으면 jks를 필수 값으로 입력받도록 chart가 구성되어 있다.

```txt
// NOTES.txt
{{/* Validate values of Schema Registry - TLS authentication */}}
{{- define "schema-registry.validateValues.authentication.tls" -}}
{{- $kafkaProtocol := upper (ternary .Values.kafka.listeners.client.protocol .Values.externalKafka.listener.protocol .Values.kafka.enabled) -}}
{{- if and (contains "SSL" $kafkaProtocol) (not .Values.auth.kafka.jksSecret) }}
kafka: auth.kafka.jksSecret
    A secret containing the Schema Registry JKS files is required when TLS encryption in enabled
{{- end -}}
{{- end -}}
```

```yaml
# statefulset.yaml
{{- $kafkaProtocol := upper (ternary .Values.kafka.listeners.client.protocol .Values.externalKafka.listener.protocol .Values.kafka.enabled) }}

# 중략...

{{- if or (contains "SSL" $kafkaProtocol) .Values.auth.tls.enabled }}
- name: certificates
  projected:
    defaultMode: 0400
    sources:
    {{- if contains "SSL" $kafkaProtocol }}
    - secret:
        name: {{ printf "%s" (tpl .Values.auth.kafka.jksSecret $) }}
    {{- end }}
    {{- if .Values.auth.tls.enabled }}
    - secret:
        name: {{ printf "%s" (tpl .Values.auth.tls.jksSecret $) }}
    {{- end }}
{{- end }}
```

### jks가 꼭 필요한가?

위에서 말했 듯 MSK는 jks파일이 전혀 필요없다. 이 chart는 일반적인 kafka broker를 대상으로 연결할 때 필요한 상황을 require하고 있다.

## Issue 문의

일단 나는 먼저 [bitnami chart repo](https://github.com/bitnami/charts)에 가서 Issue로 먼저 등록하여 현재 내 상황과 문제점을 report했다.

[Issue #35731](https://github.com/bitnami/charts/issues/35731)

![create-issue](/images/posts/contents/bitnami-helm-chart-contribute/create-issue.png)

### Issue 답변

Issue에 달린 답변은 너무 명확했다.

> Issue를 올려주고 참여해줘서 고맙다. 만약 해결책을 제시하고 싶으면 가이드라인을 읽고 PR을 올려라.

![issue-comment](/images/posts/contents/bitnami-helm-chart-contribute/issue-comment.png)

나는 내가 해결책을 바라고 어떻게 해결할 수 있는지에 대해서 얻고 싶었는데 오히려 내가 해결하라는 답변을 받은 것 같아 조금 당황스러웠다.

## Issue Solved

일단 chart의 value만을 수정하는 것으로는 내가 해결할 수 있는 방법이 없는 것 같았다. 결국 내가 직접 chart를 수정해서 내 k8s에 배포했고 해당 변경사항을 PR로 올렸다.

### Fork Repo

일단 모든 contribution 방식인 repo fork를 먼저 했다. [Fork-Repository](https://github.com/comstering/charts)

### Fixed chart

그리고 브랜치를 새로 파서 helm chart를 수정했다. 수정 방향은 아래와 아래와 같이 잡았다.

1. jksSecret이라는 value를 optional로 입력하고 싶다.
2. 기존의 values 형태를 수정하지 않게 하고 싶다.

2번을 넣은 이유는 values에 추가해야되는 값이 늘어나면 그 values에 대해서 설명을 README에 추가해야되고 사용성에도 더 안좋아질 것 같아서였다.

일단 validate error가 발생했던 Notes.txt 부분의 검증 부분에서 더이상 이 문제로 검증되지 않도록 검증 로직을 제거했다.

![chart-fix-notes](/images/posts/contents/bitnami-helm-chart-contribute/chart-fix-notes.png)

그리고 statefulset.yaml의 모든 jks 파일 사용 부분에 조건을 추가시켰다. security.protocol에 SSL이 포함되었을 때만이 아니라 jksSecret이 명시되었을 때의 조건도 추가했다.

즉, security.protocol이 SSL을 포함하면서 jksSecret도 값이 있어야 jks파일에 관련된 resource 정의가 되도록 설정했다.

![issue-comment](/images/posts/contents/bitnami-helm-chart-contribute/chart-fix-statefulset.png)

### [Pull Request #35772](https://github.com/bitnami/charts/pull/35772)

위 변경사항으로 Pull Request를 만들었다. bitnami chart에서 조금 독특했던 부분은 Chart의 버전을 contributor가 직접 올리는 것이었다.

![chart-bump-comment](/images/posts/contents/bitnami-helm-chart-contribute/chart-bump-comment.png)

그래서 내가 직접 minor version을 올렸다.

![chart-bump](/images/posts/contents/bitnami-helm-chart-contribute/chart-bump.png)

## Contribute

생각보다 Review 속도가 빨라서 놀랐다. Issue와 PR에 들어가서 작성 시간을 보면 알 수 있겠지만 처음 Bug Issue를 올리고 하루만에 comment가 달렸고 다음 날(오늘)에 helm chart를 수정해서 PR을 올렸다.

PR이 생성되고 1시간 정도만에 Chart.yaml의 버전업에 대한 코멘트가 달렸고 오늘 저녁 10시 경에 바로 maintainer로 부터 approve를 받고 머지가 되었다.

![pr-approve](/images/posts/contents/bitnami-helm-chart-contribute/pr-approve.png)

### 후기

이번이 2번째 open source에 기여였다. 이전에는 그저 UI의 오타를 수정하는 정도의 contribution이었다면 이번에는 실제 helm chart 배포에 문제가 발생하는 부분을 수정하고 contribution했다는게 조금 다른 점이면서 좋았던 점이었다.

open source에 기여한다는게 어떤 의미를 가지고 어떻게 다가와질지는 모르겠지만 이런 contribution을 하나씩 해보는 경험이 되게 좋은 것 같다.
