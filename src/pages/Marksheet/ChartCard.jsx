import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export default function ChartCard({ data, name, isDark }) {
  return (
    <div
      className="rounded-xl p-3 shadow-sm border"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <h3 className="text-center text-xs font-medium mb-1">
        {name || "New Student"}'s Marks
      </h3>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart
          data={data.map((sub) => ({
            name: sub.name || "—",
            mark: sub.mark,
          }))}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            fontSize={10}
            interval={0}
            angle={-25}
            dy={10}
          />
          <YAxis fontSize={10} domain={[0, 100]} ticks={[0, 50, 100]} />
          <Tooltip />
          <Bar
            dataKey="mark"
            fill={isDark ? "#4f46e5" : "#000"}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
