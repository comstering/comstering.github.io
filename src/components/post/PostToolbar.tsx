import type { PostHeading, SeriesInfo } from "@/lib/posts";
import { PostToc } from "@/components/PostToc";
import { hasToc } from "@/lib/toc";
import { SeriesBox } from "./SeriesBox";

interface PostToolbarProps {
  headings: PostHeading[];
  series: SeriesInfo | null;
}

// 본문 위 도구 줄. 1280px 미만에서는 목차·시리즈가 한 줄 두 버튼으로 나란히 놓이고,
// 1280px 이상에서는 목차가 오른쪽 sticky로 가서 시리즈 박스만 남는다 (디자인 08 H1).
// 둘 다 없으면 아무것도 그리지 않는다.
export const PostToolbar = ({ headings, series }: PostToolbarProps) => {
  const toc = hasToc(headings);
  if (!toc && !series) return null;

  return (
    <div className="post-tools">
      {toc && <PostToc headings={headings} variant="inline" />}
      {series && <SeriesBox series={series} />}
    </div>
  );
};
