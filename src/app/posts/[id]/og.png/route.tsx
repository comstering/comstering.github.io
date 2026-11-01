import { notFound } from "next/navigation";
import { getSortedPostsData } from "@/lib/posts";
import { renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () =>
  getSortedPostsData().map((post) => ({ id: post.id }));

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const post = getSortedPostsData().find((item) => item.id === id);
  if (!post) notFound();

  return renderOg({
    title: post.title,
    site: "comstering.github.io",
    meta: [
      post.categories.join(", "),
      post.date,
      ...(post.seriesLabel && post.seriesOrder && post.seriesTotal
        ? [`series ${post.seriesLabel} ${post.seriesOrder}/${post.seriesTotal}`]
        : []),
    ],
  });
};
