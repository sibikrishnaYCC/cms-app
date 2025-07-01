import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cards from "../Interface/Cards";
import assets from "../../assets/assets.js";

export default function MainInterface() {
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === assets.length) {
        setLoaded(true);
      }
    };

    const imageElements = assets.map((asset) => {
      const img = new Image();
      img.src = asset.name;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // continue even if an image fails
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-gray-700 text-lg">Loading assets...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-20 max-sm:py-20 max-sm:p-2">
      <input
        type="text"
        placeholder="Search..."
        className="w-full max-w-md px-4 py-2 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
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
  );
}
