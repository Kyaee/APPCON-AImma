import React from 'react';
import useSkinStore from '@/store/useSkinStore';

export default function CapySkin() {
  const { 
    allSkins, 
    selectedSkinIndex, 
    selectedSkin, 
    setSelectedSkin 
  } = useSkinStore();

  const handleBoxClick = (index) => {
    setSelectedSkin(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-1 max-w-7xl mx-auto h-full">
      {/* Preview Image */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-10/12 flex flex-col justify-center items-center rounded-lg overflow-hidden">
          <img 
            src={selectedSkin.image} 
            alt={selectedSkin.name}
            className="h-[200px] object-contain"
          />
          <p className="mt-3 text-center font-semibold">
            Currently equipped: {selectedSkin.name}
          </p>
        </div>
      </div>
      
      {/* Skin selection */}
      <div className="flex-1 flex justify-center items-center">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full">
          {allSkins.map((skin, index) => (
            <div 
              key={index} 
              className={`aspect-square bg-cover bg-center rounded-lg cursor-pointer relative transition-transform duration-200 hover:-translate-y-1 shadow-sm hover:shadow-lg ${
                selectedSkinIndex === index ? 'ring-4 ring-blue-500 scale-105' : ''
              }`}
              onClick={() => handleBoxClick(index)}
              style={{ backgroundImage: `url(${skin.image})` }}
            >
              <div className={`absolute bottom-0 left-0 right-0 ${
                selectedSkinIndex === index ? 'bg-blue-500' : 'bg-black bg-opacity-50'
              } text-white p-1 rounded-b-lg text-center`}>
                <span>{selectedSkinIndex === index ? 'Equipped' : skin.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


