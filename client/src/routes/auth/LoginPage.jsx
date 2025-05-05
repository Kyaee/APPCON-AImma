import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/layout/Background";
import { LoginForm } from "@/components/features/login-form";
import brandIcon from "/favicon.svg";
import { useState, useEffect } from "react";

export default function LoginPage() {
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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative">
      {/* Video Background - hidden until ready */}
      <div className={contentLoaded ? "opacity-100" : "opacity-0"}>
        <VideoBackground />
      </div>

      {/* Content Container */}
      <div
        className={`flex w-full max-w-sm flex-col gap-6 z-10 transition-all duration-700 ${
          contentLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 self-center text-white">
          <img
            src={brandIcon}
            alt="CapyCademy Logo"
            className="h-8 w-8 object-contain"
          />
          <img
            src="/CapyCademy.svg"
            alt="CapyCademy"
            className="h-11 translate-x-[-15px] "
          />
        </Link>

        <LoginForm />
      </div>
    </div>
  );
}
