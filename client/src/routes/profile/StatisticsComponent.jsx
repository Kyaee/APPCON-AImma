import React, { useState } from 'react';

const StatisticsComponent = () => {
  const [activeTab, setActiveTab] = useState('growth');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const sectionData = {
    growth: ['Data 1', 'Data 6', 'Data 5', 'Data 4'],
    strength: ['Data 3', 'Data 2'],
  };

  return (
    <div className="pl-25 flex flex-col mt-10 md:flex-row space-y-4 md:space-y-0 md:space-x-2 p-2 text-black">
      {/* Left Section: Your Statistics */}
      <div className="md:w-1/2">
        <h2 className="text-4xl font-semibold mb-6">Your Statistics</h2>

        {/* Tabbed Interface */}
        <div className="flex bg-[#333333] rounded-md mb-1" style={{ width: '589px', height: '50px' }}>
          <button
            className={`flex-1 text-center py-2 rounded-l-md cursor-pointer transition-colors duration-300  ${
              activeTab === 'growth' ? 'bg-white text-black' : 'bg-black text-white'
            }`}
            onClick={() => handleTabChange('growth')}
          >
           Growth
          </button>
          <button
            className={`flex-1 text-center py-2 rounded-r-md cursor-pointer transition-colors duration-300  ${
              activeTab === 'strength' ? 'bg-white text-black' : 'bg-black text-white'
            }`}
            onClick={() => handleTabChange('strength')}
          >
            Strength and Qualities
          </button>
        </div>

        {/* Tab Content */}
        <div className="border rounded-lg p-4 bg-white" style={{ width: '589px', height: '402px' }}>
          {activeTab === 'growth' ? (
            <div>
              {sectionData.growth.map((item, index) => (
                <div key={index} className="text-sm">
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3 className="font-semibold mb-2">Strength & Qualities</h3>
              <p className="text-sm mb-2">You are <span className="font-semibold">good</span> at analytical bullshit</p>
              {sectionData.strength.map((item, index) => (
                <div key={index} className="text-sm">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Streak */}
      <div className="md:w-1/2">
        <h2 className="mt-1 text-4xl font-semibold mb-4">Streak</h2>
        <div className="flex items-center justify-between mb-8 mt-10">
          <span className="text-6xl font-bold">5 days</span>
          <button className="px-3 py-1 bg-white text-black cursor-pointer rounded-md text-sm hover:bg-[#D2B48C] mr-70 border border-black">Previous Best: 14 days</button>
        </div>
      

        <div className="border-b border-black pb-3" style={{ width: '507px' }}></div>
        <h2 className="px-3 py-6 text-2xl font-semibold mb-4 pb-4">12 Quests finished</h2>
        <div className="border-b border-black pb-3" style={{ width: '507px' }}></div>

        <div className="border rounded-lg bg-white mt-6" style={{ width: '507px', height: '200px' }}>
          <div className="space-y-4 p-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mr-4">75%</h2>
              <h3 className="text-lg">Data Analysis with Python</h3>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mr-4">50%</h2>
              <h3 className="text-lg">Minecraft 2</h3>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mr-4">0%</h2>
              <h3 className="text-lg">TypeScript</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsComponent;