import React from 'react';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';
import { VideoBackground } from "@/components/layout/background"

const AssessmentLayout = ({ children, title, progress, prevPage, nextPage, showMascot, buttonPosition, mascotZIndex }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <VideoBackground />
      <ProgressBar progress={progress} title={title} />
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-6 relative">
        <div className="w-full max-w-max">
          {children}
        </div>
        {showMascot && (
          <div className="absolute bottom-0 justify-center" style={{ zIndex: mascotZIndex }}>
            <img 
              src="../src/assets/user-assessment/DetectiveCapybara.png" 
              alt="Mascot character" 
              className="w-5/6 h-5/6 object-cover pointer-events-none"
            />
          </div>
        )}
      </div>
      
      <NavigationButtons prevPage={prevPage} nextPage={nextPage} buttonPosition={buttonPosition} />
    </div>
  );
};

export default AssessmentLayout;

