import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButtons = ({ prevPage, nextPage, buttonPosition }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed container mx-auto my-auto items-center flex 
      ${buttonPosition === 'center' ? 'justify-center gap-180' : 'justify-between px-32'} 
      place-self-center bottom-20 p-2`}
    >
      {prevPage && (
        <button
          onClick={prevPage}
          className="px-25 py-2 bg-amber-500 border-2 drop-shadow-xl border-black text-black rounded-2xl hover:bg-amber-900 transition-colors
           my-auto w-32 text-center flex items-center justify-center"
        >
          Back
        </button>
      )}
      {nextPage && (
        <button
          onClick={nextPage}
          className="px-25 py-2 bg-amber-500 border-2 drop-shadow-xl border-black text-black rounded-2xl hover:bg-amber-900 
          transition-colors my-auto w-32 text-center flex items-center justify-center"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
