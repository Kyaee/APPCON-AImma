import { Link } from "react-router-dom";

export default function LastSlide({
  lessonId,
  passing,
  score,
  total,
  onClick,
}) {
  return (
    <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-background ">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        Hey! &nbsp;Let's try again
        <br />{" "}
        <span className="px-2 bg-light-brown animate-text-reveal">
          Don't worry
        </span>{" "}
        we all have bad days.
      </h1>
      <div className="flex gap-2 gap-x-10">
        <div>
          <p>Your Score</p>
          <h2 className="text-3xl font-bold">
            {score} / {total}
          </h2>
        </div>
        <div>
          <p>Rewards</p>
          <h2 className="text-xl font-semibold pt-1 text-gray-200">
            Reach at least {passing} points to earn rewards.
          </h2>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 items-center mt-8">
        <Link
          to={`/lesson/${lessonId}`}
          className="py-3 w-3/5 text-lg text-center bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                    hover:bg-neutral-300"
        >
          Back to Lesson
        </Link>
        <button
          onClick={onClick}
          className="py-3 w-3/5 text-lg text-center bg-neutral-800 text-white font-bold custom-shadow-50 rounded-lg
                   hover:bg-neutral-700"
        >
          Return to Dashboard
        </button>
      </div>
    </article>
  );
}
