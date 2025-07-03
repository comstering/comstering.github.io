// src/app/posts/[id]/page.tsx

import GiscusComments from "@/components/GiscusComment";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link"; // 뒤로가기 링크를 위한 Link 컴포넌트

export const generateStaticParams = () => {
  const posts = getSortedPostsData(); // 모든 포스트의 ID를 가져옵니다.

  return posts.map((post) => ({
    id: post.id,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // URL 파라미터에서 ID를 가져옵니다.
  const postData = await getPostData(id);

  return {
    title: postData.title,
    description: postData.description || postData.title, // 설명이 없으면 제목 사용
    keywords: postData.tags ? postData.tags.join(", ") : "", // 태그를 콤마로 구분하여 keywords 메타 태그에 추가
    openGraph: {
      // 소셜 미디어 공유를 위한 Open Graph 메타데이터
      title: postData.title,
      description: postData.description || postData.title,
      type: "article",
      url: `https://comstering.github.io/posts/${postData.id}`, // 실제 도메인으로 변경 필요
      images: postData.thumbnail
        ? [{ url: `https://comstering.github.io/${postData.thumbnail}` }]
        : [], // 썸네일이 있다면 Open Graph 이미지로 추가
    },
    // 기타 SEO 관련 메타데이터 추가 가능
  };
};

// 개별 포스트 페이지 컴포넌트
const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; // URL 파라미터에서 ID를 가져옵니다.
  const postData = await getPostData(id); // 해당 ID의 포스트 데이터 가져오기

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {/* 뒤로가기 버튼 */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-accent hover:underline flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to home
        </Link>
      </div>

      {/* 포스트 제목 */}
      <h1 className="text-4xl font-extrabold text-foreground mb-4 leading-tight">
        {postData.title}
      </h1>

      {/* 작성일 */}
      <p className="text-lg text-muted-foreground mb-6">{postData.date}</p>

      {/* 카테고리 및 태그 표시 (선택 사항: 여기서는 태그를 SEO에만 사용하기로 했으므로, UI에는 카테고리만 표시) */}
      {postData.categories && postData.categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {postData.categories.map((category) => (
            <span
              key={category}
              className="bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded text-xs font-medium border border-blue-600/20"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {/* 포스트 내용 (HTML로 렌더링) */}
      <article className="prose lg:prose-xl prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      {/* ▼▼▼ Giscus 댓글 섹션 추가 ▼▼▼ */}
      <div className="mt-16 pt-8 border-t border-card">
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
          theme="dark_high_contrast" // 'light', 'dark', 'preferred_color_scheme' 등. 저희 테마에 맞추려면 'dark'도 고려
          lang="ko" // 언어 설정
          loading="lazy" // 로딩 방식
        />
      </div>
    </div>
  );
};

export default PostPage;
