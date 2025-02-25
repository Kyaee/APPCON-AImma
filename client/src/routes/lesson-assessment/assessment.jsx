import { useState } from "react";
import { Sprout, 
  Target, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowLeft, 
  ArrowRight 
} from "lucide-react";
import Image from "../../assets/lesson-assessment/la-intro-capybara.png";

const IntroSlides = [
  {
    id: "welcome",
    logo: "/public/brandicon.png",
    title: "Welcome to",
    subtitle: "Here's how our platform helps you grow professionally.",
    brandName: "Capacademy!",
    button: "Let's Go!",
  },
  {
    id: "learning-paths",
    title: "Personalized Learning Paths",
    subtitle:
      "AI tailors courses based on your assessment results, ensuring you learn exactly what you need.",
    image: "/public/brandicon.png",
  },
];

export default function Assessment() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < IntroSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > IntroSlides.length - 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = IntroSlides[currentSlide];

  return (
    <main
      className="h-screen w-full py-5 flex flex-col justify-between "
      style={{
        backgroundImage: "url('/static-gradient.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="px-6 flex justify-between items-center">
        <h1 className="text-white text-2xl">CapaCademy</h1>
        <nav
          className="p-3 px-4 flex items-center gap-4 bg-white text-black custom-shadow-75 rounded-lg 
          *:text-sm *:flex *:gap-2 *:px-4 *:py-1 *:rounded-md "
        >
          <a className="hover:bg-neutral-200">
            <Sprout size="20" />
            Lesson
          </a>
          <a className="hover:bg-neutral-200">
            <Target size="19" />
            Assessment
          </a>
          <a className="hover:bg-neutral-200">
            <ShoppingCart size="17  " />
            Shop
          </a>
        </nav>
        <button className="text-sm p-2 flex bg-white text-black gap-1 custom-shadow-50 rounded-md">
          <ArrowUpRight size="20" />
          Return
        </button>
      </header>

      <article
        className="flex flex-col items-center justify-center p-8 md:p-12 relative"
      > 
        <img src={Image} alt="capybara superhero"/>
        <h1 className="text-4xl font-extrabold mb-4">Start Your Assessment?</h1>
        <p>Before you start, make sure to understand the previous material</p>
        <button className="py-4 w-1/5 mt-8 text-lg  bg-white text-black font-extrabold custom-shadow-50 rounded-lg
          hover:bg-neutral-300"
        >
          Start
        </button>
      </article>
      
      <footer
        className="pt-4 flex items-center justify-around border-t border-white
        *:flex *:py-4 *:rounded-lg *:gap-2 "  
      >
        <button className="border-white border px-10">
          <ArrowLeft/>Back
        </button>
        <button className="bg-[#BF8648] border-2 border-black px-6 custom-shadow-50">
          Continue<ArrowRight/>
        </button>
      </footer>
    </main>
  );
}
