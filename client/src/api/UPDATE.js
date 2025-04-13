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
      .select("gems, current_exp, total_exp, finished_quests")
      .eq("user_id", userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Update user data with quest rewards
    const updatedGems = (data.gems || 0) + questData.rewards.gems;
    const updatedExp = (data.current_exp || 0) + questData.rewards.xp;
    const updatedTotalExp = (data.total_exp || 0) + questData.rewards.xp;
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
      .select("gems, current_exp, total_exp")
      .eq("user_id", userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Update with assessment rewards
    const updatedGems = (data.gems || 0) + gems;
    const updatedExp = (data.current_exp || 0) + exp;
    const updatedTotalExp = (data.total_exp || 0) + exp;
    
    const { error: updateError } = await supabase
      .from("users")
      .update({ 
        gems: updatedGems,
        current_exp: updatedExp,
        total_exp: updatedTotalExp
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
