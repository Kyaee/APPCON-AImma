import React from 'react';
import useSkinStore from '@/store/useSkinStore';
import { FaLock } from 'react-icons/fa';

export default function CapySkin() {
  const { 
    allSkins, 
    selectedSkinIndex, 
    selectedSkin, 
    setSelectedSkin 
  } = useSkinStore();

  const handleBoxClick = (index) => {
    // Only select skin if it's not locked
    if (!allSkins[index].locked) {
      setSelectedSkin(index);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto h-full">
      {/* Title Section */}
      
      <div className="flex flex-col md:flex-row gap-1 w-full">
        {/* Preview Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-10/12 flex flex-col justify-center items-center rounded-lg overflow-hidden h-[300px] bg-background dark:bg-dark-mode-bg">
            <div className="flex flex-col justify-center items-center h-full">
              <img 
                src={selectedSkin.image} 
                alt={selectedSkin.name}
                className="object-contain max-h-[250px] w-auto"
              />
              <p className="mt-3 text-center font-semibold">
                Currently equipped: {selectedSkin.name}
              </p>
            </div>
          </div>
        </div>
        
        {/* Skin selection */}
        <div className="flex-1 flex justify-center items-center">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-auto">
            {allSkins.map((skin, index) => (
              <div 
                key={index} 
                className={`aspect-square bg-cover bg-center rounded-lg relative transition-transform duration-200 ${
                  skin.locked ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:-translate-y-1 hover:shadow-lg'
                } ${
                  selectedSkinIndex === index ? 'ring-4 ring-light-brown scale-105' : ''
                } shadow-sm`}
                onClick={() => handleBoxClick(index)}
                style={{ backgroundImage: `url(${skin.image})` }}
              >
                {skin.locked && (
                  <div className="absolute top-2 right-2 bg-gray-200 dark:bg-black bg-opacity-70 dark:bg-opacity-70 p-1 rounded-full">
                    <FaLock className="text-gray-700 dark:text-white text-lg" />
                  </div>
                )}
                <div className={`absolute bottom-0 left-0 right-0 ${
                  selectedSkinIndex === index ? 'bg-light-brown' : 'bg-black dark:bg-gray-200 bg-opacity-50 dark:bg-opacity-50'
                } text-sm text-gray-200 dark:text-black p-1 rounded-b-lg text-center`}>
                  <span>{selectedSkinIndex === index ? 'Equipped' : skin.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


