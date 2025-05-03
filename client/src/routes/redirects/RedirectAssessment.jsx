import { useState } from "react"; // Import useState
import { useLessonFetchStore } from "@/store/useLessonData";
import IntroSlide from "@/components/lesson-assessment/IntroSlide";
import LessonAssessment from "@/routes/LessonAssessment"; // Import LessonAssessment
import { VideoBackground } from "@/components/layout/Background";
import Loading from "@/routes/Loading"; // Import Loading for initial data fetch

export default function RedirectAssessment() {
  const lessonFetch = useLessonFetchStore((state) => state.fetch);
  const [isGenerated, setIsGenerated] = useState(false); // State to track generation

  // Handler to update state when generation is complete
  const handleGenerationComplete = () => {
    console.log(
      "RedirectAssessment: Generation complete, rendering LessonAssessment."
    );
    setIsGenerated(true);
  };

  // Handle case where lessonFetch data might not be ready immediately
  if (!lessonFetch) {
    // You might want a loading indicator here or redirect if data is missing
    console.log("RedirectAssessment: Waiting for lesson data...");
    return <Loading generate_assessment={false} preserveBackground={"video"} />; // Or a specific loading state
  }

  return (
    <main className="h-screen w-full flex justify-center items-center select-none relative overflow-hidden">
      <VideoBackground headerVisible={true} />{" "}
      {isGenerated ? (
        // Render LessonAssessment if generation is complete
        <LessonAssessment />
      ) : (
        // Render IntroSlide initially, pass the handler
        <IntroSlide
          lessonData={lessonFetch}
          buttonText="Start Assessment"
          onGenerationComplete={handleGenerationComplete}
        />
      )}
    </main>
  );
}
