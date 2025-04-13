import React, { useEffect, useState } from "react";
import { useStreakStore } from "@/store/useStreakStore";
import { cn } from "@/lib/utils";

// Import custom SVG assets
import capyDay from "@/assets/dashboard/capy-day.svg";
import fireStreak from "@/assets/dashboard/fire-streak.svg";
import sadFace from "@/assets/dashboard/sad.svg";

const StreakPanel = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use local state for streak data instead of subscribing to the store directly
  const [streakData, setStreakData] = useState({
    streak: 0,
    dailyStatus: [" ", " ", " ", " ", " ", " ", " "],
  });

  const daysOfWeek = ["M", "T", "W", "TH", "F", "ST", "S"];

  // Only run once on mount, fetch data from store
  useEffect(() => {
    const loadAndUpdateStreak = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Get access to the store functions (not subscribing)
        const streakStore = useStreakStore.getState();

        // Update the streak in the store
        const result = await streakStore.checkAndUpdateStreak(userId);

        // Get the updated streak data after the update
        const updatedStore = useStreakStore.getState();

        // Set local state with the result
        setStreakData({
          streak: updatedStore.streak || 0,
          dailyStatus: updatedStore.dailyStatus || [
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
          ],
        });
      } catch (err) {
        console.error("Error updating streak:", err);
        setError("Failed to update streak");
      } finally {
        setIsLoading(false);
      }
    };

    loadAndUpdateStreak();
  }, [userId]);

  return (
    <div className="fixed top-[120px] z-50 bg-white rounded-lg border-2 border-black custom-shadow-75 p-4 w-98">
      <h2 className="text-lg font-medium mb-3 text-black">Streak</h2>

      {error ? (
        <div className="text-red-500 mb-2">{error}</div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-4">
          Loading streak...
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={fireStreak} alt="Fire streak" className="w-8 h-8" />
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-black">
                {streakData.streak}
              </span>
              <span className="text-black ml-1">days</span>
            </div>
          </div>

          <div className="flex justify-between">
            {streakData.dailyStatus.map((status, index) => (
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
        </>
      )}
    </div>
  );
};

export default StreakPanel;
