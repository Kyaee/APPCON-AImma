import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "@/assets/lesson-assessment/la-intro-capybara.png";
import Questions from "./LessonQuestionnaire";
import Loading from "@/routes/loading";
import { VideoBackground } from "@/components/layout/background";
import { HeartIcon } from "@/components/layout/stats-icons";
import NoLivesPage from "@/components/lesson-assessment/no-lives";
import IntroSlide from "@/components/lesson-assessment/IntroSlide";
import PassLastSlide from "@/components/lesson-assessment/pass-LastSlide";
import FailLastSlide from "@/components/lesson-assessment/fail-LastSlide";

// Use Hooks
import { useState, useEffect } from "react";
import { useSummary, useEvaluation } from "@/api/INSERT";
import { fetchLessonAssessmentData } from "@/api/FETCH";
import { useQuery } from "@tanstack/react-query";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useFetchStore } from "@/store/useUserData";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestStore } from "@/store/useQuestStore";
import { useAuth } from "@/config/authContext";
import { useEvaluation } from "@/api/INSERT";

export default function Assessment() {
  const [isIntroSlide, setIntroSlide] = useState(true);
  const [isLastSlide, setLastSlide] = useState(false);
  const [isCurrentSlide, setCurrentSlide] = useState(0);
  const [isValidateAnswer, setValidateAnswer] = useState(false);
  const [isCount, setCount] = useState({
    lives: 5,
    score: 0,
    wrong: false,
  });

  const { session } = useAuth();
  const lessonFetch = useLessonFetchStore((state) => state.fetch);
  const userData = useFetchStore((state) => state.fetch);
  const { data: lessonData, isLoading } = useQuery(fetchLessonAssessmentData());
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
  const userId = id; // Assuming the URL parameter id is the user ID

  // Get the updateLesson function to update progress in Supabase
  const { updateLesson } = useEvaluation(session?.user?.id);

  const handleCheck = () => {
    setValidateAnswer(true);
    const isCorrect =
      isAnswers[isCurrentSlide]?.answer ===
      lessonData.questions[isCurrentSlide]?.correct_answer;
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
      setCount({ ...isCount, lives: isCount.lives - 1, wrong: true });
    } else setCount({ ...isCount, score: isCount.score + 1 });
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

  // Add function to handle completion and redirect to dashboard
  const handleFinishAssessment = () => {
    // Update lesson as completed in Supabase if user passes
    if (isCount.score >= 3 && session?.user?.id && lessonFetch?.id) {
      updateLesson({
        userId: session.user.id,
        lessonId: lessonFetch.id,
        lastAccessed: new Date().toISOString(),
        progress: 100,
        status: "Completed",
      });
    }

    // Redirect to dashboard where quests will be displayed
    navigate(`/dashboard/${userId}`);
  };

  if (isLoading) return <Loading />;

  if (isCount.lives === 0) return <NoLivesPage userId={userData.id} />;

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
