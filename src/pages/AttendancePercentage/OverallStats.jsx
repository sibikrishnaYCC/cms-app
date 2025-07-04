"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/Components/ui/card.jsx";
import { Button } from "@/Components/ui/button.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select.jsx";
import { TrendingUp } from "lucide-react";
import AttendanceTrendChart from "./AttendanceTrendChart.jsx";

export default function OverallStats({
  monthlyData = [],
  dailyDataMap = {},
  onShowBelow75,
  theme = "light",
}) {
  const isDark = theme === "dark";

  const monthNames = monthlyData.map((d) => d.month);
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (monthlyData.length && !startMonth && !endMonth) {
      setStartMonth(monthlyData[0].month);
      setEndMonth(monthlyData[monthlyData.length - 1].month);
    }
  }, [monthlyData, startMonth, endMonth]);

  const startIndex = monthNames.indexOf(startMonth);
  const endIndex = monthNames.indexOf(endMonth);

  const filteredData =
    startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex
      ? monthlyData.slice(startIndex, endIndex + 1)
      : [];

  const average =
    filteredData.length > 0
      ? Math.round(
          filteredData.reduce((acc, m) => acc + m.value, 0) / filteredData.length
        )
      : 0;

  return (
    <Card
      className="rounded-xl border"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border-color)",
        color: isDark ? "#e5e5e5" : "#1f2937", // slate-800
      }}
    >
      <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <CardTitle className="text-2xl">
            Overall Attendance
          </CardTitle>
          <p className="text-sm text-[var(--muted-text)]">
            Average attendance:{" "}
            <span className="font-semibold">{average}%</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Start Month */}
          <Select value={startMonth} onValueChange={setStartMonth}>
            <SelectTrigger
              className="w-[120px]"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-color)",
                borderColor: "var(--border-color)",
              }}
            >
              <SelectValue placeholder="Start Month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((month, idx) => (
                <SelectItem key={month} value={month} disabled={idx >= endIndex}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* End Month */}
          <Select value={endMonth} onValueChange={setEndMonth}>
            <SelectTrigger
              className="w-[120px]"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-color)",
                borderColor: "var(--border-color)",
              }}
            >
              <SelectValue placeholder="End Month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((month, idx) => (
                <SelectItem key={month} value={month} disabled={idx <= startIndex}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Toggle Chart */}
          <Button
            variant="ghost"
            onClick={() => setShowChart(!showChart)}
            className="border transition-colors"
            style={{
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
              backgroundColor: "transparent",
            }}
          >
            {showChart ? "Hide Chart" : "Show Attendance Graph"}
          </Button>

          {/* Show < 75% */}
          <Button
            variant="ghost"
            onClick={onShowBelow75}
            className="border transition-colors"
            style={{
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
              backgroundColor: "transparent",
            }}
          >
            &lt; 75%
          </Button>
        </div>
      </CardHeader>

      {showChart && (
        <CardContent>
          <AttendanceTrendChart data={filteredData} xKey="month" theme={theme} />
          <div className="mt-2 text-sm flex items-center gap-2 text-[var(--muted-text)]">
            {startMonth} – {endMonth} trend <TrendingUp className="w-4 h-4" />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
