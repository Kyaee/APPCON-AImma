import { Button } from "@/components/ui/button";
import readingCapy from "@/assets/landing/reading-capy.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:py-40">
      <div className="w-[90%] md:w-4/5 mx-auto">
        {/* Mobile Layout (Header, Image, Text, Buttons) - Will be overridden on larger screens */}
        <div className="flex flex-col md:hidden">
          {/* Header Text */}
          <div className="px-4 text-center mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
              It's Time to Train Your Brain 💡
              <br />
              <span className="text-primary text-2xl sm:text-3xl">
                - Capybara Says 👀
              </span>
            </h1>
          </div>

          {/* Image */}
          <div className="w-full flex justify-center items-center mb-6">
            <img
              src={readingCapy}
              alt="Reading Capy"
              className="w-[100%] sm:w-[90%] max-w-none h-auto"
            />
          </div>

          {/* Description Text */}
          <div className="px-4 text-center mb-8">
            <p className="text-base sm:text-lg text-foreground/80 text-balance">
              Dive into smart, bite-sized lessons tailored to you—led by{" "}
              <span className="bg-[#F4CB57] p-1">your Capybara friend</span> who
              learns as fast as{" "}
              <span className="font-bold italic tracking-tight font-serif">
                you do
              </span>
              .
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 px-4">
            <Link to="/auth/register" className="w-full">
              <Button
                size="lg"
                className="w-full py-4 text-base bg-[#F4CB57] border-2 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out"
              >
                Start Learning Now
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full">
              <Button
                variant="outline"
                className="w-full py-4 text-base"
                size="lg"
              >
                See How It Works
              </Button>
            </a>
          </div>
        </div>

        {/* Desktop Layout (Original Side-by-Side) */}
        <div className="hidden md:flex md:flex-row items-center">
          <div className="w-1/2 px-4 ml-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 md:mb-8 text-balance">
              It's Time to Train Your Brain 💡
              <br />
              <span className="text-primary text-3xl md:text-4xl">
                - Capybara Says 👀
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 md:mb-12 text-balance">
              Dive into smart, bite-sized lessons tailored to you—led by{" "}
              <span className="bg-[#F4CB57] p-1">your Capybara friend</span> who
              learns as fast as{" "}
              <span className="font-bold italic tracking-tight font-serif">
                you do
              </span>
              .
            </p>
            <div className="flex flex-row gap-4">
              <Link to="/auth/register">
                <Button
                  size="lg"
                  className="px-6 py-4 text-base bg-[#F4CB57] border-2 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out"
                >
                  Start Learning Now
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  className="px-6 py-4 text-base"
                  size="lg"
                >
                  See How It Works
                </Button>
              </a>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <img
              src={readingCapy}
              alt="Reading Capy"
              className="w-[130%] lg:w-[140%] max-w-none h-auto transform scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
