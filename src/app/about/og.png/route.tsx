import { renderOg } from "@/lib/og";
import { AUTHOR } from "@/lib/site";

export const dynamic = "force-static";

export const GET = () =>
  renderOg({
    title: "개발과 운영의 경계를 좁히는 클라우드 네이티브 엔지니어",
    site: "about",
    meta: [AUTHOR.name, "kubernetes, eks, terraform"],
  });
