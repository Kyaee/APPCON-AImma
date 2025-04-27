import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, BookOpen, BarChart, Route, Zap } from "lucide-react";

// Feature data with icons and descriptions
const featureData = [
  {
    id: 1,
    title: "AI-Generated Courses",
    description:
      "Our AI creates personalized courses tailored to your learning style and goals, ensuring effective skill acquisition.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    image: "/showcase-features/learning.png", // Using public directory image
  },
  {
    id: 2,
    title: "Interactive Roadmap",
    description:
      "Follow a clear learning path with milestones and achievements to track your progress like Duolingo.",
    icon: <Route className="w-8 h-8 text-primary" />,
    image: "/showcase-features/gamification.png", // Using public directory image
  },
  {
    id: 3,
    title: "Quiz Assessments",
    description:
      "Test your knowledge with interactive quizzes after each lesson to reinforce your learning.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    image: "/showcase-features/quiz.png", // Using public directory image
  },
  {
    id: 4,
    title: "Skill Proficiency Analytics",
    description:
      "Detailed analytics track your progress and identify areas for improvement with data visualization.",
    icon: <BarChart className="w-8 h-8 text-primary" />,
    image: "/showcase-features/analytics.png", // Using public directory image
  },
];

export default function FeatureSlider() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextFeature = () => {
    if (isAnimating) return;
    setCurrentFeature((prev) => (prev + 1) % featureData.length);
  };

  const prevFeature = () => {
    if (isAnimating) return;
    setCurrentFeature(
      (prev) => (prev - 1 + featureData.length) % featureData.length
    );
  };

  // Reset interval when manually navigating
  const handleNavigation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    nextFeature();
    resetAutoPlayInterval();
  };

  const resetAutoPlayInterval = () => {
    intervalRef.current = window.setInterval(() => {
      nextFeature();
    }, 5000);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = useCallback(() => {
    // Minimum swipe distance to register as a swipe (in pixels)
    const minSwipeDistance = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left, go to next
        nextFeature();
      } else {
        // Swipe right, go to previous
        prevFeature();
      }

      // Reset the auto-play interval after manual navigation
      if (intervalRef.current) clearInterval(intervalRef.current);
      resetAutoPlayInterval();
    }
  }, []);

  // Auto-play functionality
  useEffect(() => {
    resetAutoPlayInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="features"
      className="w-full py-8 md:py-16 mb-35 overflow-hidden flex justify-center scroll-mt-24"
    >
      {/* Main container with auto height based on content */}
      <div className="w-[90%] md:w-4/5 border-[3px] border-black rounded-xl relative flex flex-col overflow-hidden custom-shadow-50">
        {/* Image section with responsive height - now with touch events */}
        <div
          ref={sliderRef}
          className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0">
            <img
              src={featureData[currentFeature].image}
              alt={featureData[currentFeature].title}
              className="w-full h-full object-cover rounded-t-lg"
              draggable="false" // Prevent image dragging during swipe
            />
          </div>

          {/* Indicators at bottom of image section - no background */}
          <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center items-center">
            <div className="flex gap-2 md:gap-3">
              {featureData.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 md:h-3 rounded-full transition-all ${
                    currentFeature === index
                      ? "bg-[#007CE8] w-8 md:w-10 border-black border-2"
                      : "bg-gray-400 w-2 md:w-3 border-black border-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content section with white background */}
        <div className="w-full bg-white py-6 md:py-8 rounded-b-lg border-t-3 border-black relative">
          {/* Navigation button - only visible on tablet and larger screens */}
          <button
            className="hidden md:flex absolute right-8 top-1/2 transform -translate-y-1/2 w-15 h-15 rounded-full bg-white hover:bg-[#007CE8] items-center justify-center shadow-md border-3 border-black cursor-pointer"
            onClick={() => handleNavigation()}
            aria-label="Next feature"
          >
            <ChevronRight className="h-6 w-6 text-black" />
          </button>

          <div className="container ml-0 max-w-7xl px-4 md:px-8">
            <div className="flex items-start gap-4 md:gap-8">
              {/* Larger icon on the left - hidden on mobile */}
              <div className="hidden md:block p-3 md:p-5 bg-primary/10 rounded-full border-3 border-black">
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                  {featureData[currentFeature].icon}
                </div>
              </div>

              {/* Content on the right without the button */}
              <div className="flex-1 md:pr-28 lg:pr-32">
                {/* Title at the top - centered on mobile, left-aligned on desktop */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1 md:mb-3 text-center md:text-left">
                  {featureData[currentFeature].title}
                </h2>

                {/* Description below title - centered on mobile, left-aligned on desktop  */}
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 text-center md:text-left md:max-w-none md:whitespace-normal">
                  {featureData[currentFeature].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
