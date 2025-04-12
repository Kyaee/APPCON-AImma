import React from "react";
import { assessmentFlow } from "@/lib/assessment-flow";
import ProgrammingQuestionsStep from "./ProgrammingQuestionsStep";
import NetworkingQuestionsStep from "./NetworkingQuestionsStep";
import WebDevelopmentQuestionsStep from "./WebDevelopmentQuestionsStep";

// Generic component that can render any question set
function GenericQuestionSet({ questionSet, answers, onAnswerChange }) {
  if (!questionSet || !questionSet.questions) return null;

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
                      const currentAnswers = answers[question.id] || [];
                      const newAnswers = currentAnswers.includes(option)
                        ? currentAnswers.filter((a) => a !== option)
                        : [...currentAnswers, option];
                      onAnswerChange(question.id, newAnswers);
                    }}
                    className={`p-3 rounded-lg transition-all duration-200 bg-white
                      ${
                        (answers[question.id] || []).includes(option)
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
                value={answers[question.id] || ""}
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
}

export default function TechQuestionFactory({ interestType, answers, onAnswerChange }) {
  if (!interestType) return null;

  // Use specialized components for common interests
  switch (interestType.id) {
    case "programming":
      return <ProgrammingQuestionsStep answers={answers} onAnswerChange={onAnswerChange} />;
    case "networking":
      return <NetworkingQuestionsStep answers={answers} onAnswerChange={onAnswerChange} />;
    case "webDevelopment":
      return <WebDevelopmentQuestionsStep answers={answers} onAnswerChange={onAnswerChange} />;
    default:
      // For all other interest types, use the generic component with the appropriate question set
      const questionSet = interestType.id === "other" 
        ? assessmentFlow.otherInterests 
        : assessmentFlow[interestType.id + "Questions"];
      
      return <GenericQuestionSet 
        questionSet={questionSet} 
        answers={answers} 
        onAnswerChange={onAnswerChange} 
      />;
  }
}
