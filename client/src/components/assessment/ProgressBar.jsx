import React from "react";

const ProgressBar = ({ progress, title }) => {
  return (
    <div className="container mx-auto">
      <div className="w-9/12 bg-yellow-700  rounded-full h-4 m-auto mt-8 border-1">
        <div
          className="bg-white h-4 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h1 className="text-white text-xl f ont-semibold mt-2 text-center">
        {title}
      </h1>
    </div>
  );
};

export default ProgressBar;
