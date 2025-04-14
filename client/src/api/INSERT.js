import { supabase } from "@/config/supabase";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAssessmentStore } from "@/store/useAssessmentStore";

// const proficiencySkills = useAssessmentStore.getState().proficiencySkills;
// const appGoals = useAssessmentStore.getState().appGoals;
// const dailyTimeCommitment = useAssessmentStore.getState().dailyTimeCommitment;
// const assessmentAnswers = useAssessmentStore.getState().assessmentAnswers;
const language = useAssessmentStore.getState().language;
const userType = useAssessmentStore.getState().userType;
const educationLevel = useAssessmentStore.getState().educationLevel;
const previousExperience = useAssessmentStore.getState().previousExperience;
const careerTransition = useAssessmentStore.getState().careerTransition;
const dailyGoal = useAssessmentStore.getState().dailyGoal;
const technicalInterest = useAssessmentStore.getState().technicalInterest;
const technicalAnswers = useAssessmentStore.getState().technicalAnswers;

/**************************************
 *        POST ROADMAP PROMPT
 **************************************/
export function useGenerateRoadmap() {
  const prompt_roadmap = {
  prompt_roadmap_generate: `
    Generate a roadmap in ${JSON.stringify(language)} with the following details:

    The roadmap is tailored for a "${userType?.label}" ${JSON.stringify(educationLevel?.label || previousExperience || careerTransition)} user, 
    with a daily goal of ${JSON.stringify(dailyGoal)} (if two digits its minutes, else hours) .
    The lessons should be based on interests such as ${JSON.stringify(technicalInterest?.label)} and user personalization: ${JSON.stringify(technicalAnswers)}. 
    Do not include the actual content but provide a structure to generate the lesson in the next prompt.

    Format:
    - Roadmap Name, roadmap dailyGoal & roadmap descripton
    - Lesson Category in ARRAY
    - status each lesson(returns "locked" for premium access, "in_progress", or no output if unlocked)
    - Assessment(returns true or false)
    - Duration of each lesson with time unit (e.g., 30 minutes, 1 hour)
    - Gems & Exp rewarded per lesson
  `}

  const postPrompt1 = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generate-roadmap",
        prompt_roadmap
      );
      console.log(prompt_roadmap.prompt_roadmap_generate)
  
      if (response.error) console.error("Error:", response.error);
    } catch (error) {
      console.error("Error:", error);
  }};

  const { mutate: createRoadmap, isSuccess } = useMutation({
    mutationFn: postPrompt1,
    onSuccess: (data) => {
      console.log("Data:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return { createRoadmap, isSuccess };
}


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
export function useAssessment() {
  const postPrompt3 = async ({ lesson_id, lesson_name, lesson_content }) => {
    if (!lesson_id || !lesson_name || !lesson_content) {
      throw new Error("Invalid input parameters for postPrompt3");
    }
    const requestBody = {
      prompt_assessment_generate: `
      Generate 7 assessment questions for ${lesson_name} with the following content: ${lesson_content}
      The questions must only be "multiple-choice"
      `,
      id: lesson_id,
      name: lesson_name,
    };
    const response = await axios.post(
      "http://127.0.0.1:8000/api/generate-assessment",
      requestBody
    );
    if (response.data?.error) console.error("Error:", response.data.error);

    return response.data;
  };

  const {
    mutate: createAssessment,
    isError,
    isPending,
  } = useMutation({
    mutationFn: postPrompt3,
    onSuccess: (data) => {
      console.log("Data:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return { createAssessment, isError, isPending };
}

/**************************************
 *       POST EVALUATION PROMPT
 **************************************/
export function useSummary() {
  const postprompt4 = async ({
    id,
    name,
    difficulty,
    isAnswers,
    score,
    total,
  }) => {
    const requestBody = {
      prompt_summary_generate: `
      - Summary: Write a concise 1-2 line summary of the user's performance.
      Include 1-2 actionable suggestions for the user to improve their learning experience.
      - Radar Chart Data: Return an array of 5 numerical values (0-100) representing the following metrics: 
      ["Engagement", "Confidence", "Time Efficiency", "Resilience", "Knowledge"].
      
      Based on the user's answers 
      ${isAnswers} 
      for the lesson "${name}", provide a detailed evaluation:
      `,
      id: id,
      name: name,
      difficulty: difficulty,
      score: score,
      total: total,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generate-summary",
        requestBody
      );
      if (response.data?.error) {
        throw new Error(response.data.error);
      } else return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const {
    mutate: createSummary,
    isPending,
    isError,
  } = useMutation({
    mutationFn: postprompt4,
    onSuccess: (data) => {
      console.log("Data:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return { createSummary, isPending, isError };
}

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
          daily_goal: roadmap.daily_goal,
        },
      ])
      .select("*");
    if (roadmapError) throw roadmapError;

    const roadmapId = roadmapData[0].roadmap_id;

    // Insert lessons with the roadmap_id reference
    if (roadmap.lessons?.length > 0) {
      const lessonsToInsert = roadmap.lessons.map((lesson) => ({
        roadmap_id: roadmapId,
        user_id: userId,
        lesson_name: lesson.lesson_name,
        description: lesson.description,
        lesson_category: [lesson.category],
        status: lesson.status,
        lesson_difficulty: lesson.difficulty,
        lesson_duration: lesson.duration,
        assessment: lesson.assessment,
        gems: lesson.gems,
        exp: lesson.exp,
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

/**************************************
 *  POST EVALUATION DATA TO SUPABASE
 **************************************/
export function useEvaluation(id) {
  const createNewEvaluation = async ({ evaluation, userId }) => {
    const { data: evaluationData, error: evaluationError } = await supabase
      .from("profile")
      .insert([
        {
          user_id: userId,
          lesson_name: evaluation.lesson_name,
          summary: evaluation.summary,
          difficulty: evaluation.difficulty_level,
          score: evaluation.score,
          total: evaluation.total,
          radar_chart_data: evaluation.radarchart,
        },
      ])
      .select("*");

    if (evaluationError) throw evaluationError;
    else return `Succesfully updated profile data ${evaluationData}`;
  };

  const {
    mutateAsync: createEvaluation,
    isPendingEvaluate,
    isErrorEvaluate,
    isSuccess: isSuccessEvaluate
  } = useMutation({
    mutationFn: createNewEvaluation,
    onSuccess: (data) => {
      window.location.href = `/dashboard/${id}`;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const updateUserData = async ({ userId, gems, exp, streak, lives }) => {
    const { data, error } = await supabase.rpc("update_user_per_lesson", {
      user_id: userId,
      increment_gems: gems,
      increment_exp: exp,
      increment_streak: streak,
      decrease_lives: lives,
    });
    if (error) throw error;
    else return "Succesfully Update User";
  }; 

  
  

  const {
    mutate: updateUser,
    isPending: isPendingUser,
    isError: isErrorUser,
  } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data) => {
      console.log("Data:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const updateLessonData = async ({
    userId,
    lessonId,
    lastAccessed,
    progress,
    status,
  }) => {
    const { data: lessonData, error: lessonError } = await supabase
      .from("lessons")
      .update({
        previous_lesson: lastAccessed,
        progress: progress,
        status: status,
      })
      .eq("user_id", userId)
      .eq("id", lessonId)
      .select("*");
    if (lessonError) throw lessonError;
    else "return lessonData[0].lesson_id";
  };

  const {
    mutate: updateLesson,
    isPending: isPendingLesson,
    isError: isErrorLesson,
  } = useMutation({
    mutationFn: updateLessonData,
    onSuccess: (data) => {
      console.log("Data:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return {
    createEvaluation,
    isPendingEvaluate,
    isErrorEvaluate,
    isSuccessEvaluate,
    updateUser,
    isPendingUser,
    isErrorUser,
    updateLesson,
    isPendingLesson,
    isErrorLesson
  };
}
