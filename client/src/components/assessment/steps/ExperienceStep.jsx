import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function ExperienceStep({
  experienceOptions,
  selectedLevel,
  onLevelSelect,
}) {
  return (
    <AssessmentStep title="Years of Experience">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 mt-10">
        {experienceOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onLevelSelect(option)}
              className={`flex flex-col items-center p-2 sm:p-4 rounded-xl transition-all duration-300 transform hover:scale-115 select-none
              ${
                selectedLevel?.id === option.id
                    ? "border-light-brown border-3 custom-shadow-75 bg-white card-bg-opacity"
                    : "border-white/30 border-2 hover:border-white/50"
              }`}
          >
            <div className="flex justify-center mb-6">
              <img
                src={option.icon}
                alt={option.label}
                className="w-60 h-30 sm:w-70 sm:h-35 select-none pointer-events-none"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-white select-none">
                {option.label}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
}
