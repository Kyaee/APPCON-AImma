import { Background } from "@/components/layout/background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import QuestPanel from "@/components/layout/dashboard-roadmap/QuestPanel";
import StreakPanel from "@/components/layout/dashboard-roadmap/StreakPanel";
import Sidebar from "@/components/layout/dashboard-roadmap/Sidebar";
import RoadmapHeader from '@/components/layout/dashboard-roadmap/RoadmapHeader';
import { useState } from "react";

export default function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarToggle = () => {
    console.log('Toggling sidebar');
    setIsSidebarExpanded(prev => !prev);
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

      {/* Main Content Area */}
      <div className="flex">
        {/* Roadmap Section (Middle) - Adjusted width */}
        <div className={`transition-all duration-300 min-h-screen
          ${isSidebarExpanded ? 'ml-[20%] w-[55%]' : 'ml-[60px] w-[70%]'}`}>
          <RoadmapHeader 
            currentCourse="Web Development"
            progression={10}
            courseOptions={[
              "Web Development",
              "Quality Assurance",
              "Mobile Development"
            ]}
            className={`${isSidebarExpanded ? 'ml-10' : 'ml-4'}`}
          />
          {/* Add your roadmap content here */}
        </div>

        {/* Right Panel Section */}
        <div className="fixed right-0 top-0 w-[25%] p-4 mt-30 space-y-4 pr-8">
          <StreakPanel />
          <QuestPanel />
        </div>
      </div>
    </div>
  );
}
