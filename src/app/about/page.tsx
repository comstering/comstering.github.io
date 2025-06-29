// src/app/about/page.tsx
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import {
  SiAmazon,
  SiApachekafka,
  SiDocker,
  SiKotlin,
  SiKubernetes,
  SiSpringboot,
  SiTerraform,
} from "react-icons/si";
import Bio from "@/components/Bio";

export const metadata: Metadata = {
  title: "About Me",
  description: "이력서 스타일의 About Me 페이지",
};

interface Experience {
  company: string;
  period: string;
  duration: string;
  projects: {
    title: string;
    description: string;
    points: string[];
  }[];
}

interface Activity {
  title: string;
  period: string;
  description: string;
  link?: string;
  linkText?: string;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string[];
}

interface OtherExperience {
  title: string;
  period: string;
  points: string[];
}

export default function AboutPage() {
  const experiences: Experience[] = [
    {
      company: "CJ Olive Young",
      period: "2024.06 –",
      duration: "~ing",
      projects: [
        {
          title: "SCDF 도입 및 구축 (2025.03 – 2025.04)",
          description:
            "조직 내에서 Spring Batch를 주된 Batch 시스템으로 사용하고 있어서 Spring Cloud Dataflow를 도입하여 Batch Job 관리를 통합하여 관리",
          points: [
            "k8s 환경에서 SCDF 설치 및 배포",
            "AWS Airflow인 MWAA를 Deprecate하여 비용 절감",
            "기존 Airflow보다 직관적인 Batch Job 관리",
          ],
        },
        {
          title: "Legacy Service Migrate (2024.12 – ~ing)",
          description:
            "외주사를 통해서 개발된 Legacy Service를 k8s 환경으로 마이그레이션 및 Seoul Region에서 N.Virginia Region으로 마이그레이션",
          points: [
            "EC2 클라우드 컴퓨팅 -> k8s 서비스 마이그레이션",
            "Aurora DB의 글로벌 Cluster를 사용한 리전 마이그레이션",
          ],
        },
        {
          title: "Kafka System 구축 (2024.07 – 2024.12)",
          description:
            "내부 시스템 간의 데이터 전송을 위한 Kafka 시스템을 구축하였습니다.",
          points: [
            "Kafka Connect를 이용한 CDC 환경 구축",
            "Business logic Transaction 보장을 위한 Outbox 시스템 구축",
            "공통된 messaging format을 위해 Cloud Event를 기반으로한 Schema Registry 구축",
            "Kafka Producer/Consumer를 위한 공통 라이브러리 개발",
          ],
        },
        {
          title: "기타 작업",
          description: "",
          points: [
            "Braze Sender Email 적용 (2025.01): Braze Sender Email 적용 및 Route53 Record 관리",
            "Schema Registry 구축 (2025.02): Kafka Schema Registry 구축 및 관리",
            "AWS SSO 적용 (2024.11): AWS SSO를 통한 IAM Role 관리 및 권한 관리?????",
          ],
        },
      ],
    },
    {
      company: "CLASS 101",
      period: "2022.05 – 2024.03",
      duration: "1년 11개월",
      projects: [
        {
          title: "Rebuild Auth (2023.10 – 2024.03)",
          description: "CLASS 101의 인증을 통합하는 인증 서비스입니다.",
          points: [
            "account-web 배포 파이프라인 구축",
            "소셜 OAuth 인증 공통 interface 설계 및 구현",
            "account-web과 연동을 위한 Back-End API 구현",
          ],
        },
        {
          title: "프로모션 코드 인증 (2023.09 – 2023.10)",
          description:
            "난수코드를 이용한 인증을 통해 프로모션 결제를 할 수 있는 인증 시스템입니다.",
          points: ["프로모션 코드 인증 설계 및 개발"],
        },
        {
          title: "탈퇴 프로세스 개선 (2023.06 – 2024.01)",
          description: "회원 탈퇴 시 데이터 처리 및 UX를 개선하였습니다.",
          points: ["탈퇴 요청 파이프라인 재설계", "관련 알림/로그 연동 자동화"],
        },
        {
          title: "성인인증 Renewer (2023.04 ~ 2023.06)",
          description: "글로벌 유저의 성인인증을 위해 기능을 Renewer",
          points: [
            "PG사 휴대폰 본인인증을 통한 성인인증 기능 개발",
            "한국 region 외의 타 region 대상 성인인증 기능 개발",
          ],
        },
        {
          title: "Employee Service (2022.10 ~ 2023.01)",
          description:
            "HR 서비스로 사용하고 있던 FLEX 서비스와 연동하여 사내 직원 정보를 관리하기 위한 서비스입니다.",
          points: [
            "직원 정보 및 부서 정보를 관리하는 DB 설계",
            "FLEX 데이터와 동기화하기 위한 일단위 배치 작업 구현",
            "k8s 배포를 위한 helm chart 작성 및 배포",
          ],
        },
        {
          title: "CLASS101+ 구독 앱 런칭 (2022.07 ~ 2022.08)",
          description: "구독 전환 시기에 맞춘 앱 Rebuilding을 진행하였습니다",
          points: ["React Native를 통한 인증 프로세스 구현"],
        },
        {
          title: "기타 작업",
          description: "",
          points: [
            "Gmail Sender Guideline 준수 (2024.01): 2024년 02월부터 적용된 Google 이메일 발신자 가이드라인 준수",
            "Spring Boot 3.x version Upgrade (2023.11): Spring Boot 2.3.3 → 3.2.0 upgrade 및 CI 빌드 파이프라인 JDK 버전 (11 → 17) 수정",
            "Pair Web 배포 파이프라인 구축 (2022.07): 모노레포에 Pair Web 프로젝트 추가 및 Drone CI/CD 파이프라인 구축",
          ],
        },
      ],
    },
  ];

  const activities: Activity[] = [
    {
      title: "Lomeone",
      period: "2024.01 – Present",
      description:
        "개인 Side Project를 진행하는 organization. Infrastructure를 AWS로 구축하고 Terraform을 사용하여 IaC를 적용해서 Infrastructure를 관리하고 있습니다.",
      link: "https://github.com/lomeone",
      linkText: "GitHub Organization",
    },
  ];

  const education: Education[] = [
    {
      institution: "공주대학교",
      degree: "컴퓨터공학부 학사",
      period: "2016.03 – 2022.02",
      details: [
        "네트워크 보안 연구실 학부연구생 (2019.03 – 2022.02)",
        "모바일 기반 암호 변환 프로그램 개발",
        "위치 데이터 기반 미아방지 프로그램 설계",
        "랩실 사무환경 IoT를 이용한 환경 개선",
      ],
    },
  ];

  const others: OtherExperience[] = [
    {
      title: "BoB 10기",
      period: "2021.07 – 2022.03",
      points: [
        "보안제품개발 트랙 참여",
        "프로젝트: ARP spoofing을 이용한 네트워크 관리 시스템",
        "Top 30 선정",
      ],
    },
  ];

  const certifications = [
    "정보처리기사 (2021.06)",
    "정보보안산업기사 (2021.06)",
    "리눅스마스터 2급 (2020.10)",
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-16">
      <header className="items-center text-center flex-col flex">
        <Bio />
      </header>

      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold border-b pb-2">Introduction</h2>
        <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-lg space-y-3">
          <p className="text-lg font-bold text-yellow-200 mb-6">
            &quot;어제보다 성장하는 개발자 최한수입니다.&quot;
          </p>
          <p className="flex items-start text-gray-800 dark:text-gray-200">
            <Lightbulb className="mr-2 mt-1" />
            새로운 지식을 배우는 것을 즐기며 다양한 경험을 추구하는
            개발자입니다.
          </p>
          <p className="pl-6 text-gray-800 dark:text-gray-200">
            요구사항을 구현하기 위한 기술, 협업에 대한 Best Practice를 찾기 위해
            노력합니다.
          </p>
          <p className="pl-6 text-gray-800 dark:text-gray-200">
            다양한 직무의 사람들과 협업할 때 의사소통에 걸림돌이 되지 않게 여러
            지식을 계속 추구하고 공부하려고 합니다.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold border-b-2 border-card pb-2 mb-6 text-foreground">
          Skills
        </h2>
        <div className="space-y-6">
          {/* Backend & Language 그룹 */}
          <div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-4">
              Backend & Language
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-[#7F52FF] text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                <SiKotlin size={18} />
                <span>Kotlin</span>
              </div>
              <div className="flex items-center gap-2 bg-[#6DB33F] text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                <SiSpringboot size={18} />
                <span>Spring Boot</span>
              </div>
            </div>
          </div>

          {/* Infra & DevOps 그룹 */}
          <div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-4">
              Infra & DevOps
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-[#FF9900] text-black px-3 py-1.5 rounded-lg text-sm font-bold">
                <SiAmazon size={18} />
                <span>AWS</span>
              </div>
              <div className="flex items-center gap-2 bg-[#7B42BC] text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                <SiTerraform size={18} />
                <span>Terraform</span>
              </div>
              <div className="flex items-center gap-2 bg-[#326CE5] text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                <SiKubernetes size={18} />
                <span>Kubernetes</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2496ED] text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                <SiDocker size={18} />
                <span>Docker</span>
              </div>
              <div className="flex items-center gap-2 bg-[#231F20] text-white border border-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold">
                <SiApachekafka size={18} />
                <span>Kafka</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold border-b pb-2">Work Experience</h2>
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="grid grid-cols-[160px_1fr] gap-x-8 items-start"
            >
              {/* Left: Company & Period */}
              <div className="text-right space-y-1">
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <p className="text-gray-500 dark:text-gray-400">{exp.period}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  ({exp.duration})
                </p>
              </div>
              {/* Right: Projects */}
              <div className="space-y-6">
                {exp.projects.map((proj) => (
                  <div key={proj.title} className="space-y-2">
                    <h4 className="text-lg font-medium">{proj.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {proj.description}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      {proj.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development Activities */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">
          Development Activities
        </h2>
        <div className="space-y-6">
          {activities.map((act) => (
            <div key={act.title} className="space-y-2">
              <h4 className="text-lg font-medium">
                {act.title}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({act.period})
                </span>
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {act.description}
              </p>
              {act.link && (
                <Link
                  href={act.link}
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  {act.linkText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6 mb-12">
        <h2 className="text-3xl font-bold border-b border-gray-700 pb-2 text-white">
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-x-8 items-start w-full"
            >
              <div className="text-right space-y-1">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-gray-400 text-sm">{edu.degree}</p>
                <p className="text-gray-400 text-sm">{edu.period}</p>
              </div>
              <div className="space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  {edu.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Experience */}
      <section className="space-y-6 mb-12">
        <h2 className="text-3xl font-bold border-b border-gray-700 pb-2">
          Other Experience
        </h2>
        <div className="space-y-8">
          {others.map((o) => (
            <div
              key={o.title}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-x-8 items-start w-full"
            >
              <div className="text-right space-y-1">
                <h3 className="text-xl font-semibold">{o.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {o.period}
                </p>
              </div>
              <div className="space-y-2 flex-grow">
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {o.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certification */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold border-b pb-2">Certification</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section>
        <div className="text-center">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Download Resume
          </Link>
        </div>
      </section>
    </main>
  );
}
