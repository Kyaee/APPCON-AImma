import { Gem, ZapIcon } from "lucide-react";
import { useLessonFetchStore } from "@/store/useLessonData";
import Loading from "@/routes/Loading";
import { useAssessment } from "@/api/INSERT";
import { useState, useEffect } from "react";
import CapyAssess from "@/assets/lesson-assessment/CapyAssess.png";

export default function IntroSlide({
  lessonData,
  buttonText = "Start Assessment", // Add default button text prop
}) {
  const [isClicked, setClicked] = useState(false);
  const generated_assessment = useLessonFetchStore(
    (state) => state.generated_assessment
  );
  const setGeneratedAssessment = useLessonFetchStore(
    (state) => state.setGeneratedAssessment
  );
  const { createAssessment, isPending, isError } = useAssessment(lessonData?.id);

  function generateQuestions(e) {
    e.preventDefault();
    setClicked(true);

    setGeneratedAssessment(true);

    if (lessonData?.id) {
      console.log("Generating assessment using lessonFetch data...");
      createAssessment(
        {
          lesson_id: lessonData.id,
          lesson_name: lessonData.name,
          lesson_content: lessonData.lesson,
        });
    } else {
      console.error(
        "Cannot generate assessment: Missing lesson details in store.",
        lessonFetch
      );
      setClicked(false); // Reset to allow retry
    }
  }

  if (isError) {
    console.error("Assessment generation failed.");
  }

  // Show loading screen while assessment is being generated
  if (isPending || (isClicked && !generated_assessment)) {
    return <Loading generate_assessment={true} preserveBackground={"video"}/>;
  }

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
      >
        {buttonText} {/* Use the provided button text */}
      </button>
      {isError && (
        <p className="text-red-500 mt-2">
          Failed to generate assessment. Please try again.
        </p>
      )}
    </article>
  );
}
