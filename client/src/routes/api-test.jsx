import { useQuery, useQueries } from "@tanstack/react-query";
import { useFetchStore } from "@/store/useUserData";
import { fetchUserdata, fetchRoadmapAIdata } from "@/api/FETCH";
import { useAuth } from "@/config/authContext";
import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/config/supabase"; // Adjust the import path as needed
import { createNewRoadmap } from "@/api/INSERT"; // Adjust the import path as needed


export default function apiTest() {
  // useEffect(() => {
  //   // postData();
  // }, []);

  const data = {
    prompt_roadmap_generate:
      "Generate a roadmap including the following details:\n- Difficulty (Easy, Intermediate, Hard)\n- Lesson duration\n- Whether it includes an assessment (answer in true/false)\n\nThe roadmap should be tailored for a {User_classification} {User_Type} user, who has a daily goal of {daily_goal}. The lessons should be based on interests such as {interests}. Do not include the actual content but provide a structure to generate the lesson in the next prompt.\n\nFormat:\n- Name\n- Difficulty\n- Duration\n- Daily goal\n- Assessment(returns true/false)",
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generate-roadmap",
        data
      );

      if (response.error) {
        console.error("Error:", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const { data: roadmapDataFromAI, isLoading: load_roadmap } = useQuery( fetchRoadmapAIdata() );
  if (load_roadmap) return <div>Loading...</div>;
  
  // const saveRoadmapData = () => {
  //     roadmapDataFromAI.forEach(roadmap => insertRoadmapWithLessonsMutation.mutate(roadmap));
  // };

  // const insertRoadmapWithLessonsMutation = useMutation({
  //   mutationFn: createNewRoadmap(roadmap)
  //   },
  //   {
  //     onSuccess: () => {
  //       console.log("Roadmap and lessons inserted successfully!");
  //     },
  //     onError: (error) => {
  //       console.error("Error inserting roadmap and lessons:", error);
  //     },
  //   }
  // );

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      HEYYYYYYYYYYYYYYYYYYYYY API TEST
      {
        
        roadmapDataFromAI?.map((roadmap, index) => (
          <div key={index} className="p-4 m-2 bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{roadmap.roadmap_name}</h2>
            <p>{roadmap.description}</p>
            {roadmap.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="p-2 m-2 bg-gray-300 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{lesson.lesson_name}</h3>
                <p>Duration: {lesson.duration}</p>
                <p>Assessment: {lesson.assessment ? "Yes" : "No"}</p>
                <p>Category: {lesson.category}</p>
              </div>
            ))}

          </div>
        ))
      }
    </div>
  );
}
