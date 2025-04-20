import { useState } from "react";
import { Menu, X, Target, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/config/AuthContext";
import { useFetchStore } from "@/store/useUserData";
import { useQuery } from "@tanstack/react-query";
import { fetchRoadmap, fetchProfile } from "@/api/FETCH";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postPrompt2 } from "@/api/INSERT";
import Loading from "@/routes/Loading";

const Sidebar = ({
  isExpanded,
  onToggle,
  isLessonOpen = false,
  isLessonData,
}) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const userData = useFetchStore((state) => state.fetch);
  const [isLoading, setLoading] = useState(false);

  // Fetch user's roadmaps
  const { data: roadmapData, isLoading: loadingRoadmap } = useQuery(
    fetchRoadmap(session?.user?.id)
  );

  // Fetch user's profile data for badges and exp
  const { data: profileData, isLoading: loadingProfile } = useQuery(
    fetchProfile(session?.user?.id)
  );

  // Handle course selection
  const handleLessonSelect = (lesson) => {
    setLoading(true);
    postPrompt2(
      lesson.lesson_name,
      lesson.id,
      lesson.lesson_category,
      lesson.lesson_difficulty,
      lesson.gems,
      lesson.exp,
      lesson.lesson_duration,
      lesson.assessment,
      lesson.progress
    );
    onToggle();
  };

  if (isLoading) return <Loading generate_lesson={true} />;

  return (
    <>
      {!isExpanded && !isLessonOpen ? (
        <div className="fixed top-4 sm:top-6 left-4 sm:left-18 z-50">
          <button
            onClick={() => onToggle()}
            className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg border border-border hover:bg-secondary transition-colors bg-background dark:bg-dark-inner-bg dark:border-dark-mode-highlight dark:hover:bg-dark-mode-highlight"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-foreground dark:text-primary" />
            <span className="text-sm sm:text-base text-foreground dark:text-primary">
              Expand
            </span>
          </button>
        </div>
      ) : (
        <div
          className={`transition animate-panel-in fixed top-0 left-0 h-screen w-[280px] sm:w-[300px] md:w-[320px] lg:w-[25%] xl:w-[20%] border-r-3 border-black dark:border-dark-mode-highlight ${
            isLessonOpen ? "z-20" : "z-40"
          } overflow-y-auto flex flex-col bg-gray-50 dark:bg-dark-inner-bg`}
        >
          {/* Header with brand logo, name and close button */}
          <div className="p-4 flex items-center justify-between border-b border-gray-400 dark:border-dark-mode-highlight">
            <div className="flex items-center gap-2">
              <img
                src="/favicon.svg"
                alt="CapyCademy Logo"
                className="w-8 h-8"
              />
              <span className="transition animate-text-reveal text-lg font-bold text-black dark:text-primary">
                CapyCademy
              </span>
            </div>
            <button
              onClick={() => onToggle()}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors bg-background dark:bg-dark-inner-bg dark:border-dark-mode-highlight dark:hover:bg-dark-mode-highlight"
            >
              <X className="w-6 h-6 text-foreground dark:text-primary" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="transition animate-text-fade flex flex-col items-center mt-4 sm:mt-6 mb-4 sm:mb-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mb-2">
              <AvatarImage
                src={userData?.avatar_url || ""}
                alt={userData?.first_name || "User"}
              />
              <AvatarFallback className="text-lg sm:text-xl md:text-2xl dark:bg-dark-mode-highlight dark:text-primary">
                {userData?.first_name
                  ? userData.first_name.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-base sm:text-lg text-foreground dark:text-primary">
              {userData?.first_name} {userData?.last_name}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-primary/70">
              Level {userData?.level || 1}
            </p>

            {/* Experience Bar - Update to use current_exp */}
            <div className="w-4/5 mt-2">
              <div className="flex justify-between text-xs mb-1 text-muted-foreground dark:text-primary">
                <span>EXP</span>
                <span>{userData?.current_exp || 0}/100</span>
              </div>
              {/* Use current_exp directly, will always be 0-99 after level up is implemented */}
              <Progress
                value={userData?.current_exp || 0}
                max={100}
                className="h-1.5 sm:h-2 rounded-full"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border w-4/5 mx-auto my-4 dark:border-dark-mode-highlight"></div>

          {/* Continue Learning Section */}
          <div className="transition animate-text-fade px-3 sm:px-4 md:px-6 mb-4">
            <h2 className="font-bold text-lg mb-3 text-foreground dark:text-primary">
              Continue
            </h2>

            {loadingRoadmap ? (
              <p className="text-sm text-muted-foreground dark:text-primary/70">
                Loading courses...
              </p>
            ) : isLessonData
                ?.filter(
                  (lesson) =>
                    lesson.previous_lesson &&
                    new Date(lesson.previous_lesson) <= new Date()
                )
                .sort(
                  (a, b) =>
                    new Date(b.previous_lesson.date) -
                    new Date(a.previous_lesson.date)
                )
                .slice(0, 3).length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                {isLessonData
                  .filter(
                    (lesson) =>
                      lesson.previous_lesson &&
                      new Date(lesson.previous_lesson) <= new Date()
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.previous_lesson) - new Date(a.previous_lesson)
                  )
                  .slice(0, 3)
                  .map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-md hover:bg-secondary dark:hover:bg-dark-mode-highlight cursor-pointer transition-colors"
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="p-1.5 sm:p-2 bg-muted dark:bg-dark-mode-highlight rounded-full flex-shrink-0">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-chart-1" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className="font-medium truncate text-sm sm:text-base text-foreground dark:text-primary">
                          {lesson.lesson_name}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Progress
                            value={lesson.progress}
                            max={100}
                            className="h-1.5 flex-grow rounded-full"
                          />
                          <span className="text-xs text-muted-foreground dark:text-primary/70 flex-shrink-0">
                            {lesson.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground dark:text-primary/70 truncate">
                          {new Date(lesson.previous_lesson).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground dark:text-primary/70">
                No courses in progress
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border w-4/5 mx-auto my-4 dark:border-dark-mode-highlight"></div>

          {/* Badges Section */}
          <div className="transition animate-text-fade px-3 sm:px-4 md:px-6 mb-4">
            <h2 className="font-bold text-lg mb-3 text-foreground dark:text-primary">
              Badges
            </h2>

            {loadingProfile ? (
              <p className="text-sm text-muted-foreground dark:text-primary/70">
                Loading badges...
              </p>
            ) : profileData?.badges && profileData.badges.length > 0 ? (
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {profileData.badges.slice(0, 6).map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="p-1 sm:p-1.5 md:p-2 bg-muted dark:bg-dark-mode-highlight rounded-full mb-1">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500 dark:text-chart-4" />
                    </div>
                    <span className="text-[10px] sm:text-xs text-center truncate w-full text-muted-foreground dark:text-primary">
                      {badge?.name || `Badge ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground dark:text-primary/70">
                No badges earned yet
              </p>
            )}
          </div>

          {/* Spacer to push footer to bottom */}
          <div className="flex-grow"></div>

          {/* Footer */}
          <div className="transition animate-text-fade text-center py-4 text-xs text-muted-foreground dark:text-primary/70 border-t border-border dark:border-dark-mode-highlight">
            Team Aimma Panic 2025
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
