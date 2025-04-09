import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButtons = ({ prevPage, nextPage, buttonPosition }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed container mx-auto my-auto items-center flex 
      ${
        buttonPosition === "center"
          ? "justify-center gap-180"
          : "justify-between px-32"
      } 
      place-self-center bottom-20 p-2`}
    >
      {prevPage && (
        <button
          onClick={prevPage}
          className="mt-6 px-20 py-3 bg-brown hover:bg-dark-brown text-white rounded-md transition-colors border-2 border-black"
        >
          Back
        </button>
      )}
      {nextPage && (
        <button
          onClick={nextPage}
          className="mt-6 px-20 py-3 bg-brown hover:bg-dark-brown text-white rounded-md transition-colors border-2 border-black"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
