import { motion } from "framer-motion";
import Charts from "./Charts.jsx";

export default function StudentChartPanel({ showCharts, loading, theme }) {
  return (
    <motion.div
      key="chart-wrapper"
      layout
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ transformOrigin: "top" }}
      className="overflow-hidden mt-4"
    >
      {!showCharts ? (
        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Charts loading={loading} theme={theme} />
        </motion.div>
      )}
    </motion.div>
  );
}
