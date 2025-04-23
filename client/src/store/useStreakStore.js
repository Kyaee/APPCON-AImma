import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/config/supabase";

export const useStreakStore = create(
  persist(
    (set, get) => ({
      // Streak state
      streak: 0,
      bestStreak: 0,
      lastVisitDate: null,
      dailyStatus: [" ", " ", " ", " ", " ", " ", " "], // Status for each day of the week (M-S)
      
      // Check if user has visited today and update streak accordingly
      checkAndUpdateStreak: async (userId) => {
        try {
          const currentDate = new Date();
          const today = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
          const lastVisit = get().lastVisitDate;
          
          // Check if lesson was already completed today through localStorage
          const dailyStatus = localStorage.getItem("dailyStatus");
          if (dailyStatus) {
            const parsedDailyStatus = JSON.parse(dailyStatus);
            const nowDayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
            const todayIndex = parsedDailyStatus.findIndex((day) => day.full === nowDayName);
            
            if (todayIndex !== -1 && parsedDailyStatus[todayIndex].status === "completed") {
              return {
                streak: get().streak,
                bestStreak: get().bestStreak,
                dailyStatus: get().dailyStatus
              };
            }
          }
          
          // Return early if already visited today to prevent unnecessary updates
          if (lastVisit === today) {
            return {
              streak: get().streak,
              bestStreak: get().bestStreak,
              dailyStatus: get().dailyStatus
            };
          }
          
          // Get day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
          // Convert to our format (0 = Monday, ..., 6 = Sunday)
          let dayIndex = currentDate.getDay() - 1;
          if (dayIndex < 0) dayIndex = 6; // Sunday becomes index 6
          
          // Update dailyStatus for today
          const newDailyStatus = [...get().dailyStatus];
          newDailyStatus[dayIndex] = "completed";
          
          // Calculate days between last visit and today
          let daysGap = 1;
          if (lastVisit) {
            const lastVisitDate = new Date(lastVisit);
            daysGap = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));
          }
          
          // Initialize streak variables
          let newStreak = get().streak || 0; // Ensure we have a valid number
          let newBestStreak = get().bestStreak || 0; // Ensure we have a valid number
          
          // Update streak based on visit pattern
          if (!lastVisit || daysGap > 1) {
            // First visit or missed a day - reset streak to 1
            newStreak = 1;
          } else if (daysGap === 1) {
            // Consecutive day - increment streak
            newStreak += 1;
            if (newStreak > newBestStreak) {
              newBestStreak = newStreak;
            }
          }
          
          // If there was a gap of more than 1 day, mark missed days
          if (lastVisit && daysGap > 1) {
            // Calculate the days that were missed
            const lastDate = new Date(lastVisit);
            for (let i = 1; i < daysGap; i++) {
              const missedDate = new Date(lastDate);
              missedDate.setDate(lastDate.getDate() + i);
              let missedDayIndex = missedDate.getDay() - 1;
              if (missedDayIndex < 0) missedDayIndex = 6;
              newDailyStatus[missedDayIndex] = "missed";
            }
          }
          
          // Check if any values changed before updating state
          const currentState = get();
          const hasChanges = 
            currentState.streak !== newStreak || 
            currentState.bestStreak !== newBestStreak || 
            currentState.lastVisitDate !== today || 
            JSON.stringify(currentState.dailyStatus) !== JSON.stringify(newDailyStatus);
          
          // Only update if something actually changed
          if (hasChanges) {
            // Update local state
            set({
              streak: newStreak,
              bestStreak: newBestStreak,
              lastVisitDate: today,
              dailyStatus: newDailyStatus
            });
            
            // Update Supabase if userId is provided
            if (userId) {
              try {
                const { error } = await supabase
                  .from("users")
                  .update({
                    streak: newStreak,
                    best_streak: newBestStreak,
                    last_visit: today
                  })
                  .eq("user_id", userId);
                
                if (error) console.error("Error updating streak in database:", error);
              } catch (error) {
                console.error("Error updating streak:", error);
              }
            }
          }
          
          return {
            streak: newStreak,
            bestStreak: newBestStreak,
            dailyStatus: newDailyStatus
          };
        } catch (error) {
          console.error("Error in checkAndUpdateStreak:", error);
          // Return current state if there's an error
          return {
            streak: get().streak || 0,
            bestStreak: get().bestStreak || 0,
            dailyStatus: get().dailyStatus || [" ", " ", " ", " ", " ", " ", " "]
          };
        }
      },
      
      // Update streak after lesson completion
      updateStreakFromLesson: async (userId) => {
        try {
          // Check if we already updated streak today from localStorage
          const lastUpdate = localStorage.getItem("lastStreakUpdate");
          const today = new Date().toISOString().split('T')[0];
          
          if (lastUpdate === today) {
            return false;
          }
          
          // Get current streak data
          const { data, error } = await supabase
            .from("users")
            .select("streak, best_streak")
            .eq("user_id", userId)
            .single();
            
          if (error) {
            console.error("Error fetching user streak:", error);
            return false;
          }
          
          // Calculate new streak
          let newStreak = (data.streak || 0) + 1;
          let newBestStreak = Math.max(newStreak, data.best_streak || 0);
          
          // Update in Supabase
          const { error: updateError } = await supabase
            .from("users")
            .update({
              streak: newStreak,
              best_streak: newBestStreak
            })
            .eq("user_id", userId);
            
          if (updateError) {
            console.error("Error updating streak:", updateError);
            return false;
          }
          
          // Update local state
          set({
            streak: newStreak,
            bestStreak: newBestStreak,
            lastVisitDate: today
          });
          
          // Mark today as completed in localStorage
          const dailyStatus = localStorage.getItem("dailyStatus");
          if (dailyStatus) {
            const parsedDailyStatus = JSON.parse(dailyStatus);
            const nowDayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
            const todayIndex = parsedDailyStatus.findIndex((day) => day.full === nowDayName);
            
            if (todayIndex !== -1) {
              parsedDailyStatus[todayIndex].status = "completed";
              localStorage.setItem("dailyStatus", JSON.stringify(parsedDailyStatus));
            }
          }
          
          // Save update timestamp
          localStorage.setItem("lastStreakUpdate", today);
          return true;
        } catch (error) {
          console.error("Error in updateStreakFromLesson:", error);
          return false;
        }
      },
      
      // Reset streak (for testing)
      resetStreak: () => {
        set({
          streak: 0,
          bestStreak: get().bestStreak, // Keep best streak
          lastVisitDate: null,
          dailyStatus: [" ", " ", " ", " ", " ", " ", " "]
        });
      },
      
      // Set streak directly (for loading from database)
      setStreakData: (streak, bestStreak) => {
        set({
          streak,
          bestStreak
        });
      }
    }),
    {
      name: "streak-storage",
      partialize: (state) => ({
        streak: state.streak,
        bestStreak: state.bestStreak,
        lastVisitDate: state.lastVisitDate,
        dailyStatus: state.dailyStatus
      })
    }
  )
);