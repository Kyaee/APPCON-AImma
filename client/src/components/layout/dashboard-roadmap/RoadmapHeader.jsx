import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const RoadmapHeader = ({
  currentCourse = "Web Development",
  progression = 10,
  courseOptions = [
    "Web Development",
    "Quality Assurance",
    "Mobile Development",
  ],
  className = "",
  isSidebarExpanded = false,
  onCourseSelect,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const leftMargin = isSidebarExpanded ? "ml-[140px]" : "ml-[20px]";

  return (
    <div
      className={`sticky top-[120px] z-[100] py-6 mt-24 ${leftMargin} ${className}`}
    >
      <div className="relative inline-block">
        <div className="relative">
          <div className="flex flex-col">
            <div
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className="relative inline-flex items-center gap-3 cursor-pointer group"
            >
              <h2 className="text-2xl font-bold text-black">{currentCourse}</h2>
              <ChevronRight className="w-8 h-8 text-black" />
            </div>

            <div className="h-[3px] bg-black mt-3 w-[250px]" />
          </div>

          {isPopupOpen && (
            <div className="absolute left-[calc(100%+16px)] top-0 bg-white shadow-lg min-w-[200px] z-[200] rounded-lg">
              {courseOptions.map((course) => (
                <div
                  key={course}
                  className="p-3 cursor-pointer text-black text-xl hover:text-gray-700"
                  onClick={() => {
                    onCourseSelect?.(course);
                    setIsPopupOpen(false);
                  }}
                >
                  {course}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-black font-medium mt-4 text-md">
        Current Progression: {progression}%
      </p>
    </div>
  );
};

export default RoadmapHeader;
