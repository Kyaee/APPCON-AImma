import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { assessmentFlow } from '@/lib/assessment-flow';
import {useAssessmentStore} from '@/store/useAssessmentStore';  

export default function CombinedAssessment() {
  // Get store actions and state
  const {
    setLanguage,
    language,
    setUserType,
    setEducationLevel,
    setCareerTransition,
    setPreviousExperience,
    previousExperience,
    careerTransition,
    resetAssessment
  } = useAssessmentStore();

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('currentStep');
    return saved ? parseInt(saved) : 1;
  });

  const [selectedType, setSelectedType] = useState(() => {
    const saved = localStorage.getItem('selectedType');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedLevel, setSelectedLevel] = useState(() => {
    const saved = localStorage.getItem('selectedLevel');
    return saved ? JSON.parse(saved) : null;
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
    localStorage.removeItem('educationLevelData');
  };

  useEffect(() => {
    if (location.state?.returnToStep) {
      setCurrentStep(location.state.returnToStep);
      if (location.state.selectedType) {
        setSelectedType(location.state.selectedType);
      }
      if (location.state.selectedLevel) {
        setSelectedLevel(location.state.selectedLevel);
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

  // Add new useEffect to persist state changes
  useEffect(() => {
    if (currentStep) localStorage.setItem('currentStep', currentStep);
    if (selectedType) localStorage.setItem('selectedType', JSON.stringify(selectedType));
    if (selectedLevel) localStorage.setItem('selectedLevel', JSON.stringify(selectedLevel));
  }, [currentStep, selectedType, selectedLevel]);

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleTypeSelection = (option) => {
    const selectedData = {
      label: option.label,
      id: option.id
    };
    setSelectedType(selectedData);
    setUserType(selectedData);
  };

  const handleEducationLevel = (option) => {
    const selectedData = {
      label: option.label,
      id: option.id
    };
    setSelectedLevel(selectedData);
    setEducationLevel(selectedData);
  };
    
  const handleExperienceLevel = (option) => {
    const selectedData = {
      label: option.label,
      id: option.id
    };
    setSelectedLevel(selectedData);
    // Note: We don't set education level here
  };

  // Add validation functions
  const isFormValid = (stepData, questions) => {
    return questions.every(question => {
      const answer = stepData[question.id];
      return answer && (typeof answer === 'string' ? answer.trim() !== '' : true);
    });
  };

  // Add extra verification on next button press
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
      // Save education level before navigation
      localStorage.setItem('educationLevelData', JSON.stringify(selectedLevel));
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
    }
    // MEERRRR CHECK MO NGA TO 
    else if (currentStep === 5) {
        // Double-check the mapping between form fields and Zustand properties
        console.log('Saving previous experience to Zustand:', previousExperience);
        
        // Set data in the Zustand store with explicit mapping
        setPreviousExperience({
          role: previousExperience.role || '',
          experience: previousExperience.experience || '',
          reason: previousExperience.reason || ''
        });
        
        localStorage.setItem('previousExpData', JSON.stringify(previousExperience));
        localStorage.setItem('currentAssessmentStep', currentStep.toString());
        
        // Verify data was saved correctly
        console.log('Saved to Zustand:', useAssessmentStore.getState().previousExperience);
        
        navigate('/assessment/daily-goal');
    } 
    else if (currentStep === 6) {
        // Double-check the mapping between form fields and Zustand properties
        console.log('Saving career transition to Zustand:', transition);
        
        // Set data in the Zustand store with explicit mapping
        setCareerTransition({
          from: transition.from || '',
          to: transition.to || '',
          reason: transition.reason || ''
        });
        
        localStorage.setItem('careerTransitionData', JSON.stringify(transition));
        localStorage.setItem('currentAssessmentStep', currentStep.toString());
        
        // Verify data was saved correctly
        console.log('Saved to Zustand:', useAssessmentStore.getState().careerTransition);

        navigate('/assessment/daily-goal');
    }
  };

  const clearLocalStorageAssessmentData = () => {
    // Clear assessment-related localStorage items
    localStorage.removeItem('currentStep');
    localStorage.removeItem('selectedType');
    localStorage.removeItem('selectedLevel');
    localStorage.removeItem('userType');
    localStorage.removeItem('educationLevelData');
    localStorage.removeItem('yearsOfExpSavepoint');
    localStorage.removeItem('previousExpData');
    localStorage.removeItem('careerTransitionData');
    localStorage.removeItem('entryLevelSavepoint');
    localStorage.removeItem('midLevelSavepoint');
    localStorage.removeItem('seniorLevelSavepoint');
    localStorage.removeItem('hsQuestionsSavepoint');
    localStorage.removeItem('collegeQuestionsSavepoint');
    localStorage.removeItem('gradQuestionsSavepoint');
    localStorage.removeItem('currentAssessmentStep');
  };

  const resetAndClearAll = () => {
    resetAssessment();
    clearLocalStorageAssessmentData();
  };

  // Add this enhanced reset helper function
  const resetCurrentStepData = (step) => {
    switch (step) {
      case 1:
        setLanguage('English');
        localStorage.removeItem('language');
        break;
      case 2:
        setSelectedType(null);
        localStorage.removeItem('selectedType');
        break;
      case 3:
        setSelectedLevel(null);
        setEducationLevel({ label: '', id: '' });
        localStorage.removeItem('selectedLevel');
        localStorage.removeItem('educationLevelData');
        break;
      case 4:
        setSelectedLevel(null); 
        localStorage.removeItem('selectedLevel');
        localStorage.removeItem('yearsOfExpSavepoint');         
        break;
      case 5:
        setPreviousExperience({
          label: '',
          answer: ''
        });
        localStorage.removeItem('previousExpData');
        break;
      case 6:
        setCareerTransition({
          label: '',
          answer: ''
        });
        localStorage.removeItem('careerTransitionData');
        break;
    }
  };

  // Replace the existing handleBack function with this one 
  const handleBack = () => {
    if (currentStep > 1) {
      // Reset data for current step before going back
      resetCurrentStepData(currentStep);
      
      if ([4, 5, 6].includes(currentStep)) {
        clearSavepoints();
        setCurrentStep(2); // Go back to Career Assessment
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  // Update to add verification that data is correctly formatted
  const handlePreviousExpChange = (label, value) => {
    setPreviousExperience(label, value);
    
    console.log('Updated Zustand store with:', value, label);
  };

  const handleTransitionChange = (label, value) => {
    setCareerTransition(label, value)
    // Log current state to verify it's working
    console.log('Updated Zustand store with:', value, label);
  };

  const renderQuestions = (questionSet) => {
    if (!questionSet) return null;

    return (
      <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
        {questionSet.questions.map((question) => (
          <div key={question.id}>
            <label className="block text-lg mb-2">{question.label}</label>
            {question.type === 'select' ? (
              <select
                value={
                  currentStep === 5 
                    ? previousExperience[question.label] || ''
                    : careerTransition[question.label] || ''
                }
                onChange={(e) => {(currentStep === 5) ?
                    handlePreviousExpChange(question.label, e.target.value)
                  : 
                    handleTransitionChange(question.label, e.target.value)
                }}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
              >
                <option value="" disabled>Select an option</option>
                {question.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (         
              <textarea
                value={
                  currentStep === 5 
                    ? previousExperience[question.label] || ''
                    : careerTransition[question.label] || ''
                }
                onChange={(e) => {(currentStep === 5) ?
                    handlePreviousExpChange(question.label, e.target.value)
                  :
                    handleTransitionChange(question.label, e.target.value)
                  }}
                className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
                placeholder="Enter your answer..."
              />
            )}
          </div>
        ))}
      </div>
    );
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
                onChange={(e) => handleLanguageChange(e.target.value)}
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
                  onClick={() => handleTypeSelection(option)}
                  className={`p-4 sm:px-10 sm:py-25 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${selectedType?.id === option.id 
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
            <button onClick={()=>console.log(userType)} className='border-5 border-red'>WAWA</button>
            {(() => {
              switch (selectedType?.id) {
                case 'student':
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-8 px-4 sm:px-0">
                      {assessmentFlow.educationLevel.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleEducationLevel(option)}
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
                  onClick={() => handleExperienceLevel(option)}
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
            {renderQuestions(assessmentFlow.previousExperience)}
          </AssessmentStep>
        );
      case 6:
        return (
          <AssessmentStep title="Career Transition">
            {renderQuestions(assessmentFlow.transitionType)}
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