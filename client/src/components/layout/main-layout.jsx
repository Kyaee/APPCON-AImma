import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/config/authContext";
import { useUserDataStore } from "@/store/useUserData";
import { useEffect } from "react";
import { fetchUserdata } from "@/api/fetch";

import { Background } from "@/components/layout/background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import Loading from "@/routes/loading";

export default function MainLayout({ children }) {
  // const setUserData = useUserDataStore((state) => state.setUserData);
  // const { data: userData, isLoading, isError } = useQuery(fetchUserdata());
  const { session } = useAuth();

  // useEffect(() => {
  //   setUserData(userData);
  //   // console.log(roadmap);
  // }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   return <div>Error loading user data.</div>;
  // }

  return (
    <div>
      <Background />
      <MainNav userId={session.user.id} />

      <div className="fixed top-8 right-15 flex items-center gap-5 z-50">
        {/* <StatsDisplay gems={userData.gems} hearts={userData.lives} /> */}
        <ActionIcons />
      </div>

      <Outlet />
      {children}
    </div>
  );
}
