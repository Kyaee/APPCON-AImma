import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/config/authContext";
import { useFetchStore } from "@/store/useUserData";
import { useEffect } from "react";
import { fetchUserdata } from "@/api/FETCH";

import { Background } from "@/components/layout/Background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import Loading from "@/routes/Loading";

export default function MainLayout({ children }) {
  const setFetch = useFetchStore((state) => state.setFetch);
  const { session } = useAuth();
  const { data: userData, isLoading, isError } = useQuery(fetchUserdata());

  useEffect(() => {
    if (userData) setFetch(userData);
  }, [userData]);

  if (isLoading) return <Loading />;

  if (isError) return <div>Error loading user data.</div>;

  return (
    <div className="select-none">
      <Background />
      <MainNav userId={session.user.id} />

      <div className="fixed top-8 right-15 flex items-center gap-5 z-50">
        <StatsDisplay
          hearts={userData.lives}
          gems={userData.gems}
          userId={session?.user?.id}
        />
        <ActionIcons notification={session?.user?.created_at} />
      </div>

      <Outlet />
      {children}
    </div>
  );
}
