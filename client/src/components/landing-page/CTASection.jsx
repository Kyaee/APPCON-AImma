import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import brandIcon from "@/assets/general/brandicon.png";

export default function CTASection({ mobile }) {
  return (
    <section className="py-10 md:py-20 mb-16 md:mb-25">
      <div className="w-[90%] md:w-4/5 mx-auto text-center">
        <div className="flex flex-col items-center">
          <img
            src={brandIcon}
            alt="CapyCademy Brand"
            className="w-40 h-40 md:w-62 md:h-62 mb-4 md:mb-6"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to start your coding journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Join thousands of learners who are building their skills and
            advancing their careers with CapyCademy's interactive learning
            platform.
          </p>
          {!mobile ? (
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-[#F4CB57] custom-shadow-50 border-3 border-black px-6 py-6 md:px-8 md:py-8 hover:bg-[#e7b21d] cursor-pointer text-black text-base md:text-lg"
              >
                Create Your Free Account
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              className="w-full py-8 text-wrap bg-neutral-300 border-3 border-black text-black hover:bg-neutral-400 transition duration-300 ease-in-out text-base"
            >
              Use desktop for the best experience
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
