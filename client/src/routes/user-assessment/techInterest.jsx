import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { assessmentFlow } from '@/lib/assessment-flow';

export default function TechInterest() {
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { techInterest } = assessmentFlow;

  const handleInterestSelect = (option) => {
    setSelectedInterest(option);
    setShowQuestions(true);
    setAnswers({});
  };

  const handleBack = () => {
    if (showGoals) {
      setShowGoals(false);
    } else if (showQuestions) {
      setShowQuestions(false);
      setSelectedInterest(null);
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (!showQuestions) {
      if (selectedInterest) {
        setShowQuestions(true);
      }
    } else {
      // After answering questions, go directly to complete
      navigate('/assessment/complete', {
        state: { answers }
      });
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const renderQuestions = () => {
    if (!selectedInterest) return null;

    // For "Other" interest type, we use otherInterests questions
    const questionSet = selectedInterest.id === 'other'
      ? assessmentFlow.otherInterests
      : assessmentFlow[selectedInterest.id + 'Questions'];

    if (!questionSet) return null;

    return (
      <AssessmentStep title={questionSet.title}>
        <div className="space-y-6 mt-8">
          {questionSet.questions.map((question) => (
            <div key={question.id} className="space-y-4">
              <label className="block text-lg font-medium text-white">
                {question.label}
              </label>
              {question.type === 'multiselect' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        const currentAnswers = answers[question.id] || [];
                        const newAnswers = currentAnswers.includes(option)
                          ? currentAnswers.filter(a => a !== option)
                          : [...currentAnswers, option];
                        handleAnswerChange(question.id, newAnswers);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all duration-200
                        ${(answers[question.id] || []).includes(option)
                          ? 'border-white bg-amber-800/50 text-white'
                          : 'border-amber-800/30 text-white/80 hover:border-amber-800/50'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : question.type === 'text' ? (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border-2 border-amber-800/30 text-white"
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
      title={showQuestions ? `${selectedInterest?.label} Assessment` : "Technical Interests"}
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
                  ${selectedInterest?.id === option.id 
                    ? 'border-white bg-amber-800/50 text-white'
                    : 'border-amber-800/30 text-white/80 hover:border-amber-800/50'
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
