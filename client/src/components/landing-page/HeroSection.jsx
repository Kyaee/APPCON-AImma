import { Button } from "@/components/ui/button";
import readingCapy from "@/assets/landing/reading-capy.png";
import { Link } from "react-router-dom";

export default function HeroSection({ mobile }) {
  // Add scroll function matching the nav functionality
  const handleSmoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-24 pb-16 md:py-40">
      <div className="w-[90%] md:w-4/5 mx-auto">
        {/* Mobile Layout (Header, Image, Text, Buttons) - Will be overridden on larger screens */}
        <div className="flex flex-col md:hidden">
          {/* Header Text */}
          <div className="px-4 text-center mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
              It's Time to Train Your Brain 💡
              <br />
              <span className="text-white text-2xl sm:text-3xl">
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
            <p className="text-base sm:text-lg text-white text-balance">
              Dive into smart, bite-sized lessons tailored to you—led by{" "}
              <span className="bg-[#007CE8] p-1 rounded-md">
                your Capybara friend
              </span>{" "}
              who learns as fast as{" "}
              <span className="font-bold italic tracking-tight font-serif">
                you do
              </span>
              .
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 px-4">
            <Link to="/auth/register" className="w-full">
              {!mobile ? (
                <Button
                  size="lg"
                  className="w-full py-6 cursor-pointer custom-shadow-50 text-base bg-[#F4CB57] border-3 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out"
                >
                  Start Learning Now
                </Button>
              ) : (
                <>
                <Button 
                  size="lg"
                  className="w-full py-8 text-wrap bg-neutral-300 border-3 border-black text-black hover:bg-neutral-400 transition duration-300 ease-in-out text-base">
                  This feature is not available on mobile yet ;-;<br/>
                  Use desktop for the best experience
                </Button>
                </>
              )}
            </Link>
            <Button
              variant="outline"
              className="w-full py-6 border-3 custom-shadow-50 text-black bg-white hover:bg-white/80 hover:text-black cursor-pointer"
              size="lg"
              onClick={() => handleSmoothScroll("features")}
            >
              See How It Works
            </Button>
          </div>
        </div>

        {/* Desktop Layout (Original Side-by-Side) */}
        <div className="hidden md:flex md:flex-row items-center">
          <div className="w-1/2 px-4 ml-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 md:mb-8 text-balance">
              It's Time to Train Your Brain 💡
              <br />
              <span className="text-white text-3xl md:text-4xl">
                - Capybara Says 👀
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 md:mb-12 text-balance">
              Dive into smart, bite-sized lessons tailored to you—led by{" "}
              <span className="bg-[#007CE8] text-white p-1 px-2 rounded-md">
                your Capybara friend
              </span>{" "}
              who learns as fast as{" "}
              <span className="font-bold italic tracking-tight font-serif">
                you do
              </span>
              .
            </p>
            <div className="flex flex-row gap-4">
              <Link to="/auth/register">
                <Button
                  size="lg"
                  className="px-6 py-6 cursor-pointer custom-shadow-50 text-base bg-[#F4CB57] border-3 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out"
                >
                  Start Learning Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="px-8 py-6 border-3 border-black custom-shadow-50 text-black bg-white hover:bg-white/80 hover:text-black cursor-pointer"
                size="lg"
                onClick={() => handleSmoothScroll("features")}
              >
                See How It Works
              </Button>
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
