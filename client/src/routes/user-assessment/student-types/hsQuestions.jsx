import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';

export default function HSQuestions() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    strand: '',
    planningCollege: null,
    interestAreas: [],
    careerGoals: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestChange = (area) => {
    setFormData(prev => ({
      ...prev,
      interestAreas: prev.interestAreas.includes(area)
        ? prev.interestAreas.filter(a => a !== area)
        : [...prev.interestAreas, area]
    }));
  };

  const handleBack = () => {
    const studentType = { id: 'student', label: 'Student', icon: '👨‍🎓' };
    const hsLevel = { id: 'highSchool', label: 'High School Student', icon: '🏫' };
    
    // Save selections to localStorage
    localStorage.setItem('selectedType', JSON.stringify(studentType));
    localStorage.setItem('selectedLevel', JSON.stringify(hsLevel));
    
    navigate('/assessment', { 
      state: { 
        returnToStep: 3,
        selectedType: studentType,
        selectedLevel: hsLevel
      }
    });
  };

  const handleNext = () => {
    if (formData.strand && formData.planningCollege !== null && 
        formData.interestAreas.length > 0 && formData.careerGoals) {
      localStorage.setItem('hsResponses', JSON.stringify(formData));
      localStorage.setItem('currentAssessmentStep', '3'); // Save point
      localStorage.setItem('hsQuestionsSavepoint', 'true'); // Add this line
      navigate('/assessment/daily-goal');
    }
  };

  return (
    <AssessmentLayout
      title="High School Assessment"
      progress={40}
      prevPage={handleBack}
      nextPage={handleNext}
      showMascot={true}
      buttonPosition="center"
    >
      <AssessmentStep title="Tell us about your academic path">
        <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
          {/* Strand Selection */}
          <div>
            <label className="block text-lg mb-2">Which strand are you currently in?</label>
            <select
              value={formData.strand}
              onChange={(e) => handleInputChange('strand', e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
            >
              <option value="" disabled>Select strand</option>
              {['STEM', 'ICT', 'Other'].map(strand => (
                <option key={strand} value={strand}>{strand}</option>
              ))}
            </select>
          </div>

          {/* College Plans */}
          <div>
            <label className="block text-lg mb-2">Are you planning to go to college?</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ].map(option => (
                <button
                  key={option.label}
                  onClick={() => handleInputChange('planningCollege', option.value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all duration-200
                    ${formData.planningCollege === option.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary/50'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Areas */}
          <div>
            <label className="block text-lg mb-2">What are your areas of interest in technology?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Programming', 'Networking', 'Web Development', 'Game Development', 'AI/Machine Learning'].map(area => (
                <button
                  key={area}
                  onClick={() => handleInterestChange(area)}
                  className={`p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${formData.interestAreas.includes(area) 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary/50'}`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Career Goals */}
          <div>
            <label className="block text-lg mb-2">What are your career goals?</label>
            <textarea
              value={formData.careerGoals}
              onChange={(e) => handleInputChange('careerGoals', e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
              placeholder="Share your career aspirations"
            />
          </div>
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}
