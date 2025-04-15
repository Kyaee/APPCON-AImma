import { HeartIcon } from "../layout/stats-icons";
import { HeartCrack } from "lucide-react";
import CapyEating from "@/assets/general/capy_eating.png";

export default function HeartTimerCard({ onClose, timeLeft, formatTime, hearts }) {
  return (
    <div 
      className="animate-text-bounce fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-background bg-opacity-50 border-2 border-foreground custom-shadow-50
      w-96 py-2 h-auto rounded-md
      flex items-center justify-center 
    ">
      <div className="bg-white p-4 rounded w-80">
        <img src={CapyEating} />
        <p className="text-center text-3xl font-mono mb-2">{formatTime(timeLeft)}</p>
        <h2 className="text-lg font-bold text-center">Time Left for More Hearts</h2>
        <div className="flex justify-center items-center mt-4 space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            index < hearts ? (
              <HeartIcon key={index} className="text-green-500" />
            ) : (
              <HeartCrack key={index} className="text-red-500" />
            )
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-red-500 text-white py-2 hover:bg-light-brown rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}
