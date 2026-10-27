import type { PostMetadata } from "@/lib/posts";
import { ViewCounter } from "@/components/ViewCounter";

interface PostHeaderProps {
  post: Pick<
    PostMetadata,
    | "id"
    | "title"
    | "description"
    | "date"
    | "updated"
    | "category"
    | "readingTime"
    | "draft"
  >;
}

export const PostHeader = ({ post }: PostHeaderProps) => (
  <header className="pt-4 sm:pt-6">
    <p className="flex flex-wrap gap-x-3 font-mono text-meta text-mute">
      <span className="text-accent">{post.category}</span>
      <time dateTime={post.date}>{post.date}</time>
      {post.draft && <span className="text-warn">draft</span>}
    </p>
    <h1 className="mt-3 text-title leading-heading font-bold tracking-title text-fg">
      {post.title}
    </h1>
    {post.description && (
      <p className="mt-4 text-lead leading-relaxed text-mute">
        {post.description}
      </p>
    )}
    <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-b border-line pb-6 font-mono text-cap text-mute tabular-nums">
      <span>{post.readingTime} min read</span>
      <ViewCounter path={`/posts/${post.id}`} />
      {post.updated && <span>updated {post.updated}</span>}
    </p>
  </header>
);
