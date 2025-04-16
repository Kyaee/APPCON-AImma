import { Separator } from "@/components/ui/separator";
import { FlameIcon, ArrowLeftFromLine } from "lucide-react";

export default function ProfileStreak({
  streak,
  previous_best,
  quests_finished,
  roadmap_progress,
  setRoadmapIndex
}) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold mb-4 text-black dark:text-primary">Streak</h2>
      <div className="flex items-center justify-between mb-6">
        <span className="flex gap-2 text-6xl font-bold text-black dark:text-primary">
          <FlameIcon size={60} className="text-black dark:text-primary" />
          {streak} days
        </span>
        <button className="px-3 py-2 bg-white dark:bg-dark-mode-bg text-black dark:text-primary cursor-pointer rounded-md text-sm hover:bg-[#D2B48C] dark:hover:bg-dark-mode-highlight border border-black dark:border-dark-mode-highlight">
          Previous Best: <b>{previous_best} days</b>
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
                  <h3 className="text-lg font-semibold text-black dark:text-primary">{skill.roadmap_name}</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-nav-text">
                    {skill.progress}% Complete
                  </p>
                </div>
              </div>
              <ArrowLeftFromLine size={24} className="text-black dark:text-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
