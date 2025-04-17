import Loading from "@/routes/Loading";
import { createNewRoadmap } from "@/api/INSERT";
import { useAuth } from "@/config/authContext";
import { useQuery } from "@tanstack/react-query";
import { fetchRoadmapAIdata } from "@/api/FETCH";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// CREATE REDIRECT

export default function ProcessDashboard({setAssessed}) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const {
    data: roadmapData,
    isLoading,
    isError,
  } = useQuery(fetchRoadmapAIdata());


  const processRoadmap = async () => {
    if (roadmapData && session?.user?.id) {
      try {
        await createNewRoadmap(roadmapData, session.user.id);
        console.log("Roadmap data created successfully");
        setAssessed(true)
        navigate(`/dashboard/${session?.user?.id}`);
      } catch (error) {
        console.error("Error creating roadmap:", error);
      }
    }
  };

  useEffect(() => {
    console.log(roadmapData);
    processRoadmap();
  }, [roadmapData]);

  if (isLoading) return <Loading />;
  return (
    <>
      {isError ? (
        <div className="mt-32 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Error</h2>
          <p className="mt-4">
            An error occurred while processing your request.
          </p>
        </div>
      ) :
        <Loading />
      }
    </>
  );
}
