import { getPostData, getSortedPostsData } from "@/lib/posts";
import type { SearchEntry } from "@/lib/search";

export const dynamic = "force-static";

// 헤더 검색 팔레트가 처음 열릴 때만 내려받는다. 글(draft 제외)의 제목·설명·태그·카테고리·소제목(h2·h3).
export async function GET() {
  const published = getSortedPostsData().filter((post) => !post.draft);
  // 소제목(h2·h3)은 본문을 처리해야 알 수 있다(글 상세 페이지와 같은 결과, getPostData는 캐시됨)
  const posts = await Promise.all(published.map((post) => getPostData(post.id)));
  const index: SearchEntry[] = posts.map((post) => ({
    t: post.title,
    desc: post.description,
    d: post.date,
    c: post.categories,
    tags: post.tags,
    h: post.headings.map((heading) => heading.text),
    u: `/posts/${post.id}`,
  }));
  return Response.json(index);
}
