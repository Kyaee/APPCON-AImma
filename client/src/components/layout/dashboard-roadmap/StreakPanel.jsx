import React from "react";
import { Flame, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const StreakPanel = ({
  days = 5,
  dailyStatus = [
    "completed",
    "missed",
    "future",
    "future",
    "future",
    "future",
    "future",
  ],
}) => {
  const daysOfWeek = ["M", "T", "W", "TH", "F", "ST", "S"];

  return (
    <div className="sticky top-[120px] z-50 bg-white rounded-lg border-2 border-black custom-shadow-75 p-4 w-98">
      <h2 className="text-lg font-medium mb-3 text-black">Streak</h2>

      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-6 h-6 text-amber-500" />
        <span className="text-3xl font-bold text-black">{days}</span>
        <span className="text-black">days</span>
      </div>

      <div className="flex justify-between">
        {dailyStatus.map((status, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                status === "completed" &&
                  "bg-green-100 text-green-600 border-2 border-green-600",
                status === "missed" &&
                  "bg-red-100 text-red-600 border-2 border-red-600",
                status === "future" &&
                  "bg-gray-100 text-gray-400 border-2 border-gray-300"
              )}
            >
              {status === "completed" && <Check className="w-4 h-4" />}
              {status === "missed" && <X className="w-4 h-4" />}
            </div>
            <span className="text-xs mt-1 font-medium text-gray-600">
              {daysOfWeek[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakPanel;
