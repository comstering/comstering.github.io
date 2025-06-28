// src/app/page.tsx (서버 컴포넌트)

import { getSortedPostsData, getAllCategories, PostData } from "../lib/posts"; // PostData 인터페이스도 임포트
import PostListClient from "../components/PostListClient"; // <-- 새로 만든 클라이언트 컴포넌트 임포트

// Server Component는 searchParams를 props로 직접 받을 수 있습니다.
interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const BlogHome = ({ searchParams }: HomePageProps) => {
  // 서버에서 데이터 패칭 (fs 모듈 사용 가능)
  const allPostsData: PostData[] = getSortedPostsData(); // 모든 포스트 데이터
  const allCategories: string[] = getAllCategories(); // 모든 카테고리 데이터

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {/* 블로그 메인 헤더 */}
      <h1 className="text-4xl font-bold text-foreground mb-4">My Tech Blog</h1>
      <p className="mt-2 text-lg text-muted-foreground mb-12">
        학습하고 성장하는 과정을 기록합니다.
      </p>

      <section>
        <h2 className="text-3xl font-semibold border-b-2 border-card pb-2 mb-8 text-foreground">
          Recent Posts
        </h2>

        {/* PostListClient 컴포넌트에 필요한 데이터를 props로 전달합니다. */}
        <PostListClient
          allPostsData={allPostsData}
          allCategories={allCategories}
          // useSearchParams는 PostListClient 내부에서 사용하므로 여기서 searchParams를 직접 넘기지 않아도 됩니다.
        />
      </section>
    </div>
  );
};

export default BlogHome;
