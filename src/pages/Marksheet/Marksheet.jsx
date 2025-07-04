import React, { useState } from "react";
import { Plus, RotateCcw, RotateCw } from "lucide-react";
import StudentMarkCard from "./StudentMarkCard.jsx";

export default function Marksheet({ theme = "light" }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Priya Patel",
      subjects: [
        { name: "Math", mark: 78 },
        { name: "Science", mark: 82 },
        { name: "English", mark: 74 },
      ],
    },
    {
      id: 2,
      name: "Ravi Shah",
      subjects: [
        { name: "Math", mark: 91 },
        { name: "Science", mark: 88 },
        { name: "English", mark: 90 },
      ],
    },
    {
      id: 3,
      name: "Kunal Desai",
      subjects: [
        { name: "Math", mark: 55 },
        { name: "Science", mark: 61 },
        { name: "English", mark: 57 },
      ],
    },
  ]);

  const [expanded, setExpanded] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const snapshot = (src) => JSON.parse(JSON.stringify(src));
  const updateStudents = (next) => {
    setUndoStack((h) => [...h, snapshot(students)]);
    setRedoStack([]);
    setStudents(next);
  };

  const undo = () => {
    if (!undoStack.length) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack((r) => [...r, snapshot(students)]);
    setUndoStack((h) => h.slice(0, -1));
    setStudents(prev);
  };

  const redo = () => {
    if (!redoStack.length) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((h) => [...h, snapshot(students)]);
    setRedoStack((r) => r.slice(0, -1));
    setStudents(next);
  };

  const addStudent = () => {
    updateStudents([
      ...students,
      { id: nextId, name: "", subjects: [{ name: "", mark: 0 }] },
    ]);
    setNextId((n) => n + 1);
    setExpanded(nextId);
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen flex flex-col items-center pt-4 sm:pt-8 mt-[10vh] px-3 gap-6 pb-24"
      style={{ color: "var(--text-color)" }}
    >
      <h1 className="text-xl font-bold">Professor's Marksheet</h1>

      <div className="flex gap-2 items-center">
        <button
          onClick={addStudent}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border shadow active:shadow-inner"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>
        <button
          onClick={undo}
          disabled={!undoStack.length}
          className="p-2 rounded-lg border disabled:opacity-40"
          style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={!redoStack.length}
          className="p-2 rounded-lg border disabled:opacity-40"
          style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full max-w-[380px]">
        {students.map((student) => (
          <StudentMarkCard
            key={student.id}
            student={student}
            isExpanded={expanded === student.id}
            onExpand={() =>
              setExpanded(expanded === student.id ? null : student.id)
            }
            updateStudents={updateStudents}
            students={students}
            setExpanded={setExpanded}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
