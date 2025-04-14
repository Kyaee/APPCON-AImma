import React, { useState, useEffect } from "react";
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

const QuestPanel = ({ userId }) => {
  const [isDaily, setIsDaily] = useState(true);

  // Get quest data and functions from our store
  const dailyQuests = useQuestStore((state) => state.dailyQuests);
  const weeklyQuests = useQuestStore((state) => state.weeklyQuests);
  const checkAndResetQuests = useQuestStore(
    (state) => state.checkAndResetQuests
  );
  const completeQuest = useQuestStore((state) => state.completeQuest);

  const quests = isDaily ? dailyQuests : weeklyQuests;

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

  const handleQuestComplete = (quest) => {
    // Call the completeQuest function from our store
    completeQuest(quest.id, isDaily, userId);
  };

  return (
    <div className="fixed top-80 bg-white rounded-lg border-2 border-black custom-shadow-75 p-4 w-98">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium text-black">
          {isDaily ? "Daily Quests" : "Weekly Quests"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={toggleQuestType}
            className="p-2 rounded-full hover:border-black  hover:bg-gray-200 transition-colors"
            aria-label="Toggle quest type"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`flex items-start gap-3 p-3 rounded-md transition-colors cursor-pointer ${
              quest.completed ? "bg-[#c9af9c]" : "hover:bg-gray-50"
            }`}
            onClick={() => handleQuestComplete(quest)}
          >
            {quest.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <div className="mt-0.5">{getQuestIcon(quest)}</div>
            )}
            <div>
              <p className="font-medium text-gray-900">{quest.title}</p>
              <p className="text-xs text-gray-500">
                {quest.rewards.xp} XP, {quest.rewards.gems} Gems
                {quest.rewards.booster && " + Booster"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestPanel;
