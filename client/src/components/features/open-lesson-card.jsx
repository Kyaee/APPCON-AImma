import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Share2,
  SmileIcon,
  AngryIcon,
  BicepsFlexed,
  X,
  Target,
  Hourglass,
  CheckCircle,
} from "lucide-react";
import React, { useEffect } from "react";
import { postPrompt2 } from "@/api/INSERT";

export default function OpenLesson({ lesson, setOpenLesson, setLoading }) {
  const createLesson = () => {
    setLoading(true);
    postPrompt2(
      lesson.lesson_name,
      lesson.id,
      lesson.lesson_category,
      lesson.lesson_difficulty,
      lesson.gems,
      lesson.exp,
      lesson.lesson_duration,
      lesson.assessment,
      lesson.progress
    );
  };

  // Update your isCompleted check to handle assessment scenarios
  const isCompleted =
    lesson.status === "Completed" ||
    (lesson.progress === 100 && !lesson.assessment);

  // Keep track of progress percentage separately from completion status
  const displayProgress = lesson.progress || 0;

  return (
    <div className="transition animate-panel-in fixed transform left-0 top-0 h-full w-full lg:max-w-lg z-[100] bg-gray-50 dark:bg-dark-inner-bg border-r-3 border-black dark:border-dark-mode-highlight">
      <div className="flex flex-col h-full justify-between gap-8 relative w-full p-10">
        <section>
          <article className="mt-15 mb-4 flex w-full items-start justify-between">
            <h1 className="transition animate-text-reveal font-extrabold text-black dark:text-primary text-3xl tracking-[-1px] leading-8 font-['Poppins-ExtraBold',Helvetica]">
              {lesson.lesson_name}
            </h1>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="p-0 rounded-full bg-white dark:bg-dark-inner-bg hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight"
              >
                <Share2 className="size-6 text-black dark:text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="p-0 rounded-full bg-white dark:bg-dark-inner-bg hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight"
                onClick={() => setOpenLesson(false)}
              >
                <X className="size-6 text-black dark:text-primary" />
              </Button>
            </div>
          </article>
          <article className="mb-4 transition animate-text-fade flex items-center gap-2">
            {lesson.lesson_category?.map((tag, index) => (
              <Badge
                key={index}
                className="h-7 px-2.5 py-1 bg-[#353535] text-[#d9d9d9] rounded-none hover:bg-[#353535]"
              >
                {tag}
              </Badge>
            ))}
          </article>
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <div className="flex items-center gap-1">
                <Hourglass size={17} />
                {lesson.lesson_duration
                  ? lesson.lesson_duration
                  : "No description available. Sorry! :(("}
              </div>
              {lesson.lesson_difficulty === "Easy" && (
                <div className="flex items-center gap-1">
                  <SmileIcon className="size-6 text-green-600" />
                  <span className="font-bold text-green-600 text-sm leading-[22px] font-['Inter-Bold',Helvetica]">
                    Easy
                  </span>
                </div>
              )}
              {lesson.lesson_difficulty === "Intermediate" && (
                <div className="flex items-center gap-1">
                  <AngryIcon className="size-6 text-amber-500" />
                  <span className="font-bold text-amber-500 text-sm leading-[22px] font-['Inter-Bold',Helvetica]">
                    Medium
                  </span>
                </div>
              )}
              {lesson.lesson_difficulty === "Hard" && (
                <div className="flex items-center gap-1">
                  <BicepsFlexed className="size-6 text-red-600" />
                  <span className="font-bold text-red-600 text-sm leading-[22px] font-['Inter-Bold',Helvetica]">
                    Hard
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {lesson.gems && (
                <Badge className="h-7 px-2 py-[7px] bg-white dark:bg-dark-inner-bg text-black dark:text-primary rounded-sm border border-solid border-black dark:border-dark-mode-highlight hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight">
                  +{lesson.gems} gems
                </Badge>
              )}
              {lesson.exp && (
                <Badge className="h-7 px-2 py-[7px] bg-white dark:bg-dark-inner-bg text-black dark:text-primary rounded-sm border border-solid border-black dark:border-dark-mode-highlight hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight">
                  +{lesson.exp} exp
                </Badge>
              )}
            </div>
          </div>
        </section>

        <section className="overflow-y-auto h-full">
          <h2 className="text-[#4b4b4b] dark:text-primary font-bold text-base mb-3">
            Description
          </h2>
          <p className="mb-5 pr-2 transition animate-text-fade text-[#7b7b7b] dark:text-primary text-base font-normal font-['Inter-Regular',Helvetica] leading-[22px]">
            {lesson.description
              ? lesson.description
              : "No description available. Sorry! :(("}
          </p>
        </section>

        {/* Main content area */}
        <div className="flex flex-col gap-5 transition animate-text-fade justify-center w-full">
          {/* Left column - Description and Outline */}
          {lesson.assessment ? (
            <p className="flex gap-2 items-center border-2 border-blue-500 w-auto p-2 rounded-md text-blue-500">
              <Target /> With Assessment
            </p>
          ) : (
            <p className="flex gap-2 items-center border-2 border-light-brown w-auto p-2 rounded-md text-brown">
              <Target /> No Assessment
            </p>
          )}
          <div className="max-w-lg w-108 flex flex-col gap-7">
            {/* Progress card */}
            <Card className="bg-[#fff7f7] dark:bg-dark-mode-highlight border-black dark:border-[color:var(--dark-mode-highlight)] shadow-[4px_4px_0px_#00000080] rounded-md py-5">
              <CardContent className="flex flex-col items-center justify-center px-6">
                <p className="w-full flex justify-between text-[#444444] dark:text-primary text-base font-medium">
                  {isCompleted ? (
                    <span className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="size-5" /> Completed
                    </span>
                  ) : (
                    <span>Progress:</span>
                  )}
                  <span>{displayProgress}%</span>
                </p>
                <div className="w-full mt-1">
                  <Progress
                    value={displayProgress}
                    className={`h-[11px] rounded-full border border-solid border-[#4b4b4b] ${
                      isCompleted
                        ? "bg-green-200"
                        : "bg-[color:var(--shadcn-ui-app-secondary)]"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
            <div>
              <Button
                onClick={createLesson}
                className="disabled:animated-gradient-bg-subtle disabled:cursor-loading w-full h-12 bg-white dark:bg-dark-inner-bg text-black dark:text-primary text-lg font-semibold border border-solid border-black dark:border-dark-mode-highlight shadow-[4px_4px_0px_#00000080] rounded-md hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight"
              >
                {isCompleted ? "Review Lesson" : "Start Learning"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
