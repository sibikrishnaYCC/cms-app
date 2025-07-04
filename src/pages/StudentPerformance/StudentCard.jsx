import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StudentChartPanel from "./StudentChartPanel.jsx";

export default function StudentCard({
  student,
  isActive,
  showCharts,
  onToggle,
  loading,
  theme
}) {
  return (
    <div
      className="border rounded-2xl shadow p-4"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-color)",
        borderColor: "var(--border-color)",
      }}
    >
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
            <p
              className="text-sm"
              style={{ color: "var(--muted-text)" }}
            >
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
            theme={theme}
            showCharts={showCharts}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
