import React, { useEffect } from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function LanguageStep({ language, onLanguageChange, onNext }) {
  // Ensure English is selected by default if no language is set
  useEffect(() => {
    if (!language) {
      onLanguageChange("English");
    }
  }, []);

  return (
    <AssessmentStep title="Choose a language" className="text-xl">
      <p className="text-white text-center mb-4 sm:mb-10">
        For your convenience
      </p>
      <div className="w-full max-w-md mx-auto px-4 sm:px-0">
        <select
          value={language || "English"}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full p-2 sm:p-3 rounded-2xl text-gray-800 text-center text-sm sm:text-base border-2 border-black bg-white mb-4 sm:mb-6"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Japanese">Japanese</option>
          <option value="Chinese">Chinese</option>
        </select>
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="px-25 py-2 bg-amber-500 border-2 drop-shadow-xl border-black text-black rounded-2xl hover:bg-amber-900 
            transition-colors w-full sm:w-32 text-sm sm:text-base flex items-center justify-center"
          >
            Next
          </button>
        </div>
      </div>
    </AssessmentStep>
  );
}
