import React from "react";

export default function MultiSelectGrid({
  options,
  selected,
  onChange,
  columns = 3,
}) {
  const handleToggleOption = (option) => {
    const newSelection = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    onChange(newSelection);
  };

  let gridClass = "grid-cols-1";
  if (columns === 2) gridClass = "grid-cols-2 sm:grid-cols-2";
  if (columns === 3) gridClass = "grid-cols-2 sm:grid-cols-3";

  return (
    <div className={`grid ${gridClass} gap-3`}>
      {options.map((option) => (
        <button
          key={typeof option === "object" ? option.value || option.id : option}
          onClick={() => handleToggleOption(option)}
          className={`p-3 rounded-lg text-left transition-all duration-200 bg-white
            ${
              selected.includes(option)
                ? "border-[#3F6CFF] border-3 custom-shadow-75"
                : "border-black border-2 hover:border-black hover:border-3"
            }`}
        >
          <span className="text-black">
            {typeof option === "object" ? option.label : option}
          </span>
        </button>
      ))}
    </div>
  );
}
