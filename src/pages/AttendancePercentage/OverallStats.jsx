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
  const monthNames = monthlyData.map((d) => d.month);

  // Initial state: fallback to first and last month from data
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [showChart, setShowChart] = useState(false);

  // ⏳ Set default months after data loads
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
          filteredData.reduce((acc, m) => acc + m.value, 0) /
            filteredData.length
        )
      : 0;

  return (
    <Card>
      <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <CardTitle className="text-2xl">Overall Attendance</CardTitle>
          <p className="text-muted-foreground text-sm">
            Average attendance: <span className="font-semibold">{average}%</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Select value={startMonth} onValueChange={setStartMonth}>
            <SelectTrigger className="w-[120px]">
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

          <Select value={endMonth} onValueChange={setEndMonth}>
            <SelectTrigger className="w-[120px]">
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

          <Button variant="outline" onClick={() => setShowChart(!showChart)}>
            {showChart ? "Hide Chart" : "Show Attendance Graph"}
          </Button>
          <Button variant="outline" onClick={onShowBelow75}>
            &lt; 75%
          </Button>
        </div>
      </CardHeader>

      {showChart && (
        <CardContent>
          <AttendanceTrendChart
            data={filteredData}
            xKey="month"
            theme={theme}
          />
          <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
            {startMonth} – {endMonth} trend <TrendingUp className="w-4 h-4" />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
