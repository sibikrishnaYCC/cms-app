import { ChevronDown } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useRef, useEffect, memo } from "react";

const COLORS = ["#2d1bd1", "#d11b3c"]; // Present • Absent

// ─────────────────────────────
// One student row
// ─────────────────────────────
const StudentRow = memo(function StudentRow({ student, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const { name, present, absent, total } = student;
  const percentage = total ? Math.round((present / total) * 100) : 0;

  const pieData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  return (
    <div
      className="border rounded-lg shadow-sm transition-colors hover:opacity-95"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-4 py-3 flex justify-between items-center text-left"
      >
        <div>
          <div
            className="text-sm font-medium"
            style={{ color: "var(--text-color)" }}
          >
            {name}
          </div>
          <div
            className="text-xs"
            style={{ color: "var(--muted-text)" }}
          >
            Attendance: {percentage}%
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: "var(--muted-text)" }}
        />
      </button>

      {/* Expandable Content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height }}
      >
        <div
          className="px-4 pb-4 pt-2 border-t"
          style={{
            backgroundColor: "var(--card-inner-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Chart */}
            <div className="w-full h-52 lg:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, idx) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[idx % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg)",
                      color: "var(--text-color)",
                      border: "none",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Stats */}
            <div
              className="w-full lg:w-1/2 space-y-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <div className="flex justify-between">
                <span className="font-medium" style={{ color: "var(--text-color)" }}>
                  Total Classes:
                </span>
                <span>{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-600">Present:</span>
                <span>{present}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-red-600">Absent:</span>
                <span>{absent}</span>
              </div>
              <div
                className="flex justify-between font-semibold border-t pt-2"
                style={{
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                }}
              >
                <span>Attendance Rate:</span>
                <span>{percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────
// Wrapper for all students
// ─────────────────────────────
export default function StudentAttendanceAccordion({
  students = [],
  searchFilter = "",
}) {
  const [openIds, setOpenIds] = useState([]);

  const toggleItem = (id) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const filteredStudents = students.filter((student) => {
    const query = searchFilter.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query)
    );
  });

  if (filteredStudents.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-text)" }}>
        No matching students found.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {filteredStudents.map((student) => (
        <StudentRow
          key={student.id}
          student={student}
          isOpen={openIds.includes(student.id)}
          onToggle={() => toggleItem(student.id)}
        />
      ))}
    </div>
  );
}
