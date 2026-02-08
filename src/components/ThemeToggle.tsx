"use client";

import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // useEffect는 브라우저에서만 실행됩니다.
  useEffect(() => {
    setMounted(true);
  }, []);

  // 아직 마운트되지 않았다면(서버 렌더링 중이라면) 아무것도 그리지 않거나
  // 레이아웃이 깨지지 않게 빈 박스만 보여줍니다.
  if (!mounted) {
    return <div className="w-6 h-6" />; // 아이콘 크기만큼 빈 공간 확보
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:ring-2 hover:ring-sky-500/50 transition-all duration-300 overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon */}
        <div
          className={`absolute transition-all duration-500 transform ${
            theme === "light"
              ? "translate-y-0 opacity-100 rotate-0 scale-100"
              : "translate-y-8 opacity-0 rotate-45 scale-50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle
              cx="12"
              cy="12"
              r="5"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        {/* Moon Icon */}
        <div
          className={`absolute transition-all duration-500 transform ${
            theme === "dark"
              ? "translate-y-0 opacity-100 rotate-0 scale-100"
              : "-translate-y-8 opacity-0 rotate-[-45deg] scale-50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
};

export default ThemeToggle;
