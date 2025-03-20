import React, { useState } from 'react';

const SkillTreeApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="min-h-screen p-4">
      {/* Skill Trees Section */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white rounded-lg border-2 border-black">
          <div className="flex justify-between items-center p-4 border-b-2 border-black">
            <h2 className="text-lg font-medium text-black">Completed Skill Trees</h2>
            <button 
              onClick={toggleExpand}
              className="flex items-center px-3 py-1 bg-white text-gray-700 border-2 border-black rounded cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Expand
            </button>
          </div>
          
          <div className="p-4">
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-black cursor-pointer hover:text-blue-600">Finished Supabase Tutorial</li>
              <li className="text-black cursor-pointer hover:text-blue-600">Finished TypeScript</li>
              <li className="text-black cursor-pointer hover:text-blue-600">Sample</li>
              <li><a href="#" className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200">Expand List</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Career Opportunities Section - Enhanced with borders and interactions */}
      <div className="max-w-4xl mx-auto relative">
        {/* Main container with black border and shadow */}
        <div className="bg-white rounded-lg border-2 border-black shadow-lg overflow-hidden">
          {/* Header section with enhanced border */}
          <div className="flex justify-between items-center p-4 border-b-2 border-black">
            <h2 className="text-lg font-medium text-black">Career Opportunities</h2>
            <a href="#" className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200">Look for more</a>
          </div>
          
          {/* Job cards container */}
          <div className="p-4">
            <div className="flex space-x-4">
              {/* First Job Card - Quality Assurance Position */}
              <div className="w-1/2 bg-white border-2 border-black rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-4">
                  {/* Job title and salary */}
                  <h3 className="font-bold text-black hover:text-blue-600 cursor-pointer transition-colors duration-200">Quality Assurance</h3>
                  <div className="text-sm text-black">PHP 16,000 - PHP 25,000 a month</div>
                  
                  {/* Company information with hover effect */}
                  <div className="flex items-center mt-1 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                    </svg>
                    XYZ Company
                  </div>
                  
                  {/* Location information with hover effect */}
                  <div className="flex items-center mt-1 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Full-time · Arizona 123, America, Yawa Patalatan/Hybrid
                  </div>
                  
                  {/* Insights section with border */}
                  <div className="mt-4 border-t-2 border-black pt-4">
                    <h4 className="font-medium text-black">Insights</h4>
                    <p className="mt-1 text-sm text-gray-700">
                      This a good fit for you because... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                
                {/* Action buttons with enhanced borders and hover effects */}
                <div className="flex border-t-2 border-black mt-4">
                  <button className="flex-1 py-2 border-r-2 border-black text-sm text-gray-700 flex justify-center items-center hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not Interested
                  </button>
                  <button className="flex-1 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors duration-200">
                    Check Now
                  </button>
                </div>
              </div>

              {/* Second Job Card - Quality Assurance Position */}
              <div className="w-1/2 bg-white border-2 border-black rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-4">
                  {/* Job title and salary */}
                  <h3 className="font-bold text-black hover:text-blue-600 cursor-pointer transition-colors duration-200">Quality Assurance</h3>
                  <div className="text-sm text-black">PHP 16,000 - PHP 25,000 a month</div>
                  
                  {/* Company information with hover effect */}
                  <div className="flex items-center mt-1 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                    </svg>
                    XYZ Company
                  </div>
                  
                  {/* Location information with hover effect */}
                  <div className="flex items-center mt-1 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Full-time · Arizona 123, America, Yawa Patalatan/Hybrid
                  </div>
                  
                  {/* Insights section with border */}
                  <div className="mt-4 border-t-2 border-black pt-4">
                    <h4 className="font-medium text-black">Insights</h4>
                    <p className="mt-1 text-sm text-gray-700">
                      This a good fit for you because... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                
                {/* Action buttons with enhanced borders and hover effects */}
                <div className="flex border-t-2 border-black mt-4">
                  <button className="flex-1 py-2 border-r-2 border-black text-sm text-gray-700 flex justify-center items-center hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not Interested
                  </button>
                  <button className="flex-1 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors duration-200">
                    Check Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTreeApp;