import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoBackground from "@/components/features/video-background"

const IntroSlides = [
  {
    id: 'welcome',
    logo: true,
    title: 'Welcome to',
    subtitle: "Here's how our platform helps you grow professionally.",
    brandName: 'Capacademy!',
    button: "Let's Go!"
  },
  {
    id: 'learning-paths',
    title: 'Personalized Learning Paths',
    subtitle: 'AI tailors courses based on your assessment results, ensuring you learn exactly what you need.',
    image: '/learning.png',
    button: "Next"
  },
  {
    id: 'quizzes',
    title: 'Interactive Quizzes',
    subtitle: 'Test your knowledge and track your progress with interactive quizzes.',
    image: '/quiz.png',
    button: "Next"
  },
  {
    id: 'gamified',
    title: 'Gamified Experience',
    subtitle: 'Earn badges, level up, and compete on leaderboards to stay motivated.',
    image: '/game.png',
    button: "Next"
  },
  {
    id: 'opportunities',
    title: 'Opportunities Hub',
    subtitle: 'Access exclusive job offers, internships, and networking opportunities.',
    image: '/opportunity.png',
    button: "Next"
  },
  {
    id: 'analytics',
    title: 'Real-Time Analytics',
    subtitle: 'Monitor your skill development with detailed analytics and insights.',
    image: '/analytics.png',
    button: "Next"
  },
  {
    id: 'assessment',
    title: 'Before we begin',
    subtitle: 'Let us start by assessing you to know about you more.',
    button: 'Begin Assessment',
    isLast: true
  }
];

const Showcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < IntroSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    setCurrentSlide(IntroSlides.length - 1);
  };

  const currentSlideData = IntroSlides[currentSlide];

  return (
    <div className="w-full h-screen flex items-center justify-center px-6 md:px-16 lg:px-32 xl:px-48 relative">
      <VideoBackground />
      <div className="max-w-6xl w-full flex flex-col items-center p-8 md:p-12 relative">
        {/* Skip button - aligned with image width */}
        {currentSlide > 0 && currentSlide < 6 && (
          <div className="w-full max-w-4xl flex justify-end mb-4">
            <button
              onClick={handleSkip}
              className="px-10 py-2 rounded-lg text-sm 
              bg-white/10 backdrop-blur-sm text-gray-200 hover:bg-white/20 
              transition-colors"
            >
              Skip
            </button>
          </div>
        )}

        {/* Logo - Larger size for first and last slide */}
        {(currentSlideData.logo || currentSlideData.isLast) && (
          <div className="w-full flex justify-center mb-8">
            <div className="flex items-center justify-center">
              <img
                src="/src/assets/intro-showcase/brandicon.png"
                alt="Brand icon"
                className="w-48 h-48 object-contain rounded-full" // Increased size
              />
            </div>
          </div>
        )}
        
        {/* Slide image - Larger size */}
        {currentSlideData.image && (
          <div className="w-full flex justify-center mb-8">
            <img 
              src={currentSlideData.image} 
              alt={currentSlideData.title} 
              className="w-full max-w-4xl h-auto rounded-lg shadow-lg" // Increased max-width
            />
          </div>
        )}
        
        {/* Content - Aligned with image width */}
        <div className={`w-full max-w-4xl space-y-2 ${(currentSlideData.logo || currentSlideData.isLast) ? 'items-center text-center' : ''}`}>
          <div className={`w-full ${(currentSlideData.logo || currentSlideData.isLast) ? 'flex flex-col items-center' : ''}`}>
            <h1 className={`text-white text-5xl font-bold ${(currentSlideData.logo || currentSlideData.isLast) ? 'text-center' : ''}`}>
              {currentSlideData.title}
            </h1>
            {currentSlideData.brandName && (
              <h1 className="text-white text-5xl font-bold mt-2">
                {currentSlideData.brandName}
              </h1>
            )}
            <p className={`text-gray-200 text-xl mt-4 ${(currentSlideData.logo || currentSlideData.isLast) ? 'text-center' : ''}`}>
              {currentSlideData.subtitle}
            </p>
          </div>
        </div>
        
        {/* Footer with navigation and progress indicators - Aligned with image */}
        <div className="w-full max-w-4xl mt-8">
          {!currentSlideData.isLast ? (
            <div className="flex items-center justify-between">
              {/* Progress indicators - Only show for middle slides */}
              {!currentSlideData.logo && (
                <div className="flex space-x-2">
                  {IntroSlides.slice(1, 6).map((_, index) => (
                    <div
                      key={index}
                      className={`w-5 h-5 rounded-full border-black border-2 transition-colors duration-200 ${
                        index + 1 === currentSlide 
                          ? 'bg-amber-500' 
                          : index + 1 < currentSlide 
                            ? 'bg-gray-300' 
                            : 'bg-gray-300/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation button for non-last slides. */}
              <div className={`${currentSlideData.logo ? 'w-full flex justify-center' : ''}`}>
                <button 
                  onClick={handleNext}
                  className="bg-[#BF9566] border-black border-2 text-white px-8 py-2 rounded-lg text-lg 
                  shadow-lg hover:bg-[#BF8648] transition-colors inline-flex items-center gap-2"
                >
                  {currentSlideData.button}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            // Only last slide gets Link component
            <div className="w-full flex justify-center">
              <Link 
                to="/intro/assessment"
                className="bg-[#BF9566] border-black border-2 text-white px-8 py-3 rounded-lg text-lg 
                shadow-lg hover:bg-[#BF8648] transition-colors inline-flex items-center gap-2"
              >
                {currentSlideData.button}
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Showcase;