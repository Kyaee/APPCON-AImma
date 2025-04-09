import { ArrowLeft, ArrowRight, Gem, ZapIcon } from "lucide-react";
import Image from "@/assets/lesson-assessment/la-intro-capybara.png";
import { bouncy } from "ldrs";
bouncy.register();
import Questions from "./questions";
import Header from "@/components/layout/lesson/header-navigator";
import Loading from "@/routes/loading";
import { VideoBackground } from "@/components/layout/background";
import { HeartIcon } from "@/assets/general/stats-icons";
import { Link } from "react-router-dom";

// Use Hooks
import { useState } from "react";
import { fetchLessonAssessmentData } from "@/api/FETCH";
import { useQuery } from "@tanstack/react-query";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useFetchStore } from "@/store/useUserData";

// FIX LIVES LOGIC
// POST DATA TO -> AI -> DATABASE
// POST DATA TO -> USER -> DATABASE
// FIX FUCKING ASSESSMENT

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

  const handleCheck = () => {
    // PROCESSING ANSWER VALIDATION
    setValidateAnswer(true);
    const isCorrect =
      isAnswers[isCurrentSlide]?.answer ===
      lessonData.questions[isCurrentSlide]?.correct_answer;
    // Update isAnswers state
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

  if (isLoading) return <Loading />;
  if (isCount.lives === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <VideoBackground />
        <h1 className="text-4xl font-bold mb-4 text-background">
          You have no lives left!
        </h1>
        <p className="text-lg text-background">Wait for more lives.</p>
        <Link
          to={`/dashboard/${userData.id}`}
          className="py-3 px-4 mt-8 text-lg bg-white text-black font-extrabold custom-shadow-50 rounded-md hover:bg-neutral-300"
        >
          Go back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <>
      <main className="h-screen w-full flex justify-center items-center select-none relative overflow-hidden">
        <VideoBackground />
        <Header />

        <form>
          {isIntroSlide ? (
            <article className="flex flex-col items-center justify-center p-8 h-full md:p-12 relative text-background ">
              <img src={Image} alt="capybara superhero" />
              <h1 className="text-4xl font-extrabold mb-4">
                Start Your Assessment.
              </h1>
              <p className="mb-2">Rewards</p>
              <div className="grid grid-cols-2 gap-x-8 mb-4 text-xl *:flex *:gap-2 *:items-center ">
                <div>
                  <Gem size={20} />
                  {lessonFetch.gems} gems
                </div>
                <div>
                  <ZapIcon size={23} />
                  {lessonFetch.exp} exp.
                </div>
              </div>
              <button
                className="py-3 w-3/5 mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                hover:bg-neutral-300"
                onClick={() => setIntroSlide(false)}
              >
                Start
              </button>
            </article>
          ) : isLastSlide ? (
            isCount.score >= 3 ? (
              <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-background ">
                <h1 className="text-4xl font-extrabold mb-4 text-center">
                  Congratulations!
                  <br /> You have completed the assessment.
                </h1>
                <div className="grid grid-cols-2  gap-x-10">
                  <div>
                    <p>Your Score</p>
                    <h2 className="text-3xl font-bold">
                      {isCount.score} / {lessonData.questions.length - 1}
                    </h2>
                  </div>
                  <div>
                    <p>Rewards</p>
                    <div className="flex gap-5 *:flex *:items-center *:gap-0.5">
                      <h2 className="text-xl font-semibold pt-1">
                        +<Gem size={18} />
                        {lessonFetch.gems}
                      </h2>
                      <h2 className="text-xl font-semibold pt-1">
                        +<ZapIcon size={20} />
                        {lessonFetch.exp}
                      </h2>
                    </div>
                  </div>
                </div>
                <button
                  className="py-3 w-3/5 mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                  hover:bg-neutral-300"
                  onClick={() => setIntroSlide(false)}
                >
                  Finish
                </button>
              </article>
            ) : (
              <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-background ">
                <h1 className="text-4xl font-extrabold mb-4 text-center">
                  Hey! &nbsp;Let's try again
                  <br />{" "}
                  <span className="px-2 bg-light-brown animate-text-reveal">
                    Don't worry
                  </span>{" "}
                  we all have bad days.
                </h1>
                <div className="flex gap-2 gap-x-10">
                  <div>
                    <p>Your Score</p>
                    <h2 className="text-3xl font-bold">
                      {isCount.score} / {lessonData.questions.length - 1}
                    </h2>
                  </div>
                  <div>
                    <p>Rewards</p>
                    <h2 className="text-xl font-semibold pt-1 text-gray-200">
                      Reach at least 3 points to earn rewards.
                    </h2>
                  </div>
                </div>
                <Link
                  to={`/lesson/${lessonData.id}`}
                  className="py-3 w-3/5 mt-8 text-lg text-center bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                  hover:bg-neutral-300"
                >
                  Back to Lesson
                </Link>
              </article>
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
