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

export default function ElementLesson() {
  const { id } = useParams(); // Get the lesson ID from the URL parameters
  const generated_assessment = useLessonFetchStore(
    (state) => state.generated_assessment
  );
  const setGeneratedAssessment = useLessonFetchStore(
    (state) => state.setGeneratedAssessment
  );
  const lessonFetch = useLessonFetchStore((state) => state.fetch); // Get the lesson data from the store
  const contentRef = useRef(null); // Create a ref for the content section
  const [isLoading, setLoading] = useState(false); // State to manage loading status
  const { createAssessment, isPending, isError } = useAssessment();

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

  if (lessonFetch && lessonFetch.id !== parseInt(id)) {
    return (
      <div className="mt-32 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Lesson not found</h2>
        <p className="mt-4">The lesson you requested could not be found.</p>
      </div>
    );
  }

  // Set up scroll animations
  const handleAssessment = () => {
    setLoading(true);

    if (!generated_assessment) {
      window.location.href = `/l/${id}/assessment`;
    } else { 
      createAssessment({
        lesson_id: lessonFetch.id,
        lesson_name: lessonFetch.name,
        lesson_content: lessonFetch.lesson, 
      });
      setGeneratedAssessment(true);
      setLoading(false);
      setTimeout(()=> window.location.href = `/l/${id}/assessment`, 2000);
    }
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

        {lessonFetch.assessment && 
          <NavigateAssessment
            name={lessonFetch.name}
            onClick={handleAssessment}
            disabled={isLoading}
          />}
      </section>

      {/* CREATE FRONTEND SECTION FOR ASSESSMENT */}
      <footer className="mb-20"></footer>
    </main>
  );
}
