import CombinedPanel from "@/components/dashboard-roadmap/CombinedPanel"; // Import the new component
import Sidebar from "@/components/dashboard-roadmap/Sidebar";
import RoadmapHeader from "@/components/dashboard-roadmap/RoadmapHeader";
import RoadmapContent from "@/components/dashboard-roadmap/RoadmapContent";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRoadmap, fetchLesson } from "@/api/FETCH"; // Ensure fetchRoadmap is imported
import Loading from "@/routes/Loading";

export default function Dashboard({ setAssessed }) {
  const { id } = useParams();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  // Initialize roadmapIndex from localStorage or default to 0
  const [roadmapIndex, setRoadmapIndex] = useState(() => {
    const savedIndex = localStorage.getItem("selectedRoadmapIndex");
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });
  const [isLeftDropdownOpen, setIsLeftDropdownOpen] = useState(false);
  const [getLoading, setLoading] = useState(false);
  const [isLessonOpen, setIsLessonOpen] = useState(false);
  const [userRewards, setUserRewards] = useState({ xp: 0, gems: 0 });
  const queryClient = useQueryClient();

  // Save roadmapIndex to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedRoadmapIndex", roadmapIndex.toString());
  }, [roadmapIndex]);

  // Fetch roadmap data with better caching parameters
  const {
    data: roadmapData,
    isLoading: loadingRoadmap,
    isError: roadmapError,
    refetch: refetchRoadmaps,
  } = useQuery(fetchRoadmap(id));

  const currentRoadmap = roadmapData ? roadmapData[roadmapIndex] : null;
  const roadmapId = currentRoadmap?.roadmap_id;

  // Fetch lesson data
  const {
    data: lessonData,
    isLoading: loadingLessons,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ["lessons", roadmapId],
    queryFn: () => fetchLesson(roadmapId),
    enabled: !!roadmapId,
  });

  // Keep only ONE useEffect for handling returns from lessons/assessments
  useEffect(() => {
    if (roadmapId && id) {
      // Check only for timestamp parameter
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("t")) {
        console.log(
          "Dashboard: Returned from lesson/assessment with timestamp:",
          urlParams.get("t")
        );

        // Use invalidateQueries ONLY - don't call explicit refetches
        queryClient.invalidateQueries({
          queryKey: ["lessons", roadmapId],
        });
        queryClient.invalidateQueries({
          queryKey: ["roadmap", id],
        });
      }
    }
  }, [roadmapId, id, queryClient]);

  if (loadingRoadmap || loadingLessons) return <Loading />;

  // Handle course navigation
  const handleCourseChange = (direction) => {
    if (direction === "next" && roadmapData) {
      setRoadmapIndex((prev) => (prev + 1) % roadmapData.length);
    } else if (direction === "prev" && roadmapData) {
      setRoadmapIndex(
        (prev) => (prev - 1 + roadmapData.length) % roadmapData.length
      );
    }
  };

  // Handle course selection from dropdown
  const handleCourseSelect = (index) => {
    setRoadmapIndex(index);
    setIsLeftDropdownOpen(false);
  };

  const condition = roadmapError || !roadmapData || roadmapData.length === 0;

  if (getLoading) {
    return <Loading generate_lesson={true} />;
  }

  return (
    <div className="relative w-full min-h-screen select-none overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        isLessonOpen={isLessonOpen}
        isLessonData={lessonData}
        // Add this prop
      />

      {/* Main Content Area - Three Column Layout */}
      <div className="flex w-full pt-20 h-auto min-h-[calc(100vh-80px)]">
        <div
          className={`transition-all duration-300 ${
            isSidebarExpanded ? "w-0 " : "w-[25%] px-0"
          } sticky top-20`}
        >
          {!isSidebarExpanded && (
            <div className="ml-[calc(3vw+12px)] w-[calc(20%+4vw)] top-30 p-3 fixed">
              <div className="relative inline-block w-full">
                <div className="relative inline-block w-full">
                  {/* Header content with inline horizontal line */}
                  <div className="flex flex-col w-full">
                    {condition ? (
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
                        className="relative inline-flex items-start gap-3 cursor-pointer group p-0 w-full"
                        id="headerContainer"
                      >
                        <h2
                          className="text-[calc(1.0rem+0.5vw)] font-bold text-black dark:text-primary text-balance pr-10"
                          style={{ width: "calc(100% - 0rem)" }}
                        >
                          {currentRoadmap?.roadmap_name || "Select a roadmap"}
                        </h2>
                        <ChevronRight
                          className="w-8 h-8 text-black dark:text-primary group-hover:text-gray-600 transition-transform duration-200 flex-shrink-0 absolute right-0"
                          style={{
                            transform: isLeftDropdownOpen
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </div>
                    )}

                    {/* Horizontal Line */}
                    <div className="h-[3px] bg-black dark:bg-primary mt-3 w-full" />
                  </div>
                </div>
              </div>

              {/* Progression Text */}
              {condition ? (
                <p className="text-red-500 font-medium mt-4 text-[calc(1rem+0.2vw)]">
                  Unable to load progression data
                </p>
              ) : (
                <p
                  className={`font-medium mt-4 text-[calc(1rem+0.2vw)] ${
                    isSidebarExpanded
                      ? "text-black dark:text-primary"
                      : "text-black dark:text-primary"
                  }`}
                >
                  Current Progression: {currentRoadmap?.progress || 0}%
                </p>
              )}

              {/* Dropdown menu */}
              {isLeftDropdownOpen && !condition && (
                <div
                  className="mt-4 border-2 border-black dark:border-primary rounded-lg shadow-md bg-white dark:bg-[#252527] z-30 w-full scrollbar-thin scrollbar-thumb-[#CBB09B]/50 hover:scrollbar-thumb-[#CBB09B] scrollbar-track-transparent dark:scrollbar-thumb-dark-mode-highlight/50 dark:hover:scrollbar-thumb-dark-mode-highlight"
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(203, 176, 155, 0.5) transparent",
                  }}
                  onWheel={(e) => e.stopPropagation()}
                >
                  {roadmapData.map((roadmap, index) => (
                    <div
                      key={roadmap.roadmap_id}
                      className="p-3 hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight rounded cursor-pointer text-black dark:text-primary text-[calc(0.875rem+0.1vw)] truncate"
                      onClick={() => handleCourseSelect(index)}
                      title={roadmap.roadmap_name}
                    >
                      {roadmap.roadmap_name}
                    </div>
                  ))}
                </div>
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
          {condition ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                Failed to load roadmap
              </h2>
              <p className="text-gray-700">
                Please try again later or contact support if the problem
                persists.
              </p>
            </div>
          ) : (
            <>
              {isSidebarExpanded && currentRoadmap && (
                <div
                  className="z-10 pb-0 mx-auto relative"
                  style={{ isolation: "isolate" }}
                >
                  <RoadmapHeader
                    currentCourse={currentRoadmap.roadmap_name}
                    progression={currentRoadmap.progress}
                    roadmapId={currentRoadmap.roadmap_id}
                    courseOptions={
                      roadmapData?.map((roadmap) => roadmap.roadmap_name) || []
                    } // Ensure this is an array even if roadmapData is null
                    className="mb-6"
                    isSidebarExpanded={isSidebarExpanded}
                    onCourseSelect={handleCourseSelect}
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
                    isLoading={getLoading}
                    setLoading={setLoading}
                    setOpenLesson={setIsLessonOpen} // Pass the setter to RoadmapContent
                    isOpenLesson={isLessonOpen} // Also pass the state
                  />
                )}
              </div>
            </>
          )}
        </div>
        {/* Right Section - Combined Panel */}
        <div className="p-4 fixed mt-20 right-7 z-10">
          {/* Replace separate panels with the combined panel */}
          <CombinedPanel userId={id} />
        </div>
      </div>
    </div>
  );
}
// This component is the main dashboard for the user, displaying their roadmap and progress. It includes a sidebar for navigation, a header for course selection, and a combined panel for user rewards and other information. The component uses React Query for data fetching and caching, ensuring efficient data management. The layout is responsive and adapts to different screen sizes, providing a seamless user experience.
