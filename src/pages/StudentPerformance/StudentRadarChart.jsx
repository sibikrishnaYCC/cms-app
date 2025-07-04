import { TrendingUp } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";

// 🎯 Data: Subject comparison
const subjectData = [
  { subject: "Math", student: 92, classAverage: 85 },
  { subject: "Science", student: 88, classAverage: 82 },
  { subject: "English", student: 85, classAverage: 80 },
  { subject: "History", student: 90, classAverage: 84 },
  { subject: "Art", student: 78, classAverage: 75 },
];

export default function StudentRadarChart({ theme = "light" }) {
  // 🌙 Theme-based styling
  const studentColor = theme === "dark" ? "#3B82F6" : "#2563EB"; // blue-500 vs blue-600
  const classColor = theme === "dark" ? "#10B981" : "#34D399";   // emerald-500 vs emerald-400
  const gridColor = theme === "dark" ? "#333" : "#e5e7eb";        // dark vs gray-200
  const textColor = theme === "dark" ? "#e5e5e5" : "#1f2937";     // light vs gray-800
  const cardBg = theme === "dark" ? "bg-[#182740]" : "bg-white";
  const cardText = theme === "dark" ? "text-white" : "text-black";
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const mutedText = theme === "dark" ? "text-gray-400" : "text-muted-foreground";

  return (
    <Card className={`w-full  ${cardBg} ${cardText} ${
        theme === "dark" ? "border-gray-700" : "border-gray-300"
      }`}>
      <CardHeader className="text-center ">
        <CardTitle>Subject Performance Comparison</CardTitle>
        <CardDescription className={subText}>
          Student vs Class Average across subjects
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-center">
          <RadarChart
            width={300}
            height={300}
            outerRadius={100}
            data={subjectData}
          >
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: textColor }} />
            <Tooltip />
            <Legend />
            <Radar
              name="Student"
              dataKey="student"
              stroke={studentColor}
              fill={studentColor}
              fillOpacity={0.4}
            />
            <Radar
              name="Class Average"
              dataKey="classAverage"
              stroke={classColor}
              fill={classColor}
              fillOpacity={0.3}
            />
          </RadarChart>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-1 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 5.2% this semester <TrendingUp className="h-4 w-4" />
        </div>
        <div className={`${mutedText}`}>
          Academic Year 2025
        </div>
      </CardFooter>
    </Card>
  );
}
