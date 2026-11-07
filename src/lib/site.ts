import type { Metadata } from "next";

import { loadProfile, loadSite } from "@/lib/content/profile";
import { SITE_URL } from "@/lib/site-url";

// 서버 전용(content/*.yaml을 읽음). 클라이언트 컴포넌트는 SITE_URL만 site-url.ts에서 가져온다.
export { SITE_URL };
export const SITE_NAME = loadSite().title;
export const SITE_DESCRIPTION =
  "DevOps · Cloud Native Engineer Comstering의 개발 노트. Kubernetes, AWS, 오픈소스 기여와 일하는 방식을 기록합니다.";

const profile = loadProfile();
export const AUTHOR = {
  name: profile.name,
  jobTitle: profile.role,
  github: profile.contacts.github,
  linkedin: profile.contacts.linkedin,
  email: profile.contacts.email,
} as const;

// About 데이터(src/app/about)를 수정하면 이 날짜도 함께 갱신한다. (sitemap lastModified)
export const ABOUT_LAST_MODIFIED = "2026-04-28";

export const DEFAULT_OG_IMAGE = "/og.png";

export const RSS_PATH = "/rss.xml";

// Next.js는 page의 metadata 필드를 layout 값과 병합하지 않고 통째로 교체한다.
// 그래서 alternates와 openGraph는 페이지마다 이 헬퍼로 만든다.
export const pageAlternates = (path: string): Metadata["alternates"] => ({
  canonical: path,
  types: { "application/rss+xml": RSS_PATH },
});

export const pageOpenGraph = (
  overrides: NonNullable<Metadata["openGraph"]>,
): NonNullable<Metadata["openGraph"]> => ({
  siteName: SITE_NAME,
  locale: "ko_KR",
  type: "website",
  images: [{ url: DEFAULT_OG_IMAGE }],
  ...overrides,
});

// 'YYYY-MM-DD'를 한국 시간 자정으로 해석한 Date (RSS pubDate, sitemap lastModified용)
export const toDate = (date: string): Date => new Date(`${date}T00:00:00+09:00`);
