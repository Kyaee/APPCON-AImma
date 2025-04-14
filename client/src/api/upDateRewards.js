import { supabase } from "@/config/supabase";

async function updateData(userId) {
    const { data, error } = await supabase.rpc("grant_rewards", {
      userId: userId,
      gems_to_grant: 100,
      grant_trial_premium: true,
    });
  
    if (error) {
      console.error("Error granting rewards:", error);
    } else {
      console.log("Rewards granted successfully:", data); 
    }
  }
  
  
  const userIdToReward = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
  updateData(userIdToReward);
