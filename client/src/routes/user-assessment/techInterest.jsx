import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { assessmentFlow } from '@/lib/assessment-flow';

export default function TechInterest() {
  const [selectedInterest, setSelectedInterest] = useState(null);
  const navigate = useNavigate();
  const { techInterest } = assessmentFlow;

  const handleNext = () => {
    if (selectedInterest) {
      navigate(`/assessment/${selectedInterest.nextStep}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AssessmentLayout
      title="Technical Interests"
      progress={70} 
      prevPage={handleBack}
      nextPage={handleNext}
      showMascot={true}
      buttonPosition="center"
      mascotZIndex="-1"
    >
      <AssessmentStep title={techInterest.title}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
          {techInterest.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedInterest(option)}
              className={`p-6  rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${selectedInterest?.id === option.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
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
    </AssessmentLayout>
  );
}
