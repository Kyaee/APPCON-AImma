import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentLayout from "@/components/layout/assessment/AssessmentLayout";
import AssessmentStep from "@/components/layout/assessment/AssessmentStep";
import { assessmentFlow } from "@/lib/assessment-flow";

export default function Complete() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const { complete } = assessmentFlow;

  const handleNext = () => {
    // Navigate to dashboard or wherever you want after completion
    navigate("/dashboard/:id");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AssessmentLayout
      title="Assessment Complete"
      progress={100}
      prevPage={handleBack}
      nextPage={handleNext}
      showMascot={true}
      buttonPosition="center"
      mascotZIndex="-1"
      nextButtonText="Go to Dashboard"
    >
      <AssessmentStep title={complete.title}>
        <div className="space-y-6 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Thank you for completing the assessment! Your personalized
              learning path is being generated.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-medium text-white">
              {complete.questions[0].label}
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border-2 border-white text-white"
              rows={4}
              placeholder="Share your thoughts with us..."
            />
          </div>
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}
