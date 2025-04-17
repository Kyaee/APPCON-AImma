import QuestPanel from "@/components/dashboard-roadmap/QuestPanel";
import StreakPanel from "@/components/dashboard-roadmap/StreakPanel";
import Sidebar from "@/components/dashboard-roadmap/Sidebar";
import RoadmapHeader from "@/components/dashboard-roadmap/RoadmapHeader";
import RoadmapContent from "@/components/dashboard-roadmap/RoadmapContent";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRoadmap, fetchLesson } from "@/api/FETCH";
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

  const {
    data: roadmapData,
    isLoading: loadingRoadmap,
    isError: roadmapError,
  } = useQuery(fetchRoadmap(id));

  const currentRoadmap = roadmapData ? roadmapData[roadmapIndex] : null;
  const roadmapId = currentRoadmap?.roadmap_id;

  const {
    data: lessonData,
    isLoading: loadingLessons,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ["lessons", roadmapId], // Add roadmapId to the queryKey to automatically refetch when it changes
    queryFn: () => fetchLesson(roadmapId),
    enabled: !!roadmapId, // Only fetch lessons when roadmap is loaded
  });

  // Refetch lessons when roadmapIndex changes
  useEffect(() => {
    if (roadmapId) {
      refetchLessons();
    }
  }, [roadmapId, refetchLessons]);

  // Replace your current refetch effect with this one
  useEffect(() => {
    // Force refetch when component mounts or URL has timestamp parameter
    const doRefetch = async () => {
      console.log("Forcing refetch of lesson data...");
      // Use invalidateQueries to ensure we get fresh data
      await queryClient.invalidateQueries(["lessons", roadmapId]);
      await refetchLessons();
    };

    doRefetch();

    // Check for timestamp parameter which indicates we returned from a lesson
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("t")) {
      console.log("Returned from lesson with timestamp:", urlParams.get("t"));
      doRefetch();
    }
  }, [refetchLessons, roadmapId, queryClient]);

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
            <div className="ml-[60px] w-1/4 top-30 p-3 fixed">
              <div className="relative inline-block">
                <div className="relative inline-block">
                  {/* Header content with inline horizontal line */}
                  <div className="flex flex-col">
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
                        className="relative inline-flex items-start gap-3 cursor-pointer group p-0"
                        id="headerContainer"
                        style={{ width: "430px" }}
                      >
                        <h2
                          className="text-3xl font-bold text-black text-balance"
                          style={{ maxWidth: "430px" }}
                        >
                          {currentRoadmap?.roadmap_name || "Select a roadmap"}
                        </h2>
                        <ChevronRight
                          className="w-8 h-8 text-black group-hover:text-gray-600 transition-transform duration-200 flex-shrink-0 mt-1"
                          style={{
                            transform: isLeftDropdownOpen
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </div>
                    )}

                    {/* Horizontal Line - width now matches header container exactly */}
                    <div
                      className="h-[3px] bg-black mt-3"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Progression Text */}
              {condition ? (
                <p className="text-red-500 font-medium mt-4 text-lg">
                  Unable to load progression data
                </p>
              ) : (
                <p className="text-black font-medium mt-4 text-lg">
                  Current Progression: {currentRoadmap?.progress || 0}%
                </p>
              )}

              {/* Dropdown menu moved here - below the progression text */}
              {isLeftDropdownOpen && !condition && (
                <div
                  className="mt-4 border-2 border-black rounded-lg shadow-md bg-white z-30"
                  style={{ width: "450px" }}
                >
                  {roadmapData.map((roadmap, index) => (
                    <div
                      key={roadmap.roadmap_id}
                      className="p-3 hover:bg-[#CBB09B] rounded cursor-pointer text-black text-md truncate"
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
                    courseOptions={roadmapData.map(
                      (roadmap) => roadmap.roadmap_name
                    )}
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
                    setIsSidebarExpanded={setIsSidebarExpanded} // Add this line
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
        {/* Right Section - Panels */}
        <div className="p-4 fixed space-y-5 mt-20 right-7 z-10">
          <StreakPanel userId={id} />
          <QuestPanel userId={id} />
        </div>
      </div>
    </div>
  );
}
