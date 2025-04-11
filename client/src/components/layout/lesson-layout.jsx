import { Outlet } from "react-router-dom";
import Header from "@/components/layout/lesson/header-navigator";
import { useQuery } from "@tanstack/react-query";
import { fetchLessonAIdata } from "@/api/FETCH"; // Adjust the import path as needed
import Loading from "@/routes/Loading";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useEffect } from "react";

export default function LessonLayout({ children }) {
  const setLessonFetch = useLessonFetchStore((state) => state.setFetch);
  const {
    data: lessonData,
    isLoading,
    isError,
  } = useQuery(fetchLessonAIdata());

  useEffect(() => {
    if (lessonData) setLessonFetch(lessonData);
  }, [lessonData]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading user data.</div>;

  return (
    <>
      <Header id={lessonData.id} isAssessment={lessonData.assessment} />
      <Outlet />
      {children}
    </>
  );
}
