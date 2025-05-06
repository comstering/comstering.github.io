// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Dev Blog",
  description: "기술 블로그와 포트폴리오",
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
