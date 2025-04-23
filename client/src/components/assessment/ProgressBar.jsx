import React from "react";
import { ArrowLeft } from "lucide-react";

const ProgressBar = ({ progress, title, onBack }) => {
  return (
    <div className="container mx-auto relative">
      <div className="flex items-center justify-center">
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
        )}
        
        <div className="w-9/12 bg-yellow-700 rounded-full h-5 m-auto mt-8 border-2 border-black">
          <div
            className="bg-white h-4 rounded-full transition-all duration-300 border-r-2 border-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <h1 className="text-white text-xl font-semibold mt-2 text-center select-none">
        {title}
      </h1>
    </div>
  );
};

export default ProgressBar;
