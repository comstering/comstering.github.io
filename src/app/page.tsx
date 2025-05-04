// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, PostMeta } from "@/lib/posts";

export default function HomePage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/post/${post.slug}`}
          className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={600}
            height={300}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-500">
              {post.category} · {post.date}
            </p>
            <h2 className="text-lg font-semibold mt-1">{post.title}</h2>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
