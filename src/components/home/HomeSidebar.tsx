import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { TagButton } from "./TagButton";

export interface SidebarPopular {
  id: string;
  title: string;
}
export interface SidebarSeries {
  slug: string;
  title: string;
  count: number;
  /** 시리즈 첫 글 */
  firstPostId: string;
}
export interface SidebarTag {
  name: string;
  count: number;
}

interface HomeSidebarProps {
  popular: SidebarPopular[];
  series: SidebarSeries[];
  tags: SidebarTag[];
}

// 홈 사이드바(PRD-004 5.2, 디자인 25번 6장): popular · series · tags. 카테고리·최근글·About 링크는 없다.
// popular는 데이터가 없으면 블록을 숨긴다(시리즈가 맨 위로 올라온다).
export const HomeSidebar = ({ popular, series, tags }: HomeSidebarProps) => (
  <div className="home__aside-inner">
    {popular.length > 0 && (
      <section className="section-block" aria-labelledby="popular-title">
        <SectionHead id="popular-title">popular</SectionHead>
        <ol className="rank-list">
          {popular.map((post, index) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <span className="rank-list__n">{index + 1}</span>
                <span className="rank-list__t">{post.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    )}

    {series.length > 0 && (
      <section className="section-block" aria-labelledby="series-title">
        <SectionHead id="series-title">series</SectionHead>
        <ul className="feat-list">
          {series.map((item) => (
            <li key={item.slug} className="feat-row">
              <span className="feat-row__year">{item.count}편</span>
              <span className="feat-row__title">
                <Link href={`/posts/${item.firstPostId}`}>{item.slug}</Link>
              </span>
              <span className="feat-row__metric">{item.title}</span>
            </li>
          ))}
        </ul>
      </section>
    )}

    {tags.length > 0 && (
      <section className="section-block" aria-labelledby="tags-title">
        <SectionHead id="tags-title">tags</SectionHead>
        <ul className="side-tags">
          {tags.map((tag) => (
            <li key={tag.name}>
              <TagButton name={tag.name} count={tag.count} />
            </li>
          ))}
        </ul>
      </section>
    )}
  </div>
);
