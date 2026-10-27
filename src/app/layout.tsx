import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { JetBrains_Mono } from "next/font/google";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  RSS_PATH,
  SITE_URL,
  pageOpenGraph,
} from "@/lib/site";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s · Comstering" },
  description: SITE_DESCRIPTION,
  keywords:
    "Comstering, 개발 블로그, Dev Notes, DevOps, Cloud Native, Kubernetes, AWS, Terraform",
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  // canonical과 og:url은 각 페이지에서 지정한다 (페이지 metadata가 layout 값을 교체함)
  alternates: { types: { "application/rss+xml": RSS_PATH } },
  openGraph: pageOpenGraph({ title: SITE_NAME, description: SITE_DESCRIPTION }),
  twitter: { card: "summary_large_image" },
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="ko" className={jetbrainsMono.variable} suppressHydrationWarning>
    <body className="flex min-h-screen flex-col">
      <ThemeProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-on"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main" className="relative z-10 mx-auto w-full max-w-[1120px] flex-grow px-5 py-12 sm:px-6">
          {children}
        </main>
        <Footer />
      </ThemeProvider>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2657417531473772"
        crossOrigin="anonymous"
      />
      <script
        data-goatcounter="https://comstering.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      />
    </body>
  </html>
);

export default RootLayout;
