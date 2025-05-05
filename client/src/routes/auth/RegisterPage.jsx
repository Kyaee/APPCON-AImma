import { VideoBackground } from "@/components/layout/Background";
import { RegisterForm } from "@/components/features/register-form";
import brandIcon from "/favicon.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
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
    img.src = brandIcon;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side - Form container */}
      <div
        className={`flex flex-col gap-4 p-6 md:p-10 border-r-4 border-black transition-all duration-700 bg-white ${
          contentLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            to="/"
            className="flex items-center gap-2 font-medium text-lg text-black"
          >
            <img
              src={brandIcon}
              alt="CapyCademy Logo"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/CapyCademy.svg"
              alt="CapyCademy"
              className="h-10 translate-x-[-15px]"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* Right side - Video background */}
      <div className="relative hidden lg:block">
        <div className={contentLoaded ? "opacity-100" : "opacity-0"}>
          <VideoBackground />
        </div>
      </div>
    </div>
  );
}
