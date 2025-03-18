'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { assessmentFlow } from '@/lib/assessment-flow';
  
export default function DailyGoal() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();
  const { dailyGoal } = assessmentFlow;

  const handleBack = () => {
    const userType = localStorage.getItem('userType');
    const savedStep = localStorage.getItem('currentAssessmentStep');
    
    // FUNCTION WHERE THE USER IS REDIRECTED TO THE LAST ASSESSMENT STEP THEY WERE ON
    if (savedStep) {
      navigate('/assessment');
    } else {
      switch (userType) {
        case 'student':
          navigate('/assessment');
          break;
        case 'professional':
          navigate('/assessment');
          break;
        case 'jobSeeker':
          navigate('/assessment');
          break;
        case 'careerShifter':
          navigate('/assessment');
          break;
        default:
          navigate('/assessment');
      }
    }
  };

  const handleNext = () => {
    if (selectedGoal) {
      localStorage.setItem('daily-goal', selectedGoal);
      navigate(`/assessment/${dailyGoal.nextStep}`);
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
                ${selectedGoal === option.value ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
            >
              <div className="flex justify-center space-x-2 sm:space-x-4">
                <img src={option.icon} alt={option.label} className="w-20 h-20 sm:w-30 sm:h-30" />
              </div>
              <h3 className="font-large text-white mt-3 sm:mt-5 text-base sm:text-lg">{option.label}</h3>
            </button>
          ))}
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}