import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function HSQuestionsStep({ formData, setFormData }) {
  // Access the questions from assessment-flow.js
  const { questions, title } = assessmentFlow.hsQuestions;

  // Create local state for form inputs
  const [localFormData, setLocalFormData] = useState({
    strand: formData.strand || "",
    planningCollege: formData.planningCollege ?? null,
    interestAreas: formData.interestAreas || [],
    careerGoals: formData.careerGoals || "",
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalFormData({
      strand: formData.strand || "",
      planningCollege: formData.planningCollege ?? null,
      interestAreas: formData.interestAreas || [],
      careerGoals: formData.careerGoals || "",
    });
  }, []);

  // Only update parent state when form submission is triggered
  const syncToParent = () => {
    setFormData(localFormData);
  };

  const handleInputChange = (field, value, e) => {
    // Prevent the default form submission
    if (e) e.preventDefault();

    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterestChange = (area, e) => {
    // Prevent the default form submission
    if (e) e.preventDefault();

    setLocalFormData((prev) => ({
      ...prev,
      interestAreas: prev.interestAreas.includes(area)
        ? prev.interestAreas.filter((a) => a !== area)
        : [...prev.interestAreas, area],
    }));
  };

  // Find the questions by their id
  const strandQuestion = questions.find(q => q.id === 'strand');
  const planningCollegeQuestion = questions.find(q => q.id === 'planningCollege');
  const interestAreasQuestion = questions.find(q => q.id === 'interestAreas');
  const careerGoalsQuestion = questions.find(q => q.id === 'careerGoals');

  return (
    <AssessmentStep title="Tell us about your academic path">
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
        {/* Strand Selection */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {strandQuestion.label}
          </label>
          <select
            value={localFormData.strand}
            onChange={(e) => handleInputChange("strand", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black text-black bg-white"
          >
            <option value="" disabled>
              Select strand
            </option>
            {strandQuestion.options.map((strand) => (
              <option key={strand} value={strand}>
                {strand}
              </option>
            ))}
          </select>
        </div>

        {/* College Plans */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {planningCollegeQuestion.label}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={(e) =>
                  handleInputChange("planningCollege", option.value, e)
                }
                className={`p-3 rounded-lg text-center transition-all duration-200 bg-white border-2 box-border
                  ${
                    localFormData.planningCollege === option.value
                      ? "border-[#3F6CFF] custom-shadow-75"
                      : "border-black hover:bg-gray-50"
                  }`}
              >
                <span className="text-black">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interest Areas */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {interestAreasQuestion.label}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {interestAreasQuestion.options.map((area) => (
              <button
                key={area}
                type="button"
                onClick={(e) => handleInterestChange(area, e)}
                className={`p-3 rounded-lg text-left transition-all duration-200 bg-white border-2 box-border
                  ${
                    localFormData.interestAreas.includes(area)
                      ? "border-[#3F6CFF] custom-shadow-75"
                      : "border-black hover:bg-gray-50"
                  }`}
              >
                <span className="text-black">{area}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Career Goals */}
        <div>
          <label className="block text-lg mb-2 text-white">
            {careerGoalsQuestion.label}
          </label>
          <textarea
            value={localFormData.careerGoals}
            onChange={(e) => handleInputChange("careerGoals", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32"
            placeholder="Share your career aspirations"
          />
        </div>
      </div>

      {/* Hidden button to sync state on form submission */}
      <button
        type="button"
        style={{ display: "none" }}
        onClick={syncToParent}
        ref={(el) => {
          if (el) {
            el.addEventListener("syncToParent", syncToParent);
          }
        }}
      />
    </AssessmentStep>
  );
}
