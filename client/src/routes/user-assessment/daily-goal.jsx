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

  const handleNext = () => {
    if (selectedGoal) {
      localStorage.setItem('dailyGoal', selectedGoal);
      navigate(dailyGoal.nextStep); // Use the nextStep from dailyGoal
    }
  };

  return (
    <AssessmentLayout
      title={dailyGoal.title}
      progress={80}
      prevPage="/Assessment/educationlevel" // Corrected prevPage path
      nextPage={selectedGoal ? dailyGoal.nextStep : null} // Use nextStep from dailyGoal
      showMascot={true} // Changed to boolean
    >
      <AssessmentStep title={dailyGoal.title}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {dailyGoal.questions[0].options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedGoal(option.value)}
              className={`px-18 py-15 rounded-lg border-2 text-center transition-all duration-200
                ${
                  selectedGoal === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary/50'
                }`}
            >
              <div className="flex justify-center space-x-4">
                <img src={option.icon} alt={option.label} className="w-30 h-30" />
              </div>
              <h3 className="font-large text-white mt-5 text-lg">{option.label}</h3>
            </button>
          ))}
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}