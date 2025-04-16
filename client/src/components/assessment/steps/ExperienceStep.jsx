import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function ExperienceStep({
  experienceOptions,
  selectedLevel,
  onLevelSelect,
}) {
  return (
    <AssessmentStep title="Years of Experience">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
        {experienceOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onLevelSelect(option)}
              className={`flex flex-col items-center p-8 sm:p-10 rounded-xl transition-all duration-300 transform hover:scale-115
              ${
                selectedLevel?.id === option.id
                    ? "border-light-brown border-3 custom-shadow-75 bg-white card-bg-opacity"
                    : "border-white/30 border-2 hover:border-white/50"
              }`}
          >
            <div className="flex justify-center space-x-4">
              <span className="text-6xl">{option.icon}</span>
            </div>
            <div>
              <h3 className="mt-5 font-medium text-lg text-white">
                {option.label}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
}
