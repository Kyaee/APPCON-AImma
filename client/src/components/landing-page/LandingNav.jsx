import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const MainNav = ({ isLoggedIn, mobile }) => {
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

  // Add smooth scroll function with offset adjustment
  const handleSmoothScroll = (elementId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      // Get the height of the header to use as offset
      const headerHeight = document.querySelector("header").offsetHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px buffer

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 flex justify-center items-center z-50 pt-5 pb-3 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-black shadow-sm border-b-3 border-black"
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
          <span
            className={`text-xl md:text-2xl font-bold ${
              scrolled || mobileMenuOpen ? "text-white" : "text-white"
            }`}
          >
            CapyCademy
          </span>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-1 transition-colors hover:bg-[#007CE8] rounded-md ${
            scrolled || mobileMenuOpen ? "text-white" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleSmoothScroll("features")}
            className={`text-base font-medium cursor-pointer ${
              scrolled
                ? "text-white hover:text-[#007CE8]"
                : "text-white hover:text-[#007CE8]"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => handleSmoothScroll("faq")}
            className={`text-base font-medium cursor-pointer ${
              scrolled
                ? "text-white hover:text-[#007CE8]"
                : "text-white hover:text-[#007CE8]"
            }`}
          >
            FAQ
          </button>
          {!isLoggedIn ? (
            <Link to="/auth/login">
              <Button className="px-4 md:px-8 py-3 md:py-4 bg-[#F4CB57] border-3 cursor-pointer border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                Log In
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <Button className="px-4 md:px-8 py-5 md:py-5 bg-[#F4CB57] cursor-pointer border-3 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                Dashboard
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed top-[80px] right-0 h-screen w-full md:w-64 bg-white backdrop-blur-md shadow-lg z-50 animate-in slide-in-from-right">
            <div className="flex flex-col p-6 gap-6 ">
              <button
                onClick={() => handleSmoothScroll("features")}
                className="text-base text-center text-black hover:text-[#007CE8] hover:bg-white font-medium py-3 border-b border-border cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => handleSmoothScroll("faq")}
                className="text-base text-center text-black hover:text-[#007CE8] hover:bg-white font-medium py-3 border-b border-border cursor-pointer"
              >
                FAQ
              </button>
              {!mobile ? (
                !isLoggedIn ? (
                  <Link
                    to="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full mt-4 py-4 bg-[#F4CB57] border-3 border-black text-black cursor-pointer hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                      Log In
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full mt-4 py-5 bg-[#F4CB57] cursor-pointer border-3 border-black text-black hover:bg-[#e7b21d] hover:text-black transition duration-300 ease-in-out text-base">
                      Dashboard
                    </Button>
                  </Link>
                )
              ) : (
                <Button className="w-full mt-4 py-4 bg-neutral-400 border-3 border-black text-black hover:text-black transition duration-300 ease-in-out text-base">
                  This feature is not available on mobile yet.
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNav;
