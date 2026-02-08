import React from "react";
import {
  ExternalLink,
  Code2,
  HeartHandshake,
  GraduationCap,
  Award,
  Lightbulb,
} from "lucide-react";
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

const SkillBadge = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-500 transition-colors" />
    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
      {label}
    </span>
  </div>
);

const ExperienceItem = ({
  company,
  period,
  projects,
}: {
  company: string;
  period: string;
  projects: any[];
}) => (
  <div className="relative pl-8 border-l-2 border-sky-500/20 dark:border-sky-500/10 space-y-8 pb-12 last:pb-0">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-white dark:border-gray-900"></div>
    <div>
      <h3 className="text-2xl font-black text-gray-900 dark:text-white">
        {company}
      </h3>
      <p className="text-sky-500 font-bold text-sm tracking-wide">{period}</p>
    </div>
    <div className="grid gap-6">
      {projects.map((proj, idx) => (
        <div
          key={idx}
          className="bg-gray-50/50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {proj.name}
            </h4>
            <span className="text-xs font-medium text-gray-400">
              {proj.period}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {proj.description}
          </p>
          <div className="space-y-2">
            <p className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              Key Roles
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {proj.roles.map((role: string, rIdx: number) => (
                <li key={rIdx}>{role}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface Activity {
  title: string;
  period: string;
  description: string;
  link?: string;
  linkText?: string;
}

const ActivityCard = ({
  type,
  title,
  period,
  description,
  tags,
  icon: Icon,
}: {
  type: "Open Source" | "Project" | "Other";
  title: string;
  period: string;
  description: string;
  tags?: string[];
  icon: any;
}) => (
  <div className="group bg-white dark:bg-gray-900/40 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 hover:border-sky-500/30 transition-all shadow-sm hover:shadow-xl">
    <div className="flex items-start justify-between mb-6">
      <div
        className={`p-3 rounded-2xl ${type === "Open Source" ? "bg-amber-50 dark:bg-amber-900/10 text-amber-600" : type === "Project" ? "bg-sky-50 dark:bg-sky-900/10 text-sky-600" : "bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600"}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${type === "Open Source" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600" : type === "Project" ? "bg-sky-100 dark:bg-sky-900/30 text-sky-600" : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600"}`}
      >
        {type}
      </span>
    </div>
    <div className="space-y-4">
      <div>
        <h4 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-sky-500 transition-colors">
          {title}
        </h4>
        <p className="text-xs font-medium text-gray-400 mt-1">{period}</p>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
      {tags && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default function About() {
  const experiences = [
    {
      company: "TechCorp Solutions",
      period: "2021.03 - Present",
      projects: [
        {
          name: "Global E-commerce Modernization",
          period: "2022.06 - Present",
          description:
            "기존 레거시 모놀리식 시스템을 마이크로서비스 아키텍처(MSA)로 전환하는 대규모 프로젝트입니다.",
          roles: [
            "인프라 자동화 파이프라인(Terraform) 구축",
            "Kafka를 이용한 서비스 간 이벤트 기반 통신 구현",
            "Kotlin/Spring Boot 기반 주문 서비스 개발",
          ],
        },
        {
          name: "Cloud Native Migration",
          period: "2021.03 - 2022.05",
          description:
            "온프레미스 인프라를 AWS 클라우드로 전면 이전하여 가용성을 99.9%로 향상시켰습니다.",
          roles: [
            "AWS EKS 클러스터 설계 및 배포",
            "Docker 컨테이너 이미지 최적화",
            "CI/CD 자동화 도구 도입",
          ],
        },
      ],
    },
    {
      company: "StartupLab Inc.",
      period: "2019.01 - 2021.02",
      projects: [
        {
          name: "Real-time Monitoring Dashboard",
          period: "2019.01 - 2021.02",
          description:
            "수천 명의 동시 접속자 로그를 실시간으로 시각화하는 대시보드 솔루션입니다.",
          roles: [
            "백엔드 API 설계 및 최적화",
            "데이터베이스 인덱싱을 통한 쿼리 속도 개선",
            "시스템 모니터링 에이전트 개발",
          ],
        },
      ],
    },
  ];

  const activities = [
    {
      type: "Open Source" as const,
      title: "Kubernetes Documentation",
      period: "2023.10 - Present",
      description:
        "쿠버네티스 공식 문서의 한글화 프로젝트에 기여하고 있습니다. 기술 용어의 올바른 번역과 가독성 개선에 집중하고 있습니다.",
      tags: ["Documentation", "Translation", "CloudNative"],
      icon: HeartHandshake,
    },
    {
      type: "Project" as const,
      title: "Dev.Archives CLI Tool",
      period: "2024.01 - 2024.03",
      description:
        "마크다운 포스트를 자동으로 분석하여 카테고리를 분류하고 썸네일을 생성해주는 개발자용 생산성 CLI 도구입니다.",
      tags: ["Node.js", "Automation", "CLI"],
      icon: Code2,
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
                Infra & DevOps
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <SkillBadge icon={SiAmazon} label="AWS" />
              <SkillBadge icon={SiTerraform} label="Terraform" />
              <SkillBadge icon={SiKubernetes} label="Kubernetes" />
              <SkillBadge icon={SiDocker} label="Docker" />
              <SkillBadge icon={SiApachekafka} label="Kafka" />
            </div>
          </div>

          <div className="p-10 bg-indigo-50/30 dark:bg-indigo-900/5 rounded-[40px] border border-indigo-100/50 dark:border-indigo-900/20 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
                <SiSpringboot className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-indigo-900 dark:text-indigo-100 tracking-tight">
                Backend & Language
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <SkillBadge icon={SiKotlin} label="Kotlin" />
              <SkillBadge icon={SiSpringboot} label="Spring Boot" />
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
          <a
            href="https://github.com"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-black text-sm tracking-widest hover:bg-sky-500 dark:hover:bg-sky-500 dark:hover:text-white transition-all shadow-xl shadow-gray-500/20 group"
          >
            <SiGithub className="w-5 h-5" />
            VIEW ALL CONTRIBUTIONS
            <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
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
                  한국대학교 (Hankuk University)
                </h3>
                <p className="text-sky-500 font-extrabold tracking-wider uppercase text-sm">
                  Computer Science & Engineering
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                Bachelor of Engineering (B.E.) | 2015.03 - 2021.02
              </p>
              <div className="pt-2">
                <p className="text-sm text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter mb-2">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {[
                    "Data Structures",
                    "Algorithms",
                    "Operating Systems",
                    "Cloud Computing",
                    "Database Design",
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
            {
              title: "AWS Solutions Architect",
              issuer: "Amazon Web Services",
              date: "2023.05",
            },
            {
              title: "CKA (Kubernetes Administrator)",
              issuer: "Cloud Native Computing Foundation",
              date: "2023.11",
            },
            {
              title: "정보처리기사 (Engineer Information Processing)",
              issuer: "Q-Net",
              date: "2020.12",
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
            title="Tech Meetup Organizer"
            period="2022 - Present"
            description="사내외 기술 컨퍼런스 및 소규모 스터디 모임을 주도적으로 운영하며 지식 공유 문화를 조성하고 있습니다."
            icon={Lightbulb}
          />
          <ActivityCard
            type="Other"
            title="University Mentoring Program"
            period="2020"
            description="후배 대학생들을 대상으로 프로그래밍 기초 및 진로 멘토링을 진행하여 성장을 지원했습니다."
            icon={Lightbulb}
          />
        </div>
      </section>
    </div>
  );
}
