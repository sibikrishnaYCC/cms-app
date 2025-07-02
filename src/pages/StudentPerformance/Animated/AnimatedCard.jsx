import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Charts from "../Charts";

export default function AnimatedCard({ name, isActive, onClick, theme }) {
  /* width controller */
  const controls = useAnimation();

  /* local flags for step‑by‑step flow */
  const [heightOpen, setHeightOpen]   = useState(false); // step 2
  const [showCharts, setShowCharts]   = useState(false); // step 4

  /* master effect ‑ run every time isActive changes */
  useEffect(() => {
    let timeoutId

    const runSequence = async () => {
      /* STEP 1 – expand width */
      await controls.start("expand");           // 0.6 s

      /* STEP 2 – open height */
      setHeightOpen(true);                      // layout anim ≈ 0.45 s

      /* STEP 3 & 4 – skeleton → charts */
      setShowCharts(false);                     // show skeleton first
      timeoutId = setTimeout(() => setShowCharts(true), 800); // 0.8 s wait
    };

    if (isActive) {
      runSequence();
    } else {
      /* reset to initial */
      controls.set("initial");
      setHeightOpen(false);
      setShowCharts(false);
    }

    /* cleanup any pending timeouts on unmount / toggle */
    return () => clearTimeout(timeoutId);
  }, [isActive]);

  /* width variants */
  const widthVariants = {
    initial: { width: "24rem" },   // Tailwind w‑96
    expand : { width: "100%" , transition: { duration: 0.6, ease: "easeInOut" } }
  };

  return (
    <motion.div
      variants={widthVariants}
      initial="initial"
      animate={controls}
      layout            /* allows Framer to animate height smoothly */
      className={`cursor-pointer  col-span-1 ${
        isActive ? "col-span-2 " : " max-sm:w-full"
      }`}
      onClick={onClick}
    >
      <Card
        as={motion.div}
        layout                  /* height animation handled automatically */
        transition={{ duration: 0.45 }}
        className={`rounded-lg shadow-sm overflow-visible p-1.5 max-sm:p-1
          ${heightOpen ? "min-h-20 w-full" : " h-auto"}`}
      >
        {/* ── header row ── */}
        <CardContent className="flex items-center space-x-2 p-0">
          <div className="w-18 max-sm:w-14 h-full flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="/arise.webp"
              className="object-cover w-full h-full"
              alt="Student Icon"
            />
          </div>
          <div className="flex-1 flex items-center mt-2">
            <span className="text-black text-[12px] max-sm:text-[8px] font-medium leading-snug self-start">
              {name}
            </span>
          </div>
        </CardContent>

        {/* ── expandable section ── */}
        {heightOpen && (
          <motion.div
            layout
            className="mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            {/* short meta */}
            <div className="text-[11px] sm:text-xs mb-3 px-1">
              <p>College • Computer Science Major</p>
              <p>GPA 3.8 • Semester 5</p>
            </div>

            {/* skeleton then charts */}
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div className="w-full max-w-2xl">
                {!showCharts ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Charts loading={false} theme={theme} />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
