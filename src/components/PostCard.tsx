import { PostMetadata } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  post: Pick<
    PostMetadata,
    "id" | "title" | "description" | "date" | "categories" | "thumbnail"
  >;
};

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, description, date, categories, thumbnail } = post;

  return (
    <div
      key={id}
      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <Link
        key={id}
        href={`/posts/${id}`}
        className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
      >
        <Image
          src={`/images/posts/thumbnails/${thumbnail}`}
          alt={title}
          width={600}
          height={300}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg truncate font-semibold mt-1">{title}</h2>
          <p className="min-h-10 text-sm mt-2 text-gray-600 dark:text-gray-300">
            {description}
          </p>

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
          <p className="mt-1 text-sm text-gray-500">{date}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
