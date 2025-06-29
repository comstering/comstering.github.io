// src/app/page.tsx (서버 컴포넌트)

import { getSortedPostsData, PostMetadata } from "@/lib/posts";
import { PostsBlock } from "@/components/PostsBlock";
import Image from "next/image";
import { Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import Link from "next/link";

const BlogHome = () => {
  // 서버에서 데이터 패칭 (fs 모듈 사용 가능)
  const allPostsData: PostMetadata[] = getSortedPostsData(); // 모든 포스트 데이터

  return (
    <div className="mx-auto p-4 sm:p-8">
      {/* 블로그 메인 헤더 */}

      <h1 className="sr-only">Comstering&lsquo;s Dev Notes</h1>
      <div className="flex items-center justify-center">
        <div className="relative w-full aspect-[3/1] mb-8 max-w-md">
          <Image
            src="/blog-logo.png"
            alt="Comstering's Dev Notes"
            fill
            className="object-contain"
          />
        </div>
        <div className="space-x-6 gap-2">
          <Link
            href="https://github.com/comstering"
            target="_blank"
            aria-label="GitHub"
            className="flex m-2"
          >
            <SiGithub
              size={20}
              className="hover:text-gray-900 dark:hover:text-white mr-2"
            />
            <span>Github</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/hansu-choi-05775a244"
            target="_blank"
            aria-label="LinkedIn"
            className="flex m-2"
          >
            <SiLinkedin
              size={20}
              className="hover:text-gray-900 dark:hover:text-white mr-2"
            />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="mailto:comstering@gmail.com"
            aria-label="Email"
            className="flex m-2"
          >
            <Mail
              size={20}
              className="hover:text-gray-900 dark:hover:text-white mr-2"
            />
            <span>Mail</span>
          </Link>
        </div>
      </div>

      <section>
        <PostsBlock posts={allPostsData} />
      </section>
    </div>
  );
};

export default BlogHome;
