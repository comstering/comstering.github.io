---
title: "EKS에 Karpenter 설치"
description: "EKS에 Karpenter 설치해서 유연한 Node Autoscaling 적용하기"
date: "2025-07-07"
categories: [infra]
tags: [infra, aws, eks, karpenter, kubernetes, k8s]
thumbnail: "karpenter.png"
---

## Prerequisite

설치하기 전에 미리 설정해야하는 것들이 있다.

### Install helm

Karpenter는 helm chart를 통해서 k8s에 설치가 가능하다. helm에 대한 내용은 나중에 포스팅해보도록 하고 간단하게 kubernetes 리소스들을 정해진 template에 맞춰서 배포할 수 있게 해주는 도구라고만 알고 넘어가자.

helm이 일단 먼저 필요하다. [Helm Install Docs](https://helm.sh/docs/intro/install/)

### AWS 리소스 생성

Karpenter는 EC2 Instance를 생성해서 Node를 추가한다. AWS에 EC2를 생성할 수 있도록 AWS IAM Role을 생성해야한다.

또한 EC2는 VPC subnet에 Provision 되기 때문에 어떤 Subnet에 Node를 Provision할 지 Karpenter가 알아야한다.

#### IAM Role for Karpenter Node

```hcl
resource "aws_iam_role" "karpenter" {
  name               = "KarpenterNodeRole-${aws_eks_cluster.main.name}"
  assume_role_policy = data.aws_iam_policy_document.node_group_role.json
}

resource "aws_iam_role_policy_attachment" "karpenter_AmazonEKSWorkerNodePolicy" {
  role       = aws_iam_role.karpenter.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "karpenter_AmazonEKS_CNI_Policy" {
  role       = aws_iam_role.karpenter.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "karpenter_AmazonEC2ContainerRegistryReadOnly" {
  role       = aws_iam_role.karpenter.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_role_policy_attachment" "karpenter_AmazonSSMManagedInstanceCore" {
  role       = aws_iam_role.karpenter.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}
```

#### IAM Role for Karpenter Controller

```hcl
resource "aws_iam_role" "karpenter_controller" {
  name               = "KarpenterControllerRole-${aws_eks_cluster.main.name}"
  assume_role_policy = data.aws_iam_policy_document.karpenter_controller_role.json
}

resource "aws_iam_role_policy_attachment" "karpenter_controller" {
  role       = aws_iam_role.karpenter_controller.name
  policy_arn = aws_iam_policy.karpenter_controller.arn
}

data "aws_iam_policy_document" "karpenter_controller_role" {
  version = "2012-10-17"

  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    condition {
      test     = "StringEquals"
      variable = "${replace(aws_iam_openid_connect_provider.eks_oidc.url, "https://", "")}:sub"
      values   = ["system:serviceaccount:kube-system:karpenter"]
    }

    condition {
      test     = "StringEquals"
      variable = "${replace(aws_iam_openid_connect_provider.eks_oidc.url, "https://", "")}:aud"
      values   = ["sts.amazonaws.com"]
    }

    principals {
      identifiers = [aws_iam_openid_connect_provider.eks_oidc.arn]
      type        = "Federated"
    }
  }
}

resource "aws_iam_policy" "karpenter_controller" {
  name   = "KarpenterContollerPolicy-${aws_eks_cluster.main.name}"
  policy = data.aws_iam_policy_document.karpenter_controller_policy.json
}

data "aws_iam_policy_document" "karpenter_controller_policy" {
  statement {
    actions = [
      "ssm:GetParameter",
      "ec2:DescribeImages",
      "ec2:RunInstances",
      "ec2:DescribeSubnets",
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeLaunchTemplates",
      "ec2:DescribeInstances",
      "ec2:DescribeInstanceTypes",
      "ec2:DescribeInstanceTypeOfferings",
      "ec2:DeleteLaunchTemplate",
      "ec2:CreateTags",
      "ec2:CreateLaunchTemplate",
      "ec2:CreateFleet",
      "ec2:DescribeSpotPriceHistory",
      "pricing:GetProducts"
    ]
    effect = "Allow"

    resources = ["*"]
    sid       = "Karpenter"
  }

  statement {
    actions = ["ec2:TerminateInstances"]
    effect  = "Allow"

    condition {
      test     = "StringLike"
      variable = "ec2:ResourceTag/karpenter.sh/nodepool"
      values   = ["*"]
    }

    resources = ["*"]
    sid       = "ConditionalEC2Termination"
  }

  statement {
    actions = ["iam:PassRole"]
    effect  = "Allow"

    resources = [aws_iam_role.karpenter.arn]
    sid       = "PassNodeIAMRole"
  }

  statement {
    actions = ["eks:DescribeCluster"]
    effect  = "Allow"

    resources = [aws_eks_cluster.main.arn]
    sid       = "EKSClusterEndpointLookup"
  }

  statement {
    actions = ["iam:CreateInstanceProfile"]
    effect  = "Allow"

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/kubernetes.io/cluster/${aws_eks_cluster.main.name}"
      values   = ["owned"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/topology.kubernetes.io/region"
      values   = [var.region]
    }

    condition {
      test     = "StringLike"
      variable = "aws:RequestTag/karpenter.k8s.aws/ec2nodeclass"
      values   = ["*"]
    }

    resources = ["*"]
    sid       = "AllowScopedInstanceProfileCreationActions"
  }

  statement {
    actions = ["iam:TagInstanceProfile"]
    effect  = "Allow"

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/kubernetes.io/cluster/${aws_eks_cluster.main.name}"
      values   = ["owned"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/topology.kubernetes.io/region"
      values   = [var.region]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/kubernetes.io/cluster/${aws_eks_cluster.main.name}"
      values   = ["owned"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/topology.kubernetes.io/region"
      values   = [var.region]
    }

    condition {
      test     = "StringLike"
      variable = "aws:ResourceTag/karpenter.k8s.aws/ec2nodeclass"
      values   = ["*"]
    }


    condition {
      test     = "StringLike"
      variable = "aws:RequestTag/karpenter.k8s.aws/ec2nodeclass"
      values   = ["*"]
    }

    resources = ["*"]
    sid       = "AllowScopedInstanceProfileTagActions"
  }

  statement {
    actions = [
      "iam:AddRoleToInstanceProfile",
      "iam:RemoveRoleFromInstanceProfile",
      "iam:DeleteInstanceProfile"
    ]
    effect = "Allow"

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/kubernetes.io/cluster/${aws_eks_cluster.main.name}"
      values   = ["owned"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/topology.kubernetes.io/region"
      values   = [var.region]
    }

    resources = ["*"]
    sid       = "AllowScopedInstanceProfileActions"
  }

  statement {
    actions = ["iam:GetInstanceProfile"]
    effect  = "Allow"

    resources = ["*"]
    sid       = "AllowInstanceProfileReadActions"
  }

  // for Spot instance
  statement {
    actions = [
      "sqs:ReceiveMessage",
      "sqs:GetQueueUrl",
      "sqs:DeleteMessage"
    ]
    effect = "Allow"

    resources = ["*"]
    sid       = "AllowInterruptionQueueActions"
  }
}

resource "aws_iam_service_linked_role" "spot" {
  aws_service_name = "spot.amazonaws.com"
}
```

#### SQS for SPOT Instance

Spot Instance를 사용하기 위해서는 SQS를 사용해야한다. Spot Instance는 on-demand Instance와 달리 언제 Interruption이 발생해서 뺏길지 모르는 Instance이다. 이런 Interruption을 Queue로 관리하기 위해 SQS를 필요로한다.

```hcl
resource "aws_sqs_queue" "karpenter_spot" {
  name = "Karpenter-${aws_eks_cluster.main.name}-SpotInterruptionQueue"

  message_retention_seconds = 300
  sqs_managed_sse_enabled   = true
}
```

#### Set tag to Subnet & Security Group

AWS에서 리소스를 관리하고 적용하는 방식을 대부분 리소스에 적힌 Tag로 관리한다.

Karpenter도 마찬가지다. Karpenter가 Node를 배포할 수 있는 Subnet 판단을 Subnet에 달린 tag를 보고 판단하고 Node가 사용할 Security Group도 Security Group에 달린 tag를 보고 판단한다.

**"karpenter.sh/discovery" = ${EKS_CLUSTER_NAME}** 으로 Subent과 Security group에 tag를 추가해야한다.

```hcl
resource "aws_subnet" "private" {
  //..  중략
  tags = {
    "kubernetes.io/role/interna-elb" = 1
    "karpenter.sh/discovery"         = var.name.eks
  }
}

// EKS 생성할 때 따로 SG를 추가해주지 않았기에 Node는 EKS Cluster의 SG를 동일하게 사용한다.
// 동적으로 EKS Cluster SG에 karpenter tag를 추가하도록 한다.
resource "null_resource" "add_karpenter_tag" {
  count = length(var.vpc.subnet_ids.node)

  provisioner "local-exec" {
    command = <<EOT
      aws ec2 create-tags --region ${var.region} --resources ${aws_eks_cluster.main.vpc_config[0].cluster_security_group_id} --tags Key=karpenter.sh/discovery,Value=${aws_eks_cluster.main.name}
    EOT
  }
}

```

### Install Karpenter in EKS

필요한 AWS 리소스는 모두 생성했다. 이제 EKS에 Karpenter를 설치해보자.

#### Update aws-auth ConfigMap

먼저 aws-auth ConfigMap을 변경해줘야한다.

kubectl 명령으로 ConfigMap 수정을 진행한다. ${}로 표시한 값들은 각자 AWS 계정에 맞는 값을 입력해주면 된다.

```bash
kubectl edit configmap aws-auth -n kube-system
```

```yaml
# Add section in aws-auth configmap
- groups:
    - system:bootstrappers
    - system:nodes
  rolearn: arn:${AWS_PARTITION}:iam::${AWS_ACCOUNT_ID}:role/KarpenterNodeRole-${CLUSTER_NAME}
  username: system:node:{{EC2PrivateDNSName}}
```

#### Install using helm

Helm chart를 이용해서 Karpenter를 설치한다.

**values.yaml**

${}로 표시된 values는 각자가 설정한 AWS 리소스를 명시하면 된다.

```yaml
# Service Account에서 사용할 IAM Role ARN 정의
serviceAccount:
  annotations:
    eks.amazonaws.com/role-arn: ${KarpenterControllerRole}

# Replica count
replicas: 1

# Karpenter Controller가 Karpenter가 생성한 Node 위에서 실행되지 않도록
# 기본 설정한 default node group 위에서만 실행되도록 affinity를 설정해준다.
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: karpenter.sh/nodepool
              operator: DoesNotExist
            - key: eks.amazonaws.com/nodegroup
              operator: In
              values: ["default_node_group"]

# Controller의 리소스를 명시한다
controller:
  resources:
    requests:
      cpu: 50m
      memory: 512Mi
    limits:
      memory: 512Mi

# EKS cluster 이름과 위에서 생성한 SQS queue 이름을 입력한다.
settings:
  clusterName: ${EKS_CLUSTER_NAME}
  interruptionQueue: Karpenter-${EKS_CLUSTER_NAME}-SpotInterruptionQueue
```

**Helm install**

자신의 k8s 버전에 맞는 KARPENTER_VERSION을 사용하자. [Compatibility](https://karpenter.sh/docs/upgrading/compatibility/) 페이지에서 호환되는 버전을 확인하면 된다.

```bash
helm upgrade --install karpenter oci://public.ecr.aws/karpenter/karpenter --version ${KARPENTER_VERSION} -n kube-system -f values.yaml
```

#### Result

정상적으로 설치가 끝나면 이렇게 Karpenter pod를 확인할 수 있다.

![karpenter-controller-pod](/images/posts/contents/install-karpenter/karpenter-controller-pod.png)

### Set Node

Karpenter Controller 설치가 끝났으면 이제 Karpenter가 관리할 Node의 정의를 해줘서 EC2 Instance를 자동으로 Provision하여 Node를 추가하도록 해보자.

#### Node Class

```yaml
apiVersion: karpenter.k8s.aws/v1
kind: EC2NodeClass
metadata:
  name: default
spec:
  amiFamily: AL2023
  amiSelectorTerms:
    - alias: al2023@latest
  subnetSelectorTerms:
    - tags:
        karpenter.sh/discovery: ${EKS_CLUSTER_NAME}
  securityGroupSelectorTerms:
    - tags:
        karpenter.sh/discovery: ${EKS_CLUSTER_NAME}
  role: "${KARPENTER_NODE_ROLE}"
```

#### Node pool

```yaml
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: default
spec:
  template:
    metadata:
    spec:
      nodeClassRef:
        group: karpenter.k8s.aws
        kind: EC2NodeClass
        name: default
      expireAfter: 720h
      terminationGracePeriod: 10m
      requirements:
        - key: karpenter.k8s.aws/instance-family
          operator: In
          values:
            - t4g
        - key: karpenter.k8s.aws/instance-cpu
          operator: In
          values:
            - "2"
            - "4"
        - key: karpenter.k8s.aws/instance-memory
          operator: In
          values:
            - "4096"
            - "8192"
            - "16384"
        - key: karpenter.sh/capacity-type
          operator: In
          values:
            - spot
            - on-demand
        - key: topology.kubernetes.io/zone
          operator: In
          values:
            - ap-northeast-2a
        - key: kubernetes.io/arch
          operator: In
          values:
            - arm64
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 10m
  limit:
    cpu: 20
    memory: 80Gi
  weight:
```

## Result

Node Class와 Node Pool 설정까지 끝나면 Node에 컴퓨팅 자원이 부족할 때 Karpenter가 Node를 새로 추가한다.

Karpenter가 새로 추가한 Node에는 아래처럼 **karpenter.k8s.aws/** 로 시작하는 label 들이 붙어있다.

![karpenter-node](/images/posts/contents/install-karpenter/karpenter-node.png)

## Finished

Karpenter로 Node를 유연하게 Provisioning 되는 것까지 완료했다.

Side Project이다 보니 당연하게 비용을 최저로 나가게 하고 싶은 맘이 컸다. 그래서 node pool은 최대한 spot이 뜨게 하려고 node pool에 추가했고 t class로 node를 띄웠다.

Side Project에서 캐시카우가 점점 늘어나게 되면 고민을 해보겠지만 지금 당장 트래픽이 엄청 많은 것도 아니고 t class로도 문제없이 돌릴 수 있는 상황이기 때문에 최대함 비용이 안나가는 걸 최우선으로 했다.
