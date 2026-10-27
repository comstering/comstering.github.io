import { Code2, Folder, HeartHandshake } from "lucide-react";
import Link from "next/link";

export interface Activity {
  type: "Open Source" | "Project" | "Other";
  title: string;
  period: string;
  description: string;
  tags: string[];
  link?: string;
}

const TYPE_ICON = {
  "Open Source": HeartHandshake,
  Project: Code2,
  Other: Folder,
} as const;

const cardClass = "block h-full rounded-lg border border-line bg-surface p-6";
const linkClass = "group transition-colors hover:border-accent";

export const ActivityCard = ({
  type,
  title,
  period,
  description,
  tags,
  link,
}: Activity) => {
  const Icon = TYPE_ICON[type] ?? Folder;

  const content = (
    <>
      <div className="flex items-start justify-between">
        <Icon aria-hidden className="h-5 w-5 text-mute" />
        <span className="rounded-md border border-line-strong px-2 py-0.5 font-mono text-cap text-mute">
          {type}
        </span>
      </div>
      <h4 className="mt-5 text-item font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
        {title}
        {link && <span className="sr-only"> (새 창에서 열림)</span>}
      </h4>
      <p className="mt-1 font-mono text-cap text-mute tabular-nums">{period}</p>
      <p className="mt-3 text-small leading-relaxed text-mute">{description}</p>
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-cap text-mute">
          {tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}
    </>
  );

  return link ? (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardClass} ${linkClass}`}
    >
      {content}
    </Link>
  ) : (
    <div className={cardClass}>{content}</div>
  );
};
