import CapyShout from "@/assets/lesson-assessment/CapyShout.png";
import { CheckCircleIcon } from "lucide-react";

const Questions = ({
  display_wrong_answer,
  lesson_name,
  questionNumber,
  type,
  question,
  options = [],
  correct,
  isSelectedAnswer,
  setSelectedAnswer,
  validate,
  explanation,
}) => {
  switch (type) {
    case "multiple-choice":
      return (
        <section
          className={`${
            display_wrong_answer && `animate-text-bounce`
          } flex items-center justify-center`}
        >
          <div
            className={`grid ${
              display_wrong_answer
                ? `grid-cols-2 place-items-center sm:w-full sm:mx-15 gap-15`
                : `grid-cols-1 animate-text-fade`
            }`}
          >
            <article className="flex flex-col items-start justify-center relative">
              <div>
                <h1 className="font-extrabold text-4xl mb-7 text-primary">
                  #{questionNumber + 1}
                </h1>
                <span className="border border-primary bg-[rgba(106,11,188,0.49)] p-1 px-3 rounded-2xl text-white">
                  Multiple Choice
                </span>
                <p className="mt-5 mb-2 tracking-tight text-primary font-lightx1">
                  {lesson_name}
                </p>
                <h1 className="font-bold text-3xl mb-8 max-w-xl tracking-tight text-primary">
                  {question}
                </h1>
              </div>
              <div
                className="grid grid-cols-1 gap-3 max-w-lg sm:w-full 
                  *:p-4  *:text-black *:gap-4 *:rounded-sm"
              >
                {options.map((option, index) => {
                  const isChecked =
                    isSelectedAnswer[questionNumber]?.answer === option;
                  return (
                    <label
                      key={index}
                      className={`custom-shadow-50 group cursor-pointer flex p-4 text-black gap-4 hover:bg-light-brown  
                      ${
                        !validate
                          ? isSelectedAnswer[questionNumber]?.validated
                            ? option === correct
                              ? "bg-green-500 scale-105"
                              : isChecked
                              ? "bg-red-500"
                              : "bg-white"
                            : "bg-white"
                          : option === correct
                          ? "bg-green-500 transition scale-110 duration-200"
                          : isChecked
                          ? "bg-red-500"
                          : "bg-white"
                      } 
                      `}
                    >
                      <input
                        type="radio"
                        name="answer"
                        id={`answer${index + 1}`}
                        value={option}
                        checked={isChecked}
                        disabled={isSelectedAnswer[questionNumber]?.validated}
                        onChange={(e) => {
                          setSelectedAnswer({
                            ...isSelectedAnswer,
                            [questionNumber]: {
                              answer: e.target.value,
                            },
                          });
                        }}
                        className="accent-dark-brown"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </article>
            {display_wrong_answer && (
              <div>
                <div
                  className="text-foreground bg-background font-semibold
                  w-4/6 py-6 px-8 tracking-tight rounded-sm 
                  "
                >
                  <h4 className="flex gap-2 items-center w-50 animate-text-reveal bg-green-400 rounded-lg py-1 px-2">
                    <CheckCircleIcon size={20} />
                    The Correct Answer:
                  </h4>
                  <p className="pt-3">"{explanation}"</p>
                </div>
                <img
                  src={CapyShout}
                  alt="capybara superhero"
                  className="absolute -right-55 animate-tilt-bounce  w-auto h-150 mb-4"
                />
              </div>
            )}
            {/* {isSelectedAnswer[questionNumber]?.validated && (} */}
          </div>
        </section>
      );
    case "true-false":
      return (
        <article className="flex items-center justify-center mt-52">
          <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
            <div className="flex flex-col items-start">
              <h1 className="font-extrabold text-4xl mb-5">
                #{questionNumber}
              </h1>
              <span className="border border-white bg-[rgba(106,11,188,0.49)]  p-1 px-3 rounded-2xl">
                True or False
              </span>
              <h1 className="mt-3 font-bold text-3xl mb-8 max-w-2xl ">
                {question}
              </h1>
            </div>
            <div
              className="grid grid-cols-2 gap-4 max-w-xl sm:w-full 
              *:flex *:p-4 *:bg-white *:text-black *:gap-4 *:rounded-xs"
            >
              <label className="custom-shadow-50 group cursor-pointer flex p-4 bg-white text-black gap-4 rounded-sm hover:bg-blue-500 [&:has(input:checked)]:bg-blue-600">
                <input
                  type="radio"
                  name="answer"
                  id="answer1"
                  value="True"
                  checked={isSelectedAnswer === "True"}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                <span>True</span>
              </label>
              <label className="custom-shadow-50 group cursor-pointer flex p-4 bg-white text-black gap-4 rounded-sm hover:bg-blue-500 [&:has(input:checked)]:bg-blue-600">
                <input
                  type="radio"
                  name="answer"
                  id="answer2"
                  value="False"
                  checked={isSelectedAnswer === "False"}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                <span>False</span>
              </label>
            </div>
          </div>
        </article>
      );
    default:
    // Create zustand state management here
  }
};

export default Questions;
