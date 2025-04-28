import { useLessonFetchStore } from "@/store/useLessonData";
import IntroSlide from "@/components/lesson-assessment/IntroSlide";
import { VideoBackground } from "@/components/layout/Background";

export default function RedirectAssessment() {
  const lessonFetch = useLessonFetchStore((state) => state.fetch);

  return (
    <main className="h-screen w-full flex justify-center items-center select-none relative overflow-hidden">
      <VideoBackground headerVisible={true} />{" "}
      <IntroSlide
        lessonData={lessonFetch}
        buttonText="Start Assessment"
      />
    </main>
  );
}
