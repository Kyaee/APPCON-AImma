import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BarChart,
  Route,
  Zap,
} from "lucide-react";

// Import feature images from assets
import feature1 from "@/assets/dashboard/feature1.jpg";
import feature2 from "@/assets/dashboard/feature2.jpg";
import feature3 from "@/assets/dashboard/feature3.jpg";
import feature4 from "@/assets/dashboard/feature4.png";

// Feature data with icons and descriptions
const featureData = [
  {
    id: 1,
    title: "AI-Generated Courses",
    description:
      "Our AI creates personalized courses tailored to your learning style and goals, ensuring effective skill acquisition.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    image: feature1, // Using imported image
  },
  {
    id: 2,
    title: "Interactive Roadmap",
    description:
      "Follow a clear learning path with milestones and achievements to track your progress like Duolingo.",
    icon: <Route className="w-8 h-8 text-primary" />,
    image: feature2, // Using imported image
  },
  {
    id: 3,
    title: "Quiz Assessments",
    description:
      "Test your knowledge with interactive quizzes after each lesson to reinforce your learning.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    image: feature3, // Using imported image
  },
  {
    id: 4,
    title: "Skill Proficiency Analytics",
    description:
      "Detailed analytics track your progress and identify areas for improvement with data visualization.",
    icon: <BarChart className="w-8 h-8 text-primary" />,
    image: feature4, // Using imported image
  },
];

export default function FeatureSlider() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const nextFeature = () => {
    if (isAnimating) return;

    // Remove animation delay, make it instant
    setCurrentFeature((prev) => (prev + 1) % featureData.length);
  };

  const prevFeature = () => {
    if (isAnimating) return;

    // Remove animation delay, make it instant
    setCurrentFeature(
      (prev) => (prev - 1 + featureData.length) % featureData.length
    );
  };

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = window.setInterval(() => {
        nextFeature();
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Reset interval when manually navigating
  const handleNavigation = (direction) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (direction === "prev") {
      prevFeature();
    } else {
      nextFeature();
    }

    intervalRef.current = window.setInterval(() => {
      nextFeature();
    }, 5000);
  };

  return (
    <section
      id="features"
      className="w-full py-16 mb-35 overflow-hidden flex justify-center"
    >
      {/* Main container with auto height based on content */}
      <div className="w-4/5 border-[3px] border-black rounded-xl relative flex flex-col">
        {/* Image section with fixed height */}
        <div className="w-full h-[60vh] relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={featureData[currentFeature].image}
              alt={featureData[currentFeature].title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation and indicators floating at bottom of image section */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8">
            {/* Left navigation button */}
            <button
              className="w-10 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg border border-gray-300"
              onClick={() => handleNavigation("prev")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="flex gap-3 bg-white/50 px-6 py-2 rounded-full">
              {featureData.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 rounded-full transition-all ${
                    currentFeature === index
                      ? "bg-primary w-10"
                      : "bg-gray-400 w-3"
                  }`}
                />
              ))}
            </div>

            {/* Right navigation button */}
            <button
              className="w-10 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg border border-gray-300"
              onClick={() => handleNavigation("next")}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content section with white background */}
        <div className="w-full bg-white py-8 rounded-b-lg border-t-2 border-black">
          <div className="container ml-0 max-w-6xl px-8">
            <div className="flex items-start gap-8">
              {/* Larger icon on the left */}
              <div className="p-5 bg-primary/10 rounded-full">
                <div className="w-14 h-14 flex items-center justify-center">
                  {featureData[currentFeature].icon}
                </div>
              </div>

              {/* Content on the right */}
              <div className="flex-1">
                {/* Title at the top */}
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-left">
                  {featureData[currentFeature].title}
                </h2>

                {/* Description below title */}
                <p className="text-lg text-muted-foreground text-left">
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
