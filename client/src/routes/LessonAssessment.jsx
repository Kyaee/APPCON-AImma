import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "@/assets/lesson-assessment/la-intro-capybara.png";
import Questions from "./LessonQuestionnaire";
import Loading from "@/routes/Loading";
import { VideoBackground } from "@/components/layout/Background";
import { HeartIcon } from "@/components/layout/stats-icons";
import NoLivesPage from "@/components/lesson-assessment/no-lives";
import IntroSlide from "@/components/lesson-assessment/IntroSlide";
import PassLastSlide from "@/components/lesson-assessment/pass-LastSlide";
import FailLastSlide from "@/components/lesson-assessment/fail-LastSlide";
import { markLessonCompleted } from "@/api/UPDATE";
import capyCry from "@/assets/lesson-assessment/CapySad.png"; // Import the crying capybara image

// Use Hooks
import { useState, useEffect, useCallback } from "react";
import { useSummary, useEvaluation } from "@/api/INSERT";
import { fetchLessonAssessmentData, fetchUserdata } from "@/api/FETCH";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useFetchStore } from "@/store/useUserData";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestStore } from "@/store/useQuestStore"; // Import useQuestStore
import { useAuth } from "@/config/AuthContext";
import { useStreakStore } from "@/store/useStreakStore";
import { handleUpdateStreak } from "@/lib/check-day-streak";
import { useNavigation } from "@/context/navigationContext"; // Import the navigation context properly

export default function Assessment() {
  const [isIntroSlide, setIntroSlide] = useState(true);
  const [isLastSlide, setLastSlide] = useState(false);
  const [isCurrentSlide, setCurrentSlide] = useState(0);
  const [isValidateAnswer, setValidateAnswer] = useState(false);
  const [isCount, setCount] = useState({
    lives: 5, // Default to 5, will be updated with user's actual HP (capped at 5)
    score: 0,
    wrong: false,
    livesLost: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTotalLives, setUserTotalLives] = useState(5); // Track user's total lives in the database
  const [assessmentAttempts, setAssessmentAttempts] = useState(0); // Track assessment attempts

  const { session } = useAuth();
  const lessonFetch = useLessonFetchStore((state) => state.fetch);
  const userData = useFetchStore((state) => state.fetch);
  const { data: lessonData, isLoading } = useQuery(fetchLessonAssessmentData());
  const queryClient = useQueryClient();

  // Fetch user data to get lives/HP information
  const { data: userDataFetched, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["fetch_user", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("lives, user_id")
        .eq("user_id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  const updateStreakFromLesson = useStreakStore(
    (state) => state.updateStreakFromLesson
  );
  const completeLessonTest = useQuestStore((state) => state.completeLessonTest); // Get quest action
  const { setSuppressNavigation } = useNavigation(); // Get the function from hook
  const [isAnswers, setAnswers] = useState([
    {
      id: isCurrentSlide,
      question: "",
      answer: "",
      correct: false,
      validated: false,
    },
  ]);

  const { id } = useParams();
  const navigate = useNavigate();
  const userId = session?.user?.id || id;

  // Get the updateLesson function to update progress in Supabase
  const { updateLesson, updateUser } = useEvaluation(userId);

  // Initialize lives based on user data when it's loaded
  useEffect(() => {
    if (userDataFetched && !isUserDataLoading) {
      // Get user's total lives from database, default to 5 if not available
      const totalLives = userDataFetched.lives || 5;
      setUserTotalLives(totalLives);

      // Cap assessment lives at 5, or use actual value if less than 5
      const assessmentLives = Math.min(totalLives, 5);

      // Update the lives count for the assessment
      setCount((prev) => ({ ...prev, lives: assessmentLives }));
    }
  }, [userDataFetched, isUserDataLoading]);

  // Calculate rewards based on difficulty
  const calculateRewards = useCallback((difficulty) => {
    // Default reward values based on difficulty
    let baseGemsReward, baseExpReward;

    // Set rewards based on difficulty as per prompt_roadmap_generate:
    // Easy: 50 exp, 25 gems
    // Intermediate: 100 exp, 50 gems
    // Hard: 200 exp, 100 gems
    if (difficulty === "Easy") {
      baseGemsReward = 25;
      baseExpReward = 50;
    } else if (difficulty === "Intermediate") {
      baseGemsReward = 50;
      baseExpReward = 100;
    } else if (difficulty === "Hard") {
      baseGemsReward = 100;
      baseExpReward = 200;
    } else {
      // Default to Easy if difficulty is undefined
      baseGemsReward = 25;
      baseExpReward = 50;
    }

    console.log(
      `Standard rewards for ${difficulty} difficulty: ${baseGemsReward} gems, ${baseExpReward} exp`
    );

    // Return fixed rewards values based only on difficulty (not success rate)
    return { gems: baseGemsReward, exp: baseExpReward };
  }, []);

  // Modify this useEffect to better handle assessment generation and loading states
  useEffect(() => {
    // Only attempt to skip the intro slide if we have actual question data available
    // This prevents transitioning to an empty questionnaire
    if (!isLoading && lessonData?.questions?.length > 0 && isIntroSlide) {
      const generatedAssessment =
        useLessonFetchStore.getState().generated_assessment;
      if (generatedAssessment) {
        console.log("Assessment questions loaded, proceeding to questionnaire");
        setIntroSlide(false);
        // Reset the flag only after we've successfully transitioned
        useLessonFetchStore.getState().setGeneratedAssessment(false);
      }
    }
  }, [isLoading, lessonData, isIntroSlide]);

  // Remove the additional useEffect that might be causing duplicate transitions
  // The single useEffect above will handle both checking for generated assessment
  // and ensuring questions are actually loaded

  // Modified effect to only hide center navigation elements, not the entire header
  useEffect(() => {
    // Use "centerNav" to indicate we want to keep the header but hide the center tabs
    // This new value will need to be handled in the header-navigator component
    if (!isIntroSlide && !isLastSlide) {
      setSuppressNavigation("centerNav");
    } else {
      setSuppressNavigation(null);
    }

    // Restore navigation when leaving
    return () => setSuppressNavigation(null);
  }, [isIntroSlide, isLastSlide, setSuppressNavigation]);

  // Function to handle retrying the assessment
  const handleRetryAssessment = () => {
    // Increment attempts counter
    setAssessmentAttempts((prev) => prev + 1);

    // Reset assessment state
    setIntroSlide(true); // Go back to intro slide
    setLastSlide(false);
    setCurrentSlide(0);
    setValidateAnswer(false);

    // Update lives with remaining lives from database (capped at 5)
    const remainingLives = Math.min(userTotalLives - isCount.livesLost, 5);

    setCount({
      lives: remainingLives,
      score: 0,
      wrong: false,
      livesLost: 0, // Reset lives lost for this assessment attempt
    });

    // Reset answers
    setAnswers([
      {
        id: 0,
        question: "",
        answer: "",
        correct: false,
        validated: false,
      },
    ]);

    // Refetch question data if needed
    queryClient.invalidateQueries(["lessonAssessment"]);
  };

  const handleCheck = () => {
    setValidateAnswer(true);
    const isCorrect =
      isAnswers[isCurrentSlide]?.answer ===
      lessonData.questions[isCurrentSlide]?.correct_answer;

    // Create updated answer record
    setAnswers({
      ...isAnswers,
      [isCurrentSlide]: {
        id: isCurrentSlide,
        question: lessonData.questions[isCurrentSlide].text,
        answer: isAnswers[isCurrentSlide]?.answer,
        correct: isCorrect,
        validated: true,
      },
    });

    // Update score and lives
    if (!isCorrect) {
      // Track lives lost immediately when an answer is wrong
      setCount((prevCount) => ({
        ...prevCount,
        lives: prevCount.lives - 1,
        wrong: true,
        livesLost: (prevCount.livesLost || 0) + 1, // Track total lives lost during assessment
      }));
      console.log("Wrong answer! Decreased lives by 1");
    } else {
      setCount((prevCount) => ({
        ...prevCount,
        score: prevCount.score + 1,
      }));
      console.log("Correct answer! Increased score by 1");
    }
  };

  const handleNext = () => {
    setValidateAnswer(false); // Returns false
    setCount({ ...isCount, wrong: false });
    if (isCurrentSlide === lessonData.questions.length - 2) setLastSlide(true);
    setCurrentSlide(isCurrentSlide + 1);
  };

  const handleBack = () => {
    setCurrentSlide(isCurrentSlide - 1);
    if (isCurrentSlide === lessonData.questions.length - 1) setLastSlide(false);
  };

  // Function to handle completion and redirect to dashboard
  const handleFinishAssessment = async () => {
    // Prevent double submission
    if (isSubmitting) {
      console.log("Submission already in progress, ignoring duplicate click");
      return;
    }

    // Set submitting state to true
    setIsSubmitting(true);

    if (!userId || !lessonFetch) {
      navigate(`/dashboard/${userId}?t=${Date.now()}`);
      return;
    }

    try {
      // Calculate final score and determine lives lost
      const totalQuestions = lessonData.questions.length - 1; // Define totalQuestions here
      const successRate = isCount.score / totalQuestions;

      // Get the fixed rewards based on difficulty only
      const { gems, exp } = calculateRewards(lessonFetch.difficulty);

      // Get the exact number of lives lost during assessment
      const livesLost = isCount.livesLost || 0;

      console.log(`Assessment results for ${lessonFetch.name}:`);
      console.log(
        `Score: ${isCount.score}/${totalQuestions} (${Math.round(
          successRate * 100
        )}%)`
      );
      console.log(`Rewards: ${gems} gems, ${exp} exp`);
      console.log(`Lives lost during assessment: ${livesLost}`);

      // Update lesson as completed in Supabase if user passes
      if (isCount.score >= 3) {
        console.log(
          `Assessment passed for lesson ${lessonFetch.id}. Marking complete and updating progress.`
        );

        // --- MODIFICATION START ---
        // Use markLessonCompleted instead of direct updateLesson for completion
        // Ensure lessonFetch.roadmap_id is available and passed
        const completionResult = await markLessonCompleted(
          lessonFetch.id,
          lessonFetch.roadmap_id
        );

        if (completionResult.success) {
          console.log(
            `Lesson ${lessonFetch.id} marked completed via assessment. Roadmap progress: ${completionResult.progress}%`
          );

          // --- Call completeLessonTest quest action ---
          try {
            await completeLessonTest(userId, isCount.score, totalQuestions);
            console.log("completeLessonTest quest action triggered.");
          } catch (questError) {
            console.error(
              "Error triggering completeLessonTest quest action:",
              questError
            );
          }
          // --- End quest action call ---

          // Check if streak should be updated (only if passed with 0 lives lost)
          let streakUpdated = false;
          if (livesLost === 0) {
            streakUpdated = await updateStreakFromLesson(userId);
            console.log(
              streakUpdated
                ? "Streak was updated successfully (Assessment)"
                : "Streak was already updated today, skipping increment (Assessment)"
            );
          } else {
            console.log(
              `Streak not updated because ${livesLost} lives were lost during the assessment.`
            );
          }

          // ALWAYS update rewards regardless of streak status if passed
          try {
            const response = await updateUser({
              userId: userId,
              gems: gems,
              exp: exp,
              streak: 0, // Streak is handled by updateStreakFromLesson
              lives: livesLost, // Pass the actual lives lost during assessment
            });
            console.log("User rewards/lives updated via assessment:", response);

            // Invalidate queries to refresh dashboard data
            queryClient.invalidateQueries({ queryKey: ["userStats", userId] });
            queryClient.invalidateQueries({ queryKey: ["fetch_user"] });
            queryClient.invalidateQueries({
              queryKey: ["lessons", lessonFetch.roadmap_id],
            }); // Invalidate lessons for this roadmap
            queryClient.invalidateQueries({ queryKey: ["roadmaps", userId] }); // Invalidate roadmap data to update progress %
          } catch (error) {
            console.error(
              "Error updating user rewards/lives via assessment:",
              error
            );
          }
        } else {
          console.error(
            "Failed to mark lesson as completed via assessment:",
            completionResult.error
          );
          // Fallback: Update lesson locally if server update fails
          await updateLesson({
            userId: userId,
            lessonId: lessonFetch.id,
            lastAccessed: new Date().toISOString(),
            progress: 100, // Still set progress to 100
            status: "Completed", // Mark as completed locally anyway
          });
        }
        // --- MODIFICATION END ---
      } else {
        // User failed
        console.log(
          "Assessment failed, lesson not marked completed, no rewards given."
        );
        // Still update lives lost even on failure
        try {
          await updateUser({
            userId: userId,
            gems: 0, // No gems on failure
            exp: 0, // No exp on failure
            streak: 0,
            lives: livesLost, // Record lives lost
          });
          console.log("User lives updated after failed assessment.");
          queryClient.invalidateQueries({ queryKey: ["userStats", userId] });
          queryClient.invalidateQueries({ queryKey: ["fetch_user"] });
        } catch (updateError) {
          console.error(
            "Error updating user lives after failed assessment:",
            updateError
          );
        }
        // Optionally update lesson progress even if failed
        // You might want to save the score or keep the old progress
        await updateLesson({
          userId: userId,
          lessonId: lessonFetch.id,
          lastAccessed: new Date().toISOString(),
          // Example: Save score as progress percentage, capped at 99 if failed?
          progress: Math.min(
            99,
            Math.max(
              lessonFetch.progress || 0,
              Math.round((isCount.score / totalQuestions) * 100)
            )
          ),
          status: "in_progress", // Keep as in_progress
        });
        // Invalidate lesson data even on failure if progress was updated
        queryClient.invalidateQueries({
          queryKey: ["lessons", lessonFetch.roadmap_id],
        });
      }

      // Redirect to dashboard with timestamp to force refresh
      setIsSubmitting(false); // Reset state before navigating
      navigate(`/dashboard/${userId}?t=${Date.now()}`);
    } catch (error) {
      console.error("Error finishing assessment:", error);
      setIsSubmitting(false); // Reset submitting state on error
      // Redirect even on error to avoid getting stuck
      navigate(`/dashboard/${userId}?t=${Date.now()}`);
    }
  };

  // Update user stats in the database
  const updateUserStats = async () => {
    if (!userId || !lessonFetch) return false;

    try {
      // Get fixed rewards based on lesson difficulty
      const { gems, exp } = calculateRewards(lessonFetch.difficulty);

      // Calculate lives lost based on wrong answers
      const totalQuestions = lessonData.questions.length - 1;
      const livesLost = isCount.livesLost || totalQuestions - isCount.score;

      // Check if we should update streak
      let streakUpdated = false;
      if (livesLost === 0 && isCount.score >= 3) {
        // Try to update streak using the streakStore method that includes the daily check
        streakUpdated = await updateStreakFromLesson(userId);
      }

      // Update user data with rewards (but don't increment streak here)
      await updateUser({
        userId: userId,
        gems: gems,
        exp: exp,
        streak: 0, // Don't increment streak here
        lives: livesLost,
      });

      console.log("User stats updated with rewards:", {
        gems,
        exp,
        livesLost,
        streakUpdated,
      });
      return true;
    } catch (error) {
      console.error("Error updating user stats:", error);
      return false;
    }
  };

  const saveLessonProgress = async () => {
    if (!userId || !lessonFetch) return false;

    try {
      const totalQuestions = lessonData.questions.length - 1;
      const progress = Math.floor((isCount.score / totalQuestions) * 100);
      const status = progress >= 70 ? "Completed" : "In-progress";

      await updateLesson({
        userId: userId,
        lessonId: lessonFetch.id,
        lastAccessed: new Date().toISOString(),
        progress: progress,
        status: status,
      });

      console.log("Lesson progress saved successfully");
      return true;
    } catch (error) {
      console.error("Error saving lesson progress:", error);
      return false;
    }
  };

  // Enhance the loading condition to be more comprehensive
  // Show loading state when:
  // 1. Data is being fetched initially
  // 2. Questions array doesn't exist or is empty
  const showLoading =
    isLoading ||
    isUserDataLoading ||
    !lessonData?.questions ||
    lessonData.questions.length === 0;

  if (showLoading) return <Loading generate_assessment={true} />;

  // Check if user has no lives left in assessment and database
  if (isCount.lives === 0) {
    // Calculate remaining lives in database after this assessment
    const remainingLivesInDb = Math.max(0, userTotalLives - isCount.livesLost);

    // If there are still lives left in the database, show fail slide with retry option
    if (remainingLivesInDb > 0) {
      return (
        <FailLastSlide
          lessonId={lessonFetch?.id}
          passing={3}
          score={isCount.score}
          total={lessonData.questions.length - 1}
          onClick={handleFinishAssessment}
          remainingLives={remainingLivesInDb}
          onRetry={handleRetryAssessment}
        />
      );
    }

    // If no lives left in database, show NoLivesPage
    return <NoLivesPage userId={userId} />;
  }

  // Add additional check to ensure lessonData and questions are available
  const hasValidQuestions =
    lessonData &&
    Array.isArray(lessonData.questions) &&
    lessonData.questions.length > 0;

  return (
    <>
      <main className="h-screen w-full flex justify-center items-center select-none relative overflow-hidden">
        <VideoBackground headerVisible={true} />{" "}
        {/* Add prop to indicate header is visible */}
        <form>
          {isIntroSlide ? (
            // ------------------------
            //       FIRST PAGE
            // -------------------------
            <IntroSlide
              lessonData={lessonData ? lessonData : {}}
              gems={lessonFetch?.gems}
              exp={lessonFetch?.exp}
              setIntroSlide={() => setIntroSlide(false)}
              disabled={showLoading}
              // Always use "Start Assessment" button text, never "Generate and Start"
              buttonText="Start Assessment"
            />
          ) : isLastSlide ? (
            isCount.score >= 3 ? (
              // ------------------------
              //   USER PASSED ASSESSMENT
              // -------------------------
              <PassLastSlide
                score={isCount?.score}
                total={hasValidQuestions ? lessonData.questions.length - 1 : 0}
                gems={lessonFetch?.gems}
                exp={lessonFetch?.exp}
                userId={userId}
                lessonId={lessonFetch?.id}
                lessonName={lessonFetch?.name}
                lessonDifficulty={lessonFetch?.difficulty}
                userLives={isCount.lives}
                userScore={isCount.score}
                userTotal={
                  hasValidQuestions ? lessonData.questions.length - 1 : 0
                }
                answers={isAnswers}
                onClick={handleFinishAssessment}
              />
            ) : (
              // ------------------------
              //   USER FAILED ASSESSMENT
              // -------------------------
              <FailLastSlide
                lessonId={lessonFetch?.id}
                passing={3}
                score={isCount.score}
                total={hasValidQuestions ? lessonData.questions.length - 1 : 0}
                onClick={handleFinishAssessment}
              />
            )
          ) : (
            // RENDER QUESTIONS - remove the ternary/fallback and just render Questions
            <Questions
              display_wrong_answer={isCount.wrong}
              lesson_name={lessonData.name || "Assessment"}
              type={"multiple-choice"}
              question={
                lessonData.questions[isCurrentSlide]?.text ||
                "Loading question..."
              }
              options={lessonData.questions[isCurrentSlide]?.options || []}
              questionNumber={isCurrentSlide}
              correct={
                lessonData.questions[isCurrentSlide]?.correct_answer || ""
              }
              isSelectedAnswer={isAnswers}
              setSelectedAnswer={setAnswers}
              validate={isValidateAnswer}
              explanation={
                lessonData.questions[isCurrentSlide]?.explanation || ""
              }
            />
          )}
        </form>
        {/*********************************************
                  FOOTER DESIGN LOGIC
        **********************************************/}
        {isIntroSlide ? (
          <></>
        ) : (
          <footer
            className="absolute bottom-0 left-0 w-full py-3 flex items-center justify-around border-3 bg-black/50 border-black
            *:flex *:py-3 *:rounded-lg *:gap-2 "
          >
            <button
              className="bg-brown hover:bg-dark-brown cursor-pointer transition-all duration-400 border-primary px-10 text-white custom-shadow-75 border-2"
              onClick={() =>
                isCurrentSlide === 0 ? setIntroSlide(true) : handleBack()
              }
            >
              <ArrowLeft />
              Back
            </button>
            <div className="flex gap-2 h-15 text-xl text-white">
              <HeartIcon />
              {isCount.lives}
              <p>HP</p>
            </div>

            {!isAnswers[isCurrentSlide]?.validated && !isLastSlide && (
              <button
                className="bg-brown hover:bg-dark-brown cursor-pointer transition-all duration-400 border-2 disabled:bg-light-brown border-black px-9 custom-shadow-75 text-white"
                onClick={handleCheck}
                disabled={!isAnswers[isCurrentSlide]?.answer}
              >
                {/* You can create a ternary operator for this {STATE ? }   */}
                Check
                <ArrowRight />
              </button>
            )}
            {isAnswers[isCurrentSlide]?.validated && (
              <button
                className="mr-3 bg-[#BF8648] border-2 border-black px-6 custom-shadow-50 text-white"
                onClick={handleNext}
                disabled={isCurrentSlide === lessonData.questions.length - 1}
              >
                {/* You can create a ternary operator for this {STATE ? } */}
                Next
                <ArrowRight />
              </button>
            )}
          </footer>
        )}
      </main>
    </>
  );
}
