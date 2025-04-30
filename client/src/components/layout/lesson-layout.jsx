import { Outlet } from "react-router-dom";
import Header from "@/components/layout/lesson/header-navigator";
import { useQuery } from "@tanstack/react-query";
import { fetchLessonAIdata } from "@/api/FETCH";
import Loading from "@/routes/Loading";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useEffect } from "react";
import { useNavigation } from "@/context/navigationContext";
import { useParams } from "react-router-dom";

export default function LessonLayout({ children }) {
  const lessonFetch = useLessonFetchStore((state) => state.fetch);
  const setLessonFetch = useLessonFetchStore((state) => state.setFetch);
  const scrollProgress = useLessonFetchStore((state) => state.scrollProgress);
  const { id } = useParams();
  const { suppressNavigation } = useNavigation();

  const {
    data: lessonData,
    isLoading,
    isError,
    refetch,
  } = useQuery(fetchLessonAIdata());
  const requestedIdNum = parseInt(id);
  const idMismatch =
    !isNaN(requestedIdNum) && lessonData?.id !== requestedIdNum;

  useEffect(() => {
    console.log(lessonData);
    if (lessonData) setLessonFetch(lessonData);
    if (idMismatch) {
      console.log(lessonFetch);
      setLessonFetch(lessonData);
      // window.location.reload();
      console.error(
        `ID mismatch: requested ${requestedIdNum}, fetched ${lessonData?.id}`
      );
      refetch();
    }
  }, [lessonData, idMismatch, setLessonFetch]);

  if (isLoading || idMismatch) return <Loading />;
  if (isError) return <div>Error loading lesson data.</div>;

  return (
    <>
      <Header
        id={lessonFetch?.id || lessonData.id}
        isAssessment={lessonFetch?.assessment}
        previousProgress={lessonFetch?.progress}
        scrollProgress={scrollProgress}
      />
      <Outlet />
      {children}
    </>
  );
}
