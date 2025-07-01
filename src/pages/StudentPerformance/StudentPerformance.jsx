import { useEffect, useState } from "react";
import GradesOverTimeChart from "./GradesOverTimeChart.jsx";

export default function StudentPerformance({ theme }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or re-render delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // 1.5 seconds

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen gap-6 p-6">
      <h1 className="text-2xl font-bold mt-[8vh]">Student Performance Page</h1>

      <div className="w-full max-w-2xl min-h-[300px] flex items-center justify-center">
        {loading ? (
          // Skeleton or placeholder
          <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        ) : (
           <div className="w-full max-w-2xl">
                <GradesOverTimeChart theme={theme} />
            </div>
        )}
      </div>
    </div>
  );
}
