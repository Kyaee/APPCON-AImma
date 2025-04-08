import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const MainNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex justify-center items-center z-50 pt-6">
      <div className="w-4/5 h-[48px] rounded-lg flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img
            src="/favicon.svg"
            alt="Capacademy Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-foreground">CapyCademy</span>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-foreground hover:text-primary font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-foreground hover:text-primary font-medium"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="text-foreground hover:text-primary font-medium"
          >
            FAQ
          </a>
          <Link to="/auth/login">
            <Button className="bg-primary text-white hover:bg-primary/80">
              Log In
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed top-[60px] right-0 h-screen w-64 bg-background shadow-lg z-50">
            {/* Your mobile navigation items */}
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNav;
