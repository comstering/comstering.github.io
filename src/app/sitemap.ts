import { getSortedPostsData } from "@/lib/posts";
import { ABOUT_LAST_MODIFIED, SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData().filter((post) => !post.draft);
  const modified = (post: (typeof posts)[number]) => post.date;

  // 빌드 시각을 쓰지 않는다: 같은 콘텐츠면 같은 sitemap이 나온다.
  const latest = posts.reduce(
    (max, post) => (modified(post) > max ? modified(post) : max),
    ABOUT_LAST_MODIFIED,
  );

  return [
    {
      url: SITE_URL,
      lastModified: latest,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/posts/${post.id}`,
      lastModified: modified(post),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
