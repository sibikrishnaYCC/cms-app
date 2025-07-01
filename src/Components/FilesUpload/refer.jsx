import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A single, shared top‑navbar that stays fixed while the rest of the UI slides.
 */
const TopNavbar = ({ hasBack, onBack, title }) => (
  <div className="fixed top-0 left-0 w-full bg-gray-100 shadow flex items-center justify-between p-4 z-20">
    {hasBack ? (
      <button onClick={onBack} className="text-blue-500 font-semibold">
        ← Back
      </button>
    ) : (
      <div className="w-12" />
    )}
    <h1 className="text-lg font-bold">{title}</h1>
    <div className="w-12" /> {/* Spacer to balance flex */}
  </div>
);

/**
 * The slide‑in page component (content area only, navbar is shared).
 */
const Page = ({ title }) => (
  <motion.div
    key={title}
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ duration: 0.5 }}
    className="absolute top-0 left-0 w-full h-full pt-20 p-6 bg-white"
  >
    <p>This is the {title} page.</p>
  </motion.div>
);

/**
 * A clickable box on the home screen.
 */
const Box = ({ title, onClick }) => (
  <div
    onClick={onClick}
    className="bg-blue-500 text-white p-6 rounded-xl shadow cursor-pointer hover:bg-blue-600 transition"
  >
    {title}
  </div>
);

export default function App() {
  const [activePage, setActivePage] = useState(null);

  const handleBoxClick = (page) => setActivePage(page);
  const handleBack = () => setActivePage(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Shared Navbar */}
      <TopNavbar hasBack={Boolean(activePage)} onBack={handleBack} title={activePage || "Home"} />

      {/* Home Screen (slides left when a page is active) */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 pt-20" /* pt‑20 to clear navbar */
        animate={{ x: activePage ? "-100%" : "0%" }}
        transition={{ duration: 0.5 }}
      >
        <Box title="Box 1" onClick={() => handleBoxClick("Box 1")} />
        <Box title="Box 2" onClick={() => handleBoxClick("Box 2")} />
        <Box title="Box 3" onClick={() => handleBoxClick("Box 3")} />
      </motion.div>

      {/* Active Page (slides in from right) */}
      <AnimatePresence>{activePage && <Page title={activePage} />}</AnimatePresence>
    </div>
  );
}
