import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function DailyGoalStep({
  dailyGoalOptions,
  selectedGoal,
  onGoalSelect,
}) {
  return (
    <AssessmentStep title="Daily Learning Goal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mt-4 sm:mt-8 px-4 sm:px-6">
        {dailyGoalOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onGoalSelect(option.value)}
            className={`p-4 sm:px-18 sm:py-15 rounded-lg transition-all duration-200 cursor-pointer bg-white
              ${
                selectedGoal === option.value
                  ? "border-[#3F6CFF] border-3 custom-shadow-75"
                  : "border-black border-2 hover:border-black hover:border-3"
              }`}
          >
            <div className="flex justify-center space-x-2 sm:space-x-4">
              <img
                src={option.icon}
                alt={option.label}
                className="w-20 h-20 sm:w-30 sm:h-30"
              />
            </div>
            <h3 className="font-large mt-3 sm:mt-5 text-base sm:text-lg text-black">
              {option.label}
            </h3>
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
}
