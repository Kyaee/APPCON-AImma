import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/config/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

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
    refetchOnMount: true,      // Refetch on component mount
    refetchOnWindowFocus: true, // Refetch when window regains focus
    staleTime: 1000,           // Consider data stale after 1 second
  });
}

/***********************************
2*        FETCH ROADMAP DATA
 ************************************/
export function fetchRoadmap(id) {
  return queryOptions({
    queryKey: ["roadmap"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmap")
        .select("*")
        .eq("user_id", id)
        .order("roadmap_name", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

/***********************************
3*        FETCH LESSON DATA
 ************************************/

export const fetchLesson = async (lessonId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("roadmap_id", lessonId)
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

/***********************************
 *          FETCH PROFILE
 **************************************/
export function fetchProfile(userId) {
  return queryOptions({
    queryKey: ["profile"],
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
 *          FETCH ALL
 * ************************************/
export function fetchAll() {
  return queryOptions({
    queryKey: ["all"],
    queryFn: {},
  });
}

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

export function useLessonAIData() {
  const fetchLessonAI = async () => {
    const response = await axios
      .get("https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/get-lesson")
      .catch((error) => {
        console.error("Error fetching roadmap AI data:", error);
        throw error;
      });
    if (!response.ok) throw new Error("Failed to fetch roadmap AI data");
    return response.data;
  };

  const { data: lessonData, isLoading: isLessonAILoading } = useQuery({
    queryKey: ["lessonAI"],
    queryFn: fetchLessonAI,
  });

  const insertToDatabase = async (passData, userId) => {
    const { error } = await supabase
      .from("lessons")
      .update({ content: passData.lesson })
      .eq("user_id", userId)
      .eq("id", passData.id);
    if (error) throw new Error(error.message);
    console.log("Data inserted successfully:");
  };

  return {
    lessonData,
    isLessonAILoading,
    insertToDatabase,
  };
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
      if (response.status !== 200) {
        throw new Error("Failed to fetch lesson assessment data");
      }
      return response.data;
    },
  });
}

export function useFetchSummary() { 
  const fetchEvaluation = async () => {
    return queryOptions({
      
    })
  }

  const { data: evaluationData, isLoading: isEvaluationLoading } = useQuery({queryKey: ["evaluation"],
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
    },});

  return {
    evaluationData,
    isEvaluationLoading,
  };
}