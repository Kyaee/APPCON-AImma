import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function SkillLevelStep({
  skillOptions,
  selectedSkill,
  onSkillSelect,
}) {
  return (
    <AssessmentStep title={assessmentFlow.skillLevel.title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
        {skillOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSkillSelect(option)}
            className={`p-4 sm:px-10 sm:py-25 rounded-lg transition-all duration-200 cursor-pointer bg-transparent
              ${
                selectedSkill?.id === option.id
                  ? "border-amber-500/50 border-2 shadow-lg shadow-amber-900/20 bg-white/95"
                  : "border-white/10 border hover:border-white/20 hover:bg-white/5"
              }`}
          >
            <div className="flex justify-center space-x-4">
              <span className="text-6xl">{option.icon}</span>
            </div>
            <div>
              <h3 className="mt-5 font-medium text-lg text-black">
                {option.label}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
} 