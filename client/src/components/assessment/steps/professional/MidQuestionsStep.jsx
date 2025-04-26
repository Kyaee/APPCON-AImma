import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function MidQuestionsStep({ formData, setFormData }) {
  // Get questions and options from assessment-flow.js
  const { questions } = assessmentFlow.midQuestions;
  
  // Create local state for form inputs
  const [localFormData, setLocalFormData] = useState({
    currentRole: formData.currentRole,
    companyIndustry: formData.companyIndustry,
    skillsUsed: formData.skillsUsed,
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalFormData({
      currentRole: formData.currentRole ,
      companyIndustry: formData.companyIndustry ,
      skillsUsed: formData.skillsUsed,
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

  const handleSkillsChange = (skill, e) => {
    // Prevent the default form submission
    if (e) e.preventDefault();
    
    setLocalFormData((prev) => ({
      ...prev,
      skillsUsed: prev.skillsUsed.includes(skill)
        ? prev.skillsUsed.filter((s) => s !== skill)
        : [...prev.skillsUsed, skill],
    }));
  };

  // Find specific questions by ID
  const currentRoleQuestion = questions.find(q => q.id === 'currentRole');
  const companyIndustryQuestion = questions.find(q => q.id === 'companyIndustry');
  const skillsUsedQuestion = questions.find(q => q.id === 'skillsUsed');

  return (
    <AssessmentStep title={assessmentFlow.midQuestions.title}>
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
        {/* Current Role */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {currentRoleQuestion?.label}
          </label>
          <input
            type="text"
            value={localFormData.currentRole}
            onChange={(e) => handleInputChange("currentRole", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
            placeholder="Enter your current role"
          />
        </div>

        {/* Company Industry */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {companyIndustryQuestion?.label}
          </label>
          <select
            value={localFormData.companyIndustry}
            onChange={(e) =>
              handleInputChange("companyIndustry", e.target.value)
            }
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
          >
            <option value="" disabled>
              Select industry
            </option>
            {companyIndustryQuestion?.options.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Skills Used */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {skillsUsedQuestion?.label}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skillsUsedQuestion?.options.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={(e) => handleSkillsChange(skill, e)}
                className={`p-3 rounded-lg text-left transition-all duration-200 bg-white
                  ${
                    localFormData.skillsUsed.includes(skill)
                      ? "border-[#3F6CFF] border-3 custom-shadow-75"
                      : "border-black border-2 hover:border-black hover:border-3"
                  }`}
              >
                <span className="text-black">{skill}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden button to sync state on form submission */}
      <button
        type="button"
        style={{ display: "none" }}
        onClick={syncToParent}
        ref={(el) => {
          if (el) {
            el.addEventListener("syncToParent", syncToParent);
          }
        }}
      />
    </AssessmentStep>
  );
}
