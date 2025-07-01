import React from "react";
import { Sun, Moon, Play, Pause } from "lucide-react";

export default function TopNavBar({ theme, toggleTheme, animate, toggleAnimate }) {
  return (
    <div className="w-full fixed top-4 z-20 flex justify-center px-2 sm:px-4">
      <div className="backdrop-blur-lg bg-[var(--bg)]/80 border border-[var(--border-color)] shadow-md px-4 py-2 sm:px-6 sm:py-3 rounded-2xl flex items-center justify-between gap-4 w-full max-w-[95%] sm:max-w-3xl">
        <h1 className="text-base sm:text-lg font-semibold text-[var(--text-color)]">Archivum</h1>

        <div className="flex items-center gap-2">
          {/* Animate Toggle */}
          <button
            onClick={toggleAnimate}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle animation"
          >
            {animate ? (
              <Pause className="text-blue-500 h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Play className="text-gray-500 h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-400 h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Moon className="text-gray-600 h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
