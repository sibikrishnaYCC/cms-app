import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 🎯 All Grade Data
const allChartData = [
  { month: "January", grade: 72 },
  { month: "February", grade: 78 },
  { month: "March", grade: 85 },
  { month: "April", grade: 88 },
  { month: "May", grade: 91 },
  { month: "June", grade: 95 },
  { month: "July", grade: 90 },
  { month: "August", grade: 93 },
  { month: "September", grade: 89 },
  { month: "October", grade: 92 },
  { month: "November", grade: 94 },
  { month: "December", grade: 96 },
];

const monthNames = allChartData.map((d) => d.month);

// 📊 Chart Config for ShadCN
const chartConfig = {
  grade: {
    label: "Grade",
    color: "var(--chart-1)",
  },
};

export default function GradesOverTimeChart({ theme }) {
  const [startMonth, setStartMonth] = useState("January");
  const [endMonth, setEndMonth] = useState("June");

  const startIndex = monthNames.indexOf(startMonth);
  const endIndex = monthNames.indexOf(endMonth);

  const getFilteredData = () => {
    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) return [];
    return allChartData.slice(startIndex, endIndex + 1);
  };

  // 🎨 Themed Colors
  const strokeColor = theme === "dark" ? "#3B82F6" : "#2563EB";
  const fillColor = theme === "dark" ? "#3B82F6" : "#60A5FA";
  const gridColor = theme === "dark" ? "#333" : "#ddd";
  const textColor = theme === "dark" ? "#e5e5e5" : "#1f2937";
  const cardBg = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
  const cardText = theme === "dark" ? "text-white" : "text-black";
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
<Card
  className={`${cardBg} ${cardText} ${
    theme === "dark" ? "border-gray-700" : "border-gray-300"
  }`}
>
      <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <CardTitle>Grades Over Time</CardTitle>
          <CardDescription className={subText}>
            Student’s academic performance
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {/* Start Month Selector */}
          <Select value={startMonth} onValueChange={setStartMonth}>
          <SelectTrigger
            className={`w-[130px] border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            } focus:ring-0 focus:outline-none shadow-none`}
          >
              <SelectValue placeholder="Start Month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((month, idx) => (
                <SelectItem
                  key={month}
                  value={month}
                  disabled={idx >= endIndex}
                >
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* End Month Selector */}
          <Select value={endMonth} onValueChange={setEndMonth}>
          <SelectTrigger
            className={`w-[130px] border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            } focus:ring-0 focus:outline-none shadow-none`}
          >
              <SelectValue placeholder="End Month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((month, idx) => (
                <SelectItem
                  key={month}
                  value={month}
                  disabled={idx <= startIndex}
                >
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={getFilteredData()} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: textColor }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="grade"
              type="monotone"
              fill={fillColor}
              fillOpacity={0.4}
              stroke={strokeColor}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className={`flex items-center gap-2 leading-none ${subText}`}>
              {startMonth} – {endMonth} 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
