import type { Metadata } from "next";
import GiscusComments from "@/components/GiscusComment";
import { PostContent } from "@/components/PostContent";
import { PostToc } from "@/components/PostToc";
import { JsonLd } from "@/components/JsonLd";
import { AuthorBox } from "@/components/post/AuthorBox";
import { PostHeader } from "@/components/post/PostHeader";
import { PostPager } from "@/components/post/PostPager";
import { PostPath } from "@/components/post/PostPath";
import { SectionHead } from "@/components/ui/SectionHead";
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
      modifiedTime: `${post.date}T00:00:00+09:00`,
      authors: [AUTHOR.name],
      tags: post.tags,
      images: [{ url: thumbnailUrl(post) }],
    }),
  };
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
          datePublished: `${post.date}T00:00:00+09:00`,
          dateModified: `${post.date}T00:00:00+09:00`,
          articleSection: post.categories,
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
      <PostPath slug={post.id} />
      <PostHeader post={post} />

      <aside className="absolute left-full top-0 ml-10 hidden h-full w-52 xl:block">
        <div className="sticky top-24 pt-10">
          <PostToc headings={post.headings} />
        </div>
      </aside>

      <div className="mt-10">
        <PostContent html={post.contentHtml} />
      </div>

      <footer className="mt-16 space-y-12">
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-x-3 font-mono text-cap text-mute">
            {post.tags.map((tag) => (
              <li key={tag} className="inline-flex min-h-8 items-center">
                #{tag}
              </li>
            ))}
          </ul>
        )}

        <AuthorBox />

        <PostPager prev={older} next={newer} />

        <section aria-labelledby="comments-title">
          <SectionHead id="comments-title">comments</SectionHead>
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
            lang="ko"
            loading="lazy"
          />
        </section>
      </footer>
    </article>
  );
};

export default PostPage;
