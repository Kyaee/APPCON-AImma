import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";
import ProgrammingQuestionsStep from "./tech/ProgrammingQuestionsStep";
import NetworkingQuestionsStep from "./tech/NetworkingQuestionsStep";

export default function TechInterestStep({
  technicalInterest,
  technicalAnswers,
  onInterestSelect,
  onAnswerChange,
  showQuestions = false,
  techInterestOptions
}) {
  // Change to track only a single selected interest instead of an array
  const [selectedInterest, setSelectedInterest] = useState(null);

  // Set initial selected interest from props
  useEffect(() => {
    if (
      technicalInterest &&
      (!selectedInterest || selectedInterest.id !== technicalInterest.id)
    ) {
      setSelectedInterest(technicalInterest);
    }
  }, [technicalInterest]);

  const handleInterestSelect = (option) => {
    // Set the selected interest directly (no toggling)
    setSelectedInterest(option);

    // Call the parent handler to update the store
    onInterestSelect(option);
  };

  // Function to render questions for the selected interest
  const renderQuestions = () => {
    if (!selectedInterest) return null;

    // Create a scrollable container for questions with custom scrollbar styling
    const QuestionsContainer = ({ children }) => (
      <div
        className="max-h-[65vh] overflow-y-auto pr-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}</style>
        {children}
      </div>
    );

    // Render specific question components based on the interest type
    switch (selectedInterest.id) {
      case "programming":
        return (
          <QuestionsContainer>
            <ProgrammingQuestionsStep
              answers={technicalAnswers}
              onAnswerChange={onAnswerChange}
            />
          </QuestionsContainer>
        );
      case "networking":
        return (
          <QuestionsContainer>
            <NetworkingQuestionsStep
              answers={technicalAnswers}
              onAnswerChange={onAnswerChange}
            />
          </QuestionsContainer>
        );
      default:
        // For other interest types, use a generic approach
        const questionSet =
          selectedInterest.id === "other"
            ? assessmentFlow.otherInterests
            : assessmentFlow[selectedInterest.id + "Questions"];

        if (!questionSet || !questionSet.questions) {
          return (
            <div className="mt-8 border-t border-white/30 pt-6">
              <p className="text-white select-none">
                No questions available for this interest yet.
              </p>
            </div>
          );
        }

        return (
          <QuestionsContainer>
            <div className="mt-8 border-t border-white/30 pt-6">
              <h3 className="text-2xl font-bold text-white mb-4 select-none">
                {questionSet.title || `${selectedInterest.label} Questions`}
              </h3>
              <div className="space-y-6">
                {questionSet.questions.map((question) => (
                  <div key={question.id} className="space-y-4">
                    <label className="block text-lg font-medium text-white select-none">
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
                            className={`p-3 rounded-lg transition-all duration-200 bg-white select-none
                              ${
                                (technicalAnswers[question.id] || []).includes(
                                  option
                                )
                                  ? "border-[#3F6CFF] border-3 custom-shadow-75"
                                  : "border-black border-2 hover:border-black hover:border-3"
                              }`}
                          >
                            <span className="text-black select-none">{option}</span>
                          </button>
                        ))}
                      </div>
                    ) : question.type === "text" ? (
                      <textarea
                        value={technicalAnswers[question.id] || ""}
                        onChange={(e) =>
                          onAnswerChange(question.id, e.target.value)
                        }
                        className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
                        rows={4}
                        placeholder="Enter your answer..."
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </QuestionsContainer>
        );
    }
  };

  // Get the options either from props or from assessment-flow directly
  const options = techInterestOptions || assessmentFlow.techInterest.options;

  // Show either interest selection or questions based on the showQuestions prop
  return (
    <AssessmentStep
      title={
        showQuestions && selectedInterest
          ? `${selectedInterest.label || "Technical"} Questions`
          : "Technical Interests"
      }
    >
      {!showQuestions ? (
        // Interest selection view
        <div>
          <p className="text-white text-center mb-4 select-none">
            Select your primary technical interest:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
            {options.map((option) => {
              const isSelected = selectedInterest?.id === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleInterestSelect(option)}
                  className={`flex flex-col items-center p-8 sm:p-9 rounded-xl transition-all duration-300 transform hover:scale-105 select-none
                    ${
                      isSelected
                        ? "border-light-brown border-3 custom-shadow-75 bg-white card-bg-opacity"
                        : "border-white/30 border-2 hover:border-white/50"
                    }`}
                >
                  <div className="flex justify-center space-x-4">
                    <span className="text-4xl">{option.icon}</span>
                  </div>
                  <div>
                    <h3 className="mt-5 font-medium text-l text-white select-none">
                      {option.label}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // Questions view for the selected interest
        <div>
          <div className="bg-white/10 p-4 rounded-lg mb-6">
            <p className="text-white text-center select-none">
              You selected:{" "}
              <span className="font-bold">{selectedInterest?.label}</span>
            </p>
          </div>
          {renderQuestions()}
        </div>
      )}
    </AssessmentStep>
  );
}
