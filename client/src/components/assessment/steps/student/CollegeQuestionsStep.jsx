import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function CollegeQuestionsStep({ formData, setFormData }) {
  // Access questions and title from assessment-flow.js
  const { questions, title } = assessmentFlow.collegeQuestions;

  // Create local state for form inputs based on questions from assessment flow
  const [localFormData, setLocalFormData] = useState({
    yearLevel: formData.yearLevel || "",
    currentCourse: formData.currentCourse || "",
    internshipStatus: formData.internshipStatus ?? null,
    targetIndustry: formData.targetIndustry || "",
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalFormData({
      yearLevel: formData.yearLevel || "",
      currentCourse: formData.currentCourse || "",
      internshipStatus: formData.internshipStatus ?? null,
      targetIndustry: formData.targetIndustry || "",
    });
  }, [formData]);

  // Only update parent state when form submission is triggered
  const syncToParent = () => {
    setFormData(localFormData);
  };

  // Log form data for debugging
  useEffect(() => {
    console.log("CollegeQuestions local form data:", localFormData);
  }, [localFormData]);

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AssessmentStep title="Tell us about your academic journey">
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
        {questions.map((question) => (
          <div key={question.id} className="mb-6">
            <label className="block text-lg mb-2 text-white">
              {question.label}
            </label>
            
            {question.type === 'select' && (
              <select
                value={localFormData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-black text-black bg-white"
              >
                <option value="" disabled>
                  Select {question.id.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </option>
                {question.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            
            {question.type === 'text' && (
              <input
                type="text"
                value={localFormData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-black text-black bg-white"
                placeholder={`Enter your ${question.id.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
            )}
            
            {question.type === 'boolean' && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleInputChange(question.id, option.value)}
                    className={`p-3 rounded-lg transition-all duration-200 bg-white border-2
                      ${
                        localFormData[question.id] === option.value
                          ? "border-[#3F6CFF] custom-shadow-75"
                          : "border-black hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-black">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
            
            {question.type === 'multiselect' && (
              <select
                value={localFormData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-black text-black bg-white"
              >
                <option value="" disabled>
                  Select {question.id.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </option>
                {question.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
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
