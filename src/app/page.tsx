// src/app/page.tsx (서버 컴포넌트)
import { getSortedPostsData, PostMetadata } from "@/lib/posts";
import { PostsBlock } from "@/components/PostsBlock";

const Home = () => {
  const allPostsData: PostMetadata[] = getSortedPostsData(); // 모든 포스트 데이터

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      <section className="text-center py-12 space-y-6">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
            Comstering&apos;s Dev Notes
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
          기술적 깊이와 일상의 영감을 기록하는 공간입니다.
        </p>
      </section>

      <section>
        <PostsBlock posts={allPostsData} />
      </section>
    </div>
  );
};

export default Home;
