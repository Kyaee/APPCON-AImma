import Loading from "@/routes/Loading";
import { createNewRoadmap } from "@/api/INSERT";
import { useAuth } from "@/config/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRoadmapAIdata } from "@/api/FETCH";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// CREATE REDIRECT

export default function ProcessDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [processingStatus, setProcessingStatus] = useState("loading");

  // Get the user ID from URL query parameters if available
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user") || session?.user?.id;

  const queryOptions = fetchRoadmapAIdata();

  const {
    data: roadmapData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    ...queryOptions,
    refetchOnWindowFocus: false,
    staleTime: 0,
    retry: 2,
  });

  const processRoadmap = async () => {
    if (!userId) {
      console.error("No user ID available for roadmap generation");
      setProcessingStatus("error");
      return;
    }

    if (!roadmapData) {
      console.log("No roadmap data available yet, waiting...");
      return;
    }

    try {
      setProcessingStatus("processing");
      console.log("Processing roadmap data:", roadmapData);

      const roadmapArray = Array.isArray(roadmapData)
        ? roadmapData
        : [roadmapData];

      await createNewRoadmap(roadmapArray, userId);
      console.log("Roadmap data created successfully for user:", userId);

      // Invalidate any existing dashboard queries to ensure fresh data
      await queryClient.invalidateQueries(["roadmap", userId]);
      await queryClient.invalidateQueries(["userStats", userId]);
      await queryClient.invalidateQueries(["fetch_user"]);

      setProcessingStatus("success");
      // Add a small delay before navigation to ensure state updates complete
      setTimeout(() => {
        navigate(`/dashboard/${userId}?t=${Date.now()}`);
      }, 500);
    } catch (error) {
      console.error("Error creating roadmap:", error);
      setProcessingStatus("error");
    }
  };

  useEffect(() => {
    // Ensure we have fresh data when the component mounts
    refetch();
  }, []);

  useEffect(() => {
    if (roadmapData && processingStatus === "loading") {
      processRoadmap();
    }
  }, [roadmapData, processingStatus]);

  // If redirection is needed immediately (fixing direct navigation)
  useEffect(() => {
    if (processingStatus === "success") {
      // Fix: Use correct URL format - path parameter instead of query parameter
      navigate(`/dashboard/${userId}?t=${Date.now()}`);
    }
  }, [processingStatus, userId, navigate]);

  if (
    isLoading ||
    processingStatus === "loading" ||
    processingStatus === "processing"
  ) {
    return <Loading generate_roadmap={true} />;
  }

  return (
    <>
      {isError || processingStatus === "error" ? (
        <div className="mt-32 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Error</h2>
          <p className="mt-4">
            An error occurred while generating your personalized roadmap.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
            onClick={() => {
              setProcessingStatus("loading");
              refetch();
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <Loading generate_roadmap={true} />
      )}
    </>
  );
}
