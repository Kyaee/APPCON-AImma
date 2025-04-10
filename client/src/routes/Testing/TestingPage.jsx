import { useState } from "react";

export default function testing() {
  const [isAnswers, setAnswers] = useState([
    {
      id: 0,
      question: "",
      answer: "",
      correct: false,
    },
  ]);

  const handleValidate = () =>
    setAnswers([
      ...isAnswers,
      {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
        correct: true,
      },
    ]);

  return (
    <div onClick={handleValidate}>
      testing
      <br />
      <div>{isAnswers.map((example) => {
        return (
          <div key={example.id}>
            {example.id} - {example.question} - {example.answer} -{" "}
            {example.correct ? "true" : "false"}
          </div>
        );
      })}</div>
    </div>
  );
}
