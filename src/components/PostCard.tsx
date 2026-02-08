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
    <article className="group relative flex flex-col bg-white dark:bg-gray-900/40 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden backdrop-blur-xl">
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-sky-500/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[4px]"></div>

      <Link href={`/posts/${id}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={`/images/posts/thumbnails/${thumbnail}`}
            alt={title}
            width={600}
            height={300}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-7 flex flex-col flex-grow">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-2 py-0.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-bold uppercase tracking-wider rounded-md border border-sky-100/50 dark:border-sky-800/50"
                >
                  {category}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-gray-400 dark:text-gray-500 font-semibold tabular-nums">
              {date}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors line-clamp-2 mb-3 leading-snug">
            {title}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
            <div className="flex items-center text-xs font-black text-sky-500 dark:text-sky-400 tracking-tighter group-hover:gap-1 transition-all">
              <span>READ MORE</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
