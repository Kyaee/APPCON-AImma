import React from "react";
import CapySlide from "@/assets/general/capy_sleep.png";

// Import components to combine
import GenerateRoadmapPanel from "./GenerateRoadmapPanel";
import StreakPanel from "./StreakPanel";
import QuestPanel from "./QuestPanel";

const CombinedPanel = ({ userId }) => {
  return (
    <div className="relative bg-white dark:bg-dark-inner-bg rounded-lg border-2 border-black dark:border-dark-mode-highlight custom-shadow-75 p-4 w-98">
      {/* Single capybara image at the top */}
      <img
        src={CapySlide}
        alt="Sleeping capybara"
        className="absolute -top-29 w-2/5 right-0"
      />

      {/* Generate Roadmap Section */}
      <div className="mb-6">
        <GenerateRoadmapPanel userId={userId} />
      </div>

      {/* Separator */}
      <div className="border-t border-gray-300 dark:border-dark-mode-highlight my-4"></div>

      {/* Streak Section */}
      <div className="mb-6">
        <StreakPanel embedded={true} />
      </div>

      {/* Separator */}
      <div className="border-t border-gray-300 dark:border-dark-mode-highlight my-4"></div>

      {/* Quest Section */}
      <div>
        <QuestPanel embedded={true} userId={userId} />
      </div>
    </div>
  );
};

export default CombinedPanel;
