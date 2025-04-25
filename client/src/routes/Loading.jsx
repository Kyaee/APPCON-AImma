import { useTheme } from "@/config/theme-provider";
import { useState, useEffect } from "react";
import { quantum } from "ldrs";
quantum.register();
import { bouncy } from "ldrs";
bouncy.register();
import wait from "@/assets/general/waiting.gif";
import { Background, VideoBackground } from "@/components/layout/Background";
import { useLocation } from "react-router-dom";

export default function loading({
  generate_roadmap,
  generate_lesson,
  generate_assessment,
  preserveBackground, // Add optional prop to force a specific background type
}) {
  const { theme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const location = useLocation();

  // Determine which background to use based on the previous route or the preserveBackground prop
  const shouldUseVideoBackground = () => {
    if (preserveBackground === "video") return true;
    if (preserveBackground === "static") return false;

    // Auto-detect based on current/previous route
    const gradientBgRoutes = [
      "/showcase",
      "/assessment",
      "/user-assessment",
      "/introduction",
      "/login",
      "/register",
      "/onboarding",
    ];

    // Check if current path includes any of the gradient routes
    return gradientBgRoutes.some(
      (route) =>
        location.pathname.includes(route) || document.referrer.includes(route)
    );
  };

  // Preload the GIF image
  useEffect(() => {
    const img = new Image();
    img.src = wait;
    img.onload = () => setImageLoaded(true);
  }, []);

  // Random loading images that will be placed in /public/loading-images/

  const quotes = [
    "Be like a Capybara, relax and wait while we load your content!",
    "The faster you mash buttons, the slower it loads. (Just kidding… or am I?)",
    "Patience is a virtue, even for Capybaras!",
    "Loading is like a Capybara's day: slow and steady wins",
    "Just like a Capybara, we're taking our time to make it perfect!",
    "Good things come to those who wait, like a Capybara in a hot spring!",
  ];

  const loadtext = [
    "On the way!",
    "Just a moment!",
    "Hang tight!",
    "Loading...",
    "Almost there!",
    "Please wait!",
    "This is taking a while huh?",
  ];

  const ideas = [
    "Did you know?",
    "Here's a thought:",
    "Did you ever think about?",
    "Here's a fun fact:",
    "Did you know that?",
  ];

  const tips = [
    "Capybaras can hold their breath underwater for up to 5 minutes!",
    "Capybaras are excellent swimmers and have webbed toes",
    "A group of capybaras is called a 'herd'",
    "Capybaras can sleep in water by keeping their nose above the surface",
    "Baby capybaras can run and swim within hours of birth",
    "Capybaras purr like cats when they're happy",
    "These giant rodents are herbivores and eat about 6-8 pounds of grass per day",
    "Capybaras are known as 'nature's chairs' because other animals often sit on them",
    "They can jump up to 4 feet high despite their chubby appearance",
    "Capybaras are close relatives of guinea pigs",
  ];

  const randomLoadText = loadtext[Math.floor(Math.random() * loadtext.length)];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  // Common loading screen structure with different loader styles based on context
  return (
    <main className="fixed top-0 left-0 h-screen w-full py-5 flex flex-col justify-center items-center select-none z-50">
      {/* Use either video or static background based on the detection */}
      {shouldUseVideoBackground() ? <VideoBackground /> : <Background />}

      {/* Load text moved above the image */}
      <h3 className="font-extrabold text-3xl  mb-6">{randomLoadText}</h3>

      {/* Only show GIF if loaded, otherwise show a loader */}
      {imageLoaded ? (
        <img
          src={wait}
          alt="Loading..."
          className="mb-6 w-80 h-80 object-contain"
        />
      ) : (
        <div className="mb-6 w-80 h-80 flex items-center justify-center">
          <l-bouncy
            size="60"
            speed="2"
            color={theme === "dark" ? "#fff" : "#000"}
          ></l-bouncy>
        </div>
      )}

      {/* Different loader styles based on context */}
      {generate_roadmap ? (
        <l-quantum
          size="80"
          speed="1.5"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-6"
        ></l-quantum>
      ) : generate_assessment ? (
        <l-quantum
          size="80"
          speed="1.5"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-6"
        ></l-quantum>
      ) : (
        <l-bouncy
          size="45"
          speed="1.75"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-6"
        ></l-bouncy>
      )}

      {/* Common loading text content */}
      <p className="animate-text-pulse text-xl max-w-md text-center text-foreground mb-4">
        {randomQuote}
      </p>

      {/* Ideas and tips moved to center bottom */}
      <div className="absolute bottom-5 left-0 right-0 mx-auto text-center w-fit max-w-md">
        <h3 className="font-extrabold text-xl mb-2">{randomIdea}</h3>
        <p className="text-foreground">{randomTip}</p>
      </div>
    </main>
  );
}
