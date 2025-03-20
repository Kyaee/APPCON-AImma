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
  const fullDescription = `This a good fit for you because... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed condimentum ante. Integer eget augue vel sapien luctus auctor sed a lorem. Additional details about the role and responsibilities. This position offers great opportunities for growth and development in a dynamic work environment. We're looking for motivated individuals who can contribute to our team's success.`;

  const displayedDescription = showMore
    ? fullDescription
    : `${fullDescription.slice(0, 150)}...`;

  return (
    <div className="relative w-full h-full rounded-lg border border-foreground bg-card custom-shadow-50 p-6">
      <h2 className="text-3xl text-primary font-semibold tracking-tighter">
        Opportunities
      </h2>
      <div className="text-primary text-lg font-medium mt-2 mb-1">
        PHP 16,000 - PHP 25,000 a month
      </div>
      <div className="flex gap-2 text-primary text-base italic">
        <Contact className="size-5" />
        XYZ Company
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
        Arizona 123, America, Yawa Pistalsan/Hybrid Online
      </div>

      <div className="mt-6 mb-2 text-primary text-xl font-semibold">
        Insights
      </div>
      <p className="pb-20 text-primary text-base font-medium">
        {showMore ? 
          <>
           {fullDescription}
           <br />
            <a className="text-blue-500" onClick={() => setShowMore(!showMore)}>
              See less
            </a>
          </> : 
          <>
            {displayedDescription}
            <br />
            <a className="text-blue-500" onClick={() => setShowMore(!showMore)}>
              See more
            </a>
          </> 
        }
      </p>

      {/* Horizontal line */}
      <Separator
        orientation="horizontal"
        className="absolute bottom-20 left-0 w-full border border-primary"
      />

      {/* Buttons - Updated positioning and width */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between">
        <button className="w-[172px] h-[39px] rounded-[5px] border border-primary bg-background flex items-center gap-2 justify-center">
          <X className="size-5" />
          <span className="text-primary text-base font-medium">
            Not-Interested
          </span>
        </button>

        <Link to="">
          <button className="text-background w-[140px] h-[39px] rounded-[5px] border border-primary bg-blue-500 flex items-center justify-center">
            Check now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OpportunitiesMenu;
