// src/app/page.tsx
import { getAllPosts, type PostMeta } from "@/lib/posts";
import PostsBlock from "@/components/PostsBlock";

// 1️⃣ async 함수로 변경
export default async function HomePage() {
  // 2️⃣ await으로 결과 받아오기
  const posts: PostMeta[] = await getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <PostsBlock posts={posts} />
    </main>
  );
}
