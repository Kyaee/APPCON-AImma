import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/config/supabase";
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
    .eq("roadmap_id", lessonId);
  if (error) throw new Error(error.message);
  console.log("lesson data: ", data);
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
  if (error) throw new Error(error.message);
  return data[0];
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
        .get("http://127.0.0.1:8000/api/get-roadmap")
        .catch((error) => {
          console.error("Error fetching roadmap AI data:", error);
          throw error;
        });
      if (response.status !== 200) {
        throw new Error("Failed to fetch roadmap AI data");
      }
      console.log("roadmap AI data", response.data);
      return response.data;
    },
  });
}

export function fetchLessonAIdata() {
  return queryOptions({
    queryKey: ["lessonAi"],
    queryFn: async () => {
      const response = await axios
        .get("http://127.0.0.1:8000/api/get-lesson")
        .catch((error) => {
          console.error("Error fetching roadmap AI data:", error);
          throw error;
        });
      if (response.status !== 200) {
        throw new Error("Failed to fetch roadmap AI data");
      }
      console.log("roadmap AI data", response.data);
      return response.data;
    },
  });
}

export function fetchLessonAssessmentData() {
  return queryOptions({
    queryKey: ["lessonAssessment"],
    queryFn: async () => {
      const response = await axios
        .get("http://127.0.1:8000/api/get-assessment")
        .catch((error) => {
          console.error("Error fetching lesson assessment data:", error);
          throw error;
        });
      if (response.status !== 200) {
        throw new Error("Failed to fetch lesson assessment data");
      }
      console.log("lesson assessment data", response.data);
      return response.data;
    },
  });
}
