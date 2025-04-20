import React from "react";
import { useNavigate } from "react-router-dom";
import { BookPlus } from "lucide-react";

const GenerateRoadmapPanel = ({ userId }) => {
  const navigate = useNavigate();

  const handleGenerateRoadmap = () => {
    // Navigate to the UserAssessment page with focus on technical interests
    navigate(`/user-assessment/${userId}?focus=technical`);
  };

  return (
    <button
      onClick={handleGenerateRoadmap}
      className="flex items-center gap-3 w-full py-3 px-4 text-black dark:text-primary transition-colors hover:bg-[#CBB09B]/20 dark:hover:bg-dark-mode-highlight/40 rounded-lg"
    >
      <BookPlus className="w-6 h-6 flex-shrink-0" />
      <h2 className="text-xl font-bold">Generate New Roadmap</h2>
    </button>
  );
};

export default GenerateRoadmapPanel;
