import React from "react";

export default function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
}) {
  return (
    <div>
      {label && (
        <label className="block text-lg mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg border-2 border-gray-200 text-black bg-white"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={
              typeof option === "object" ? option.value || option.id : option
            }
            value={
              typeof option === "object" ? option.value || option.id : option
            }
          >
            {typeof option === "object" ? option.label : option}
          </option>
        ))}
      </select>
    </div>
  );
}
