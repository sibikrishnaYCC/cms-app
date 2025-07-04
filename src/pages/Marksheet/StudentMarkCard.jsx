import React from "react";
import { Plus, Trash2 } from "lucide-react";
import ChartCard from "./ChartCard.jsx";
import SubjectInput from "./SubjectInput.jsx";

export default function StudentMarkCard({
  student,
  isExpanded,
  onExpand,
  updateStudents,
  students,
  setExpanded,
  theme,
}) {
  const isDark = theme === "dark";

  const handleChange = (field, value) => {
    updateStudents(
      students.map((s) =>
        s.id === student.id ? { ...s, [field]: value } : s
      )
    );
  };

  const handleSubjectChange = (idx, field, value) => {
    updateStudents(
      students.map((s) =>
        s.id === student.id
          ? {
              ...s,
              subjects: s.subjects.map((sub, i) =>
                i === idx
                  ? {
                      ...sub,
                      [field]: field === "mark" ? Number(value) : value,
                    }
                  : sub
              ),
            }
          : s
      )
    );
  };

  const addSubject = () => {
    updateStudents(
      students.map((s) =>
        s.id === student.id
          ? {
              ...s,
              subjects: [...s.subjects, { name: "", mark: 0 }],
            }
          : s
      )
    );
  };

  const removeSubject = (idx) => {
    updateStudents(
      students.map((s) =>
        s.id === student.id
          ? {
              ...s,
              subjects: s.subjects.filter((_, i) => i !== idx),
            }
          : s
      )
    );
  };

  const deleteStudent = () => {
    updateStudents(students.filter((s) => s.id !== student.id));
    setExpanded(null);
  };

  const total = student.subjects.reduce((acc, sub) => acc + sub.mark, 0);
  const percent = student.subjects.length
    ? (total / student.subjects.length).toFixed(1)
    : 0;
  const grade = (p) =>
    p >= 85 ? "A" : p >= 70 ? "B" : p >= 55 ? "C" : "F";

  return (
    <div
      className="mb-3 rounded-2xl overflow-hidden shadow border"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      <button
        onClick={onExpand}
        className="w-full flex justify-between items-center px-4 py-3 text-left"
      >
        <span className="font-medium truncate max-w-[60%]">
          {student.name || "New Student"}
        </span>
        <span className="text-sm font-semibold">
          {percent}%{" "}
          <span style={{ color: "var(--muted-text)" }}>({grade(percent)})</span>
        </span>
      </button>

      {isExpanded && (
        <div
          className="px-4 py-3 border-t text-sm flex flex-col gap-4"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span>Name</span>
              <input
                type="text"
                placeholder="Enter name"
                value={student.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-40 text-center rounded py-1 outline-none border"
                style={{
                  backgroundColor: "var(--bg)",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                }}
              />
            </div>

            {student.subjects.map((sub, idx) => (
              <SubjectInput
                key={idx}
                idx={idx}
                subject={sub}
                onChange={(field, value) =>
                  handleSubjectChange(idx, field, value)
                }
                onRemove={() => removeSubject(idx)}
              />
            ))}

            <button
              onClick={addSubject}
              className="flex items-center gap-1 text-xs mt-1 self-start"
              style={{ color: "#2563eb" }}
            >
              <Plus className="w-4 h-4" /> Add Subject
            </button>

            <div className="flex items-center justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>
                {total}/{student.subjects.length * 100}
              </span>
            </div>
          </div>

          {student.subjects.length > 0 && (
            <ChartCard data={student.subjects} name={student.name} isDark={isDark} />
          )}

          <button
            onClick={deleteStudent}
            className="self-start flex items-center gap-1 text-xs"
            style={{ color: "red" }}
          >
            <Trash2 className="w-4 h-4" /> Remove Student
          </button>
        </div>
      )}
    </div>
  );
}
