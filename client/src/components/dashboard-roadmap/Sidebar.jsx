import { useState } from "react";
import { Menu, X, Target, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/config/authContext";
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
        <div className="fixed top-6 left-18 z-50">
          <button
            onClick={() => onToggle()}
            className="flex gap-2 p-2 rounded-lg border border-black  hover:bg-[#CBB09B] transition-colors bg-white"
          >
            <Menu className="w-6 h-6 text-black" /> Expand
          </button>
        </div>
      ) : (
        <div
          className={`transition animate-panel-in fixed top-0 left-0 h-screen w-[20%] border-r-3 border-black ${
            isLessonOpen ? "z-20" : "z-40"
          } overflow-y-auto flex flex-col bg-gray-50`}
        >
          {/* Header with brand logo, name and close button */}
          <div className="p-4 flex items-center justify-between border-b border-gray-400">
            <div className="flex items-center gap-2">
              <img
                src="/favicon.svg"
                alt="Capycademy Logo"
                className="w-8 h-8"
              />
              <span className="transition animate-text-reveal text-lg font-bold">
                Capycademy
              </span>
            </div>
            <button
              onClick={() => onToggle()}
              className="p-2 rounded-lg border border-black hover:bg-[#CBB09B] transition-colors bg-white"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="transition animate-text-fade flex flex-col items-center mt-6 mb-6">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage
                src={userData?.avatar_url || ""}
                alt={userData?.first_name || "User"}
              />
              <AvatarFallback className="text-2xl">
                {userData?.first_name
                  ? userData.first_name.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-lg">
              {userData?.first_name} {userData?.last_name}
            </p>
            <p className="text-sm text-gray-600">
              Level {userData?.level || 1}
            </p>

            {/* Experience Bar - Update to use current_exp */}
            <div className="w-4/5 mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>EXP</span>
                <span>{userData?.current_exp || 0}/100</span>
              </div>
              {/* Use current_exp directly, will always be 0-99 after level up is implemented */}
              <Progress
                value={userData?.current_exp || 0}
                max={100}
                className="h-2 rounded-full"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-500 w-4/5 mx-auto my-4"></div>

          {/* Continue Learning Section */}
          <div className="transition animate-text-fade px-6 mb-4">
            <h2 className="font-bold text-lg mb-3">Continue</h2>

            {loadingRoadmap ? (
              <p className="text-sm text-gray-500">Loading courses...</p>
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
              <div className="space-y-3">
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
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="p-2 bg-gray-200 rounded-full">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium truncate max-w-[200px">
                          {lesson.lesson_name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={lesson.progress}
                            max={100}
                            className="h-1.5 w-50 rounded-full"
                          />
                          <span className="text-xs text-gray-600">
                            {lesson.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(lesson.previous_lesson).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "long",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No courses in progress</p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-500 w-4/5 mx-auto my-4"></div>

          {/* Badges Section */}
          <div className="transition animate-text-fade px-6 mb-4">
            <h2 className="font-bold text-lg mb-3">Badges</h2>

            {loadingProfile ? (
              <p className="text-sm text-gray-500">Loading badges...</p>
            ) : profileData?.badges && profileData.badges.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {profileData.badges.slice(0, 6).map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="p-2 bg-gray-200 rounded-full mb-1">
                      <Award className="w-6 h-6 text-yellow-500" />
                    </div>
                    <span className="text-xs text-center">
                      {badge?.name || `Badge ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No badges earned yet</p>
            )}
          </div>

          {/* Spacer to push footer to bottom */}
          <div className="flex-grow"></div>

          {/* Footer */}
          <div className="transition animate-text-fade text-center py-4 text-xs text-gray-500 border-t border-gray-200">
            Team Aimma Panic 2025
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
