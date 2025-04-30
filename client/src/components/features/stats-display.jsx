import { GemIcon, HeartIcon } from "@/components/layout/stats-icons";
import { useState, useEffect } from "react";
import HeartTimerCard from "@/components/features/heart-timer-card";
import { supabase } from "@/config/supabase";

export default function StatsDisplay({ hearts, gems, userId }) {
  const [isOpen, onClose] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const TIMER_DURATION = 2 * 60 * 60 * 1000; // 3 hours in milliseconds

    const calculateTimeLeft = async () => {
      const now = Date.now();
      const lastHeartTimestamp = localStorage.getItem("lastHeartTimestamp");

      if (lastHeartTimestamp) {
        const elapsed = now - parseInt(lastHeartTimestamp, 10);

        if (elapsed >= TIMER_DURATION) {
          const { error } = await supabase
          .from("users")
          .update({
            lives: hearts + 1,
          })
          .eq("id", userId);
        if (error) throw error;
          localStorage.setItem("lastHeartTimestamp", now); // Reset timer
          setTimeLeft(TIMER_DURATION);
        } else {
          setTimeLeft(TIMER_DURATION - elapsed);
        }
      } else {
        localStorage.setItem("lastHeartTimestamp", now);
        setTimeLeft(TIMER_DURATION);
      }
    };

    calculateTimeLeft(); // Initial calculation

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);


  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="2xl:flex flex-nowrap gap-4">
      <div onClick={() => onClose(!isOpen)} className="flex items-center gap-2">
        <HeartIcon className="[&_path]:dark:stroke-primary" />
        <span className="text-black dark:text-primary font-inter text-lg font-black leading-7">
          {hearts || "Error"}
        </span>
        <p className="px-3 py-1 bg-muted border border-foreground rounded-full">
          {formatTime(timeLeft)}
        </p>
      </div>
      
      {isOpen && (
        <HeartTimerCard
          onClose={() => onClose(false)}
          timeLeft={timeLeft}
          formatTime={formatTime}
          hearts={5}
        />
      )}

      <div className="flex items-center gap-2">
        <GemIcon className="[&_path]:dark:stroke-primary" />
        <span className="text-black dark:text-primary font-inter text-lg font-black leading-7">
          {gems || "Error"}
        </span>
      </div>
    </div>
  );
}
