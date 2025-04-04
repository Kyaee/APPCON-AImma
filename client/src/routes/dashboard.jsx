import QuestPanel from "@/components/layout/dashboard-roadmap/QuestPanel";
import StreakPanel from "@/components/layout/dashboard-roadmap/StreakPanel";
import Sidebar from "@/components/layout/dashboard-roadmap/Sidebar";
import RoadmapHeader from "@/components/layout/dashboard-roadmap/RoadmapHeader";
import RoadmapContent from "@/components/layout/dashboard-roadmap/RoadmapContent";
import { useState, useMemo, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { courseData } from "@/components/layout/dashboard-roadmap/CourseData";
import { useQuery } from "@tanstack/react-query";
import { fetchRoadmap, fetchLesson } from "@/api/FETCH";
import Loading from "@/routes/loading";

export default function Ayon() {
  const { id } = useParams();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [roadmapIndex, setRoadmapIndex] = useState(0);
  const [isLeftDropdownOpen, setIsLeftDropdownOpen] = useState(false);

  const {
    data: roadmapData,
    isLoading: loadingRoadmap,
    isError: roadmapError,
  } = useQuery(fetchRoadmap(id));

  const currentRoadmap = roadmapData ? roadmapData[roadmapIndex] : null;
  const roadmapId = currentRoadmap?.roadmap_id;

  const { data: lessonData, isLoading: loadingLessons } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => fetchLesson(roadmapId),
    enabled: !!roadmapId, // Only fetch lessons when roadmap is loaded
  });

  if (loadingRoadmap || loadingLessons) return <Loading />;

  // Handle course navigation
  const handleCourseChange = (direction) => {
    if (direction === "next") {
      setRoadmapIndex((prev) => (prev + 1) % courses.length);
    } else if (direction === "prev") {
      setRoadmapIndex((prev) => (prev - 1 + courses.length) % courses.length);
    }
  };

  // Handle course selection from dropdown
  const handleCourseSelect = (index) => {
    setRoadmapIndex(index);
    setIsLeftDropdownOpen(false);
  };

  // const handleHeaderCourseSelect = (courseName) => {
  //   const newIndex = courses.findIndex((course) => course.name === courseName);
  //   if (newIndex !== -1) {
  //     setRoadmapIndex(newIndex);
  //   }
  // };

  return (
    <div className="relative w-full min-h-screen select-none">
      {/* Sidebar */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

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
                      {!roadmapError
                        ? roadmapData.map((roadmap, index) => (
                            <div
                              key={roadmap.roadmap_id}
                              className="p-3 hover:bg-[#CBB09B] rounded cursor-pointer text-black text-xl"
                              onClick={() => handleCourseSelect(roadmap)}
                            >
                              - {roadmap.roadmap_name}
                            </div>
                          ))
                        : "Error Occured"}
                    </div>
                  )}

                  {/* Header content with inline horizontal line */}
                  <div className="flex flex-col">
                    {roadmapError ? (
                      <div className="relative inline-flex items-center gap-3 p-0">
                        <h2 className="text-3xl font-bold text-red-500">
                          Failed to load roadmap
                        </h2>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          setIsLeftDropdownOpen(!isLeftDropdownOpen)
                        }
                        className="relative inline-flex items-center gap-3 cursor-pointer group p-0"
                      >
                        <h2 className="text-3xl font-bold text-black">
                          {currentRoadmap?.roadmap_name || "Select a roadmap"}
                        </h2>
                        {isLeftDropdownOpen ? (
                          <ChevronRight className="w-8 h-8 text-black group-hover:text-gray-600 rotate-180" />
                        ) : (
                          <ChevronRight className="w-8 h-8 text-black group-hover:text-gray-600" />
                        )}
                      </div>
                    )}

                    {/* Horizontal Line - limited width to match content */}
                    <div
                      className="h-[3px] bg-black mt-3 w-auto"
                      style={{ width: "fit-content", minWidth: "300px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Progression Text */}
              {!roadmapError ? (
                <p className="text-black font-medium mt-4 text-lg">
                  Current Progression: {currentRoadmap?.progress || 0}%
                </p>
              ) : (
                <p className="text-red-500 font-medium mt-4 text-lg">
                  Unable to load progression data
                </p>
              )}
            </div>
          )}
        </div>
        {/* Middle Section - Roadmap Content */}
        <div
          className={`transition-all duration-300 relative flex flex-col ${
            isSidebarExpanded ? "ml-[20%] w-[55%]" : "w-[50%]"
          }`}
        >
          {roadmapError ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to load roadmap</h2>
              <p className="text-gray-700">Please try again later or contact support if the problem persists.</p>
            </div>
          ) : (
            <>
              {isSidebarExpanded && currentRoadmap && (
                <div className="z-10 pb-0 mx-auto">
                  <RoadmapHeader
                    currentCourse={currentRoadmap.roadmap_name}
                    progression={currentRoadmap.progress}
                    // courseOptions={lessonData.map((course) => course.lesson_name)}
                    className="mb-6"
                    isSidebarExpanded={isSidebarExpanded}
                    // onCourseSelect={handleHeaderCourseSelect}
                  />
                </div>
              )}
              <div>
                {currentRoadmap && lessonData && (
                  <RoadmapContent
                    lessons={lessonData}
                    currentCourse={currentRoadmap.roadmap_name}
                    onCourseChange={handleCourseChange}
                    isSidebarExpanded={isSidebarExpanded}
                  />
                )}
              </div>
            </>
          )}
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
