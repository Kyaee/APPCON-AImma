import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";
import TechQuestionFactory from "./tech/TechQuestionFactory";
import { useAssessmentStore } from "@/store/useAssessmentStore";

// Memoized TechQuestionFactory with specific props comparison
const MemoizedTechQuestionFactory = memo(
  TechQuestionFactory,
  (prevProps, nextProps) => {
    return (
      prevProps.interestType?.id === nextProps.interestType?.id &&
      JSON.stringify(prevProps.answers) === JSON.stringify(nextProps.answers)
    );
  }
);

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

// Main component - stabilize it with memo
const TechInterestStep = ({
  technicalInterest,
  technicalAnswers,
  onInterestSelect,
  onAnswerChange,
  showQuestions = false,
}) => {
  // Track selected interest with useRef to maintain stability
  const [selectedInterest, setSelectedInterest] = useState(null);

  // Store connection - access only once to prevent re-renders
  const storeTechnicalInterest = useAssessmentStore(
    (state) => state.technicalInterest
  );
  const storeTechnicalAnswers = useAssessmentStore(
    (state) => state.technicalAnswers
  );

  // Set initial selected interest from props or store - WITH STABILITY
  useEffect(() => {
    if (!selectedInterest) {
      const interestToUse = technicalInterest || storeTechnicalInterest;
      if (interestToUse) {
        setSelectedInterest(interestToUse);
      }
    }
  }, []);

  // STABLE handler for interest selection
  const handleInterestSelect = useCallback(
    (option) => {
      setSelectedInterest(option);
      onInterestSelect(option);
    },
    [onInterestSelect]
  );

  // Create a STABLE version of the current answers
  const currentAnswers = useMemo(() => {
    return technicalAnswers || storeTechnicalAnswers || {};
  }, [technicalAnswers, storeTechnicalAnswers]);

  // Use a stable debounced answer handler to avoid repeated renders
  const handleAnswerChange = useCallback(
    (questionId, value) => {
      requestAnimationFrame(() => {
        onAnswerChange(questionId, value);
      });
    },
    [onAnswerChange]
  );

  // STABLE interest selection view with box-sizing: border-box for consistent sizing
  const renderInterestSelection = useMemo(
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
                className={`flex flex-col items-center p-8 sm:p-9 rounded-xl box-border transition-colors
                ${
                  isSelected
                    ? "border-light-brown border-3 custom-shadow-75 bg-white card-bg-opacity"
                    : "border-white/30 border-2 hover:border-white/60 hover:border-3"
                }`}
                style={{
                  // This is critical - maintains stable dimensions regardless of border size
                  boxSizing: "border-box",
                  // Add margin calculations to compensate for border differences
                  margin: isSelected ? "0px" : "0.5px",
                }}
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
    [selectedInterest?.id, handleInterestSelect]
  );

  // Create STABLE question component using factory for all interest types
  const questionComponent = useMemo(() => {
    if (!selectedInterest) return null;

    // Use factory for all interest types
    return (
      <MemoizedTechQuestionFactory
        interestType={selectedInterest}
        answers={currentAnswers}
        onAnswerChange={handleAnswerChange}
      />
    );
  }, [selectedInterest, currentAnswers, handleAnswerChange]);

  // Make the actual questions view stable with useMemo
  const questionsView = useMemo(() => {
    if (!selectedInterest) return null;
    return (
      <div>
        <div className="bg-white/10 p-4 rounded-lg mb-6">
          <p className="text-white text-center">
            You selected:{" "}
            <span className="font-bold">{selectedInterest.label}</span>
          </p>
        </div>
        <QuestionsContainer>{questionComponent}</QuestionsContainer>
      </div>
    );
  }, [selectedInterest, questionComponent]);

  // Title derived from selected interest - made stable
  const title = useMemo(() => {
    if (showQuestions && selectedInterest) {
      return `${selectedInterest.label || "Technical"} Questions`;
    }
    return "Technical Interests";
  }, [showQuestions, selectedInterest?.label]);

  // Return the overall component with less dependencies
  return (
    <AssessmentStep title={title}>
      {!showQuestions ? renderInterestSelection : questionsView}
    </AssessmentStep>
  );
};

export default memo(TechInterestStep);
