// src/app/post/[slug]/page.tsx
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JSX } from "react";
type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = await (await import("@/lib/posts")).getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found", description: "" };
  return { title: post.title, description: post.description };
};

const PostPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto px-4 py-10">
      <p className="text-sm text-gray-500">{post.date}</p>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {post.categories.map((cat) => (
          <span
            key={cat}
            className="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded-full text-xs text-gray-800 dark:text-gray-200"
          >
            {cat}
          </span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
};

export default PostPage;
