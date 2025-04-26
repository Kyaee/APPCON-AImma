import { useTheme } from "@/config/theme-provider";
import { useState, useEffect, useMemo } from "react";
import { quantum } from "ldrs";
quantum.register();
import { bouncy } from "ldrs";
bouncy.register();
import wait from "@/assets/general/waiting.gif";
import { Background, VideoBackground } from "@/components/layout/Background";

export default function loading({
  generate_roadmap,
  generate_lesson,
  generate_assessment,
  preserveBackground, // Add optional prop to force a specific background type
}) {
  const { theme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine if this is a long-loading process (AI generation)
  const isLongLoadProcess =
    generate_roadmap || generate_lesson || generate_assessment;


  // Preload the GIF image
  useEffect(() => {
    const img = new Image();
    img.src = wait;
    img.onload = () => setImageLoaded(true);
  }, []);

  // Random loading text arrays
  const loadtext = [
    "On the way!",
    "Just a moment!",
    "Hang tight!",
    "Loading...",
    "Almost there!",
    "Please wait!",
    "This is taking a while huh?",
  ];

  // For short loads - landing to dashboard, navigation, etc.
  const quotes = [
    "Be like a Capybara, relax and wait while we load your content!",
    "The faster you mash buttons, the slower it loads. (Just kidding… or am I?)",
    "Patience is a virtue, even for Capybaras!",
    "Loading is like a Capybara's day: slow and steady wins",
    "Just like a Capybara, we're taking our time to make it perfect!",
    "Good things come to those who wait, like a Capybara in a hot spring!",
  ];

  // For long loads - AI generation processes
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

  const randomLoadText = useMemo(
    () => loadtext[Math.floor(Math.random() * loadtext.length)],
    []
  );
  const randomQuote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    []
  );
  const randomIdea = useMemo(
    () => ideas[Math.floor(Math.random() * ideas.length)],
    []
  );
  const randomTip = useMemo(
    () => tips[Math.floor(Math.random() * tips.length)],
    []
  );

  return (
    <main className="fixed top-0 left-0 h-screen w-full py-5 flex flex-col justify-center items-center select-none z-50">
      {/* Use either video or static background based on the detection */}
      {(preserveBackground === "video") ? <VideoBackground /> : <Background />}

      {/* Load text moved above the image */}
      <h3 className="font-extrabold text-3xl mb-6">{randomLoadText}</h3>

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

      {/* Show appropriate loader based on the loading type */}
      {isLongLoadProcess ? (
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

      {/* Conditional text content based on loading type */}
      {isLongLoadProcess ? (
        <div className="animate-text-pulse text-center">
          <h3 className="font-semibold text-xl mb-2">{randomIdea}</h3>
          <p className="text-foreground text-xl max-w-md">{randomTip}</p>
        </div>
      ) : (
        <p className="animate-text-pulse text-xl max-w-md text-center text-foreground">
          {randomQuote}
        </p>
      )}
    </main>
  );
}
