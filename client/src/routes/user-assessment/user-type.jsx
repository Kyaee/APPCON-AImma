'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { assessmentFlow } from '@/lib/assessment-flow';

export default function UserType() {  
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();
  const { userType } = assessmentFlow;

  const handleNext = () => {
    if (selectedType) {
      const nextPath = selectedType.id === 'student' 
        ? '/Assessment/educationlevel'
        : `/Assessment/${selectedType.nextStep.toLowerCase()}`;
      navigate(nextPath);
    }
  };

  return (
    <AssessmentLayout
      title= "Career Assessment"
      progress={20}
      prevPage="/Assessment/language"
      nextPage={selectedType ? `/Assessment/${selectedType.nextStep.toLowerCase()}` : null}
      showMascot = "false"
    >
      <AssessmentStep title={userType.title}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {assessmentFlow.userType.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedType(option)}
              className={`px-10 py-25 rounded-lg border-2 text-center transition-all duration-200
                ${
                selectedType?.id === option.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              
              <div className="flex justify-center space-x-4">
                <span className="text-6xl">{option.icon}</span>
              </div>
                  <h3 className="mt-5 font-medium text-lg">{option.label}</h3>
            </button>
          ))}
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}