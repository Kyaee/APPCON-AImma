import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function UserTypeStep({
  userTypeOptions,
  selectedType,
  onTypeSelect,
}) {
  return (
    <AssessmentStep title={assessmentFlow.userType.title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
        {userTypeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onTypeSelect(option)}
            className={`p-4 sm:px-10 sm:py-25 rounded-lg transition-all duration-200 cursor-pointer bg-transparent
              ${
                selectedType?.id === option.id
                  ? "border-light-brown border-3 custom-shadow-75  bg-white card-bg-opacity"
                  : "border-black border-2 hover:border-black hover:border-3"
              }`}
          >
            <div className="flex justify-center space-x-4">
              <span className="text-6xl">{option.icon}</span>
            </div>
            <div>
              <h3 className="mt-5 font-medium text-lg text-black">
                {option.label}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
}
