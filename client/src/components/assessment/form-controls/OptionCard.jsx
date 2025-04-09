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
      className={`${padding} rounded-lg border-2 text-center transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? "border-primary bg-primary/10"
            : "border-gray-200 hover:border-primary/50"
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
        <h3 className="mt-3 sm:mt-5 font-medium text-base sm:text-lg">
          {option.label}
        </h3>
      </div>
    </button>
  );
}
