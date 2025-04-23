import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/layout/Background";
import brandIcon from "@/assets/general/brandicon.png";
import Loading from "@/routes/Loading"; // Import the Loading component

const IntroSlides = [
  {
    id: "welcome",
    logo: true,
    title: "Welcome to",
    subtitle: "Here's how our platform helps you grow professionally.",
    brandName: "CapyCademy!",
    button: "Let's Go!",
  },
  {
    id: "learning-paths",
    title: "Personalized Learning Paths",
    subtitle:
      "AI tailors courses based on your assessment results, ensuring you learn exactly what you need.",
    image: "/showcase-features/learning.png",
    button: "Next",
  },
  {
    id: "quizzes",
    title: "Interactive Quizzes",
    subtitle:
      "Test your knowledge and track your progress with interactive quizzes.",
    image: "/showcase-features/quiz.png",
    button: "Next",
  },
  {
    id: "gamified",
    title: "Gamified Experience",
    subtitle:
      "Earn badges, level up, and compete on leaderboards to stay motivated.",
    image: "/showcase-features/gamification.png",
    button: "Next",
  },
  {
    id: "opportunities",
    title: "Opportunities Hub",
    subtitle:
      "Access exclusive job offers, internships, and networking opportunities.",
    image: "/showcase-features/opportunity.png",
    button: "Next",
  },
  {
    id: "analytics",
    title: "Real-Time Analytics",
    subtitle:
      "Monitor your skill development with detailed analytics and insights.",
    image: "/showcase-features/analytics.png",
    button: "Next", // This is now the last slide in the showcase flow
  },
  // Removed the assessment slide from here
];

const Showcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false); // Add loading state

  // Preload images and handle initial delay
  useEffect(() => {
    const imageSources = IntroSlides.filter((slide) => slide.image).map(
      (slide) => slide.image
    );

    const preloadImages = (sources) => {
      return Promise.all(
        sources.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
    };

    let timer;
    const loadContent = async () => {
      try {
        await preloadImages(imageSources);
        // Ensure minimum delay even if images load quickly
        timer = setTimeout(() => {
          setIsReady(true);
        }, 800); // Adjust delay as needed
      } catch (error) {
        console.error("Failed to preload images:", error);
        // Still show content after delay even if images fail
        timer = setTimeout(() => {
          setIsReady(true);
        }, 800);
      }
    };

    loadContent();

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleNext = () => {
    // Navigate to assessment if on the last showcase slide (analytics)
    if (currentSlide === IntroSlides.length - 1) {
      // This case should now be handled by the Link component in the render
      console.log("Navigating via button logic - should use Link");
    } else if (currentSlide < IntroSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    // Skip to the last showcase slide (analytics)
    setCurrentSlide(IntroSlides.length - 1);
  };

  const currentSlideData = IntroSlides[currentSlide];
  const isLastSlide = currentSlide === IntroSlides.length - 1;

  // Conditionally render Loading component
  if (!isReady) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center px-6 md:px-16 lg:px-32 xl:px-48 relative">
      <VideoBackground />
      <div className="max-w-6xl w-full flex flex-col items-center p-8 md:p-12 relative">
        {/* Skip button - aligned with image width, visible on all slides except the first */}
        {currentSlide > 0 && ( // Show skip if not the first slide
          <div className="w-full max-w-4xl flex justify-end mb-4">
            <button
              onClick={handleSkip}
              className="px-10 py-2 shadow-lg rounded-lg text-sm
              bg-[#BF9566] backdrop-blur-sm text-white hover:bg-[#BF8648]
              transition-colors border-2 border-black"
            >
              Skip
            </button>
          </div>
        )}
        {/* Add placeholder div if skip button is not shown to maintain layout consistency */}
        {currentSlide === 0 && <div className="h-[44px] mb-4"></div>}{" "}
        {/* Adjust height based on skip button */}
        {/* Logo - Larger size for first slide */}
        {currentSlideData.logo && ( // Removed isLast condition here
          <div className="w-full flex justify-center mb-8">
            <div className="flex items-center justify-center">
              <img
                src={brandIcon}
                alt="Brand icon"
                className="w-48 h-48 object-contain rounded-full" // Increased size
              />
            </div>
          </div>
        )}
        {/* Slide image - Full width, fixed height, consistent across slides */}
        {currentSlideData.image && (
          <div className="w-full max-w-4xl mb-8">
            {" "}
            {/* Container spans full width */}
            <img
              src={currentSlideData.image}
              alt={currentSlideData.title}
              className="w-full h-[432px] object-cover rounded-lg border-2 border-black shadow-lg" // Full width, fixed height (e.g., 432px), object-cover, keep border/rounded
            />
          </div>
        )}
        {/* Content - Aligned with image width */}
        <div
          className={`w-full max-w-4xl space-y-2 ${
            currentSlideData.logo ? "items-center text-center" : "" // Removed isLast condition
          }`}
        >
          <div
            className={`w-full ${
              currentSlideData.logo ? "flex flex-col items-center" : "" // Removed isLast condition
            }`}
          >
            <h1
              className={`text-white text-5xl font-bold ${
                currentSlideData.logo ? "text-center" : "" // Removed isLast condition
              }`}
            >
              {currentSlideData.title}
            </h1>
            {currentSlideData.brandName && (
              <h1 className="text-white text-5xl font-bold mt-2">
                {currentSlideData.brandName}
              </h1>
            )}
            <p
              className={`text-gray-200 text-xl mt-4 ${
                currentSlideData.logo ? "text-center" : "" // Removed isLast condition
              }`}
            >
              {currentSlideData.subtitle}
            </p>
          </div>
        </div>
        {/* Footer with navigation and progress indicators - Aligned with image */}
        <div className="w-full max-w-4xl mt-8">
          <div className="flex items-center justify-between">
            {/* Progress indicators - Show on all slides except the first */}
            {!currentSlideData.logo ? (
              <div className="flex space-x-2">
                {IntroSlides.slice(1).map((_, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 rounded-full border-black border-2 transition-colors duration-200 ${
                      index + 1 === currentSlide
                        ? "bg-amber-500"
                        : index + 1 < currentSlide
                        ? "bg-gray-300" // Mark past slides
                        : "bg-gray-300/50" // Future slides
                    }`}
                  />
                ))}
              </div>
            ) : (
              /* Placeholder for alignment when logo is present (first slide) */
              <div></div>
            )}

            {/* Navigation Button/Link */}
            <div
              className={`${
                currentSlideData.logo ? "w-full flex justify-center" : ""
              }`}
            >
              {isLastSlide ? (
                <Link
                  to="/start/assessment" // Navigate to assessment route
                  className="bg-[#BF9566] border-black border-2 text-white px-8 py-2 rounded-lg text-lg
                  shadow-lg hover:bg-[#BF8648] transition-colors inline-flex items-center gap-2"
                >
                  {currentSlideData.button} {/* Should be "Next" */}
                  <ArrowRight size={20} />
                </Link>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-[#BF9566] border-black border-2 text-white px-8 py-2 rounded-lg text-lg
                  shadow-lg hover:bg-[#BF8648] transition-colors inline-flex items-center gap-2"
                >
                  {currentSlideData.button}
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
