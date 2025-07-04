import React from "react";
import { Trash2 } from "lucide-react";

export default function SubjectInput({ idx, subject, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Subject"
        value={subject.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="flex-1 rounded py-1 px-2 outline-none border"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)",
        }}
      />
      <input
        type="number"
        min={0}
        max={100}
        value={subject.mark}
        onChange={(e) => onChange("mark", e.target.value)}
        className="w-20 text-center rounded py-1 outline-none border"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)",
        }}
      />
      <button onClick={onRemove} className="p-1" style={{ color: "red" }}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
