import { getSortedPostsData } from "@/lib/posts";
import {
  RSS_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  toDate,
} from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  // 최신순, draft 제외
  const posts = getSortedPostsData().filter((post) => !post.draft);
  // 빌드 시각이 아니라 최신 글 날짜를 쓰므로 같은 내용이면 같은 결과가 나온다
  const lastBuildDate = toDate(
    posts[0] ? (posts[0].updated ?? posts[0].date) : "1970-01-01",
  ).toUTCString();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/posts/${post.id}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${toDate(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}${RSS_PATH}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
