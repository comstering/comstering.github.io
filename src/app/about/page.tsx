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
          title:
            "Temporal Workflow Engine 기반 비즈니스 트랜잭션 프로세스 관리 시스템 구축",
          description:
            "대규모 분산 시스템에서의 복잡한 비즈니스 트랜잭션 관리를 위해 Temporal Workflow Engine을 도입하여 안정적이고 확장 가능한 프로세스 관리 시스템을 구축",
          period: "2025.11 – 2026.02",
          points: [
            "Cadence에서 파생된 Temporal Workflow Engine 도입",
            "Self-hosted Temporal Cluster 구축 및 운영 -> 비용 절감 및 커스터마이징 용이",
            "Kubernetes 환경에서 고가용성 Temporal Cluster 운영",
            "Rainbow Deployment 전략을 적용하기 위한 Worker 시스템 설계",
            // "Rainbow Deployment 전략을 통한 Worker 멀티버전 배포 구현 -> Temporal Workflow Deployment 기능 활용 (~~ ing)",
          ],
        },
        {
          title: "Cloudflare 도입",
          description:
            "CDN 성능향상 및 WAF 안정성을 위해 Cloudflare를 도입하고 기존 AWS CloudFront에서 Cloudflare로 전환",
          period: "2025.11 – 2026.02",
          points: [
            "Cloudflare CDN을 통한 글로벌 콘텐츠 전송 최적화",
            "Cloudflare WAF를 통한 웹 애플리케이션 보안 강화",
            "기존 AWS CloudFront에서 Cloudflare로 원활한 전환 작업 수행 -> 장애발생 없이 전환 완료",
            "root domain 대상 Cloudflare 도입을 위한 DNS 관리 체계 개선",
          ],
        },
        {
          title: "Okta SSO 도입",
          description:
            "Okta를 도입하여 사내 SSO(Single Sign-On) 환경을 구축하고, 기존 사내 인증 시스템과 연동하여 통합 인증 체계를 마련",
          period: "2025.11 – 2026.01",
          points: [
            "기존 TGW 아키텍처의 네트워크 병목 현상 및 지연 시간 문제 해결",
            "VPC Peering을 통한 직접 연결로 네트워크 성능 향상",
            "월간 약 50%의 네트워크 비용 절감 효과 달성",
          ],
        },
        {
          title: "Keycloak 기반 인증 시스템 구축",
          description:
            "Keycloak을 도입하여 마이크로서비스 아키텍처 환경에서의 통합 인증 시스템을 구축",
          period: "2025.06 – 2025.06",
          points: [
            "Keycloak Operator를 이용한 Kubernetes Operator 기반 Keycloak 클러스터 구축",
            "Terraform을 이용한 Keycloak 인프라 및 설정 코드화",
          ],
        },
        {
          title: "VPC Peering 전환",
          description:
            "TGW 기반의 VPC 네트워크 아키텍처를 VPC Peering 기반으로 전환하여 네트워크 성능 향상 및 비용 절감",
          period: "2025.06 – 2025.06",
          points: [
            "기존 TGW 아키텍처의 네트워크 병목 현상 및 지연 시간 문제 해결",
            "VPC Peering을 통한 직접 연결로 네트워크 성능 향상",
            "월간 약 50%의 네트워크 비용 절감 효과 달성",
          ],
        },
        {
          title: "AWS EKS 고도화",
          description:
            "Pod IP 부족 문제 및 VPC CNI의 iptables 성능 이슈 문제를 AWS EKS Custom Networking과 Cilium CNI를 통해 해결",
          period: "2025.06 – 2025.06",
          points: [
            "AWS VPC Secondary CIDR과 EKS Custom Networking을 통해 Pod IP 전용 CIDR Block을 할당하여 Pod IP 부족 문제 해결",
            "500개 정도 사용가능하던 Pod IP를 16,000개 이상으로 약 30배 이상 확장",
            "Cilium CNI의 eBPF 기반 네트워킹을 통해 VPC CNI의 iptables 성능 이슈 해결",
            "기존 VPC CNI과 Cilium CNI의 Chaining을 통해 기존 Pod IP를 유지하면서 Cilium CNI로 전환",
          ],
        },
        {
          title: "SCDF 도입 및 구축",
          description:
            "조직 내에서 Spring Batch를 주된 Batch 시스템으로 사용하고 있어서 Spring Cloud Dataflow를 도입하여 Batch Job 관리를 통합하여 관리",
          period: "2025.03 – 2025.04",
          points: [
            "k8s 환경에서 SCDF 설치 및 배포",
            "AWS Managed Airflow인 MWAA를 Deprecate하여 비용 절감",
            "기존 Airflow보다 직관적인 Spring Batch Job 관리",
          ],
        },
        {
          title: "Kafka System 구축",
          description:
            "내부 시스템 간의 데이터 전송을 위한 Kafka 시스템을 구축하였습니다.",
          period: "2024.07 – 2024.10",
          points: [
            "MSK, Kafka Connect, Schema Registry 등의 Kafka 시스템 구축",
            "Kafka Connect를 이용한 CDC 환경 구축",
            "Business logic Transaction 보장을 위한 Outbox 시스템 구축",
            "공통된 messaging format을 위해 Cloud Event를 기반으로한 Schema Registry 구축",
            "Kafka Producer/Consumer를 위한 공통 라이브러리 개발",
          ],
        },
        {
          title: "Cloud Native Infra 구축 및 Migration",
          description:
            "신규 MSA 시스템을 위한 Network, kubernetes 등의 Cloud Native Infra 구축을 진행했습니다.",
          period: "2024.07 – 2025.02",
          points: [
            "VPC Subnet 구성 및 설계",
            "EKS Cluster 구축 및 운영",
            "Istio Service Mesh 구축 및 운영",
            "Github Action CI/CD 파이프라인 구축 -> ARC Runner 기반 Self-hosted Runner 운영을 통한 비용 절감",
          ],
        },
        {
          title: "기타 작업",
          description: "",
          period: "",
          points: [
            "Braze Sender Email 적용 (2025.01): Braze Sender Email 적용 및 Route53 Record 관리",
          ],
        },
      ],
    },
    {
      company: "CLASS 101",
      period: "2022.05 – 2024.03",
      projects: [
        {
          title: "Rebuild Auth",
          description: "CLASS 101의 인증을 통합하는 인증 서비스입니다.",
          period: "2023.10 – 2024.03",
          points: [
            "배포 파이프라인 구축",
            "소셜 OAuth 인증 공통 interface 설계 및 구현",
            "인증 API 구현",
          ],
        },
        {
          title: "프로모션 코드 인증 (2023.09 – 2023.10)",
          description:
            "난수코드를 이용한 인증을 통해 프로모션 결제를 할 수 있는 인증 시스템입니다.",
          period: "2023.09 – 2023.10",
          points: ["프로모션 코드 인증 설계 및 개발"],
        },
        {
          title: "탈퇴 프로세스 개선",
          description: "회원 탈퇴 시 데이터 처리 및 UX를 개선하였습니다.",
          period: "2023.06 – 2024.01",
          points: ["탈퇴 요청 파이프라인 재설계", "관련 알림/로그 연동 자동화"],
        },
        {
          title: "성인인증 Renewer",
          description: "글로벌 유저의 성인인증을 위해 기능을 Renewer",
          period: "2023.04 – 2023.06",
          points: [
            "PG사 휴대폰 본인인증을 통한 성인인증 기능 개발",
            "한국 region 외의 타 region 대상 성인인증 기능 개발",
          ],
        },
        {
          title: "Employee Service",
          description:
            "HR 서비스로 사용하고 있던 FLEX 서비스와 연동하여 사내 직원 정보를 관리하기 위한 서비스입니다.",
          period: "2022.10 ~ 2023.01",
          points: [
            "직원 및 부서 정보 관리 DB 설계",
            "FLEX 데이터 동기화를 위한 일단위 배치 작업 구현",
            "kubernetes helm chart 작성 및 배포",
          ],
        },
        {
          title: "CLASS101+ 구독 앱 런칭",
          description:
            "구독 비즈니스 전환에 맞춘 앱 Rebuilding을 진행하였습니다",
          period: "2022.07 – 2022.08",
          points: ["React Native 기반 모바일 인증 프로세스 구현"],
        },
        {
          title: "기타 작업",
          description: "",
          period: "",
          points: [
            "Gmail Sender Guideline 준수 (2024.01): 2024년 02월부터 적용된 Google 이메일 발신자 가이드라인 준수",
            "Spring Boot 3.x version Upgrade (2023.11): Spring Boot 2.3.3 → 3.2.0 upgrade 및 CI 빌드 파이프라인 JDK 버전 (11 → 17) 수정",
            "Pair Web 배포 파이프라인 구축 (2022.07): 모노레포 내 Pair Web 프로젝트 추가 및 Drone CI/CD 파이프라인 구축",
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
              <div className="flex items-center gap-2 px-4 py-2 bg-[#FF9900] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <SiAmazon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  AWS
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#7B42BC] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <SiTerraform className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Terraform
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-sky-500 border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <SiKubernetes className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Kubernetes
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#2496ED] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <SiDocker className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Docker
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#231F20] border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <SiApachekafka className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Kafka
                </span>
              </div>
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
              <div className="flex items-center gap-2 px-4 py-2 bg-[#7F52FF] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <SiKotlin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Kotlin
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#6DB33F] border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <SiSpringboot className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Spring Boot
                </span>
              </div>
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
            description="보안제품개발트랙에 참여하여 ARP Spoofing 기반 네트워크 관제도구를 개발했습니다. (Top 30)"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
