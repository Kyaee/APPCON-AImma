import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Gem,
  SmileIcon,
  AngryIcon,
  BicepsFlexed,
  Hourglass,
  ZapIcon,
} from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import { Background } from "@/components/layout/background"; // Add this import
import { useParams } from "react-router-dom";
import { useLessonFetchStore } from "@/store/useLessonData"; // Adjust the import path as needed
import { useEffect, useRef } from "react";
import { postPrompt3 } from "@/api/INSERT";

export default function ElementLesson() {
  const { id } = useParams(); // Get the lesson ID from the URL parameters
  const lessonFetch = useLessonFetchStore((state) => state.fetch); // Get the lesson data from the store
  const contentRef = useRef(null); // Create a ref for the content section

  if (lessonFetch && lessonFetch.id !== parseInt(id)) {
    return (
      <div className="mt-32 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Lesson not found</h2>
        <p className="mt-4">The lesson you requested could not be found.</p>
      </div>
    );
  }

  // Set up scroll animations
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const animatedElements = contentRef.current.querySelectorAll(
      "h1, h2, h3, p, ul, .badge-container, code"
    );

    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lessonFetch]);

  const handleAssessment = () =>
    postPrompt3(lessonFetch.id, lessonFetch.name, lessonFetch.lesson);

  return (
    <main className="w-full h-full overflow-hidden">
      <div className="animated-progress-bar fixed left-0 top-0 h-2 border-b border-black w-full bg-light-brown z-50"></div>
      <div className="fixed left-0 top-0 h-2 w-full bg-gray border-b border-black z-40"></div>

      <Background />
      {/* Main Content */}
      <section
        ref={contentRef}
        className="mt-32 max-w-2xl mx-auto overflow-hidden"
      >
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-[#464646] tracking-tighter leading-[48px] mb-6 [font-family:'Poppins-ExtraBold',Helvetica]">
          {lessonFetch.name}
        </h1>

        {/* Difficulty and Experience */}
        <div className="badge-container flex items-center gap-8 mb-8">
          {lessonFetch.difficulty === "Easy" && (
            <Badge
              variant="outline"
              className="h-9 w-[90px] rounded-[5px] border-2 border-emerald-500 flex items-center justify-center gap-2"
            >
              <SmileIcon className="w-[17px] h-[17px] text-emerald-600" />
              <span className="text-emerald-600 text-base">
                {lessonFetch.difficulty}
              </span>
            </Badge>
          )}
          {lessonFetch.difficulty === "Intermediate" && (
            <Badge
              variant="outline"
              className="h-9 w-[90px] rounded-[5px] border-2 text-amber-500 flex items-center justify-center gap-2"
            >
              <AngryIcon className="w-[17px] h-[17px] text-amber-500" />
              <span className="text-amber-500 text-base">
                {lessonFetch.difficulty}
              </span>
            </Badge>
          )}
          {lessonFetch.difficulty === "Hard" && (
            <Badge
              variant="outline"
              className="h-9 w-[90px] rounded-[5px] border-2 border-red-600 flex items-center justify-center gap-2"
            >
              <BicepsFlexed className="w-[17px] h-[17px] text-red-600" />
              <span className="text-red-600 text-base">
                {lessonFetch.difficulty}
              </span>
            </Badge>
          )}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-foreground font-p">
              <Hourglass className="w-4 h-4" />
              <span>{lessonFetch.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-[#7b7b7b] font-p">
              <ZapIcon className="w-4 h-4" />
              <span>{lessonFetch.exp} exp</span>
            </div>
            <div className="flex items-center gap-2 text-[#7b7b7b] font-p">
              <Gem className="w-4 h-4" />
              <span>{lessonFetch.gems} gems</span>
            </div>
            {lessonFetch.assessment && (
              <div className="flex items-center gap-2 text-[#7b7b7b] font-p">
                <span className="text-red-500">w/ Assessment</span>
              </div>
            )}
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
          }}
        >
          {lessonFetch.message ? lessonFetch.message : lessonFetch.lesson}
        </Markdown>
      </section>
      {/* CREATE FRONTEND SECTION FOR ASSESSMENT */}
      <footer className="pb-10"></footer>
    </main>
  );
}
