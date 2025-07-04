import React, { useState } from "react";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import PreviousTestModal from "./PreviousTestModal.jsx";

// 🗂️ Test data with grades
const testData = [
  {
    id: 1,
    name: "Mid‑Term • Oct 2024",
    grades: [
      { subject: "Math", grade: 82 },
      { subject: "Science", grade: 75 },
      { subject: "English", grade: 88 },
      { subject: "History", grade: 80 },
      { subject: "Art", grade: 70 },
    ],
  },
  {
    id: 2,
    name: "Quarterly • Jan 2025",
    grades: [
      { subject: "Math", grade: 90 },
      { subject: "Science", grade: 85 },
      { subject: "English", grade: 83 },
      { subject: "History", grade: 87 },
      { subject: "Art", grade: 74 },
    ],
  },
  {
    id: 3,
    name: "Mock Exam • Mar 2025",
    grades: [
      { subject: "Math", grade: 92 },
      { subject: "Science", grade: 88 },
      { subject: "English", grade: 85 },
      { subject: "History", grade: 90 },
      { subject: "Art", grade: 78 },
    ],
  },
];

// 📊 Chart config
const chartConfig = {
  grade: {
    label: "Grade",
    color: "var(--chart-1)",
  },
};

export default function SubjectGradeBarChart({ theme = "light" }) {
  const [open, setOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(testData[testData.length - 1]);
  const subjectData = selectedTest.grades;

  const gridColor = theme === "dark" ? "#333" : "#ddd";
  const textColor = theme === "dark" ? "#e5e5e5" : "#1f2937";
  const cardBg = theme === "dark" ? "bg-[#182740]" : "bg-white";
  const cardText = theme === "dark" ? "text-white" : "text-black";
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-600";

  const highest = subjectData.reduce((top, curr) =>
    curr.grade > top.grade ? curr : top
  );
  const average =
    subjectData.reduce((acc, curr) => acc + curr.grade, 0) / subjectData.length;

  return (
    <>
      <PreviousTestModal
        open={open}
        onOpenChange={setOpen}
        tests={testData}
        theme={theme}
        onSelectTest={(test) => setSelectedTest(test)}
      />

      <Card className={`${cardBg} ${cardText} ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle>Subject‑wise Grades</CardTitle>
            <CardDescription className={subText}>
              {selectedTest.name}
            </CardDescription>
          </div>
          <Button
            className="text-black"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            Select Test
          </Button>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={subjectData} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="subject"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: textColor }}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar dataKey="grade" fill="var(--chart-1)" radius={6} maxBarSize={40} />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Highest: {highest.subject} ({highest.grade}%){" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className={`leading-none ${subText}`}>
            Avg: {average.toFixed(1)}% across {subjectData.length} subjects
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
