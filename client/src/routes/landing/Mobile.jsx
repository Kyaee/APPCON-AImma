import LandingNav from "@/components/landing-page/LandingNav";
import HeroSection from "@/components/landing-page/HeroSection";
import FeatureSlider from "@/components/landing-page/FeatureSlider";
import FAQSection from "@/components/landing-page/FAQSection";
import CTASection from "@/components/landing-page/CTASection";
import LandingFooter from "@/components/landing-page/LandingFooter";
import { useEffect } from "react";
import Loading from "../Loading";
import { useAuth } from "@/config/AuthContext";
import { VideoBackground } from "@/components/layout/Background";

// Import the SVG background files
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
      {/* Video Background - Fixed position with dark theme forced */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <div className="absolute inset-0">
          <VideoBackground forceDarkTheme={true} />
        </div>
      </div>

      {/* Background capybara image - enhanced mobile responsiveness */}
      <div className="absolute bottom-0 right-0 z-10 pointer-events-none select-none">
        <img
          src={landingBgCapy}
          alt=""
          className="w-[700px] xs:w-[900px] sm:w-[1000px] md:w-[1000px] lg:w-[1500px] h-auto object-contain opacity-50 xs:opacity-60 sm:opacity-80 md:opacity-100 
          translate-y-[-90%] translate-x-[25%] 
          xs:translate-y-[-10%] xs:translate-x-[15%]
          sm:translate-y-[-40%] sm:translate-x-[30%]
          md:translate-y-[-5%] md:translate-x-[20%]
          lg:translate-y-[-19%] lg:translate-x-[7%]"
          style={{
            maxHeight: "160vh",
            maxWidth: "150vw", // Prevent image from being too large on small screens
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable="false"
        />
      </div>

      {/* Content positioned above the background with increased top margin */}
      <div className="relative z-20 mt-8">
        <LandingNav isLoggedIn={isLoggedIn} mobile={true}/>
        <div className="mt-16 md:mt-20">
          <HeroSection mobile={true}/>
        </div>
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
              <CTASection mobile={true}/>
            </div>
            <LandingFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
