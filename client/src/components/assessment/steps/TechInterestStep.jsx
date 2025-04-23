import React, { useState, useEffect, useCallback, memo } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";
import ProgrammingQuestionsStep from "./tech/ProgrammingQuestionsStep";
import NetworkingQuestionsStep from "./tech/NetworkingQuestionsStep";
import WebDevelopmentQuestionsStep from "./tech/WebDevelopmentQuestionsStep";
import TechQuestionFactory from "./tech/TechQuestionFactory";
import { useAssessmentStore } from "@/store/useAssessmentStore";

// Create stable memoized components
const MemoizedProgrammingQuestions = memo(ProgrammingQuestionsStep);
const MemoizedNetworkingQuestions = memo(NetworkingQuestionsStep);
const MemoizedWebDevelopmentQuestions = memo(WebDevelopmentQuestionsStep);
const MemoizedTechQuestionFactory = memo(TechQuestionFactory);

// Memoized scrollable container to prevent re-render
const QuestionsContainer = memo(({ children }) => (
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
));

const TechInterestStep = ({
  technicalInterest,
  technicalAnswers,
  onInterestSelect,
  onAnswerChange,
  showQuestions = false,
}) => {
  // Change to track only a single selected interest instead of an array
  const [selectedInterest, setSelectedInterest] = useState(null);

  // Connect to assessment store for global state access
  const storeTechnicalInterest = useAssessmentStore(
    (state) => state.technicalInterest
  );
  const storeTechnicalAnswers = useAssessmentStore(
    (state) => state.technicalAnswers
  );

  // Set initial selected interest from props or store
  useEffect(() => {
    const interestToUse = technicalInterest || storeTechnicalInterest;
    if (
      interestToUse &&
      (!selectedInterest || selectedInterest.id !== interestToUse.id)
    ) {
      setSelectedInterest(interestToUse);
    }
  }, [technicalInterest, storeTechnicalInterest]);

  // Stable handler for interest selection
  const handleInterestSelect = useCallback(
    (option) => {
      setSelectedInterest(option);
      onInterestSelect(option);
    },
    [onInterestSelect]
  );

  // Stable handler for answer changes
  const memoizedAnswerChange = useCallback(
    (questionId, value) => {
      onAnswerChange(questionId, value);
    },
    [onAnswerChange]
  );

  // Get the proper component based on interest type
  const getQuestionComponent = useCallback(() => {
    if (!selectedInterest) return null;

    // Use the actual answers (from props or store)
    const actualAnswers = technicalAnswers || storeTechnicalAnswers || {};

    switch (selectedInterest.id) {
      case "programming":
        return (
          <MemoizedProgrammingQuestions
            answers={actualAnswers}
            onAnswerChange={memoizedAnswerChange}
          />
        );
      case "networking":
        return (
          <MemoizedNetworkingQuestions
            answers={actualAnswers}
            onAnswerChange={memoizedAnswerChange}
          />
        );
      case "webDevelopment":
        return (
          <MemoizedWebDevelopmentQuestions
            answers={actualAnswers}
            onAnswerChange={memoizedAnswerChange}
          />
        );
      default:
        // For other interest types, use the generic approach
        return (
          <MemoizedTechQuestionFactory
            interestType={selectedInterest}
            answers={actualAnswers}
            onAnswerChange={memoizedAnswerChange}
          />
        );
    }
  }, [
    selectedInterest,
    technicalAnswers,
    storeTechnicalAnswers,
    memoizedAnswerChange,
  ]);

  // Interest selection view
  const renderInterestSelection = useCallback(
    () => (
      <div>
        <p className="text-white text-center mb-4">
          Select your primary technical interest:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
          {assessmentFlow.techInterest.options.map((option) => {
            const isSelected = selectedInterest?.id === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleInterestSelect(option)}
                className={`flex flex-col items-center p-8 sm:p-9 rounded-xl border-3 ${
                  isSelected
                    ? "border-light-brown custom-shadow-75 bg-white card-bg-opacity"
                    : "border-white/30 hover:border-white/60"
                }`}
                type="button"
              >
                <div className="flex justify-center">
                  <span className="text-4xl">{option.icon}</span>
                </div>
                <div>
                  <h3 className="mt-5 font-medium text-l text-white">
                    {option.label}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    ),
    [selectedInterest, handleInterestSelect]
  );

  // Questions view
  const renderQuestionsView = useCallback(() => {
    const questionComponent = getQuestionComponent();
    return (
      <div>
        <div className="bg-white/10 p-4 rounded-lg mb-6">
          <p className="text-white text-center">
            You selected:{" "}
            <span className="font-bold">{selectedInterest?.label}</span>
          </p>
        </div>
        <QuestionsContainer>{questionComponent}</QuestionsContainer>
      </div>
    );
  }, [selectedInterest, getQuestionComponent]);

  return (
    <AssessmentStep
      title={
        showQuestions && selectedInterest
          ? `${selectedInterest.label || "Technical"} Questions`
          : "Technical Interests"
      }
    >
      {!showQuestions ? renderInterestSelection() : renderQuestionsView()}
    </AssessmentStep>
  );
};

export default memo(TechInterestStep);
