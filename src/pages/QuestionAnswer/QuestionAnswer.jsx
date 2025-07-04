import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";

export default function QuestionAnswer({ theme = "light" }) {
  const isDark = theme === "dark";
  const [qaFiles, setQaFiles] = useState([
    new File([], "Unit Test – Q&A.pdf"),
    new File([], "Final Exam 2022 Solutions.pdf"),
    new File([], "Important Questions – Semester 4.pdf"),
  ]);

  const inputRef = useRef(null);

  const handleSelectFiles = (e) => {
    if (!e.target.files) return;
    setQaFiles([...qaFiles, ...Array.from(e.target.files)]);
  };

  const triggerFileDialog = () => inputRef.current?.click();
  const removeFile = (index) => setQaFiles(qaFiles.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col items-center gap-6 min-h-screen pt-[10vh] pb-20">
      <h1
        className="text-xl max-sm:text-base font-bold drop-shadow-sm"
        style={{ color: "var(--text-color)" }}
      >
        Q&A Files
      </h1>

      {/* ◁ Upload Card ▷ */}
      <Card
        onClick={triggerFileDialog}
        className="w-[95%] sm:w-5/6 md:w-2/3 xl:w-1/2 border-2 border-dashed rounded-2xl cursor-pointer transition-shadow"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--border-color)",
          color: "var(--text-color)",
        }}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 max-sm:gap-2 py-8 sm:py-12 max-sm:py-6">
          <Upload className="w-8 h-8 max-sm:w-6 max-sm:h-6" />
          <p className="text-base max-sm:text-sm text-center select-none">
            Drag & drop Q&A PDFs here or{" "}
            <span className="font-medium">click</span> to browse
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={handleSelectFiles}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* ◁ File List ▷ */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-5 w-[95%] sm:w-5/6 md:w-2/3 xl:w-1/2">
        {qaFiles.map((file, idx) => (
          <Card
            key={idx}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 overflow-hidden"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border-color)",
              color: "var(--text-color)",
            }}
          >
            <FileText className="w-6 h-6 max-sm:w-5 max-sm:h-5 flex-shrink-0" />

            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm max-sm:text-[13px] font-medium leading-tight">
                {file.name}
              </p>
              <p
                className="text-xs max-sm:text-[10px]"
                style={{ color: "var(--muted-text)" }}
              >
                {file.size ? (file.size / 1024).toFixed(1) + " KB" : "—"}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Remove file"
              onClick={() => removeFile(idx)}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4 max-sm:w-3 max-sm:h-3" />
            </Button>
          </Card>
        ))} 
      </div>
    </div>
  );
}
