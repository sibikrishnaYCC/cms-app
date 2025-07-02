import { motion } from "framer-motion";

export default function SkeletonCard({ theme }) {
  const bgColor = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const pulseBg = theme === "dark" ? "bg-gray-700" : "bg-gray-200";

  return (
    <motion.div
      className={`border rounded-2xl shadow p-4 w-full ${bgColor} ${borderColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 animate-pulse">
        <div className={`w-12 h-12 rounded-full ${pulseBg}`} />
        <div className="flex-1 space-y-2">
          <div className={`h-4 w-3/4 rounded ${pulseBg}`} />
          <div className={`h-3 w-1/2 rounded ${pulseBg}`} />
        </div>
      </div>
    </motion.div>
  );
}
