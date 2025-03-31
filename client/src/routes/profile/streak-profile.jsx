import { Separator } from "@/components/ui/separator";
import { FlameIcon, ArrowLeftFromLine } from "lucide-react";

export default function ProfileStreak({
  streak,
  previous_best,
  quests_finished,
  skill_progress,
}) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold mb-4">Streak</h2>
      <div className="flex items-center justify-between mb-6">
        <span className="flex gap-2 text-6xl font-bold">
          <FlameIcon size={60} />
          {streak} days
        </span>
        <button className="px-3 py-2 bg-white text-black cursor-pointer rounded-md text-sm hover:bg-[#D2B48C] border border-black">
          Previous Best: <b>{previous_best} days</b>
        </button>
      </div>

      <Separator className="border border-foreground" />
      <h2 className="px-3 py-6 text-2xl font-semibold">
        {quests_finished === 0
          ? "No quests finished yet"
          : `${quests_finished} Finished Quests!`}
      </h2>
      <Separator className="border border-foreground" />

      <div className="rounded-lg bg-white mt-6 border-2 border-foreground">
        <div className="space-y-4 p-5">
          {skill_progress.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{skill.title}</h3>
                  <p className="text-sm text-gray-600">
                    {skill.progress}% Complete
                  </p>
                </div>
              </div>
              <ArrowLeftFromLine size={24} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
