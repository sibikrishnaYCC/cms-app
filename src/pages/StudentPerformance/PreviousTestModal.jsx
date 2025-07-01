import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function PreviousTestModal({
  open,
  onOpenChange,
  tests = [],
  theme = "light",
  onSelectTest = () => {},
}) {
  const isDark = theme === "dark";
  const textColor = isDark ? "#e5e5e5" : "#1f2937";
  const bgColor = isDark ? "bg-[#1e1e1e]" : "bg-white";
  const mutedText = isDark ? "text-gray-400" : "text-gray-600";

  const handleSelect = (test) => {
    onSelectTest(test);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`w-[90vw] sm:max-w-md p-0 ${bgColor} ${textColor}`}>
        <DialogHeader className="p-6 pb-3">
          <DialogTitle className={textColor}>Select Previous Test</DialogTitle>
          <DialogDescription className={mutedText}>
            Choose a test from the list to view its subject-wise grades.
          </DialogDescription>
        </DialogHeader>

        <Separator />
        <ScrollArea className="p-4 max-h-[60vh]">
          {tests.length === 0 ? (
            <p className={`text-sm text-center ${mutedText}`}>No previous tests found.</p>
          ) : (
            <ul className="space-y-2">
              {tests.map((test) => (
                <li key={test.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-muted/20"
                    onClick={() => handleSelect(test)}
                    style={{ color: textColor }}
                  >
                    {test.name}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
