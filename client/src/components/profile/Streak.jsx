import { Separator } from "@/components/ui/separator";
import { ArrowLeftFromLine } from "lucide-react";
import fireStreak from "@/assets/dashboard/fire-streak.svg";
import { useEffect } from "react";
import { supabase } from "@/config/supabase";
import { useAuth } from "@/config/AuthContext";
import Tabs_Component from "@/components/profile/TabsProfile";


export default function ProfileStreak({
  streak,
  previous_best,
  quests_finished,
  roadmap_progress,
  setRoadmapIndex,
  profile
}) {
  // Calculate the best streak - either the current streak or previous best, whichever is higher
  const bestStreak = Math.max(streak, previous_best || 0);
  const { session } = useAuth();

  // Update best_streak in Supabase if current streak is better than previous best
  useEffect(() => {
    const updateBestStreak = async () => {
      if (!session?.user?.id) return; // Make sure we have a user ID

      // Only update if current streak is higher than previous best
      if (streak > previous_best) {
        try {
          const { error } = await supabase
            .from("users")
            .update({
              best_streak: streak,
            })
            .eq("id", session.user.id);

          if (error) {
            console.error("Error updating best streak:", error);
          } else {
            console.log(`New best streak record: ${streak} days`);
          }
        } catch (err) {
          console.error("Exception when updating best streak:", err);
        }
      }
    };

    updateBestStreak();
  }, [streak, previous_best, session?.user?.id]);

  return (
    <div>
      <div className="w-full mb-15">
        <h2 className="text-3xl font-semibold mb-4 text-black dark:text-primary">
          Streak
        </h2>
        <div className="flex items-center justify-between mb-6">
          <span className="flex gap-2 text-6xl font-bold text-black dark:text-primary">
            <img
              src={fireStreak}
              alt="Fire streak"
              className="w-14 h-14 self-center"
            />
            {streak} days
          </span>
          <button className="px-3 py-2 bg-white dark:bg-dark-mode-bg text-black dark:text-primary cursor-pointer rounded-md text-sm hover:bg-[#D2B48C] dark:hover:bg-dark-mode-highlight border border-black dark:border-dark-mode-highlight">
            Best Streak: <b>{bestStreak} days</b>
          </button>
        </div>

        <Separator className="border-2 border-black dark:border-dark-mode-highlight" />
        <h2 className="px-3 py-6 text-2xl font-semibold text-black dark:text-primary">
          {quests_finished === 0
            ? "No quests finished yet"
            : `${quests_finished} Finished Quests!`}
        </h2>
        <Separator className="border-2 border-black dark:border-dark-mode-highlight" />

        <div className="rounded-lg bg-white dark:bg-dark-mode-bg mt-6 border-2 border-black dark:border-dark-mode-highlight">
          <div className="space-y-4 p-5">
            {roadmap_progress.map((skill) => (
              <div
                key={skill.roadmap_id}
                className="flex items-center justify-between"
                onClick={() => setRoadmapIndex(skill.roadmap_id)}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-primary">
                      {skill.roadmap_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-dark-nav-text">
                      {skill.progress}% Complete
                    </p>
                  </div>
                </div>
                <ArrowLeftFromLine
                  size={24}
                  className="text-black dark:text-primary"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Tabs_Component
        profileData={profile}
      />
    </div>
  );
}
