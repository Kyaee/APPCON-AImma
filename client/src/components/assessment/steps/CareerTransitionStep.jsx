import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function CareerTransitionStep({ transition, setTransition }) {
  // Get questions from assessment flow
  const questions = assessmentFlow.transitionType.questions;
  
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
    <AssessmentStep title={assessmentFlow.transitionType.title}>
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-[600px] max-w-full px-4 sm:px-6 space-y-4 sm:space-y-6 mt-4 sm:mt-8">
          <div className="form-group">
            <label className="block text-lg mb-2 text-white">
              {questions[0].label}
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

          <div className="form-group">
            <label className="block text-lg mb-2 text-white">
              {questions[1].label}
            </label>
            <select
              value={localTransition.desiredField}
              onChange={(e) => handleChange("desiredField", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black outline-none"
            >
              <option value="">Select desired field</option>
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
              value={localTransition.transitionReason}
              onChange={(e) => handleChange("transitionReason", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-48 z-50 outline-none"
              placeholder="Tell us why you want to transition to tech"
              autoComplete="off"
            />
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
