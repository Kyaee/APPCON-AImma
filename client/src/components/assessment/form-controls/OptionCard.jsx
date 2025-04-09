import React from "react";

export default function OptionCard({
  option,
  isSelected,
  onClick,
  size = "medium",
}) {
  const padding = size === "large" ? "p-6" : size === "medium" ? "p-4" : "p-3";

  return (
    <button
      onClick={() => onClick(option)}
      className={`${padding} rounded-lg transition-all duration-200 cursor-pointer bg-white
        ${
          isSelected
            ? "border-[#3F6CFF] border-3 custom-shadow-75"
            : "border-black border-2 hover:border-black hover:border-3"
        }`}
    >
      {option.icon && (
        <div className="flex justify-center space-x-4">
          {typeof option.icon === "string" ? (
            <span className="text-4xl sm:text-6xl">{option.icon}</span>
          ) : (
            <img
              src={option.icon}
              alt={option.label}
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          )}
        </div>
      )}
      <div>
        <h3 className="mt-3 sm:mt-5 font-medium text-base sm:text-lg text-black">
          {option.label}
        </h3>
      </div>
    </button>
  );
}
