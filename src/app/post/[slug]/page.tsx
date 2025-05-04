// src/app/post/[slug]/page.tsx
import { getAllPosts, getPostBySlug, Post } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// 1) generateStaticParams: 빌드시 미리 생성할 slug 목록
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getAllPosts(); // 동기 함수로 frontmatter만 읽음
  return posts.map((post) => ({ slug: post.slug }));
}

// 2) generateMetadata: SEO 태그 설정
//    props.params 는 Promise<{ slug: string }>
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params; // 🔑 반드시 await
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Not Found", description: "" };
  }
  return {
    title: post.title,
    description: post.description,
  };
}

// 3) PostPage 컴포넌트
export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params; // 🔑 여기서도 await
  const post: Post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto px-4 py-10">
      <p className="text-sm text-gray-500">
        {post.date} · {post.category}
      </p>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
