import { supabase } from "@/config/supabase";

/**
 * Update user quest stats
 * @param {string} userId - User ID
 * @param {object} questData - Quest data including rewards
 */
export const updateUserQuestCompletion = async (userId, questData) => {
  try {
    // First get current user data
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("gems, current_exp, total_exp, finished_quests, weekly_exp_data")
      .eq("user_id", userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Update user data with quest rewards
    const updatedGems = (data.gems || 0) + questData.rewards.gems;
    const updatedExp = (data.current_exp || 0) + questData.rewards.xp;
    const updatedTotalExp = (data.total_exp || 0) + questData.rewards.xp;
    const updatedFinishedQuests = (data.finished_quests || 0) + 1;
    
    // Update weekly EXP data for charts
    const updatedWeeklyExpData = await updateWeeklyExpData(data.weekly_exp_data, questData.rewards.xp);
    
    const { error: updateError } = await supabase
      .from("users")
      .update({
        gems: updatedGems,
        current_exp: updatedExp,
        total_exp: updatedTotalExp,
        finished_quests: updatedFinishedQuests,
        weekly_exp_data: updatedWeeklyExpData
      })
      .eq("user_id", userId);
    
    if (updateError) throw updateError;
    
    return {
      success: true,
      rewards: questData.rewards,
    };
  } catch (error) {
    console.error("Error updating quest completion:", error);
    return { success: false, error };
  }
};

/**
 * Update user stats from completed assessment
 * @param {string} userId - User ID
 * @param {number} score - Assessment score
 * @param {number} total - Total possible score
 * @param {number} gems - Gems to award
 * @param {number} exp - Experience to award
 */
export const updateUserAssessmentRewards = async (userId, score, total, gems, exp) => {
  try {
    // First get current user data
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("gems, current_exp, total_exp, weekly_exp_data")
      .eq("user_id", userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Update with assessment rewards
    const updatedGems = (data.gems || 0) + gems;
    const updatedExp = (data.current_exp || 0) + exp;
    const updatedTotalExp = (data.total_exp || 0) + exp;
    
    // Update weekly EXP data for charts
    const updatedWeeklyExpData = await updateWeeklyExpData(data.weekly_exp_data, exp);
    
    const { error: updateError } = await supabase
      .from("users")
      .update({ 
        gems: updatedGems,
        current_exp: updatedExp,
        total_exp: updatedTotalExp,
        weekly_exp_data: updatedWeeklyExpData
      })
      .eq("user_id", userId);
    
    if (updateError) throw updateError;
    
    return { 
      success: true, 
      gemsAwarded: gems,
      expAwarded: exp,
    };
  } catch (error) {
    console.error("Error updating assessment rewards:", error);
    return { success: false, error };
  }
};

/**
 * Update weekly EXP data array with new EXP gained
 * Resets every week (Monday is the start of a new week)
 * @param {Array} currentWeeklyData - Current weekly EXP data array
 * @param {number} expGained - New EXP points gained
 * @returns {Array} - Updated weekly EXP data array
 */
export const updateWeeklyExpData = async (currentWeeklyData, expGained) => {
  try {
    // Get the current date
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const adjustedDayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert to Monday=0, Sunday=6
    
    // Check if we need to create a new array or reset based on the week
    let weeklyData;
    
    if (!Array.isArray(currentWeeklyData) || currentWeeklyData.length !== 7 || shouldResetWeeklyData(currentWeeklyData)) {
      // Initialize with zeros for a new week
      weeklyData = [0, 0, 0, 0, 0, 0, 0];
    } else {
      // Use the existing data
      weeklyData = [...currentWeeklyData];
    }
    
    // Add the new experience to today's value
    weeklyData[adjustedDayIndex] += expGained;
    
    return weeklyData;
  } catch (error) {
    console.error("Error updating weekly EXP data:", error);
    // Return a new array if there's an error
    return [0, 0, 0, 0, 0, 0, 0];
  }
};

/**
 * Check if the weekly data should be reset (new week has started)
 * @param {Array} weeklyData - Current weekly EXP data array
 * @returns {boolean} - True if the data should be reset
 */
function shouldResetWeeklyData(weeklyData) {
  // Get the current day (we'll use this to check if we crossed into a new week)
  const today = new Date();
  
  // Get the date for the last update from local storage
  const lastWeeklyUpdateStr = localStorage.getItem("last_weekly_exp_update");
  
  if (!lastWeeklyUpdateStr) {
    // First time running the function, save today's date
    localStorage.setItem("last_weekly_exp_update", today.toISOString());
    return false;
  }
  
  const lastUpdateDate = new Date(lastWeeklyUpdateStr);
  
  // Calculate the current week number in the year
  const getWeekNumber = (date) => {
    // Copy date to avoid modifying the original
    const d = new Date(date);
    // Set to nearest Thursday: current date + 4 - current day number
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of the year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate week number: ceil(((current - yearStart) / 86400000 + 1) / 7)
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };
  
  const currentWeek = getWeekNumber(today);
  const lastWeek = getWeekNumber(lastUpdateDate);
  
  // Check if we've moved to a new week
  if (currentWeek !== lastWeek) {
    // Save the new date
    localStorage.setItem("last_weekly_exp_update", today.toISOString());
    return true; // Reset data for new week
  }
  
  return false;
}

/**
 * Update user streak
 * @param {string} userId - User ID
 */
export const updateUserStreak = async (userId) => {
  try {
    // First get current user data
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("streak, best_streak")
      .eq("user_id", userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Calculate the new streak value
    const currentStreak = (data.streak || 0) + 1;
    const bestStreak = Math.max(currentStreak, data.best_streak || 0);
    
    // Update the streak values
    const { error: updateError } = await supabase
      .from("users")
      .update({
        streak: currentStreak,
        best_streak: bestStreak
      })
      .eq("user_id", userId);
    
    if (updateError) throw updateError;
    
    return {
      success: true,
      currentStreak,
      bestStreak
    };
  } catch (error) {
    console.error("Error updating streak:", error);
    return { success: false, error };
  }
};

/**
 * Optimize fetching of user data by combining multiple fields in one request
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User data
 */
export const fetchUserStats = async (userId) => {
  try {
    // Get all needed user data in a single request to minimize API calls
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      userData: data
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return { success: false, error };
  }
};
