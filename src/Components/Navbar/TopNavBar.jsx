import React from "react";
import { Sun, Moon, Play, Pause, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNavBar({
  theme,
  toggleTheme,
  animate,
  toggleAnimate,
  activePage,
  setActivePage,
  onBack, // <-- new prop for back button handler
}) {
  const showBack = activePage !== null;

  return (
    <div className="w-full fixed top-4 z-20 flex justify-center px-2 sm:px-4">
      <div className="backdrop-blur-lg bg-[var(--bg)]/80 border border-[var(--border-color)] shadow-md px-4 py-2 sm:px-6 sm:py-3 rounded-2xl flex items-center justify-between gap-4 w-full max-w-[95%] sm:max-w-3xl">

        {/* Left side: Title or Back */}
        <div className="flex items-center gap-2 min-w-[80px]">
          <AnimatePresence mode="wait">
            {showBack ? (
              <motion.button
                key="back-button"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0, transition: { delay: 0.1 } }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
                onClick={() => {
                  if (onBack) onBack(); // call onBack instead of just setActivePage(null)
                  else setActivePage(null); // fallback if no onBack handler
                }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--text-color)]" />
              </motion.button>
            ) : (
              <motion.h1
                key="title"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut", delay: 0.15 }}
                style={{ willChange: "transform" }}
                className="text-base sm:text-lg font-semibold text-[var(--text-color)]"
              >
                Archivum
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
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
