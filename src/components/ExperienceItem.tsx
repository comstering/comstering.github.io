export interface Experience {
  company: string;
  period: string;
  projects: {
    title: string;
    description: string;
    period: string;
    points: string[];
  }[];
}

export const ExperienceItem = ({ company, period, projects }: Experience) => (
  <div className="relative pl-8 border-l-2 border-sky-500/20 dark:border-sky-500/10 space-y-8 pb-12 last:pb-0">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-white dark:border-gray-900"></div>
    <div>
      <h3 className="text-2xl font-black text-gray-900 dark:text-white">
        {company}
      </h3>
      <p className="text-sky-500 font-bold text-sm tracking-wide">{period}</p>
    </div>
    <div className="grid gap-6">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="bg-gray-50/50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {project.title}
            </h4>
            <span className="text-xs font-medium text-gray-400">
              {project.period}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="space-y-2">
            <p className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              Engineering Highlights
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
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
