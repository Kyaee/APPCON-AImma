import React from "react";

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  rows = 4,
  required = false,
}) {
  return (
    <div>
      {label && (
        <label className="block text-lg mb-2 text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded-lg border-2 border-black bg-white text-black h-32"
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded-lg border-2 border-black bg-white text-black"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
