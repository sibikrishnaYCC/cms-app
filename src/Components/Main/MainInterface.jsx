import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopNavBar from "../Navbar/TopNavBar.jsx";
import ContentSection from "./ContentSection.jsx";
import assets from "../../assets/assets.js";

import CourseFile from "../../pages/CourseFile/CourseFile.jsx";
import StudentDetails from "../../pages/StudentDetails/StudentDetails.jsx";
import AttendancePercentage from "../../pages/AttendancePercentage/AttendancePercentage.jsx";
import StudentPerformance from "../../pages/StudentPerformance/StudentPerformance.jsx";
import TimeTable from "../../pages/TimeTable/TimeTable.jsx";
import QuestionAnswer from '../../pages/QuestionAnswer/QuestionAnswer.jsx';
import Marksheet from '../../pages/Marksheet/Marksheet.jsx';

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute bg-purple-500/60 w-[60vw] h-[60vw] rounded-full blur-3xl"
        animate={{ x: ["-20%", "120%"], y: ["-20%", "120%"], rotate: [0, 360] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bg-pink-500/60 w-[40vw] h-[40vw] rounded-full blur-3xl"
        animate={{ x: ["120%", "-20%"], y: ["120%", "-20%"], rotate: [360, 0] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bg-blue-500/50 w-[50vw] h-[50vw] rounded-full blur-3xl"
        animate={{ x: ["50%", "-50%"], y: ["-50%", "50%"], rotate: [0, -360] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    </div>
  );
}

export default function MainInterface() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [animate, setAnimate] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === assets.length) setLoaded(true);
    };

    const imageElements = assets.map((asset) => {
      const img = new Image();
      img.src = asset.name;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      return img;
    });

    return () => {
      imageElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  if (!loaded) {
    return (
      <div className="relative flex justify-center items-center h-screen">
        <Background />
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <span className="ml-4 text-[var(--text-color)] text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Background />
      <TopNavBar
        theme={theme}
        toggleTheme={() => setTheme(t => (t === "light" ? "dark" : "light"))}
        animate={animate}
        toggleAnimate={() => setAnimate(a => !a)}
        activePage={activePage}
        setActivePage={setActivePage}
        onBack={() => {
          setDirection(-1);
          setActivePage(null);
        }}
      />


      <div className="relative overflow-hidden w-full h-[calc(100vh-4rem)]">
   <AnimatePresence mode="wait">
  {activePage === null && (
    <motion.div
      key="home"
      initial={{ x: direction === -1 ? "-100%" : "0%" }} // when going back, enter from right (ContentSection)
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}  // always exit left (ContentSection)
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute w-full h-full"
      style={{ willChange: "transform" }}
    >
      <ContentSection
        animate={animate}
        setActivePage={(page) => {
          setDirection(1); // forward
          setActivePage(page);
        }}
      />
    </motion.div>
  )}

  {activePage !== null && (
    <motion.div
      key={activePage}
      initial={{ x: "100%" }} // always enter activePage from right (100%)
      animate={{ x: 0 }}
      exit={{ x: "100%" }} // exit activePage to left (-100%) on backward (when direction === -1)
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute w-full h-full"
      style={{ willChange: "transform" }}
    >
      {{
        CourseFile: <CourseFile onBack={() => {
          setDirection(-1); // backward
          setActivePage(null);
        }} />,
        QuestionAnswer: <QuestionAnswer onBack={() => {
          setDirection(-1);
          setActivePage(null);
        }} />,
        TimeTable: <TimeTable onBack={() => {
          setDirection(-1);
          setActivePage(null);
        }} />,
        Marksheet: <Marksheet onBack={() => {
          setDirection(-1);
          setActivePage(null);
        }} />,
        StudentDetails: <StudentDetails onBack={() => {
          setDirection(-1);
          setActivePage(null);
        }} />,
        StudentPerformance: <StudentPerformance onBack={() => {
          setDirection(-1);
          setActivePage(null);
        }} />,
        AttendancePercentage: <AttendancePercentage onBack={() => {
          setDirection(-1);
          setActivePage(null);
        }} />,
      }[activePage]}
    </motion.div>
  )}
</AnimatePresence>


      </div>
    </>
  );
}
