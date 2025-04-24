import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function DailyGoalStep({
  dailyGoalOptions,
  selectedGoal,
  onGoalSelect,
}) {
  return (
    <AssessmentStep title="Daily Learning Goal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-6 mt-10">
        {dailyGoalOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onGoalSelect(option.value)}
              className={`flex flex-col items-center p-7 sm:p-7 rounded-xl transition-all duration-300 transform hover:scale-115
              ${
                selectedGoal === option.value
                    ? "border-light-brown border-3 custom-shadow-75 bg-white card-bg-opacity"
                    : "border-white/30 border-2 hover:border-white/50"
              }`}
          >
            <div className="flex justify-center mb-6">
              <img
                src={option.icon}
                alt={option.label}
                className="w-55 h-20 sm:w-65 sm:h-30 select-none pointer-events-none"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-white">
                {option.label}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
}
