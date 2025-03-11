import React from 'react';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';

const AssessmentLayout = ({ children, title, progress, prevPage, nextPage, showMascot, buttonPosition }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-900 to-amber-950">     {/* BACk*/}
      <ProgressBar progress={progress} title={title} />
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-6 relative">
        <div className="w-full max-w-max">
          {children}
        </div>
        {showMascot && (
          <div className="absolute bottom-0 justify-center">
            <img 
              src="/DetectiveCapybara.png" 
              alt="Mascot character" 
              className="w-5/6 h-5/6 object-cover"
            />
          </div>
        )}
      </div>
      
      <NavigationButtons prevPage={prevPage} nextPage={nextPage}  buttonPosition={buttonPosition} />
    </div>
  );
}  

export default AssessmentLayout;

    