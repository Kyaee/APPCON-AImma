import { Gem, ZapIcon } from "lucide-react";
import { useLessonFetchStore } from "@/store/useLessonData";
import { useState } from "react"
import Loading from "@/routes/loading"
import { useAssessment } from "@/api/INSERT";

export default function IntroSlide({
  lessonData,
  image,
  gems,
  exp,
  setIntroSlide,
}) {
  const generated_assessment = useLessonFetchStore((state) => state.generated_assessment);
  const setGeneratedAssessment = useLessonFetchStore(
    (state) => state.setGeneratedAssessment
  );
  const { createAssessment, isPending, isError } = useAssessment();

  function generateQuestions(e) {
    e.preventDefault();

    if (!generated_assessment) {
      createAssessment(lessonFetch.id, lessonFetch.name, lessonFetch.lesson);
      setGeneratedAssessment(true);
    } else {
      console.log("Generating questions...");
      setIntroSlide();
    }
  }

  if (isPending) return <Loading generate_assessment={true}/>

  return (
    <article className="flex flex-col items-center justify-center p-8 h-full md:p-12 relative text-background ">
      <img src={image} alt="capybara superhero" />
      <h1 className="text-4xl font-extrabold mb-4">Start Your Assessment.</h1>
      <p className="mb-2 font-semibold border-b">Rewards</p>
      <div className="grid grid-cols-2 gap-x-8 mb-4 text-xl *:flex *:gap-2 *:items-center ">
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
        className="py-3 w-3/5 mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                hover:bg-neutral-300"
        onClick={generateQuestions}
      >
        Start
      </button>
    </article>
  );
}
