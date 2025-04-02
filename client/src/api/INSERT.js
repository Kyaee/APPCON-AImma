import { supabase } from "@/config/supabase";
import axios from "axios";

/**************************************
 *        POST ROADMAP PROMPT
 **************************************/
const prompt_roadmap = {
  prompt_roadmap_generate: `
    Generate a javascript roadmap including the following details:
    - Difficulty (Easy, Intermediate, Hard)
    - Lesson duration
    - Whether it includes an assessment (answer in true/false)

    The roadmap should be tailored for a {User_classification} {User_Type} user, 
    who has a daily goal of {daily_goal}. 
    The lessons should be based on interests such as {interests}. 
    Do not include the actual content but provide a structure to generate the lesson in the next prompt.

    Format:
    - Name
    - Difficulty
    - Duration
    - Daily goal
    - Assessment(returns true/false)
  `,
};

export const postPrompt1 = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/generate-roadmap",
      prompt_roadmap
    );

    if (response.error) {
      console.error("Error:", response.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

/**************************************
 *   POST ROADMAP DATA TO SUPABASE
 **************************************/
export const createNewRoadmap = async (roadmaps, userId) => {
  roadmaps.map(async (roadmap) => {
    const { data: roadmapData, error: roadmapError } = await supabase
      .from("roadmap")
      .insert([
        {
          user_id: userId,
          roadmap_name: roadmap.roadmap_name,
          description: roadmap.description,
        },
      ])
      .select("*");
    if (roadmapError) throw roadmapError;

    const roadmapId = roadmapData[0].roadmap_id;

    // Insert lessons with the roadmap_id reference
    if (roadmap.lessons?.length > 0) {
      const lessonsToInsert = roadmap.lessons.map((lesson) => ({
        roadmap_id: roadmapId,
        lesson_name: lesson.lesson_name,
        lesson_category: lesson.category,
        lesson_difficulty: lesson.difficulty,
        lesson_duration: lesson.duration,
        assessment: lesson.assessment,
      }));

      const { error: lessonsError } = await supabase
        .from("lessons")
        .insert(lessonsToInsert);

      if (lessonsError) throw lessonsError;
    }
  });
};
