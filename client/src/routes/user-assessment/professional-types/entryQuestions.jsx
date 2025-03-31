import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';
import { useAssessmentStore } from '@/store/useAssessmentStore';    

export default function EntryQuestions() {
  const navigate = useNavigate();
  const { experienceDetails, setExperienceDetails } = useAssessmentStore();

  const handleInputChange = (field, value) => {
    setExperienceDetails({ [field]: value });
  };

  const handleSkillsChange = (skill) => {
    const newSkills = experienceDetails.skillsUsed.includes(skill)
      ? experienceDetails.skillsUsed.filter(s => s !== skill)
      : [...experienceDetails.skillsUsed, skill];
    
    setExperienceDetails({ skillsUsed: newSkills });
  };
  
  const handleBack = () => {
    navigate('/assessment', { 
      state: { returnToStep: 4 }
    });
  };

  const handleNext = () => {
    if (experienceDetails.currentRole && experienceDetails.companyIndustry && experienceDetails.skillsUsed.length > 0) {
      navigate('/assessment/daily-goal');
    }
  };

  return (
    <AssessmentLayout
      title="Entry Level Assessment"
      progress={40}
      prevPage={handleBack}
      nextPage={handleNext}
      showMascot={true}
      buttonPosition="center"
    >
      <AssessmentStep title="Tell us about your experience">
        <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
          {/* Current Role */}
          <div>
            <label className="block text-lg mb-2">What is your current role?</label>
            <input
              type="text"
              value={experienceDetails.currentRole}
              onChange={(e) => handleInputChange('currentRole', e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200"
              placeholder="Enter your current role"
            />
          </div>

          {/* Company Industry */}
          <div>
            <label className="block text-lg mb-2">What industry is your company in?</label>
            <select
              value={experienceDetails.companyIndustry}
              onChange={(e) => handleInputChange('companyIndustry', e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
            >
              <option value="" disabled>Select industry</option>
              {['Technology', 'Finance', 'Healthcare', 'Education', 'E-commerce', 'Manufacturing', 'Other'].map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* Skills Used */}
          <div>
            <label className="block text-lg mb-2">What skills have you used in your current role?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Programming', 'Networking', 'Web Development', 'Game Development', 'AI/Machine Learning', 
                'Data Analysis', 'Cybersecurity', 'Project Management', 'Other'].map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillsChange(skill)}
                  className={`p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${experienceDetails.skillsUsed.includes(skill) 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary/50'}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}
