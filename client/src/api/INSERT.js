import { supabase } from "@/config/supabase";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

/**************************************
 *        POST ROADMAP PROMPT
 **************************************/
export const postPrompt1 = async () => {
  const prompt_roadmap = {
    prompt_roadmap_generate: `
      Generate a {name} roadmap including the following details:
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
      - Duration with time unit (e.g., 30 minutes, 1 hour)
      - Daily goal
      - status (returns "locked", "in_progress", or no output if unlocked)
      - Assessment(returns true or false)
    `,
  };
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
 *        POST LESSON PROMPT
 **************************************/

export const postPrompt2 = async (
  lesson_name,
  id,
  lesson_category,
  lesson_difficulty,
  lesson_gems,
  lesson_expierence,
  lesson_duration,
  lesson_assessment
) => {
  const prompt_lesson = `
    Generate a ${lesson_name} lesson plan for the following topic
  `;
  try {
    const requestBody = {
      prompt_lesson_generate: prompt_lesson,
      lesson_id: id,
      lesson_name: lesson_name,
      category: lesson_category,
      difficulty: lesson_difficulty,
      gems: lesson_gems,
      exp: lesson_expierence,
      duration: lesson_duration,
      assessment: lesson_assessment,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/generate-lesson",
      requestBody
    );

    if (response.data?.error) console.error("Error:", response.data.error);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    window.location.href = `/lesson/${id}`;
  }
};

/**************************************
 *       POST ASSESSMENT PROMPT
 **************************************/
export const postPrompt3 = async (lesson_id, lesson_name, lesson_content) => {
  try {
    const requestBody = {
      prompt_assessment_generate: `Generate 7 assessment questions for ${lesson_name} with the following content: ${lesson_content}`,
      id: lesson_id,
      name: lesson_name,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/generate-assessment",
      requestBody
    );

    if (response.data?.error) console.error("Error:", response.data.error);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    window.location.href = `/l/${lesson_id}/assessment`;
  }
};

export function useSummary() {
  const postprompt4 = async (id, name, difficulty, answers) => {
    const requestBody = {
      prompt_summary_generate: `
      Generate a short evaluation of the user's assessment of ${answers} 
      for the lesson ${name}:
  
      Response format: 
      - summary: 1-2 lines and another 1-2 lines for user feedback
      - radarchart: 
      `,
      lesson_id: id,
      lesson_name: name,
      difficulty_level: difficulty,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/generate-summary",
      requestBody
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  };

  const { mutate: createSummary, isError } = useMutation({
    mutationFn: postprompt4,
    onSuccess: (data) => {
      console.log("Data:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return { createSummary, isError };
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
        status: lesson.status,
        lesson_description: lesson.description,
        user_id: userId,
      }));

      const { error: lessonsError } = await supabase
        .from("lessons")
        .insert(lessonsToInsert);

      if (lessonsError) throw lessonsError;
    }
  });
};

/**************************************
 *   POST LESSON DATA TO SUPABASE
 **************************************/
export const createNewLesson = async (lesson, userId) => {
  const { data: lessonData, error: lessonError } = await supabase
    .from("lessons")
    .insert([
      {
        user_id: userId,
        lesson_name: lesson.lesson_name,
        lesson_category: lesson.category,
        lesson_difficulty: lesson.difficulty,
        lesson_duration: lesson.duration,
        assessment: lesson.assessment,
        status: lesson.status,
        lesson_description: lesson.description,
      },
    ])
    .select("*");

  if (lessonError) throw lessonError;
  return lessonData[0].lesson_id;
};
