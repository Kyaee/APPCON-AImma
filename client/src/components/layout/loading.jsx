export default function loading() {
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

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <main
      className="h-screen w-full py-5 flex flex-col justify-center items-center select-none"
      style={{
        backgroundImage: "url('/static-gradient.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <l-bouncy
        size="80"
        speed="1.75"
        color="white"
        className="mb-8"
      ></l-bouncy>
      <h3 className="font-extrabold text-xl mb-2">Tip:</h3>
      <p className="max-w-1/4 text-center text-white">
        {randomTip}
      </p>
    </main>
  );
}
