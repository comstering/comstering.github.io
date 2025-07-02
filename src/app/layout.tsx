import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comstering's Dev Notes",
  description: "Comstering's personal development blog",
  keywords:
    "Comstering, 개발 블로그, Dev Notes, Programming, Software Development",
  icons: {
    icon: "/icon.png",
  },
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="ko">
    <body
      className={`${inter.className} bg-white text-black dark:bg-zinc-900 dark:text-white`}
    >
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </body>
  </html>
);

export default RootLayout;
