import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/config/supabase";

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
    queryFn: async () => 
    {
      const { data: userData, error } = await supabase
        .from("users")
        .select("*");
      if (error) 
        throw new Error(error.message);
      if (!userData || userData.length === 0)
        throw new Error("No user data found");
      return userData[0];
    },
  });
}

/***********************************
2*        FETCH ROADMAP DATA
 ************************************/
export function fetchRoadmap() {
  return queryOptions({
    queryKey: ["roadmap"],
    queryFn: fetchRoadmapData,
  });
}

async function fetchRoadmapData() {
  const { data, error } = await supabase
    .from("roadmap")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

/***********************************
3*        FETCH LESSON DATA
 ************************************/
export function fetchLesson(lessonId) {
  return queryOptions({
    queryKey: ["lesson", lessonId],
    queryFn: fetchLessonData(),
  });
}

const fetchLessonData = async (lessonId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();
  console.log("lesson data", data);
  if (error) throw new Error(error.message);
  return data;
};

/***********************************
 *          FETCH PROFILE
 **************************************/
export function fetchProfile(userId) {
  return queryOptions({
    queryKey: ["profile"],
    queryFn: ()=> fetchProfileData(userId),
  });
}

const fetchProfileData = async (id) => {
  const { data, error } = await supabase
  .from("profile")
  .select()
  .eq("user_id", id)
  if (error) throw new Error(error.message);
  return data[0];
}

/***********************************
 *          FETCH ALL
 * ************************************/
export function fetchAll() {
  return queryOptions({
    queryKey: ["all"],
    queryFn: {},
  });
}
