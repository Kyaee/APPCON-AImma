import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { useFetchStore } from "@/store/useUserData";
import { fetchProfile, fetchRoadmap, fetchLesson } from "@/api/FETCH";
import { useQuestStore } from "@/store/useQuestStore";
import { fetchUserStats } from "@/api/UPDATE";
import { useEffect, useState } from "react";
import { useStreakStore } from "@/store/useStreakStore";

// Components & Icons
import ProfileDetails from "@/components/profile/ProfileDetails";
import CareerOpportunities from "../components/profile/CareerOpportunities";
import Streak_Component from "../components/profile/Streak";
import Tabs_Component from "../components/profile/TabsProfile";
import Skills_Component from "../components/profile/SkillsProfile";
import Loading from "@/routes/Loading";
import SkinBadgesTabs from "../components/profile/SkinsTab";
import LevelRewards from "@/components/features/level-rewards/LevelRewards";

export default function Profile() {
  const fetch = useFetchStore((state) => state.fetch);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get quest data from our store
  const [roadmapIndex, setRoadmapIndex] = useState(0);
  const dailyQuests = useQuestStore((state) => state.dailyQuests);
  const weeklyQuests = useQuestStore((state) => state.weeklyQuests);

  // Get streak data from our store
  const streak = useStreakStore((state) => state.streak);
  const bestStreak = useStreakStore((state) => state.bestStreak);

  // Calculate completed quests
  const completedDailyQuests = dailyQuests.filter((q) => q.completed).length;
  const completedWeeklyQuests = weeklyQuests.filter((q) => q.completed).length;
  const totalCompletedQuests = completedDailyQuests + completedWeeklyQuests;
  
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

  const {
    data: lessonData,
    isLoading: loadingLessons,
  } = useQuery({
    queryKey: ["lessons", roadmapId], // Add roadmapId to the queryKey to automatically refetch when it changes
    queryFn: () => fetchLesson(roadmapId),
    enabled: !!roadmapId, // Only fetch lessons when roadmap is loaded
  });

  // Fetch the latest user stats from Supabase
  useEffect(() => {
    const getUserData = async () => {
      if (fetch?.id) {
        try {
          setLoading(true);
          const response = await fetchUserStats(fetch.id);
          if (response.success) {
            setUserData(response.userData);
          }
        } catch (error) {
          console.error("Error fetching user stats:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getUserData();
  }, [fetch?.id]);

  // Effect to check and update streak
  useEffect(() => {
    if (fetch?.id) {
      useStreakStore.getState().checkAndUpdateStreak(fetch.id);
    }
  }, [fetch?.id]);

  if (load_profile || loading || loadingRoadmap || loadingLessons) return <Loading />;

  const userDisplayData = userData || fetch;

          // Calculate experience for the current level - FIXED 100 XP per level
  const calculateLevelExperience = (level) => {
    // Each level requires 100 XP
    return level * 100;
  };

  // Calculate current level progress
  const calculateLevelProgress = (currentExp, level) => {
    // With 100 XP per level, calculations become simpler
    
    // Total XP needed for current level completion
    const currentLevelTotalExp = level * 100;
    
    // Total XP needed for previous level completion
    const prevLevelTotalExp = (level - 1) * 100;
    
    // Calculate the exp within the current level (between 0-100)
    const expInCurrentLevel = currentExp - prevLevelTotalExp;
    
    // Each level always needs 100 XP
    const expNeededForLevel = 100;
    
    return {
     current: Math.max(1, expInCurrentLevel), // Always show at least 1 XP progress
  total: expNeededForLevel
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
            <ProfileDetails
              initialImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              name={
                userDisplayData.first_name + " " + userDisplayData.last_name
              }
              level={userDisplayData.level}
              experience={calculateLevelProgress(userDisplayData.current_exp || 0, userDisplayData.level).current}
              totalExperience={calculateLevelProgress(userDisplayData.current_exp || 0, userDisplayData.level).total}
              continueLearning="JavaScript Basics"
              hours={2}
              withAssessment={true}
              progress={40}
            />
          </>
        )}

         {/* Render the LevelRewards component without its button */}
         <LevelRewards 
          isOpen={isRewardsOpen} 
          onOpenChange={setIsRewardsOpen}
          userId={userDisplayData?.id}
          renderButton={true} // Don't render the button in the component
          />     
         
         

        <main className="grid grid-cols-2 w-full mt-20 px-10 lg:px-30 xl:px-45 gap-y-20 gap-x-25">
          {/****************  
            Badges Section 
          ****************/}
          <Skills_Component titles={lessonData} />

          {/**************** 
              Streak Section 
          ****************/}
          <Streak_Component
            streak={!isError ? streak || userDisplayData.streaks || 0 : 0}
            previous_best={
              !isError ? bestStreak || userDisplayData.best_streak || 0 : 0
            }
            quests_finished={
              !isError
                ? userDisplayData.finished_quests || totalCompletedQuests
                : 0
            }
            roadmap_progress={
              !isError
                ? roadmapData
                : []
            }
            setRoadmapIndex={setRoadmapIndex}
          />

          {/****************  
              Skills Section 
          ******************/}
          <SkinBadgesTabs /> 

          {/**************** 
            Charts Section 
          ****************/}
          <Tabs_Component
            linechartData={
              !isError && profile?.line_chart_data
                ? profile.line_chart_data
                : []
            }
            radarData={
              !isError && profile?.radar_chart_data
                ? profile.radar_chart_data
                : []
            }
            summary="Summary of your progress"
          />

          {/********************** 
              Skill Trees Section 
          ***********************/}
          {/* <Finished_Roadmap_Component /> */}

          {/*********************************************************************** 
            Career Opportunities Section - Enhanced with borders and interactions 
          ************************************************************************/}
          <CareerOpportunities />
        </main>
      </div>
    </>
  );
}
