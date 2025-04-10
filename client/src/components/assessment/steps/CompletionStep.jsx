import React from "react";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function CompletionStep({ title, feedback, onFeedbackChange }) {
  return (
    <AssessmentStep title={title}>
      <div className="space-y-6 mt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            🎉 Congratulations! 🎉
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Thank you for completing the assessment! Your personalized learning
            path is being generated.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-medium text-white">
            Any additional feedback? (optional)
          </label>
          <textarea
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border-2 border-white text-white"
            rows={4}
            placeholder="Share your thoughts with us..."
          />
        </div>
      </div>
    </AssessmentStep>
  );
}
