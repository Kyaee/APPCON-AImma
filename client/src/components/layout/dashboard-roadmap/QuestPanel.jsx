import React from "react";
import { Rocket } from "lucide-react";

const QuestPanel = ({
  quests = [
    {
      id: "1",
      title: "Finish a topic!",
      timeCommitment: "Full-time",
      icon: <Rocket className="w-5 h-5 text-blue-500" />,
    },
    {
      id: "2",
      title: "Study 3x in a week!",
      timeCommitment: "Full-time",
      icon: <Rocket className="w-5 h-5 text-blue-500" />,
    },
    {
      id: "3",
      title: "Quality Assurance",
      timeCommitment: "Full-time",
      icon: <Rocket className="w-5 h-5 text-blue-500" />,
    },
  ],
}) => {
  return (
    <div className="sticky top-75 bg-white rounded-lg border-2 border-black custom-shadow-75 p-4 w-98">
      <h2 className="text-lg font-medium mb-3 text-black">Quests</h2>

      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {quest.icon}
            <div>
              <p className="font-medium text-gray-900">{quest.title}</p>
              <p className="text-xs text-gray-500">{quest.timeCommitment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestPanel;
