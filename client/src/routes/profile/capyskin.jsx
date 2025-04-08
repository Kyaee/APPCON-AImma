import React, { useState } from 'react';
import capybara from "@/assets/profile/capybara.png";
import charlie from "@/assets/profile/charlie.png";
import tatang from "@/assets/profile/tatang.jpg";
// Placeholder image URLs - replace with your actual images
const placeholderMainImage = capybara;
const boxImages = [
  capybara,
  charlie,
  tatang,
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150"
];

const CapySkin = () => {
  const [selectedImage, setSelectedImage] = useState(placeholderMainImage);

  const handleBoxClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-7xl mx-auto">
      {/* Left side with main image */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-10/12 flex justify-center items-center rounded-lg overflow-hidden shadow-md border-2 border-black">
          <img 
            src={selectedImage} 
            alt="Selected Capy Skin" 
            className="w-[400px] h-[400px] object-contain"
          />
        </div>
      </div>
      
      {/* Right side with grid of boxes */}
      <div className="flex-1 flex justify-center items-center">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full">
          {boxImages.map((imageUrl, index) => (
            <div 
              key={index} 
              className="aspect-square bg-cover bg-center rounded-lg cursor-pointer relative transition-transform duration-200 hover:-translate-y-1 shadow-sm hover:shadow-lg"
              onClick={() => handleBoxClick(imageUrl)}
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-lg text-center">
                <span>Skin {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CapySkin;
