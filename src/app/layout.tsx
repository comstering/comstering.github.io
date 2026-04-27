import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Comstering's Dev Notes",
  description: "Comstering's personal development blog",
  keywords:
    "Comstering, 개발 블로그, Dev Notes, Programming, Software Development",
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="ko" suppressHydrationWarning>
    <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#0F172A] text-[#111827] dark:text-[#F8FAFC]">
      <ThemeProvider>
        {/* Background Ornaments */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#2563EB]/5 dark:bg-[#38BDF8]/5 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#2563EB]/5 dark:bg-[#38BDF8]/5 rounded-full blur-[140px]"></div>
        </div>

        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
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
