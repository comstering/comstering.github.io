import { PostListItem } from "@/components/PostListItem";
import { SectionHead } from "@/components/ui/SectionHead";
import { buttonClass } from "@/components/ui/Button";
import { getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요",
};

const NotFound = () => {
  // 빌드 시점의 최신 글 3편 (draft는 getSortedPostsData가 프로덕션에서 제외한다)
  const latest = getSortedPostsData().slice(0, 3);

  return (
    <div className="mx-auto max-w-[720px]">
      <section aria-labelledby="not-found-title" className="pt-4 sm:pt-8">
        <div className="font-mono text-small leading-loose text-mute">
          <p>
            <span className="text-accent">~ $</span>{" "}
            <span className="text-fg">cd /posts/missing-page</span>
          </p>
          <p className="text-warn">
            cd: no such file or directory: /posts/missing-page
          </p>
          <p>
            <span className="text-accent">~ $</span>{" "}
            <span
              aria-hidden
              className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent"
            />
          </p>
        </div>

        <h1
          id="not-found-title"
          className="mt-8 text-title font-bold leading-heading tracking-title text-fg"
        >
          <span className="font-mono text-accent">404</span> 페이지를 찾을 수
          없어요
        </h1>
        <p className="mt-4 text-lead leading-relaxed text-mute">
          주소가 바뀌었거나 삭제된 글일 수 있어요. 최신 글에서 찾아보세요.
        </p>
        <div className="mt-6">
          <Link href="/" className={buttonClass("primary")}>
            cd ~
          </Link>
        </div>
      </section>

      {latest.length > 0 && (
        <section aria-labelledby="latest-title" className="mt-16">
          <SectionHead id="latest-title">latest</SectionHead>
          <div>
            {latest.map((post) => (
              <PostListItem key={post.id} post={post} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NotFound;
