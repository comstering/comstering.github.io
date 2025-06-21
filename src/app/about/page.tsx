import Image from "next/image";
import { Lightbulb, Mail } from "lucide-react";
import {
  SiAmazon,
  SiApachekafka,
  SiDocker,
  SiGithub,
  SiKotlin,
  SiKubernetes,
  SiLinkedin,
  SiSpringboot,
  SiTerraform,
} from "react-icons/si";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {/* ▼▼▼ 새로운 프로필 섹션 시작 ▼▼▼ */}
      <section className="flex flex-col items-center text-center mb-16">
        {/* 프로필 이미지 */}
        <div className="w-32 h-32 rounded-full bg-card p-1 mb-4 flex items-center justify-center">
          <Image
            src="/profile.png" // public 폴더에 넣은 이미지 경로
            alt="CHOI HANSU 프로필 이미지"
            width={120} // 이미지의 실제 크기에 맞춰 조절
            height={120} // 이미지의 실제 크기에 맞춰 조절
            className="rounded-full object-cover"
            priority // 이 이미지는 페이지 로드 시 가장 먼저 보일 것이므로 priority를 추가하여 최적화합니다.
          />
        </div>

        {/* 이름 (페이지의 가장 중요한 제목이므로 h1 사용) */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          최한수 (CHOI HANSU)
        </h1>

        {/* 직책/역할 */}
        <p className="text-md sm:text-lg text-muted-foreground mt-2">
          Software Engineer, DevOps Engineer
        </p>

        {/* 소셜 링크 아이콘들 */}
        <div className="flex items-center gap-4 mt-6">
          <a
            href="https://github.com/[your-github-username]"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-muted-foreground hover:text-accent"
          >
            <SiGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/[your-linkedin-profile]"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-muted-foreground hover:text-accent"
          >
            <SiLinkedin size={24} />
          </a>
          <a
            href="mailto:[your.email@example.com]"
            aria-label="Send Email"
            className="text-muted-foreground hover:text-accent"
          >
            <Mail size={24} />
          </a>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-6 text-white border-b-2 border-gray-700 pb-2">
          Introduction
        </h2>
        <div className="bg-gray-800 rounded-xl p-8">
          <p className="text-lg font-bold text-yellow-300 mb-6">
            &quot;어제보다 성장하는 개발자 최한수입니다.&quot;
          </p>
          <div className="flex items-start gap-4">
            <Lightbulb className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="text-gray-300 space-y-3">
              <p>새로운 지식을 배우는 것을 즐기며 다양한 경험을 추구합니다.</p>
              <p>
                요구사항을 구현하기 위한 기술, 협업에 대한 Best Practice를 찾기
                위해 노력합니다.
              </p>
              <p>
                다양한 직무의 사람들과 협업할 때 의사소통에 걸림돌이 되지 않게
                여러 지식을 계속 축적하고 공부하려고 합니다.
              </p>
            </div>
          </div>
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
      <section className="mb-16">
        <h2 className="text-3xl font-semibold border-b-2 border-card pb-2 mb-8 text-foreground">
          Work Experience
        </h2>

        {/* 각 회사 경력을 감싸는 컨테이너 */}
        <div className="space-y-12">
          {/* 첫 번째 회사: CJ Olive Young */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8">
            {/* 왼쪽 컬럼: 회사 정보 */}
            <div className="md:col-span-1 mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-foreground">
                CJ Olive Young
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                2024.06 - (~ing)
              </p>
            </div>

            {/* 오른쪽 컬럼: 상세 업무 및 프로젝트 */}
            <div className="md:col-span-3 space-y-10">
              {/* 프로젝트 1 */}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  SCDF 도입 및 구축 (2025.03 - 2025.04)
                </h4>
                <p className="text-sm text-foreground/80 mt-1.5">
                  조직 내에서 Spring Batch를 주된 Batch 시스템으로 사용하고
                  있어서 Spring Cloud Dataflow를 도입하여 Batch Job 관리를
                  통합하여 관리
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>k8s 환경에서 SCDF 설치 및 배포</li>
                  <li>AWS Airflow인 MWAA를 Deprecate하여 비용 절감</li>
                  <li>기존 Airflow보다 직관적인 Batch Job 관리</li>
                </ul>
              </div>

              {/* 프로젝트 2 */}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  Legacy Service Migrate (2024.12 - ~ing)
                </h4>
                <p className="text-sm text-foreground/80 mt-1.5">
                  외주사를 통해서 개발된 Legacy Service를 k8s 환경으로
                  마이그레이션 및 Seoul Region에서 N.Virginia Region으로
                  마이그레이션
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>EC2 클라우드 컴퓨팅 &rarr; k8s 서비스 마이그레이션</li>
                  <li>Aurora DB의 글로벌 Cluster를 사용한 리전 마이그레이션</li>
                </ul>
              </div>

              {/* 프로젝트 3 */}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  Kafka System 구축 (2024.07 - 2024.12)
                </h4>
                <p className="text-sm text-foreground/80 mt-1.5">
                  내부 시스템 간의 데이터 전송을 위한 Kafka 시스템을
                  구축하였습니다.
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Kafka Connect를 이용한 CDC 환경 구축</li>
                  <li>
                    Business logic Transaction 보장을 위한 Outbox 시스템 구축
                  </li>
                  <li>
                    공통된 messaging format을 위해 Cloud Event를 기반으로한
                    Schema Registry 구축
                  </li>
                  <li>Kafka Producer/Consumer를 위한 공통 라이브러리 개발</li>
                </ul>
              </div>

              {/* 기타 작업 */}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  기타 작업
                </h4>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>
                    Braze Sender Email 적용 (2025.01): Braze Sender Email 적용
                    및 Route53 Record 관리
                  </li>
                  <li>
                    Schema Registry 구축 (2025.02): Kafka Schema Registry 구축
                    및 관리
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8">
            <div className="md:col-span-1 mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-foreground">CLASS 101</h3>
              <p className="text-sm text-muted-foreground mt-1">
                2022.05 - 2024.03
              </p>
              <p className="text-sm text-muted-foreground mt-1">(1년 11개월)</p>
            </div>

            <div className="md:col-span-3 space-y-10">
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  Rebuild Auth (2023.10 – 2024.03)
                </h4>
                <p className="text-sm text-foreground/80 mt-1.5">
                  기존 인증은 사용자의 유형에 따라 분리되어 있었으나, 이를
                  통합하여 관리하기 위한 인증 시스템을 구축하였습니다.
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Authentication Website 배포 파이프라인 구축</li>
                  <li>Social OAuth 인증 공통 Interface 설계 및 구현</li>
                </ul>
              </div>

              {/* 프로젝트 2 */}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  프로모션 코드 인증
                </h4>
                <p className="text-sm text-foreground/80 mt-1.5">
                  외주사를 통해서 개발된 Legacy Service를 k8s 환경으로
                  마이그레이션 및 Seoul Region에서 N.Virginia Region으로
                  마이그레이션
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>EC2 클라우드 컴퓨팅 &rarr; k8s 서비스 마이그레이션</li>
                  <li>Aurora DB의 글로벌 Cluster를 사용한 리전 마이그레이션</li>
                </ul>
              </div>

              {/* 프로젝트 3 */}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  Kafka System 구축 (2024.07 - 2024.12)
                </h4>
                <p className="text-sm text-foreground/80 mt-1.5">
                  내부 시스템 간의 데이터 전송을 위한 Kafka 시스템을
                  구축하였습니다.
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Kafka Connect를 이용한 CDC 환경 구축</li>
                  <li>
                    Business logic Transaction 보장을 위한 Outbox 시스템 구축
                  </li>
                  <li>
                    공통된 messaging format을 위해 Cloud Event를 기반으로한
                    Schema Registry 구축
                  </li>
                  <li>Kafka Producer/Consumer를 위한 공통 라이브러리 개발</li>
                </ul>
              </div>

              {/* 기타 작업 */}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  기타 작업
                </h4>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>
                    Braze Sender Email 적용 (2025.01): Braze Sender Email 적용
                    및 Route53 Record 관리
                  </li>
                  <li>
                    Schema Registry 구축 (2025.02): Kafka Schema Registry 구축
                    및 관리
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Projects (선택 사항) */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
          Projects
        </h2>
        {/* 프로젝트 내용을 이곳에 추가합니다. 경력과 유사한 형태로 작성할 수 있습니다. */}
      </section>

      {/* 5. Education */}
      <section>
        <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
          Education
        </h2>
        <div>
          <h3 className="text-2xl font-bold">[학교 이름]</h3>
          <p className="text-md text-gray-600">[재학 기간] | [전공] | [학위]</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
