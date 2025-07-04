"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart.jsx";

export default function AttendanceTrendChart({ data = [], xKey = "month", theme = "light" }) {
  // 🎨 Theme colors
  const strokeColor = theme === "dark" ? "#3B82F6" : "#2563EB";
  const fillColor = theme === "dark" ? "#3B82F6" : "#60A5FA";
  const gridColor = theme === "dark" ? "#333" : "#ddd";
  const textColor = theme === "dark" ? "#e5e5e5" : "#1f2937";

  const chartConfig = {
    value: {
      label: "Attendance",
      color: "var(--chart-1)",
    },
  };

  return (
    <ChartContainer config={chartConfig}>
        <AreaChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} stroke={gridColor} />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: textColor }}
            tickFormatter={(value) =>
              xKey === "month" ? value.slice(0, 3) : value
            }
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="value"
            type="monotone"
            fill={fillColor}
            fillOpacity={0.4}
            stroke={strokeColor}
          />
        </AreaChart>
    </ChartContainer>
  );
}
