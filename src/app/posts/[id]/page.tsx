import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GiscusComments from "@/components/GiscusComment";
import { PostContent } from "@/components/PostContent";
import { PostToc } from "@/components/PostToc";
import { JsonLd } from "@/components/JsonLd";
import { ViewCounter } from "@/components/ViewCounter";
import {
  getAdjacentPosts,
  getPostData,
  getSortedPostsData,
  type PostMetadata,
} from "@/lib/posts";
import {
  AUTHOR,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  pageAlternates,
  pageOpenGraph,
} from "@/lib/site";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getSortedPostsData().map((post) => ({ id: post.id }));

const thumbnailUrl = (post: PostMetadata): string =>
  post.thumbnail
    ? `${SITE_URL}/images/posts/thumbnails/${post.thumbnail}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;
  const post = await getPostData(id);
  const description = post.description || post.title;
  const path = `/posts/${post.id}`;

  return {
    title: post.title,
    description,
    keywords: post.tags.join(", "),
    alternates: pageAlternates(path),
    openGraph: pageOpenGraph({
      title: post.title,
      description,
      type: "article",
      url: path,
      publishedTime: `${post.date}T00:00:00+09:00`,
      modifiedTime: `${post.updated ?? post.date}T00:00:00+09:00`,
      authors: [AUTHOR.name],
      tags: post.tags,
      images: [{ url: thumbnailUrl(post) }],
    }),
  };
};

const AdjacentLink = ({
  post,
  label,
  align,
}: {
  post: PostMetadata | null;
  label: string;
  align: "left" | "right";
}) => {
  if (!post) return <span />;
  return (
    <Link
      href={`/posts/${post.id}`}
      className={`group block rounded-md border border-line p-4 transition-colors hover:border-accent ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <span className="font-mono text-xs text-mute">{label}</span>
      <span className="mt-1 block break-keep font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
        {post.title}
      </span>
    </Link>
  );
};

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPostData(id);
  const { older, newer } = getAdjacentPosts(id);

  return (
    <article className="relative mx-auto max-w-[720px]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          image: thumbnailUrl(post),
          url: `${SITE_URL}/posts/${post.id}`,
          mainEntityOfPage: `${SITE_URL}/posts/${post.id}`,
          inLanguage: "ko",
          keywords: post.tags.join(", "),
          author: {
            "@type": "Person",
            name: AUTHOR.name,
            url: `${SITE_URL}/about`,
          },
        }}
      />
      <header className="pb-10 pt-4 sm:pt-8">
        <Link
          href="/"
          className="font-mono text-sm text-mute transition-colors hover:text-accent"
        >
          &larr; posts
        </Link>

        <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-mute">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.category}</span>
          {post.draft && <span className="text-warn">draft</span>}
          <span>{post.readingTime} min read</span>
          <ViewCounter path={`/posts/${id}`} />
        </p>
        <h1 className="mt-4 break-keep text-3xl font-bold leading-tight tracking-tight text-fg sm:text-[40px]">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 break-keep text-lg leading-relaxed text-mute">
            {post.description}
          </p>
        )}
        {post.tags?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-mute">
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </header>

      <aside className="absolute left-full top-0 ml-10 hidden h-full w-52 xl:block">
        <div className="sticky top-24 pt-8">
          <PostToc headings={post.headings} />
        </div>
      </aside>

      <PostContent html={post.contentHtml} />

      <nav
        aria-label="이전/다음 글"
        className="mt-16 grid gap-4 sm:grid-cols-2"
      >
        <AdjacentLink post={older} label="← 이전 글" align="left" />
        <AdjacentLink post={newer} label="다음 글 →" align="right" />
      </nav>

      <section aria-label="댓글" className="mt-16 border-t border-line pt-8">
        <h2 className="font-mono text-xs text-mute">comments</h2>
        <GiscusComments
          repo="comstering/comstering.github.io"
          repoId="MDEwOlJlcG9zaXRvcnkzNjI0MjQ3NDk="
          category="Announcements"
          categoryId="MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyOTQ4OTYw"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="dark"
          lang="ko"
          loading="lazy"
        />
      </section>

      <footer className="mt-16 flex items-center gap-4 border-t border-line pt-8">
        <Image
          src="/profile.png"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border border-line object-cover"
          alt=""
        />
        <div>
          <p className="font-semibold text-fg">Comstering</p>
          <p className="text-sm text-mute">
            개발과 운영의 경계를 좁히는 클라우드 네이티브 엔지니어입니다.
          </p>
        </div>
      </footer>
    </article>
  );
};

export default PostPage;
