import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cards from "../Interface/Cards";
import LoopingDistortedTitle from "../../Effects/LoopingDistortedTitle";
import SearchBar from "../Navbar/SearchBar";
import assets from "../../assets/assets.js";

export default function ContentSection({ animate,setActivePage }) {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredAssets = useMemo(() => {
    if (!filter.trim()) return assets;
    return assets.filter(
      (a) =>
        a.title.toLowerCase().includes(filter.toLowerCase()) ||
        a.description.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  return (
    <div className="relative flex flex-col items-center gap-4 py-24 px-20 max-sm:py-20 max-sm:p-2">
      <LoopingDistortedTitle isAnimating={animate} />

      <SearchBar filter={filter} setFilter={setFilter} />

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
                onclick={() => setActivePage(asset.route)}
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
