import GiscusComments from "@/components/GiscusComment";
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

      {/* ▼▼▼ Giscus 댓글 섹션 추가 ▼▼▼ */}
      <div className="mt-16 pt-8 border-t border-card border-gray-100 dark:border-gray-800">
        {/* 상단 여백 및 구분선 */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Comments</h2>
        <GiscusComments
          repo="comstering/comstering.github.io" // <-- 필수: 본인의 GitHub 유저이름/저장소이름 (예: 'your-username/your-blog-comments')
          repoId="MDEwOlJlcG9zaXRvcnkzNjI0MjQ3NDk=" // <-- 필수: Giscus 설치 후 제공되는 Repo ID (숫자+문자 조합)
          category="Announcements" // <-- 필수: Giscus 설치 후 선택한 Discussion 카테고리 이름 (예: 'Comments', 'General')
          categoryId="MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyOTQ4OTYw" // <-- 필수: Giscus 설치 후 제공되는 Category ID (숫자+문자 조합)
          mapping="pathname" // 'pathname' (현재 페이지 경로에 매핑) 또는 'url', 'title' 등
          strict="0" // Strict 매핑 여부 (0 또는 1)
          reactionsEnabled="1" // 좋아요/이모지 반응 활성화 (0 또는 1)
          emitMetadata="0" // Giscus 메타데이터 전송 여부 (0 또는 1)
          inputPosition="top" // 댓글 입력창 위치 (top 또는 bottom)
          theme="preferred_color_scheme" // 'light', 'dark', 'preferred_color_scheme' 등. 저희 테마에 맞추려면 'dark'도 고려
          lang="ko" // 언어 설정
          loading="lazy" // 로딩 방식
        />
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
