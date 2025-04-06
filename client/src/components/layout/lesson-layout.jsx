import { Outlet } from "react-router-dom";
import Header from "@/components/layout/lesson/header-navigator";
import { useQuery } from "@tanstack/react-query";
import { fetchLessonAIdata } from "@/api/FETCH"; // Adjust the import path as needed
import Loading from "@/routes/loading";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useEffect } from "react";
import { useAuth } from "@/config/authContext";

export default function LessonLayout({ children }) {
  const setLessonFetch = useLessonFetchStore((state) => state.setFetch);
  const {
    data: lessonData,
    isLoading,
    isError,
  } = useQuery(fetchLessonAIdata());
  const { session } = useAuth(); // Get the session from the auth context

  useEffect(() => {
    console.log("User data:", lessonData);
    if (lessonData) setLessonFetch(lessonData);
  }, [lessonData]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading user data.</div>;

  return (
    <>
      <Header 
        id={lessonData.id} 
        isAssessment={lessonData.assessment} 
        userId={session?.user?.id} // Pass the user ID to the Header component
      />
      <Outlet />
      {children}
    </>
  );
}
