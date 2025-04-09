"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentLayout from "@/components/assessment/AssessmentLayout";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";
import { useAssessmentStore } from "@/store/useAssessmentStore";

export default function DailyGoal() {
  const setDailyGoal = useAssessmentStore((state) => state.setDailyGoal);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();
  const { dailyGoal } = assessmentFlow;

  const handleBack = () => {
    // Check for Grad Questions savepoint first
    const gradQuestionsSavepoint = localStorage.getItem(
      "gradQuestionsSavepoint"
    );
    if (gradQuestionsSavepoint) {
      localStorage.removeItem("gradQuestionsSavepoint");
      navigate("/assessment/gradQuestions");
      return;
    }

    // Check for College Questions savepoint first
    const collegeQuestionsSavepoint = localStorage.getItem(
      "collegeQuestionsSavepoint"
    );
    if (collegeQuestionsSavepoint) {
      localStorage.removeItem("collegeQuestionsSavepoint");
      navigate("/assessment/collegeQuestions");
      return;
    }

    // Check for HS Questions savepoint first
    const hsQuestionsSavepoint = localStorage.getItem("hsQuestionsSavepoint");
    if (hsQuestionsSavepoint) {
      localStorage.removeItem("hsQuestionsSavepoint");
      navigate("/assessment/hsQuestions");
      return;
    }

    // Check for career transition data first
    const transitionData = localStorage.getItem("careerTransitionData");
    if (transitionData) {
      navigate("/assessment", {
        state: { returnToStep: 6 },
      });
      return;
    }

    // Check for previous experience data
    const previousExpData = localStorage.getItem("previousExpData");
    if (previousExpData) {
      navigate("/assessment", {
        state: { returnToStep: 5 },
      });
      return;
    }

    // Check which professional level questionnaire was last completed
    const yearsExpChoice = localStorage.getItem("yearsOfExpSavepoint");
    if (yearsExpChoice) {
      const choice = JSON.parse(yearsExpChoice);
      switch (choice.id) {
        case "entryLevel":
          navigate("/assessment/entryQuestions");
          return;
        case "midLevel":
          navigate("/assessment/midQuestions");
          return;
        case "seniorLevel":
          navigate("/assessment/seniorQuestions");
          return;
      }
    }

    // Default fallback
    navigate("/assessment");
  };

  const handleNext = () => {
    if (selectedGoal) {
      setDailyGoal(selectedGoal);
      localStorage.setItem("daily-goal", selectedGoal);
      navigate(`/assessment/${dailyGoal.nextStep}`);
      console.log("selected goal:", selectedGoal, " minutes");
    }
  };

  return (
    <AssessmentLayout
      title={dailyGoal.title}
      progress={60}
      prevPage={handleBack}
      nextPage={selectedGoal ? handleNext : null}
      showMascot={true}
    >
      <AssessmentStep title={dailyGoal.title}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mt-4 sm:mt-8 px-4 sm:px-6">
          {dailyGoal.questions[0].options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedGoal(option.value)}
              className={`p-4 sm:px-18 sm:py-15 rounded-lg border-2 text-center transition-all duration-200 cursor-pointer
                ${
                  selectedGoal === option.value
                    ? "border-primary bg-primary/10"
                    : "border-gray-200 hover:border-primary/50"
                }`}
            >
              <div className="flex justify-center space-x-2 sm:space-x-4">
                <img
                  src={option.icon}
                  alt={option.label}
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
              </div>
              <h3 className="font-large text-white mt-3 sm:mt-5 text-base sm:text-lg">
                {option.label}
              </h3>
            </button>
          ))}
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}
