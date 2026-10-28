import Link from "next/link";
import type { PostMetadata } from "@/lib/posts";
import { cn } from "@/lib/cn";

type PostListItemProps = {
  /** 태그를 숨기는 간결한 목록 (404 등) */
  compact?: boolean;
  post: Pick<
    PostMetadata,
    | "id"
    | "title"
    | "description"
    | "date"
    | "categories"
    | "tags"
    | "draft"
    | "seriesOrder"
    | "seriesLabel"
    | "seriesTotal"
  >;
};

export const PostListItem = ({ post, compact = false }: PostListItemProps) => {
  const {
    id,
    title,
    description,
    date,
    categories,
    tags,
    draft,
    seriesOrder,
    seriesLabel,
    seriesTotal,
  } = post;

  return (
    <Link
      href={`/posts/${id}`}
      className={cn(
        "group block border-b border-line",
        compact ? "py-4" : "py-7",
      )}
    >
      <article className="min-w-0">
        <p className="flex flex-wrap gap-x-3 font-mono text-xs text-mute">
          <time dateTime={date}>{date}</time>
          <span className="text-fg">{categories.join(", ")}</span>
          {seriesLabel && (
            <span>
              series {seriesLabel} {seriesOrder}/{seriesTotal}
            </span>
          )}
          {draft && <span className="text-warn">draft</span>}
        </p>
        <h3
          className={cn(
            "mt-2 break-keep font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-accent",
            compact ? "text-lead" : "text-xl sm:text-[22px]",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 break-keep text-[15px] leading-relaxed text-mute",
            compact ? "line-clamp-1" : "line-clamp-2",
          )}
        >
          {description}
        </p>
        {!compact && tags?.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-mute">
            {tags.slice(0, 4).map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </article>
    </Link>
  );
};
