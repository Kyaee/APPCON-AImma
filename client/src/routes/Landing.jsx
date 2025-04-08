import LandingNav from "@/components/landing-page/LandingNav";
import HeroSection from "@/components/landing-page/HeroSection";
import FeatureSlider from "@/components/landing-page/FeatureSlider";
import FAQSection from "@/components/landing-page/FAQSection";
import CTASection from "@/components/landing-page/CTASection";
import LandingFooter from "@/components/landing-page/LandingFooter";

// Import the SVG background files
import landingBg from "@/assets/landing/landing-bg.svg";
import landingBgCapy from "@/assets/landing/landing-bg-capy.svg";

export default function Landing() {
  return (
    <div className="bg-background relative">
      {/* Full-height background SVG */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src={landingBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content positioned above the background */}
      <div className="relative z-20">
        <LandingNav />
        <HeroSection />
        <FeatureSlider />

        {/* Position capy background starting from FAQ section */}
        <div className="relative">
          {/* Capy background positioned to cover only FAQ to footer */}
          <div className="absolute inset-0 bottom-0 left-0 right-0 z-0 pointer-events-none">
            <img
              src={landingBgCapy}
              alt=""
              className="w-full object-contain"
              style={{ maxHeight: "60vh" }}
            />
          </div>
          <div className="relative z-10">
            <FAQSection />
            <CTASection />
            <LandingFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
