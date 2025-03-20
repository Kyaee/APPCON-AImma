import React from 'react';

const SkillsAndBadges = () => {
  const handleSkillClick = (skill) => {
    console.log(`${skill} clicked`);
  };

  const handleBadgeClick = (badge) => {
    console.log(`${badge} clicked`);
  };

  return (
    <div className="pl-30 flex justify-between items-start w-full p-8 mt-10">
      
      {/* Skills Section */}
      <div className="w-1/2 pr-2">
        <h2 className="text-2xl font-semibold mb-4 text-black">Skills to Improve:</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-gray-100 hover:bg-[#D2B48C] text-sm py-2 px-4 rounded-full text-black border-2 border-black cursor-pointer"
            onClick={() => handleSkillClick('Skill 1')}
          >
            Skill 1
          </button>
          <button
            className="bg-gray-100 hover:bg-[#D2B48C] text-sm py-2 px-4 rounded-full text-black border-2 border-black cursor-pointer"
            onClick={() => handleSkillClick('Skill 2')}
          >
            Skill 2
          </button>
          <button
            className="bg-gray-100 hover:bg-[#D2B48C] text-sm py-2 px-4 rounded-full text-black border-2 border-black cursor-pointer"
            onClick={() => handleSkillClick('Skill 3')}
          >
            Skill 3
          </button>
          <button
            className="bg-gray-100 hover:bg-[#D2B48C] text-sm py-2 px-4 rounded-full text-black border-2 border-black cursor-pointer"
            onClick={() => handleSkillClick('Lorem ipsum dolor')}
          >
            Lorem ipsum dolor
          </button>
          <button
            className="bg-gray-100 hover:bg-[#D2B48C] text-sm py-2 px-4 rounded-full text-black border-2 border-black cursor-pointer"
            onClick={() => handleSkillClick('Lorem ipsum dolor')}
          >
            Lorem ipsum dolor
          </button>
        </div>
      </div>

      {/* Badges Section */}
      <div className="w-1/2 pl-1">
        <h2 className="text-2xl font-semibold mb-4 text-black">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <div
            className="bg-gray-100 w-14 h-14 rounded-full border-2 border-black cursor-pointer"
            onClick={() => handleBadgeClick('Badge 1')}
          ></div>
          <div
            className="bg-gray-100 w-14 h-14 rounded-full border-2 border-black cursor-pointer"
            onClick={() => handleBadgeClick('Badge 2')}
          ></div>
          <div
            className="bg-gray-100 w-14 h-14 rounded-full border-2 border-black cursor-pointer"
            onClick={() => handleBadgeClick('Badge 3')}
          ></div>
          <div
            className="bg-gray-100 w-14 h-14 rounded-full border-2 border-black cursor-pointer"
            onClick={() => handleBadgeClick('Badge 4')}
          ></div>
          <div
            className="bg-gray-100 w-14 h-14 rounded-full border-2 border-black cursor-pointer"
            onClick={() => handleBadgeClick('Badge 5')}
          ></div>
          <div
            className="bg-gray-100 w-14 h-14 rounded-full border-2 border-black cursor-pointer"
            onClick={() => handleBadgeClick('Badge 5')}
          ></div>
        </div>
        <p className="text-sm text-black mt-2">Complete more lessons to gain badges!</p>
      </div>
    </div>
  );
};

export default SkillsAndBadges;