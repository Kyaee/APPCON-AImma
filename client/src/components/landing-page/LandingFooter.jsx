import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="w-[90%] md:w-4/5 mx-auto py-8 md:py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4">
            {/* Brand Column - now spans more space */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-0">
                <img
                  src="/favicon.svg"
                  alt="CapyCademy Logo"
                  className="h-8 w-8 md:h-10 md:w-10 p-1"
                />
                <img
                  src="/CapyCademy.svg"
                  alt="CapyCademy"
                  className="h-9 translate-x-[-17px]"
                />
              </div>
              <p className="text-base mb-4 w-full">
                Your intelligent learning companion that adapts to your needs,
                creating personalized paths to master skills efficiently through
                engaging, game-inspired experiences.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-white hover:text-[#007CE8] transition-colors cursor-pointer"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#007CE8] transition-colors cursor-pointer"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#007CE8] transition-colors cursor-pointer"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#007CE8] transition-colors cursor-pointer"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Navigation Columns - now grouped together and moved right */}
            <div className="md:col-span-7 md:flex md:justify-end mt-4 md:mt-0">
              <div className="md:w-1/4 md:mr-8">
                <h3 className="font-bold text-white mb-2 md:mb-4 text-lg">
                  Platform
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/shop/1"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Affiliate Program
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:w-1/4 md:mr-8 mt-4 md:mt-0">
                <h3 className="font-bold text-white mb-2 md:mb-4 text-lg">
                  Resources
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:w-1/4 mt-4 md:mt-0">
                <h3 className="font-bold text-white mb-2 md:mb-4 text-lg">
                  Company
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
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
              © {currentYear}{" "}
              <img
                src="/CapyCademy.svg"
                alt="CapyCademy"
                className="h-4 inline-block filter brightness-0 invert"
              />
              . All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-base hover:text-[#007CE8] transition-colors cursor-pointer"
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
