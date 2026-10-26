import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comstering's Dev Notes",
  description: "Comstering's personal development blog",
  keywords:
    "Comstering, 개발 블로그, Dev Notes, Programming, Software Development",
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
