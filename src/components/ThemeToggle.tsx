"use client";

import React from "react";

const ThemeToggle: React.FC = () => {
  const handleToggle = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-2 rounded-xl bg-[#F3F4F6] dark:bg-[#1E293B] text-[#111827] dark:text-[#F8FAFC] hover:ring-2 hover:ring-[#2563EB]/50 dark:hover:ring-[#38BDF8]/50 transition-all duration-300 overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon - visible in light mode */}
        <div className="absolute transition-all duration-500 transform translate-y-0 opacity-100 rotate-0 scale-100 dark:translate-y-8 dark:opacity-0 dark:rotate-45 dark:scale-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#2563EB]"
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

        {/* Moon Icon - visible in dark mode */}
        <div className="absolute transition-all duration-500 transform -translate-y-8 opacity-0 rotate-[-45deg] scale-50 dark:translate-y-0 dark:opacity-100 dark:rotate-0 dark:scale-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#38BDF8]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-[#2563EB]/5 dark:bg-[#38BDF8]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
};

export default ThemeToggle;
