import { loadSite } from "@/lib/content/profile";
import { renderOg } from "@/lib/og";

export const dynamic = "force-static";

// 홈 OG(디자인 31번 3장 B안): 제목은 사이트 이름, 하단 mono 줄에 히어로의 명령 줄(accent)과 문구.
// 문구는 content/site.yaml 한 곳에서 나온다.
export const GET = () => {
  const site = loadSite();
  return renderOg({
    title: site.title,
    site: "comstering.github.io",
    meta: [`$ ${site.command}`, site.tagline],
  });
};
