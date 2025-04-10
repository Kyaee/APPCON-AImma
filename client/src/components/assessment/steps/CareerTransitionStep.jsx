import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function CareerTransitionStep({ transition, setTransition }) {
  // Ensure all onChange handlers don't make localStorage calls
  // Example of how the change handlers should look:
  const handleChange = (field, value) => {
    setTransition((prev) => ({
      ...prev,
      [field]: value,
    }));
    // No localStorage writes here
  };

  return (
    <AssessmentStep title="Career Transition">
      <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
        <div>
          <label className="block text-lg mb-2 text-white">
            What field are you transitioning from?
          </label>
          <input
            type="text"
            value={transition.currentField}
            onChange={(e) => handleChange("currentField", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
            placeholder="Enter your current field"
          />
        </div>

        <div>
          <label className="block text-lg mb-2 text-white">
            What tech field interests you most?
          </label>
          <select
            value={transition.desiredField}
            onChange={(e) => handleChange("desiredField", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
          >
            <option value="" disabled>
              Select desired field
            </option>
            <option value="Software Development">Software Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Web Development">Web Development</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-lg mb-2 text-white">
            Why are you interested in transitioning to tech?
          </label>
          <textarea
            value={transition.transitionReason}
            onChange={(e) => handleChange("transitionReason", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32"
            placeholder="Share your motivation"
          />
        </div>
      </div>
    </AssessmentStep>
  );
}
