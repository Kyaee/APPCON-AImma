import ProgressBar from "@/components/lesson-assessment/scroll-progressbar";
import { Background } from "@/components/layout/Background"; // Add this import
import Loading from "./loading";
import LessonArticle from "@/components/layout/lesson/LessonArticle";
import FormattedContent from "@/components/layout/lesson/markdownFormat";
import NavigateAssessment from "@/components/layout/lesson/navigate-assessment";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLessonFetchStore } from "@/store/useLessonData"; // Adjust the import path as needed
import { useEffect, useRef } from "react";
import { useAssessment } from "@/api/INSERT";
import { useQuery } from "@tanstack/react-query";
import { fetchLesson } from "@/api/FETCH";

// Import timer tracking functionality
import { useTimeTracking } from "@/lib/timeTracker";
import { useQuestStore } from "@/store/useQuestStore";

export default function Lesson() {
  const { id } = useParams(); // Get the lesson ID from the URL parameters
  const [loading, setLoading] = useState(false);
  const [generated_assessment, setGeneratedAssessment] = useState(false);
  const contentRef = useRef(null); // Create a ref for the content section

  // Time tracking for quests
  const { startTracking, stopTracking } = useTimeTracking(id);
  const reviewLesson = useQuestStore((state) => state.reviewLesson);

  // Query
  const {
    data: lessonFetch,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["lessonFetch", id],
    queryFn: () => fetchLesson(id),
    select: (data) => data[0],
  });

  const { createAssessment, isError: lessonError } = useAssessment(id);

  // Start time tracking when lesson loads
  useEffect(() => {
    if (lessonFetch?.id) {
      startTracking();

      // Mark this lesson as reviewed for the "Review 3 previous lessons" quest
      reviewLesson(lessonFetch.id, id);
    }

    return () => {
      // When component unmounts, stop tracking and update quest progress
      if (lessonFetch?.id) {
        stopTracking();
      }
    };
  }, [lessonFetch?.id, startTracking, stopTracking, reviewLesson, id]);

  // Scroll animation effect
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
      { threshold: 0.1 }
    );

    const animatedElements = contentRef.current.querySelectorAll("*");

    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lessonFetch]);

  if (lessonFetch && lessonFetch.id !== parseInt(id)) {
    return (
      <div className="mt-32 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Lesson not found</h2>
        <p className="mt-4">The lesson you requested could not be found.</p>
      </div>
    );
  }

  // Handle assessment
  const handleAssessment = () => {
    setLoading(true);

    if (!generated_assessment) {
      createAssessment({
        lesson_id: lessonFetch.id,
        lesson_name: lessonFetch.name,
        lesson_content: lessonFetch.lesson,
      });
      setGeneratedAssessment(true);
      setLoading(false);
    } else window.location.href = `/l/${id}/assessment`;
  };

  if (isPending) return <Loading generate_assessment={true} />;

  return (
    <main className="w-full h-full overflow-hidden">
      <ProgressBar />
      <Background className="opacity-90" />

      {/* Main Content */}
      <section
        ref={contentRef}
        className="mt-40 max-w-2xl mx-auto overflow-hidden"
      >
        <LessonArticle
          name={lessonFetch.name}
          difficulty={lessonFetch.difficulty}
          duration={lessonFetch.duration}
          exp={lessonFetch.exp}
          gems={lessonFetch.gems}
          assessment={lessonFetch.assessment}
        />
        {/* Title */}
        <FormattedContent>
          {lessonFetch.message ? lessonFetch.message : lessonFetch.lesson}
        </FormattedContent>

        {lessonFetch.assessment && (
          <NavigateAssessment
            name={lessonFetch.name}
            onClick={handleAssessment}
            disabled={isLoading}
          />
        )}
      </section>

      {/* CREATE FRONTEND SECTION FOR ASSESSMENT */}
      <footer className="mb-20"></footer>
    </main>
  );
}
