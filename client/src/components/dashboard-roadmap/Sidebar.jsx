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
<<<<<<< HEAD
            className="flex gap-2 p-2 rounded-lg border border-black dark:border-dark-mode-highlight hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight transition-colors bg-white dark:bg-dark-inner-bg"
          >
            <Menu className="w-6 h-6 text-black dark:text-primary" /> 
            <span className="text-black dark:text-primary">Expand</span>
=======
            className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg border border-black hover:bg-[#CBB09B] transition-colors bg-white"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            <span className="text-sm sm:text-base">Expand</span>
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f
          </button>
        </div>
      ) : (
        <div
<<<<<<< HEAD
          className={`transition animate-panel-in fixed top-0 left-0 h-screen w-[20%] border-r-3 border-black dark:border-dark-mode-highlight ${
=======
          className={`transition animate-panel-in fixed top-0 left-0 h-screen w-[280px] sm:w-[300px] md:w-[320px] lg:w-[25%] xl:w-[20%] border-r-3 border-black ${
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f
            isLessonOpen ? "z-20" : "z-40"
          } overflow-y-auto flex flex-col bg-gray-50 dark:bg-dark-inner-bg`}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-gray-400 dark:border-dark-mode-highlight">
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <img src="/favicon.svg" alt="Capycademy Logo" className="w-8 h-8" />
              <span className="transition animate-text-reveal text-lg font-bold text-black dark:text-primary">
                Capycademy
=======
              <img
                src="/favicon.svg"
                alt="CapyCademy Logo"
                className="w-8 h-8"
              />
              <span className="transition animate-text-reveal text-lg font-bold">
                CapyCademy
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f
              </span>
            </div>
            <button
              onClick={() => onToggle()}
              className="p-2 rounded-lg border border-black dark:border-dark-mode-highlight hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight transition-colors bg-white dark:bg-dark-inner-bg"
            >
              <X className="w-6 h-6 text-black dark:text-primary" />
            </button>
          </div>

          {/* User Profile Section */}
<<<<<<< HEAD
          <div className="transition animate-text-fade flex flex-col items-center mt-6 mb-6">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={userData?.avatar_url || ""} alt={userData?.first_name || "User"} />
              <AvatarFallback className="text-2xl dark:bg-dark-mode-highlight dark:text-primary">
                {userData?.first_name ? userData.first_name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-lg text-black dark:text-primary">
              {userData?.first_name} {userData?.last_name}
            </p>
            <p className="text-sm text-gray-600 dark:text-primary/70">
=======
          <div className="transition animate-text-fade flex flex-col items-center mt-4 sm:mt-6 mb-4 sm:mb-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mb-2">
              <AvatarImage
                src={userData?.avatar_url || ""}
                alt={userData?.first_name || "User"}
              />
              <AvatarFallback className="text-lg sm:text-xl md:text-2xl">
                {userData?.first_name
                  ? userData.first_name.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-base sm:text-lg">
              {userData?.first_name} {userData?.last_name}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f
              Level {userData?.level || 1}
            </p>

            <div className="w-4/5 mt-2">
              <div className="flex justify-between text-xs mb-1 text-black dark:text-primary">
                <span>EXP</span>
                <span>{userData?.current_exp || 0}/100</span>
              </div>
<<<<<<< HEAD
              <Progress value={userData?.current_exp || 0} max={100} className="h-2 rounded-full" />
=======
              {/* Use current_exp directly, will always be 0-99 after level up is implemented */}
              <Progress
                value={userData?.current_exp || 0}
                max={100}
                className="h-1.5 sm:h-2 rounded-full"
              />
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-500 dark:border-dark-mode-highlight w-4/5 mx-auto my-4"></div>

          {/* Continue Learning Section */}
<<<<<<< HEAD
          <div className="transition animate-text-fade px-6 mb-4">
            <h2 className="font-bold text-lg mb-3 text-black dark:text-primary">Continue</h2>
=======
          <div className="transition animate-text-fade px-3 sm:px-4 md:px-6 mb-4">
            <h2 className="font-bold text-lg mb-3">Continue</h2>
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f

            {loadingRoadmap ? (
              <p className="text-sm text-gray-500 dark:text-primary/70">Loading courses...</p>
            ) : isLessonData?.filter(
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
<<<<<<< HEAD
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-mode-highlight cursor-pointer transition-colors"
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="p-2 bg-gray-200 dark:bg-dark-mode-highlight rounded-full">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium truncate max-w-[200px] text-black dark:text-primary">
                          {lesson.lesson_name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Progress value={lesson.progress} max={100} className="h-1.5 w-50 rounded-full" />
                          <span className="text-xs text-gray-600 dark:text-primary/70">
                            {lesson.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-primary/70">
                          {new Date(lesson.previous_lesson).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "numeric",
                            month: "long",
                          })}
=======
                      className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="p-1.5 sm:p-2 bg-gray-200 rounded-full flex-shrink-0">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className="font-medium truncate text-sm sm:text-base">
                          {lesson.lesson_name}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Progress
                            value={lesson.progress}
                            max={100}
                            className="h-1.5 flex-grow rounded-full"
                          />
                          <span className="text-xs text-gray-600 flex-shrink-0">
                            {lesson.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {new Date(lesson.previous_lesson).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                            }
                          )}
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-primary/70">No courses in progress</p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-500 dark:border-dark-mode-highlight w-4/5 mx-auto my-4"></div>

          {/* Badges Section */}
<<<<<<< HEAD
          <div className="transition animate-text-fade px-6 mb-4">
            <h2 className="font-bold text-lg mb-3 text-black dark:text-primary">Badges</h2>
=======
          <div className="transition animate-text-fade px-3 sm:px-4 md:px-6 mb-4">
            <h2 className="font-bold text-lg mb-3">Badges</h2>
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f

            {loadingProfile ? (
              <p className="text-sm text-gray-500 dark:text-primary/70">Loading badges...</p>
            ) : profileData?.badges && profileData.badges.length > 0 ? (
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {profileData.badges.slice(0, 6).map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
<<<<<<< HEAD
                    <div className="p-2 bg-gray-200 dark:bg-dark-mode-highlight rounded-full mb-1">
                      <Award className="w-6 h-6 text-yellow-500" />
                    </div>
                    <span className="text-xs text-center text-black dark:text-primary">
=======
                    <div className="p-1 sm:p-1.5 md:p-2 bg-gray-200 rounded-full mb-1">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500" />
                    </div>
                    <span className="text-[10px] sm:text-xs text-center truncate w-full">
>>>>>>> 32c00acf442cf030fb24e4000fb5beab318ddd0f
                      {badge?.name || `Badge ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-primary/70">No badges earned yet</p>
            )}
          </div>

          {/* Footer */}
          <div className="transition animate-text-fade text-center py-4 text-xs text-gray-500 dark:text-primary/70 border-t border-gray-200 dark:border-dark-mode-highlight">
            Team Aimma Panic 2025
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
