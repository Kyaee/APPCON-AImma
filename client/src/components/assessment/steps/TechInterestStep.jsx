import React, { useState } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function TechInterestStep({
  technicalInterest, // Was expecting selectedInterest from parent
  technicalAnswers, // This is fine
  onInterestSelect, // This is fine
  onAnswerChange, // This is fine
}) {
  // Instead of hiding/showing, we'll always show the options
  // and conditionally show questions based on selection
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Set initial selected interest from props
  React.useEffect(() => {
    if (
      technicalInterest &&
      !selectedInterests.some((i) => i.id === technicalInterest.id)
    ) {
      setSelectedInterests([technicalInterest]);
    }
  }, [technicalInterest]);

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

    // Always call parent's onInterestSelect with the first selection
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
                      className={`p-3 rounded-lg transition-all duration-200 bg-white
                        ${
                          (technicalAnswers[question.id] || []).includes(option)
                            ? "border-[#3F6CFF] border-3 custom-shadow-75"
                            : "border-black border-2 hover:border-black hover:border-3"
                        }`}
                    >
                      <span className="text-black">{option}</span>
                    </button>
                  ))}
                </div>
              ) : question.type === "text" ? (
                <textarea
                  value={technicalAnswers[question.id] || ""}
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
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
                className={`p-6 rounded-lg transition-all duration-200 cursor-pointer bg-white
                  ${
                    isSelected
                      ? "border-[#3F6CFF] border-3 custom-shadow-75"
                      : "border-black border-2 hover:border-black hover:border-3"
                  }`}
              >
                <div className="flex justify-center space-x-4">
                  <span className="text-4xl">{option.icon}</span>
                </div>
                <div>
                  <h3 className="mt-5 font-medium text-l text-black">
                    {option.label}
                  </h3>
                </div>
                {/* Visual indicator for selected state */}
                {isSelected && (
                  <div className="mt-2 text-[#3F6CFF] font-bold">
                    ✓ Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Show questions for primary selected interest */}
        {technicalInterest && renderQuestions()}
      </div>
    </AssessmentStep>
  );
}
