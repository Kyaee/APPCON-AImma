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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full">
          {educationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onLevelSelect(option)}
              className={`flex flex-col items-center p-6 rounded-xl transition-all duration-200 cursor-pointer
                ${
                  selectedLevel?.id === option.id
                    ? "border-amber-500/50 border-2 shadow-lg shadow-amber-900/20 bg-white/95"
                    : "border border-gray-400/20 hover:border-amber-500/30 hover:bg-white/5"
                }`}
            >
              <div className="flex justify-center mb-4">
                <span className="text-6xl">{option.icon}</span>
              </div>
              <h3 className="text-xl font-medium text-black text-center">
                {option.label}
              </h3>
              {option.description && (
                <p className="mt-2 text-sm text-gray-300 text-center">
                  {option.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </AssessmentStep>
  );
}
