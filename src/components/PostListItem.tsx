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

  // 링크는 제목(h3) 안에만 두고 ::before로 행 전체를 클릭 영역으로 넓힌다(시안 .post-item__title a::before).
  // 그래야 링크 이름이 날짜·설명까지 길어지지 않고 제목만 된다 (디자인 20번 F1).
  return (
    <article
      className={cn(
        "group relative min-w-0 border-b border-line has-[a:focus-visible]:rounded-sm has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent",
        compact ? "py-4" : "py-7",
      )}
    >
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
        <Link
          href={`/posts/${id}`}
          className="post-link -my-2.5 block py-2.5 before:absolute before:inset-0 before:content-['']"
        >
          {title}
        </Link>
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
  );
};
