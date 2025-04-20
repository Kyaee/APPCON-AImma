import { Gem, ZapIcon } from "lucide-react";
import { bouncy } from "ldrs";
bouncy.register();

import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useSummary } from "@/api/INSERT";
import { useAuth } from "@/config/AuthContext";
import { useEvaluation } from "@/api/INSERT";
import { useFetchSummary } from "@/api/FETCH";
import { useStreakStore } from "@/store/useStreakStore";

export default function LastSlide({
  lessonId,
  lessonName,
  lessonDifficulty,
  answers,
  userLives,
  userScore,
  userTotal,
  gems,
  exp,
  onClick,
  userId,
}) {
  const [isPage, setPage] = useState(1);
  const [isSummaryDone, setSummaryDone] = useState(false); // Track summary completion
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double submission
  const [calculatedRewards, setCalculatedRewards] = useState({
    gems: 0,
    exp: 0,
  });
  const { session } = useAuth();
  const {
    updateLesson,
    createEvaluation,
    updateUser,
    isPending: isEvalPending,
    isError: isEvalError,
  } = useEvaluation(userId || session?.user?.id);
  const updateStreakFromLesson = useStreakStore(
    (state) => state.updateStreakFromLesson
  );

  const {
    createSummary,
    isPending: isSummaryPending,
    isError: isSummaryError,
  } = useSummary();
  const { evaluationData } = useFetchSummary();

  // Calculate actual rewards based on performance
  const calculateActualRewards = useCallback(() => {
    if (!userScore || !userTotal || !lessonDifficulty) {
      console.log("Missing data for reward calculation", {
        userScore,
        userTotal,
        gems,
        exp,
        lessonDifficulty,
      });
      return { gems: 0, exp: 0 };
    }

    // Calculate success rate (for logging purposes)
    const successRate = userScore / userTotal;
    console.log(
      `Success rate: ${successRate.toFixed(2)} (${userScore}/${userTotal})`
    );

    // Use standard difficulty-based rewards (these values must match LessonAssessment.jsx)
    let baseGemsReward, baseExpReward;

    if (lessonDifficulty === "Easy") {
      baseGemsReward = 25;
      baseExpReward = 50;
    } else if (lessonDifficulty === "Intermediate") {
      baseGemsReward = 50;
      baseExpReward = 100;
    } else if (lessonDifficulty === "Hard") {
      baseGemsReward = 100;
      baseExpReward = 200;
    } else {
      baseGemsReward = 25; // Default to Easy rewards
      baseExpReward = 50;
    }

    console.log(
      `Base rewards for ${lessonDifficulty}: ${baseGemsReward} gems, ${baseExpReward} exp`
    );

    // Return the actual reward values without any reduction
    return { gems: baseGemsReward, exp: baseExpReward };
  }, [userScore, userTotal, lessonDifficulty]);

  // Calculate rewards on component mount
  useEffect(() => {
    const rewards = calculateActualRewards();
    setCalculatedRewards(rewards);
  }, [calculateActualRewards]);

  const handleNext = (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) {
      console.log("Submission already in progress, ignoring duplicate click");
      return;
    }

    setIsSubmitting(true);

    // If onClick prop is provided, use it (for LessonAssessment.jsx integration)
    if (onClick) {
      // Pass calculated rewards as an argument to the parent component's onClick handler
      const { gems: actualGems, exp: actualExp } = calculatedRewards;
      console.log(
        `Passing rewards to parent handler: ${actualGems} gems, ${actualExp} exp`
      );
      onClick(e);
      return;
    }

    // Otherwise use the legacy behavior
    const currentUserId = userId || session?.user?.id;
    if (!currentUserId) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Update lesson progress
      updateLesson({
        userId: currentUserId,
        lessonId,
        lastAccessed: new Date().toISOString(),
        progress: 100,
        status: "Completed",
      });

      // Get calculated rewards
      const { gems: actualGems, exp: actualExp } = calculatedRewards;
      console.log(
        `Awarding rewards directly: ${actualGems} gems, ${actualExp} exp`
      );

      // Try to update streak, but check if it was already done today
      updateStreakFromLesson(currentUserId).then((streakUpdated) => {
        if (streakUpdated) {
          console.log("Streak was updated successfully");
        } else {
          console.log("Streak was already updated today, skipping increment");
        }
      });

      // Update user rewards directly - don't increment streak here
      updateUser({
        userId: currentUserId,
        gems: actualGems,
        exp: actualExp,
        streak: 0, // Don't increment streak here - it's handled by updateStreakFromLesson
        lives: 0,
      })
        .then((result) => {
          console.log("User rewards updated successfully:", result);
        })
        .catch((error) => {
          console.error("Error updating user rewards:", error);
        });

      // Continue to summary page
      setPage(2);
      setSummaryDone(false); // Reset before starting

      // Generate summary
      createSummary(
        {
          id: lessonId,
          name: lessonName,
          difficulty: lessonDifficulty,
          isAnswers: answers,
          score: userScore,
          total: userTotal,
        },
        {
          onSuccess: () => {
            setSummaryDone(true);
            setIsSubmitting(false);
          },
          onError: () => {
            setSummaryDone(false);
            setIsSubmitting(false);
          },
        }
      );
    } catch (error) {
      console.error("Error in handleNext:", error);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) {
      console.log("Submission already in progress, ignoring duplicate click");
      return;
    }

    setIsSubmitting(true);

    // If onClick prop is provided, use it (for LessonAssessment.jsx integration)
    if (onClick) {
      onClick(e);
      return;
    }

    try {
      createEvaluation({
        evaluation: evaluationData,
        userId: userId || session?.user?.id,
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner if summary or evaluation is pending
  const isLoading = isSummaryPending || isEvalPending || isSubmitting;
  const isError = isSummaryError || isEvalError;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          An error occurred.
        </h2>
        <p>Please try again.</p>
      </div>
    );
  }

  switch (isPage) {
    case 1:
      return (
        <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-primary ">
          <h1 className="text-4xl font-extrabold mb-4 text-center">
            Congratulations!
            <br /> You have completed the assessment.
          </h1>
          <div className="grid grid-cols-2  gap-x-10">
            <div>
              <p>Your Score</p>
              <h2 className="text-3xl font-bold">
                {userScore} / {userTotal}
              </h2>
            </div>
            <div>
              <p>Rewards</p>
              <div className="flex gap-5 *:flex *:items-center *:gap-0.5">
                <h2 className="text-xl font-semibold pt-1">
                  +<Gem size={18} />
                  {calculatedRewards.gems}
                </h2>
                <h2 className="text-xl font-semibold pt-1">
                  +<ZapIcon size={20} />
                  {calculatedRewards.exp}
                </h2>
              </div>
            </div>
          </div>
          <button
            className="py-3 w-3/5 mt-8 text-lg bg-white text-black font-extrabold custom-shadow-50 rounded-lg hover:bg-neutral-300 disabled:bg-gray-300 disabled:text-gray-500"
            onClick={handleNext}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Finish"}
          </button>
        </article>
      );
    case 2:
      return (
        <>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <span className="mb-4">
                <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
              </span>
              <p className="text-black">Processing your assessment...</p>
            </div>
          ) : (
            <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-black ">
              <h1 className="text-5xl font-extrabold mb-4 text-center">
                +1 Streak!
              </h1>
              <button
                className="disabled:bg-neutral-400 py-3 w-full mt-8 text-lg bg-white text-black font-extrabold custom-shadow-50 rounded-lg hover:bg-neutral-300"
                onClick={handleSubmit}
                disabled={!isSummaryDone || isLoading}
              >
                {!isSummaryDone || isLoading
                  ? "Please wait, fetching for evaluation"
                  : "Finish"}
              </button>
            </article>
          )}
        </>
      );
    default:
      return null;
  }
}

LastSlide.propTypes = {
  lessonId: PropTypes.any,
  lessonName: PropTypes.string,
  lessonDifficulty: PropTypes.string,
  answers: PropTypes.any,
  userLives: PropTypes.number,
  userScore: PropTypes.number,
  userTotal: PropTypes.number,
  gems: PropTypes.number,
  exp: PropTypes.number,
  onClick: PropTypes.func,
  userId: PropTypes.string,
};
