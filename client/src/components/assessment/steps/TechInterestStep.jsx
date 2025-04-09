import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function TechInterestStep({
  technicalInterest,
  technicalAnswers,
  onInterestSelect,
  onAnswerChange,
}) {
  // Track multiple selections
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Initialize from existing selection if any
  useEffect(() => {
    if (technicalInterest) {
      setSelectedInterests([technicalInterest]);
    }
  }, []);

  const handleInterestSelect = (option) => {
    // Check if option is already selected
    const isSelected = selectedInterests.some((item) => item.id === option.id);

    // Toggle selection
    let updatedInterests;
    if (isSelected) {
      updatedInterests = selectedInterests.filter(
        (item) => item.id !== option.id
      );
    } else {
      updatedInterests = [...selectedInterests, option];
    }

    setSelectedInterests(updatedInterests);

    // If we have selections, pass the first one to parent component
    // (to maintain compatibility with existing code that expects a single selection)
    if (updatedInterests.length > 0) {
      onInterestSelect(updatedInterests[0]);
    } else {
      onInterestSelect(null);
    }
  };

  // Function to render questions for the selected interest
  const renderQuestions = () => {
    if (!technicalInterest) return null;

    // For "Other" interest type, we use otherInterests questions
    const questionSet =
      technicalInterest.id === "other"
        ? assessmentFlow.otherInterests
        : assessmentFlow[technicalInterest.id + "Questions"];

    if (!questionSet) return null;

    return (
      <div className="mt-8 border-t border-white/30 pt-6">
        <h3 className="text-2xl font-bold text-white mb-4">
          {questionSet.title}
        </h3>
        <div className="space-y-6">
          {questionSet.questions.map((question) => (
            <div key={question.id} className="space-y-4">
              <label className="block text-lg font-medium text-white">
                {question.label}
              </label>
              {question.type === "multiselect" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        const currentAnswers =
                          technicalAnswers[question.id] || [];
                        const newAnswers = currentAnswers.includes(option)
                          ? currentAnswers.filter((a) => a !== option)
                          : [...currentAnswers, option];
                        onAnswerChange(question.id, newAnswers);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all duration-200
                        ${
                          (technicalAnswers[question.id] || []).includes(option)
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : question.type === "text" ? (
                <textarea
                  value={technicalAnswers[question.id] || ""}
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border-2 border-white text-white"
                  rows={4}
                  placeholder="Enter your answer..."
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AssessmentStep title={assessmentFlow.techInterest.title}>
      <div>
        <p className="text-white text-center mb-4">
          Select your technical interest areas (multiple selection allowed):
        </p>

        {/* Always show the interest options with clear visual indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
          {assessmentFlow.techInterest.options.map((option) => {
            // Check if this option is in our selectedInterests array
            const isSelected = selectedInterests.some(
              (item) => item.id === option.id
            );

            return (
              <button
                key={option.id}
                onClick={() => handleInterestSelect(option)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/20 ring-2 ring-amber-500"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
              >
                <div className="flex justify-center space-x-4">
                  <span className="text-4xl">{option.icon}</span>
                </div>
                <div>
                  <h3 className="mt-5 font-medium text-l">{option.label}</h3>
                </div>
                {/* Visual indicator for selected state */}
                {isSelected && (
                  <div className="mt-2 text-amber-500">✓ Selected</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Show questions for primary selected interest (first in array) */}
        {selectedInterests.length > 0 && renderQuestions()}
      </div>
    </AssessmentStep>
  );
}
