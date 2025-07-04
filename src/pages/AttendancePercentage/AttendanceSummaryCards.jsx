import { Card, CardContent } from "@/Components/ui/card.jsx";

export default function AttendanceSummaryCards({ students, theme = "light" }) {
  if (!students || students.length === 0) return null;

  const totalStudents = students.length;
  const totalDays = students[0]?.total || 0;
  const avgPercentage = Math.round(
    students.reduce((sum, s) => sum + s.percentage, 0) / totalStudents
  );
  const avgDaysPresent = Math.round(
    students.reduce((sum, s) => sum + s.present, 0) / totalStudents
  );

  const cards = [
    { label: "Total Students", value: totalStudents },
    { label: "Total Days", value: totalDays },
    { label: "Avg. Attendance", value: `${avgPercentage}%` },
    { label: "Avg. Days Present", value: avgDaysPresent },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 max-[399px]:grid-cols-1">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="h-28 rounded-xl shadow-sm border"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
        >
          <CardContent className="h-full flex flex-col justify-center px-5">
            <div className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
              {card.value}
            </div>
            <div
              className="text-xs uppercase tracking-wide mt-1"
              style={{ color: "var(--muted-text)" }}
            >
              {card.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
