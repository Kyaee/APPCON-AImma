import LandingNav from "@/components/landing-page/LandingNav";
import HeroSection from "@/components/landing-page/HeroSection";
import FeatureSlider from "@/components/landing-page/FeatureSlider";
import FAQSection from "@/components/landing-page/FAQSection";
import CTASection from "@/components/landing-page/CTASection";
import LandingFooter from "@/components/landing-page/LandingFooter";
import { useEffect } from "react";
import Loading from "./loading";

// Import the SVG background files
import landingBg from "@/assets/landing/landing-bg.svg";
import landingBgCapy from "@/assets/landing/landing-bg-capy.svg";

export default function Landing() {
  useEffect(() => {
    setTimeout(() => {
      return <Loading />;
    }, 1000);
  }, []);

  return (
    <div className="bg-background relative">
      {/* Full-height background SVG */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src={landingBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Background capybara image - moved earlier in the structure with lower z-index */}
      <div className="absolute bottom-0 right-0 z-10 pointer-events-none select-none">
        <img
          src={landingBgCapy}
          alt=""
          className="w-[1500px] h-auto object-contain"
          style={{
            transform: "translateY(-15%) translateX(0%)",
            maxHeight: "190vh",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable="false"
        />
      </div>

      {/* Content positioned above the background */}
      <div className="relative z-20">
        <LandingNav />
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

            {/* CTA Section */}
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
