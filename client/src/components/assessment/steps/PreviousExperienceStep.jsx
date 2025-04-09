import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function PreviousExperienceStep({ experience, setExperience }) {
  return (
    <AssessmentStep title="Previous Experience">
      <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
        <div>
          <label className="block text-lg mb-2">What was your last role?</label>
          <input
            type="text"
            value={experience.lastRole}
            onChange={(e) =>
              setExperience((prev) => ({
                ...prev,
                lastRole: e.target.value,
              }))
            }
            className="w-full p-3 rounded-lg border-2 border-gray-200"
          />
        </div>

        <div>
          <label className="block text-lg mb-2">Years of experience</label>
          <select
            value={experience.yearsExperience}
            onChange={(e) =>
              setExperience((prev) => ({
                ...prev,
                yearsExperience: e.target.value,
              }))
            }
            className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
          >
            <option value="" disabled>
              Select years of experience
            </option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-lg mb-2">
            Reason for seeking new opportunity
          </label>
          <textarea
            value={experience.reasonForChange}
            onChange={(e) =>
              setExperience((prev) => ({
                ...prev,
                reasonForChange: e.target.value,
              }))
            }
            className="w-full p-3 rounded-lg border-2 border-gray-200 h-32 z-50"
          />
        </div>
      </div>
    </AssessmentStep>
  );
}
