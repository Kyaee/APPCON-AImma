import { useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
// Import useTheme hook
import { useTheme } from "@/config/theme-provider";

function Background({ className }) {
  return (
    <div
      className={cn(
        "fixed top-0 -z-10 min-h-screen w-screen bg-[#fffaf4] dark:bg-[#292d3e]",
        className
      )}
      style={{
        backgroundImage: "url('/background/lines-bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "multiply",
        minHeight: "100vh",
        width: "100vw",
        overflow: "auto",
      }}
    />
  );
}

// Static gradient background for performance-sensitive pages
function StaticBackground() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1e 0%, #242429 50%, #1a1a1e 100%)",
      }}
    />
  );
}

// Direct video element approach - simpler and more performant
function VideoBackground() {
  const location = useLocation();
  const [fallbackActive, setFallbackActive] = useState(false);
  // Get the current theme
  const { theme } = useTheme();

  const handleVideoError = (e) => {
    console.error("Video Error:", e); // Log the specific error
    console.log("Video failed to load, using fallback");
    setFallbackActive(true);
  };

  if (fallbackActive) {
    return <StaticBackground />;
  }

  // Determine video sources based on theme
  const videoSrcMp4 =
    theme === "dark"
      ? "/background/dark-gradient-bg.mp4"
      : "/background/light-gradient-bg.mp4";
  const videoSrcWebm =
    theme === "dark"
      ? "/background/dark-gradient-bg.webm"
      : "/background/light-gradient-bg.webm";

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        // Add a key that changes with the theme to force re-render/reload
        key={theme}
        autoPlay
        loop
        muted
        playsInline
        onError={handleVideoError}
        className="absolute w-full h-full object-cover"
      >
        {/* Provide multiple sources for better browser compatibility */}
        {/* Use theme-based sources */}
        <source src={videoSrcWebm} type="video/webm" />
        <source src={videoSrcMp4} type="video/mp4" />
        {/* Fallback text if video cannot be played */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export { Background, VideoBackground, StaticBackground };
