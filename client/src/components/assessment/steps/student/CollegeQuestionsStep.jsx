import React, { useState, useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function CollegeQuestionsStep({ formData, setFormData }) {
  // Create local state for form inputs
  const [localFormData, setLocalFormData] = useState({
    course: formData.course || "",
    yearLevel: formData.yearLevel || "",
    technicalSkills: formData.technicalSkills || [],
    careerPath: formData.careerPath || "",
  });

  // Update local state from props when component mounts
  useEffect(() => {
    setLocalFormData({
      course: formData.course || "",
      yearLevel: formData.yearLevel || "",
      technicalSkills: formData.technicalSkills || [],
      careerPath: formData.careerPath || "",
    });
  }, []);

  // Only update parent state when form submission is triggered
  const syncToParent = () => {
    setFormData(localFormData);
  };

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillChange = (skill) => {
    setLocalFormData((prev) => ({
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
          <label className="block text-lg mb-2 text-white">
            What's your course?
          </label>
          <select
            value={localFormData.course}
            onChange={(e) => handleInputChange("course", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black text-black bg-white"
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
          <label className="block text-lg mb-2 text-white">Year Level</label>
          <select
            value={localFormData.yearLevel}
            onChange={(e) => handleInputChange("yearLevel", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black text-black bg-white"
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
          <label className="block text-lg mb-2 text-white">
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
                className={`p-3 rounded-lg transition-all duration-200 bg-white
                  ${
                    localFormData.technicalSkills.includes(skill)
                      ? "border-[#3F6CFF] border-3 custom-shadow-75"
                      : "border-black border-2 hover:border-black hover:border-3"
                  }`}
              >
                <span className="text-black">{skill}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Career Path */}
        <div>
          <label className="block text-lg mb-2 text-white">
            What's your intended career path?
          </label>
          <textarea
            value={localFormData.careerPath}
            onChange={(e) => handleInputChange("careerPath", e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32"
            placeholder="Describe your career goals"
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
