import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [transition, setTransition] = useState({
    currentField: '',
    desiredField: '',
    transitionReason: ''
  });
  const [yearsOfExpData, setYearsOfExpData] = useState(() => {
    const saved = localStorage.getItem('yearsOfExpSavepoint');
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = assessmentFlow;

  const clearSavepoints = () => {
    localStorage.removeItem('entryLevelSavepoint');
    localStorage.removeItem('midLevelSavepoint');
    localStorage.removeItem('seniorLevelSavepoint');
    localStorage.removeItem('previousExpData');
    localStorage.removeItem('careerTransitionData');
  };

  useEffect(() => {
    if (location.state?.returnToStep) {
      setCurrentStep(location.state.returnToStep);
      if (location.state.returnToStep === 2) {
        clearSavepoints();
      }
    }
    const savedStep = localStorage.getItem('currentAssessmentStep');
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
      localStorage.removeItem('currentAssessmentStep'); // Clear after restoring
    }
    // Load saved years of experience data if returning to step 4
    if (location.state?.returnToStep === 4) {
      const saved = localStorage.getItem('yearsOfExpSavepoint');
      if (saved) {
        setSelectedLevel(JSON.parse(saved));
      }
    }
  }, [location]);

  const handleNext = () => {
    console.log('Current Step:', currentStep);
    console.log('Selected Type:', selectedType);
    console.log('Selected Level:', selectedLevel);

    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedType) {
      localStorage.setItem('userType', selectedType.id);
      if (selectedType.id === 'student') {
        setCurrentStep(3);
      } else if (selectedType.id === 'professional') {
        setCurrentStep(4);
      } else if (selectedType.id === 'jobSeeker') {
        setCurrentStep(5);    
      } else if (selectedType.id === 'careerShifter') {
        setCurrentStep(6);
      }
    } else if (currentStep === 3 && selectedLevel) {
      // Route to the appropriate questions based on education level
      switch (selectedLevel.id) {
        case 'highSchool':
          navigate('/assessment/hsQuestions');
          break;
        case 'college':
          navigate('/assessment/collegeQuestions');
          break;
        case 'graduateSchool':
          navigate('/assessment/gradQuestions');
          break;
        default:
          setCurrentStep(4);
      }
    } else if (currentStep === 4 && selectedLevel) {
      // Save years of experience selection before navigation
      localStorage.setItem('yearsOfExpSavepoint', JSON.stringify(selectedLevel));
      // Route to the appropriate questions based on years of experience
      switch (selectedLevel.id) {
        case 'entryLevel':
          navigate('/assessment/entryQuestions');
          break;
        case 'midLevel':
          navigate('/assessment/midQuestions');
          break;
        case 'seniorLevel':
          navigate('/assessment/seniorQuestions');
          break;
        default:
          setCurrentStep(5);
      }
    } else if (currentStep === 5 && previousExp.lastRole && previousExp.yearsExperience 
      && previousExp.reasonForChange) {
      localStorage.setItem('previousExpData', JSON.stringify(previousExp));
      localStorage.setItem('currentAssessmentStep', currentStep.toString());
      navigate('/assessment/daily-goal');
    } else if (currentStep === 6 && transition.currentField && transition.desiredField 
      && transition.transitionReason) {
      localStorage.setItem('careerTransitionData', JSON.stringify(transition));
      localStorage.setItem('currentAssessmentStep', currentStep.toString());
      navigate('/assessment/daily-goal');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if ([4, 5, 6].includes(currentStep)) {
        clearSavepoints();
        localStorage.removeItem('yearsOfExpSavepoint');
        setCurrentStep(2); // Go back to Career Assessment
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentStep title="Choose a language" className="text-xl">        
            <p className="text-white text-center mb-4 sm:mb-10">For your convenience</p>
            <div className="w-full max-w-md mx-auto px-4 sm:px-0">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-2xl text-gray-800 text-center text-sm sm:text-base border-2 border-black bg-white mb-4 sm:mb-6"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
                <option value="Chinese">Chinese</option>
              </select>
              <div className="flex justify-center"> 
                <button
                  onClick={handleNext}
                  className="px-25 py-2 bg-amber-500 border-2 drop-shadow-xl border-black text-black rounded-2xl hover:bg-amber-900 
                  transition-colors w-full sm:w-32 text-sm sm:text-base flex items-center justify-center" 
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
              {userType.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedType(option)}
                  className={`p-4 sm:px-10 sm:py-25 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${selectedType?.id === option.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
                      {assessmentFlow.educationLevel.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedLevel(option)}
                          className={`p-4 sm:px-14.5 sm:py-25 rounded-lg border-2 text-center transition-all duration-200 cursor-pointer
                            ${selectedLevel?.id === option.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
              {assessmentFlow.yearsExperience.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedLevel(option)}
                  className={`p-4 px-23 sm:py-25 rounded-lg border-2 text-center transition-all duration-200 cursor-pointer
                    ${selectedLevel?.id === option.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
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
            <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
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
                  className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
                >
                  <option value="" disabled = "disable">Select years of experience</option>
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
                  className="w-full p-3 rounded-lg border-2 border-gray-200 h-32 z-50"
                />
              </div>
            </div>
          </AssessmentStep>
        );
      case 6:
        return (
          <AssessmentStep title="Career Transition">
            <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
              <div>
                <label className="block text-lg mb-2">What field are you transitioning from?</label>
                <input
                  type="text"
                  value={transition.currentField}
                  onChange={(e) => setTransition(prev => ({...prev, currentField: e.target.value}))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200"
                  placeholder="Enter your current field"
                />
              </div>
              
              <div>
                <label className="block text-lg mb-2">What tech field interests you most?</label>
                <select
                  value={transition.desiredField}
                  onChange={(e) => setTransition(prev => ({...prev, desiredField: e.target.value}))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
                >
                  <option value="" disabled="disabled">Select desired field</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-lg mb-2">Why are you interested in transitioning to tech?</label>
                <textarea
                  value={transition.transitionReason}
                  onChange={(e) => setTransition(prev => ({...prev, transitionReason: e.target.value}))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
                  placeholder="Share your motivation"
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
      case 4:
      case 5:
      case 6:
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
          : currentStep === 5
          ? "Previous Experience"
          : "Career Transition"
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