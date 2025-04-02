import { useState, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const calculateGems = (level) => {
  if (level >= 1 && level <= 10) return 50;
  if (level >= 11 && level <= 30) return 100;
  if (level >= 31 && level <= 50) return 200;
  if (level > 50) return 300 + (5 * (level - 50));
  return 0;
};

const LevelRewards = ({ currentLevel = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef(null);

  // Generate levels up to currentLevel + 10 to show upcoming rewards
  const levels = Array.from({ length: Math.max(60, currentLevel + 10) }, (_, i) => i + 1);

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -200, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gray-900/50 rounded-lg p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Level Up Rewards</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <div className="relative">
        <button
          onClick={scrollUp}
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10 bg-gray-800/90 rounded-full p-1 hover:bg-gray-700/90 transition-colors"
        >
          <ChevronUpIcon className="h-6 w-6 text-white" />
        </button>

        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-800/50 max-h-[400px] space-y-3 py-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {levels.map((level) => {
            const gems = calculateGems(level);
            const isCurrentLevel = level === currentLevel;
            const isLocked = level > currentLevel;

            return (
              <div
                key={level}
                className={`relative flex items-center space-x-4 p-4 rounded-lg transition-all duration-200
                  ${isCurrentLevel ? 'bg-primary/20 border-2 border-primary' : 'bg-gray-800/50'}
                  ${isLocked ? 'opacity-50' : 'opacity-100'}
                `}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{level}</span>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Level {level}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-400">{gems}</span>
                      <span className="text-amber-400">💎</span>
                    </div>
                  </div>

                  {isLocked && (
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-white/90">🔒</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={scrollDown}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10 bg-gray-800/90 rounded-full p-1 hover:bg-gray-700/90 transition-colors"
        >
          <ChevronDownIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default LevelRewards; 