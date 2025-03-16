import { Background } from "@/components/layout/background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import QuestPanel from "@/components/layout/dashboard-roadmap/QuestPanel";
import StreakPanel from "@/components/layout/dashboard-roadmap/StreakPanel";
import Sidebar from "@/components/layout/dashboard-roadmap/Sidebar";
import RoadmapHeader from '@/components/layout/dashboard-roadmap/RoadmapHeader';
import RoadmapContent from '@/components/layout/dashboard-roadmap/RoadmapContent';
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [isLeftDropdownOpen, setIsLeftDropdownOpen] = useState(false);

  const handleSidebarToggle = () => {
    console.log('Toggling sidebar');
    setIsSidebarExpanded(prev => !prev);
  };

  // Available courses with varied number of stages
  const courses = [
    {
      name: "Web Development",
      progression: 10,
      lessons: [
        { id: 1, title: "HTML Basics", status: "completed" },
        { id: 2, title: "CSS Fundamentals", status: "in_progress" },
        { id: 3, title: "JavaScript Intro", status: "locked" },
        { id: 4, title: "DOM Manipulation", status: "locked" },
        { id: 5, title: "React Basics", status: "locked" },
        { id: 6, title: "State Management", status: "locked" },
        { id: 7, title: "API Integration", status: "locked" },
        { id: 8, title: "Deployment", status: "locked" },
      ]
    },
    {
      name: "Quality Assurance",
      progression: 5,
      lessons: [
        { id: 1, title: "Testing Fundamentals", status: "completed" },
        { id: 2, title: "Unit Testing", status: "in_progress" },
        { id: 3, title: "Integration Testing", status: "locked" },
        { id: 4, title: "E2E Testing", status: "locked" },
        { id: 5, title: "Test Automation", status: "locked" },
      ]
    },
    {
      name: "Mobile Development",
      progression: 0,
      lessons: [
        { id: 1, title: "Mobile Basics", status: "locked" },
        { id: 2, title: "React Native", status: "locked" },
        { id: 3, title: "Native APIs", status: "locked" },
        { id: 4, title: "App Publishing", status: "locked" },
      ]
    }
  ];

  const currentCourse = courses[currentCourseIndex];

  // Handle course navigation
  const handleCourseChange = (direction) => {
    if (direction === 'next') {
      setCurrentCourseIndex(prev => (prev + 1) % courses.length);
    } else if (direction === 'prev') {
      setCurrentCourseIndex(prev => (prev - 1 + courses.length) % courses.length);
    }
  };

  // Handle course selection from dropdown
  const handleCourseSelect = (index) => {
    setCurrentCourseIndex(index);
    setIsLeftDropdownOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen">
      <Background />
      <MainNav />
      {/* Stats and Action Icons */}
      <div className="fixed top-8 right-15 flex items-center gap-4">
        <div className="flex items-center gap-4">
          <StatsDisplay type="heart" value="10" />
          <StatsDisplay type="gem" value="500" />
        </div>
        <div className="flex items-center gap-4">
          <ActionIcons
            type="notification"
            onClick={() => console.log("Notification clicked")}
          />
          <ActionIcons
            type="settings"
            onClick={() => console.log("Settings clicked")}
          />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        onToggle={handleSidebarToggle} 
      />

      {/* Main Content Area - Three Column Layout */}
      <div className="flex w-full pt-20">
        {/* Left Section - Course Header (when sidebar is collapsed) */}
        <div className={`transition-all duration-300 ${isSidebarExpanded ? 'w-0 overflow-hidden' : 'w-[25%] px-4'}`}>
          {!isSidebarExpanded && (
            <div className="pl-[80px] p-4">
              <div className="relative inline-block">
                <div className="relative inline-block">
                  {/* White background container - appears on dropdown open */}
                  {isLeftDropdownOpen && (
                    <>
                      {/* Header background */}
                      <div className="absolute inset-0 -m-4 pb-2 bg-white border-2 border-black rounded-t-lg shadow-md border-b-0" />
                      {/* Dropdown container */}
                      <div className="absolute left-0 top-full -m-4 bg-white border-2 border-black border-t-2 rounded-b-lg shadow-md w-full mt-1 z-30">
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
                    </>
                  )}
                  
                  {/* Header content with inline horizontal line */}
                  <div className="flex flex-col">
                    <div 
                      onClick={() => setIsLeftDropdownOpen(!isLeftDropdownOpen)}
                      className="relative inline-flex items-center gap-3 cursor-pointer group p-0"
                    >
                      <h2 className="text-2xl font-bold text-black">{currentCourse.name}</h2>
                      {isLeftDropdownOpen ? (
                        <ChevronDown className="w-8 h-8 text-black group-hover:text-gray-600" />
                      ) : (
                        <ChevronRight className="w-8 h-8 text-black group-hover:text-gray-600" />
                      )}
                    </div>
                    
                    {/* Horizontal Line - limited width to match content */}
                    <div className="h-[3px] bg-black mt-3 w-auto" style={{ width: 'fit-content', minWidth: '250px' }} />
                  </div>
                </div>
              </div>
              
              {/* Progression Text */}
              <p className="text-black font-medium mt-4 text-md">
                Current Progression: {currentCourse.progression}%
              </p>
            </div>
          )}
        </div>

        {/* Middle Section - Roadmap Content */}
        <div className={`transition-all duration-300 ${isSidebarExpanded ? 'ml-[20%] w-[55%]' : 'w-[50%]'}`}>
          {isSidebarExpanded && (
            <RoadmapHeader 
              currentCourse={currentCourse.name}
              progression={currentCourse.progression}
              courseOptions={courses.map(course => course.name)}
              className="mb-6"
              isSidebarExpanded={isSidebarExpanded}
            />
          )}
          <RoadmapContent 
            lessons={currentCourse.lessons} 
            currentCourse={currentCourse.name}
            onCourseChange={handleCourseChange}
            isSidebarExpanded={isSidebarExpanded}
          />
        </div>

        {/* Right Section - Panels */}
        <div className="w-[25%] p-4 space-y-4 pr-8">
          <StreakPanel />
          <QuestPanel />
        </div>
      </div>
    </div>
  );
}
