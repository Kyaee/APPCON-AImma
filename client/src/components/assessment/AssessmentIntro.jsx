import React from "react";
import { ArrowRight } from "lucide-react";
import { VideoBackground } from "@/components/layout/Background";
import brandIcon from "@/assets/general/brandicon.png";

const AssessmentIntro = ({ onBeginAssessment }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-6 md:px-16 lg:px-32 xl:px-48 relative">
      <VideoBackground />
      <div className="max-w-6xl w-full flex flex-col items-center p-8 md:p-12 relative">
        {/* Logo at top with larger size */}
        <div className="w-full flex justify-center mb-8">
          <div className="flex items-center justify-center">
            <img
              src={brandIcon}
              alt="Brand icon"
              className="w-48 h-48 object-contain rounded-full"
            />
          </div>
        </div>

        {/* Content with centered text */}
        <div className="w-full max-w-4xl space-y-2 items-center text-center">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-white text-5xl font-bold text-center">
              Before we begin
            </h1>
            <p className="text-gray-200 text-xl mt-4 text-center">
              Complete a quick assessment so our AI can generate your
              personalized learning roadmap.
            </p>
          </div>
        </div>

        {/* Button positioned at bottom center */}
        <div className="w-full max-w-4xl mt-8">
          <div className="w-full flex justify-center">
            <button
              onClick={onBeginAssessment}
              className="bg-[#BF9566] border-black border-2 text-white px-8 py-3 rounded-lg text-lg
                shadow-lg hover:bg-[#BF8648] transition-colors inline-flex items-center gap-2"
            >
              Begin Assessment
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;
