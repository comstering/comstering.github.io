"use client";

import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchModal } from "./SearchModal";

export const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = (): void => {
    const next = document.documentElement.classList.toggle("dark");
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="border-b border-gray-200 dark:border-zinc-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/profile.png"
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <span className="font-semibold hidden sm:inline">My Dev Blog</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setShowSearch(true)} aria-label="Search">
            <Search size={20} />
          </button>
        </div>
      </div>
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </header>
  );
};
