import Image from "next/image";
import Link from "next/link";
import type { PostMetadata } from "@/lib/posts";

type PostListItemProps = {
  /** 썸네일과 태그를 숨기는 간결한 목록 (404 등) */
  compact?: boolean;
  post: Pick<
    PostMetadata,
    "id" | "title" | "description" | "date" | "category" | "tags" | "thumbnail" | "draft"
  >;
};

export const PostListItem = ({ post, compact = false }: PostListItemProps) => {
  const { id, title, description, date, category, tags, thumbnail, draft } =
    post;

  return (
    <Link
      href={`/posts/${id}`}
      className="group flex items-start justify-between gap-5 border-b border-line py-7 sm:gap-6"
    >
      <article className="min-w-0">
        <p className="flex gap-3 font-mono text-xs text-mute">
          <time dateTime={date}>{date}</time>
          <span>{category}</span>
          {draft && <span className="text-warn">draft</span>}
        </p>
        <h3 className="mt-2 break-keep text-xl font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-accent sm:text-[22px]">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 break-keep text-[15px] leading-relaxed text-mute">
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
      {!compact && thumbnail && (
        <Image
          src={`/images/posts/thumbnails/${thumbnail}`}
          alt=""
          width={224}
          height={168}
          className="mt-1 h-[54px] w-[72px] shrink-0 rounded-md border border-line object-cover transition-colors group-hover:border-accent sm:h-[84px] sm:w-[112px]"
        />
      )}
    </Link>
  );
};
