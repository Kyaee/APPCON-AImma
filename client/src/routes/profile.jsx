import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { useFetchStore } from "@/store/useUserData";
import { fetchProfile, fetchRoadmap, fetchLesson  } from "@/api/FETCH";
import { useQuestStore } from "@/store/useQuestStore";
import { fetchUserStats } from "@/api/UPDATE";
import { useEffect, useState } from "react";
import { useStreakStore } from "@/store/useStreakStore";

// Components & Icons
import ProfileDetails from "@/components/profile/ProfileDetails";
import CareerOpportunities from "../components/profile/CareerOpportunities";
import Finished_Roadmap_Component from "../components/profile/FinishedRoadmaps";
import Streak_Component from "../components/profile/Streak";
import Tabs_Component from "../components/profile/TabsProfile";
import Badges_Component from "../components/profile/BadgesProfile";
import Skills_Component from "../components/profile/SkillsProfile";
import Loading from "@/routes/Loading";
import CapySkin from "../components/profile/CapySkins";
import SkinBadgesTabs from "../components/profile/SkinsTab";


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

  const {
    data: profile,
    isLoading: load_profile,
    isError,
  } = useQuery(fetchProfile(fetch.id));
  
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

  if (load_profile || loading) return <Loading />;

  const skills = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "GraphQL",
    "TypeScript",
  ];

  const badges = [
    { id: 1, title: "Badge 1", description: "Description 1", image: "image1" },
    { id: 2, title: "Badge 2", description: "Description 2", image: "image2" },
  ];

  // Use userData if available, fallback to fetch data
  const userDisplayData = userData || fetch;

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
            {/* Profile Content */}
            <ProfileDetails
              initialImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              name={
                userDisplayData.first_name + " " + userDisplayData.last_name
              }
              level={userDisplayData.level}
              experience={userDisplayData.current_exp || 0}
              totalExperience={100}
              continueLearning="JavaScript Basics"
              hours={2}
              withAssessment={true}
              progress={40}
            />
          </>
        )}

        <main className="grid grid-cols-2 w-full mt-20 px-10 lg:px-30 xl:px-45 gap-y-20 gap-x-25">
          {/****************  
            Badges Section 
          ****************/}
          <Skills_Component titles={skills} />

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
                ? [
                  { title: "Data Analysis with Python", progress: 75 },
                  { title: "Minecraft 2", progress: 50 },
                  { title: "TypeScript", progress: 0 },
                ] 
                : []
            }
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
