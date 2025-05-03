import { useState } from "react"; // Import useState
import { useLocation } from "react-router-dom"; // Import useLocation
import { useLessonFetchStore } from "@/store/useLessonData";
import IntroSlide from "@/components/lesson-assessment/IntroSlide";
import LessonAssessment from "@/routes/LessonAssessment"; // Import LessonAssessment
import { VideoBackground } from "@/components/layout/Background";
import Loading from "@/routes/Loading"; // Import Loading for initial data fetch

export default function RedirectAssessment() {
  const location = useLocation(); // Get location object
  const lessonFetch = useLessonFetchStore((state) => state.fetch);
  const [isGenerated, setIsGenerated] = useState(false); // State to track generation

  // Prioritize data from navigation state, fallback to store
  const lessonData = location.state || lessonFetch;

  // Handler to update state when generation is complete
  const handleGenerationComplete = () => {
    console.log(
      "RedirectAssessment: Generation complete, rendering LessonAssessment."
    );
    setIsGenerated(true);
  };

  // Handle case where lessonData might not be ready immediately (neither state nor store)
  if (!lessonData?.lessonId && !lessonData?.id) {
    // Check for ID in either state or store format
    console.log(
      "RedirectAssessment: Waiting for lesson data (state or store)..."
    );
    return <Loading generate_assessment={false} preserveBackground={"video"} />; // Or a specific loading state
  }

  // Prepare data consistently for IntroSlide, mapping state keys if needed
  const introSlideData = {
    id: lessonData.lessonId || lessonData.id,
    name: lessonData.lessonName || lessonData.name,
    lesson: lessonData.lessonContent || lessonData.lesson,
    gems: lessonData.gems,
    exp: lessonData.exp,
    difficulty: lessonData.difficulty,
    // Add any other fields IntroSlide might need
  };

  return (
    <main className="h-screen w-full flex justify-center items-center select-none relative overflow-hidden">
      <VideoBackground headerVisible={true} />{" "}
      {isGenerated ? (
        // Render LessonAssessment if generation is complete
        <LessonAssessment />
      ) : (
        // Render IntroSlide initially, pass the potentially state-derived data
        <IntroSlide
          lessonData={introSlideData} // Pass the prepared data
          buttonText="Start Assessment"
          onGenerationComplete={handleGenerationComplete}
        />
      )}
    </main>
  );
}
