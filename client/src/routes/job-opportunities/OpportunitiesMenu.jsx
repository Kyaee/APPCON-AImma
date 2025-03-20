import React from 'react';

const OpportunitiesMenu = () => (
  <div className="flex-1 max-w-[565px] min-h-[423px] rounded-[10px] border border-black bg-[#FBFAF9] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] p-6 relative">
    <div className="text-black text-2xl font-semibold mb-2">Opportunities</div>
    <div className="text-black text-lg font-medium mt-4">PHP 16,000 - PHP 25,000 a month</div>
    
    <div className="mt-4 text-[#444] text-base italic">XYZ Company</div>
    <div className="text-[#4C4C4C] text-base">
      Full-time - Arizona 123, America, Yawa Pistalsan/Hybrid Online
    </div>
    
    <div className="mt-8 mb-2 text-black text-xl font-semibold">Insights</div>
    <p className="text-[#4C4C4C] text-base font-medium max-w-[497px]">
      This a good fit for you because... Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Etiam sed condimentum ante. Integer eget augue vel sapien luctus auctor sed a lorem.
    </p>

    {/* Horizontal line */}
    <div className="w-full h-[1px] bg-black my-6" />

    {/* Buttons */}
    <div className="flex justify-between gap-4">
      <button className="flex-1 h-[39px] rounded-[5px] border border-black bg-white flex items-center justify-center">
        <span className="text-black text-base font-medium">Not-Interested</span>
      </button>
      
      <button className="flex-1 h-[39px] rounded-[5px] border border-black bg-[#81B7FF] flex items-center justify-center">
        <span className="text-white text-base font-medium">Check now</span>
      </button>
    </div>
  </div>
);

export default OpportunitiesMenu;
