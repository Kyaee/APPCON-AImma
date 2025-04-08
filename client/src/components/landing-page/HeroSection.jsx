import { Button } from "@/components/ui/button";
import readingCapy from "@/assets/landing/reading-capy.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-40">
      <div className="w-4/5 mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 ml-8 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-6">
            Learn to code with your
            <br />
            <span className="text-primary">capybara companion</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Master coding skills with interactive lessons and projects, guided
            by your friendly capybara companion who adapts to your learning
            style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/80"
              >
                Start Learning Now
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={readingCapy}
            alt="Reading Capy"
            className="w-[120%] md:w-[130%] lg:w-[140%] max-w-none h-auto transform scale-110"
          />
        </div>
      </div>
    </section>
  );
}
