---
title: "데린이의 AWS Cloud, IaC Terraform Cloud 구축기"
description: "코드로 간편하게 인프라를 구축하자."
date: "2025-07-01"
categories: [infra]
tags: [infra, aws, terraform, IaC]
thumbnail: "terraform.webp"
---

## What is AWS?

AWS: Amazon Web Service

대표적인 Cloud Infra를 제공해주는 회사로 전세계에 서비스를 제공할 수 있는 Cloud Platform을 제공해준다.

## What is IaC?

IaC: Infra as Code

Infra 관리를 Code를 통해서 할 수 있게 해주는 기술이다.

IaC란 기술은 Cloud라는 기술이 없었다면 생길 수 없던 기술이다.

On-premiss 환경에서 인프라 구축은 코드로 절대할 수 없다.

직접 인터넷 선을 연결해야되고 서버 장비도 들여야되고 이러한 작업을 Code로 한다는 건 말이 안된다.

하지만 Cloud라는 개념이 생기면서 웹상에서 클릭 몇번으로 자신의 서버를 만들 수 있는 세상이 되면서 이러한 Cloud 환경에서의 리소스 관리를 어떻게 조금 더 효율적으로 관리할 것인가라는 요구사항이 생겼다.

이러한 Cloud Infra를 관리할 사람은 당연히 개발자이고 개발자에게 가장 친숙한 것은? 당연하 Code일 것이다.

심지어 Code로 관리하게 되면 git과 같은 형상관리/버전관리 툴을 이용해서 변경내용을 전부 기록으로 남길 수 있다.

### [Terraform](https://developer.hashicorp.com/terraform)

나는 그 중에서 대표적인 IaC 중 하나인 terraform을 사용하기로 했다.

Terraform은 [Hashicorp](https://www.hashicorp.com/ko)라는 회사에서 개발된 IaC 도구이다. HCL(HashiCorp configuration language)이라는 독자적 언어를 사용한다.

내가 Terraform을 선택한 몇몇가지 이유들이다.

1. 커뮤니티가 되게 활발한 것
2. 독자적인 언어이지만 이해하기 쉬운 가독성 높은 언어인 것
3. 필요한 리소스 생성에 대한 레퍼런스를 쉽게 찾을 수 있는 것
4. (아마 가장 큰 이유) 최근 회사에서 도입을 진행하면서 사용했었던 것

뭐 이러한 이유로 인해서 나는 IaC로 Terraform을 사용하기로 했다.

### How to CI/CD

Terraform을 사용할 때 고민했던 것이 권한관리 및 CI/CD이다.

1. Terraform으로 IaC를 사용하려면 거의 최고 권한자인 Administrator에 준하는 권한이 필요하다.
   1. 생성, 삭제, 수정이 모든 AWS 리소스들에 대해서 가능해야되기 때문이다.
2. 이러한 권한 그냥 아무 유저 혹은 아무 Role에게나 부여할 수 없다.
   1. 개인 프로젝트이긴 하지만, 혹시나 만약 내 정보가 탈취가 된다거나 나중에 협업을 진행하게 된다면 이 부분은 큰 문제로 작용될 것이다.

### Terraform Cloud

그래서 나는 Terraform에서 제공해주는 Terraform Cloud를 통해서 CI/CD를 구축했다.

#### Terraform Cloud 계정 생성

일단 Terraform Cloud는 Hashicorp 계정으로 바로 로그인을 할 수 있다. Hashicorp 계정은 Github을 통해 OAuth2 인증이 가능하다.

당연히 개발자들의 모든 연결고리가 되는 계정인 Github이 있기 때문에 바로 Github을 통해서 계정을 생성했다.

| Terraform cloud login                                                                    | Hashcorp Login                                                               |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ![terraform-cloud-login](/images/posts/contents/apply-aws-iac/terraform-cloud-login.png) | ![hashicorp-login](/images/posts/contents/apply-aws-iac/hashicorp-login.png) |

#### AWS IAM Role 생성 및 Terraform Cloud 연동

AWS의 리소스 생성과 사용에 대한 모든 관리는 AWS IAM을 통해 권한관리를 한다.

Terraform Cloud 역시 AWS의 리소스 생성을 하려면 AWS IAM을 사용해야된다.

- AWS IAM OpenID Connect 생성
  ![aws-iam-terraform-openid-connect](/images/posts/contents/apply-aws-iac/aws-iam-terrafom-openid-connect.png)
- IAM Role 생성 및 Trust Relationship
  ![aws-iam-role-terraform-tr](/images/posts/contents/apply-aws-iac/aws-iam-role-terraform-tr.png)
- Terraform Cloud Workspace Variable 추가
  ![terraform-cloud-variables](/images/posts/contents/apply-aws-iac/terraform-cloud-variables.png)

#### Terraform Cloud VCS Github Repository 연결

위에서 말했 듯이 Terraform은 Code를 통해서 Infra를 관리한다. 즉, 기본적으로 Code가 관리되어야한다.

우리는 코드를 관리하는 가장 혁신적인 도구인 Git을 사용하고 있고 Github를 통해서 공유하고 관리할 수 있다.

Terraform은 Github를 사용해서 VCS를 진행할 수 있으며 IaC 코드가 관리되는 Repository를 연결해서 Code를 가져와서 provisioning 할 수 있다.

![terraform-cloud-vcs](/images/posts/contents/apply-aws-iac/terraform-cloud-vcs.png)

#### Infra 구축

이제 연동 준비는 모두 끝났으니 간단하게 VPC와 subnet, 라우팅 테이블들을 만들어보자

- vpc

  ```hcl
  resource "aws_vpc" "main" {
    cidr_block = var.cidr

    enable_dns_hostnames = true
    enable_dns_support   = true

    tags = {
      Name = "${var.name.vpc}"
    }
  }
  ```

- subnet

  ```hcl
  data "aws_availability_zones" "available" {
    state = "available"
  }

  locals {
    az = data.aws_availability_zones.available.names
  }

  resource "aws_subnet" "public" {
    vpc_id = aws_vpc.main.id
    count  = length(var.subnet_cidr.public)

    cidr_block        = var.subnet_cidr.public[count.index]
    availability_zone = local.az[count.index % var.availability_zone_count]

    map_public_ip_on_launch = true

    tags = {
      "kubernetes.io/role/elb" = 1
      Name                     = "${var.name.vpc}-${var.name.public_subnet}-${format("%02s", count.index)}-${local.az[count.index % var.availability_zone_count]}"
    }
  }
  ```

- routing table

  ```hcl
  resource "aws_route_table" "public" {
    vpc_id = aws_vpc.main.id

    route {
      cidr_block = "0.0.0.0/0"
      gateway_id = aws_internet_gateway.igw.id
    }

    tags = {
      Name = "${var.name.vpc}-${var.name.public_route_table}"
    }
  }
  ```

## Result

작성한 Code를 push하면 Planning을 하고 위에서 설정한 Base Branch에 머지가 되면 Planed & Apply를 진행한다.

사진은 기존 terraform cloud로 vpc를 생성했던 이력이 없어서 다른 Planned 기록과 Applied 기록을 가져왔다.

### Planed

![terraform-plan](/images/posts/contents/apply-aws-iac/terraform-plan.png)

### Applied

![terraform-apply](/images/posts/contents/apply-aws-iac/terraform-apply.png)

### AWS Console Result

이제 정상적으로 AWS에 VPC가 생성되었는지 확인해보면 아래처럼 내가 설정한 형태로 Provisioning 되어 있는 것을 볼 수 있다.

![aws-provision-result](/images/posts/contents/apply-aws-iac/aws-provision-result.png)

## Finished

AWS에 대해서는 이전 블로그에서 간단하게 설명했었다.

하지만 console을 통해서 일일이 관리하다보니 내가 언제 생성했었는지도 모르는 리소스가 계속 남아있고 또 어딘가에서 비용을 계속 잡아먹고 있지만 찾지 못하는 그런 리소스들이 하나둘 생기기 시작했다.

IaC라는 형태의 Cloud Infra 관리 방법을 알게 되면서 관리되지 않는 리소스는 없게 되었고 git commit 이력을 통해서 어떤 변경사항이 있었는지 모두 확인할 수 있게 되어 Cloud Infra 관리가 더 수월해졌다.

IaC라는 기술이 다른 형태로도 제공이 되는 도구도 있어서 조금 더 공부하고 적용해보려고 한다.
