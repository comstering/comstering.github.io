// src/components/PostListClient.tsx
"use client"; // <-- 이 파일이 클라이언트 컴포넌트임을 명시합니다.

import Link from "next/link";
import { useSearchParams } from "next/navigation"; // 클라이언트 전용 훅
import { PostData } from "../lib/posts"; // PostData 인터페이스를 임포트합니다.
import PostCard from "./PostCard";

// 이 컴포넌트가 props로 받을 데이터의 타입을 정의합니다.
interface PostListClientProps {
  allPostsData: PostData[]; // 필터링되지 않은 모든 포스트 데이터
  allCategories: string[]; // 모든 카테고리 목록 ('All' 포함)
}

const PostListClient = ({
  allPostsData,
  allCategories,
}: PostListClientProps) => {
  // URL의 'category' 쿼리 파라미터를 읽어 현재 선택된 카테고리를 확인합니다.
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All"; // 기본값은 'All'

  // 선택된 카테고리에 따라 포스트를 필터링합니다.
  const filteredPosts =
    selectedCategory === "All"
      ? allPostsData
      : allPostsData.filter((post) =>
          post.categories?.includes(selectedCategory)
        );

  return (
    <>
      {/* 카테고리 필터 탭 섹션 */}
      <div className="mb-8 flex flex-wrap gap-2 sm:gap-4">
        {allCategories.map((category) => (
          <Link
            key={category}
            // 'All' 카테고리는 쿼리 파라미터 없이 루트 경로로, 그 외는 ?category= 로 이동
            href={
              category === "All"
                ? "/"
                : `/?category=${encodeURIComponent(category)}`
            }
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${
                selectedCategory === category
                  ? "bg-white text-black shadow-md" // 활성화된 카테고리 스타일
                  : "bg-muted text-muted-foreground hover:bg-card hover:shadow-sm" // 비활성화된 카테고리 스타일
              }
            `}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* 포스트 목록 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((postData) => (
            <PostCard key={postData.id} post={postData} />
          ))
        ) : (
          <p className="text-muted-foreground text-center col-span-full py-12">
            선택하신 카테고리에 해당하는 포스트가 없습니다.
          </p>
        )}
      </div>
    </>
  );
};

export default PostListClient;
