import React, { useCallback } from "react";
import { assessmentFlow } from "@/lib/assessment-flow";

const ProgrammingQuestionsStep = ({ answers, onAnswerChange }) => {
  const questions = assessmentFlow.programmingQuestions.questions || [];

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
        {assessmentFlow.programmingQuestions.title}
      </h3>
      <div className="space-y-6">
        {questions.map((question) => (
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
                        handleOptionSelect(question.id, option, currentAnswers)
                      }
                      className={`p-3 rounded-lg border-3 ${
                        isSelected
                          ? "border-[#3F6CFF] bg-white"
                          : "border-black bg-white hover:text-blue-600"
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
};

export default React.memo(ProgrammingQuestionsStep);
