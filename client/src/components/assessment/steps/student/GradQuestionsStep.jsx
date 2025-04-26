import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function GradQuestionsStep({ formData, setFormData }) {
  // Access questions from assessment-flow.js
  const { questions, title } = assessmentFlow.gradQuestions;

  // Create local state for form inputs
  const [localFormData, setLocalFormData] = useState({
    fieldStudy: formData.fieldStudy || "",
    researchFocus: formData.researchFocus || "",
    industryExperience: formData.industryExperience ?? null,
    careerPlans: formData.careerPlans || "",
    technicalExpertise: formData.technicalExpertise || 3,
    researchInterests: formData.researchInterests || [],
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalFormData({
      fieldStudy: formData.fieldStudy || "",
      researchFocus: formData.researchFocus || "",
      industryExperience: formData.industryExperience ?? null,
      careerPlans: formData.careerPlans || "",
      technicalExpertise: formData.technicalExpertise || 3,
      researchInterests: formData.researchInterests || [],
    });
  }, []);

  // Only update parent state when form submission is triggered
  const syncToParent = () => {
    setFormData(localFormData);
  };

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterestChange = (interest) => {
    setLocalFormData((prev) => ({
      ...prev,
      researchInterests: prev.researchInterests.includes(interest)
        ? prev.researchInterests.filter((i) => i !== interest)
        : [...prev.researchInterests, interest],
    }));
  };

  // Find questions by their id
  const fieldStudyQuestion = questions.find(q => q.id === 'fieldStudy');
  const researchFocusQuestion = questions.find(q => q.id === 'researchFocus');
  const industryExperienceQuestion = questions.find(q => q.id === 'industryExperience');
  const careerPlansQuestion = questions.find(q => q.id === 'careerPlans');
  const technicalExpertiseQuestion = questions.find(q => q.id === 'technicalExpertise');
  const researchInterestsQuestion = questions.find(q => q.id === 'researchInterests');

  return (
    <AssessmentStep title="Tell us about your graduate studies">
      <div
        className="w-full max-w-3xl mx-auto h-[calc(100vh-300px)] overflow-y-auto px-4 sm:px-6 hide-scrollbar
      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        <div className="space-y-6 mt-8 pb-8">
          {/* Field of Study */}
          <div>
            <label className="block text-lg mb-2 text-white">
              {fieldStudyQuestion.label}
            </label>
            <input
              type="text"
              value={localFormData.fieldStudy}
              onChange={(e) => handleInputChange("fieldStudy", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
              placeholder="Enter your field of study"
            />
          </div>

          {/* Research Focus */}
          <div>
            <label className="block text-lg mb-2 text-white">
              {researchFocusQuestion.label}
            </label>
            <input
              type="text"
              value={localFormData.researchFocus}
              onChange={(e) =>
                handleInputChange("researchFocus", e.target.value)
              }
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
              placeholder="Enter your research focus"
            />
          </div>

          {/* Industry Experience */}
          <div>
            <label className="block text-lg mb-2 text-white">
              {industryExperienceQuestion.label}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() =>
                    handleInputChange("industryExperience", option.value)
                  }
                  className={`p-3 rounded-lg transition-all duration-200 bg-white
                    ${
                      localFormData.industryExperience === option.value
                        ? "border-[#3F6CFF] border-3 custom-shadow-75"
                        : "border-black border-2 hover:border-black hover:border-3"
                    }`}
                >
                  <span className="text-black">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Career Plans */}
          <div>
            <label className="block text-lg mb-2 text-white">
              {careerPlansQuestion.label}
            </label>
            <textarea
              value={localFormData.careerPlans}
              onChange={(e) => handleInputChange("careerPlans", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32"
              placeholder="Describe your career plans"
            />
          </div>

          {/* Technical Expertise */}
          <div>
            <label className="block text-lg mb-2 text-white">
              {technicalExpertiseQuestion.label}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={technicalExpertiseQuestion.min}
                max={technicalExpertiseQuestion.max}
                value={localFormData.technicalExpertise}
                onChange={(e) =>
                  handleInputChange("technicalExpertise", e.target.value)
                }
                className="w-full"
              />
              <span className="text-lg text-white">
                {localFormData.technicalExpertise}
              </span>
            </div>
          </div>

          {/* Research Interests */}
          <div>
            <label className="block text-lg mb-2 text-white">
              {researchInterestsQuestion.label}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {researchInterestsQuestion.options.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestChange(interest)}
                  className={`p-3 rounded-lg transition-all duration-200 bg-white
                    ${
                      localFormData.researchInterests.includes(interest)
                        ? "border-[#3F6CFF] border-3 custom-shadow-75"
                        : "border-black border-2 hover:border-black hover:border-3"
                    }`}
                >
                  <span className="text-black">{interest}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden button to sync state on form submission */}
      <button 
        type="button" 
        style={{ display: 'none' }} 
        onClick={syncToParent}
        ref={el => {
          if (el) {
            el.addEventListener('syncToParent', syncToParent);
          }
        }}
      />
    </AssessmentStep>
  );
}
