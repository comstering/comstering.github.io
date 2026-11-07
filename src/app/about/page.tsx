import "./about.css";
import { PostPath } from "@/components/post/PostPath";
import { AboutIntro } from "@/components/about/AboutIntro";
import { ExperienceSection } from "@/components/about/ExperienceSection";
import { SectionHead } from "@/components/ui/SectionHead";
import { loadExperience, loadProfile } from "@/lib/content/profile";
import { formatPeriod } from "@/lib/content/profile-schema";

const dotMonth = (value: string) => value.replace("-", ".");

// About과 resume.pdf는 같은 데이터(content/profile.yaml·experience.yaml)에서 나온다.
// About 안에 블로그 글(/posts/) 링크는 두지 않는다(PRD-004 G2-3).
const About = () => {
  const profile = loadProfile();
  const { companies, openSource, sideProjects } = loadExperience();

  return (
    <div className="about pb-12">
      {/* 시그니처 2번: 모든 페이지 상단의 경로. 인쇄(resume.pdf)에서는 숨긴다 */}
      <div className="no-print">
        <PostPath slug="about" section={null} />
      </div>
      <AboutIntro profile={profile} />

      <ExperienceSection companies={companies} />

      <section
        id="open-source"
        className="about-section"
        aria-labelledby="oss-title"
      >
        <SectionHead id="oss-title">open source · side</SectionHead>
        <div className="oss-list">
          {openSource.map((item) => (
            <div key={item.id} className="oss-row">
              <span className="oss-row__title">{item.title}</span>
              <span className="oss-row__aside">{formatPeriod(item.period)}</span>
              <p className="oss-row__sub">{item.description}</p>
              <div className="oss-row__act">
                <span className="badge-now">merged</span>
                {item.url && (
                  <a
                    className="link-row link-ext"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pull request
                    <span className="sr-only"> (새 창에서 열림)</span>
                  </a>
                )}
              </div>
            </div>
          ))}
          {sideProjects.map((item) => (
            <div key={item.id} className="oss-row">
              <span className="oss-row__title">{item.title}</span>
              <span className="oss-row__aside">{formatPeriod(item.period)}</span>
              <p className="oss-row__sub">{item.description}</p>
              <div className="oss-row__act">
                {item.url && (
                  <a
                    className="link-row link-ext"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github
                    <span className="sr-only"> (새 창에서 열림)</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="skills-title">
        <SectionHead id="skills-title">skills</SectionHead>
        <dl className="skills">
          {profile.skills.map(({ group, items }) => (
            <div key={group}>
              <dt>{group}</dt>
              <dd className="stack-list">
                {items.map((name) => (
                  <span key={name} className="stack-token">
                    {name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="about-section" aria-labelledby="cert-title">
        <SectionHead id="cert-title">certifications</SectionHead>
        <ul className="def-list">
          {profile.certifications.map((cert) => (
            <li key={cert.name}>
              <span className="def-list__title">{cert.name}</span>
              <span className="def-list__aside">{dotMonth(cert.date)}</span>
              <span className="def-list__sub">{cert.issuer}</span>
              {cert.verifyUrl && (
                <span className="def-list__action">
                  <a
                    className="link-row link-ext"
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    verify
                    <span className="sr-only"> (새 창에서 열림)</span>
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="about-section" aria-labelledby="edu-title">
        <SectionHead id="edu-title">education · activity</SectionHead>
        <ul className="def-list">
          {profile.education.map((edu) => (
            <li key={edu.school}>
              <span className="def-list__title">{edu.school}</span>
              <span className="def-list__aside">
                {dotMonth(edu.period.start)} ~{" "}
                {dotMonth(edu.period.end ?? edu.period.start)}
              </span>
              <span className="def-list__sub">
                {edu.major}, {edu.degree}
                {edu.coursework.length > 0 && `. ${edu.coursework.join(", ")}`}
              </span>
            </li>
          ))}
          {profile.experiences.map((item) => (
            <li key={item.id}>
              <span className="def-list__title">{item.title}</span>
              <span className="def-list__aside">{formatPeriod(item.period)}</span>
              <span className="def-list__sub">{item.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default About;
