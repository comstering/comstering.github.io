---
title: "Karpenter로 유연한 Node Autoscaling 하기"
description: "Node Group의 Autoscaling보다 빠르고 유연하게 Node를 늘리고 줄이자."
date: "2025-07-06"
categories: [infra]
tags: [infra, aws, eks, karpenter, kubernetes, node, autoscaling]
thumbnail: "karpenter.png"
---

## What is Node Autoscale?

k8s는 container로 워크로드를 실행하는 container orchestration 시스템이다. 1대의 컴퓨터 위에서 Pod라는 Workload가 실행된다.

지금 당장 실행시키는 Pod 수가 적다면 1대의 컴퓨터로 문제없이 해결될 수 있다. 하지만 만약 Pod수가 점점 늘어나서 1대의 컴퓨터가 감당할 수 있는 컴퓨팅자원을 넘어서게 되면 어떻게 될까?

Pod 수가 늘어나면서 지속적으로 컴퓨팅자원을 계속 추가해줘야한다. 그 반대로 당연하게 Pod의 수가 줄어들면 낭비되는 자원 비용을 줄이기 위해 컴퓨팅 자원을 줄여주어야한다.

여기서 저 컴퓨팅 자원을 제공하는 컴퓨터가 바로 Node이다. k8s에서는 Node 위에서 Pod들이 실행되는 구조다. 즉, Node의 자원이 부족하면 Node는 추가되어야하고 Node의 자원이 충분해서 오히려 과도하게 낭비되고 있다면 줄여야한다. 이 작업이 Node Autoscale이다.

### Cluster Autoscaler

**Cluster Autoscaler(CA)** 란 Node Autoscaling을 해주는 Autoscaling 제어자를 말한다. CA가 필요시 Node를 늘리고 불필요한 자원이 낭비되면 Node를 줄인다.

## EKS Default Node Group

EKS를 생성할 때 Worker Node를 위해서 node group를 생성했다. [이전 포스팅 참고](https://comstering.github.io/posts/create-eks)

이 node group를 생성하면 자동적으로 [EC2 Autoscaling group(AG)](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html)과 연결된다.

### EKS CA problem

AWS EKS에서 CA는 EC2 Node AG를 통해서 CA 기능을 구현한다.

![eks-node-group-autoscale](/images/posts/contents/karpenter/eks-node-group-autoscale.png)

_출처: [kakao style 기술 블로그](https://devblog.kakaostyle.com/ko/2022-10-13-1-karpenter-on-eks/)_

이 CA 방식은 AWS의 AG 기능에 대해 의존도가 높아 생각보다 Node가 새로 추가되는데 시간이 많이 걸린다.

## What is Karpenter?

**[Karpenter](https://karpenter.sh)** 는 AWS에서 만든 kubernetes의 Worker Node를 위한 오픈소스 Node lifecycle 관리 프로젝트이다. 기존 EC2 AG와 달리 AWS에 리소스에 대한 의존성이 없어서 더 빠른 Node 추가가 가능하다.

![karpenter-autoscale](/images/posts/contents/karpenter/karpenter-autoscale.png)

_출처: [kakao style 기술 블로그](https://devblog.kakaostyle.com/ko/2022-10-13-1-karpenter-on-eks/)_

### 장점

1. AWS 의존성 제거

   기존 default node group의 CA는 AWS의 EC2 AG에 의존성이 있었다. k8s를 관리하기 위한 리소스인데 외부 AWS의 기능을 사용하는 의존성이 생긴 것이다.

   Karpenter는 k8s내에서 Workload로 Controller가 실행되어 Node Provision가 k8s Workload에 의해서 진행된다. AWS에서는 EC2 컴퓨팅을 제공할 뿐 Autoscale에 대한 의존성이 AWS에게 없다.

2. Cost Optimization

   Karpenter의 가장 큰 장점은 비용 최적화 생각한다. Kapenter는 주기적으로 Pod와 Node의 리소스 상태를 점검한다. Pod들이 Pending 상태일 때 Pending 상태의 Pod가 요청한 리소스를 고려하여 최적의 Node instance type을 선택해 Provision한다. 또한 Disrupting 주기를 통해 더이상 사용하지 않는 Node 통합 가능한 Node를 알아서 정리해준다.

3. Node rolling

   EKS Cluster 운영을 하게 되면 한 번 생성된 Node가 오래동안 사용이 지속되는 경우가 발생한다. 오늘 생성한 Node가 1주 뒤, 1달 뒤, 1년 뒤까지 계속 사용이 될 수 있는 것이다.

   이렇게 Node의 사용이 오랫동안 지속될 경우 EC2의 보안패치가 정상적으로 적용되지 않고 신규 보안 위협에 문제가 될 수 있다. 이런 문제를 해결하기 위해서는 지속적으로 새 보안패치가 적용된 새 EC2 노드로 교체를 해주어야한다.

   하지만 이런 과정을 관리자가 직접하려면 귀찮고 반복성 업무를 진행하게 된다. Karpenter는 `ttlSecondsUntilExpired`라는 파라미터로 Node의 최대 지속시간을 설정할 수 있다. 해당 ttl이 넘어가는 Node는 교체 대상이 되며 Karpenter가 자동으로 Node drain부터 Delete까지 차례대로 수행하며 안전하게 새 Node로 교체해준다.

4. AG보다 빠른 Provision

   위 CA를 통한 Autoscale을 보면 Pod pending -> CA -> AG -> Add Node -> Pod Scheduling 순서로 이루어진다. 하지만 Karpenter를 보면 Pod pending -> Add Node -> Pod Scheduling 순으로 기존 AG를 통한 Autoscaling보다 훨씬 빠른 속도의 Provision을 경험할 수 있다.

## Concept

### [Node Classes](https://karpenter.sh/docs/concepts/nodeclasses/)

AWS specific 설정을 하는 Configuration이다.

EC2 Node의 amiFamily, EC2 Node에 기본 System 설정(System Resource, Kube Resource 등), Security Group 설정 등을 정의하는 리소스이다.

AWS에 관련있는 설정으로는 Security Group 설정, Node가 Provision될 Subnet 명시 등을 하여 EC2가 생성되는 설정 넣을 수 있다.

### [Node pools](https://karpenter.sh/docs/concepts/nodepools/)

NodePool은 이름 그대로 Provision할 EC2의 Pool을 명시하는 리소스이다. 어떤 type의 instance를 Provision할지, taint와 같은 설정을 통해서 Node에 provision 될 수 있는 Pod들에 대한 제한 등을 설정할 수 있고 limit을 통해 이 node pool이 provision할 수 있는 최대 리소스를 정의할 수 있다.

Provision할 instance type은 직접 타겟팅해서 명시할 수 있지만 각 instance type들에 해당하는 조건들의 range를 통해서 instance type에 대한 range를 넓게 가져가 상황에 더욱 알맞는 node가 Provision될 수 있도록 할 수 있다. (하지만 range가 커지는 만큼 Node Provision에 대한 속도가 늦어질 수 있다.)

## Finished

생각보다 글이 꽤나 길어졌다. 일단 이번 포스팅은 여기까지 작성하고 실제 Karpenter 설치와 적용은 다음 포스팅에서 다뤄보려고 한다.

다른 k8s 서비스 제공하는 Cloud(Azure, GCP 등)에서도 이런 오픈소스 프로젝트가 있는지는 모르겠지만 AWS를 사용하고 있는 지금 기존보다 Node 관리가 훨씬 편해진 상태다. EKS로 k8s를 사용하고 있는 곳이라면 도입을 적극적으로 추천한다.
