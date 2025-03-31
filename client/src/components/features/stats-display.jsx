import { GemIcon, HeartIcon } from "@/assets/stats-icons";

export default function StatsDisplay({hearts, gems}) {
  return (
    <>
    <div className="flex items-center gap-2">
      <HeartIcon />
      <span className="text-black font-inter text-lg font-black leading-7">
        {hearts || "Error"}
      </span>
    </div>

    <div className="flex items-center gap-2">
      <GemIcon />
      <span className="text-black font-inter text-lg font-black leading-7">
        {gems || "Error"}
      </span>
    </div>
    </>
  );
}