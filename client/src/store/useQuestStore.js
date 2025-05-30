import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/config/supabase";

// Helper function to get the ISO week number
const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export const useQuestStore = create(
  persist(
    (set, get) => ({
      // Quest state
      dailyQuests: [
        {
          id: "1",
          title: "Complete 1 Lesson Test",
          rewards: { xp: 75, gems: 75 },
          completed: false,
        },
        {
          id: "2",
          title: "Study for 30 minutes",
          rewards: { xp: 40, gems: 40 },
          completed: false,
        },
        {
          id: "3",
          title: "Study for 1 hour",
          rewards: { xp: 100, gems: 80 },
          completed: false,
        },
        {
          id: "4",
          title: "Achieve 100% on a test",
          rewards: { xp: 125, gems: 100, booster: true },
          completed: false,
        },
        {
          id: "5",
          title: "Review 3 previous lessons",
          rewards: { xp: 60, gems: 50 },
          completed: false,
        },
      ],
      
      weeklyQuests: [
        {
          id: "1",
          title: "Complete all daily quests 5 days in a row",
          rewards: { xp: 300, gems: 300 },
          completed: false,
        },
        {
          id: "2",
          title: "Maintain a 90%+ average on assessments",
          rewards: { xp: 200, gems: 250 },
          completed: false,
        },
        {
          id: "3",
          title: "Complete 3 full course modules",
          rewards: { xp: 200, gems: 400 },
          completed: false,
        },
      ],
      
      // Lesson tracking
      studyTime: 0,
      lessonTestsCompleted: 0,
      perfectScores: 0,
      lessonsReviewed: [], // Array of lesson IDs to track reviews
      
      // Reset quests daily and weekly
      lastResetDate: new Date().toDateString(), // Keep track of the last reset date
      lastResetWeek: getWeekNumber(new Date()), // Keep track of the last reset week
      
      // Check and reset daily and weekly quests if needed
      checkAndResetQuests: () => {
        const now = new Date();
        const currentDateString = now.toDateString();
        const currentWeekNumber = getWeekNumber(now);
        const { lastResetDate, lastResetWeek } = get();
        
        let needsUpdate = false;
        let newState = {};

        // Check for daily reset
        if (currentDateString !== lastResetDate) {
          console.log("New day detected, resetting daily quests and tracking.");
          needsUpdate = true;
          newState = {
            ...newState,
            dailyQuests: get().dailyQuests.map(quest => ({
              ...quest,
              completed: false
            })),
            studyTime: 0,
            lessonTestsCompleted: 0,
            perfectScores: 0,
            lessonsReviewed: [],
            lastResetDate: currentDateString // Update last reset date
          };
        }

        // Check for weekly reset
        if (currentWeekNumber !== lastResetWeek) {
          console.log("New week detected, resetting weekly quests.");
          needsUpdate = true;
          newState = {
            ...newState,
            weeklyQuests: get().weeklyQuests.map(quest => ({
              ...quest,
              completed: false
            })),
            lastResetWeek: currentWeekNumber // Update last reset week
          };
        }

        // Apply updates if needed
        if (needsUpdate) {
          set(newState);
        }
      },
      
      // Complete a quest by ID
      completeQuest: async (questId, isDaily, userId) => {
        // First check if the quest is already completed
        const quests = isDaily ? get().dailyQuests : get().weeklyQuests;
        const questToComplete = quests.find(q => q.id === questId);
        
        if (!questToComplete || questToComplete.completed) return;
        
        // Update local state
        if (isDaily) {
          set({
            dailyQuests: get().dailyQuests.map(quest => 
              quest.id === questId ? { ...quest, completed: true } : quest
            )
          });
        } else {
          set({
            weeklyQuests: get().weeklyQuests.map(quest => 
              quest.id === questId ? { ...quest, completed: true } : quest
            )
          });
        }
        
        // Update Supabase if userId is provided
        if (userId) {
          try {
            // First get current user data
            const { data, error: fetchError } = await supabase
              .from("users")
              .select("gems, current_exp, total_exp, finished_quests")
              .eq("user_id", userId)
              .single();
            
            if (fetchError) throw fetchError;
            
            // Update user data with quest rewards
            const updatedGems = (data.gems || 0) + questToComplete.rewards.gems;
            const updatedExp = (data.current_exp || 0) + questToComplete.rewards.xp;
            const updatedTotalExp = (data.total_exp || 0) + questToComplete.rewards.xp;
            const updatedFinishedQuests = (data.finished_quests || 0) + 1;
            
            const { error: updateError } = await supabase
              .from("users")
              .update({
                gems: updatedGems,
                current_exp: updatedExp,
                total_exp: updatedTotalExp,
                finished_quests: updatedFinishedQuests
              })
              .eq("user_id", userId);
            
            if (updateError) throw updateError;
            
            return {
              success: true,
              rewards: questToComplete.rewards,
            };
          } catch (error) {
            console.error("Error updating quest completion:", error);
            return { success: false, error };
          }
        }
      },
      
      // Track study time (in minutes)
      updateStudyTime: (minutes, userId) => { // Accept userId
        const newStudyTime = get().studyTime + minutes;
        set({ studyTime: newStudyTime });
        
        // Check if we need to complete any time-based quests
        const dailyQuests = get().dailyQuests;
        const thirtyMinQuest = dailyQuests.find(q => q.id === "2");
        const oneHourQuest = dailyQuests.find(q => q.id === "3");
        
        if (thirtyMinQuest && !thirtyMinQuest.completed && newStudyTime >= 30) {
          console.log("Completing 30 min study quest for user:", userId);
          get().completeQuest("2", true, userId); // Pass userId
        }
        
        if (oneHourQuest && !oneHourQuest.completed && newStudyTime >= 60) {
          console.log("Completing 1 hour study quest for user:", userId);
          get().completeQuest("3", true, userId); // Pass userId
        }
      },
      
      // Track lesson test completion
      completeLessonTest: (userId, score, total) => {
        // Increment completed tests
        const newTestsCompleted = get().lessonTestsCompleted + 1;
        set({ lessonTestsCompleted: newTestsCompleted });
        
        // Complete "Complete 1 Lesson Test" quest if not already done
        const lessonTestQuest = get().dailyQuests.find(q => q.id === "1");
        if (lessonTestQuest && !lessonTestQuest.completed) {
          get().completeQuest("1", true, userId);
        }
        
        // Check for perfect score (100%)
        if (score === total) {
          const newPerfectScores = get().perfectScores + 1;
          set({ perfectScores: newPerfectScores });
          
          // Complete "Achieve 100% on a test" quest if not already done
          const perfectScoreQuest = get().dailyQuests.find(q => q.id === "4");
          if (perfectScoreQuest && !perfectScoreQuest.completed) {
            get().completeQuest("4", true, userId);
          }
        }
      },
      
      // Track lesson reviews
      reviewLesson: (lessonId, userId) => {
        // Skip if already reviewed this lesson
        if (get().lessonsReviewed.includes(lessonId)) return;
        
        // Add to reviewed lessons
        const newLessonsReviewed = [...get().lessonsReviewed, lessonId];
        set({ lessonsReviewed: newLessonsReviewed });
        
        // Check if we've reviewed 3 lessons
        if (newLessonsReviewed.length >= 3) {
          // Complete "Review 3 previous lessons" quest if not already done
          const reviewQuest = get().dailyQuests.find(q => q.id === "5");
          if (reviewQuest && !reviewQuest.completed) {
            get().completeQuest("5", true, userId);
          }
        }
      },
    }),
    {
      name: "quest-storage",
      partialize: (state) => ({
        dailyQuests: state.dailyQuests,
        weeklyQuests: state.weeklyQuests,
        studyTime: state.studyTime,
        lessonTestsCompleted: state.lessonTestsCompleted,
        perfectScores: state.perfectScores,
        lessonsReviewed: state.lessonsReviewed,
        lastResetDate: state.lastResetDate,
        lastResetWeek: state.lastResetWeek, // Persist last reset week
      }),
    }
  )
);