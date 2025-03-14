import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { assessmentFlow } from '@/lib/assessment-flow';

export default function CombinedAssessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState('English');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [previousExp, setPreviousExp] = useState({
    lastRole: '',
    yearsExperience: '',
    reasonForChange: ''
  });
  const navigate = useNavigate();
  const { userType } = assessmentFlow;

  const handleNext = () => {
    console.log('Current Step:', currentStep);
    console.log('Selected Type:', selectedType);
    console.log('Selected Level:', selectedLevel);

    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedType) {
      if (selectedType.id === 'student') {
        setCurrentStep(3);
      } else if (selectedType.id === 'professional') {
        setCurrentStep(4);
      } else if (selectedType.id === 'jobSeeker') {
        setCurrentStep(5);
      } else {
        navigate(`/Assessment/${selectedType.nextStep.toLowerCase()}`);
      }
    } else if (currentStep === 3 && selectedLevel) {
      navigate(`/assessment/${selectedLevel.nextStep.toLowerCase()}`);
    } else if (currentStep === 4 && selectedLevel) {
      navigate(`/assessment/${selectedLevel.nextStep.toLowerCase()}`); // Changed this line to navigate instead of setCurrentStep
    } else if (currentStep === 5 && previousExp.lastRole && previousExp.yearsExperience 
      && previousExp.reasonForChange) {
        
      setCurrentStep(6); // Instead of navigating away, move to next step
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 5) {
        setCurrentStep(2); // Go back to Career Assessment from both Previous Experience and jobSeeker pages
      } else if (currentStep === 4) {
        setCurrentStep(2); // Go back to Career Assessment from Years of Experience
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentStep title="Choose a language">
            <p className="text-white text-center mb-10">For your convenience</p>
            <div className="w-full max-w-md mx-auto">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 rounded-2xl text-gray-800 text-center border-2 border-black bg-white mb-6"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
                <option value="Chinese">Chinese</option>
              </select>
              <div className="flex justify-center"> {/* Center the Next button */}
                <button
                  onClick={handleNext}
                  className="px-25 py-2 bg-amber-500 border-2 drop-shadow-xl border-black text-black rounded-2xl hover:bg-amber-900 
                  transition-colors w-32 flex items-center justify-center" // Ensure text is centered
                >
                  Next
                </button>
              </div>
            </div>
          </AssessmentStep> 
        );
      case 2:
        return (
          <AssessmentStep title={userType.title}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {userType.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedType(option)}
                  className={`px-10 py-25 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${
                      selectedType?.id === option.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                >
                  <div className="flex justify-center space-x-4">
                    <span className="text-6xl">{option.icon}</span>
                  </div>
                  <div>
                    <h3 className="mt-5 font-medium text-lg">{option.label}</h3>
                  </div>
                </button>
              ))}
            </div>
          </AssessmentStep>
        );
      case 3:
        return (
          <AssessmentStep title="What's your education level?">
            {(() => {
              switch (selectedType?.id) {
                case 'student':
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                      {assessmentFlow.educationLevel.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedLevel(option)}
                          className={`px-14.5 py-25 rounded-lg border-2 text-center transition-all duration-200  cursor-pointer
                            ${
                              selectedLevel?.id === option.id
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                        >
                          <div className="flex justify-center space-x-4">
                            <span className="text-6xl">{option.icon}</span>
                          </div>
                          <div> 
                            <h3 className="mt-5 font-medium text-lg">{option.label}</h3>
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </AssessmentStep>
        );
      case 4:
        return (
          <AssessmentStep title="Years of Experience">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {assessmentFlow.yearsExperience.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedLevel(option)}
                  className={`px-14.5 py-25 rounded-lg border-2 text-center transition-all duration-200 cursor-pointer
                    ${
                      selectedLevel?.id === option.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                >
                  <div className="flex justify-center space-x-4">
                    <span className="text-6xl">{option.icon}</span>
                  </div>
                  <div>
                    <h3 className="mt-5 font-medium text-lg">{option.label}</h3>
                  </div>
                </button>
              ))}
            </div>
          </AssessmentStep>
        );
      case 5:
        return (
          <AssessmentStep title="Previous Experience">
            <div className="max-w-2xl mx-auto space-y-6 mt-8">
              <div>
                <label className="block text-lg mb-2">What was your last role?</label>
                <input
                  type="text"
                  value={previousExp.lastRole}
                  onChange={(e) => setPreviousExp(prev => ({...prev, lastRole: e.target.value}))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200"
                />
              </div>
              
              <div>
                <label className="block text-lg mb-2">Years of experience</label>
                <select
                  value={previousExp.yearsExperience}
                  onChange={(e) => setPreviousExp(prev => ({...prev, yearsExperience: e.target.value}))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200"
                >
                  <option value="">Select years of experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-lg mb-2">Reason for seeking new opportunity</label>
                <textarea
                  value={previousExp.reasonForChange}
                  onChange={(e) => setPreviousExp(prev => ({...prev, reasonForChange: e.target.value}))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
                />
              </div>
            </div>
          </AssessmentStep>
        );
      default:
        return null;
    }
  };

  const getProgress = () => {
    switch (currentStep) {
      case 1:
        return 10;
      case 2:
        return 20;
      case 3:
      case 4:  // Added case 4 to return same value as case 3
      case 5:
        return 30;
      default:
        return 0;
    }
  };

  return (
    <AssessmentLayout
      title={
        currentStep === 1
          ? "Preferred language"
          : currentStep === 2
          ? "Career Assessment"
          : currentStep === 3
          ? "Skill Level Assessment"
          : currentStep === 4
          ? "Years of Experience"
          : "Previous Experience"
      } 
      progress={getProgress()}
      prevPage={currentStep > 1 ? handleBack : null}
      nextPage={currentStep === 1 ? null : handleNext}
      showMascot={currentStep !== 1}
      buttonPosition="center"
    >
      {renderStep()}
    </AssessmentLayout>
  );
}