import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="w-4/5 mx-auto py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/favicon.svg"
                  alt="Capacademy Logo"
                  className="h-10 w-10 rounded-full bg-dark-inner-bg p-1"
                />
                <span className="text-xl font-bold text-foreground">
                  CapyCademy
                </span>
              </div>
              <p className="text-sm mb-4">
                The AI-powered learning platform that helps you master new
                skills through personalized, gamified learning experiences.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-foreground hover:text-foreground transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-foreground hover:text-foreground transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-foreground hover:text-foreground transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="ml-50">
              <h3 className="font-bold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link
                    to="/shop/1"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-foreground transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>

            <div className="ml-50">
              <h3 className="font-bold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-mode-highlight mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} CapyCademy. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:text-foreground transition-colors"
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
