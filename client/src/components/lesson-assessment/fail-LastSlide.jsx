import { Link } from "react-router-dom";
import { HeartIcon } from "@/components/layout/stats-icons";
import CapyFail from "@/assets/lesson-assessment/CapyFail.png"; // Import the crying capybara image

export default function LastSlide({
  lessonId,
  passing,
  score,
  total,
  onClick,
  remainingLives = 0, // New prop to track remaining lives in database
  onRetry = null, // New prop for retry handler
}) {
  // Determine if user can retry based on remaining lives
  const canRetry = remainingLives > 0;

  return (
    <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-black">
      {/* Add sad capybara image */}
      <img
        src={CapyFail}
        alt="Feeling Down Capybara"
        className="w-72 h-72 object-contain mb-2"
      />

      <h1 className="text-4xl font-extrabold mb-4 text-center">
        {canRetry ? "Let's try again!" : "No attempts left"}
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
          <h2 className="text-xl font-semibold pt-1 text-gray-700">
            Reach at least {passing} points to earn rewards.
          </h2>
        </div>
      </div>

      {/* Display remaining lives if any */}
      {canRetry && (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-lg font-medium mb-2">Remaining Attempts:</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <HeartIcon
                key={index}
                filled={index < remainingLives}
                className={`w-8 h-8 mx-1 ${
                  index < remainingLives ? "text-red-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col w-full gap-4 items-center mt-8">
        {/* Show Try Again button if user has remaining lives */}
        {canRetry && onRetry && (
          <button
            onClick={onRetry}
            className="py-3 w-3/5 text-lg text-center bg-brown text-white font-extrabold custom-shadow-75 rounded-lg
                      hover:bg-dark-brown transition-all duration-300"
          >
            Try Again ({remainingLives} attempt{remainingLives !== 1 ? "s" : ""}{" "}
            left)
          </button>
        )}

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
