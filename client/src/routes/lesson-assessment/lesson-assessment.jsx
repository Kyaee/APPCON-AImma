import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "@/assets/lesson-assessment/la-intro-capybara.png";
import { bouncy } from "ldrs";
bouncy.register();
import Questions from "./questions";
import Header from "@/components/layout/lesson/header-navigator";
import Loading from "@/components/layout/loading";
import { VideoBackground } from "@/components/layout/background";

// Use Hooks
import { useState, useEffect } from "react";
import { useAnswersStore } from "@/store/useAnswersStore";
import { useGSAP } from "@gsap/react";

// Utilities
import { questionsProvider } from "@/config/deepseek";
import { AI_Server as server } from "@/config/axiosConfig";
import { gsap } from "gsap";
gsap.registerPlugin(useGSAP);

const sampleData = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What is the event-loop in asynchronous Javascript?",
    options: ["A", "B", "C", "D"],
    correct: "A",
  },
  {
    id: 2,
    type: "true-false",
    question: "React is a framework or nahh?",
    options: ["True", "False"],
    correct: "False",
  },
  {
    id: 3,
    type: "short-answer",
    question: "What is the capital of France?",
    correct: "Paris",
  },
  {
    id: 4,
    type: "checkbox",
    question: "Select the correct answers",
    options: ["A", "B", "C", "D"],
    correct: ["A", "B"],
  },
];

export default function Assessment() {
  const [isLoading, setLoading] = useState(false);
  const [isIntroSlide, setIntroSlide] = useState(true);
  const [isCurrentSlide, setCurrentSlide] = useState(0);
  const [isCorrect, setCorrect] = useState(false);
  const [isQuestionData, setQuestionData] = useState([]);

  const answers = useAnswersStore((state) => state.answers);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // questionsProvider();
      // const response = await server.get("/api/assessment/questions");
      // setQuestionData(response.data);
    } catch (err) {
      // Must return the user to the Lesson if there is any errors
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = () => {
    // try {
    const prompt = `is the answer "${answers[isCurrentSlide]}" for question "${sampleData[isCurrentSlide].question}" true? return only TRUE or FALSE in uppercase`;
    // const fetchedData = await axios.post("/api/assessment", {
    //   answer: answers[isCurrentSlide],
    //   question: sampleData[isCurrentSlide].question,
    //   prompt,
    // });
    // } catch (err) {
    //   console.log(err);
    // }

    // if (fetchedData === "TRUE") THINK OF THIS LATER
    // LEARN DEEPSEEKK CUH
    handleNext();
  };

  const handleNext = () => setCurrentSlide(isCurrentSlide + 1);
  const handleBack = () => setCurrentSlide(isCurrentSlide - 1);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="h-screen w-full py-5 flex flex-col justify-between select-none relative">
          <VideoBackground />
          <Header />

          <form>
            {isIntroSlide ? (
              <article className="flex flex-col items-center justify-center p-8 mt-22 md:p-12 relative">
                <img src={Image} alt="capybara superhero" />
                <h1 className="text-4xl font-extrabold mb-4">
                  Start Your Assessment?
                </h1>
                <p>
                  Before you start, make sure to understand the previous
                  material
                </p>
                <button
                  className="py-3 w-1/5 mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                hover:bg-neutral-300"
                  onClick={() => setIntroSlide(false)}
                >
                  Start
                </button>
              </article>
            ) : (
              <Questions
                type={sampleData[isCurrentSlide].type}
                question={sampleData[isCurrentSlide].question}
                options={sampleData[isCurrentSlide].options}
                questionNumber={isCurrentSlide + 1}
                // correct={STATE}
              />
            )}
          </form>

          {isIntroSlide ? (
            <footer
              className="pt-4 flex items-center justify-around border-t border-white
            *:flex *:py-3 *:rounded-lg *:gap-2 opacity-0"
            >
              <div className="px-18" />
            </footer>
          ) : (
            <footer
              className="pt-4 flex items-center justify-around border-t border-white
            *:flex *:py-3 *:rounded-lg *:gap-2 "
            >
              <button
                className="border-white border px-10"
                onClick={() =>
                  isCurrentSlide === 0 ? setIntroSlide(true) : handleBack()
                }
              >
                <ArrowLeft />
                Back
              </button>
              <button
                className="bg-[#BF8648] border-2 border-black px-6 custom-shadow-50"
                onClick={handleCheck}
                disabled={isCurrentSlide === sampleData.length - 1}
              >
                {/* You can create a ternary operator for this {STATE ? } */}
                Check
                <ArrowRight />
              </button>
            </footer>
          )}
        </main>
      )}
    </>
  );
}
