import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { pageAlternates, pageOpenGraph } from "@/lib/site";
import { buildAboutJsonLd } from "@/lib/structured-data";

const DESCRIPTION =
  "DevOps · Cloud Native Engineer 최한수(Comstering)의 경력, 프로젝트, 오픈소스 기여를 소개합니다.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: pageAlternates("/about"),
  openGraph: pageOpenGraph({
    title: "About · Comstering",
    description: DESCRIPTION,
    url: "/about",
    type: "profile",
    images: [{ url: "/about/og.png", width: 1200, height: 630 }],
  }),
};

const AboutLayout = ({ children }: { children: ReactNode }) => (
  <>
    <JsonLd data={buildAboutJsonLd()} />
    {children}
  </>
);

export default AboutLayout;
