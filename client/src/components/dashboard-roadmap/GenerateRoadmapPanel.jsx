import React from "react";
import { useNavigate } from "react-router-dom";
import { BookPlus } from "lucide-react";

const GenerateRoadmapPanel = ({ userId }) => {
  const navigate = useNavigate();

  const handleGenerateRoadmap = () => {
    // Navigate to the UserAssessment page with focus on technical interests
    navigate(`/start/assessment`);
  };

  return (
    <button
      onClick={handleGenerateRoadmap}
      className="flex items-center gap-[min(0.75rem,2vw)] w-full py-[min(0.75rem,1.5vh)] px-[min(1rem,2vw)] text-black dark:text-primary transition-colors hover:bg-[#CBB09B]/20 dark:hover:bg-dark-mode-highlight/40 rounded-lg"
    >
      <BookPlus className="w-[clamp(1.25rem,1.2vw,1.5rem)] h-[clamp(1.25rem,1.2vw,1.5rem)] flex-shrink-0" />
      <h2 className="text-[clamp(1.1rem,1.3vw,1.25rem)] font-bold">
        Generate New Roadmap
      </h2>
    </button>
  );
};

export default GenerateRoadmapPanel;
