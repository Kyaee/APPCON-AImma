import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function MidQuestionsStep({ formData, setFormData }) {
  const handleInputChange = (field, value) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };
    setFormData(newFormData);
  };

  const handleSkillsChange = (skill) => {
    const newSkills = formData.skillsUsed.includes(skill)
      ? formData.skillsUsed.filter((s) => s !== skill)
      : [...formData.skillsUsed, skill];

    const newFormData = {
      ...formData,
      skillsUsed: newSkills,
    };
    setFormData(newFormData);
  };

  return (
    <AssessmentStep title="Tell us about your experience">
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
        {/* Current Role */}
        <div>
          <label className="block text-lg mb-2 text-white">
            What is your current role?
          </label>
          <input
            type="text"
            value={formData.currentRole}
            onChange={(e) => handleInputChange("currentRole", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
            placeholder="Enter your current role"
          />
        </div>

        {/* Company Industry */}
        <div>
          <label className="block text-lg mb-2 text-white">
            What industry is your company in?
          </label>
          <select
            value={formData.companyIndustry}
            onChange={(e) =>
              handleInputChange("companyIndustry", e.target.value)
            }
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
          >
            <option value="" disabled>
              Select industry
            </option>
            {[
              "Technology",
              "Finance",
              "Healthcare",
              "Education",
              "E-commerce",
              "Manufacturing",
              "Other",
            ].map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Skills Used */}
        <div>
          <label className="block text-lg mb-2 text-white">
            What skills have you used in your current role?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Programming",
              "Networking",
              "Web Development",
              "Game Development",
              "AI/Machine Learning",
              "Data Analysis",
              "Cybersecurity",
              "Project Management",
              "Other",
            ].map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillsChange(skill)}
                className={`p-3 rounded-lg text-left transition-all duration-200 bg-white
                  ${
                    formData.skillsUsed.includes(skill)
                      ? "border-light-brown border-3 custom-shadow-75  bg-white card-bg-opacity"
                      : "border-black border-2 hover:border-black hover:border-3"
                  }`}
              >
                <span className="text-black">{skill}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AssessmentStep>
  );
}
