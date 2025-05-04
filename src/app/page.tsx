// src/app/page.tsx
import { getAllPosts, PostMeta } from "@/lib/posts";
import PostsBlock from "@/components/PostsBlock";

export default function HomePage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <PostsBlock posts={posts} />
    </main>
  );
}
