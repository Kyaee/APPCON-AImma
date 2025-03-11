import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Background } from "@/components/layout/background"
import OpportunitiesMenu from './OpportunitiesMenu';
import StatsDisplay from '@/components/features/stats-display';
import IconButton from '@/components/layout/action-icons';
import MainNav from '@/components/layout/main-nav';
import wavingCappy from '@/assets/job-opportunities/WaveCappy.png';


export default function JobOpportunities() {
  const [isNewUser, setIsNewUser] = useState(() => {
    return localStorage.getItem('hasVisitedOpportunities') !== 'false';
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleStartClick = () => {
    localStorage.setItem('hasVisitedOpportunities', 'true');
    setIsNewUser(false);
  };

  const filterButtons = [
    { text: "Software Development", width: "173px" },
    { text: "Javascript", width: "111px" },
    { text: "React", width: "86px" },
    { text: "Add +", width: "111px" },
  ];

  return (
    <div className="relative w-full min-h-screen">
      <Background />
      <MainNav />
      
      {/* Stats and Action Icons - Simplified */}
      <div className="fixed top-8 right-15 flex items-center gap-4">
        <div className="flex items-center gap-4">
          <StatsDisplay type="heart" value="10" />
          <StatsDisplay type="gem" value="500" />
        </div>
        <div className="flex items-center gap-4">
          <IconButton 
            type="notification" 
            onClick={() => console.log('Notification clicked')} 
          />
          <IconButton 
            type="settings"
            onClick={() => console.log('Settings clicked')} 
          />
        </div>
      </div>

      {isNewUser ? (
        // New user welcome screen
        <div className="w-full h-full flex flex-col justify-center items-center pt-20">
          <div className="flex flex-col items-center justify-center">
            <img 
              src={wavingCappy} 
              alt="Welcome" 
              className="max-w-full object-contain mt-[60px]"
            />
            <span className="text-[#4C4C4C] text-[48px] font-bold mt-[10px]">
              Gather Job Opportunities
            </span>
            <span className="text-black text-[20px] mt-[10px]">
              Before you start,
            </span>
            <button
              onClick={handleStartClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                mt-5 w-[561px] h-[70px] rounded-[20px] border border-black
                shadow-[4px_4px_0px_0px_rgba(0,0,0,0.75)]
                flex items-center justify-center
                transition-colors duration-300
                text-white font-inter text-2xl font-semibold
                ${isHovered ? 'bg-[#0056b3]' : 'bg-[#007CE8]'}
              `}
            >
              Let's Start!
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full min-h-screen pt-32">
          <div className="px-[19%]">
            <h1 className="text-[#4C4C4C] text-5xl font-extrabold mb-4">
              Personalized for You
            </h1>
            <p className="text-black text-base font-medium mb-8 max-w-[760px]">
              We prepared possible opportunities based on your capabilities and learning.
            </p>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-8">
              {filterButtons.map((button, index) => (
                <button
                  key={index}
                  className="h-[40px] px-6 rounded-[10px] border border-black bg-white font-inter text-xs font-semibold text-black"
                  style={{ width: button.width }}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="relative w-full px-[19%] grid grid-cols-2 gap-8">
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
