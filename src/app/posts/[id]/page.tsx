import { getPostData, getSortedPostsData } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";

export const generateStaticParams = () => {
  const posts = getSortedPostsData(); // 모든 포스트의 ID를 가져옵니다.

  return posts.map((post) => ({
    id: post.id,
  }));
};

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const postData = await getPostData(id);

  if (!postData) {
    return (
      <div className="text-center py-32 space-y-6">
        <h1 className="text-6xl font-black text-gray-200 dark:text-gray-800">
          404
        </h1>
        <p className="text-xl font-medium text-gray-500">
          포스트를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-sky-500 text-white font-bold rounded-full hover:bg-sky-600 transition-transform hover:-translate-y-1 shadow-lg shadow-sky-500/20"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Article Header */}
      <header className="mb-12 space-y-8">
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-xs font-bold text-sky-500 flex items-center hover:gap-2 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            BACK TO BLOG
          </Link>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            {postData.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
            <span>{postData.date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>6 min read</span>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-gray-200 dark:border-gray-800 aspect-[21/9]">
          <Image
            src={`/images/posts/thumbnails/${postData.thumbnail}`}
            alt={postData.title}
            width={840}
            height={360}
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>

      {/* Article Footer */}
      <footer className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-full">
          <Image
            src="/profile.png"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-sky-400"
            alt="Author"
          />
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              Written by Comstering
            </h4>
            <p className="text-sm text-gray-500">
              프론트엔드 개발자 및 테크니컬 라이터입니다. Software Engineer,
              Infra & DevOps Engineer
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="font-bold text-gray-900 dark:text-white hover:text-sky-500 transition-colors"
        >
          모든 글 보기 →
        </Link>
      </footer>
    </article>
  );
};

export default PostPage;
