import { useTheme } from "@/config/theme-provider";
import { quantum } from "ldrs";
quantum.register();
import { bouncy } from "ldrs";
bouncy.register();

export default function loading({ generate_roadmap, generate_lesson, generate_assessment }) {
  const { theme } = useTheme();

  if (generate_roadmap) {
    return (
      <main className="absolute top-0 left-0 h-screen w-full bg-background py-5 flex flex-col justify-center items-center select-none z-50">
        <l-quantum
          size="80"
          speed="1.5"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-8"
        ></l-quantum>
        <h3 className="font-extrabold text-xl mb-2">On the Way!</h3>
        <p className="animate-text-pulse max-w-1/4 text-center text-foreground">
          Generating your personal lesson
        </p>
      </main>
    );
  } else if (generate_lesson) {
    return (
      <main className="absolute top-0 left-0 h-screen w-full bg-background py-5 flex flex-col justify-center items-center select-none z-50">
        <l-quantum
          size="80"
          speed="1.5"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-8"
        ></l-quantum>
        <h3 className="font-extrabold text-xl mb-2">On the Way!</h3>
        <p className="animate-text-pulse max-w-1/4 text-center text-foreground">
          Generating your personal lesson NIGGA
        </p>
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
        <h3 className="font-extrabold text-xl mb-2">On the Way!</h3>
        <p className="animate-text-pulse max-w-1/4 text-center text-foreground">
          Generating your personal lesson
        </p>
      </main>
    );
  } else {
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
      "Be like a Capybara, relax and wait while we load your content!",
      "The faster you mash buttons, the slower it loads. (Just kidding… or am I?)"
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
      <main className="fixed top-0 left-0 h-screen w-full bg-background py-5 flex flex-col justify-center items-center select-none z-50">
        <l-bouncy
          size="80"
          speed="1.75"
          color={theme === "dark" ? "#fff" : "#000"}
          className="mb-8"
        ></l-bouncy>
        <h3 className="font-extrabold text-xl mb-2">Tip:</h3>
        <p className="max-w-1/4 text-center text-foreground">{randomTip}</p>
      </main>
    );
  }
}
