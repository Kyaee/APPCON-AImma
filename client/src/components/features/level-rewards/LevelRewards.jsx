import { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Generate levels up to currentLevel + 10 to show upcoming rewards
  const levels = Array.from({ length: Math.max(60, currentLevel + 10) }, (_, i) => i + 1);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gray-900/50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Level Up Rewards</h2>
        <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/90 rounded-full p-2 hover:bg-gray-700/90 transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-800/50 py-4 px-12"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex space-x-4 min-w-max">
            {levels.map((level) => {
              const gems = calculateGems(level);
              const isCurrentLevel = level === currentLevel;
              const isLocked = level > currentLevel;

              return (
                <Drawer key={level}>
                  <DrawerTrigger asChild>
                    <button
                      onClick={() => setSelectedLevel(level)}
                      className={`flex flex-col items-center w-24 p-4 rounded-lg transition-all duration-200
                        ${isCurrentLevel ? 'bg-primary/20 border-2 border-primary' : 'bg-gray-800/50'}
                        ${isLocked ? 'opacity-50' : 'opacity-100 hover:bg-gray-700/50'}
                      `}
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                        <span className="text-lg font-bold text-white">{level}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-amber-400">{gems}</span>
                        <span className="text-amber-400">💎</span>
                      </div>
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                          <span className="text-white/90">🔒</span>
                        </div>
                      )}
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-lg">
                      <DrawerHeader>
                        <DrawerTitle>Level {level} Rewards</DrawerTitle>
                        <DrawerDescription>
                          {isLocked 
                            ? "Keep learning to unlock these rewards!" 
                            : "Congratulations on reaching this level!"}
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{level}</span>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400 flex items-center justify-center space-x-2">
                              <span>{gems}</span>
                              <span>💎</span>
                            </div>
                            <p className="text-gray-400 mt-2">Gems Reward</p>
                          </div>
                          {isLocked ? (
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                              <p className="text-gray-400">Complete more lessons to reach this level</p>
                            </div>
                          ) : (
                            <div className="bg-primary/20 p-4 rounded-lg text-center">
                              <p className="text-primary">Rewards Unlocked!</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              );
            })}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/90 rounded-full p-2 hover:bg-gray-700/90 transition-colors"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default LevelRewards; 