import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";
import capyGreet from "@/assets/general/capy-greet.svg";

export default function CompleteStep({ title, feedback, onFeedbackChange }) {
  return (
    <AssessmentStep title={title}>
      <div className="space-y-8 mt-12 flex flex-col items-center">
        {/* Capy greeting image at the top - increased size */}
        <div className="flex justify-center">
          <img
            src={capyGreet}
            alt="Capybara greeting"
            className="w-60 h-60 md:w-72 md:h-72"
          />
        </div>

        {/* Congratulation text */}
        <div className="text-center">
          <p className="text-lg text-white/90 mb-8 max-w-md mx-auto select-none">
            Your personalized learning roadmap is being generated based on your
            skills and interests. Get ready for an amazing learning journey!
          </p>
        </div>

        {/* Optional feedback textarea */}
        <div className="w-full max-w-md">
          <textarea
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
            placeholder="Any feedback on the assessment process? (Optional)"
            className="w-full h-32 p-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/60"
          />
        </div>

        {/* Button is added by FormWrapper */}
      </div>
    </AssessmentStep>
  );
}
