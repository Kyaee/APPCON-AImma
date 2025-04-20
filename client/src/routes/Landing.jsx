import LandingNav from "@/components/landing-page/LandingNav";
import HeroSection from "@/components/landing-page/HeroSection";
import FeatureSlider from "@/components/landing-page/FeatureSlider";
import FAQSection from "@/components/landing-page/FAQSection";
import CTASection from "@/components/landing-page/CTASection";
import LandingFooter from "@/components/landing-page/LandingFooter";
import { useEffect } from "react";
import Loading from "./Loading";
import { useAuth } from "@/config/AuthContext";

// Import the SVG background files
import landingBg from "@/assets/landing/landing-bg.svg";
import landingBgCapy from "@/assets/landing/landing-bg-capy.svg";

export default function Landing() {
  const { session } = useAuth();
  const isLoggedIn = session !== null;
  useEffect(() => {
    setTimeout(() => {
      return <Loading />;
    }, 1000);
  }, []);

  return (
    <div className="bg-background relative smooth-scroll scroll-smooth overflow-x-hidden">
      {/* Full-height background SVG - responsive */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={landingBg}
          alt=""
          className="w-full h-full object-cover opacity-90 sm:opacity-100"
        />
      </div>

      {/* Background capybara image - enhanced mobile responsiveness */}
      <div className="absolute bottom-0 right-0 z-10 pointer-events-none select-none">
        <img
          src={landingBgCapy}
          alt=""
          className="w-[600px] xs:w-[700px] sm:w-[1000px] md:w-[1200px] lg:w-[1500px] h-auto object-contain opacity-50 xs:opacity-60 sm:opacity-80 md:opacity-100"
          style={{
            transform: "translateY(-5%) translateX(20%)",
            maxHeight: "160vh",
            maxWidth: "150vw", // Prevent image from being too large on small screens
            userSelect: "none",
            pointerEvents: "none"
          }}
          draggable="false"
        />
      </div>

      {/* Content positioned above the background */}
      <div className="relative z-20">
        <LandingNav isLoggedIn={isLoggedIn} />
        <HeroSection />
        <FeatureSlider />

        {/* Improved structure with better z-index control */}
        <div className="relative">
          {/* Content sections with higher z-index */}
          <div className="relative z-30">
            {/* Ensure FAQ has its own z-index layer */}
            <div className="relative z-15">
              <FAQSection />
            </div>

            {/* CTA Section - removed conditional rendering */}
            <div className="relative z-10">
              <CTASection />
            </div>
            <LandingFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
