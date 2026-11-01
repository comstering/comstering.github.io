import { renderOg } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export const GET = () =>
  renderOg({
    title: SITE_NAME,
    site: "comstering.github.io",
    meta: ["blog", "kubernetes, eks, terraform"],
  });
