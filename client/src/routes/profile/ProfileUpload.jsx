import React, { useState, useRef } from 'react';

const ProfileUpload = ({ initialImageUrl, name, level, experience, totalExperience }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
  const fileInputRef = useRef(null);

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePercentage = () => {
    if (totalExperience === 0) return 0;
    return (experience / totalExperience) * 100;
  };

  const percentage = calculatePercentage();

  return (
    <div className="ml-30 max-w-md rounded-md overflow-hidden mt-25">
      <button
        className="p-4 flex items-center w-full text-left cursor-pointer" // Added cursor-pointer
        onClick={handleProfileClick}
      >
        <div className="relative mr-4">
          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={imageUrl || 'placeholder-image.jpg'}
              alt="profile"
              className="w-full h-full object-cover bg-green-500"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl text-black font-bold">{name}</h2>
          <div className="mt-1">
            <p className="text-gray-600">Lvl. {level}</p>
            <div className="flex items-center mt-1">
              <div className="w-full bg-gray-400 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{experience} exp.</span>
            </div>
          </div>
        </div>
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileUpload;