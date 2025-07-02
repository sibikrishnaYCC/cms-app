import GradesOverTimeChart from "./GradesOverTimeChart.jsx";
import SubjectGradeBarChart from "./SubjectGradeBarChart.jsx";
import StudentRadarChart from "./StudentRadarChart.jsx";

export default function Charts({ loading, theme }) {
    return (
        <>
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
        </>
    )
}