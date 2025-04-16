import { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
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

const LevelRewards = () => {
  const { id } = useParams();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load user's current level on component mount
  useEffect(() => {
    const loadUserData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("level")
          .eq("user_id", id)
          .single();
        
        if (!error && data) {
          setCurrentLevel(data.level || 1);
        }
      } catch (err) {
        console.error("Error loading user level:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [id]);

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

  // Handle level update and claim rewards
  const handleClaimRewards = async (level) => {
    if (!id) {
      setMessage("User ID is required");
      return;
    }
    
    setLoading(true);
    try {
      const result = await updateGems(id, level);
      
      if (result.success) {
        setMessage(`Level ${level} rewards claimed! You received ${result.gemsAwarded} gems.`);
        setCurrentLevel(level);
      } else {
        setMessage("Failed to claim rewards. Please try again.");
      }
    } catch (error) {
      console.error("Error claiming rewards:", error);
      setMessage("An error occurred while claiming rewards.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !levels.length) {
    return <div className="text-white text-center py-8">Loading rewards...</div>;
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setIsDrawerOpen(true)}
      >
        View Level Rewards
      </Button>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[60vh]">
          <div className="mx-auto w-full max-w-6xl">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-bold">Level Up Rewards</DrawerTitle>
              <DrawerDescription>
                Track your progress and see upcoming rewards
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4">
              {/* Current Level Indicator */}
              <div className="mb-8 text-center">
                <div className="inline-block bg-primary/20 rounded-full px-6 py-2">
                  <span className="text-primary font-semibold">Current Level: {currentLevel}</span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="relative mb-10">
                <div className="absolute h-4 bg-light-brown rounded-full w-full"></div>
                <div 
                  className="absolute h-4 bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(currentLevel / 60) * 100}%` }}
                ></div>
              </div>

              {/* Rewards Grid */}
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

                      return (
                        <div
                          key={level}
                          className={`flex flex-col items-center w-32 p-4 rounded-lg transition-all duration-200
                            ${isCurrentLevel ? 'bg-primary/20 border-2 border-primary' : 'bg-gray-800/50 hover:bg-gray-700/50'}
                          `}
                        >
                          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-3">
                            <span className="text-2xl font-bold text-white">{level}</span>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <span className="text-xl font-bold text-amber-400">{gems}</span>
                              <span className="text-2xl">💎</span>
                            </div>
                            
                            {level <= currentLevel ? (
                              <span className="text-green-400 text-sm">Unlocked!</span>
                            ) : (
                              <span className="text-gray-400 text-sm">Coming soon</span>
                            )}
                          </div>
                        </div>
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

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LevelRewards;