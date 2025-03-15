import { Background } from "@/components/layout/background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import { supabase } from "@/config/supabase";

export default function Dashboard() {
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
            onClick={() => 
              console.log(supabase.auth.id)}
          />
          <ActionIcons
            type="settings"
            onClick={() => console.log("Settings clicked")}
          />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="pt-32 px-[19%]">
        <h1 className="text-[#4C4C4C] text-5xl font-extrabold mb-4">
          Dashboard
        </h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
