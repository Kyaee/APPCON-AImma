import { CategoryScale } from "chart.js"; Chart.register(CategoryScale);
import { lineChart, radarChart } from "@/components/features/charts/sampleData";
import Chart from "chart.js/auto";

// Components & Icons
import ProfileDetails from "@/routes/profile/ProfileDetails";
import CareerOpportunities from "./profile/career-opportunities-profile";
import Finished_Roadmap_Component from "./profile/finished-roadmaps";
import Streak_Component from "./profile/streak-profile";
import Tabs_Component from "./profile/tabs-profile";
import Badges_Component from "./profile/badges-profile";
import Skills_Component from "./profile/skills-profile";

export default function Profile() {
  // const { data: userContent } = useQuery(fetchUserdata())
  
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


        {/* Profile Content */}
        <ProfileDetails
          initialImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          name={"Maria Priscella Aiselle C. Bautista"}
          // level={userContent?.level}
          experience={40}
          totalExperience={100}

          continueLearning="JavaScript Basics"
          hours={2}
          withAssessment={true}
          progress={40}
        />

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
            linechartData={lineChart}
            radarData={radarChart}
            summary="Summary of your progress"
          />

          {/**************** 
            Streak Section 
          ****************/}
          <Streak_Component
            streak={5}
            previous_best={14}
            quests_finished={12}
            skill_progress={[
              { title: "Data Analysis with Python", progress: 75 },
              { title: "Minecraft 2", progress: 50 },
              { title: "TypeScript", progress: 0 },
            ]}
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
