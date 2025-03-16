import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const RoadmapHeader = ({ 
  currentCourse = "Web Development",
  progression = 10,
  courseOptions = ["Web Development", "Quality Assurance", "Mobile Development"],
  className = "", // Add className prop
  isSidebarExpanded = false // Add sidebar state prop
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Determine left margin based on sidebar state
  const leftMargin = isSidebarExpanded ? 'ml-[200px]' : 'ml-[60px]';
  
  // Determine horizontal line width based on sidebar state
  const horizontalLineWidth = isSidebarExpanded ? '690px' : '250px';

  return (
    <div className={`p-4 mt-4 ${leftMargin} ${className}`}> {/* Dynamic left margin */}
      <div className="relative inline-block">
        {/* Base container that's always visible */}
        <div className="relative inline-block">
          {/* White background container - appears on dropdown open */}
          {isDropdownOpen && (
            <>
              {/* Header background */}
              <div className="absolute inset-0 -m-4 pb-2 bg-white border-2 border-black rounded-t-lg shadow-md border-b-0" />
              {/* Dropdown container */}
              <div className="absolute left-0 top-full -m-4 bg-white border-2 border-black border-t-2 rounded-b-lg shadow-md w-full mt-1">
                {courseOptions.map((course) => (
                  <div
                    key={course}
                    className="p-3 hover:bg-[#CBB09B] rounded cursor-pointer text-black text-xl"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Header content with inline horizontal line */}
          <div className="flex flex-col">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative inline-flex items-center gap-3 cursor-pointer group p-0"
            >
              <h2 className="text-2xl font-bold text-black">{currentCourse}</h2>
              {isDropdownOpen ? (
                <ChevronDown className="w-8 h-8 text-black group-hover:text-gray-600" />
              ) : (
                <ChevronRight className="w-8 h-8 text-black group-hover:text-gray-600" />
              )}
            </div>
            
            {/* Horizontal Line - dynamic width based on sidebar state */}
            <div className="h-[3px] bg-black mt-3 w-auto" style={{ width: 'fit-content', minWidth: horizontalLineWidth }} />
          </div>
        </div>
      </div>

      {/* Progression Text */}
      <p className="text-black font-medium mt-4 text-md">
        Current Progression: {progression}%
      </p>
    </div>
  );
};

export default RoadmapHeader;