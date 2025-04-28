import { supabase } from "@/config/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";


/*      TABLE OF CONTENTS
 ****************************************
 *      1. fetch user data
 *      2. fetch roadmap data
 *      3. fetch lesson data
 *      4. fetch badges data
 */

/***********************************
1*        FETCH USER DATA
 ************************************/

export function fetchUserdata() {
  return queryOptions({
    queryKey: ["fetch_user"],
    queryFn: async () => {
      const { data: userData, error } = await supabase
        .from("users")
        .select("*");
      if (error) throw new Error(error.message);
      if (!userData || userData.length === 0)
        throw new Error("No user data found");
      
      return userData[0];
    },
    refetchOnMount: "if-stale",      // Only refetch if stale
    refetchOnWindowFocus: "if-stale", // Only refetch if stale
    staleTime: 60000,                // Consider data stale after 1 minute instead of 1 second
  });
}

/***********************************
2*        FETCH ROADMAP DATA
 ************************************/
export function fetchRoadmap(id) {
  return queryOptions({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmap")
        .select("*")
        .eq("user_id", id)
        .order("roadmap_name", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 60000, // Add a reasonable stale time
  });
}

/***********************************
3*        FETCH LESSON DATA
 ************************************/

export const fetchLesson = async (roadmapId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("roadmap_id", roadmapId)
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

/***********************************
 *          FETCH PROFILE
 **************************************/
export function fetchProfile(userId) {
  return queryOptions({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfileData(userId),
  });
}

const fetchProfileData = async (id) => {
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("user_id", id);
    console.log("Profile data:", data); // Log the fetched profile data
  if (error) throw new Error(error.message);
  return data;
};

/***********************************
 *        FETCH FROM AI DATA
 ************************************/
export function fetchRoadmapAIdata() {
  return queryOptions({
    queryKey: ["roadmapAi"],
    queryFn: async () => {
      const response = await axios
      .get("https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/get-roadmap")
      .catch((error) => {
          console.error("Error fetching roadmap AI data:", error);
          throw error;
        });
      if (response.status !== 200) {
        throw new Error("Failed to fetch roadmap AI data");
      }
      return response.data;
    },
  });
}

export function fetchLessonAIdata() {
  return queryOptions({
    queryKey: ["lessonAi"],
    queryFn: async () => {
      const response = await axios
        .get("https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/get-lesson")
        .catch((error) => {
          console.error("Error fetching roadmap AI data:", error);
          throw error;
        });
      if (response.status !== 200) {
        throw new Error("Failed to fetch roadmap AI data");
      }
      return response.data;
    },
  });
}

export function fetchLessonAssessmentData() {
  return queryOptions({
    queryKey: ["lessonAssessment"],
    queryFn: async () => {
      const response = await axios
        .get("https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/get-assessment")
        .catch((error) => {
          console.error("Error fetching lesson assessment data:", error);
          throw error;
        });
      console.log("Lesson assessment data:", response.data); // Log the fetched lesson assessment data
      if (response.status !== 200) {
        throw new Error("Failed to fetch lesson assessment data");
      }
      return response.data;
    },
  });
}

export function useFetchSummary() { 
  const { data: evaluationData, isLoading: isEvaluationLoading } = useQuery({
    queryKey: ["evaluation"],
    queryFn: async () => {
      const response = await axios
        .get("https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/get-summary")
        .catch((error) => {
          console.error("Error fetching evaluation data:", error);
          throw error;
        });
      if (response.status !== 200) {
        throw new Error("Failed to fetch evaluation data");
      }
      return response.data;
    },
  });

  return {
    evaluationData,
    isEvaluationLoading,
  };
}