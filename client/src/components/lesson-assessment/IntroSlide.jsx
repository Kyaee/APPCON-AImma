import { Gem, ZapIcon } from "lucide-react";
import { useLessonFetchStore } from "@/store/useLessonData";
import Loading from "@/routes/Loading";
import { useAssessment } from "@/api/INSERT";
import { useState, useEffect } from "react";
import CapyAssess from "@/assets/lesson-assessment/CapyAssess.png";
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

export default function IntroSlide({
  lessonData,
  buttonText = "Start Assessment",
  onGenerationComplete, // Add new prop
}) {
  const [isClicked, setClicked] = useState(false);
  // Remove generated_assessment state tracking from here, parent will handle component switch
  // const generated_assessment = useLessonFetchStore(
  //   (state) => state.generated_assessment
  // );
  // const setGeneratedAssessment = useLessonFetchStore(
  //   (state) => state.setGeneratedAssessment
  // );
  const queryClient = useQueryClient(); // Get query client instance

  // Pass the onSuccess logic to useAssessment hook
  const { createAssessment, isPending, isError } = useAssessment(
    lessonData?.id,
    () => {
      // Define onSuccess callback here
      console.log("Assessment generated, invalidating query and calling prop.");
      queryClient.invalidateQueries({
        queryKey: ["lessonAssessment", lessonData?.id],
      }); // Invalidate query
      if (onGenerationComplete) {
        onGenerationComplete(); // Signal parent component
      }
    }
  );

  function generateQuestions(e) {
    e.preventDefault();
    setClicked(true);
    // Remove setGeneratedAssessment call
    // setGeneratedAssessment(true);

    if (lessonData?.id) {
      console.log("Generating assessment using lessonFetch data...");
      createAssessment({
        lesson_id: lessonData.id,
        lesson_name: lessonData.name,
        lesson_content: lessonData.lesson,
      });
    } else {
      console.error(
        "Cannot generate assessment: Missing lesson details in store.",
        lessonData // Use lessonData directly for logging
      );
      setClicked(false); // Reset to allow retry
    }
  }

  if (isError) {
    console.error("Assessment generation failed.");
    // Optionally reset isClicked if generation fails permanently
    // setClicked(false);
  }

  // Show loading screen ONLY while assessment is being generated (isPending)
  // The parent component will handle switching to LessonAssessment component
  if (isPending) {
    return <Loading generate_assessment={true} preserveBackground={"video"} />;
  }

  // Render IntroSlide content if not loading
  return (
    <article className="flex flex-col items-center justify-center p-8 h-full md:p-12 relative text-foreground ">
      <img src={CapyAssess} alt="capybara superhero" className="w-100" />
      <h1 className="text-4xl font-extrabold mb-4">Start Your Assessment.</h1>
      <p className="mb-2 font-semibold border-b border-primary">Rewards</p>
      <div className="grid grid-cols-2 gap-x-8 mb-4 text-xl *:flex *:gap-2 *:items-center ">
        <div>
          <Gem size={20} />
          {lessonData?.gems} gems
        </div>
        <div>
          <ZapIcon size={23} />
          {lessonData?.exp} exp.
        </div>
      </div>
      <button
        className="py-3 w-full mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                hover:bg-neutral-300 disabled:bg-neutral-200 disabled:text-neutral-400"
        onClick={generateQuestions}
        disabled={isClicked} // Disable button after click to prevent multiple submissions
      >
        {buttonText}
      </button>
      {isError && (
        <p className="text-red-500 mt-2">
          Failed to generate assessment. Please try again.
        </p>
      )}
    </article>
  );
}
