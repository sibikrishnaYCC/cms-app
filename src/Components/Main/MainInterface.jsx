import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Cards from "../Interface/Cards";
import assets from "../../assets/assets.js";
import LoopingDistortedTitle from "../../Effects/LoopingDistortedTitle.jsx";
import TopNavBar from "../Navbar/TopNavBar.jsx";
import { useNavigate } from "react-router-dom";

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute bg-purple-500/60 w-[60vw] h-[60vw] rounded-full blur-3xl"
        animate={{ x: ["-20%", "120%"], y: ["-20%", "120%"], rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      <motion.div
        className="absolute bg-pink-500/60 w-[40vw] h-[40vw] rounded-full blur-3xl"
        animate={{ x: ["120%", "-20%"], y: ["120%", "-20%"], rotate: [360, 0] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      <motion.div
        className="absolute bg-blue-500/50 w-[50vw] h-[50vw] rounded-full blur-3xl"
        animate={{ x: ["50%", "-50%"], y: ["-50%", "50%"], rotate: [0, -360] }}
        transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
    </div>
  );
}

export default function MainInterface() {
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(true);


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === assets.length) setLoaded(true);
    };

    const imageElements = assets.map((asset) => {
      const img = new Image();
      img.src = asset.name;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      return img;
    });

    return () => {
      imageElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  const filteredAssets = useMemo(() => {
    if (!filter.trim()) return assets;
    return assets.filter(
      (a) =>
        a.title.toLowerCase().includes(filter.toLowerCase()) ||
        a.description.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  if (!loaded) {
    return (
      <div className="relative flex justify-center items-center h-screen">
        <Background />
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <span className="ml-4 text-[var(--text-color)] text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Background />
      <TopNavBar
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        animate={animate}
        toggleAnimate={() => setAnimate((a) => !a)}
      />


      <div className="relative flex flex-col items-center gap-4 py-24 px-20 max-sm:py-20 max-sm:p-2">
       <LoopingDistortedTitle isAnimating={animate} />


{/* Search bar starts here */}
<div className="w-full sm:px-0">
  <div className="relative w-full max-w-md mx-auto px-1 ">
    {/* Search Icon */}
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)] pointer-events-none" />

    {/* Clear Button */}
    {filter && (
      <button
        type="button"
        onClick={() => setFilter("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-muted-hover)] transition"
        aria-label="Clear"
      >
        <X className="h-5 w-5" />
      </button>
    )}

    {/* Input */}
    <input
      type="text"
      placeholder="Search"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      onKeyDown={(e) => e.key === "Escape" && setFilter("")}
      className="
        w-full
        py-2.5 pl-10 pr-10
        rounded-lg
        bg-[var(--bg)]
        text-[var(--text-color)]
        placeholder-[var(--text-muted)]
        border border-[var(--border-color)]
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[var(--ring-color)]
        transition-all duration-150
        text-sm sm:text-base
      "
    />
  </div>
</div>
{/* Search bar ends here */}




        <motion.div
          className="flex flex-wrap justify-center gap-8 max-sm:gap-3 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          <AnimatePresence>
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Cards
                  onclick={() => navigate(asset.route)}
                  title={asset.title}
                  description={asset.description}
                  width={asset.width}
                  height={asset.height}
                  x={asset.x}
                  y={asset.y}
                  name={asset.name}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
