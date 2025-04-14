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
  Hourglass,
} from "lucide-react";
import React from "react";
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
      lesson.assessment
    );
  };

  return (
    <div className="transition animate-panel-in fixed transform left-0 top-0 h-full w-full lg:max-w-lg z-[100] bg-gray-50 border-1 border-solid border-black">
      <div className="flex flex-col h-full justify-between gap-8 relative w-full p-10 ">
        {/* Header with title and actions */}
        <section>
          <article className="mt-15 mb-4 flex w-full items-start justify-between">
            <h1 className="transition animate-text-reveal  font-extrabold text-[#464646] text-3xl tracking-[-1px] leading-8 font-['Poppins-ExtraBold',Helvetica]">
              {lesson.lesson_name}
            </h1>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="p-0 rounded-full bg-card"
              >
                <Share2 className="size-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="p-0 rounded-full bg-card"
                onClick={() => setOpenLesson(false)}
              >
                <X className="size-6" />
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
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Hourglass size={17} />
                {lesson.lesson_duration
                  ? lesson.lesson_duration
                  : "No description available. Sorry! :(("}
              </div>
              {lesson.lesson_difficulty === "Easy" && (
                <div className="flex items-center gap-2">
                  <SmileIcon className="size-6 text-green-600" />
                  <span className="font-bold text-green-600 text-sm leading-[22px] font-['Inter-Bold',Helvetica]">
                    Easy
                  </span>
                </div>
              )}
              {lesson.lesson_difficulty === "Intermediate" && (
                <div className="flex items-center gap-2">
                  <AngryIcon className="size-6 text-amber-500" />
                  <span className="font-bold text-amber-500 text-sm leading-[22px] font-['Inter-Bold',Helvetica]">
                    Medium
                  </span>
                </div>
              )}
              {lesson.lesson_difficulty === "Hard" && (
                <div className="flex items-center gap-2">
                  <BicepsFlexed className="size-6 text-red-600" />
                  <span className="font-bold text-red-600 text-sm leading-[22px] font-['Inter-Bold',Helvetica]">
                    Hard
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {lesson.gems && (
                <Badge className="h-7 px-2 py-[7px] bg-card text-foreground rounded-sm border border-solid border-black hover:bg-[#fff7f7]">
                  +{lesson.gems} gems
                </Badge>
              )}
              {lesson.exp && (
                <Badge className="h-7 px-2 py-[7px] bg-card text-foreground rounded-sm border border-solid border-black hover:bg-[#fff7f7]">
                  +{lesson.exp} exp
                </Badge>
              )}
            </div>
          </div>
        </section>

        <section className="overflow-y-auto h-full">
          <h2 className="text-[#4b4b4b] font-bold text-base mb-3">
            Description
          </h2>
          <p className="mb-5 pr-2 transition animate-text-fade text-[#7b7b7b] text-base font-normal font-['Inter-Regular',Helvetica] leading-[22px]">
            {lesson.lesson_description
              ? lesson.lesson_description
              : "No description available. Sorry! :(("}
          </p>
        </section>

        {/* Main content area */}
        <div className="flex flex-col gap-5 transition animate-text-fade justify-center w-full">
          {/* Left column - Description and Outline */}
          <div className="max-w-lg w-108 flex flex-col gap-7">
            {/* Progress card */}
            <Card className="bg-[#fff7f7] border-black shadow-[4px_4px_0px_#00000080] rounded-md py-5">
              <CardContent className="flex flex-col items-center justify-center px-6">
                <p className="w-full flex justify-between text-[#444444] text-base font-medium">
                  <span>Progress:</span>
                  <span>{lesson.progress}%</span>
                </p>
                <div className="w-full mt-1">
                  <Progress
                    value={lesson.progress}
                    className="h-[11px] rounded-full border border-solid border-[#4b4b4b] bg-[color:var(--shadcn-ui-app-secondary)]"
                  />
                </div>
              </CardContent>
            </Card>
            <div>
              <Button
                onClick={createLesson}
                className="disabled:animated-gradient-bg-subtle disabled:cursor-loading w-full h-12 bg-light-brown text-foreground text-lg font-semibold border border-solid border-black shadow-[4px_4px_0px_#00000080] rounded-md hover:bg-[#fff7f7] hover:text-[#444444]"
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
