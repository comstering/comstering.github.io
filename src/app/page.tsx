import { getSortedPostsData } from "@/lib/posts";
import { PostsBlock } from "@/components/PostsBlock";

const Home = () => {
  const posts = getSortedPostsData();

  return (
    <div className="mx-auto max-w-[720px]">
      <section className="pb-10 pt-8 sm:pt-14">
        <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          Comstering&apos;s Dev Notes
        </h1>
        <p className="mt-4 break-keep text-lg leading-relaxed text-mute">
          기술적 깊이와 일상의 영감을 기록하는 공간입니다.
        </p>
      </section>
      <PostsBlock posts={posts} />
    </div>
  );
};

export default Home;
