import React from "react";
import { cn } from "@/lib/utils";

// Import custom SVG assets
import capyDay from "@/assets/dashboard/capy-day.svg";
import fireStreak from "@/assets/dashboard/fire-streak.svg";
import sadFace from "@/assets/dashboard/sad.svg";

const StreakPanel = ({
  dailyStatus = [
    "completed",
    "completed",
    "completed",
    "completed",
    "missed",
    "completed",
    " ",
  ],
}) => {
  const daysOfWeek = ["M", "T", "W", "TH", "F", "ST", "S"];

  // Calculate consecutive streak dynamically
  const calculateStreak = () => {
    let currentStreak = 0;

    // Process array from start to end
    for (let i = 0; i < dailyStatus.length; i++) {
      if (dailyStatus[i] === "completed") {
        currentStreak++;
      } else if (dailyStatus[i] === "missed") {
        // Reset streak on missed day
        currentStreak = 0;
      }
      // Skip future days (they don't affect streak)
    }

    return currentStreak;
  };

  const days = calculateStreak();

  return (
    <div className="fixed top-[120px] z-50 bg-white rounded-lg border-2 border-black custom-shadow-75 p-4 w-98">
      <h2 className="text-lg font-medium mb-3 text-black">Streak</h2>

      <div className="flex items-center justify-center gap-2 mb-4">
        <img src={fireStreak} alt="Fire streak" className="w-8 h-8" />
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-black">{days}</span>
          <span className="text-black ml-1">days</span>
        </div>
      </div>

      <div className="flex justify-between">
        {dailyStatus.map((status, index) => (
          <div key={index} className="flex flex-col items-center">
            {status === "completed" ? (
              <img src={capyDay} alt="Present" className="w-8 h-8" />
            ) : status === "missed" ? (
              <img src={sadFace} alt="Absent" className="w-8 h-8" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#CBB09B] border-2 border-[#A18778]"></div>
            )}
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
