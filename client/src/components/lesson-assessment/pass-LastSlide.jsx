import { Gem, ZapIcon } from "lucide-react";
import { useQuestStore } from "@/store/useQuestStore";
import { useEffect } from "react";
import { supabase } from "@/config/supabase";

export default function LastSlide({
  score,
  total,
  gems,
  exp,
  onClick,
  disabled,
  userId,
}) {
  const completeLessonTest = useQuestStore((state) => state.completeLessonTest);

  // Track quest completion when assessment is passed
  useEffect(() => {
    if (userId) {
      // Complete the lesson test quest and possibly the perfect score quest
      completeLessonTest(userId, score, total);

      // Update user's gems and exp in Supabase
      const updateUserRewards = async () => {
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
              total_exp: updatedTotalExp,
            })
            .eq("user_id", userId);

          if (updateError) throw updateError;

          console.log("User rewards updated successfully");
        } catch (error) {
          console.error("Error updating user rewards:", error);
        }
      };

      updateUserRewards();
    }
  }, [userId, score, total, completeLessonTest, gems, exp]);

  return (
    <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-background ">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        Congratulations!
        <br /> You have completed the assessment.
      </h1>
      <div className="grid grid-cols-2  gap-x-10">
        <div>
          <p>Your Score</p>
          <h2 className="text-3xl font-bold">
            {score} / {total}
          </h2>
        </div>
        <div>
          <p>Rewards</p>
          <div className="flex gap-5 *:flex *:items-center *:gap-0.5">
            <h2 className="text-xl font-semibold pt-1">
              +<Gem size={18} />
              {gems}
            </h2>
            <h2 className="text-xl font-semibold pt-1">
              +<ZapIcon size={20} />
              {exp}
            </h2>
          </div>
        </div>
      </div>
      <button
        className="py-3 w-3/5 mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                  hover:bg-neutral-300"
        onClick={onClick}
        disabled={disabled}
      >
        Finish
      </button>
    </article>
  );
}
