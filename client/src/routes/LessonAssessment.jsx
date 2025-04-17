import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "@/assets/lesson-assessment/la-intro-capybara.png";
import Questions from "./LessonQuestionnaire";
import Loading from "@/routes/Loading";
import { VideoBackground } from "@/components/layout/background";
import { HeartIcon } from "@/components/layout/stats-icons";
import NoLivesPage from "@/components/lesson-assessment/no-lives";
import IntroSlide from "@/components/lesson-assessment/IntroSlide";
import PassLastSlide from "@/components/lesson-assessment/pass-LastSlide";
import FailLastSlide from "@/components/lesson-assessment/fail-LastSlide";

// Use Hooks
import { useState, useEffect, useCallback } from "react";
import { useSummary, useEvaluation } from "@/api/INSERT";
import { fetchLessonAssessmentData } from "@/api/FETCH";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useFetchStore } from "@/store/useUserData";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestStore } from "@/store/useQuestStore";
import { useAuth } from "@/config/authContext";
import { useStreakStore } from "@/store/useStreakStore";
import { handleUpdateStreak } from "@/lib/check-day-streak";

export default function Assessment() {
  const [isIntroSlide, setIntroSlide] = useState(true);
  const [isLastSlide, setLastSlide] = useState(false);
  const [isCurrentSlide, setCurrentSlide] = useState(0);
  const [isValidateAnswer, setValidateAnswer] = useState(false);
  const [isCount, setCount] = useState({
    lives: 5,
    score: 0,
    wrong: false,
    livesLost: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { session } = useAuth();
  const lessonFetch = useLessonFetchStore((state) => state.fetch);
  const userData = useFetchStore((state) => state.fetch);
  const { data: lessonData, isLoading } = useQuery(fetchLessonAssessmentData());
  const queryClient = useQueryClient();
  const updateStreakFromLesson = useStreakStore(
    (state) => state.updateStreakFromLesson
  );
  const [isAnswers, setAnswers] = useState([
    {
      id: isCurrentSlide,
      question: "",
      answer: "",
      correct: false,
      validated: false,
    },
  ]);
  const { createSummary, isError } = useSummary();

  const { id } = useParams();
  const navigate = useNavigate();
  const userId = session?.user?.id || id;

  // Get the updateLesson function to update progress in Supabase
  const { updateLesson, updateUser } = useEvaluation(userId);

  // Track assessment performance
  const [assessmentResults, setAssessmentResults] = useState({
    score: 0,
    totalQuestions: 0,
    gemsEarned: 0,
    expEarned: 0,
    livesLost: 0,
  });

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

  // Update when assessment is completed
  const handleAssessmentSubmit = useCallback(
    (score, total) => {
      if (!lessonFetch || !userId) return;

      // Calculate success rate
      const successRate = score / total;

      // Calculate rewards based on difficulty
      const { gems, exp } = calculateRewards(lessonFetch.difficulty);

      // Determine lives lost - lose 1 life if score is less than 50%
      const livesLost = successRate < 0.5 ? 1 : 0;

      // Update the assessment results
      setAssessmentResults({
        score,
        totalQuestions: total,
        gemsEarned: gems,
        expEarned: exp,
        livesLost: livesLost,
      });

      console.log(
        `Assessment results: ${score}/${total}, Rewards: ${gems} gems, ${exp} exp, Lives lost: ${livesLost}`
      );

      return { gems, exp, livesLost };
    },
    [lessonFetch, userId, calculateRewards]
  );

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
      const totalQuestions = lessonData.questions.length - 1;
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
        await updateLesson({
          userId: userId,
          lessonId: lessonFetch.id,
          lastAccessed: new Date().toISOString(),
          progress: 100,
          status: "Completed",
        });

        console.log(`Lesson ${lessonFetch.id} marked as completed`);

        // Check if streak should be updated
        let streakUpdated = false;
        if (livesLost === 0) {
          // Use the updated function that checks if streak was already updated today
          streakUpdated = await updateStreakFromLesson(userId);
          console.log(
            streakUpdated
              ? "Streak was updated successfully"
              : "Streak was already updated today, skipping increment"
          );
        }

        // ALWAYS update rewards regardless of streak status
        try {
          const response = await updateUser({
            userId: userId,
            gems: gems,
            exp: exp,
            streak: 0, // Streak is handled by updateStreakFromLesson
            lives: livesLost,
          });

          console.log("Rewards saved to Supabase:", response);
          console.log(`EXP awarded: ${exp}, Gems awarded: ${gems}`);
          if (livesLost > 0) {
            console.log(`Lives decreased by: ${livesLost}`);
          }

          // Invalidate queries to refresh dashboard data
          queryClient.invalidateQueries(["userStats", userId]);
          queryClient.invalidateQueries(["fetch_user"]);
          console.log("Query cache invalidated, dashboard will refresh");
        } catch (error) {
          console.error("Error updating user rewards:", error);
        }
      } else {
        console.log("Assessment failed, no rewards will be given");
      }

      // Redirect to dashboard with timestamp to force refresh
      navigate(`/dashboard/${userId}?t=${Date.now()}`);
    } catch (error) {
      console.error("Error finishing assessment:", error);
      setIsSubmitting(false); // Reset submitting state on error
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

  const handleAssessmentComplete = async () => {
    try {
      // Save both lesson progress and user stats
      await saveLessonProgress();
      await updateUserStats();

      // Invalidate and refetch user stats query to update UI
      queryClient.invalidateQueries(["userStats", userId]);

      // Navigate to dashboard with timestamp parameter to force refresh
      navigate(`/dashboard/${userId}?t=${Date.now()}`);
    } catch (error) {
      console.error("Error completing assessment:", error);
      navigate(`/dashboard/${userId}?t=${Date.now()}`);
    }
  };

  if (isLoading) return <Loading />;

  if (isCount.lives === 0) return <NoLivesPage userId={userId} />;

  return (
    <>
      <main className="h-screen w-full flex justify-center items-center select-none relative overflow-hidden">
        <VideoBackground />

        <form>
          {isIntroSlide ? (
            // ------------------------
            //       FIRST PAGE
            // -------------------------
            <IntroSlide
              lessonData={lessonFetch}
              image={Image}
              gems={lessonFetch.gems}
              exp={lessonFetch.exp}
              setIntroSlide={() => setIntroSlide(false)}
            />
          ) : isLastSlide ? (
            isCount.score >= 3 ? (
              // ------------------------
              //   USER PASSED ASSESSMENT
              // -------------------------
              <PassLastSlide
                score={isCount.score}
                total={lessonData.questions.length - 1}
                gems={lessonFetch.gems}
                exp={lessonFetch.exp}
                userId={userId}
                lessonId={lessonFetch.id}
                lessonName={lessonFetch.name}
                lessonDifficulty={lessonFetch.difficulty}
                userLives={isCount.lives}
                userScore={isCount.score}
                userTotal={lessonData.questions.length - 1}
                answers={isAnswers}
                onClick={handleFinishAssessment}
              />
            ) : (
              // ------------------------
              //   USER FAILED ASSESSMENT
              // -------------------------
              <FailLastSlide
                lessonId={lessonFetch.id}
                passing={3}
                score={isCount.score}
                total={lessonData.questions.length - 1}
                onClick={handleFinishAssessment}
              />
            )
          ) : (
            <Questions
              display_wrong_answer={isCount.wrong}
              lesson_name={lessonData.name}
              type={"multiple-choice"}
              question={lessonData.questions[isCurrentSlide].text}
              options={lessonData.questions[isCurrentSlide].options}
              questionNumber={isCurrentSlide}
              correct={lessonData.questions[isCurrentSlide].correct_answer}
              isSelectedAnswer={isAnswers}
              setSelectedAnswer={setAnswers}
              validate={isValidateAnswer}
              explanation={lessonData.questions[isCurrentSlide].explanation}
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
            className="absolute bottom-0 left-0 w-full py-5 flex items-center justify-around border-t border-background
            *:flex *:py-3 *:rounded-lg *:gap-2 "
          >
            <button
              className="border-background border px-10 text-background"
              onClick={() =>
                isCurrentSlide === 0 ? setIntroSlide(true) : handleBack()
              }
            >
              <ArrowLeft />
              Back
            </button>
            <div className="flex gap-2 h-15 text-xl text-background">
              <HeartIcon />
              {isCount.lives}
            </div>

            {!isAnswers[isCurrentSlide]?.validated && !isLastSlide && (
              <button
                className="bg-[#BF8648] border-2 disabled:bg-light-brown border-foreground px-6 custom-shadow-50 text-background"
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
                className="mr-3 bg-[#BF8648] border-2 border-foreground px-6 custom-shadow-50 text-background"
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
