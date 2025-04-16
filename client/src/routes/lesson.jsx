import ProgressBar from "@/components/lesson-assessment/scroll-progressbar";
import { Background } from "@/components/layout/Background"; // Add this import
import Loading from "./loading";
import LessonArticle from "@/components/layout/lesson/LessonArticle";
import FormattedContent from "@/components/layout/lesson/markdownFormat";
import NavigateAssessment from "@/components/layout/lesson/navigate-assessment";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/config/supabase";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useLessonFetchStore } from "@/store/useLessonData"; // Adjust the import path as needed
import { useAssessment, useEvaluation } from "@/api/INSERT";
import { useAuth } from "@/config/authContext";

export default function ElementLesson() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the lesson ID from the URL parameters
  const { session } = useAuth();
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

  // Get the updateLesson function to update progress in Supabase
  const { updateLesson } = useEvaluation(session?.user?.id);

  // Keep track of highest progress to avoid decreasing on page reload
  const [highestProgress, setHighestProgress] = useState(
    lessonFetch?.progress || 0
  );

  // Memoize scroll handler for performance
  const calculateScrollProgress = useCallback((main) => {
    const { scrollTop, scrollHeight, clientHeight } = main;
    const maxScroll = scrollHeight - clientHeight;

    // If there's no scroll needed
    if (maxScroll <= 0) {
      return 100;
    }

    // Calculate percentage more accurately
    const scrollPercentage = (scrollTop / maxScroll) * 100;

    // Consider it complete if within 20px of bottom OR above 98% scrolled
    if (scrollHeight - scrollTop - clientHeight < 20 || scrollPercentage > 98) {
      return 100;
    }

    return Math.round(scrollPercentage);
  }, []);

  // Function to save progress to Supabase
  const saveProgress = useCallback(async () => {
    if (session?.user?.id && lessonFetch?.id && highestProgress > 0) {
      try {
        // First, get the current stored progress from Supabase
        const { data: currentData } = await supabase
          .from("lessons")
          .select("progress, status")
          .eq("user_id", session.user.id)
          .eq("id", lessonFetch.id)
          .single();

        // Use the highest progress value between current progress in DB and new progress
        const finalProgress = Math.max(
          currentData?.progress || 0,
          highestProgress
        );

        const status =
          finalProgress >= 100 && !lessonFetch.assessment
            ? "Completed"
            : currentData?.status || lessonFetch.status;

        console.log(`Saving progress: ${finalProgress}%, status: ${status}`);

        await updateLesson({
          userId: session.user.id,
          lessonId: lessonFetch.id,
          lastAccessed: new Date().toISOString(),
          progress: finalProgress,
          status: status,
        });
        console.log("Progress saved successfully");
        return true;
      } catch (error) {
        console.error("Error saving progress:", error);
        return false;
      }
    }
    return false;
  }, [session, lessonFetch, highestProgress, updateLesson]);

  // Add this function to your component
  const handleQuit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    if (session?.user?.id && lessonFetch?.id) {
      try {
        // First, get the current stored progress from Supabase
        const { data: currentData } = await supabase
          .from("lessons")
          .select("progress")
          .eq("user_id", session.user.id)
          .eq("id", lessonFetch.id)
          .single();

        // Use the highest progress value between current progress in Supabase and new progress
        const finalProgress = Math.max(
          currentData?.progress || 0,
          highestProgress
        );
        console.log(`Saving highest progress: ${finalProgress}%`);

        // Ensure we wait for this to complete
        await updateLesson({
          userId: session.user.id,
          lessonId: lessonFetch.id,
          lastAccessed: new Date().toISOString(),
          progress: finalProgress, // Use the higher value
          status:
            finalProgress >= 100 && !lessonFetch.assessment
              ? "Completed"
              : lessonFetch.status,
        });

        console.log(`Progress saved: ${finalProgress}%`);
      } catch (error) {
        console.error("Failed to save progress before quitting:", error);
      } finally {
        setLoading(false);
        // Make sure we're navigating to the right URL with a timestamp
        navigate(`/dashboard/${session.user.id}?t=${Date.now()}`);
      }
    } else {
      setLoading(false);
      navigate(`/dashboard/${session.user.id}`);
    }
  };

  // Initialize unload listener
  useEffect(() => {
    // For navigation within the app (like going back to dashboard)
    const handlePopState = async (e) => {
      // If we're navigating away, try to save progress first
      if (document.visibilityState !== "hidden") {
        e.preventDefault();
        await saveProgress();
      }
    };

    // For page refresh or closing
    const handleBeforeUnload = (e) => {
      saveProgress();
      // Standard practice to show "unsaved changes" dialog
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [saveProgress]);

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

            // Update highest progress
            if (newProgress > highestProgress) {
              setHighestProgress(newProgress);
            }

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
  }, [
    lessonFetch,
    calculateScrollProgress,
    highestProgress,
    setScrollProgress,
  ]);

  // Save progress to Supabase when component unmounts or user navigates away
  useEffect(() => {
    // Save progress when component unmounts
    return () => {
      saveProgress();
    };
  }, [saveProgress]);

  // Periodically save progress while the user is viewing the lesson
  useEffect(() => {
    // Only start saving if we have the necessary data
    if (!session?.user?.id || !lessonFetch?.id || highestProgress <= 0) {
      return;
    }

    // Save progress every 15 seconds while the user is active
    const intervalId = setInterval(() => {
      saveProgress();
    }, 15000); // 15 seconds instead of 30

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [session, lessonFetch, highestProgress, saveProgress]);

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

    // Save highest progress before navigating to assessment
    if (session?.user?.id && lessonFetch?.id) {
      updateLesson({
        userId: session.user.id,
        lessonId: lessonFetch.id,
        lastAccessed: new Date().toISOString(),
        progress: highestProgress,
        status: highestProgress >= 100 ? "In Progress" : lessonFetch.status,
      });
    }

    if (generated_assessment) {
      setGeneratedAssessment(false);
      navigate(`/l/${id}/assessment`);
    } else {
      createAssessment({
        lesson_id: lessonFetch.id,
        lesson_name: lessonFetch.name,
        lesson_content: lessonFetch.lesson,
      });
      setGeneratedAssessment(true);
      setLoading(false);
      setTimeout(() => navigate(`/l/${id}/assessment`), 2000);
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
