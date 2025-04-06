import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/lesson/header-navigator";
import { Separator } from "@/components/ui/separator";
import {
  Gem,
  SmileIcon,
  AngryIcon,
  BicepsFlexed,
  Zap,
  ZapIcon,
} from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import { Background } from "@/components/layout/background"; // Add this import
import { useQuery } from "@tanstack/react-query";
import { fetchLessonAIdata } from "@/api/FETCH"; // Adjust the import path as needed
import { useParams } from "react-router-dom";

export default function ElementLesson() {
  const { id } = useParams(); // Get the lesson ID from the URL parameters
  const { data: lessonData, isLoading } = useQuery(fetchLessonAIdata());
  if (isLoading) return <div>Loading...</div>; // Handle loading state

  if (lessonData && lessonData.id !== parseInt(id)) {
    return (
      <div className="mt-32 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Lesson not found</h2>
        <p className="mt-4">The lesson you requested could not be found.</p>
      </div>
    );
  }

  return (
    <main className="w-full h-full overflow-hidden">
      <div className="fixed top-0 bg-custom-lines h-screen w-screen -z-10"></div>
      <Background /> {/* Replace the custom background div */}
      <Header page="lesson" />
      {/* Main Content */}
      <section className="mt-32 max-w-2xl mx-auto overflow-hidden">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-[#464646] tracking-tighter leading-[48px] mb-6 [font-family:'Poppins-ExtraBold',Helvetica]">
          {lessonData.name}
        </h1>

        {/* Difficulty and Experience */}
        <div className="flex items-center gap-8 mb-8">
          {lessonData.difficulty === "Easy" && (
            <Badge
              variant="outline"
              className="h-9 w-[90px] rounded-[5px] border-2 border-emerald-500 flex items-center justify-center gap-2"
            >
              <SmileIcon className="w-[17px] h-[17px] text-emerald-600" />
              <span className="text-emerald-600 text-base">
                {lessonData.difficulty}
              </span>
            </Badge>
          )}
          {lessonData.difficulty === "Intermediate" && (
            <Badge
              variant="outline"
              className="h-9 w-[90px] rounded-[5px] border-2 text-amber-500 flex items-center justify-center gap-2"
            >
              <AngryIcon className="w-[17px] h-[17px] text-amber-500" />
              <span className="text-amber-500 text-base">
                {lessonData.difficulty}
              </span>
            </Badge>
          )}
          {lessonData.difficulty === "Hard" && (
            <Badge
              variant="outline"
              className="h-9 w-[90px] rounded-[5px] border-2 border-red-600 flex items-center justify-center gap-2"
            >
              <BicepsFlexed className="w-[17px] h-[17px] text-red-600" />
              <span className="text-red-600 text-base">
                {lessonData.difficulty}
              </span>
            </Badge>
          )}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[#7b7b7b] font-p">
              <ZapIcon className="w-4 h-4" />
              <span>{lessonData.exp} exp</span>
            </div>
            <div className="flex items-center gap-2 text-[#7b7b7b] font-p">
              <Gem className="w-4 h-4" />
              <span>{lessonData.gems} gems</span>
            </div>
          </div>
        </div>

        <Separator className="border border-foreground mb-10" />

        <Markdown
          components={{
            h2: ({ children }) => (
              <h2 className="mt-9 tracking-tight text-3xl font-semibold text-black leading-9 mb-4 [font-family:'Poppins-SemiBold',Helvetica]">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-12 text-2xl font-semibold text-black tracking-[-0.14px] leading-8 mb-4 [font-family:'Poppins-SemiBold',Helvetica]">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-black font-p my-6">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="text-black font-p">{children}</li>
            ),
            code: ({ children }) => (
              <code className="inline-block bg-foreground text-white border border-background rounded-md p-3 mb-4 text-wrap">
                {children}
              </code>
            ),

            // add for images
            // tables
          }}
        >
          {/* {content} */}
          {lessonData.message ? lessonData.message : lessonData.lesson}
        </Markdown>
      </section>
      <footer className="pb-10"></footer>
    </main>
  );
}
