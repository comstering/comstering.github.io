import Link from "next/link";

interface PostPathProps {
  slug: string;
}

// 시그니처 2번: ~/posts/<slug> 경로. breadcrumb 역할을 겸한다.
export const PostPath = ({ slug }: PostPathProps) => (
  <nav
    aria-label="현재 위치"
    className="flex items-center font-mono text-meta text-mute"
  >
    <Link
      href="/"
      className="relative shrink-0 py-3 transition-colors hover:text-accent after:absolute after:inset-y-0 after:-inset-x-2 after:content-['']"
    >
      ~
    </Link>
    <span aria-hidden className="shrink-0 px-0.5 opacity-60">
      /
    </span>
    <Link
      href="/"
      className="shrink-0 py-3 transition-colors hover:text-accent"
    >
      posts
    </Link>
    <span aria-hidden className="shrink-0 px-0.5 opacity-60">
      /
    </span>
    <span aria-current="page" className="min-w-0 truncate py-3 text-fg">
      {slug}
    </span>
  </nav>
);
