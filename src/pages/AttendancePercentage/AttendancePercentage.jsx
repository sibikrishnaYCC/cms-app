import { useMemo, useState } from "react";
import OverallStats from "./OverallStats.jsx";
import StudentAttendanceAccordion from "./StudentAttendanceAccordion.jsx";
import AttendanceSummaryCards from "./AttendanceSummaryCards.jsx";
import PerfSearchBar from "../StudentPerformance/PerfSearchBar.jsx";
import { motion } from "framer-motion";

function computeMonthlyData(students) {
  const months = ["January", "February", "March", "April", "May", "June"];
  return months.map((month, idx) => {
    let total = 0;
    let count = 0;
    for (const s of students) {
      if (s.monthly && s.monthly[idx] !== undefined) {
        total += s.monthly[idx];
        count++;
      }
    }
    return {
      month,
      value: count ? Math.round(total / count) : 0,
    };
  });
}

function computeDailyDataMap(students) {
  const months = [
    ["January", 31],
    ["February", 29],
    ["March", 31],
    ["April", 30],
    ["May", 31],
    ["June", 30],
  ];

  const result = {};

  for (let i = 0; i < months.length; i++) {
    const [month, daysInMonth] = months[i];
    const daily = [];

    for (let day = 1; day <= daysInMonth; day++) {
      let total = 0;
      let count = 0;

      for (const student of students) {
        const monthlyVal = student.monthly?.[i];
        if (monthlyVal !== undefined) {
          const dayValue = monthlyVal + ((day % 5) - 2);
          total += dayValue;
          count++;
        }
      }

      daily.push({
        day,
        value: count ? Math.round(total / count) : 0,
      });
    }

    result[month] = daily;
  }

  return result;
}
export default function AttendancePercentage({ theme }) {
  const [students] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      total: 60,
      present: 54,
      absent: 6,
      percentage: 90,
      monthly: [92, 88, 85, 91, 94, 90],
    },
    {
      id: "2",
      name: "Bob Smith",
      total: 60,
      present: 42,
      absent: 18,
      percentage: 70,
      monthly: [70, 68, 72, 65, 69, 76],
    },
    {
      id: "3",
      name: "Cynthia Lee",
      total: 60,
      present: 58,
      absent: 2,
      percentage: 97,
      monthly: [95, 98, 96, 99, 97, 96],
    },
  ]);

  const [filter, setFilter] = useState("");
  const monthlyData = useMemo(() => computeMonthlyData(students), [students]);
  const dailyDataMap = useMemo(() => computeDailyDataMap(students), [students]);
  const below75 = useMemo(() => students.filter((s) => s.percentage < 75), [students]);
  const [showLow, setShowLow] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col gap-6 px-4 max-w-6xl mx-auto mt-[10vh]">
      <motion.h1
        className="text-4xl font-semibold text-center mt-2 max-sm:text-3xl"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
      >
        Student Attendance Dashboard
      </motion.h1>

      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <OverallStats
          monthlyData={monthlyData}
          dailyDataMap={dailyDataMap}
          onShowBelow75={() => setShowLow(!showLow)}
          theme={theme}
        />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AttendanceSummaryCards theme={theme} students={students} />
      </motion.div>

      <motion.div
        className="flex justify-center"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <PerfSearchBar theme={theme} filter={filter} setFilter={setFilter} />
      </motion.div>

      {showLow && (
        <motion.div
          className="space-y-4"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold">Students Below 75%</h2>
          <StudentAttendanceAccordion
            theme={theme}
            students={below75}
            searchFilter={filter}
          />
        </motion.div>
      )}

      <motion.div
        className="space-y-4 mb-4"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold">All Students</h2>
        <StudentAttendanceAccordion
          theme={theme}
          students={students}
          searchFilter={filter}
        />
      </motion.div>
    </div>
  );
}
