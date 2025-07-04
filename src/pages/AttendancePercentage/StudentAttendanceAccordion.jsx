import { ChevronDown } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useRef, useEffect, memo } from "react";

const COLORS = ["#16a34a", "#dc2626"]; // Present • Absent

/**
 * ─────────────────────────────────────────────────────────────
 *  Row component for ONE student ─ keeps hooks outside loops
 * ─────────────────────────────────────────────────────────────
 */
const StudentRow = memo(function StudentRow({ student, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Expand / collapse animation
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
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors">
      {/* Trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-4 py-3 flex justify-between items-center text-left"
      >
        <div>
          <div className="text-sm font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">Attendance: {percentage}%</div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Animated content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height }}
      >
        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Doughnut chart */}
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Stats */}
            <div className="w-full lg:w-1/2 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Total Classes:</span>
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
              <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
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

/**
 * ─────────────────────────────────────────────────────────────
 *  Accordion wrapper for all students
 * ─────────────────────────────────────────────────────────────
 */
export default function StudentAttendanceAccordion({ students = [], searchFilter = "" }) {
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
    return <p className="text-sm text-gray-500">No matching students found.</p>;
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
