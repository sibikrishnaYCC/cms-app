import React, { useState } from "react";
import StudentDetailCard from "./StudentDetailCard.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function StudentInfoAccordion({ student }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border rounded-xl shadow-sm transition-all overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      <button
        className="w-full flex justify-between items-center px-4 py-3 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
        
          <div className="text-left">
            <div className="font-medium">{student.name}</div>
            <div className="text-xs text-gray-500">
              Roll No: {student.rollNo} · ID: {student.admissionNo}
            </div>
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="px-5 pb-4">
          <StudentDetailCard student={student} />
        </div>
      )}
    </div>
  );
}
