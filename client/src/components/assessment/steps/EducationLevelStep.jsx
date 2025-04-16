import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function EducationLevelStep({
  selectedType,
  selectedLevel,
  educationOptions,
  onLevelSelect,
}) {
  return (
    <AssessmentStep title={assessmentFlow.educationLevel.title}>
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl w-full">
          {educationOptions.map((option) => (
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
              <div className="flex justify-center mb-6">
                <span className="text-8xl sm:text-9xl">{option.icon}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white text-center">
                {option.label}
              </h3>
              {option.description && (
                <p className="mt-4 text-base sm:text-lg text-gray-300 text-center">
                  {option.description}
                </p>
              )}
              {selectedLevel?.id === option.id && (
                <div className="mt-4 text-white font-bold">
                  ✓ Selected
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </AssessmentStep>
  );
}
