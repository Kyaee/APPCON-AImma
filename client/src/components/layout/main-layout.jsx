import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchUserdata from "@/api/fetchUserData";
import { useAuth } from "@/config/authContext";

import { Background } from "@/components/layout/background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";

export default function MainLayout({ children }) {
  const { data: userData, isLoading, isError } = useQuery(fetchUserdata());
  const { session } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      <Background />
      <MainNav userId={session.user.id} />

      <div className="fixed top-8 right-15 flex items-center gap-5 z-50">
        <StatsDisplay gems={userData.gems} hearts={userData.lives} />
        <ActionIcons />
      </div>

      <Outlet />
      {children}
    </div>
  );
}
