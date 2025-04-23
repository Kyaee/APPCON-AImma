import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function CareerTransitionStep({ transition, setTransition }) {
  // Create local state for form inputs
  const [localTransition, setLocalTransition] = useState({
    currentField: transition.currentField || "",
    desiredField: transition.desiredField || "",
    transitionReason: transition.transitionReason || "",
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalTransition({
      currentField: transition.currentField || "",
      desiredField: transition.desiredField || "",
      transitionReason: transition.transitionReason || "",
    });
  }, []);

  // Only update parent state when form submission is triggered
  const syncToParent = () => {
    setTransition(localTransition);
  };

  // Handle local changes without updating parent state
  const handleChange = (field, value) => {
    setLocalTransition((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AssessmentStep title="Career Transition">
      <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-8 px-4 sm:px-6">
        <div>
          <label className="block text-lg mb-2 text-white">
            What field are you transitioning from?
          </label>
          <input
            type="text"
            value={localTransition.currentField}
            onChange={(e) => handleChange("currentField", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black outline-none"
            placeholder="Enter your current field"
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-lg mb-2 text-white">
            What tech field interests you most?
          </label>
          <select
            value={localTransition.desiredField}
            onChange={(e) => handleChange("desiredField", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black outline-none"
          >
            <option value="">Select desired field</option>
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
            value={localTransition.transitionReason}
            onChange={(e) => handleChange("transitionReason", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32 z-50 outline-none"
            placeholder="Tell us why you want to transition to tech"
            autoComplete="off"
          />
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
