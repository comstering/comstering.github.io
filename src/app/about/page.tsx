import React from "react";
import { ExternalLink, GraduationCap, Award } from "lucide-react";
import {
  SiGithub,
  SiAmazon,
  SiApachekafka,
  SiDocker,
  SiKotlin,
  SiKubernetes,
  SiSpringboot,
  SiTerraform,
} from "react-icons/si";
import Bio from "@/components/Bio";
import { Experience, ExperienceItem } from "@/components/ExperienceItem";
import { Activity, ActivityCard } from "@/components/ActivityCard";
import Link from "next/link";

const About = () => {
  const experiences: Experience[] = [
    {
      company: "CJ Olive Young",
      period: "2024.06 – Present",
      projects: [
        {
          title: "Argo Workflow 기반 CI/CD 파이프라인 고도화",
          description:
            "GitOps 기반의 선언적 워크플로우 관리 체계를 구축하여 배포 자동화 및 안정성을 향상",
          period: "2025.12 – 2026.02",
          points: [
            "Argo Workflows를 활용한 복잡한 배치 작업 및 데이터 파이프라인 오케스트레이션 구현",
            "Kubernetes-native 워크플로우 엔진 도입으로 리소스 활용률 40% 개선",
            "DAG(Directed Acyclic Graph) 기반 병렬 처리로 작업 실행 시간 평균 60% 단축",
            "워크플로우 템플릿 표준화를 통한 재사용성 향상 및 개발 생산성 증대",
          ],
        },
        {
          title: "Cloudflare 전환을 통한 CDN/보안 인프라 최적화",
          description:
            "글로벌 CDN 성능 향상 및 DDoS/WAF 보안 강화를 위해 AWS CloudFront에서 Cloudflare로 완전 전환",
          period: "2025.11 – 2026.02",
          points: [
            "Cloudflare CDN 도입으로 글로벌 콘텐츠 전송 속도 평균 35% 개선 (TTFB 기준)",
            "Cloudflare WAF 규칙 최적화를 통한 월평균 200만 건 이상의 악성 요청 차단",
            "Blue-Green 전환 전략 수립으로 다운타임 없이 CloudFront → Cloudflare 마이그레이션 완료",
            "Root domain의 Cloudflare 프록시 적용을 위한 CNAME Flattening 및 DNS 아키텍처 재설계",
            "Cloudflare Workers를 활용한 엣지 컴퓨팅 기반 요청 라우팅 및 캐싱 전략 구현",
          ],
        },
        {
          title: "Okta SSO 기반 통합 인증 체계 구축",
          description:
            "제로 트러스트 보안 모델 구현을 위해 Okta SSO를 중심으로 한 사내 통합 인증 인프라를 구축하고 기존 시스템과 원활히 연동",
          period: "2025.11 – 2026.01",
          points: [
            "30+ SaaS 애플리케이션에 Okta SSO 연동 완료, 평균 로그인 시간 70% 단축",
            "Keycloak과 Okta 간 SAML 2.0 기반 페더레이션 구성으로 레거시 시스템 통합 인증 달성",
            "AWS Identity Center 연동을 통한 AWS 계정 접근 통제 및 임시 자격 증명 기반 보안 강화",
            "개인별 IAM User 150+ 계정을 Okta SSO 기반 역할별 권한 관리 체계로 전환하여 보안 감사 추적성 100% 확보",
            "MFA(Multi-Factor Authentication) 의무화로 계정 탈취 위험 95% 감소",
          ],
        },
        {
          title: "Kubernetes Operator Pattern 기반 자동화 플랫폼 구축",
          description:
            "커스텀 Kubernetes Operator 개발을 통해 복잡한 애플리케이션 라이프사이클 관리 자동화 및 운영 효율성 극대화",
          period: "2025.06 – 2025.06",
          points: [
            "Operator SDK(Go 기반)를 활용한 Custom Controller 개발로 수동 작업 80% 자동화",
            "CRD(Custom Resource Definition) 설계를 통한 선언적 리소스 관리 체계 확립",
            "Reconciliation Loop 최적화로 평균 리소스 수렴 시간 5초 이내 달성",
            "Operator 기반 Self-Healing 메커니즘 구현으로 장애 복구 시간(MTTR) 90% 감소",
          ],
        },
        {
          title: "Keycloak 기반 엔터프라이즈 인증/인가 시스템 구축",
          description:
            "마이크로서비스 아키텍처 환경에서 OAuth 2.0/OIDC 기반의 중앙 집중식 Identity & Access Management 시스템 구축",
          period: "2025.06 – 2025.06",
          points: [
            "Keycloak Operator를 활용한 HA(High Availability) 클러스터 구성으로 99.9% 가용성 달성",
            "Terraform 기반 IaC(Infrastructure as Code)로 Realm, Client, Role 설정 자동화",
            "JWT 토큰 기반 Stateless 인증 구조 설계로 초당 5,000+ TPS 인증 처리 성능 확보",
            "Fine-grained Authorization 정책 구현으로 서비스별 세밀한 접근 제어 체계 구축",
          ],
        },
        {
          title: "VPC Peering 전환을 통한 네트워크 성능 최적화 및 비용 절감",
          description:
            "Transit Gateway 기반 허브-스포크 아키텍처의 한계를 극복하기 위해 VPC Peering 기반 메시 네트워크로 전환",
          period: "2025.09 – 2025.10",
          points: [
            "TGW 병목 구간 제거로 서비스 간 통신 레이턴시 평균 45% 감소 (150ms → 82ms)",
            "VPC Peering 직접 연결을 통한 네트워크 홉(hop) 수 감소로 패킷 손실률 0.1% 미만 유지",
            "TGW 데이터 처리 비용 제거로 월간 네트워크 비용 약 50% 절감 (약 $3,000 → $1,500)",
            "Terraform 모듈화를 통한 Peering 연결 자동화로 신규 VPC 추가 시간 90% 단축",
          ],
        },
        {
          title: "AWS EKS 네트워킹 아키텍처 고도화",
          description:
            "Pod IP 고갈 문제 및 VPC CNI의 iptables 성능 한계를 극복하기 위해 Custom Networking과 Cilium CNI 도입",
          period: "2025.06 – 2025.06",
          points: [
            "VPC Secondary CIDR(100.64.0.0/16) 할당 및 EKS Custom Networking 구성으로 Pod IP 풀 500개 → 16,000개로 32배 확장",
            "Cilium의 eBPF 기반 커널 바이패스 네트워킹으로 Pod 간 통신 레이턴시 30% 개선 및 CPU 사용률 20% 절감",
            "VPC CNI와 Cilium CNI Chaining 구성으로 기존 Pod IP 유지하며 무중단 전환 완료",
            "Cilium Network Policy를 활용한 Layer 7 기반 세밀한 트래픽 제어 및 보안 강화",
            "Hubble UI 통합으로 서비스 메시 수준의 네트워크 가시성 확보",
          ],
        },
        {
          title: "Temporal 기반 분산 워크플로우 엔진 구축",
          description:
            "대규모 마이크로서비스 환경에서 복잡한 비즈니스 트랜잭션 및 Saga 패턴 구현을 위해 Temporal Workflow Engine 도입",
          period: "2025.05 – 2026.03, 2026.01 – 2026.02",
          points: [
            "Self-hosted Temporal Cluster 구축으로 SaaS 대비 연간 약 $50,000 비용 절감",
            "Kubernetes StatefulSet 기반 HA 구성으로 워크플로우 처리 가용성 99.95% 달성",
            "PostgreSQL vs MySQL 벤치마킹 수행 (10,000 TPS 부하 테스트) 후 최적 데이터베이스 선정",
            "Rainbow Deployment 패턴 설계로 워크플로우 코드 버전 간 호환성 보장 및 무중단 배포 구현",
            "Workflow Versioning 및 Activity Retry 정책 최적화로 장기 실행 프로세스 안정성 확보",
            "Temporal Web UI 커스터마이징 및 Grafana 대시보드 구축으로 워크플로우 모니터링 체계 확립",
          ],
        },
        {
          title: "Istio Service Mesh 기반 Zero Trust 보안 아키텍처 구현",
          description:
            "마이크로서비스 간 East-West 트래픽에 대한 mTLS 암호화 및 세밀한 인가 정책 적용",
          period: "2025.05 – 2025.05",
          points: [
            "Istio Sidecar Proxy 기반 자동 mTLS 암호화로 서비스 간 통신 100% 암호화 달성",
            "AuthorizationPolicy를 통한 JWT Claims 기반 서비스 간 접근 제어 구현",
            "RBAC(Role-Based Access Control) 정책 적용으로 최소 권한 원칙(Principle of Least Privilege) 준수",
            "Istio Ingress Gateway 최적화로 외부 트래픽 TLS Termination 성능 개선",
          ],
        },
        {
          title: "Kafka 에코시스템 안정성 및 운영 효율성 강화",
          description:
            "Kafka 클러스터 및 Connect 시스템의 안정성을 높이고, 실시간 CDC 파이프라인 구축을 통한 데이터 동기화 자동화",
          period: "2025.04 – 2025.10",
          points: [
            "Strimzi Kafka Operator 도입으로 Kafka Connect Cluster 재시작 시간 80% 단축 및 자동 복구 체계 구축",
            "Kafbat UI(구 Kafka UI) 커스터마이징 및 오타 버그 수정 기여로 오픈소스 컨트리뷰션 완료",
            "Confluent Schema Registry Helm Chart 개선 PR 제출 및 머지 (커뮤니티 기여)",
            "Debezium Kafka Connect를 활용한 CDC(Change Data Capture) 파이프라인 구축으로 실시간 데이터 동기화 지연 시간 3초 이내 달성",
            "Kafka Consumer Lag 모니터링 및 알람 체계 구축으로 데이터 유실 사전 방지",
          ],
        },
        {
          title: "Spring Cloud Data Flow 기반 배치 작업 통합 관리 플랫폼 구축",
          description:
            "Spring Batch Job의 중앙 집중식 관리 및 스케줄링을 위해 Kubernetes 환경에서 SCDF 도입",
          period: "2025.03 – 2025.04",
          points: [
            "SCDF Server 및 Skipper 서버 HA 구성으로 배치 작업 관리 시스템 가용성 확보",
            "20+ Spring Batch Job을 SCDF로 마이그레이션하여 통합 모니터링 및 로깅 체계 구축",
            "Kubernetes CronJob 대비 복잡한 Job 의존성 관리 및 재시도 로직 구현 용이성 향상",
            "SCDF Dashboard를 통한 배치 작업 실행 이력 및 성능 메트릭 시각화",
          ],
        },
        {
          title: "Event-Driven Architecture 기반 Kafka 메시징 시스템 구축",
          description:
            "마이크로서비스 간 비동기 통신 및 이벤트 기반 아키텍처 구현을 위한 엔터프라이즈급 Kafka 플랫폼 구축",
          period: "2024.07 – 2024.10",
          points: [
            "AWS MSK(Managed Streaming for Kafka) 3-broker 클러스터 구성으로 초당 50,000+ 메시지 처리 성능 확보",
            "Kafka Connect 기반 CDC 환경 구축으로 데이터베이스 변경 이벤트 실시간 스트리밍",
            "Transactional Outbox Pattern 아키텍처 설계 및 구현으로 분산 트랜잭션 일관성 보장",
            "커스텀 SMT(Single Message Transform) 개발로 Outbox 메시지 자동 변환 및 라우팅 구현",
            "CloudEvents 스펙 기반 Schema Registry 구축으로 이벤트 메시지 표준화 및 버전 관리 체계 확립",
            "공통 Kafka Producer/Consumer 라이브러리 개발로 개발 생산성 40% 향상 및 코드 중복 제거",
          ],
        },
        {
          title: "Cloud Native 인프라 구축 및 MSA 전환 프로젝트",
          description:
            "신규 마이크로서비스 아키텍처 시스템을 위한 Kubernetes 기반 클라우드 네이티브 인프라 설계 및 구축",
          period: "2024.07 – 2025.02",
          points: [
            "Multi-AZ VPC 네트워크 아키텍처 설계 (Public/Private/Data 서브넷 3-tier 구조)",
            "EKS 1.28 클러스터 구축 및 Karpenter 기반 Auto Scaling 구성으로 노드 프로비저닝 시간 70% 단축",
            "Istio Service Mesh 1.20 도입으로 서비스 간 통신 가시성 확보 및 트래픽 관리 체계 구축",
            "GitHub Actions 기반 CI/CD 파이프라인 구축 및 ARC(Actions Runner Controller) Self-hosted Runner 운영으로 빌드 비용 월 60% 절감",
            "ArgoCD GitOps 배포 자동화로 배포 리드타임 평균 20분 → 3분으로 단축",
          ],
        },
        {
          title: "보안 및 운영 효율성 개선 프로젝트",
          description: "보안 강화 및 인프라 운영 최적화를 위한 다양한 개선 작업 수행",
          period: "2024.07 – 2025.12",
          points: [
            "AWS KMS Envelope Encryption 아키텍처 구현으로 민감 데이터 암호화 및 키 관리 자동화 (2025.12)",
            "External Secrets Operator 도입으로 Kubernetes Secret과 AWS Secrets Manager 동기화 자동화, 시크릿 로테이션 프로세스 구축 (2025.08)",
            "ECR Pull Through Cache 설정으로 Docker Hub Rate Limit 문제 해결 및 이미지 Pull 시간 50% 단축, 네트워크 전송 비용 월 30% 절감 (2025.02)",
            "Braze 이메일 발송 인프라 구축 및 Route53 SPF/DKIM 레코드 관리로 이메일 전송 성공률 98% 이상 유지 (2025.01)",
          ],
        },
      ],
    },
    {
      company: "CLASS 101",
      period: "2022.05 – 2024.03",
      projects: [
        {
          title: "통합 인증 시스템 재구축 (Rebuild Auth)",
          description:
            "레거시 모놀리식 인증 시스템을 MSA 환경에 적합한 중앙 집중식 인증 서비스로 전면 재설계",
          period: "2023.10 – 2024.03",
          points: [
            "OAuth 2.0/OIDC 기반 소셜 로그인 통합 인터페이스 설계 및 구현 (Google, Kakao, Naver, Apple 4개 제공자 지원)",
            "JWT 기반 Stateless 인증 아키텍처로 세션 서버 부하 80% 감소 및 수평 확장성 확보",
            "Kubernetes 배포 파이프라인 구축 (Helm Chart, ArgoCD) 및 Blue-Green 배포 전략 적용",
            "일일 평균 15만 건 이상의 인증 요청 안정적 처리 및 99.9% 가용성 달성",
          ],
        },
        {
          title: "프로모션 인증 코드 시스템 구축",
          description:
            "난수 기반 일회성 프로모션 코드 발급 및 검증 시스템을 설계하여 마케팅 캠페인 지원",
          period: "2023.09 – 2023.10",
          points: [
            "고유성 보장 난수 생성 알고리즘 설계 (Collision 확률 0.001% 미만)",
            "Redis 기반 분산 락을 활용한 동시성 제어로 중복 사용 방지",
            "프로모션 코드 검증 API 평균 응답 시간 50ms 이내 최적화",
            "배치 코드 생성 시스템 구축으로 10만 개 코드 생성 시간 5분 이내 달성",
          ],
        },
        {
          title: "회원 탈퇴 프로세스 개선 및 GDPR 준수 체계 구축",
          description:
            "개인정보 보호 규정 준수 및 사용자 경험 개선을 위한 탈퇴 프로세스 전면 재설계",
          period: "2023.06 – 2024.01",
          points: [
            "탈퇴 요청 비동기 처리 파이프라인 설계로 즉시 탈퇴 처리 시간 90% 단축",
            "Kafka 이벤트 기반 데이터 삭제 워크플로우 구축으로 관련 시스템 자동 연동",
            "탈퇴 사유 수집 및 분석 대시보드 구축으로 이탈률 개선 인사이트 제공",
            "이메일/SMS 자동 알림 시스템 통합으로 고객 커뮤니케이션 품질 향상",
          ],
        },
        {
          title: "글로벌 성인 인증 시스템 리뉴얼",
          description:
            "국내외 사용자 대상 연령 확인 프로세스를 재구축하여 법적 요구사항 충족 및 사용자 편의성 개선",
          period: "2023.04 – 2023.06",
          points: [
            "국내 PG사 휴대폰 본인인증 API 연동으로 실시간 성인 인증 구현",
            "해외 사용자 대상 신용카드 기반 연령 확인 시스템 구축 (Stripe 연동)",
            "다국가 법규 준수를 위한 지역별 인증 정책 엔진 설계 및 적용",
            "인증 성공률 모니터링 대시보드 구축 (평균 성공률 95% 이상 유지)",
          ],
        },
        {
          title: "HR 연동 직원 관리 시스템 (Employee Service) 구축",
          description:
            "FLEX HR 시스템과 연동하여 사내 직원 및 조직 정보를 실시간 동기화하는 내부 서비스 개발",
          period: "2022.10 ~ 2023.01",
          points: [
            "정규화된 직원/부서 데이터 모델 설계 및 PostgreSQL 스키마 구축",
            "FLEX API 연동 일배치 작업 개발로 직원 정보 자동 동기화 (오차율 0.1% 미만)",
            "Kubernetes CronJob 기반 배치 스케줄링 및 실패 시 Slack 알림 시스템 구축",
            "Helm Chart 작성 및 ArgoCD 배포 자동화로 배포 시간 70% 단축",
          ],
        },
        {
          title: "CLASS101+ 구독 앱 런칭 프로젝트",
          description:
            "구독 비즈니스 모델 전환에 맞춘 React Native 기반 모바일 앱 인증 프로세스 재구축",
          period: "2022.07 – 2022.08",
          points: [
            "React Native 기반 OAuth 2.0 소셜 로그인 플로우 구현 (iOS/Android 동시 지원)",
            "생체 인증(Face ID/Touch ID) 연동으로 앱 재접속 편의성 개선",
            "JWT 토큰 갱신 로직 최적화로 사용자 세션 만료로 인한 이탈률 40% 감소",
            "앱 런칭 후 첫 주 가입자 10,000+ 명 안정적 처리",
          ],
        },
        {
          title: "플랫폼 안정성 및 컴플라이언스 개선 작업",
          description: "서비스 품질 향상 및 외부 정책 준수를 위한 인프라 개선 작업",
          period: "2022.07 – 2024.01",
          points: [
            "Gmail Sender Guidelines 준수를 위한 SPF/DKIM/DMARC 레코드 설정 및 이메일 발송 도메인 평판 관리 (2024.01)",
            "Spring Boot 2.3.3 → 3.2.0 메이저 업그레이드 및 JDK 11 → 17 마이그레이션 완료, 애플리케이션 성능 15% 개선 (2023.11)",
            "모노레포 내 Pair Web 프로젝트 추가 및 Drone CI/CD 파이프라인 구축으로 빌드 자동화 달성 (2022.07)",
          ],
        },
      ],
    },
  ];

  const activities: Activity[] = [
    {
      type: "Open Source",
      title: "Schema Registry helm chart contribution",
      period: "2025.08",
      description:
        "SASL_SSL 인증 과정에서 mTLS 인증이 필수인 부분을 선택적으로 변경하는 데 기여했습니다.",
      tags: ["kubernetes", "helm", "kafka", "schema-registry"],
      link: "https://github.com/bitnami/charts/pull/35772",
    },
    {
      type: "Open Source",
      title: "kafbat-ui contribution",
      period: "2025.07",
      description:
        "kafbat-ui의 일부 문구를 수정하여 UX를 개선하는 데 기여했습니다.",
      tags: ["react", "typescript", "kafka", "kafka-ui"],
      link: "https://github.com/kafbat/kafka-ui/pull/1205",
    },
    {
      type: "Project",
      title: "Lomeone",
      period: "2024.01 – Present",
      description:
        "개인 Side Project를 진행하는 organization. Infrastructure를 AWS로 구축하고 Terraform을 사용하여 IaC를 적용해서 Infrastructure를 관리하고 있습니다.",
      tags: ["aws", "terraform", "kubernetes", "project"],
      link: "https://github.com/lomeone",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-24 pb-32">
      {/* Main Banner */}
      <Bio />

      {/* Tech Stack Sections */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Tech Stack
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-10 bg-sky-50/30 dark:bg-sky-900/5 rounded-[40px] border border-sky-100/50 dark:border-sky-900/20 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-500/30">
                <SiKubernetes className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-sky-900 dark:text-sky-100 tracking-tight">
                Cloud & Infrastructure
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={"https://aws.amazon.com"}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#FF9900] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <SiAmazon className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  AWS
                </span>
              </Link>

              <Link
                href={"https://www.terraform.io"}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#7B42BC] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <SiTerraform className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Terraform
                </span>
              </Link>

              <Link
                href={"https://kubernetes.io"}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-sky-500 border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <SiKubernetes className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Kubernetes
                </span>
              </Link>

              <Link
                href={"https://www.docker.com"}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#2496ED] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <SiDocker className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Docker
                </span>
              </Link>

              <Link
                href={"https://kafka.apache.org"}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#231F20] border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <SiApachekafka className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Kafka
                </span>
              </Link>
            </div>
          </div>

          <div className="p-10 bg-indigo-50/30 dark:bg-indigo-900/5 rounded-[40px] border border-indigo-100/50 dark:border-indigo-900/20 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
                <SiSpringboot className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-indigo-900 dark:text-indigo-100 tracking-tight">
                Backend Engineering
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={"https://kotlinlang.org"}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#7F52FF] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <SiKotlin className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Kotlin
                </span>
              </Link>

              <Link
                href={"https://spring.io/projects/spring-boot"}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#6DB33F] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <SiSpringboot className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Spring Boot
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Professional Experience
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto py-8">
          {experiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>
      </section>

      {/* Development Activities Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Development Activities
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            오픈소스 기여 및 사이드 프로젝트를 통해 꾸준히 성장하고 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {activities.map((activity, idx) => (
            <ActivityCard key={idx} {...activity} />
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="https://github.com/comstering"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-black text-sm tracking-widest hover:bg-sky-500 dark:hover:bg-sky-500 dark:hover:text-white transition-all shadow-xl shadow-gray-500/20 group"
          >
            <SiGithub className="w-5 h-5" />
            VIEW ALL CONTRIBUTIONS
            <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Education
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900/40 p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="p-4 bg-sky-50 dark:bg-sky-900/20 text-sky-500 rounded-3xl">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="flex-grow space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  공주대학교 (Kongju National University)
                </h3>
                <p className="text-sky-500 font-extrabold tracking-wider uppercase text-sm">
                  Computer Science
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                Bachelor of Engineering (B.E.) | 2016.03 - 2022.02
              </p>
              <div className="pt-2">
                <p className="text-sm text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter mb-2">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {[
                    "Data Structures",
                    "Algorithms",
                    "Database Design",
                    "Computer Networks",
                    "Software Engineering",
                    "Security",
                  ].map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg border border-gray-100 dark:border-gray-700"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Certifications
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            // {
            //   title: "AWS Solutions Architect",
            //   issuer: "Amazon Web Services",
            //   date: "2023.05",
            // },
            // {
            //   title: "CKA (Kubernetes Administrator)",
            //   issuer: "Cloud Native Computing Foundation",
            //   date: "2023.11",
            // },
            {
              title: "정보처리기사 (Engineer Information Processing)",
              issuer: "HRDK",
              date: "2021.06",
            },
            {
              title:
                "정보보안산업기사 (Industrial Engineer Information Security)",
              issuer: "KISA",
              date: "2021.06",
            },
          ].map((cert, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900/40 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 flex items-center gap-4 hover:shadow-lg transition-all border-l-4 border-l-sky-500"
            >
              <Award className="w-8 h-8 text-sky-500 shrink-0" />
              <div>
                <h4 className="font-black text-gray-900 dark:text-white leading-tight">
                  {cert.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                  {cert.issuer}
                </p>
                <p className="text-[10px] font-black text-sky-500 mt-1">
                  {cert.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Experience Section */}
      <section className="space-y-16 pb-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Other Experience
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ActivityCard
            type="Other"
            title="BoB 10기"
            period="2021.07 – 2022.03"
            tags={["security"]}
            description="보안제품개발트랙에 참여하여 Host 기반 네트워크 제어 솔루션(ARP Spoofing 기반 네트워크 관제도구)을 개발했습니다. (Top 30)"
            link="https://www.kitribob.kr/trainee_walk/projects"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
