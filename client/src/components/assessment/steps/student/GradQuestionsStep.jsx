import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function GradQuestionsStep({ formData, setFormData }) {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      researchInterests: prev.researchInterests.includes(interest)
        ? prev.researchInterests.filter((i) => i !== interest)
        : [...prev.researchInterests, interest],
    }));
  };

  return (
    <AssessmentStep title="Tell us about your graduate studies">
      <div
        className="w-full max-w-3xl mx-auto h-[calc(100vh-300px)] overflow-y-auto px-4 sm:px-6 hide-scrollbar
      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        <div className="space-y-6 mt-8 pb-8">
          {/* Field of Study */}
          <div>
            <label className="block text-lg mb-2">
              What is your field of study?
            </label>
            <input
              type="text"
              value={formData.fieldStudy}
              onChange={(e) => handleInputChange("fieldStudy", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200"
              placeholder="Enter your field of study"
            />
          </div>

          {/* Research Focus */}
          <div>
            <label className="block text-lg mb-2">
              What is your research focus?
            </label>
            <input
              type="text"
              value={formData.researchFocus}
              onChange={(e) =>
                handleInputChange("researchFocus", e.target.value)
              }
              className="w-full p-3 rounded-lg border-2 border-gray-200"
              placeholder="Enter your research focus"
            />
          </div>

          {/* Industry Experience */}
          <div>
            <label className="block text-lg mb-2">
              Do you have industry experience?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() =>
                    handleInputChange("industryExperience", option.value)
                  }
                  className={`p-3 rounded-lg border-2 text-center transition-all duration-200
                    ${
                      formData.industryExperience === option.value
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Career Plans */}
          <div>
            <label className="block text-lg mb-2">
              What are your career plans after graduation?
            </label>
            <textarea
              value={formData.careerPlans}
              onChange={(e) => handleInputChange("careerPlans", e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
              placeholder="Describe your career plans"
            />
          </div>

          {/* Technical Expertise */}
          <div>
            <label className="block text-lg mb-2">
              Rate your technical expertise level
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.technicalExpertise}
                onChange={(e) =>
                  handleInputChange("technicalExpertise", e.target.value)
                }
                className="w-full"
              />
              <span className="text-lg">{formData.technicalExpertise}</span>
            </div>
          </div>

          {/* Research Interests */}
          <div>
            <label className="block text-lg mb-2">
              What are your research interests?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "AI/ML",
                "Data Science",
                "Computer Vision",
                "Cybersecurity",
                "Robotics",
                "Human-Computer Interaction",
                "Other",
              ].map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestChange(interest)}
                  className={`p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${
                      formData.researchInterests.includes(interest)
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AssessmentStep>
  );
}
