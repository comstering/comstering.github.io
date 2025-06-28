import { PostData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  post: Pick<PostData, "id" | "title" | "date" | "categories" | "thumbnail">;
};

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, date, categories, thumbnail } = post;

  return (
    <div
      key={id}
      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <Link href={`/posts/${id}`} className="block">
        {thumbnail && (
          <div className="relative w-full h-48 sm:h-40 overflow-hidden rounded-t-lg">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">{date}</p>
          </div>

          {/* ▼▼▼ 카테고리만 표시하도록 수정 ▼▼▼ */}
          {categories && categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded text-xs font-medium border border-blue-600/20"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
