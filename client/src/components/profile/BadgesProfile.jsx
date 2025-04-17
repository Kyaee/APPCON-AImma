import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Badges from "./Badges";
import { useState } from "react";
import NewUSER from "@/assets/profile/New-User.svg";
import CourseStart from "@/assets/profile/COURSE-START.svg";
import FirstCourseF from "@/assets/profile/1-COURSE-FINISHED.svg";
import FastLearner from "@/assets/profile/FAST-LEARN.svg";
import Premium from "@/assets/profile/PREMIUM.svg";
import SevenD from "@/assets/profile/7-Days.svg";
import TwentyD from "@/assets/profile/20-Days.svg";
import ThirtyD from "@/assets/profile/30-Days.svg";
import LevelTwenty from "@/assets/profile/LVL-20.svg";
import LevelThirty from "@/assets/profile/LVL-30.svg";
import LevelFifty from "@/assets/profile/LVL-50.svg";

export default function BadgesProfile({ badgesData }) {
  // Sample badges data - you can replace with actual data from props or API
  const [allBadges] = useState(
    badgesData || [
      {
        id: 1,
        name: "Welcome badge",
        description: "First badge you get when you sign up",
        statBonus: ["Motivation +5", "Confidence +2"],
        image: NewUSER,
        earned: true,
      },
      {
        id: 2,
        name: "Course Started",
        description: "Complete 5 lessons in a day",
        statBonus: ["Focus +10", "Knowledge +5"],
        image: CourseStart,
        earned: false,
      },
      {
        id: 3,
        name: "7 DAYS STREAK",
        description: "Login for 7 consecutive days",
        statBonus: ["Discipline +15", "Consistency +10"],
        image: SevenD,
        earned: false,
      },
      {
        id: 4,
        name: "20 DAYS STREAK",
        description: "Solve 10 difficult challenges",
        statBonus: ["Logic +12", "Creativity +8"],
        image: TwentyD,
        earned: false,
      },
      {
        id: 5,
        name: "30 DAYS STREAK",
        description: "Participate in 3 community activities",
        statBonus: ["Communication +10", "Collaboration +12"],
        image: ThirtyD,
        earned: false,
      },
      {
        id: 6,
        name: "Level 20",
        description: "Complete the advanced course",
        statBonus: ["Expertise +20", "Recognition +15"],
        image: LevelTwenty,
        earned: false,
      },
      {
        id: 7,
        name: "Level 30",
        description: "Complete the advanced course",
        statBonus: ["Expertise +20", "Recognition +15"],
        image: LevelThirty,
        earned: false,
      },
      {
        id: 8,
        name: "Level 50+",
        description: "Complete the advanced course",
        statBonus: ["Expertise +20", "Recognition +15"],
        image: LevelFifty,
        earned: false,
      },
      {
        id: 9,
        name: "Premium",
        description: "Complete the advanced course",
        statBonus: ["Expertise +20", "Recognition +15"],
        image: Premium,
        earned: false,
      },
      {
        id: 10,
        name: "Fast Learner",
        description: "Complete the advanced course",
        statBonus: ["Expertise +20", "Recognition +15"],
        image: FastLearner,
        earned: false,
      },
      {
        id: 11,
        name: "1 Course Finished",
        description: "Complete the advanced course",
        statBonus: ["Expertise +20", "Recognition +15"],
        image: FirstCourseF,
        earned: false,
      },
    ]
  );

  const earnedBadges = allBadges.filter((badge) => badge.earned);
  const unearnedBadges = allBadges.filter((badge) => !badge.earned);

  return (
    <section className="overflow-hidden mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-5 text-black dark:text-primary tracking-tight">
          Badges {earnedBadges.length > 0 ? `(${earnedBadges.length})` : ""}
        </h2>

        <AlertDialog>
          <AlertDialogTrigger>
            <div className="px-3 py-1 bg-white dark:bg-dark-mode-bg text-black dark:text-primary cursor-pointer rounded-md text-sm hover:bg-blue-400 dark:hover:bg-dark-mode-highlight border border-black dark:border-dark-mode-highlight">
              More
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>All Your Badges</AlertDialogTitle>
              <AlertDialogDescription>
                {/* Display earned badges */}
                <h3 className="font-medium text-lg mt-4 mb-2">
                  Earned Badges ({earnedBadges.length})
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {earnedBadges.map((badge) => (
                    <div key={badge.id} className="text-center">
                      <img
                        src={badge.image}
                        className="w-16 h-16 mx-auto rounded-full border border-green-500"
                        alt={badge.name}
                      />
                      <p className="mt-1 font-medium text-sm">{badge.name}</p>
                    </div>
                  ))}
                </div>

                {/* Display unearned badges */}
                <h3 className="font-medium text-lg mt-6 mb-2">
                  Badges to Earn ({unearnedBadges.length})
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {unearnedBadges.map((badge) => (
                    <div key={badge.id} className="text-center opacity-60">
                      <img
                        src={badge.image}
                        className="w-16 h-16 mx-auto rounded-full border border-gray-400 filter grayscale"
                        alt={badge.name}
                      />
                      <p className="mt-1 font-medium text-sm">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="bg-background dark:bg-dark-mode-bg p-4 py-5 rounded-lg border-2 border-foreground overflow-hidden">
        <div className="flex items-center gap-3 py-3 pb-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-3 pl-3 whitespace-nowrap">
          {/* Display earned badges first */}
          {earnedBadges.map((badge) => (
            <div key={badge.id} className="group transition flex-shrink-0">
              <img
                src={badge.image}
                className="rounded-full cursor-pointer border-2 border-green-500 group-hover:scale-110 transition-transform duration-300 h-30 w-30"
                alt={badge.name}
              />
              <Badges
                badges={badge}
                statBonus={badge.statBonus}
                earned={badge.earned}
              />
            </div>
          ))}

          {/* Then display unearned badges with distinct styling */}
          {unearnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="group transition opacity-100 flex-shrink-0"
            >
              <img
                src={badge.image}
                className="rounded-full cursor-pointer border-2 border-gray-400 filter grayscale group-hover:scale-110 transition-transform duration-300 h-30 w-30"
                alt={badge.name}
              />
              <Badges
                badges={badge}
                statBonus={badge.statBonus}
                earned={badge.earned}
              />
            </div>
          ))}
        </div>

        <p className="pl-3 text-sm text-black dark:text-primary mt-1">
          Complete more lessons to gain badges! ({earnedBadges.length}/
          {allBadges.length} earned)
        </p>
      </div>
    </section>
  );
}
