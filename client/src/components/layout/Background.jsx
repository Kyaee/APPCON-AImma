import { useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

function Background({ className }) {
  return (
    <div
      className={cn(
        "fixed top-0 -z-10 min-h-screen w-screen bg-[#fffaf4] dark:bg-[#1a1a1e]",
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

  const handleVideoError = () => {
    console.log("Video failed to load, using fallback");
    setFallbackActive(true);
  };

  if (fallbackActive) {
    return <StaticBackground />;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        onError={handleVideoError}
        className="absolute w-full h-full object-cover"
      >
        <source src="/background/dark-gradient-bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export { Background, VideoBackground, StaticBackground };
