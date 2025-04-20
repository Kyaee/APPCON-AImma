import { markLessonCompleted } from "@/api/UPDATE"; // Add this import
import ProgressBar from "@/components/lesson-assessment/scroll-progressbar";
import { Background } from "@/components/layout/Background"; // Add this import
import Loading from "./Loading";
import LessonArticle from "@/components/layout/lesson/LessonArticle";
import FormattedContent from "@/components/layout/lesson/markdownFormat";
import CapyStart from "@/assets/lesson-assessment/CapyStart.png";

import NavigateAssessment from "@/components/layout/lesson/navigate-assessment";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/config/supabase";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useLessonFetchStore } from "@/store/useLessonData"; // Adjust the import path as needed
import { useAssessment, useEvaluation } from "@/api/INSERT";
import { useAuth } from "@/config/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useStreakStore } from "@/store/useStreakStore"; // Import the streak store
import { useQuestStore } from "@/store/useQuestStore"; // Import quest store
import { useTimeTracking } from "@/lib/timeTracker"; // Import time tracking hook

export default function ElementLesson() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the lesson ID from the URL parameters
  const { session } = useAuth();
  const queryClient = useQueryClient(); // Added for query invalidation
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
  const updateStreakFromLesson = useStreakStore(
    (state) => state.updateStreakFromLesson
  );
  const reviewLesson = useQuestStore((state) => state.reviewLesson); // Get reviewLesson action
  const { startTracking, stopTracking } = useTimeTracking(session?.user?.id); // Get time tracking functions

  // Add state to track user performance
  const [userPerformance, setUserPerformance] = useState({
    gemsEarned: 0,
    expEarned: 0,
    livesLost: 0,
    streakIncrement: 1, // Assuming completing a lesson adds 1 to streak
  });

  // Get the updateLesson function to update progress in Supabase
  const { updateLesson, updateUser } = useEvaluation(session?.user?.id);

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

    // Consider it complete if within 5px of bottom OR above 95% scrolled
    if (scrollHeight - scrollTop - clientHeight < 5 || scrollPercentage > 95) {
      return 100;
    }

    return Math.round(scrollPercentage);
  }, []);

  // Calculate rewards based on lesson difficulty
  const calculateRewards = useCallback(() => {
    // Default rewards (no assessment: 15 exp, 10 gems)
    let gems = 10;
    let exp = 15;

    // If the lesson has specific rewards defined, use those
    if (lessonFetch?.gems && lessonFetch?.exp) {
      gems = lessonFetch.gems;
      exp = lessonFetch.exp;
    }

    return { gems, exp };
  }, [lessonFetch]);

  // Function to award rewards for completing a lesson without assessment
  const awardLessonRewards = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const { gems, exp } = calculateRewards();

      console.log(`Awarding rewards: ${gems} gems, ${exp} exp`);

      // Update user data with rewards - REMOVED streak: 1
      await updateUser({
        userId: session.user.id,
        gems: gems,
        exp: exp,
        // streak: 1, // REMOVED - Streak is handled by updateStreakFromLesson in assessments
        lives: 0, // No lives lost for lessons without assessment
      });

      // Invalidate user data queries to refresh dashboard when user returns
      queryClient.invalidateQueries({
        queryKey: ["userStats", session.user.id],
      });

      console.log("Rewards awarded successfully");
    } catch (error) {
      console.error("Error awarding rewards:", error);
    }
  }, [session, calculateRewards, updateUser, queryClient]);

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

        const wasAlreadyCompleted = currentData?.status === "Completed";
        const shouldComplete = finalProgress >= 100 && !lessonFetch.assessment;
        const status = shouldComplete
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

        // If lesson is completed (100% progress) and has no assessment, mark it completed
        // Only award if the lesson wasn't previously completed
        if (shouldComplete && status === "Completed" && !wasAlreadyCompleted) {
          console.log(
            "Lesson completed without assessment - marking completed, awarding rewards, and updating streak"
          );
          // Call the function to mark lesson completed and update roadmap progress
          const completionResult = await markLessonCompleted(lessonFetch);

          if (completionResult.success) {
            console.log(
              `Lesson ${lessonFetch.id} marked completed. Roadmap progress: ${completionResult.progress}%`
            );
            await awardLessonRewards();

            // Attempt to update streak
            const streakUpdated = await updateStreakFromLesson(session.user.id);
            console.log(
              streakUpdated
                ? "Streak was updated successfully (Lesson)"
                : "Streak was already updated today, skipping increment (Lesson)"
            );

            // Invalidate queries to refresh dashboard data when user returns
            queryClient.invalidateQueries({
              queryKey: ["userStats", session.user.id],
            });
            queryClient.invalidateQueries({ queryKey: ["fetch_user"] });
            // Invalidate lessons query for the specific roadmap to update progress display
            queryClient.invalidateQueries({
              queryKey: ["lessons", lessonFetch.roadmap_id],
            });
            // Invalidate roadmap query as well
            if (session?.user?.id) {
              queryClient.invalidateQueries({
                queryKey: ["roadmaps", session.user.id],
              }); // Invalidate roadmap data
            }
          } else {
            console.error(
              "Failed to mark lesson as completed:",
              completionResult.error
            );
            // Optionally, revert status or handle error
          }
        } else if (!shouldComplete) {
          // If not completing, just update progress and last accessed time
          await updateLesson({
            userId: session.user.id,
            lessonId: lessonFetch.id,
            lastAccessed: new Date().toISOString(),
            progress: finalProgress,
            status: status, // Use the determined status (likely 'in_progress' or existing)
          });
        }

        console.log("Progress saved successfully");
        return true;
      } catch (error) {
        console.error("Error saving progress:", error);
        return false;
      }
    }
    return false;
  }, [
    session,
    lessonFetch,
    highestProgress,
    updateLesson,
    queryClient,
    awardLessonRewards,
    updateStreakFromLesson, // Add updateStreakFromLesson to dependencies
  ]);

  // Add this function to your component
  const handleQuit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    // Stop time tracking before saving progress and navigating
    const minutes = stopTracking();
    console.log(`Time tracking stopped on quit. ${minutes} minutes recorded.`);

    if (session?.user?.id && lessonFetch?.id) {
      try {
        // First, get the current stored progress from Supabase
        const { data: currentData } = await supabase
          .from("lessons")
          .select("progress, status")
          .eq("user_id", session.user.id)
          .eq("id", lessonFetch.id)
          .single();

        // Use the highest progress value between current progress in Supabase and new progress
        const finalProgress = Math.max(
          currentData?.progress || 0,
          highestProgress
        );
        console.log(`Saving highest progress: ${finalProgress}%`);

        // Determine if the lesson should be marked as completed
        const shouldComplete = finalProgress >= 100 && !lessonFetch.assessment;
        const newStatus = shouldComplete ? "Completed" : lessonFetch.status;

        // Ensure we wait for this to complete
        await updateLesson({
          userId: session.user.id,
          lessonId: lessonFetch.id,
          lastAccessed: new Date().toISOString(),
          progress: finalProgress, // Use the higher value
          status: newStatus,
        });

        // If lesson is completed without assessment, award rewards
        if (shouldComplete && newStatus === "Completed") {
          console.log("Lesson completed without assessment - awarding rewards");
          await awardLessonRewards();

          // Invalidate queries to refresh dashboard data
          queryClient.invalidateQueries(["userStats", session.user.id]);
          queryClient.invalidateQueries(["fetch_user"]);
        }

        console.log(`Progress saved: ${finalProgress}%`);
      } catch (error) {
        console.error("Failed to save progress before quitting:", error);
      } finally {
        setLoading(false);
        // Make sure we're navigating to the right URL with a timestamp to force refresh
        navigate(`/dashboard/${session.user.id}?t=${Date.now()}`);
      }
    } else {
      setLoading(false);
      navigate(`/dashboard/${session.user.id}?t=${Date.now()}`);
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
      // Stop tracking time before saving progress
      const minutes = stopTracking();
      console.log(
        `Time tracking stopped on unload. ${minutes} minutes recorded.`
      );
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
  }, [saveProgress, stopTracking]); // Add stopTracking dependency

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
    const MIN_DELTA = 5; // Reduce the minimum delta for progress updates - was 11

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

    // Force an initial calculation to ensure correct starting progress
    setTimeout(() => {
      handleScroll();
    }, 500);

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

  // Start time tracking on mount, stop on unmount
  useEffect(() => {
    startTracking();
    console.log("Time tracking started for lesson.");
    return () => {
      const minutes = stopTracking();
      console.log(`Time tracking stopped. ${minutes} minutes recorded.`);
    };
  }, [startTracking, stopTracking]); // Add dependencies

  // Add useEffect to trigger reviewLesson when a completed lesson is loaded
  useEffect(() => {
    if (
      session?.user?.id &&
      lessonFetch?.id &&
      lessonFetch.status === "Completed"
    ) {
      console.log(`Attempting to mark lesson ${lessonFetch.id} as reviewed.`);
      reviewLesson(lessonFetch.id, session.user.id);
    }
  }, [lessonFetch, session, reviewLesson]);

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
      <Background className="bg-[#FFECD0] opacity-35" />

      <section className="mt-50 max-w-2xl mx-auto overflow-hidden">
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
      <img
        src={CapyStart}
        className="fixed transform top-1/2 -translate-y-1/2 w-55 h-auto -right-20 -rotate-55"
      />
    </main>
  );
}
