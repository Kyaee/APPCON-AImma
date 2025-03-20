import React from 'react';

const LearningModule = () => {
  return (
    <div className="relative w-[340px] h-[180px] bg-[#4E4E4E] rounded-2xl overflow-hidden">
      {/* Mascot Image */}
      <div className="absolute left-[-15px] top-[-10px]">
        <img src="/mascot.png" alt="Mascot" className="w-[120px]" />
      </div>

      {/* Module Content */}
      <div className="absolute top-[20px] left-[110px] w-[220px] h-[140px] bg-[#D9D9D9] rounded-xl p-4">
        <div className="text-xl font-bold text-[#4E4E4E] mb-1">Javascript</div>
        <div className="text-lg text-[#4E4E4E] mb-3">Fundamentals</div>

        {/* Progress Circle */}
        <div className="absolute top-[10px] right-[10px] w-[60px] h-[60px] ">
          <svg className="w-full h-full">
            <circle
              className="stroke-[#E6E6E6] stroke-[5px] fill-transparent"
              cx="30"
              cy="30"
              r="25"
            />
            <circle
              className="stroke-[#E6B357] stroke-[5px] fill-transparent"
              cx="30"
              cy="30"
              r="25"
              style={{ strokeDasharray: '157.08', strokeDashoffset: '39.27' }} // 75% of circumference
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-[#4E4E4E]">
            75%
          </div>
        </div>

        <div className="flex items-center text-sm text-[#4E4E4E] mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          5 hrs
        </div>
        <div className="flex items-center text-sm text-[#4E4E4E]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-3m3 3v-6m3 6v-3m2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
            />
          </svg>
          Module
        </div>

        <button className="absolute bottom-4 left-4 w-[calc(100%-8px)] bg-[#E6B357] text-white py-2 rounded-lg">
          CONTINUE LEARNING
        </button>
      </div>
    </div>
  );
};

export default LearningModule;