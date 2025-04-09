import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentLayout from "@/components/assessment/AssessmentLayout";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";
import { useAssessmentStore } from "@/store/useAssessmentStore";

export default function TechInterest() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const navigate = useNavigate();
  const { techInterest } = assessmentFlow;
  const {
    technicalInterest,
    technicalAnswers,
    setTechnicalInterest,
    setTechnicalAnswers,
  } = useAssessmentStore();

  const handleInterestSelect = (option) => {
    setTechnicalInterest(option);
    setShowQuestions(true);
    setTechnicalAnswers({});
  };

  const handleBack = () => {
    if (showGoals) {
      setShowGoals(false);
    } else if (showQuestions) {
      setShowQuestions(false);
      setTechnicalInterest(null);
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (!showQuestions) {
      if (technicalInterest) {
        setShowQuestions(true);
      }
    } else {
      // Log the selected technical interest and answers
      console.log("Selected Technical Interest:", technicalInterest);
      console.log("Technical Answers:", technicalAnswers);

      navigate("/assessment/complete", {
        state: { answers: technicalAnswers },
      });
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setTechnicalAnswers({
      ...technicalAnswers,
      [questionId]: value,
    });
  };

  const renderQuestions = () => {
    if (!technicalInterest) return null;

    // For "Other" interest type, we use otherInterests questions
    const questionSet =
      technicalInterest.id === "other"
        ? assessmentFlow.otherInterests
        : assessmentFlow[technicalInterest.id + "Questions"];

    if (!questionSet) return null;

    return (
      <AssessmentStep title={questionSet.title}>
        <div className="space-y-6 mt-8">
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
                        handleAnswerChange(question.id, newAnswers);
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
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="w-full p-3 rounded-lg bg-white/10 border-2 border-white text-white"
                  rows={4}
                  placeholder="Enter your answer..."
                />
              ) : null}
            </div>
          ))}
        </div>
      </AssessmentStep>
    );
  };

  return (
    <AssessmentLayout
      title={
        showQuestions
          ? `${technicalInterest?.label} Assessment`
          : "Technical Interests"
      }
      progress={70}
      prevPage={handleBack}
      nextPage={handleNext}
      showMascot={true}
      buttonPosition="center"
      mascotZIndex="-1"
    >
      {!showQuestions ? (
        <AssessmentStep title={techInterest.title}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
            {techInterest.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleInterestSelect(option)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer
                  ${
                    technicalInterest?.id === option.id
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
              >
                <div className="flex justify-center space-x-4">
                  <span className="text-4xl">{option.icon}</span>
                </div>
                <div>
                  <h3 className="mt-5 font-medium text-l">{option.label}</h3>
                </div>
              </button>
            ))}
          </div>
        </AssessmentStep>
      ) : (
        renderQuestions()
      )}
    </AssessmentLayout>
  );
}
