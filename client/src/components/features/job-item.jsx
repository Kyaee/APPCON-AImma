import {
  Contact,
  LampCeiling,
  LampDesk,
  LampFloor,
  MapPin,
  X,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { useState } from "react";

const OpportunitiesMenu = ({
  title,
  salary,
  company,
  time,
  location,
  description,
  link,
}) => {
  const [showMore, setShowMore] = useState(false);

  const displayedDescription = showMore
    ? description
    : `${description?.slice(0, 150)}...`;

  return (
    <div className="animate-text-fade relative w-full h-full rounded-lg border-2 border-foreground dark:border-dark-mode-highlight bg-card dark:bg-dark-inner-bg custom-shadow-50 p-6">
      <h2 className="text-3xl text-primary font-semibold tracking-tighter">
        {title}
      </h2>
      <div className="text-primary text-lg font-medium mt-2 mb-1">{salary}</div>
      <div className="flex gap-2 text-primary text-base italic">
        <Contact className="size-5" />
        {company}
      </div>
      <div className="flex gap-2 text-primary text-base">
        {time === "Full-time" ? (
          <LampCeiling className="size-5" />
        ) : time === "Part-time" ? (
          <LampFloor className="size-5" />
        ) : (
          <LampDesk className="size-5" />
        )}
        Full-time
      </div>
      <div className="flex gap-2 text-primary text-base">
        <MapPin className="size-5" />
        {location}
      </div>

      <Separator
        orientation="horizontal"
        className="my-4 border border-foreground"
      />

      <div className="mb-2 text-primary text-xl font-semibold">Insights</div>
      <p className="pb-20 text-primary text-base font-medium">
        {showMore ? (
          <>
            {description}
            <br />
            <a className="text-blue-500" onClick={() => setShowMore(!showMore)}>
              See less
            </a>
          </>
        ) : (
          <>
            {displayedDescription}
            <br />
            <a className="text-blue-500" onClick={() => setShowMore(!showMore)}>
              See more
            </a>
          </>
        )}
      </p>

      {/* Horizontal line */}
      <Separator
        orientation="horizontal"
        className="absolute bottom-20 left-0 w-full border border-primary"
      />

      {/* Buttons - Updated positioning and width */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between">
        <button className="w-[172px] h-[39px] rounded-lg border border-primary bg-background dark:bg-dark-inner-bg flex items-center gap-2 justify-center">
          <X className="size-5" />
          <span className="text-primary text-base font-medium">
            Not-Interested
          </span>
        </button>

        <Link to="">
          <button className="text-white w-[140px] h-[39px] rounded-lg border-2 border-black bg-[#007CE8] hover:bg-[#0056b3]  flex cursor-pointer items-center justify-center">
            Check now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OpportunitiesMenu;
