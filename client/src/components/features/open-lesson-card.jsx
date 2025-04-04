import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Share2,
  SmileIcon,
  X,
} from "lucide-react";
import React from "react";

export default function OpenLesson({ lesson, setOpenLesson }) {
  

  return (
    <div className="transition animate-panel-in fixed transform left-0 top-0 h-full w-full lg:max-w-lg z-30 bg-gray-50 border-1 border-solid border-black">
      <div className="flex flex-col h-full justify-between gap-8 relative w-full p-10 ">
        {/* Header with title and actions */}
        <div className="mt-15 flex w-full items-start justify-between">
          <div className="space-y-8">
            <h1 className="font-extrabold text-[#464646] text-3xl tracking-[-1px] leading-8 font-['Poppins-ExtraBold',Helvetica]">
              {lesson.lesson_name}
            </h1>

            <div className="flex items-center gap-2">
              {lesson.lesson_category?.map((tag, index) => (
                <Badge
                  key={index}
                  className="h-7 px-2.5 py-1 bg-[#353535] text-[#d9d9d9] rounded-none hover:bg-[#353535]"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <section>
              <h2 className="text-[#4b4b4b] font-bold text-base mb-3">
                Description
              </h2>
              <p className=" text-[#7b7b7b] text-base font-normal font-['Inter-Regular',Helvetica] leading-[22px]">
                {lesson.lesson_description
                  ? lesson.lesson_description
                  : "No description available. Sorry! :(("}
              </p>
            </section>
          </div>

          <div className="flex items-center gap-4">
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
        </div>

        {/* Main content area */}
        <div className="flex justify-center gap-20 w-full">
          {/* Left column - Description and Outline */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <SmileIcon className="size-6 text-green-600" />
                <span className="font-bold text-green-600 text-sm leading-[22px] font-['Inter-Bold',Helvetica]">
                  Easy
                </span>
              </div>
              <div className="flex gap-2">
                {lesson.gems && (
                  <Badge className="h-7 px-2 py-[7px] bg-card text-foreground rounded-sm border border-solid border-black hover:bg-[#fff7f7]">
                    50 Gems
                  </Badge>
                )}
                {lesson.exp && (
                  <Badge className="h-7 px-2 py-[7px] bg-card text-foreground rounded-sm border border-solid border-black hover:bg-[#fff7f7]">
                    +000 exp.
                  </Badge>
                )}
              </div>
            </div>

            <div className="max-w-lg w-110 flex flex-col gap-7">
              {/* Progress card */}
              <Card className="bg-[#fff7f7] border-black shadow-[4px_4px_0px_#00000080] rounded-md">
                <CardContent className="flex flex-col items-center justify-center px-6">
                  <p className="text-[#444444] text-base font-medium text-center">
                    75% done
                  </p>
                  <div className="w-full mt-1">
                    <Progress
                      value={75}
                      className="h-[11px] rounded-full border border-solid border-[#4b4b4b] bg-[color:var(--shadcn-ui-app-secondary)]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full h-12 bg-light-brown text-foreground text-lg font-semibold border border-solid border-black shadow-[4px_4px_0px_#00000080] rounded-md hover:bg-[#fff7f7] hover:text-[#444444]">
                Start Learning
              </Button>
              {/* Difficulty and rewards */}
            </div>
          </div>

          {/* Right column - Course details */}
          {/* Features card */}
          {/* <Card className="bg-[#fff7f7] border-black shadow-[4px_4px_0px_#00000080] rounded-none">
                <CardContent className="flex flex-col gap-3 py-[17px] px-[19px]">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-[15px]">
                      <div className="flex items-center justify-center w-10 h-10 bg-[#444444] rounded-[20px]">
                        {feature.icon}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[#444444] text-base font-semibold font-['Inter-SemiBold',Helvetica] leading-5">
                          {feature.title}
                        </p>
                        <p className="text-[#7b7b7b] text-sm font-normal font-['Inter-Regular',Helvetica] leading-4">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card> */}
        </div>
      </div>
    </div>
  );
}
