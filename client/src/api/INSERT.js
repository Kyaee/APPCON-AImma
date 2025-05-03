import { supabase } from "@/config/supabase";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAssessmentStore } from "@/store/useAssessmentStore";

// These store values capture user inputs from the assessment
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
  const postPrompt1 = async (userData) => {
    try {
      // Validate that we have a user ID
      if (!userData || !userData.user_id) {
        throw new Error("User ID is required");
      }
      
      console.log("Generating roadmap with user data:", { 
        language, 
        userType: userData.userTypeLabel || userType?.label, 
        educationLevel: userData.levelLabel || educationLevel?.label, 
        dailyGoal: userData.daily_goal || dailyGoal,
        technicalInterest: userData.technicalInterest || technicalInterest?.label,
        detailedAnswers: userData
      });
      
      // Format the prompt for the AI
      const prompt_roadmap = {
        prompt_roadmap_generate: `
          Generate a comprehensive, structured, and focused learning roadmap in ${JSON.stringify(language)} with 20 or more (the more the better).

          Roadmap tailored for a "${userData.userTypeLabel || userType?.label}" ${JSON.stringify(userData.levelLabel || educationLevel?.label || previousExperience || careerTransition)} user, 
          with a daily goal of ${JSON.stringify(userData.daily_goal || dailyGoal)} (if two digits its minutes, else hours).
          
          The lessons are based on interests such as ${JSON.stringify(userData.technicalInterest || technicalInterest?.label)} and user personalization: ${JSON.stringify(userData.technicalAnswers || technicalAnswers)}. 
          
          Additional user information:
          ${userData.formData ? `- Form data: ${JSON.stringify(userData.formData)}` : ''}
          ${userData.previousExperience ? `- Previous Experience: ${JSON.stringify(userData.previousExperience)}` : ''}
          ${userData.careerTransition ? `- Career Transition: ${JSON.stringify(userData.careerTransition)}` : ''}
          
          Don't include actual content but provide a structure to generate lesson in the next prompt.

          Format:
          - Roadmap Name, roadmap dailyGoal 
          - Lesson Categories in ARRAY 
          - Lesson description: Provide a verbose and detailed description covering the key topics and learning objectives for each lesson.
          - Lesson difficulty(return only "Easy", "Intermediate", "Hard")
          - Lesson status(returns "locked" for premium access, "in_progress", or no output if unlocked)
          - Lesson Assessment(returns true or false)
          - Lesson duration time unit (e.g., 30 minutes, 1 hour)
          - Gems & Exp rewarded per lesson 
          (No assessment: 15 exp, 10 gems),
          with assessment: (Easy: 50 exp, 25 gems) (Intermediate: 100 exp, 50 gems) (Hard: 200 exp, 100 gems)
        `,
        userId: userData.user_id
      };
      
      const response = await axios.post(
        "https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/generate-roadmap",
        prompt_roadmap
      );
      
      if (response.data?.error) {
        console.error("API Error:", response.data.error);
        throw new Error(response.data.error);
      }
      
      // Use GET endpoint to retrieve processed roadmap data
      const roadmapResponse = await axios.get(
        "https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/get-roadmap"
      );
      
      if (roadmapResponse.data?.message && roadmapResponse.data.message.includes("No roadmap")) {
        throw new Error("No roadmap data generated. Please try again.");
      }
      
      console.log("Roadmap data retrieved:", roadmapResponse.data);
      
      // Process the roadmap data
      const roadmapData = roadmapResponse.data;
      
      if (!roadmapData || (Array.isArray(roadmapData) && roadmapData.length === 0)) {
        throw new Error("Empty roadmap data received from API");
      }

      // Create the roadmaps in database and await the result
      await createNewRoadmap(roadmapData, userData.user_id);
      console.log("Roadmap saved to database successfully");
      
      return { success: true, data: roadmapData };
    } catch (error) {
      console.error("Error generating roadmap:", error);
      throw error;
    }
  };

  const { mutate: createRoadmap, isSuccess, isError, error, isPending } = useMutation({
    mutationFn: postPrompt1,
    onSuccess: (data) => {
      window.location.href = `/dashboard/p`
    },
    onError: (error) => {
      console.error("Roadmap generation error:", error);
    },
  });

  return { createRoadmap, isSuccess, isError, error, isPending };
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
    Generate a ${lesson_name} lesson for the user.

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

    IMPORTANT: Do NOT wrap the entire lesson content in a single Markdown code block (\`\`\` \`\`\`). Use Markdown code blocks ONLY for specific code examples within the lesson text.
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
      "https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/generate-lesson",
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
// Modify the hook to accept an onSuccess callback
export function useAssessment(id, onSuccessCallback) {
  const postPrompt3 = async ({ lesson_id, lesson_name, lesson_content }) => {
    if (!lesson_id || !lesson_name || !lesson_content) {
      throw new Error("Invalid input parameters for postPrompt3");
    }
    const requestBody = {
      prompt_assessment_generate: `
      Generate 11 assessment questions for ${lesson_name} with the following content: ${lesson_content}
      
      REQUIREMENTS:
      1. Questions must be "multiple-choice" only
      2. EVERY question MUST have EXACTLY 4 options (no more, no less)
      3. Distribute information evenly across all choices - DO NOT put all the relevant information in the first choice
      4. The correct answer should be randomly positioned (not always option A, B, C, or D)
      5. Wrong answers (distractors) should be plausible and related to the content
      6. Ensure the length of the correct answer option is varied and not consistently longer than the incorrect options
      7. Make all options approximately the same length when possible
      8. Each option should be concise (1-2 sentences maximum)
      
      This assessment should genuinely test understanding of the lesson's key concepts.
      `,
      id: lesson_id,
      name: lesson_name,
    };
    const response = await axios.post(
      "https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/generate-assessment",
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
      console.log("Assessment Generation Data: Successful");
      // Call the provided callback instead of redirecting
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
      // REMOVED: window.location.href=`/l/${id}/assessment`;
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
        "https://wispy-nanice-mastertraits-ea47ff0a.koyeb.app/api/generate-summary",
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
      console.log("Data: Successful")
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
  if (!roadmaps) {
    console.error("No roadmap data provided");
    throw new Error("No roadmap data provided");
  }

  // Ensure roadmaps is always an array
  const roadmapsArray = Array.isArray(roadmaps) ? roadmaps : [roadmaps];
  
  if (roadmapsArray.length === 0) {
    console.error("Empty roadmaps array");
    throw new Error("Empty roadmaps array");
  }

  // Process each roadmap
  const promises = roadmapsArray.map(async (roadmap) => {
    if (!roadmap) {
      console.error("Null roadmap in array");
      throw new Error("Null roadmap in array");
    }

    console.log("Processing roadmap:", roadmap);
    
    try {
      // Insert roadmap with validation
      const roadmapName = roadmap.roadmap_name;
      const description = roadmap.description;
      const dailyGoal = roadmap.daily_goal;

      const { data: roadmapData, error: roadmapError } = await supabase
        .from("roadmap")
        .insert([
          {
            user_id: userId,
            roadmap_name: roadmapName,
            description: description,
            daily_goal: dailyGoal,
          },
        ])
        .select("*");
      
      if (roadmapError) {
        console.error("Error inserting roadmap:", roadmapError);
        throw roadmapError;
      }

      if (!roadmapData || roadmapData.length === 0) {
        console.error("No roadmap data returned after insert");
        throw new Error("Failed to create roadmap");
      }

      const roadmapId = roadmapData[0].roadmap_id;
      console.log(`Created roadmap with ID: ${roadmapId}`);

      // Insert lessons if they exist
      if (roadmap.lessons?.length > 0) {
        const lessonsToInsert = roadmap.lessons.map((lesson) => ({
          roadmap_id: roadmapId,
          user_id: userId,
          lesson_name: lesson.lesson_name, // Fixed: was lesso_name
          description: lesson.description, // Fixed: was descrption
          lesson_category: [lesson.category],
          status: lesson.status,
          lesson_difficulty: lesson.difficulty,
          lesson_duration: lesson.duration,
          assessment: lesson.assessment,
          gems: lesson.gems,
          exp: lesson.exp,
        }));

        console.log(`Inserting ${lessonsToInsert.length} lessons for roadmap ${roadmapId}`);
        const { error: lessonsError } = await supabase
          .from("lessons")
          .insert(lessonsToInsert);

        if (lessonsError) {
          console.error("Error inserting lessons:", lessonsError);
          throw lessonsError;
        }
        
        console.log(`Successfully inserted ${lessonsToInsert.length} lessons`);
      } else {
        console.log("No lessons to insert for this roadmap");
      }
      
      return roadmapId;
    } catch (error) {
      console.error("Error in roadmap creation process:", error);
      throw error;
    }
  });
  
  // Wait for all roadmaps to be created
  return Promise.all(promises);
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
    
      let updatedExpInRPC = exp;
      
      // Update level and exp if there's a level up
      if (levelUps > 0) {
        
        // Update user level and reset exp to remainder
        const { data: levelData, error: levelError } = await supabase
          .from("users")
          .update({
            level: newLevel,
            current_exp: newExp
          })
          .eq("id", userId);
          
        if (levelError) throw levelError;
        
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
      console.log("User data updated successfully:");
      
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
      console.log("User update success");
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
      console.log("Lesson progress updated"); // Add logging
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
      console.log("Lesson update success");
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
