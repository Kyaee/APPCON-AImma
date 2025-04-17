// Import custom SVG assets
import capyDay from "@/assets/dashboard/capy-day.svg";
import fireStreak from "@/assets/dashboard/fire-streak.svg";
import sadFace from "@/assets/dashboard/sad.svg";

import { useEffect, useState } from "react";
import { checkStreaks } from "@/lib/check-day-streak";
import { useFetchStore } from "@/store/useUserData";
import { useAuth } from "@/config/AuthContext";
import CapySlide from "@/assets/general/capy_sleep.png";
import { useStreakStore } from "@/store/useStreakStore";

const StreakPanel = () => {
  const fetch = useFetchStore((state) => state.fetch);
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const checkAndUpdateStreak = useStreakStore(
    (state) => state.checkAndUpdateStreak
  );

  // Get the streak data from useFetchStore (same as Streak.jsx)
  const [supabaseStreak, setSupabaseStreak] = useState(0);

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
  const parsedDailyStatus = dailyStatus ? JSON.parse(dailyStatus) : daysOfWeek;

  useEffect(() => {
    if (!localStorage.getItem("dailyStatus"))
      localStorage.setItem("dailyStatus", JSON.stringify(daysOfWeek));

    // Set streak value from the fetch store (same approach as Streak.jsx)
    if (fetch) {
      setSupabaseStreak(fetch.streaks || 0);
      setLoading(false);
    }

    if (session?.user?.id) {
      // Update streak based on user's activity
      checkAndUpdateStreak(session.user.id).then(() => {
        setLoading(false);
      });

      // Check and mark days in the week
      checkStreaks(session?.user?.created_at);
    } else {
      setLoading(false);
    }
  }, [session?.user?.id, fetch, checkAndUpdateStreak]);

  return (
    <div className="relative bg-white rounded-lg border-2 border-black custom-shadow-75 p-4 w-98">
      <img
        src={CapySlide}
        alt="Sleeping capybara with orang"
        className="absolute -top-29 w-2/5 right-0"
      />
      <h2 className="text-lg font-medium mb-3 text-black">Streaks</h2>

      <div className="flex items-center justify-center gap-2 mb-4">
        <img src={fireStreak} alt="Fire streak" className="w-8 h-8" />
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-black">
            {loading ? "..." : supabaseStreak || 0}
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
