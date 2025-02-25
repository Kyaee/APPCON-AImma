import { useState } from 'react'; 

const IntroSlides = [
  {
    id: 'welcome',
    logo: '/public/brandicon.png', 
    title: 'Welcome to',
    subtitle: "Here's how our platform helps you grow professionally.",
    brandName: 'Capacademy!',
    button: "Let's Go!"
  },
  {
    id: 'learning-paths',
    title: 'Personalized Learning Paths',
    subtitle: 'AI tailors courses based on your assessment results, ensuring you learn exactly what you need.',
    image: '/public/brandicon.png' 
  }
  // Other slides remain unchanged
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
    <main 
      className="w-full h-screen flex items-center justify-center px-6 md:px-16 lg:px-32 xl:px-48"
      style={{
        backgroundImage: "url('/static-gradient.png')" ,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center p-8 md:p-12 relative">
        {currentSlideData.logo && (
          <div className="flex justify-center mb-6">
            <div className="rounded-full p-4 w-32 h-32 flex items-center justify-center shadow-md bg-gradient-to-b from-white/80 to-white/40">
              <img
                src={currentSlideData.logo}
                alt="Capybara mascot"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        )}
        
        {currentSlideData.image && (
          <div className="flex justify-center mb-6 w-full max-w-2xl">
            <img src={currentSlideData.image} alt={currentSlideData.title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        )}
        
        <div className="space-y-2">
          <h1 className="text-white text-5xl font-bold">{currentSlideData.title}</h1>
          {currentSlideData.brandName && (
            <h1 className="text-white text-5xl font-bold">{currentSlideData.brandName}</h1>
          )}
          <p className="text-gray-200 text-xl mt-2">{currentSlideData.subtitle}</p>
        </div>
        
        {currentSlideData.button && (
          <div className="flex flex-col items-center gap-4 mt-6 relative w-full">
            <button 
              className="bg-amber-600 text-white px-8 py-3 rounded text-lg shadow-lg hover:bg-amber-700 transition-colors"
              onClick={handleNext}
            >
              {currentSlideData.button}
            </button>
            {currentSlide !== IntroSlides.length - 1 && (
              <button
                onClick={handleSkip}
                className="absolute top-0 right-0 px-6 py-2 rounded text-lg bg-white/10 backdrop-blur-sm text-gray-200 shadow-lg hover:bg-white/20 transition-colors"
              >
                Skip
              </button>
            )}
          </div>
        )}

        <div className="flex justify-center items-center mt-8 w-full max-w-lg">
          <div className="flex space-x-2">
            {IntroSlides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide 
                    ? 'bg-blue-500' 
                    : index < currentSlide 
                      ? 'bg-gray-300' 
                      : 'bg-gray-300/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Showcase;
