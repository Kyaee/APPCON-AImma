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
  const [showAllQuests, setShowAllQuests] = useState(false); // State for showing all quests

  // Get quest data and functions from our store
  const dailyQuests = useQuestStore((state) => state.dailyQuests);
  const weeklyQuests = useQuestStore((state) => state.weeklyQuests);
  const checkAndResetQuests = useQuestStore(
    (state) => state.checkAndResetQuests
  );
  const completeQuest = useQuestStore((state) => state.completeQuest);

  const quests = isDaily ? dailyQuests : weeklyQuests;

  // Memoize sorted and sliced quests
  const displayedQuests = useMemo(() => {
    const sortedQuests = [...quests].sort((a, b) => a.completed - b.completed);
    return showAllQuests ? sortedQuests : sortedQuests.slice(0, 3);
  }, [quests, showAllQuests]);

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
        <h2 className="text-lg font-medium text-black dark:text-primary">
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

      <div className="space-y-3">
        {displayedQuests.map(
          (
            quest // Use displayedQuests here
          ) => (
            <div
              key={quest.id}
              // Remove onClick handler and cursor-pointer
              className={`flex items-start gap-3 p-3 rounded-md ${
                !quest.completed
                  ? "hover:bg-gray-100 dark:hover:bg-dark-mode-highlight" // Removed cursor-pointer
                  : ""
              }`}
            >
              {quest.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              ) : (
                <div className="mt-0.5">{getQuestIcon(quest)}</div>
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-primary">
                  {quest.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-primary/70">
                  {quest.completed
                    ? "Completed"
                    : `${quest.rewards.xp} XP, ${quest.rewards.gems} Gems${
                        quest.rewards.booster ? " + Booster" : ""
                      }`}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* See More / See Less Button */}
      {quests.length > 3 && (
        <div className="flex justify-end mt-3">
          <button
            onClick={() => setShowAllQuests(!showAllQuests)}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showAllQuests ? "See Less" : "See More"}
          </button>
        </div>
      )}
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
