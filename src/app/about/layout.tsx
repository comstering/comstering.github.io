import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import {
  AUTHOR,
  SITE_URL,
  pageAlternates,
  pageOpenGraph,
} from "@/lib/site";

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
  }),
};

const AboutLayout = ({ children }: { children: ReactNode }) => (
  <>
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR.name,
        alternateName: "Comstering",
        jobTitle: AUTHOR.jobTitle,
        url: `${SITE_URL}/about`,
        sameAs: [AUTHOR.github, AUTHOR.linkedin],
      }}
    />
    {children}
  </>
);

export default AboutLayout;
