// src/app/page.tsx
import { PostsBlock } from "@/components/PostsBlock";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { JSX } from "react";

// 1️⃣ async 함수로 변경
const HomePage = async (): Promise<JSX.Element> => {
  const posts: PostMeta[] = await getAllPosts();
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <PostsBlock posts={posts} />
    </main>
  );
};

export default HomePage;
