---
title: "EKS로 Kubernetes Cluster 구축하기"
description: "AWS에게 Kubernetes 관리를 맡기자"
date: "2025-07-03"
categories: [infra]
tags: [infra, aws, eks, kubernetes, k8s, terraform]
thumbnail: "eks.png"
---

## What is EKS?

[EKS Documentation](http://docs.aws.amazon.com/ko_kr/eks/latest/userguide/what-is-eks.html)

### Structure of Kubernetes

k8s 관한 것까지 이 포스팅에서 다루려면 너무 크기 때문에 EKS에 대해 알기 위해 필요한 부분만 설명하려고 한다.

k8s 구조에는 크게 [Control Plane](https://kubernetes.io/docs/concepts/overview/components/#control-plane-components)과 [Data Plane(Node Component)](https://kubernetes.io/docs/concepts/overview/components/#node-components)이 있다.

Control Plane은 말 그대로 k8s의 전반적인 상태를 관리하는 Control Tower라고 생각하면 된다. 즉, k8s에서 가장 중요한 컴포넌트이며 이 Control Plane에서 장애가 발생하면 k8s 전체에 장애가 발생하고 운영이 중단된다.

Data Plane은 Control Plane이 관리하는 k8s Cluster 안에서 실제 서비스를 제공하는 서버 등을 Pod에 실행하고 운영 및 관리하는 영역이다.

k8s는 이렇게 크게 2가지 구분되는 큰 구조를 가진다.

### Managed Control Plane

위에서 말했던 것처럼 Control Plane은 k8s의 가장 중심이 되는 중요 영역이다. 여기에서 발생하는 장애는 Data Plane에서 발생하는 장애와는 차원이 다르며 k8s를 운영하고 서비스에서는 절대로 발생하면 안되는 장애 영역이다.

이렇게 중요한 영역인 만큼 관리하는데 많은 인적 자원 및 컴퓨팅 자원을 사용하며 관리복잡성이 매우 높다.

EKS는 이런 Control Plane을 AWS가 직접 Managed로 관리해주고 AWS를 사용하는 사용자는 Data Plane 영역만을 관리하면 된다는 Concepts을 가지는 AWS 관리형 k8s Cluster 서비스이다.

간단히 말해 "Control Plane 관리 복잡하지? 우리가 다 알아서 해줄게! 너는 그냥 Data Plane에서 애플리케이션 배포에만 신경 써!"라고 해주는 AWS Managed 서비스다.

## EKS Architecture

EKS의 큰 Architecture는 아래와 같다.

![eks-architecture](/images/posts/contents/create-eks/eks-architecture.png)

우리가 관리하는 VPC가 있고 AWS 자체의 VPC가 있다. EKS Control Plane은 AWS 자체 VPC에서 동작한다. 우리가 관리하는 VPC에 교차 계정 ENI를 통해서 AWS 자체 VPC에 있는 EKS Control Plane과 네트워크로 연결되게 된다.

Data Plane의 Pod 애플리케이션 및 k8s 리소스들은 저 교차 계정 ENI를 통해서 AWS 자체 VPC에 배포되어 있는 EKS Control Plane과 통신하며 Control Plane 관리를 받게 된다.

### Control Plane ENI subnet 분리

EKS는 Control Plane과 Data Plane은 통신을 교차 계정 ENI를 사용한다. 교차 계정 ENI는 간단하게 AWS EKS VPC의 IP와 내 VPC에 있는 IP가 연결되어 있는 것으로 이해하면 쉽다. 즉, 내 VPC 대역의 IP로 EKS Control Plane과 통신이 가능하다는 것이다.

EKS Control Plane ENI 대역과 Data Plane 대역을 같은 Subnet으로 묶어서 사용하게 될 경우 하나의 시나리오에서 문제가 발생할 수 있다.

바로 EKS의 k8s Cluster 버전을 업그레이드하는 상황에 Subnet에 더이상 할당할 수 있는 IP가 없는 상황이 발생할 수 있다.

#### Scenario

1. Subnet에 100개의 IP가 사용가능하다.
2. EKS Control Plane ENI로 4개를 사용한다.
3. Worker Node와 Pod IP로 96개의 IP를 사용한다.
4. k8s version을 Upgrade한다.
5. Control Plane은 종료되면 안되기 때문에 Upgrade를 위한 새 ENI를 subnet에 할당해야한다.
6. 이미 Subnet에서 사용가능한 IP가 없기 때문에 ENI를 할당할 수 없으므로 Version을 올릴 수 없다.

#### AWS EKS Best Practice

위와 같은 이유로 [EKS Best Practice VPC subnet](https://docs.aws.amazon.com/eks/latest/best-practices/subnets.html) 문서에 이런 문구로 Control Plane subnet을 분리하는 것을 권장한다.

> Kubernetes worker nodes can run in the cluster subnets, but it is not recommended. During cluster upgrades Amazon EKS provisions additional ENIs in the cluster subnets. When your cluster scales out, worker nodes and pods may consume the available IPs in the cluster subnet. Hence in order to make sure there are enough available IPs you might want to consider using dedicated cluster subnets with /28 netmask.

## Create EKS using terraform

그럼 EKS가 무엇이고 어떤 형태로 EKS를 구성해야되는지 알았으니 EKS를 내 VPC에 만들어서 구성해보자. 저번 포스팅에서 말했듯이 나는 Terraform을 통해 IaC로 Infra를 관리하고 있으므로 Terraform으로 EKS를 구성한다.

### VPC subnet for Control Plane ENI

위에서 언급한 대로 EKS Control Plane을 위한 subnet을 따로 만들어준다.

```hcl
data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  az = data.aws_availability_zones.available.names
  eks_control_plane_subnet_cidr = ["10.0.0.192/28", "10.0.0.208/28", "10.0.0.224/28"]
}

resource "aws_subnet" "eks_control_plane" {
  vpc_id = aws_vpc.main.id
  count  = length(locals.eks_control_plane_subnet_cidr)

  cidr_block        = locals.eks_control_plane_subnet_cidr[count.index]
  availability_zone = local.az[count.index]

  tags = {
    Name = "my-vpc-${format("%02s", count.index)}-${local.az[count.index]}"
  }
}
```

### EKS

Control Plane subnet도 준비되었겠다. EKS 생성에 필요한 리소스들을 생성해보자.

#### IAM for EKS

먼저 EKS는 EC2 Node 및 ENI 등을 생성해야되기 때문에 관련된 IAM Role을 먼저 만들어준다. 대부분의 권한은 이미 AWS가 자체적으로 생성해 놓은 Policy가 존재해서 해당 Policy를 그냥 사용하면 된다.

```hcl
resource "aws_iam_role" "eks" {
  name               = "AmazonEKSClusterRole-terraform"
  assume_role_policy = data.aws_iam_policy_document.eks_role.json
}

data "aws_iam_policy_document" "eks_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role_policy_attachment" "eks_AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks.name
}

resource "aws_iam_role_policy_attachment" "eks_AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.eks.name
}

resource "aws_iam_role" "node_group" {
  name               = "AmazonEKSNodeRole-terraform"
  assume_role_policy = data.aws_iam_policy_document.node_group_role.json
}

data "aws_iam_policy_document" "node_group_role" {
  version = "2012-10-17"

  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role_policy_attachment" "node_group_AmazonEKSWorkerNodePolicy" {
  role       = aws_iam_role.node_group.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "node_group_AmazonEKS_CNI_Policy" {
  role       = aws_iam_role.node_group.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "node_group_AmazonEC2ContainerRegistryReadOnly" {
  role       = aws_iam_role.node_group.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}
```

#### EKS Cluster

이제 EKS Cluster 리소스를 정의한다. 대표적으로 aws_eks_cluster와 aws_eks_node_group 두 리소스가 존재한다.

aws_eks_cluster는 Managed Control Plane이고 aws_eks_node_group는 Data Plane을 위한 EC2 Node group라고 생각하면 된다.

```hcl
resource "aws_eks_cluster" "main" {
  name     = "my-eks"
  role_arn = aws_iam_role.eks.arn
  vpc_config {
    subnet_ids = aws_subnet.eks_control_plane[*].id
  }

  version = "1.33"

  access_config {
    authentication_mode = "API_AND_CONFIG_MAP"
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.eks_AmazonEKSVPCResourceController
  ]
}

resource "aws_eks_node_group" "default_node_group" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "default_node_group"
  node_role_arn   = aws_iam_role.node_group.arn
  subnet_ids      = aws_subnets.private[*].id

  scaling_config {
    desired_size = 1
    max_size     = 3
    min_size     = 1
  }

  depends_on = [
    aws_iam_role_policy_attachment.node_group_AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.node_group_AmazonEC2ContainerRegistryReadOnly,
    aws_iam_role_policy_attachment.node_group_AmazonEKS_CNI_Policy
  ]

  ami_type = "AL2023_ARM_64_STANDARD"

  instance_types = "t4g.xlarge"
}
```

#### EKS addons

EKS에서 편하게 추가하게 해주는 Data Plane 서비스들이다. 대표적으로 필요한 addon 3개만 일단 추가했다.

- **vpc-cni**: Worker Node의 보조 ENI를 통해서 Pod의 ip를 VPC IP 대역으로 할당해준다. Network Routing부터 Network Policy를 통한 정책 제어 등 Network 전반에 걸친 관리를 해주는 addon이다.
- **core-dns**: k8s Cluster DNS의 DNS를 해석해주는 역할을 한다. k8s에서 Service리소스를 만들면 Service에는 Cluster DNS라는 DNS를 사용해서 각 애플리케이션 간에 통신을 할 수 있다. 예를 들어 default Namespace에 my-app이라는 Service를 가지도록 애플리케이션을 배포하면 다른 k8s Pod에서 `http://my-app.default.svc.cluster.local` 도메인으로 연결할 수 있다.
- **kube-proxy**: Service에는 여러 Pod들이 존재한다. my-app이라는 Service로 연결되는 Pod는 1개일 수도 10개일 수도 있다. 이런 Pod들에 대한 LoadBalancing을 kube-proxy가 담당하여 하나의 Service로 요청을 보냈을 때 하나의 Pod에게 트래픽이 집중되지 않도록 해준다.

```hcl
resource "aws_eks_addon" "vpc_cni" {
  cluster_name  = aws_eks_cluster.main.name
  addon_name    = "vpc-cni"
  addon_version = "v1.19.5-eksbuild.3"
}

resource "aws_eks_addon" "core_dns" {
  cluster_name  = aws_eks_cluster.main.name
  addon_name    = "coredns"
  addon_version = "v1.12.1-eksbuild.2"
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name  = aws_eks_cluster.main.name
  addon_name    = "kube-proxy"
  addon_version = "v1.33.0-eksbuild.2"
}
```

#### EKS Access Entries

EKS cluster가 만들어지면 EKS에 접속해서 내부 Pod 상태를 확인하거나 장애가 있을 경우 조치를 해야한다.

그러기 위해서는 내가 가진 계정이 EKS에 접속할 수 있도록 EKS Access Entries에 추가해줘야한다.

Terraform 예시로는 그냥 root 사용자를 추가하는 것으로 했지만 당연하게 root 사용자가 아니라 자신의 IAM 계정을 추가해줘야한다. (Cluster Admin권한으로 부여 중이지만 상황과 IAM 대상 유저에 따라서 적절한 권한을 부여해주어야한다.)

```hcl
data "aws_caller_identity" "name" {}

resource "aws_eks_access_entry" "root_user" {
  cluster_name  = aws_eks_cluster.main.name
  principal_arn = "arn:aws:iam::${data.aws_caller_identity.name.account_id}:root"
}

resource "aws_eks_access_policy_association" "root" {
  cluster_name  = aws_eks_cluster.main.name
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
  principal_arn = "arn:aws:iam::${data.aws_caller_identity.name.account_id}:root"

  access_scope {
    type = "cluster"
  }
}
```

## Result

### Update kube config

aws cli를 통해서 AWS EKS를 kubeconfig에 등록한다.

```bash
export EKS_NAME = {my-eks}
aws eks update-kubeconfig --region ap-northeast-2 --name $EKS_NAME
```

### k9s

k9s는 k8s를 Terminal에서 관리하고 모니터링할 수 있게 해주는 도구다.

![k9s](/images/posts/contents/create-eks/k9s.png)

### Lens & Open Lens

Lens는 GUI로 k8s를 관리하고 모니터링할 수 있게 해주는 프로그램 도구다.

Lens는 상용버전이고 오픈소스로 비상용버전인 Open Lens가 있다.

![lens](/images/posts/contents/create-eks/lens.png)

## Finished

이렇게 AWS EKS를 구성하고 실제 정상적으로 Cluster가 운영되는 것까지 확인했다. 이제 만든 k8s Cluster 위에서 애플리케이션을 배포하고 운영하면서 Side Project를 하나씩 올려보려고 한다.

지금은 정말 EKS의 기본을 설정해놓은 상태이기 때문에 추가적인 설정들을 더 해야한다. 내가 추가로 한 설정들은 다음 포스팅에서 또 다루도록 하겠다.
