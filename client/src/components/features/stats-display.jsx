import { GemIcon, HeartIcon } from "@/assets/stats-icons";

export default function StatsDisplay({ hearts, gems }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <HeartIcon className="[&_path]:dark:stroke-primary" />

        <span className="text-black font-inter text-lg font-black leading-7">
          {hearts || "Error"}
        </span>

        <span className="text-black dark:text-primary font-inter text-lg font-black leading-7">
          {hearts || 5}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <GemIcon className="[&_path]:dark:stroke-primary" />

        <span className="text-black font-inter text-lg font-black leading-7">
          {gems || "Error"}
        </span>
        <span className="text-black dark:text-primary font-inter text-lg font-black leading-7">
          {gems || 50}
        </span>
      </div>
    </>
  );
}
