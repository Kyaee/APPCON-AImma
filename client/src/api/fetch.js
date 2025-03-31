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
    queryKey: ["user"],
    queryFn: fetchData,
  });
}

const fetchData = async () => {
  const { data: res, error } = await supabase
    .from("users")
    .select("*")
    .single();
  if (error) throw error;
  return res[0]; // No need for JSON.stringify
};


/***********************************
2*        FETCH ROADMAP DATA
 ************************************/
export function fetchRoadmap() {
  return queryOptions({
    queryKey: ["roadmap"],
    queryFn: fetchRoadmapData,
  });
}

const fetchRoadmapData = async () => {
  const { data, error } = await supabase
    .from("roadmap")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

/***********************************
3*        FETCH LESSON DATA
 ************************************/
export function fetchLesson(lessonId) {
  return queryOptions({
    queryKey: ["lesson", lessonId],
    queryFn: fetchLessonData,
  })
}

const fetchLessonData = async (lessonId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();
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
  })
}