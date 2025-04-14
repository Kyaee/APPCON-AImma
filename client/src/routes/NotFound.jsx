import { VideoBackground } from "@/components/layout/Background";
import detectiveCapybara from "@/assets/user-assessment/DetectiveCapybara.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgReady, setBgReady] = useState(false);

  // Set a timer to ensure background has time to load
  useEffect(() => {
    const bgTimer = setTimeout(() => {
      setBgReady(true);
    }, 800); // Give background time to initialize

    return () => clearTimeout(bgTimer);
  }, []);

  // Only set content as loaded when both image and bg are ready
  useEffect(() => {
    if (imageLoaded && bgReady) {
      // Add small delay for smoothness
      const timer = setTimeout(() => {
        setContentLoaded(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [imageLoaded, bgReady]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = detectiveCapybara;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative font-['Inter']">
      {/* Video Background - hidden until ready */}
      <div className={contentLoaded ? "opacity-100" : "opacity-0"}>
        <VideoBackground />
      </div>

      {/* Content Container */}
      <div
        className={`flex flex-col items-center justify-center gap-6 text-center z-10 mb-20 transition-all duration-700 ${
          contentLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Detective Capybara Image */}
        <img
          src={detectiveCapybara}
          alt="Detective Capybara"
          className="w-64 h-64 object-contain translate-y-13"
        />

        {/* Box-like Horizontal Rule */}
        <div className="w-[500px] h-1 bg-white rounded-md"></div>

        {/* 404 Text */}
        <h1 className="text-7xl font-bold text-white">404</h1>

        {/* Page Not Found Text */}
        <h2 className="text-3xl font-semibold text-white">
          Oops, This Page Not Found!
        </h2>

        {/* Return to Home Button */}
        <Link
          to="/"
          className="mt-6 px-10 py-3 bg-brown hover:bg-dark-brown text-white rounded-md transition-colors border-2 border-black"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
