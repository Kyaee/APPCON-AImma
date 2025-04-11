import { supabase } from "@/config/supabase"; // Adjust import path as needed

/**
 * Calculate gems to award based on level
 * @param {number} level - User's current level
 * @returns {number} - Amount of gems to award
 */
export const calculateGemsForLevel = (level) => {
  if (level % 5 === 0) {
    return level * 100; // Bonus gems every 5 levels
  } else {
    return level * 20; // Standard gems for other levels
  }
};

/**
 * Create initial gems record for a user
 * @param {string} userId - User ID 
 * @param {number} initialGems - Initial gems amount (default: 0)
 */
export const createGemsRecord = async (userId, initialGems = 0) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ user_id: userId, gems: initialGems }]);
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error("Error creating gems record:", error);
    return { success: false, error };
  }
};

/**
 * Get user's current gems
 * @param {string} userId - User ID
 */
export const getUserGems = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("gems")
      .eq("user_id", userId)
      .single();
    
    if (error) throw error;
    
    return { success: true, gems: data.gems };
  } catch (error) {
    console.error("Error fetching user gems:", error);
    return { success: false, error };
  }
};

/**
 * Update gems for user based on level achievement
 * @param {string} userId - User ID
 * @param {number} level - New level reached
 */
export const updateGems = async (userId, level) => {
  try {
    // Calculate gems to award based on level
    const gemsToAward = calculateGemsForLevel(level);
    
    // First get current gems
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("gems")
      .eq("user_id", userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const currentGems = data?.gems || 0;
    const updatedGems = currentGems + gemsToAward;
    
    // Update the record with new gems amount
    const { error: updateError } = await supabase
      .from("users")
      .update({ 
        gems: updatedGems,
        level: level
      })
      .eq("user_id", userId);
    
    if (updateError) throw updateError;
    
    return { 
      success: true, 
      gemsAwarded: gemsToAward,
      totalGems: updatedGems
    };
  } catch (error) {
    console.error("Error updating gems:", error);
    return { success: false, error };
  }
};

/**
 * Set specific gems amount for user
 * @param {string} userId - User ID
 * @param {number} amount - Specific amount to set
 */
export const setGems = async (userId, amount) => {
  try {
    const { error } = await supabase
      .from("users")
      .update({ gems: amount })
      .eq("user_id", userId);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error setting gems:", error);
    return { success: false, error };
  }
};

/**
 * Add or subtract gems from user
 * @param {string} userId - User ID
 * @param {number} amount - Amount to add (positive) or subtract (negative)
 */
export const adjustGems = async (userId, amount) => {
  try {
    // First get current gems
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("gems")
      .eq("user_id", userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const currentGems = data?.gems || 0;
    const updatedGems = Math.max(0, currentGems + amount); // Prevent negative gems
    
    const { error: updateError } = await supabase
      .from("users")
      .update({ gems: updatedGems })
      .eq("user_id", userId);
    
    if (updateError) throw updateError;
    
    return { 
      success: true, 
      previousGems: currentGems,
      currentGems: updatedGems
    };
  } catch (error) {
    console.error("Error adjusting gems:", error);
    return { success: false, error };
  }
};

/**
 * Reset user's gems to zero
 * @param {string} userId - User ID
 */
export const resetGems = async (userId) => {
  try {
    const { error } = await supabase
      .from("users")
      .update({ gems: 0 })
      .eq("user_id", userId);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error resetting gems:", error);
    return { success: false, error };
  }
};

/**
 * Delete user's gems record
 * @param {string} userId - User ID
 */
export const deleteGemsRecord = async (userId) => {
  try {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("user_id", userId);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting gems record:", error);
    return { success: false, error };
  }
};