import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function PreviousExperienceStep({ experience, setExperience }) {
  // Create local state to handle form inputs
  const [localExperience, setLocalExperience] = useState({
    lastRole: experience.lastRole || "",
    yearsExperience: experience.yearsExperience || "",
    reasonForChange: experience.reasonForChange || "",
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalExperience({
      lastRole: experience.lastRole || "",
      yearsExperience: experience.yearsExperience || "",
      reasonForChange: experience.reasonForChange || "",
    });
  }, []);

  // Only update parent state when form submission is triggered
  // Removed onBlur to prevent unwanted state updates while typing
  const syncToParent = () => {
    setExperience(localExperience);
  };

  // Handle local changes without updating parent state
  const handleChange = (field, value) => {
    setLocalExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AssessmentStep title="Previous Experience">
      <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
        <div>
          <label className="block text-lg mb-2 text-white">
            What was your last role?
          </label>
          <input
            type="text"
            value={localExperience.lastRole}
            onChange={(e) => handleChange("lastRole", e.target.value)}
            // Remove onBlur handler that was causing issues
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black outline-none"
            placeholder="Enter your last role"
            autoComplete="off" // Prevent browser autocomplete from interfering
          />
        </div>

        <div>
          <label className="block text-lg mb-2 text-white">
            Years of experience
          </label>
          <select
            value={localExperience.yearsExperience}
            onChange={(e) => handleChange("yearsExperience", e.target.value)}
            // Remove onBlur handler
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black outline-none"
          >
            <option value="">Select years of experience</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-lg mb-2 text-white">
            Reason for seeking new opportunity
          </label>
          <textarea
            value={localExperience.reasonForChange}
            onChange={(e) => handleChange("reasonForChange", e.target.value)}
            // Remove onBlur handler
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32 z-50 outline-none"
            placeholder="Tell us why you're looking for a new opportunity"
            autoComplete="off"
          />
        </div>
      </div>
      {/* Hidden button to sync state on form submission - will be triggered by the parent's submit button */}
      <button 
        type="button" 
        style={{ display: 'none' }} 
        onClick={syncToParent}
        ref={el => {
          if (el) {
            // Create a custom event listener for syncToParent
            el.addEventListener('syncToParent', syncToParent);
          }
        }}
      />
    </AssessmentStep>
  );
}
