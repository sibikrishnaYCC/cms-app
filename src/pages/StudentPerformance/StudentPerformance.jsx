import { useEffect, useState } from "react";
import GradesOverTimeChart from "./GradesOverTimeChart.jsx";
import SubjectGradeBarChart from "./SubjectGradeBarChart.jsx";
import StudentRadarChart from "./StudentRadarChart.jsx";

export default function StudentPerformance({ theme }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen space-y-6 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mt-[10vh] max-sm:mt-[8vh]">
        Student Performance Page
      </h1>

      {/* Area Chart Skeleton or Chart */}
      <div className="flex flex-wrap gap-6 justify-center items-center">
          <div className="w-full max-w-2xl">
        {loading ? (
          <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        ) : (
          <GradesOverTimeChart theme={theme} />
        )}
      </div>

      {/* Bar Chart Skeleton or Chart */}
      <div className="w-full max-w-2xl">
        {loading ? (
          <div className="w-full h-[320px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        ) : (
          <SubjectGradeBarChart theme={theme} />
        )}
      </div>

      {/* Radar Chart Skeleton or Chart */}
      <div className="w-full max-w-2xl">
        {loading ? (
          <div className="w-full h-[360px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        ) : (
          <StudentRadarChart theme={theme} />
        )}
      </div>
      </div>

    </div>
  );
}
