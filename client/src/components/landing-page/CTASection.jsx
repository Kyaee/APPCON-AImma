import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import brandIcon from "@/assets/general/brandicon.png";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="w-4/5 mx-auto text-center">
        <div className="flex flex-col items-center">
          <img
            src={brandIcon}
            alt="Capacademy Brand"
            className="w-32 h-32 mb-6"
          />
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to start your coding journey?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Join thousands of learners who are building their skills and
            advancing their careers with CapyCademy's interactive learning
            platform.
          </p>
          <Link to="/auth/register">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 text-white"
            >
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
