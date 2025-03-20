import { useState } from "react";
import { Background } from "@/components/layout/background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import ProfileUpload from "@/routes/Profile/ProfileUpload";
import StatisticsComponent from '@/routes/profile/StatisticsComponent'; 
import SkillsAndBadges from "@/routes/profile/SkillsAndBadges";
import SkillTreeCareerOpportunities from "@/routes/profile/SkillTreeCareerOpportunities";
import LearningModule from "@/routes/profile//LearningModule";  



export default function Profile() {

  const chartData = [5, 7, 3, 8, 6, 9]; // Example data
  const strengthDescription = 'good';


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

      {/* Profile Content */}
     <ProfileUpload
        initialImageUrl="your-initial-image.jpg"
        name="Dwayne Johnson Malimutin"
        level={1}
        experience={30}
        totalExperience={100}
      />

      {/* Skills and Badges */}
      <SkillsAndBadges />
      {/* graph */}        
       <div>
        <StatisticsComponent />
       </div> 
     {/* Career Opportunities */}
      <SkillTreeCareerOpportunities />
  




    </div>
  );
}