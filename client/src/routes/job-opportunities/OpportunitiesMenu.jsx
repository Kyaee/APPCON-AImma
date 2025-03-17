import React from 'react';

// Reusable TextBlock Component
const TextBlock = ({ text, style, fontSize, fontWeight, top, left, color, fontStyle, width }) => (
  <div
    style={{
      width: width || '477px',
      fontFamily: 'Inter',
      fontSize: fontSize || '16px',
      fontStyle: fontStyle || 'normal',
      fontWeight: fontWeight || 400,
      lineHeight: '28px',
      letterSpacing: '-0.1px',
      color: color || '#000',
      position: 'absolute',
      top: top || '5%',
      left: left || '5%',
      ...style,
    }}
  >
    {text}
  </div>
);

const OpportunitiesMenu = () => (
  <div className="relative w-[565px] h-[423px] rounded-[10px] border border-black bg-[#FBFAF9] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] p-6">
    <div className="text-black text-2xl font-semibold mb-2">Opportunities</div>
    <div className="text-black text-lg font-medium mt-4">PHP 16,000 - PHP 25,000 a month</div>
    
    <div className="mt-4 text-[#444] text-base italic ml-4">XYZ Company</div>
    <div className="text-[#4C4C4C] text-base">
      Full-time - Arizona 123, America, Yawa Pistalsan/Hybrid Online
    </div>
    
    <div className="mt-8 mb-2 text-black text-xl font-semibold">Insights</div>
    <p className="text-[#4C4C4C] text-base font-medium w-[497px]">
      This a good fit for you because... Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Etiam sed condimentum ante. Integer eget augue vel sapien luctus auctor sed a lorem.
    </p>

    {/* Horizontal line */}
    <div className="absolute bottom-20 left-6 right-6 h-[1px] bg-black" />

    {/* Buttons - Updated positioning and width */}
    <div className="absolute bottom-8 left-6 right-6 flex justify-between">
      <button className="w-[172px] h-[39px] rounded-[5px] border border-black bg-white flex items-center justify-center">
        <span className="text-black text-base font-medium">Not-Interested</span>
      </button>
      
      <button className="w-[140px] h-[39px] rounded-[5px] border border-black bg-[#81B7FF] flex items-center justify-center">
        <span className="text-white text-base font-medium">Check now</span>
      </button>
    </div>
  </div>
);

export default OpportunitiesMenu;
