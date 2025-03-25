import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';

export default function CollegeQuestions() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course: '',
    yearLevel: '',
    technicalSkills: [],
    careerPath: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.includes(skill)
        ? prev.technicalSkills.filter(s => s !== skill)
        : [...prev.technicalSkills, skill]
    }));
  };

  const handleBack = () => {
    const studentType = { id: 'student', label: 'Student', icon: '👨‍🎓' };
    const collegeLevel = { id: 'college', label: 'College Student', icon: '🎓' };
    
    // Save selections to localStorage
    localStorage.setItem('selectedType', JSON.stringify(studentType));
    localStorage.setItem('selectedLevel', JSON.stringify(collegeLevel));
    
    navigate('/assessment', { 
      state: { 
        returnToStep: 3,
        selectedType: studentType,
        selectedLevel: collegeLevel
      }
    });
  };

  const handleNext = () => {
    if (formData.course && formData.yearLevel && 
        formData.technicalSkills.length > 0 && formData.careerPath) {
      localStorage.setItem('collegeResponses', JSON.stringify(formData));
      localStorage.setItem('currentAssessmentStep', '3');
      localStorage.setItem('collegeQuestionsSavepoint', 'true');
      navigate('/assessment/daily-goal');
    }
  };

  return (
    <AssessmentLayout
      title="College Assessment"
      progress={40}
      prevPage={handleBack}
      nextPage={handleNext}
      showMascot={true}
      buttonPosition="center"
    >
      <AssessmentStep title="Tell us about your academic journey">
        <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
          {/* Course Selection */}
          <div>
            <label className="block text-lg mb-2">What's your course?</label>
            <select
              value={formData.course}
              onChange={(e) => handleInputChange('course', e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
            >
              <option value="" disabled>Select course</option>
              {['Computer Science', 'Information Technology', 'Software Engineering', 'Other'].map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          {/* Year Level */}
          <div>
            <label className="block text-lg mb-2">Year Level</label>
            <select
              value={formData.yearLevel}
              onChange={(e) => handleInputChange('yearLevel', e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
            >
              <option value="" disabled>Select year level</option>
              {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Technical Skills */}
          <div>
            <label className="block text-lg mb-2">What technical skills do you have?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Programming', 'Web Development', 'Database', 'Networking', 'Cloud Computing', 'Mobile Development'].map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillChange(skill)}
                  className={`p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${formData.technicalSkills.includes(skill) 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary/50'}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Career Path */}
          <div>
            <label className="block text-lg mb-2">What's your intended career path?</label>
            <textarea
              value={formData.careerPath}
              onChange={(e) => handleInputChange('careerPath', e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
              placeholder="Describe your career goals"
            />
          </div>
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}
