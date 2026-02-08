"use client";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname(); // 예: "/" 또는 "/about"
  const activeLinkClass = "text-sky-500 dark:text-sky-400 font-black scale-105";
  const inactiveLinkClass =
    "text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all font-bold";

  return (
    <header className="sticky top-0 z-[60] bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-500/20 group-hover:rotate-12 transition-transform">
                D
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                Dev<span className="text-sky-500">Notes</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className={pathname === "/" ? activeLinkClass : inactiveLinkClass}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className={
                pathname === "/about" ? activeLinkClass : inactiveLinkClass
              }
            >
              ABOUT
            </Link>
            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-2"></div>
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
