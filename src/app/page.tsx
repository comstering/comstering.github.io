import "./home.css";
import { HeroTerminal } from "@/components/home/HeroTerminal";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { JsonLd } from "@/components/JsonLd";
import { PostsBlock } from "@/components/PostsBlock";
import { loadSite } from "@/lib/content/profile";
import { loadSeriesRegistry } from "@/lib/content/registry";
import { getSortedPostsData } from "@/lib/posts";
import { loadPopular } from "@/lib/popular";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  pageAlternates,
  pageOpenGraph,
} from "@/lib/site";
import { buildWebSiteJsonLd } from "@/lib/structured-data";

export const metadata = {
  alternates: pageAlternates("/"),
  openGraph: pageOpenGraph({
    url: "/",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  }),
};

const TAG_LIMIT = 10;

const Home = () => {
  const posts = getSortedPostsData();
  const site = loadSite();

  const titles = new Map(posts.map((post) => [post.id, post.title]));
  const popular = loadPopular(new Set(titles.keys())).map(({ id }) => ({
    id,
    title: titles.get(id) ?? id,
  }));

  const registry = loadSeriesRegistry();
  const series = Object.entries(registry)
    .map(([slug, { title }]) => {
      const members = posts
        .filter((post) => post.series === slug)
        .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
      return { slug, title, count: members.length, firstPostId: members[0]?.id };
    })
    .filter(
      (item): item is typeof item & { firstPostId: string } =>
        item.count > 0 && !!item.firstPostId,
    );

  // 태그: 글 수 상위 10개, 같으면 이름순
  const tagCounts = new Map<string, number>();
  posts.forEach((post) =>
    post.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)),
  );
  const tags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, TAG_LIMIT)
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="home">
      <JsonLd data={buildWebSiteJsonLd()} />
      <section className="home__hero hero" aria-labelledby="hero-title">
        <HeroTerminal site={site} />
      </section>

      <section className="home__list" aria-labelledby="posts-title">
        <h2 className="sr-only" id="posts-title">
          글 목록
        </h2>
        <PostsBlock posts={posts} />
      </section>

      {/* 소스 순서는 글 목록 뒤(키보드·낭독 순서), 화면 위치는 grid가 정한다 */}
      <aside className="home__aside" aria-label="사이드바">
        <HomeSidebar popular={popular} series={series} tags={tags} />
      </aside>
    </div>
  );
};

export default Home;
