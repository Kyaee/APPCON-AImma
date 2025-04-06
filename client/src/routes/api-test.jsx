import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchUserdata, fetchRoadmapAIdata } from "@/api/FETCH";
import { useAuth } from "@/config/authContext";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/config/supabase"; // Adjust the import path as needed
import { postPrompt1, createNewRoadmap } from "@/api/INSERT"; // Adjust the import path as needed

export default function apiTest() {
  // useEffect(() => {
  //   postPrompt1();
  // }, []);
  const { session } = useAuth();

  const { data: roadmapDataFromAI, isLoading: load_roadmap } = useQuery(
    fetchRoadmapAIdata()
  );
  if (load_roadmap) return <div>Loading...</div>;

  const saveRoadmapData = () => {
    createNewRoadmap(roadmapDataFromAI, session.user.id);
  };

  return (
    <div className="h-full w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <button onClick={saveRoadmapData}>Click me</button>
      {roadmapDataFromAI?.map((roadmap, index) => (
        <div key={index} className="p-4 m-2 bg-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{roadmap.roadmap_name}</h2>
          <p>{roadmap.description}</p>
          {roadmap.lessons.map((lesson, lessonIndex) => (
            <div
              key={lessonIndex}
              className="p-2 m-2 bg-gray-300 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold">{lesson.lesson_name}</h3>
              <p>Duration: {lesson.duration}</p>
              <p>Assessment: {lesson.assessment ? "Yes" : "No"}</p>
              <p>Category: {lesson.category}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
