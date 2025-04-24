import { Gem, ZapIcon } from "lucide-react";
import { useLessonFetchStore } from "@/store/useLessonData";
import Loading from "@/routes/Loading";
import { useAssessment } from "@/api/INSERT";
import { useState, useEffect } from "react";
import CapyAssess from "@/assets/lesson-assessment/CapyAssess.png";

export default function IntroSlide({
  lessonData,
  gems,
  exp,
  setIntroSlide,
  disabled,
  buttonText = "Start Assessment", // Add default button text prop
}) {
  const [isClicked, setClicked] = useState(false);
  const generated_assessment = useLessonFetchStore(
    (state) => state.generated_assessment
  );
  const setGeneratedAssessment = useLessonFetchStore(
    (state) => state.setGeneratedAssessment
  );
  const lessonFetch = useLessonFetchStore((state) => state.fetch);
  const { createAssessment, isPending, isError, isSuccess } = useAssessment();

  // Add effect to automatically proceed when assessment generation completes
  useEffect(() => {
    // If assessment was generated and we're not in loading state anymore
    if (generated_assessment && !isPending && isClicked) {
      console.log(
        "Assessment generation complete, proceeding to questionnaire..."
      );
      setIntroSlide();
      setGeneratedAssessment(false);
    }
  }, [
    generated_assessment,
    isPending,
    isClicked,
    setIntroSlide,
    setGeneratedAssessment,
  ]);

  function generateQuestions(e) {
    e.preventDefault();
    setClicked(true);

    if (generated_assessment) {
      // Assessment is already generated, proceed directly
      console.log("Assessment already generated, proceeding...");
      setIntroSlide();
      setGeneratedAssessment(false);
    } else {
      if (lessonFetch?.id && lessonFetch?.name && lessonFetch?.lesson) {
        console.log("Generating assessment using lessonFetch data...");
        createAssessment(
          {
            lesson_id: lessonFetch.id,
            lesson_name: lessonFetch.name,
            lesson_content: lessonFetch.lesson,
          },
          {
            onSuccess: () => {
              console.log("Assessment created successfully");
              // This will trigger the useEffect when generated_assessment becomes true
              setGeneratedAssessment(true);
            },
            onError: (error) => {
              console.error("Failed to create assessment:", error);
              setClicked(false); // Reset to allow retry
            },
          }
        );
      } else {
        console.error(
          "Cannot generate assessment: Missing lesson details in store.",
          lessonFetch
        );
        setClicked(false); // Reset to allow retry
      }
    }
  }

  if (isError) {
    console.error("Assessment generation failed.");
  }

  // Show loading screen while assessment is being generated
  if (isPending || (isClicked && !generated_assessment)) {
    return <Loading generate_assessment={true} />;
  }

  return (
    <article className="flex flex-col items-center justify-center p-8 h-full md:p-12 relative text-foreground">
      <img src={CapyAssess} alt="capybara superhero" className="w-100" />
      <h1 className="text-4xl font-extrabold mb-4">Start Your Assessment.</h1>
      <p className="mb-2 font-semibold border-b border-primary">Rewards</p>
      <div className="grid grid-cols-2 gap-x-8 mb-4 text-xl *:flex *:gap-2 *:items-center">
        <div>
          <Gem size={20} />
          {gems} gems
        </div>
        <div>
          <ZapIcon size={23} />
          {exp} exp.
        </div>
      </div>
      <button
        className="py-3 w-full mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                hover:bg-neutral-300 disabled:bg-neutral-200 disabled:text-neutral-400"
        onClick={generateQuestions}
        disabled={
          isClicked ||
          isPending ||
          !lessonFetch?.id ||
          !lessonFetch?.name ||
          !lessonFetch?.lesson
        }
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
