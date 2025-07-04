import { useState, useEffect } from "react";

const DEFAULT_PERIODS = {
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [
    { subject: "English", teacher: "Dharmistaben", start: "09:00", end: "10:00" },
    { subject: "Gujarati", teacher: "Avantikaben", start: "10:00", end: "11:00" },
    { subject: "Maths", teacher: "Hemantbhai", start: "11:00", end: "12:00" },
    { subject: "Science", teacher: "Geetaben", start: "12:00", end: "13:00" },
    { subject: "History", teacher: "Geetaben", start: "14:00", end: "15:00" },
    { subject: "Computer", teacher: "Geetaben", start: "15:00", end: "16:00" },
  ],
  Fri: [],
  Sat: [],
};

export default function TimeTableApp({ theme = "light" }) {
  const isDark = theme === "dark";
  const [roleView, setRoleView] = useState("Student");
  const [activeDay, setActiveDay] = useState("Thu");
  const [periods, setPeriods] = useState(DEFAULT_PERIODS);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const takeSnapshot = (src) => JSON.parse(JSON.stringify(src));
  const updatePeriods = (next) => {
    setUndoStack((h) => [...h, takeSnapshot(periods)]);
    setRedoStack([]);
    setPeriods(next);
  };

  const handleEdit = (index, field, value) => {
    const dayCopy = takeSnapshot(periods[activeDay]);
    dayCopy[index][field] = value;
    updatePeriods({ ...periods, [activeDay]: dayCopy });
  };

  const handleAdd = () => {
    const dayCopy = [
      ...periods[activeDay],
      { subject: "", teacher: "", start: "", end: "" },
    ];
    updatePeriods({ ...periods, [activeDay]: dayCopy });
  };

  const handleDelete = (index) => {
    const dayCopy = periods[activeDay].filter((_, i) => i !== index);
    updatePeriods({ ...periods, [activeDay]: dayCopy });
  };

  const undo = () => {
    if (!undoStack.length) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack((r) => [...r, takeSnapshot(periods)]);
    setUndoStack((h) => h.slice(0, -1));
    setPeriods(prev);
  };

  const redo = () => {
    if (!redoStack.length) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((h) => [...h, takeSnapshot(periods)]);
    setRedoStack((r) => r.slice(0, -1));
    setPeriods(next);
  };

  const parseTime = (str) => {
    if (!str || !/^\d{2}:\d{2}$/.test(str)) return null;
    const [h, m] = str.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const calcProgress = (start, end) => {
    const s = parseTime(start);
    const e = parseTime(end);
    if (!s || !e) return 0;
    if (now <= s) return 0;
    if (now >= e) return 100;
    return (((now - s) / (e - s)) * 100).toFixed(0);
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className={`min-h-screen flex flex-col items-center pt-4 sm:pt-8 mt-[10vh] ${
        isDark ? "dark-theme" : ""
      }`}
      style={{
        color: "var(--text-color)",
      }}
    >
      <div className="w-full max-w-3xl px-4">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-center sm:text-left">{roleView} Timetable</h1>
            <div
              className="mt-1 text-sm text-center sm:text-left"
              style={{ color: "var(--muted-text)" }}
            >
              {activeDay} - {periods[activeDay].length} periods
            </div>
          </div>

          <div className="flex gap-2 self-center sm:self-auto">
            <button
              onClick={undo}
              disabled={!undoStack.length}
              className="px-4 py-2 rounded-lg border font-medium transition"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border-color)",
                color: undoStack.length ? "var(--text-color)" : "var(--muted-text)",
                cursor: undoStack.length ? "pointer" : "not-allowed",
              }}
            >
              Undo
            </button>
            <button
              onClick={redo}
              disabled={!redoStack.length}
              className="px-4 py-2 rounded-lg border font-medium transition"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border-color)",
                color: redoStack.length ? "var(--text-color)" : "var(--muted-text)",
                cursor: redoStack.length ? "pointer" : "not-allowed",
              }}
            >
              Redo
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {["Student", "Employee"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleView(role)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition`}
              style={{
                backgroundColor: roleView === role ? "var(--text-color)" : "var(--bg)",
                color: roleView === role ? "var(--bg)" : "var(--text-color)",
                borderColor: "var(--border-color)",
              }}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-none pb-1">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className="flex-1 min-w-[60px] px-2 py-2 rounded-lg text-sm font-medium border transition"
              style={{
                backgroundColor: activeDay === d ? "var(--text-color)" : "var(--bg)",
                color: activeDay === d ? "var(--bg)" : "var(--text-color)",
                borderColor: "var(--border-color)",
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          {periods[activeDay].length > 0 ? (
            periods[activeDay].map((p, idx) => {
              const progress = calcProgress(p.start, p.end);
              return (
                <div
                  key={idx}
                  className="rounded-lg p-4 border shadow-sm"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-color)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-lg w-10 h-10 flex items-center justify-center"
                        style={{ backgroundColor: "var(--border-color)" }}
                      >
                        <span className="font-bold">{idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          value={p.subject}
                          onChange={(e) => handleEdit(idx, "subject", e.target.value)}
                          placeholder="Subject"
                          className="w-full text-base font-medium mb-1 pb-1"
                          style={{
                            backgroundColor: "transparent",
                            borderBottom: "1px solid var(--border-color)",
                            color: "var(--text-color)",
                          }}
                        />
                        <input
                          value={p.teacher}
                          onChange={(e) => handleEdit(idx, "teacher", e.target.value)}
                          placeholder="Teacher"
                          className="w-full text-sm pb-1"
                          style={{
                            backgroundColor: "transparent",
                            borderBottom: "1px solid var(--border-color)",
                            color: "var(--muted-text)",
                          }}
                        />
                        <div className="flex gap-2 mt-2">
                          <input
                            type="time"
                            value={p.start}
                            onChange={(e) => handleEdit(idx, "start", e.target.value)}
                            className="w-24 text-xs"
                            style={{
                              backgroundColor: "transparent",
                              borderBottom: "1px solid var(--border-color)",
                              color: "var(--text-color)",
                            }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "var(--muted-text)" }}
                          >
                            to
                          </span>
                          <input
                            type="time"
                            value={p.end}
                            onChange={(e) => handleEdit(idx, "end", e.target.value)}
                            className="w-24 text-xs"
                            style={{
                              backgroundColor: "transparent",
                              borderBottom: "1px solid var(--border-color)",
                              color: "var(--text-color)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="text-xl leading-none"
                      aria-label="Delete period"
                      style={{
                        color: "var(--muted-text)",
                      }}
                    >
                      &times;
                    </button>
                  </div>

                  {p.start && p.end && (
                    <div className="mt-4">
                      <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: "var(--border-color)" }}
                      >
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: isDark ? "#ffffff" : "#000",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              className="text-center py-8 border border-dashed rounded-lg"
              style={{ color: "var(--muted-text)", borderColor: "var(--border-color)" }}
            >
              No periods scheduled for {activeDay}
            </div>
          )}
        </div>

        <div className="mb-8">
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto py-3 px-4 rounded-lg border font-medium"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border-color)",
              color: "var(--text-color)",
            }}
          >
            + Add Period
          </button>
        </div>
      </div>
    </div>
  );
}
