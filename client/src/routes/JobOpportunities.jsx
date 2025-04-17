import { useState } from "react";

// Components & Icons
import { Button } from "@/components/ui/button";
import OpportunitiesMenu from "../components/features/job-item";
import CapySearch from "@/assets/general/capy_search.png";
import SampleJobData from "@/components/features/sampleJobData";

export default function JobOpportunities() {
  const [isNewUser, setIsNewUser] = useState(() => {
    return localStorage.getItem("hasVisitedOpportunities") !== "false";
  });

  const handleStartClick = () => {
    localStorage.setItem("hasVisitedOpportunities", "true");
    setIsNewUser(false);
  };

  return (
    <div className="relative flex items-center w-full min-h-screen pb-20">

      {isNewUser ? (
        // New user welcome screen
        <div className="animate-text-fade w-full h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={CapySearch}
              alt="Welcome"
              className="max-w-2/4 object-contain mt-[70px]"
            />
            <span className="text-[#4C4C4C] dark:text-primary text-[48px] font-bold tracking-tighter">
              Gather Job Opportunities
            </span>
            <span className="animate-text-reveal text-black dark:text-primary text-[20px]">
              We will find job opportunities for you!
            </span>
            <button
              onClick={handleStartClick}
              className={`
                mt-5 w-3/4 py-4 rounded-xl border border-black
                custom-shadow-75
                flex items-center justify-center
                transition-colors duration-300 transform ease-in
                text-white text-2xl font-semibold cursor-pointer
                bg-[#007CE8] hover:bg-[#0056b3]
              `}
            >
              Let's Start!
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full min-h-screen pt-40 smooth-scroll">
          <div className="px-55">
            <div className="flex justify-between">
              <h1 className="text-[#4C4C4C] dark:text-primary text-5xl font-extrabold mb-4 tracking-tight">
                Personalized for You
              </h1>
              <Button className="px-3 py-2 bg-light-brown border-2 border-foreground text-foreground hover:bg-light-brown/80 dark:bg-light-brown dark:hover:bg-light-brown/80">
                Generate Again
              </Button>
            </div>
            <p className="text-black dark:text-primary text-base font-medium mb-8 max-w-[760px]">
              We prepared possible opportunities based on your capabilities and
              learning.
            </p>            
          </div>

          {/* Opportunities Grid */}
          <div className="px-55 relative w-full grid grid-cols-2 gap-15">
            {SampleJobData.map((data)=> {
              return (
                <OpportunitiesMenu 
                  title={data.title}
                  salary={data.salary}
                  company={data.company}
                  time={data.time}
                  location={data.location}
                  description={data.description}
                  link={data.link}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
