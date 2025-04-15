import ProgressBar from "@/components/lesson-assessment/scroll-progressbar";
import { Background } from "@/components/layout/Background"; // Add this import
import Loading from "./loading";
import LessonArticle from "@/components/layout/lesson/LessonArticle";
import FormattedContent from "@/components/layout/lesson/markdownFormat";
import NavigateAssessment from "@/components/layout/lesson/navigate-assessment";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useLessonFetchStore } from "@/store/useLessonData"; // Adjust the import path as needed
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
  const scrollProgress = useLessonFetchStore((state) => state.scrollProgress); // Get the scroll progress from the store
  const setScrollProgress = useLessonFetchStore(
    (state) => state.setScrollProgress
  ); // Function to set scroll progress
  const contentRef = useRef(null); // Attach to main
  const [isLoading, setLoading] = useState(false); // State to manage loading status
  const { createAssessment, isPending } = useAssessment();

  // Memoize scroll handler for performance
  const calculateScrollProgress = useCallback((main) => {
    const { scrollTop, scrollHeight, clientHeight } = main;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return 100;
    const percent = scrollTop / maxScroll;
    return Math.round(percent * 100);
  }, []);

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
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lessonFetch]);

  useEffect(() => {
    const main = contentRef.current;
    if (!main) return;

    let lastProgress = scrollProgress;
    let lastUpdate = 0;
    let ticking = false;
    const THROTTLE_MS = 1; // ~30fps
    const MIN_DELTA = 11; // Only update if progress changes by at least 0.5%

    const handleScroll = () => {
      const now = performance.now();
      if (!ticking && now - lastUpdate > THROTTLE_MS) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const newProgress = calculateScrollProgress(main);
          if (Math.abs(newProgress - lastProgress) >= MIN_DELTA) {
            setScrollProgress(newProgress);
            lastProgress = newProgress;
            lastUpdate = now;
          }
          ticking = false;
        });
      }
    };

    main.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      main.removeEventListener("scroll", handleScroll);
    };
  }, [lessonFetch, calculateScrollProgress]);

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

    if (generated_assessment) {
      setGeneratedAssessment(false);
      window.location.href = `/l/${id}/assessment`;
    } else {
      createAssessment({
        lesson_id: lessonFetch.id,
        lesson_name: lessonFetch.name,
        lesson_content: lessonFetch.lesson,
      });
      setGeneratedAssessment(true);
      setLoading(false);
      setTimeout(() => (window.location.href = `/l/${id}/assessment`), 2000);
    }
  };

  if (isPending) return <Loading generate_assessment={true} />;

  return (
    <main
      ref={contentRef}
      className="w-full h-screen overflow-y-auto scroll-smooth"
    >
      <Suspense
        fallback={<div className="h-2 bg-gray-200 animate-pulse w-full" />}
      >
        <ProgressBar progress={scrollProgress} />
      </Suspense>
      <Background className="opacity-90" />
      <section className="mt-40 max-w-2xl mx-auto overflow-hidden">
        <LessonArticle
          name={lessonFetch?.name}
          difficulty={lessonFetch?.difficulty}
          duration={lessonFetch?.duration}
          exp={lessonFetch?.exp}
          gems={lessonFetch?.gems}
          assessment={lessonFetch?.assessment}
        />
        {/* Title */}
        <FormattedContent>
          {lessonFetch?.message ? lessonFetch?.message : lessonFetch?.lesson}
        </FormattedContent>

        {lessonFetch?.assessment ? (
          <NavigateAssessment
            name={lessonFetch?.name}
            onClick={handleAssessment}
            disabled={isLoading}
          />
        ) : (
          <article className="flex mt-10">
            <p className="text-3xl font-extrabold">End of lesson.</p>
          </article>
        )}
      </section>
      <div className="fixed bottom-5 transform left-5 text-neutral-400 text-balance text-sm w-full max-w-md">
        Please take note that CapyCademy,
        <br />
        can make mistakes, check important info.
      </div>
      <footer className="mb-20"></footer>
    </main>
  );
}
