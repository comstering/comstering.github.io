export interface Experience {
  company: string;
  role?: string;
  period: string;
  projects: {
    title: string;
    description: string;
    period: string;
    points: string[];
  }[];
}

export const ExperienceItem = ({
  company,
  role,
  period,
  projects,
}: Experience) => (
  <div className="space-y-6 border-l border-line pb-12 pl-6 last:pb-0 sm:pl-8">
    <div>
      <h3 className="text-h3 font-bold tracking-tight text-fg">{company}</h3>
      {role && <p className="mt-1 text-small text-fg">{role}</p>}
      <p className="mt-1 font-mono text-cap text-mute">{period}</p>
    </div>
    <div className="grid gap-4">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-line bg-surface p-5 sm:p-6"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <h4 className="font-semibold leading-snug text-fg">
              {project.title}
            </h4>
            {project.period && (
              <span className="shrink-0 font-mono text-cap text-mute tabular-nums">
                {project.period}
              </span>
            )}
          </div>
          <p className="mt-2 text-small leading-relaxed text-mute">
            {project.description}
          </p>
          <div className="mt-4">
            <p className="font-mono text-cap text-mute">Engineering Highlights</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-small leading-relaxed text-mute marker:text-line-strong">
              {project.points.map((point: string, rIdx: number) => (
                <li key={rIdx}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);
