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
      <div className="text-center mb-8">
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6">
        {userTypeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onTypeSelect(option)}
            className={`flex flex-col items-center p-8 sm:p-10 rounded-xl transition-all duration-300 transform hover:scale-115
              ${
                selectedType?.id === option.id
                    ? "border-light-brown border-3 custom-shadow-75 bg-white card-bg-opacity"
                    : "border-white/30 border-2 hover:border-white/50"
              }`}
          >
            <div className="flex justify-center mb-6">
              {option.id === 'professional' ? (
                <span className="text-7xl text-white font-mono">&lt;/&gt;</span>
              ) : (
                <span className="text-7xl">{option.icon}</span>
              )}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-white">
                {option.label}
              </h3>
            </div>
            {selectedType?.id === option.id && (
              <div className="mt-4 text-white font-bold text-lg">
                ✓ Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </AssessmentStep>
  );
}
