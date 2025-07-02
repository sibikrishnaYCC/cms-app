import { useEffect, useState, useMemo, useRef } from "react";
import StudentCard from "./StudentCard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./PerfSearchBar.jsx";

export default function StudentPerformance({ theme }) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [chartReadyId, setChartReadyId] = useState(null);
  const [reordered, setReordered] = useState(false);

  const cardRefs = useRef({});
  const originalOrderRef = useRef([]);

  const students = [
    { id: 1, name: "Alice Johnson", role: "21147126", photo: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Brian Lee", role: "21147123", photo: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Chloe Patel", role: "21147119", photo: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "David Kim", role: "21147130", photo: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Emma Davis", role: "21147131", photo: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Felix Nguyen", role: "21147132", photo: "https://i.pravatar.cc/150?img=6" },
    { id: 7, name: "Grace Thompson", role: "21147133", photo: "https://i.pravatar.cc/150?img=7" },
    { id: 8, name: "Henry Zhao", role: "21147134", photo: "https://i.pravatar.cc/150?img=8" },
    { id: 9, name: "Isabella Rossi", role: "21147135", photo: "https://i.pravatar.cc/150?img=9" },
    { id: 10, name: "Jack Wilson", role: "21147136", photo: "https://i.pravatar.cc/150?img=10" },
    { id: 11, name: "Alice Johnson", role: "21147126", photo: "https://i.pravatar.cc/150?img=1" },
    { id: 12, name: "Brian Lee", role: "21147123", photo: "https://i.pravatar.cc/150?img=2" },
    { id: 13, name: "Chloe Patel", role: "21147119", photo: "https://i.pravatar.cc/150?img=3" },
    { id: 14, name: "David Kim", role: "21147130", photo: "https://i.pravatar.cc/150?img=4" },
    { id: 15, name: "Emma Davis", role: "21147131", photo: "https://i.pravatar.cc/150?img=5" },
    { id: 16, name: "Felix Nguyen", role: "21147132", photo: "https://i.pravatar.cc/150?img=6" },
    { id: 17, name: "Grace Thompson", role: "21147133", photo: "https://i.pravatar.cc/150?img=7" },
    { id: 18, name: "Henry Zhao", role: "21147134", photo: "https://i.pravatar.cc/150?img=8" },
    { id: 19, name: "Isabella Rossi", role: "21147135", photo: "https://i.pravatar.cc/150?img=9" },
    { id: 20, name: "Jack Wilson", role: "21147136", photo: "https://i.pravatar.cc/150?img=10" },
  ];

  useEffect(() => {
    let isCancelled = false;
    let imageLoadCount = 0;
    const totalImages = students.length;
    let textLoaded = false;

    const handleImageLoad = () => {
      imageLoadCount++;
      if (imageLoadCount === totalImages && textLoaded && !isCancelled) {
        setLoading(false);
      }
    };

    const imageElements = students.map((student) => {
      const img = new Image();
      img.src = student.photo;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      return img;
    });

    const textLoadTimeout = setTimeout(() => {
      textLoaded = true;
      if (imageLoadCount === totalImages && !isCancelled) {
        setLoading(false);
      }
    }, 500);

    return () => {
      isCancelled = true;
      clearTimeout(textLoadTimeout);
      imageElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  const filteredStudents = useMemo(() => {
    if (!filter.trim()) return students;
    return [...students].sort((a, b) => {
      const aMatch = a.name.toLowerCase().includes(filter.toLowerCase()) || a.role.includes(filter);
      const bMatch = b.name.toLowerCase().includes(filter.toLowerCase()) || b.role.includes(filter);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [filter]);

  const displayStudents = useMemo(() => {
    if (activeId == null || !reordered) return filteredStudents;
    const clicked = filteredStudents.find((s) => s.id === activeId);
    const rest = filteredStudents.filter((s) => s.id !== activeId);
    return [clicked, ...rest];
  }, [filteredStudents, activeId, reordered]);

  const handleToggle = (id) => {
    const isOpening = activeId !== id;

    if (isOpening) {
      originalOrderRef.current = [...filteredStudents];
      setReordered(true);
      setActiveId(id);
      setChartReadyId(null);

      setTimeout(() => {
        const el = cardRefs.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = window.scrollY + rect.top;
          const headerOffset = 100;
          window.scrollTo({
            top: offset - headerOffset,
            behavior: "smooth",
          });
        }
      }, 100);

      setTimeout(() => {
        setChartReadyId(id);
      }, 500);
    } else {
      setChartReadyId(null);
      setTimeout(() => {
        setActiveId(null);
        setReordered(false);
      }, 300);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen h-full space-y-6 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mt-[10vh] max-sm:mt-[8vh]">
        Student Performance Page
      </h1>

      <SearchBar theme={theme} filter={filter} setFilter={setFilter} />

      <motion.div
        className="w-full max-w-6xl space-y-2 flex flex-col"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
          },
        }}
      >
        <AnimatePresence>
          {displayStudents.map((student) => (
            <motion.div
              key={student.id}
              ref={(el) => (cardRefs.current[student.id] = el)}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <StudentCard
                student={student}
                isActive={activeId === student.id}
                showCharts={chartReadyId === student.id}
                onToggle={() => handleToggle(student.id)}
                loading={loading}
                theme={theme}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
