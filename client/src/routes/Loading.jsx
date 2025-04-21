import { useTheme } from "@/config/theme-provider";
import { quantum } from "ldrs";
quantum.register();
import { bouncy } from "ldrs";
bouncy.register();
import boom from "@/assets/general/boom.gif";
import { Background } from "@/components/layout/Background"; 

export default function loading({ generate_roadmap, generate_lesson, generate_assessment }) {
  const { theme } = useTheme();

  const quotes = [
    "Be like a Capybara, relax and wait while we load your content!",
    "The faster you mash buttons, the slower it loads. (Just kidding… or am I?)",
    "Patience is a virtue, even for Capybaras!",
    "Loading is like a Capybara's day: slow and steady wins",
    "Just like a Capybara, we’re taking our time to make it perfect!",
    "Good things come to those who wait, like a Capybara in a hot spring!",
  ];

  const loadtext = [
    "On the way!",
    "Just a moment!",
    "Hang tight!",
    "Loading...",
    "Almost there!",
    "Please wait!",
    "This is taking a while huh?"
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
    "Capybaras are close relatives of guinea pigs"
  ];

  const randomLoadText = loadtext[Math.floor(Math.random() * loadtext.length)];
  const randomqoute = quotes[Math.floor(Math.random() * quotes.length)];
  const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  if (generate_roadmap) {
    return (
      <main className="w-full min-h-screen text-black dark:text-primary overflow-hidden">
        <Background/>
        <l-quantum
          size="80"
          speed="1.5"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-8"
        ></l-quantum>
        <h3 className="font-extrabold text-xl mb-2">{randomLoadText}</h3>
        <p className="animate-text-pulse max-w-1/4 text-center text-foreground">
          {randomqoute}
        </p>
        <h3 className="font-extrabold text-xl mb-2">{randomIdea}</h3>
        <p className="max-w-1/4 text-center text-foreground">{randomTip}</p>
      </main>
    );
  } else if (generate_lesson) {
    return (
      <main className="absolute top-0 left-0 h-screen w-full  py-5 flex flex-col justify-center items-center select-none z-50">
        <Background />
        <img src={boom} alt="Loading..." className="mb-5" />
        <h3 className="font-extrabold text-xl mb-2">{randomLoadText}</h3>
        <p className="animate-text-pulse max-w-1/4 text-center text-foreground mb-8">
          {randomqoute}
        </p>
        <h3 className="font-extrabold text-xl mb-2">{randomIdea}</h3>
        <p className="max-w-1/4 text-center text-foreground">{randomTip}</p>
      </main>
    );
  }
  else if (generate_assessment) {
    return (
      <main className="absolute top-0 left-0 h-screen w-full bg-background py-5 flex flex-col justify-center items-center select-none z-50">
        <l-quantum
          size="80"
          speed="1.5"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-8"
        ></l-quantum>
        <h3 className="font-extrabold text-xl mb-2">{randomLoadText}</h3>
        <p className="animate-text-pulse max-w-1/4 text-center text-foreground">
         {randomqoute}
        </p>
      </main>
    );
  } else {
    return (
      <main className="fixed top-0 left-0 h-screen w-full bg-background py-5 flex flex-col justify-center items-center select-none z-50">
        <img src={boom} alt="Loading..." className="mb-8" />
        <h3 className="font-extrabold text-xl mb-2">{randomIdea}</h3>
        <p className="max-w-1/4 text-center text-foreground">{randomTip}</p>
      </main>
    );
  }
}
