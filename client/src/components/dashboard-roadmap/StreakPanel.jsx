// Import custom SVG assets
import capyDay from "@/assets/dashboard/capy-day.svg";
import fireStreak from "@/assets/dashboard/fire-streak.svg";
import sadFace from "@/assets/dashboard/sad.svg";

import { useEffect } from "react";
import { checkStreaks } from "@/lib/check-day-streak";
import { useFetchStore } from "@/store/useUserData";
import { useAuth } from "@/config/authContext";

const StreakPanel = ({ streak }) => {
  const fetch = useFetchStore((state) => state.fetch);
  const { session } = useAuth();
  const daysOfWeek = [
    { day: "Mon", full: "Monday", status: "" },
    { day: "Tue", full: "Tuesday", status: "" },
    { day: "Wed", full: "Wednesday", status: "" },
    { day: "Thu", full: "Thursday", status: "" },
    { day: "Fri", full: "Friday", status: "" },
    { day: "Sat", full: "Saturday", status: "" },
    { day: "Sun", full: "Sunday", status: "" },
  ];

  const dailyStatus = localStorage.getItem("dailyStatus");
  const parsedDailyStatus = JSON.parse(dailyStatus);

  useEffect(() => {
    if (!localStorage.getItem("dailyStatus")) 
      localStorage.setItem("dailyStatus", JSON.stringify(daysOfWeek));
    checkStreaks(session?.user?.created_at)
  }, []);

  return (
    <div className="fixed top-[120px] z-50 bg-white rounded-lg border-2 border-black custom-shadow-75 p-4 w-98">
      <h2 className="text-lg font-medium mb-3 text-black">Streaks</h2>

      <div className="flex items-center justify-center gap-2 mb-4">
        <img src={fireStreak} alt="Fire streak" className="w-8 h-8" />
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-black">
            {fetch.streaks || "error"}
          </span>
          <span className="text-black ml-1">days</span>
        </div>
      </div>

      <div className="flex justify-between">
        {parsedDailyStatus?.map((data, index) => (
          <div key={index} className="flex flex-col items-center">
            {data.status === "completed" ? (
              <img src={capyDay} alt="Present" className="w-8 h-8" />
            ) : data.status === "missed" ? (
              <img src={sadFace} alt="Absent" className="w-8 h-8" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#CBB09B] border-2 border-[#A18778]"></div>
            )}
            <span className="text-xs mt-1 font-medium text-gray-600">
              {data.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakPanel;
