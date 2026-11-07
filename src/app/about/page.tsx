import { GraduationCap, Award } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Bio from "@/components/Bio";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ActivityCard } from "@/components/ActivityCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { buttonClass } from "@/components/ui/Button";
import Link from "next/link";
import { loadExperience, loadProfile } from "@/lib/content/profile";
import { formatPeriod } from "@/lib/content/profile-schema";

const dotMonth = (value: string) => value.replace("-", ".");

const About = () => {
  const profile = loadProfile();
  const { companies, openSource, sideProjects } = loadExperience();

  const experiences = companies.map((company) => ({
    id: company.id,
    company: company.name,
    role: company.role,
    period: formatPeriod(company.period),
    projects: company.projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      period: formatPeriod(project.period),
      points: project.points,
    })),
  }));

  const toActivity = (
    type: "Open Source" | "Project" | "Other",
    item: (typeof openSource)[number] | (typeof profile.experiences)[number],
  ) => ({
    type,
    title: item.title,
    // 활동 카드는 기존 표기 그대로: 같은 달이면 한 번만(PR-19에서 경력과 함께 통일)
    period:
      item.period && !Array.isArray(item.period) && item.period.start === item.period.end
        ? dotMonth(item.period.start)
        : formatPeriod(item.period),
    description: item.description,
    tags: item.tags,
    link: item.url,
  });
  const activities = [
    ...openSource.map((item) => toActivity("Open Source", item)),
    ...sideProjects.map((item) => toActivity("Project", item)),
  ];

  return (
    <div className="mx-auto max-w-[720px] space-y-20 pb-12 pt-4 sm:pt-8">
      {/* Main Banner */}
      <Bio profile={profile} />

      {/* Tech Stack Sections */}
      <section aria-labelledby="tech-stack-title" className="space-y-6">
        <SectionHead id="tech-stack-title">Tech Stack</SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.skills.map(({ group, items }) => (
            <div
              key={group}
              className="min-w-0 space-y-5 rounded-lg border border-line bg-surface p-6"
            >
              <h3 className="text-h3 font-bold tracking-tight text-fg">
                {group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((name) => (
                  <li
                    key={name}
                    className="inline-flex min-h-(--tap) items-center rounded-md border border-line-strong px-3 text-small text-fg"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section aria-labelledby="experience-title" className="space-y-6">
        <SectionHead id="experience-title">Professional Experience</SectionHead>
        <div>
          {experiences.map((exp) => (
            <ExperienceItem key={exp.id} {...exp} />
          ))}
        </div>
      </section>

      {/* Development Activities Section */}
      <section aria-labelledby="activities-title" className="space-y-6">
        <SectionHead id="activities-title">Development Activities</SectionHead>
        <p className="text-small text-mute">
          오픈소스 기여 및 사이드 프로젝트를 통해 꾸준히 성장하고 있습니다.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
        <Link
          href={profile.contacts.github}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("primary")}
        >
          <SiGithub aria-hidden className="h-4 w-4" />
          view all contributions
          <span className="sr-only"> (새 창에서 열림)</span>
        </Link>
      </section>

      {/* Education Section */}
      <section aria-labelledby="education-title" className="space-y-6">
        <SectionHead id="education-title">Education</SectionHead>
        {profile.education.map((edu) => (
          <div
            key={edu.school}
            className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-6 sm:flex-row sm:gap-6"
          >
            <GraduationCap aria-hidden className="h-8 w-8 shrink-0 text-mute" />
            <div className="space-y-4">
              <div>
                <h3 className="text-h3 font-bold tracking-tight text-fg">
                  {edu.school}
                </h3>
                <p className="mt-1 text-small text-fg">{edu.major}</p>
                <p className="mt-1 font-mono text-cap text-mute">
                  {edu.degree} | {dotMonth(edu.period.start)} ~{" "}
                  {dotMonth(edu.period.end ?? edu.period.start)}
                </p>
              </div>
              <div>
                <p className="font-mono text-cap text-mute">Relevant Coursework</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <li
                      key={course}
                      className="rounded-md border border-line px-2.5 py-1 font-mono text-cap text-mute"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Certification Section */}
      <section aria-labelledby="certifications-title" className="space-y-6">
        <SectionHead id="certifications-title">Certifications</SectionHead>
        <ul className="grid gap-4 sm:grid-cols-2">
          {profile.certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex min-w-0 items-start gap-4 rounded-lg border border-line bg-surface p-5"
            >
              <Award aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-mute" />
              <div className="min-w-0">
                <h3 className="font-semibold leading-snug text-fg">
                  {cert.name}
                </h3>
                <p className="mt-1 text-small text-mute">{cert.issuer}</p>
                <p className="mt-1 font-mono text-cap text-mute">
                  {dotMonth(cert.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Other Experience Section */}
      <section aria-labelledby="other-title" className="space-y-6">
        <SectionHead id="other-title">Other Experience</SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.experiences.map((item) => (
            <ActivityCard key={item.id} {...toActivity("Other", item)} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
