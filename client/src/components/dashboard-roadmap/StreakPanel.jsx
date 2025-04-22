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

const StreakPanel = ({ embedded = false }) => {
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

  // Content for the streak panel
  const streakContent = (
    <>
      {!embedded && (
        <h2 className="text-[clamp(1rem,1.2vw,1.25rem)] font-medium mb-3 text-black dark:text-primary">
          Streaks
        </h2>
      )}

      <div className="flex items-center justify-center gap-[clamp(0.5rem,0.8vw,1rem)] mb-[clamp(0.75rem,1.5vh,1rem)]">
        <img
          src={fireStreak}
          alt="Fire streak"
          className="w-[clamp(2rem,2.2vw,2.8rem)] h-[clamp(2rem,2.2vw,2.8rem)] dark:invert"
        />
        <div className="flex items-baseline">
          <span className="text-[clamp(1.5rem,2.2vw,2.5rem)] font-bold text-black dark:text-primary">
            {loading ? "..." : supabaseStreak || 0}
          </span>
          <span className="text-black dark:text-primary ml-1 text-[clamp(0.8rem,1vw,1rem)]">
            days
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        {parsedDailyStatus?.map((data, index) => (
          <div key={index} className="flex flex-col items-center">
            {data.status === "completed" ? (
              <img
                src={capyDay}
                alt="Present"
                className="w-[clamp(1.6rem,1.8vw,2.6rem)] h-[clamp(1.6rem,1.8vw,2.6rem)] dark:invert"
              />
            ) : data.status === "missed" ? (
              <img
                src={sadFace}
                alt="Absent"
                className="w-[clamp(1.6rem,1.8vw,2.6rem)] h-[clamp(1.6rem,1.8vw,2.6rem)] dark:invert"
              />
            ) : (
              <div className="w-[clamp(1.6rem,1.8vw,2.6rem)] h-[clamp(1.6rem,1.8vw,2.6rem)] rounded-full bg-[#CBB09B] dark:bg-dark-mode-highlight border-2 border-[#A18778] dark:border-dark-mode-highlight"></div>
            )}
            <span className="text-xs mt-1 font-medium text-gray-600 dark:text-primary">
              {data.day}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  // If embedded, return just the content
  if (embedded) {
    return streakContent;
  }

  // Otherwise, return the content in a container
  return (
    <div className="relative bg-white dark:bg-dark-inner-bg rounded-lg border-2 border-black dark:border-dark-mode-highlight custom-shadow-75 p-[2vh] w-[calc(20vw+1rem)]">
      <img
        src={CapySlide}
        alt="Sleeping capybara with orang"
        className="absolute -top-[min(29px,4vh)] w-2/5 right-0"
      />
      {streakContent}
    </div>
  );
};

export default StreakPanel;
