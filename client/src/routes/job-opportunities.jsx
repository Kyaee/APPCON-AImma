import { useState } from "react";

// Components & Icons
import { Button } from "@/components/ui/button";
import { Background } from "@/components/layout/background";
import OpportunitiesMenu from "../components/features/job-item";
import StatsDisplay from "@/components/features/stats-display";
import ActionIcons from "@/components/layout/action-icons";
import MainNav from "@/components/layout/main-nav";
import wavingCappy from "@/assets/job-opportunities/WaveCappy.png";

export default function JobOpportunities() {
  const [isNewUser, setIsNewUser] = useState(() => {
    return localStorage.getItem("hasVisitedOpportunities") !== "false";
  });

  const handleStartClick = () => {
    localStorage.setItem("hasVisitedOpportunities", "true");
    setIsNewUser(false);
  };

  // const filterButtons = [
  //   { text: "Software Development", width: "173px" },
  //   { text: "Javascript", width: "111px" },
  //   { text: "React", width: "86px" },
  //   { text: "Add +", width: "111px" },
  // ];

  return (
    <div className="relative flex items-center w-full min-h-screen pb-20">
      <Background />
      <MainNav />

      {/* Stats and Action Icons - Simplified */}
      <div className="fixed top-8 right-15 flex items-center gap-5 z-50">
        <StatsDisplay/>
        <ActionIcons/>
      </div>

      {isNewUser ? (
        // New user welcome screen
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={wavingCappy}
              alt="Welcome"
              className="max-w-2/4 object-contain mt-[70px]"
            />
            <span className="text-[#4C4C4C] text-[48px] font-bold tracking-tighter">
              Gather Job Opportunities
            </span>
            <span className="text-black text-[20px] ">
              We will find job opportunities for you!
            </span>
            <button
              onClick={handleStartClick}
              className={`
                mt-5 w-3/4 py-4 rounded-xl border border-black
                custom-shadow-75
                flex items-center justify-center
                transition-colors duration-300 transform ease-in
                text-white text-2xl font-semibold
                bg-[#007CE8] hover:bg-[#0056b3]
              `}
            >
              Let's Start!
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full min-h-screen pt-35">
          <div className="px-55">
            <div className="flex justify-between">
              <h1 className="text-[#4C4C4C] text-5xl font-extrabold mb-4 tracking-tight">
                Personalized for You
              </h1>
              <Button className="">Generate Again</Button>
            </div>
            <p className="text-black text-base font-medium mb-8 max-w-[760px]">
              We prepared possible opportunities based on your capabilities and
              learning.
            </p>

            {/* Filter Buttons */}
            {/* <div className="flex gap-2 mb-8">
              {filterButtons.map((button, index) => (
                <button
                  key={index}
                  className="h-[40px] px-6 rounded-[10px] border border-black bg-white font-inter text-xs font-semibold text-black"
                  style={{ width: button.width }}
                >
                  {button.text}
                </button>
              ))}
            </div> */}

            
          </div>

          {/* Opportunities Grid */}
          <div className="px-55 relative w-full grid grid-cols-2 gap-10">
            <OpportunitiesMenu />
            <OpportunitiesMenu />
            <OpportunitiesMenu />
            <OpportunitiesMenu />
          </div>
        </div>
      )}
    </div>
  );
}
