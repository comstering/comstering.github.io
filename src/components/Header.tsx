"use client";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const activeLinkClass = "text-[#2563EB] dark:text-[#38BDF8] font-black scale-105";
  const inactiveLinkClass =
    "text-[#6B7280] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-all font-bold";

  return (
    <header className="sticky top-0 z-[60] bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-[#E5E7EB] dark:border-[#334155]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] dark:from-[#38BDF8] dark:to-[#0EA5E9] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-[#2563EB]/20 dark:shadow-[#38BDF8]/20 group-hover:rotate-12 transition-transform">
                D
              </div>
              <span className="text-2xl font-black text-[#111827] dark:text-[#F8FAFC] tracking-tighter">
                Dev<span className="text-[#2563EB] dark:text-[#38BDF8]">Notes</span>
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
            <div className="h-6 w-[1px] bg-[#E5E7EB] dark:bg-[#334155] mx-2"></div>
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
