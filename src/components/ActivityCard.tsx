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

export const ActivityCard = ({
  type,
  title,
  period,
  description,
  tags,
  link,
}: Activity) => {
  const TYPE_CONFIG = {
    "Open Source": {
      styles: "bg-amber-50 dark:bg-amber-900/10 text-amber-600",
      icon: HeartHandshake,
    },
    Project: {
      styles: "bg-sky-50 dark:bg-sky-900/10 text-sky-600",
      icon: Code2,
    },
    Default: {
      // 기본값 설정
      styles: "bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600",
      icon: Folder,
    },
  } as const;

  const config =
    TYPE_CONFIG[type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG["Default"];
  const Icon = config.icon;

  return (
    <div className="group bg-white dark:bg-gray-900/40 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 hover:border-sky-500/30 transition-all shadow-sm hover:shadow-xl">
      <Link href={link || "#"} target={link ? "_blank" : "_self"}>
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
      </Link>
    </div>
  );
};
