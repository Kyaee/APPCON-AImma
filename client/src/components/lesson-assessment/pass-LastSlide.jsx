import { Gem, ZapIcon } from "lucide-react";
import { bouncy } from "ldrs";
bouncy.register();

import { useState } from "react";
import { useSummary } from "@/api/INSERT";
import { useAuth } from "@/config/authContext";
import { useEvaluation } from "@/api/INSERT";
import { useFetchSummary } from "@/api/FETCH";

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
}) {
  const [isPage, setPage] = useState(1);
  const { session } = useAuth();
  const { createSummary, isPending, isError } = useSummary();
  const { evaluationData, isLoading } = useFetchSummary();
  const { updateLesson, updateUser, createEvaluation } = useEvaluation(session.user.id);

  function handleNext(e) {
    e.preventDefault();

    updateLesson({
      userId: session.user.id,
      lessonId: lessonId,
      lastAccessed: new Date().toISOString(),
      progress: 100,
      status: "Completed",
    });
    updateUser({
      userId: session.user.id,
      gems: gems,
      exp: exp,
      streak: 1,
      lives: userLives,
    });

    setPage(2);
    createSummary({
      id: lessonId,
      name: lessonName,
      difficulty: lessonDifficulty,
      isAnswers: answers,
      score: userScore,
      total: userTotal,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvaluation({ evaluation: evaluationData, userId: session.user.id });
  };

  switch (isPage) {
    case 1:
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
                {userScore} / {userTotal}
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
            onClick={handleNext}
            disabled={``}
          >
            Finish
          </button>
        </article>
      );
    case 2:
      return (
        <>
          {isPending ? (
            <div>
              <span>
                <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
              </span>
            </div>
          ) : (
            <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-background ">
              <h1 className="text-5xl font-extrabold mb-4 text-center">
                +1 Streak!
              </h1>
              <button
                className="py-3 w-full mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                      hover:bg-neutral-300"
                onClick={handleSubmit}
                disabled={``}
              >
                Finish
              </button>
            </article>
          )}
        </>
      );
  }
}
