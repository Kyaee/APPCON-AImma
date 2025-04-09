import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function CollegeQuestionsStep({ formData, setFormData }) {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.includes(skill)
        ? prev.technicalSkills.filter((s) => s !== skill)
        : [...prev.technicalSkills, skill],
    }));
  };

  return (
    <AssessmentStep title="Tell us about your academic journey">
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-8 px-4 sm:px-6">
        {/* Course Selection */}
        <div>
          <label className="block text-lg mb-2">What's your course?</label>
          <select
            value={formData.course}
            onChange={(e) => handleInputChange("course", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
          >
            <option value="" disabled>
              Select course
            </option>
            {[
              "Computer Science",
              "Information Technology",
              "Software Engineering",
              "Other",
            ].map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Year Level */}
        <div>
          <label className="block text-lg mb-2">Year Level</label>
          <select
            value={formData.yearLevel}
            onChange={(e) => handleInputChange("yearLevel", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
          >
            <option value="" disabled>
              Select year level
            </option>
            {["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"].map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        {/* Technical Skills */}
        <div>
          <label className="block text-lg mb-2">
            What technical skills do you have?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Programming",
              "Web Development",
              "Database",
              "Networking",
              "Cloud Computing",
              "Mobile Development",
            ].map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillChange(skill)}
                className={`p-3 rounded-lg border-2 text-left transition-all duration-200
                  ${
                    formData.technicalSkills.includes(skill)
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Career Path */}
        <div>
          <label className="block text-lg mb-2">
            What's your intended career path?
          </label>
          <textarea
            value={formData.careerPath}
            onChange={(e) => handleInputChange("careerPath", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-200 h-32"
            placeholder="Describe your career goals"
          />
        </div>
      </div>
    </AssessmentStep>
  );
}
