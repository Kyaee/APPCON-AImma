import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButtons = ({ prevPage, nextPage, buttonPosition }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed container mx-auto my-auto items-center flex justify-between  place-self-center bottom-20 ${buttonPosition} p-2`}
    >
      {prevPage && (
        <button
          onClick={() => navigate(prevPage)}
          className="px-25 py-2 bg-amber-500 border-2 drop-shadow-xl border-black text-black  rounded-2xl hover:bg-amber-900 transition-colors my-auto"
        >
          Back
        </button>
      )}
      {nextPage && (
        <button
          onClick={() => navigate(nextPage)}
          className="px-25 py-2 bg-amber-500 border-2 drop-shadow-xl border-black text-black  rounded-2xl hover:bg-amber-900 transition-colors my-auto"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
