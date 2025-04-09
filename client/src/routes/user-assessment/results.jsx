import React from "react";
import { Link } from "react-router-dom";
import AssessmentLayout from "@/components/assessment/AssessmentLayout";
import AssessmentStep from "@/components/assessment/AssessmentStep";

export default function AssessmentResults() {
  return (
    <AssessmentLayout>
      <AssessmentStep
        title="Assessment Complete!"
        description="Here are your personalized learning recommendations"
      >
        <div className="bg-white/10 p-6 rounded-md text-white mb-6">
          <h2 className="text-xl font-bold mb-4">
            Your Personalized Learning Path
          </h2>
          <p className="mb-4">
            Based on your assessment, we've created a customized learning path
            to help you achieve your goals.
          </p>
          <ul className="list-disc pl-5 mb-6">
            <li className="mb-2">React Fundamentals</li>
            <li className="mb-2">JavaScript Advanced Concepts</li>
            <li className="mb-2">API Integration</li>
            <li className="mb-2">State Management with Redux</li>
          </ul>
        </div>
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
          >
            Go to Dashboard
          </Link>
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}
