import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BarChart,
  Route,
  Zap,
} from "lucide-react";

// Feature data with icons and descriptions
const featureData = [
  {
    id: 1,
    title: "AI-Generated Courses",
    description:
      "Our AI creates personalized courses tailored to your learning style and goals, ensuring effective skill acquisition.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    image: "/src/assets/landing/feature-ai-courses.png",
  },
  {
    id: 2,
    title: "Interactive Roadmap",
    description:
      "Follow a clear learning path with milestones and achievements to track your progress like Duolingo.",
    icon: <Route className="w-8 h-8 text-primary" />,
    image: "/src/assets/landing/feature-roadmap.png",
  },
  {
    id: 3,
    title: "Quiz Assessments",
    description:
      "Test your knowledge with interactive quizzes after each lesson to reinforce your learning.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    image: "/src/assets/landing/feature-quiz.png",
  },
  {
    id: 4,
    title: "Skill Proficiency Analytics",
    description:
      "Detailed analytics track your progress and identify areas for improvement with data visualization.",
    icon: <BarChart className="w-8 h-8 text-primary" />,
    image: "/src/assets/landing/feature-analytics.png",
  },
];

export default function FeatureSlider() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const nextFeature = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentFeature((prev) => (prev + 1) % featureData.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevFeature = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentFeature(
      (prev) => (prev - 1 + featureData.length) % featureData.length
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
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
    <section id="features" className="py-20">
      <div className="w-4/5 mx-auto">
        <div className="container mx-auto">
          {/* The feature box now comes first */}
          <div className="overflow-hidden rounded-2xl bg-card/50 shadow-lg border border-border mb-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  {featureData[currentFeature].icon}
                  <h3 className="text-2xl font-bold text-foreground">
                    {featureData[currentFeature].title}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  {featureData[currentFeature].description}
                </p>
              </div>

              <div className="md:w-1/2 flex flex-col">
                <div className="h-72 md:h-96 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <img
                      src={featureData[currentFeature].image}
                      alt={featureData[currentFeature].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Navigation buttons and indicators below the image */}
                <div className="flex justify-between items-center p-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background hover:bg-accent border-border"
                    onClick={() => handleNavigation("prev")}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <div className="flex gap-2">
                    {featureData.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentFeature === index
                            ? "bg-primary w-6"
                            : "bg-accent"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background hover:bg-accent border-border"
                    onClick={() => handleNavigation("next")}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features header and description now come second */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground mb-10 mx-auto text-center max-w-2xl">
            Discover how CapyCademy transforms your learning experience with
            these powerful features
          </p>
        </div>
      </div>
    </section>
  );
}
