import { useEffect, useRef } from "react";

function Background() {
  return (
    <div
      className="fixed top-0 -z-10 min-h-screen w-screen bg-[#fffaf4] dark:bg-[#1a1a1e]"
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

function VideoBackground() {
  // Used canvas instead of video element to avoid IDM Detection
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = document.createElement("video");

    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.src = "/background/dark-gradient-bg.mp4";
    video.style.display = "none";
    document.body.appendChild(video);

    video.onplay = () => {
      const renderFrame = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(renderFrame);
      };
      requestAnimationFrame(renderFrame);
    };

    return () => {
      video.pause();
      document.body.removeChild(video);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    />
  );
}

export { Background, VideoBackground };
