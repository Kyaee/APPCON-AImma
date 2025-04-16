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

    Roadmap tailored for a "${userType?.label}" ${JSON.stringify(educationLevel?.label || previousExperience || careerTransition)} user, 
    with a daily goal of ${JSON.stringify(dailyGoal)} (if two digits its minutes, else hours) .
    The lessons are based on interests such as ${JSON.stringify(technicalInterest?.label)} and user personalization: ${JSON.stringify(technicalAnswers)}. 
    Don't include actual content but provide a structure to generate lesson in the next prompt.

    Format:
    - Roadmap Name, roadmap dailyGoal 
    - Lesson Categories in ARRAY 
    - Lesson description
    - Lesson difficulty(return only "Easy", "Intermediate", "Hard")
    - Lesson status(returns "locked" for premium access, "in_progress", or no output if unlocked)
    - Lesson Assessment(returns true or false)
    - Lesson duration time unit (e.g., 30 minutes, 1 hour)
    - Gems & Exp rewarded per lesson 
    (No assessment: 15 exp, 10 gems),
    with assessment: (Easy: 50 exp, 25 gems) (Intermediate: 100 exp, 50 gems) (Hard: 200 exp, 100 gems)
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
  lesson_assessment,
  lesson_progress
) => {
  const prompt_lesson = `
    Generate a ${lesson_name} lesson for the user

    Format:
    - (do not include lesson name as title)
    - Target Audience
    - ## Introduction 
    - ### Objectives
    - ## Lesson Content 
      #### A. Key Concepts and Definitions
      #### B. Step-by-step Explanations
      #### C. Real world examples or scenarios
    - ### Activity/Indenpdent Practice 
    - ## Conclusion 
    - ### References (if possible) 
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
      progress: lesson_progress
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
      Generate 11 assessment questions for ${lesson_name} with the following content: ${lesson_content}
      The questions must only be "multiple-choice", and don't make the answers too obvious by making it longer than others.
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
    console.log(`Updating user data: userId=${userId}, gems=${gems}, exp=${exp}, streak=${streak}, lives=${lives}`);
    
    try {
      // First get current user data to check if leveling up is needed
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("current_exp, level")
        .eq("id", userId)
        .single();
        
      if (fetchError) throw fetchError;
      
      // Calculate if level up should occur
      const currentExp = userData.current_exp || 0;
      const currentLevel = userData.level || 1;
      const newTotalExp = currentExp + exp;
      
      // Calculate level ups and remaining exp
      const levelUps = Math.floor(newTotalExp / 100);
      const newLevel = currentLevel + levelUps;
      const newExp = newTotalExp % 100;
      
      console.log(`XP calculation: Current=${currentExp}, Adding=${exp}, Total=${newTotalExp}`);
      console.log(`Level calculation: Current=${currentLevel}, LevelUps=${levelUps}, New=${newLevel}, Remainder=${newExp}`);
      
      let updatedExpInRPC = exp;
      
      // Update level and exp if there's a level up
      if (levelUps > 0) {
        console.log(`User is leveling up! From level ${currentLevel} to ${newLevel} (${levelUps} level ups)`);
        
        // Update user level and reset exp to remainder
        const { data: levelData, error: levelError } = await supabase
          .from("users")
          .update({
            level: newLevel,
            current_exp: newExp
          })
          .eq("id", userId);
          
        if (levelError) throw levelError;
        
        console.log(`Level updated: ${newLevel}, New exp: ${newExp}`);
        
        // If we've already updated the exp directly, don't increment it again in the RPC
        updatedExpInRPC = 0;
      }
      
      // Continue with regular update_user_per_lesson RPC call 
      // But don't increment exp if we already handled it in level up
      const { data, error } = await supabase.rpc("update_user_per_lesson", {
        user_id: userId,
        increment_gems: gems,
        increment_exp: updatedExpInRPC, // Only increment if no level up occurred
        increment_streak: streak,
        decrease_lives: lives,
      });
      
      if (error) throw error;
      console.log("User data updated successfully:", data);
      
      return {
        success: true,
        message: "Successfully Updated User",
        levelUp: levelUps > 0,
        newLevel: levelUps > 0 ? newLevel : null,
        levelUps: levelUps
      };
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  }; 

  const {
    mutateAsync: updateUser,
    isPending: isPendingUser,
    isError: isErrorUser,
  } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data) => {
      console.log("User update success:", data);
    },
    onError: (error) => {
      console.error("User update error:", error);
    },
  });

  const updateLessonData = async ({
    userId,
    lessonId,
    lastAccessed,
    progress,
    status,
  }) => {
    try {
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
      console.log("Lesson progress updated in Supabase:", progress); // Add logging
      return lessonData; // Make sure to return the result
    } catch (error) {
      console.error("Error updating lesson data:", error);
      throw error; // Re-throw so the Promise rejects properly
    }
  };

  // Replace mutate with mutateAsync to properly support awaiting
  const {
    mutateAsync: updateLesson, // Using mutateAsync is critical here
    isPending: isPendingLesson,
    isError: isErrorLesson,
  } = useMutation({
    mutationFn: updateLessonData,
    onSuccess: (data) => {
      console.log("Lesson update success:", data);
    },
    onError: (error) => {
      console.error("Lesson update error:", error);
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
