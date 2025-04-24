import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function EntryQuestionsStep({ formData, setFormData }) {
  // Get questions from assessment flow
  const entryQuestions = assessmentFlow.entryQuestions.questions;
  
  // Create local state for form inputs
  const [localFormData, setLocalFormData] = useState({
    currentRole: formData.currentRole || "",
    companyIndustry: formData.companyIndustry || "",
    skillsUsed: formData.skillsUsed || [],
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalFormData({
      currentRole: formData.currentRole || "",
      companyIndustry: formData.companyIndustry || "",
      skillsUsed: formData.skillsUsed || [],
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

  return (
    <AssessmentStep title={assessmentFlow.entryQuestions.title}>
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
        {/* Current Role */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {entryQuestions.find(q => q.id === 'currentRole').label}
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
            {entryQuestions.find(q => q.id === 'companyIndustry').label}
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
            {entryQuestions.find(q => q.id === 'companyIndustry').options.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Skills Used */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {entryQuestions.find(q => q.id === 'skillsUsed').label}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {entryQuestions.find(q => q.id === 'skillsUsed').options.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={(e) => handleSkillsChange(skill, e)}
                className={`p-3 rounded-lg text-left transition-all duration-200 bg-white border-2 box-border
                  ${
                    localFormData.skillsUsed.includes(skill)
                      ? "border-[#3F6CFF] custom-shadow-75"
                      : "border-black hover:bg-gray-50"
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
