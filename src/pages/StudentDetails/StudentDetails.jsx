// StudentDetails.jsx
import React, { useState } from "react";
import StudentInfoAccordion from "./StudentInfoAccordion.jsx";
import PerfSearchBar from "../StudentPerformance/PerfSearchBar.jsx";

const dummyStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    rollNo: "23",
    admissionNo: "A101",
    phone: "9876543210",
    parentPhone: "9876500000",
    type: "Hostel",
    address: "123 Green St, NY",
  },
  {
    id: 2,
    name: "Bob Smith",
    rollNo: "24",
    admissionNo: "A102",
    phone: "9876511111",
    parentPhone: "9876522222",
    type: "Day Scholar",
    address: "456 Blue Rd, TX",
  },
];

export default function StudentDetails() {
  const [query, setQuery] = useState("");

  /** 🔍  match by name (case‑insensitive) OR id fields */
  const filteredStudents = dummyStudents.filter((s) => {
    const q = query.toLowerCase().trim();
    return (
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.admissionNo.toLowerCase().includes(q) ||
      String(s.id).includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center pt-4 sm:pt-8 mt-[10vh] px-4 gap-6">
      <h1 className="text-2xl font-semibold">Student Details</h1>

      {/* ⬅️  Pass the props */}
      <PerfSearchBar filter={query} setFilter={setQuery} />

      <div className="w-full max-w-2xl flex flex-col gap-3">
        {filteredStudents.length ? (
          filteredStudents.map((student) => (
            <StudentInfoAccordion key={student.id} student={student} />
          ))
        ) : (
          <p className="text-sm opacity-60">No student found.</p>
        )}
      </div>
    </div>
  );
}
