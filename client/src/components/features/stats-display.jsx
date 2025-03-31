import { GemIcon, HeartIcon } from "@/assets/stats-icons";

export default function StatsDisplay() {
  const HeartValue = "10";
  const GemValue = "500";

  return (
    <>
    <div className="flex items-center gap-2">
      <HeartIcon />
      <span className="text-black dark:text-white font-inter text-lg font-black leading-7">
        {HeartValue}
      </span>
    </div>

    <div className="flex items-center gap-2">
      <GemIcon />
      <span className="text-black dark:text-white font-inter text-lg font-black leading-7">
        {GemValue}
      </span>
    </div>
    </>
  );
}