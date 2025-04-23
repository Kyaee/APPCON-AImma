import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const MainNav = ({ isLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for fixed header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`w-full fixed top-0 left-0 flex justify-center items-center z-50 pt-3 pb-3 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b-2 border-black"
          : ""
      }`}
    >
      <div className="w-[90%] md:w-4/5 h-[48px] rounded-lg flex items-center justify-between px-2 md:px-4">
        <div className="flex items-center gap-2">
          <img
            src="/favicon.svg"
            alt="CapyCademy Logo"
            className="h-8 w-8 md:h-10 md:w-10 object-contain"
          />
          <span className="text-xl md:text-2xl font-bold text-foreground">
            CapyCademy
          </span>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground p-1 transition-colors hover:bg-muted rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-base text-foreground hover:text-primary font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-base text-foreground hover:text-primary font-medium"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="text-base text-foreground hover:text-primary font-medium"
          >
            FAQ
          </a>
          {!isLoggedIn ? (
            <Link to="/auth/login">
              <Button className="px-4 md:px-8 py-3 md:py-4 bg-[#F4CB57] border-2 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                Log In
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <Button className="px-4 md:px-8 py-3 md:py-4 bg-[#F4CB57] border-2 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                Dashboard
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed top-[60px] right-0 h-screen w-full md:w-64 bg-background/95 backdrop-blur-md shadow-lg z-50 animate-in slide-in-from-right">
            <div className="flex flex-col p-6 gap-6">
              <a
                href="#features"
                className="text-base text-foreground hover:text-primary font-medium py-3 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-base text-foreground hover:text-primary font-medium py-3 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#faq"
                className="text-base text-foreground hover:text-primary font-medium py-3 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              {!isLoggedIn ? (
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full mt-4 py-4 bg-[#F4CB57] border-2 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                    Log In
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full mt-4 py-4 bg-[#F4CB57] border-2 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNav;
