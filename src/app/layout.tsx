import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Tech Blog",
  description: "성장형 개인 기술 블로그",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className="darkMode">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-bold hover:text-gray-700">
              My Blog
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-lg hover:text-blue-600">
                Blog
              </Link>
              <Link href="/about" className="text-lg hover:text-blue-600">
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
