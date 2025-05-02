import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/config/AuthContext";
import { useFetchStore } from "@/store/useUserData";
import { useEffect } from "react";
import { fetchUserdata } from "@/api/FETCH";
import { useNavigation } from "@/context/navigationContext";

import { Background } from "@/components/layout/Background";
import MainNav from "@/components/layout/main-nav";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import Loading from "@/routes/Loading";

export default function MainLayout({ children }) {
  const setFetch = useFetchStore((state) => state.setFetch);
  const { session } = useAuth();
  const { data: userData, isLoading, isError } = useQuery(fetchUserdata());
  const { suppressNavigation } = useNavigation();

  useEffect(() => {
    if (userData) setFetch(userData);
  }, [userData]);

  if (isLoading) return <Loading />;

  return (
    <div className="select-none">
      <Background />
      {suppressNavigation !== "main" && <MainNav userId={session.user.id} />}

      <div className="fixed top-8 right-15 flex items-start xl:w-[18%] 2xl:w-auto justify-around flex-wrap gap-5 z-50">
        <StatsDisplay
          hearts={userData?.lives}
          gems={userData?.gems}
          userId={session?.user?.id}
        />
        <ActionIcons notification={session?.user?.created_at} />
      </div>
      {isError && <div className="bg-red-400 py-5 text-lg text-center text-white font-bold ">
        Error loading user data.
      </div>}

      <Outlet />
      {children}
    </div>
  );
}
