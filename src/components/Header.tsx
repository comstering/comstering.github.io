// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  // 다크모드 상태 관리 (기본 HTML 클래스 토글 방식)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isNowDark = html.classList.toggle("dark");
    setIsDark(isNowDark);
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
  };

  return (
    <header className="flex items-center justify-between py-4 px-2 border-b border-gray-200 dark:border-zinc-700">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/profile.png"
          alt="Profile"
          width={48}
          height={48}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold hidden sm:inline">My Dev Blog</span>
      </Link>

      {/* 오른쪽 버튼들 */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={() => alert("검색 모달 예정")} aria-label="Search">
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}
