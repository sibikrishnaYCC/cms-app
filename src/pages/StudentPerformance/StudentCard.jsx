import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StudentChartPanel from "./StudentChartPanel.jsx";

export default function StudentCard({
  student,
  isActive,
  showCharts,
  onToggle,
  loading,
  theme,
}) {
  // 🌓 Theme-based styles
  const bgColor = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`border rounded-2xl shadow p-4 ${bgColor} ${textColor} ${borderColor}`}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full cursor-pointer focus:outline-none rounded-lg"
      >
        <div className="flex items-center gap-4">
          <img
            src={student.photo}
            alt={student.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-semibold text-lg">{student.name}</p>
            <p className={`text-sm ${subTextColor}`}>
              Role No. {student.role}
            </p>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isActive ? <ChevronUp /> : <ChevronDown />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <StudentChartPanel
            showCharts={showCharts}
            loading={loading}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
