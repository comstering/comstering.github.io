import type { PostMetadata } from "@/lib/posts";
import { PostListItem } from "@/components/PostListItem";
import { SectionHead } from "@/components/ui/SectionHead";

// 이전/다음 아래, 댓글 위. 0편이면 섹션을 그리지 않는다 (F-PO-06).
export const RelatedPosts = ({ posts }: { posts: PostMetadata[] }) => {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-title">
      <SectionHead id="related-title">related</SectionHead>
      <div className="mt-2">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} compact />
        ))}
      </div>
    </section>
  );
};
