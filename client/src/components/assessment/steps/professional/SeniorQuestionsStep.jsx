import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function SeniorQuestionsStep({ formData, setFormData }) {
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

  const handleSkillsChange = (skill) => {
    setLocalFormData((prev) => ({
      ...prev,
      skillsUsed: prev.skillsUsed.includes(skill)
        ? prev.skillsUsed.filter((s) => s !== skill)
        : [...prev.skillsUsed, skill],
    }));
  };

  return (
    <AssessmentStep title="Tell us about your experience">
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
        {/* Current Role */}
        <div>
          <label className="block text-lg mb-2">
            What is your current role?
          </label>
          <input
            type="text"
            value={localFormData.currentRole}
            onChange={(e) => handleInputChange("currentRole", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-200"
            placeholder="Enter your current role"
          />
        </div>

        {/* Company Industry */}
        <div>
          <label className="block text-lg mb-2">
            What industry is your company in?
          </label>
          <select
            value={localFormData.companyIndustry}
            onChange={(e) =>
              handleInputChange("companyIndustry", e.target.value)
            }
            className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
          >
            <option value="" disabled>
              Select industry
            </option>
            {[
              "Technology",
              "Finance",
              "Healthcare",
              "Education",
              "E-commerce",
              "Manufacturing",
              "Other",
            ].map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Skills Used */}
        <div>
          <label className="block text-lg mb-2">
            What skills have you used in your current role?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Programming",
              "Networking",
              "Web Development",
              "Game Development",
              "AI/Machine Learning",
              "Data Analysis",
              "Cybersecurity",
              "Project Management",
              "Other",
            ].map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillsChange(skill)}
                className={`p-3 rounded-lg border-2 text-left transition-all duration-200
                  ${
                    localFormData.skillsUsed.includes(skill)
                      ? "border-light-brown border-3 custom-shadow-75  bg-white card-bg-opacity"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
              >
                {skill}
              </button>
            ))}
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
