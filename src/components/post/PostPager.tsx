import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PostMetadata } from "@/lib/posts";

type PagerPost = Pick<PostMetadata, "id" | "title">;

interface PostPagerProps {
  prev: PagerPost | null;
  next: PagerPost | null;
}

const itemClass = "group block py-5";

export const PostPager = ({ prev, next }: PostPagerProps) => {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="이전/다음 글"
      className="grid grid-cols-1 border-b border-line sm:grid-cols-2"
    >
      {prev ? (
        <Link href={`/posts/${prev.id}`} className={`${itemClass} sm:pr-4`}>
          <span className="flex items-center gap-1.5 font-mono text-cap text-mute">
            <ArrowLeft aria-hidden size={14} />
            prev
          </span>
          <span className="mt-1 block font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link
          href={`/posts/${next.id}`}
          className={`${itemClass} ${prev ? "border-t border-line sm:border-t-0" : ""} sm:border-l sm:border-line sm:pl-4 sm:text-right`}
        >
          <span className="flex items-center gap-1.5 font-mono text-cap text-mute sm:justify-end">
            next
            <ArrowRight aria-hidden size={14} />
          </span>
          <span className="mt-1 block font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
};
