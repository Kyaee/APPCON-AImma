import React, { useState, useEffect, useCallback } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function PreviousExperienceStep({ experience, setExperience }) {
  const questions = assessmentFlow.previousExperience.questions;
  
  // Initialize local state from props
  const [localExperience, setLocalExperience] = useState(() => ({
    lastRole: experience.lastRole || "",
    yearsExperience: experience.yearsExperience || "",
    reasonForChange: experience.reasonForChange || "",
  }));

  // Update local state when props change
  useEffect(() => {
    setLocalExperience({
      lastRole: experience.lastRole || "",
      yearsExperience: experience.yearsExperience || "",
      reasonForChange: experience.reasonForChange || "",
    });
  }, [experience]);

  // Handle state changes and sync
  const handleChange = useCallback((id, value) => {
    setLocalExperience(prev => ({ ...prev, [id]: value }));
  }, []);
  
  const syncToParent = useCallback(() => setExperience(localExperience), [localExperience, setExperience]);

  return (
    <AssessmentStep title={assessmentFlow.previousExperience.title}>
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-[600px] max-w-full px-4 sm:px-6 space-y-4 sm:space-y-6 mt-4 sm:mt-8">
          <div className="form-group">
            <label className="block text-lg mb-2 text-white">
              {questions[0].label}
            </label>
            <input
              type="text"
              value={localExperience.lastRole}
              onChange={(e) => handleChange("lastRole", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black outline-none"
              placeholder="Enter your last role"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label className="block text-lg mb-2 text-white">
              {questions[1].label}
            </label>
            <select
              value={localExperience.yearsExperience}
              onChange={(e) => handleChange("yearsExperience", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black outline-none"
            >
              <option value="">Select years of experience</option>
              {questions[1].options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-lg mb-2 text-white">
              {questions[2].label}
            </label>
            <textarea
              value={localExperience.reasonForChange}
              onChange={(e) => handleChange("reasonForChange", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-48 z-50 outline-none"
              placeholder="Tell us why you're looking for a new opportunity"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      
      {/* Hidden sync button */}
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
