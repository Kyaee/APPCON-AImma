import React from "react";
import ProgressBar from "./ProgressBar";
import { VideoBackground } from "@/components/layout/Background";

const AssessmentLayout = ({
  children,
  title,
  progress,
  prevPage,
}) => {
  return (
    <div className="flex flex-col h-full min-h-screen relative overflow-hidden">
      <VideoBackground />
      <ProgressBar progress={progress} title={title} onBack={prevPage} />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden">
        <div className="w-full max-w-max">{children}</div>
      </div>
    </div>
  );
};

export default AssessmentLayout;
