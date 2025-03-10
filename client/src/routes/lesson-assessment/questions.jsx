import { useState } from "react"
import { useAnswersStore } from "@/store/useAnswersStore"

const Questions = ({questionNumber, type, question, options=[], correct}) => {
  // const answers = useAnswersStore((state) => state.answers)
  // const setAnswer = useAnswersStore((state) => state.setAnswers)
  const [isSelectedAnswer, setSelectedAnswer] = useState("");
  const [isSHORT_Answer_Value, setSHORT_Answer_Value] = useState("")

  switch (type) {   
    case "multiple-choice":      
      // const handleAnswerChange = (value) => {
      //   setSelectedAnswer(value);
      //   setAnswer({ ...answers, [questionNumber]: value });
      // };   

      return (
        <article className="flex items-center justify-center mt-52">
          <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
          <div>
            <h1 className="font-extrabold text-4xl mb-5">#{questionNumber}</h1>
            <span className="border border-white bg-[rgba(106,11,188,0.49)]  p-1 px-3 rounded-2xl">Multiple Choice</span>
            <h1 className="mt-3 font-bold text-3xl mb-8 max-w-xl ">
            {question}
            </h1>
          </div>
          <div
            className="grid grid-cols-2 gap-4 max-w-xl sm:w-full 
            *:flex *:p-4 *:bg-white *:text-black *:gap-4 *:rounded-xs"
          >
            {options.map((option, index) => (
              <label key={index} className="custom-shadow-50 group cursor-pointer flex p-4 bg-white text-black gap-4 rounded-sm hover:bg-blue-500 [&:has(input:checked)]:bg-blue-600">
                <input 
                  type="radio" 
                  name="answer" 
                  id={`answer${index+1}`} 
                  value={option}
                  checked={isSelectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          </div>
        </article>
      )
    case "true-false":
      // const handleTrueFalseChange = (value) => {
      //   setSelectedAnswer(value);
      //   setAnswer({ ...answers, [questionNumber]: value });
      // };

      return (
        <article className="flex items-center justify-center mt-52">
          <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
            <div className="flex flex-col items-start">
              <h1 className="font-extrabold text-4xl mb-5">#{questionNumber}</h1>
              <span className="border border-white bg-[rgba(106,11,188,0.49)]  p-1 px-3 rounded-2xl">True or False</span>
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
    )
    case "short-answer":
      return (
        <article className="flex items-center justify-center mt-52">
          <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
        <div>
          <h1 className="font-extrabold text-4xl mb-5">#{questionNumber}</h1>
          <span className="border border-white bg-[rgba(106,11,188,0.49)]  p-1 px-3 rounded-2xl">Short Answer</span>
          <h1 className="mt-3 font-bold text-3xl mb-8 max-w-xl ">
            What is the event-loop in asynchronous Javascript?
          </h1>
        </div>
          <textarea
            value={isSHORT_Answer_Value}
            onChange={(e)=> setSHORT_Answer_Value(e.target.value)}
            placeholder="Write here"
            className="p-0 text-lg border-white w-full
            outline-none ring-0 rounded-none border-none focus-visible:ring-0 
            focus-visible:border-none resize-none min-h-[40px] overflow-hidden"
            style={{
              borderBottom: "2px solid white",
              height: 'auto'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          </div>
        </article>
      )
    case "checkbox":
      return (
        <article className="flex items-center justify-center w-full mt-52">
          <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
            <div>
              <h1 className="font-extrabold text-4xl mb-5">#{questionNumber}</h1>
              <span className="border border-white bg-[rgba(106,11,188,0.49)]  p-1 px-3 rounded-2xl">Checkbox</span>
              <h1 className="mt-3 font-bold text-3xl mb-8 max-w-xl ">
                What is the event-loop in asynchronous Javascript?
              </h1>
            </div>
            <div
              className="grid grid-cols-2 gap-4 max-w-xl sm:w-full 
              *:flex *:p-4 *:bg-white *:text-black *:gap-4 *:rounded-xs"
            >
              {options.map((option, index) => (
                <label key={index} className="custom-shadow-50 group cursor-pointer flex p-4 bg-white text-black gap-4 rounded-sm hover:bg-blue-500 [&:has(input:checked)]:bg-blue-600">
                  <input 
                    type="checkbox" 
                    name="answer" 
                    id={`answer${index+1}`} 
                    value={option} 
                    checked={isSelectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </article>
      )
    default: 
      // Create zustand state management here
  }
}

export default Questions
