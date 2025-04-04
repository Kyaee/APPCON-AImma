import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { useFetchStore } from "@/store/useUserData";
import { fetchProfile, fetchRoadmapAIdata } from "@/api/FETCH";

// Components & Icons
import ProfileDetails from "@/routes/profile/ProfileDetails";
import CareerOpportunities from "./profile/career-opportunities-profile";
import Finished_Roadmap_Component from "./profile/finished-roadmaps";
import Streak_Component from "./profile/streak-profile";
import Tabs_Component from "./profile/tabs-profile";
import Badges_Component from "./profile/badges-profile";
import Skills_Component from "./profile/skills-profile";
import Loading from "@/routes/loading";

export default function Profile() {
  const fetch = useFetchStore((state) => state.fetch);

  const {
    data: profile,
    isLoading: load_profile,
    isError,
  } = useQuery(fetchProfile(fetch.id));

  if (load_profile) return <Loading />;

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
              name={fetch.first_name + " " + fetch.last_name}
              level={fetch.level}
              experience={40}
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
              Skills Section 
          ******************/}
          <Badges_Component />

          {/****************  
            Badges Section 
          ****************/}
          <Skills_Component titles={skills} />

          {/**************** 
            Charts Section 
          ****************/}
          <Tabs_Component
            linechartData={
              !isError && profile?.line_chart_data ? profile.line_chart_data : []
            }
            radarData={
              !isError && profile?.radar_chart_data ? profile.radar_chart_data : []
            }
            summary="Summary of your progress"
          />

          {/**************** 
              Streak Section 
          ****************/}
          <Streak_Component
            streak={!isError ? fetch.streaks : 0}
            previous_best={
              !isError && profile.best_streak ? profile.best_streak : 0
            }
            quests_finished={!isError ? 12 : 0}
            skill_progress={
              !isError
                ? [
                    { title: "Data Analysis with Python", progress: 75 },
                    { title: "Minecraft 2", progress: 50 },
                    { title: "TypeScript", progress: 0 },
                  ]
                : []
            }
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
