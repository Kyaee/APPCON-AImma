import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { assessmentFlow } from '@/lib/assessment-flow';
import { useAssessmentStore } from '@/store/useAssessmentStore';    

export default function Complete() {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { complete } = assessmentFlow;

  const { 
    language,
    userType,
    educationLevel,
    previousExperience,
    careerTransition,
    dailyGoal,
    technicalInterest,
    technicalAnswers,
    experienceDetails,
    educationDetails,
    resetAssessment
  } = useAssessmentStore();


  // const clearLocalStorageAssessmentData = () => {
  //   // Clear all assessment-related localStorage items
  //   localStorage.removeItem('currentStep');
  //   localStorage.removeItem('selectedType');
  //   localStorage.removeItem('selectedLevel');
  //   localStorage.removeItem('userType');
  //   localStorage.removeItem('educationLevelData');
  //   localStorage.removeItem('yearsOfExpSavepoint');
  //   localStorage.removeItem('previousExpData');
  //   localStorage.removeItem('careerTransitionData');
  //   localStorage.removeItem('entryLevelSavepoint');
  //   localStorage.removeItem('midLevelSavepoint');
  //   localStorage.removeItem('seniorLevelSavepoint');
  //   localStorage.removeItem('hsQuestionsSavepoint');
  //   localStorage.removeItem('collegeQuestionsSavepoint');
  //   localStorage.removeItem('gradQuestionsSavepoint');
  //   localStorage.removeItem('daily-goal');
  //   localStorage.removeItem('currentAssessmentStep');
  // };

  const handleNext = () => {
    // Ensure data exists before logging
    const safeLog = (label, data, defaultMessage = 'Not provided') => {
      console.log(label, data || defaultMessage);
    };

    console.log('=== Assessment Summary ===');
    safeLog('Language:', language); 
    safeLog('User Type:', userType);
    safeLog('Education Level:', educationLevel);
    safeLog('Education Details:', educationDetails);
    safeLog('Experience Details:', experienceDetails);

    // Specifically log each property to avoid undefined issues
    console.log('Previous Experience:');
    safeLog('- Role:', previousExperience?.role);
    safeLog('- Experience:', previousExperience?.experience);
    safeLog('- Reason:', previousExperience?.reason);

    console.log('Career Transition:');
    safeLog('- From:', careerTransition?.from);
    safeLog('- To:', careerTransition?.to);
    safeLog('- Reason:', careerTransition?.reason);

    safeLog('Daily Goal:', dailyGoal, '0');
    safeLog('Technical Interest:', technicalInterest);
    safeLog('Technical Answers:', technicalAnswers);
    safeLog('Feedback:', feedback);
    console.log('========================');

    // Wait a brief moment to ensure console logs are visible before resetting
    setTimeout(() => {
      // Reset all assessment data
      resetAssessment();
      // clearLocalStorageAssessmentData();

      // Navigate to dashboard or wherever you want after completion
      navigate('/dashboard');
    }, 500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AssessmentLayout
      title="Assessment Complete"
      progress={100}
      prevPage={handleBack}
      nextPage={handleNext}
      showMascot={true}
      buttonPosition="center"
      mascotZIndex="-1"
      nextButtonText="Go to Dashboard"
    >
      <AssessmentStep title={complete.title}>
        <div className="space-y-6 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Thank you for completing the assessment! Your personalized learning path is being generated.
            </p>
          </div>
          
          <div className="space-y-4">
            <label className="block text-lg font-medium text-white">
              {complete.questions[0].label}
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border-2 border-white text-white"
              rows={4}
              placeholder="Share your thoughts with us..."
            />
          </div>
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}