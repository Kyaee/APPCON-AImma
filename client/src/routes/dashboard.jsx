import QuestPanel from "@/components/layout/dashboard-roadmap/QuestPanel";
import StreakPanel from "@/components/layout/dashboard-roadmap/StreakPanel";
import Sidebar from "@/components/layout/dashboard-roadmap/Sidebar";
import RoadmapHeader from "@/components/layout/dashboard-roadmap/RoadmapHeader";
import RoadmapContent from "@/components/layout/dashboard-roadmap/RoadmapContent";
import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { courseData } from "@/components/layout/dashboard-roadmap/CourseData";
import { generateExtendedLessons } from "@/components/layout/dashboard-roadmap/CourseData";

export default function Ayon() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [isLeftDropdownOpen, setIsLeftDropdownOpen] = useState(false);

  const handleSidebarToggle = () => {
    console.log("Toggling sidebar");
    setIsSidebarExpanded((prev) => !prev);
  };

  // Available courses with varied number of stages
  const courses = courseData;

  const currentCourse = courses[currentCourseIndex];

  // Handle course navigation
  const handleCourseChange = (direction) => {
    if (direction === "next") {
      setCurrentCourseIndex((prev) => (prev + 1) % courses.length);
    } else if (direction === "prev") {
      setCurrentCourseIndex(
        (prev) => (prev - 1 + courses.length) % courses.length
      );
    }
  };

  // Handle course selection from dropdown
  const handleCourseSelect = (index) => {
    setCurrentCourseIndex(index);
    setIsLeftDropdownOpen(false);
  };

  const handleHeaderCourseSelect = (courseName) => {
    const newIndex = courses.findIndex((course) => course.name === courseName);
    if (newIndex !== -1) {
      setCurrentCourseIndex(newIndex);
    }
  };

  const extendedLessons = useMemo(() => {
    return generateExtendedLessons(currentCourse.lessons);
  }, [currentCourse.lessons]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} onToggle={handleSidebarToggle} />

      {/* Main Content Area - Three Column Layout */}
      <div className="flex w-full pt-20 h-auto min-h-[calc(100vh-80px)]">
        <div
          className={`transition-all duration-300 ${
            isSidebarExpanded ? "w-0 " : "w-[25%] px-0"
          } sticky top-20`}
        >
          {!isSidebarExpanded && (
            <div className="ml-[60px] mt-[0px] p-3 sticky top-25">
              <div className="relative inline-block">
                <div className="relative inline-block">
                  {/* Popup menu - appears on right side */}
                  {isLeftDropdownOpen && (
                    <div className="absolute left-full bg-white top-0 ml-4 border-2 border-black rounded-lg shadow-md z-30 min-w-[300px]">
                      {courses.map((course, index) => (
                        <div
                          key={course.name}
                          className="p-3 hover:bg-[#CBB09B] rounded cursor-pointer text-black text-xl"
                          onClick={() => handleCourseSelect(index)}
                        >
                          {course.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Header content with inline horizontal line */}
                  <div className="flex flex-col">
                    <div
                      onClick={() => setIsLeftDropdownOpen(!isLeftDropdownOpen)}
                      className="relative inline-flex items-center gap-3 cursor-pointer group p-0"
                    >
                      <h2 className="text-3xl font-bold text-black">
                        {currentCourse.name}
                      </h2>
                      {isLeftDropdownOpen ? (
                        <ChevronRight className="w-8 h-8 text-black group-hover:text-gray-600 rotate-180" />
                      ) : (
                        <ChevronRight className="w-8 h-8 text-black group-hover:text-gray-600" />
                      )}
                    </div>

                    {/* Horizontal Line - limited width to match content */}
                    <div
                      className="h-[3px] bg-black mt-3 w-auto"
                      style={{ width: "fit-content", minWidth: "300px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Progression Text */}
              <p className="text-black font-medium mt-4 text-lg">
                Current Progression: {currentCourse.progression}%
              </p>
            </div>
          )}
        </div>
        {/* Middle Section - Roadmap Content */}
        <div
          className={`transition-all duration-300 relative flex flex-col ${
            isSidebarExpanded ? "ml-[20%] w-[55%]" : "w-[50%]"
          }`}
        >
          {isSidebarExpanded && (
            <div className="z-10  pb-0 mx-auto">
              <RoadmapHeader
                currentCourse={currentCourse.name}
                progression={currentCourse.progression}
                courseOptions={courses.map((course) => course.name)}
                className="mb-6"
                isSidebarExpanded={isSidebarExpanded}
                onCourseSelect={handleHeaderCourseSelect}
              />
            </div>
          )}
          <div>
            <RoadmapContent
              lessons={currentCourse.lessons}
              currentCourse={currentCourse.name}
              onCourseChange={handleCourseChange}
              isSidebarExpanded={isSidebarExpanded}
            />
          </div>
        </div>
        {/* Right Section - Panels */}
        <div className="w-[25%] p-4 sticky pt-10">
          <StreakPanel />
          <QuestPanel />
        </div>
      </div>
    </div>
  );
}
