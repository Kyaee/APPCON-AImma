import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { useFetchStore } from "@/store/useUserData";
import { fetchProfile, fetchRoadmap, fetchLesson } from "@/api/FETCH"
import { useEffect, useState } from "react";
import { useStreakStore } from "@/store/useStreakStore";

// Components & Icons
import ProfileDetails from "@/components/profile/ProfileDetails";
import Streak_Component from "../components/profile/Streak";
import Skills_Component from "../components/profile/SkillsProfile";
import Loading from "@/routes/Loading";

export default function Profile() {
  const fetch = useFetchStore((state) => state.fetch);

  // Get quest data from our store
  const [roadmapIndex, setRoadmapIndex] = useState(0);

  // reward user
  const [isRewardsOpen, setIsRewardsOpen] = useState(true);

  const {
    data: profile,
    isLoading: load_profile,
    isError,
  } = useQuery(fetchProfile(fetch.id));

  const {
    data: roadmapData,
    isLoading: loadingRoadmap,
    isError: roadmapError,
  } = useQuery(fetchRoadmap(fetch.id));

  const currentRoadmap = roadmapData ? roadmapData[roadmapIndex] : null;
  const roadmapId = currentRoadmap?.roadmap_id;

  const { data: lessonData, isLoading: loadingLessons } = useQuery({
    queryKey: ["lessons", roadmapId], // Add roadmapId to the queryKey to automatically refetch when it changes
    queryFn: () => fetchLesson(roadmapId),
    enabled: !!roadmapId, // Only fetch lessons when roadmap is loaded
  });

  // Effect to check and update streak
  useEffect(() => {
    if (fetch?.id) {
      useStreakStore.getState().checkAndUpdateStreak(fetch.id);
    }
  }, [fetch?.id]);

  if (load_profile || loadingRoadmap || loadingLessons)
    return <Loading />;

  // Calculate current level progress
  const calculateLevelProgress = (currentExp, level) => {
    return {
      current: currentExp || 0,
      total: 100, // Always use 100 as the maximum EXP per level
    };
  };

  return (
    <>
      <div className="relative w-full min-h-screen overflow-x-hidden pb-20">
        {/* Stats and Action Icons */}

        {/* Check for error state */}
        {isError ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-red-600 text-xl font-semibold mb-2">
                Error loading profile
              </h2>
              <p className="text-gray-700 mb-4">
                Something went wrong while fetching your profile data.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* <button>ONCLICK</button> */}
            {/* Profile Content */}
            {/* Provide filler data to ProfileDetails if data is inaccessible */}
            <ProfileDetails
              initialImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              name={fetch?.first_name && fetch?.last_name ? fetch.first_name + " " + fetch.last_name : "Guest User"}
              level={fetch?.level || 1}
              experience={
                calculateLevelProgress(fetch?.current_exp || 0).current
              }
              totalExperience={
                calculateLevelProgress(fetch?.current_exp || 0).total
              }
              lessonData={lessonData
                ? lessonData
                    .filter(
                      (lesson) =>
                        lesson.previous_lesson &&
                        new Date(lesson.previous_lesson) <= new Date()
                    )
                    .sort(
                      (a, b) =>
                        new Date(b.previous_lesson) - new Date(a.previous_lesson)
                    )
                    .slice(0, 1)
                : []}
              hours={2}
              withAssessment={true}
              progress={40}
              isOpen={isRewardsOpen}
              onOpenChange={setIsRewardsOpen}
              userId={fetch?.id || "unknown"}
              renderButton={true} // Don't render the button in the component
            />
          </>
        )}

        <main className="grid grid-cols-2 w-full mt-28 px-10 lg:px-30 xl:px-45 gap-y-15 gap-x-25">
          {/****************  
            Badges Section 
          ****************/}
          <Skills_Component titles={lessonData} />

          {/**************** 
              Streak Section 
          ****************/}
          <Streak_Component
            streak={!isError ? fetch.streaks : 0}
            previous_best={!isError ? fetch.best_streak : 0}
            quests_finished={!isError ? fetch.finished_quests : 0}
            roadmap_progress={!isError ? roadmapData : []}
            setRoadmapIndex={setRoadmapIndex}
            profile={!isError && profile ? profile : []}
            defaultValue={roadmapIndex} // Fix: Pass defaultValue to set initial roadmap index
          />
        </main>
      </div>
    </>
  );
}
