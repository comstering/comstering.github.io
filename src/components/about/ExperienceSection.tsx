import { SectionHead } from "@/components/ui/SectionHead";
import { formatPeriod, type ExperienceData } from "@/lib/content/profile-schema";

// 경력은 전부 펼친다(접이식·expand all 없음). 제목 단계: 섹션 h2 → 회사 h3 → 프로젝트 h4.
// 앵커 위치는 html의 scroll-padding-top이 맡으므로 scroll-margin을 따로 주지 않는다.
export const ExperienceSection = ({
  companies,
}: {
  companies: ExperienceData["companies"];
}) => (
  <section className="about-section" aria-labelledby="exp-title">
    <SectionHead id="exp-title">experience</SectionHead>
    <nav className="jump no-print" aria-label="경력 바로가기">
      {companies.map((company) => (
        <a key={company.id} href={`#${company.id}`}>
          {company.shortName ?? company.name}
        </a>
      ))}
      <a href="#open-source">오픈소스</a>
    </nav>
    <div>
      {companies.map((company) => (
        <div key={company.id} id={company.id} className="tl-org">
          <p className="tl-org__period">{formatPeriod(company.period)}</p>
          <h3 className="tl-org__name">
            {company.name}
            {!company.period.end && <span className="badge-now">now</span>}
          </h3>
          <p className="tl-org__role">{company.role}</p>
          <div className="proj-list">
            {company.projects.map((project) => (
              <article key={project.id} id={project.id} className="proj">
                <div className="proj__head">
                  <h4 className="proj__title">{project.title}</h4>
                  {project.period && (
                    <span className="proj__period">
                      {formatPeriod(project.period)}
                    </span>
                  )}
                </div>
                <p className="proj__desc">{project.description}</p>
                {project.points.length > 0 && (
                  <ul className="proj__points">
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
