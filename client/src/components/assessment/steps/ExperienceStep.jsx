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
            className={`p-4 px-23 sm:py-25 rounded-lg border-2 text-center transition-all duration-200 cursor-pointer
              ${
                selectedLevel?.id === option.id
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary/50"
              }`}
          >
            <div className="flex justify-center space-x-4">
              <span className="text-6xl">{option.icon}</span>
            </div>
            <div>
              <h3 className="mt-5 font-medium text-lg">{option.label}</h3>
            </div>
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
}
