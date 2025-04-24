import React from "react";
import CapySlide from "@/assets/general/capy_sleep.png";

// Import components to combine
import GenerateRoadmapPanel from "./GenerateRoadmapPanel";
import StreakPanel from "./StreakPanel";
import QuestPanel from "./QuestPanel";

const CombinedPanel = ({ userId }) => {
  return (
    <div className="relative bg-white dark:bg-dark-inner-bg rounded-lg border-2 border-black dark:border-white/50 custom-shadow-75 p-[2vh] w-[calc(20vw+1rem)] min-w-[280px] max-w-[350px] text-[clamp(0.8rem,1vw,1.1rem)]">
      {/* Single capybara image at the top */}
      <img
        src={CapySlide}
        alt="Sleeping capybara"
        // Use fixed width/height (e.g., w-20 h-auto) and fixed top offset (e.g., -top-8)
        // right-0 keeps it aligned to the right edge of the container.
        className="absolute -top-26 w-35 h-auto right-0"
      />

      {/* Generate Roadmap Section */}
      <div className="mb-[2vh]">
        <GenerateRoadmapPanel userId={userId} />
      </div>

      {/* Separator */}
      <div className="border-t border-primary my-[2vh]"></div>

      {/* Streak Section */}
      <div className="mb-[2vh]">
        <StreakPanel embedded={true} />
      </div>

      {/* Separator */}
      <div className="border-t border-primary my-[2vh]"></div>

      {/* Quest Section */}
      <div>
        <QuestPanel embedded={true} userId={userId} />
      </div>
    </div>
  );
};

export default CombinedPanel;
