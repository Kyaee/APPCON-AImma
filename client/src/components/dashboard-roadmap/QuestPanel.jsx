import React, { useState, useEffect, useMemo } from "react";
import {
  Rocket,
  ChevronRight,
  CheckCircle,
  Book,
  Timer,
  Award,
  ArrowUpCircle,
  RefreshCw,
  Clock,
  Medal,
  Layers,
} from "lucide-react";
import { useQuestStore } from "@/store/useQuestStore";
import { supabase } from "@/config/supabase";
import { useAuth } from "@/config/AuthContext";

const QuestPanel = ({ userId, embedded = false }) => {
  const { session } = useAuth();
  const [isDaily, setIsDaily] = useState(true);

  // Get quest data and functions from our store
  const dailyQuests = useQuestStore((state) => state.dailyQuests);
  const weeklyQuests = useQuestStore((state) => state.weeklyQuests);
  const checkAndResetQuests = useQuestStore(
    (state) => state.checkAndResetQuests
  );
  const completeQuest = useQuestStore((state) => state.completeQuest);

  // Memoize sorted quests with completed ones at the bottom
  const sortedQuests = useMemo(() => {
    const quests = isDaily ? dailyQuests : weeklyQuests;
    return [...quests].sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      return a.completed ? 1 : -1; // Incomplete quests first
    });
  }, [dailyQuests, weeklyQuests, isDaily]);

  // Check if we need to reset quests when component mounts
  useEffect(() => {
    checkAndResetQuests();
  }, [checkAndResetQuests]);

  // Toggle between daily and weekly quests
  const toggleQuestType = () => {
    setIsDaily(!isDaily);
  };

  // Quest icon mapping
  const getQuestIcon = (quest) => {
    // For daily quests
    if (isDaily) {
      if (quest.title.includes("Lesson"))
        return <Book className="w-5 h-5 text-blue-500" />;
      if (quest.title.includes("minutes") || quest.title.includes("hour"))
        return <Timer className="w-5 h-5 text-orange-500" />;
      if (quest.title.includes("test") || quest.title.includes("100%"))
        return <Award className="w-5 h-5 text-purple-500" />;
      if (quest.title.includes("Review"))
        return <RefreshCw className="w-5 h-5 text-green-500" />;
      return <Rocket className="w-5 h-5 text-indigo-500" />;
    }
    // For weekly quests
    else {
      if (quest.title.includes("5 days"))
        return <Clock className="w-5 h-5 text-red-500" />;
      if (quest.title.includes("average") || quest.title.includes("90%"))
        return <Medal className="w-5 h-5 text-yellow-500" />;
      if (quest.title.includes("modules"))
        return <Layers className="w-5 h-5 text-teal-500" />;
      return <ArrowUpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  // Content for the quest panel
  const questContent = (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[clamp(1rem,1.2vw,1.25rem)] font-medium text-black dark:text-primary">
          {isDaily ? "Daily Quests" : "Weekly Quests"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={toggleQuestType}
            className="p-2 rounded-full hover:border-black dark:hover:border-primary hover:bg-gray-200 dark:hover:bg-dark-mode-highlight transition-colors"
            aria-label="Toggle quest type"
          >
            <ChevronRight className="w-5 h-5 text-black dark:text-primary" />
          </button>
        </div>
      </div>

      {/* Scrollable quest container - shows 3 initially, scrolls for more */}
      <div
        className="space-y-3 max-h-[calc(3*5rem)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(156, 163, 175, 0.5) transparent",
        }}
      >
        {sortedQuests.map((quest) => (
          <div
            key={quest.id}
            className={`flex items-start gap-3 p-3 rounded-md ${
              !quest.completed
                ? "hover:bg-gray-100 dark:hover:bg-dark-mode-highlight"
                : ""
            }`}
          >
            {quest.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <div className="mt-0.5 flex-shrink-0">{getQuestIcon(quest)}</div>
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-primary text-[clamp(0.8rem,0.9vw,1rem)]">
                {quest.title}
              </p>
              <p className="text-[clamp(0.7rem,0.75vw,0.875rem)] text-gray-500 dark:text-primary/70">
                {quest.completed
                  ? "Completed"
                  : `${quest.rewards.xp} XP, ${quest.rewards.gems} Gems${
                      quest.rewards.booster ? " + Booster" : ""
                    }`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  // If embedded, return just the content
  if (embedded) {
    return questContent;
  }

  // Otherwise, return the content in a container
  return (
    <div className="bg-white dark:bg-dark-inner-bg rounded-lg border-2 border-black dark:border-dark-mode-highlight custom-shadow-75 p-4 w-98">
      {questContent}
    </div>
  );
};

export default QuestPanel;
