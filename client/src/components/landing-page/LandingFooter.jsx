import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="w-[90%] md:w-4/5 mx-auto py-8 md:py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4">
            {/* Brand Column - now spans more space */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/favicon.svg"
                  alt="CapyCademy Logo"
                  className="h-8 w-8 md:h-10 md:w-10 p-1"
                />
                <span className="text-xl font-bold text-background">
                  CapyCademy
                </span>
              </div>
              <p className="text-base mb-4 max-w-xs">
                The AI-powered learning platform that helps you master new
                skills through personalized, gamified learning experiences.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-background hover:text-background/80 transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-background hover:text-background/80 transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-background hover:text-background/80 transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-background hover:text-background/80 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Navigation Columns - now grouped together and moved right */}
            <div className="md:col-span-7 md:flex md:justify-end mt-8 md:mt-0">
              <div className="md:w-1/4 md:mr-8">
                <h3 className="font-bold text-foreground mb-3 md:mb-4 text-lg">
                  Platform
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/shop/1"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Affiliate Program
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:w-1/4 md:mr-8 mt-6 md:mt-0">
                <h3 className="font-bold text-foreground mb-3 md:mb-4 text-lg">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:w-1/4 mt-6 md:mt-0">
                <h3 className="font-bold text-foreground mb-3 md:mb-4 text-lg">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-foreground transition-colors"
                    >
                      Press Kit
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-dark-mode-highlight mt-8 md:mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base">
              © {currentYear} CapyCademy. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-base hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-base hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-base hover:text-foreground transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
