import { Gem, ZapIcon } from "lucide-react";

export default function LastSlide({
  score,
  total,
  gems,
  exp,
  onClick,
  disabled,
}) {
  return (
    <article className="animate-text-fade flex flex-col gap-2 items-center justify-center p-8 h-full md:p-12 relative text-background ">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        Congratulations!
        <br /> You have completed the assessment.
      </h1>
      <div className="grid grid-cols-2  gap-x-10">
        <div>
          <p>Your Score</p>
          <h2 className="text-3xl font-bold">
            {score} / {total}
          </h2>
        </div>
        <div>
          <p>Rewards</p>
          <div className="flex gap-5 *:flex *:items-center *:gap-0.5">
            <h2 className="text-xl font-semibold pt-1">
              +<Gem size={18} />
              {gems}
            </h2>
            <h2 className="text-xl font-semibold pt-1">
              +<ZapIcon size={20} />
              {exp}
            </h2>
          </div>
        </div>
      </div>
      <button
        className="py-3 w-3/5 mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
                  hover:bg-neutral-300"
        onClick={onClick}
        disabled={``}
      >
        Finish
      </button>
    </article>
  );
}
