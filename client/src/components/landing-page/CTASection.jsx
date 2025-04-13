import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import brandIcon from "@/assets/general/brandicon.png";

export default function CTASection() {
  return (
    <section className="py-20 mb-25">
      <div className="w-4/5 mx-auto text-center">
        <div className="flex flex-col items-center">
          <img
            src={brandIcon}
            alt="Capycademy Brand"
            className="w-62 h-62 mb-6"
          />
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to start your coding journey?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Join thousands of learners who are building their skills and
            advancing their careers with Capycademy's interactive learning
            platform.
          </p>
          <Link to="/auth/register">
            <Button
              size="lg"
              className="bg-[#F4CB57] custom-shadow-50 border-2 border-black px-8 py-8 hover:bg-[#e7b21d] text-black text-lg"
            >
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
