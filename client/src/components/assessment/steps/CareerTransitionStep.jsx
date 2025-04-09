import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function CareerTransitionStep({ transition, setTransition }) {
  return (
    <AssessmentStep title="Career Transition">
      <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
        <div>
          <label className="block text-lg mb-2">
            What field are you transitioning from?
          </label>
          <input
            type="text"
            value={transition.currentField}
            onChange={(e) =>
              setTransition((prev) => ({
                ...prev,
                currentField: e.target.value,
              }))
            }
            className="w-full p-3 rounded-lg border-2 border-gray-200"
            placeholder="Enter your current field"
          />
        </div>

        <div>
          <label className="block text-lg mb-2">
            What tech field interests you most?
          </label>
          <select
            value={transition.desiredField}
            onChange={(e) =>
              setTransition((prev) => ({
                ...prev,
                desiredField: e.target.value,
              }))
            }
            className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
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
          <label className="block text-lg mb-2">
            Why are you interested in transitioning to tech?
          </label>
          <textarea
            value={transition.transitionReason}
            onChange={(e) =>
              setTransition((prev) => ({
                ...prev,
                transitionReason: e.target.value,
              }))
            }
            className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
            placeholder="Share your motivation"
          />
        </div>
      </div>
    </AssessmentStep>
  );
}
