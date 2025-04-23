import React, { useCallback } from "react";
import { assessmentFlow } from "@/lib/assessment-flow";

// Generic component that can render any question set
const GenericQuestionSet = React.memo(
  ({ questionSet, answers, onAnswerChange }) => {
    if (!questionSet || !questionSet.questions) return null;

    // Stable handler to prevent re-renders
    const handleOptionSelect = useCallback(
      (questionId, option, currentAnswers) => {
        const newAnswers = currentAnswers.includes(option)
          ? currentAnswers.filter((a) => a !== option)
          : [...currentAnswers, option];
        onAnswerChange(questionId, newAnswers);
      },
      [onAnswerChange]
    );

    // Direct text handler that doesn't cause focus issues
    const handleTextChange = useCallback(
      (e, questionId) => {
        onAnswerChange(questionId, e.target.value);
      },
      [onAnswerChange]
    );

    return (
      <div className="mt-8 border-t border-white/30 pt-6">
        <h3 className="text-2xl font-bold text-white mb-4">
          {questionSet.title || "Technical Questions"}
        </h3>
        <div className="space-y-6">
          {questionSet.questions.map((question) => (
            <div key={question.id} className="space-y-4">
              <label className="block text-lg font-medium text-white">
                {question.label}
              </label>
              {question.type === "multiselect" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {question.options.map((option) => {
                    const currentAnswers = answers[question.id] || [];
                    const isSelected = currentAnswers.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          handleOptionSelect(
                            question.id,
                            option,
                            currentAnswers
                          )
                        }
                        className={`p-3 rounded-lg transition-all duration-200
                          ${
                            isSelected
                              ? "border-[#3F6CFF] border-3 custom-shadow-75 bg-white"
                              : "border-black border-2 hover:border-black hover:border-3 bg-white"
                          }`}
                      >
                        <span className="text-black">{option}</span>
                      </button>
                    );
                  })}
                </div>
              ) : question.type === "text" ? (
                <textarea
                  defaultValue={answers[question.id] || ""}
                  onBlur={(e) => handleTextChange(e, question.id)}
                  className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
                  rows={4}
                  placeholder="Enter your answer..."
                  maxLength={500}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

const TechQuestionFactory = ({ interestType, answers, onAnswerChange }) => {
  if (!interestType) return null;

  // Get the appropriate question set based on the interest type
  const questionSet =
    interestType.id === "other"
      ? assessmentFlow.otherInterests
      : assessmentFlow[interestType.id + "Questions"];

  // Handle programming, networking, and web development specially to ensure consistent textarea behavior
  if (
    interestType.id === "programming" ||
    interestType.id === "networking" ||
    interestType.id === "webDevelopment"
  ) {
    // Return generic question set with forced defaultValue + onBlur pattern
    return (
      <GenericQuestionSet
        questionSet={questionSet}
        answers={answers}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  // For all other question types, use the same pattern
  return (
    <GenericQuestionSet
      questionSet={questionSet}
      answers={answers}
      onAnswerChange={onAnswerChange}
    />
  );
};

export default React.memo(TechQuestionFactory);
