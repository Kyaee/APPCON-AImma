import React, { useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function PreviousExperienceStep({ experience, setExperience }) {
  // For this component, ensure all onChange handlers don't make localStorage calls
  // Example of how the handlers should look:
  const handleChange = (field, value) => {
    setExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
    // No localStorage writes here
  };

  // For debugging - let's log what's happening
  // useEffect(() => {
  //   console.log("PreviousExperienceStep rendered with:", experience);
  // }, [experience]);

  return (
    <AssessmentStep title="Previous Experience">
      <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
        <div>
          <label className="block text-lg mb-2 text-white">
            What was your last role?
          </label>
          <input
            type="text"
            value={experience.lastRole || ""}
            onChange={(e) => handleChange("lastRole", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
            placeholder="Enter your last role"
          />
        </div>

        <div>
          <label className="block text-lg mb-2 text-white">
            Years of experience
          </label>
          <select
            value={experience.yearsExperience || ""}
            onChange={(e) => handleChange("yearsExperience", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
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
            value={experience.reasonForChange || ""}
            onChange={(e) => handleChange("reasonForChange", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32 z-50"
            placeholder="Tell us why you're looking for a new opportunity"
          />
        </div>
      </div>
    </AssessmentStep>
  );
}
