import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Import SVG assets
import capySvg from "@/assets/dashboard/capy.svg";
import stageSvg from "@/assets/dashboard/stage.svg";
import lockedStageSvg from "@/assets/dashboard/locked-stage.svg";
import currentPlaySvg from "@/assets/dashboard/current-play.svg";
import iconFirstSvg from "@/assets/dashboard/icon-first.svg";
import iconSecondSvg from "@/assets/dashboard/icon-second.svg";
import iconThirdSvg from "@/assets/dashboard/icon-third.svg";
import lastTrophySvg from "@/assets/dashboard/last-trophy.svg";
import fruitOneSvg from "@/assets/dashboard/fruit-1.svg";
import fruitTwoSvg from "@/assets/dashboard/fruit-2.svg";
import fruitThreeSvg from "@/assets/dashboard/fruit-3.svg";

// Generate a pseudo-random number based on a seed
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const RoadmapContent = ({
  lessons = [],
  currentCourse,
  onCourseChange,
  isSidebarExpanded,
}) => {
  const navigate = useNavigate();

  // Extend the lessons array if needed to reach 30 stages
  const extendedLessons = useMemo(() => {
    // If we already have 30 lessons, just return them
    if (lessons.length >= 30) return lessons;

    // Otherwise, extend the array up to 30 items
    const extended = [...lessons];
    const baseNames = [
      "Advanced Components",
      "State Management",
      "Routing",
      "API Integration",
      "Authentication",
      "Testing",
      "Performance Optimization",
      "Deployment",
      "CI/CD",
      "Monitoring",
      "Accessibility",
      "Internationalization",
      "Data Visualization",
      "Mobile Responsiveness",
      "Security",
      "Advanced State Patterns",
      "Animation",
      "Server-Side Rendering",
      "Progressive Web Apps",
      "Web Workers",
      "WebSockets",
      "Microservices",
    ];

    for (let i = lessons.length; i < 30; i++) {
      extended.push({
        id: i + 1,
        title: `${baseNames[i % baseNames.length]} ${
          Math.floor(i / baseNames.length) + 1
        }`,
        status: "locked",
      });
    }

    return extended;
  }, [lessons]);

  // Find the current lesson index (the one with status "in_progress")
  const currentLessonIndex = extendedLessons.findIndex(
    (lesson) => lesson.status === "in_progress"
  );

  // Generate positions for each stage in a wave-like pattern
  const stagePositions = useMemo(() => {
    // Constants for positioning
    const VERTICAL_GAP = 180; // Increased vertical gap
    const CENTER_POSITION = 50;
    const HORIZONTAL_STEP = 20; // Increased horizontal step

    const positions = [];

    // Capy position
    positions.push({
      horizontalPosition: CENTER_POSITION,
      verticalPosition: 0,
      isCapy: true,
    });

    // First stage centered
    positions.push({
      horizontalPosition: CENTER_POSITION,
      verticalPosition: VERTICAL_GAP,
      isCurrentStage: extendedLessons[0]?.status === "in_progress",
      isCompleted: extendedLessons[0]?.status === "completed",
      isLocked: extendedLessons[0]?.status === "locked",
      iconSrc: iconFirstSvg,
      fruitSrc: fruitOneSvg,
      difficulty: Math.floor(seededRandom(1) * 3) + 1,
      lessonId: extendedLessons[0]?.id,
      lessonTitle: extendedLessons[0]?.title,
      isFirstStage: true,
    });

    // Define the wave pattern
    let currentPosition = CENTER_POSITION;
    let isMovingRight = true; // Start by moving right
    let consecutiveCount = 0; // Track consecutive moves in same direction
    const MAX_CONSECUTIVE = 2; // Maximum consecutive moves in same direction

    for (let i = 1; i < extendedLessons.length; i++) {
      // Determine if we should change direction
      if (consecutiveCount >= MAX_CONSECUTIVE) {
        isMovingRight = !isMovingRight;
        consecutiveCount = 0;
      }

      // Calculate new position
      currentPosition += isMovingRight ? HORIZONTAL_STEP : -HORIZONTAL_STEP;
      consecutiveCount++;

      // Keep within bounds (20% to 80% of width)
      currentPosition = Math.max(20, Math.min(80, currentPosition));

      // Stage properties
      const stageStatus = extendedLessons[i].status;
      const iconIndex = i % 3;
      const iconSrc =
        i === extendedLessons.length - 1
          ? lastTrophySvg
          : [iconFirstSvg, iconSecondSvg, iconThirdSvg][iconIndex];

      const difficulty = Math.floor(seededRandom(i + 100) * 3) + 1;
      const fruitSrc = [fruitOneSvg, fruitTwoSvg, fruitThreeSvg][
        difficulty - 1
      ];

      positions.push({
        horizontalPosition: currentPosition,
        verticalPosition: VERTICAL_GAP + i * VERTICAL_GAP,
        isCurrentStage: stageStatus === "in_progress",
        isCompleted: stageStatus === "completed",
        isLocked: stageStatus === "locked",
        iconSrc,
        fruitSrc,
        difficulty,
        lessonId: extendedLessons[i].id,
        lessonTitle: extendedLessons[i].title,
        isLastStage: i === extendedLessons.length - 1,
      });
    }

    return positions;
  }, [extendedLessons]);

  const handleStageClick = (lessonId, isLocked) => {
    if (!isLocked) {
      // Navigate to the lesson page or trigger some action
      navigate(`/lesson/${lessonId}`);
    }
  };

  return (
    <div className="relative w-full py-10">
      <div className="relative mx-auto" style={{ width: "90%" }}>
        {/* Render connecting lines first (behind stages) */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          style={{
            height: `${
              stagePositions.length > 0
                ? stagePositions[stagePositions.length - 1].verticalPosition +
                  100
                : 0
            }px`,
            zIndex: 0,
            overflow: "visible",
          }}
        >
          {stagePositions.map((position, index) => {
            if (index === 0 || index === 1) return null; // Skip capy and first stage for lines

            const prevPosition = stagePositions[index - 1];

            const x1 = `${prevPosition.horizontalPosition}%`;
            const y1 = prevPosition.verticalPosition + 45; // Center of stage
            const x2 = `${position.horizontalPosition}%`;
            const y2 = position.verticalPosition + 45; // Center of stage

            return (
              <line
                key={`line-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={position.isLocked ? "#B5B5B5" : "#6D4C41"}
                strokeOpacity="0.8"
                strokeWidth="3"
                strokeDasharray="8,8"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Render stages */}
        {stagePositions.map((position, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2"
            style={{
              left: `${position.horizontalPosition}%`,
              top: `${position.verticalPosition}px`,
              zIndex: 10,
            }}
          >
            {position.isCapy ? (
              // Render capy for first position
              <div className="w-40 h-40 flex items-center justify-center">
                <img src={capySvg} alt="Capy" className="w-full h-full" />
              </div>
            ) : (
              // Render stage
              <div
                className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 ${
                  position.isLocked ? "opacity-90" : ""
                }`}
                onClick={() =>
                  handleStageClick(position.lessonId, position.isLocked)
                }
                title={position.lessonTitle}
              >
                {/* Stage image - increased size */}
                <img
                  src={position.isLocked ? lockedStageSvg : stageSvg}
                  alt={position.isLocked ? "Locked Stage" : "Stage"}
                  className="w-[120px] h-[120px]" // Increased from 90px
                />

                {/* Icon in center of stage - increased size */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {position.isCurrentStage ? (
                    <img
                      src={currentPlaySvg}
                      alt="Current Stage"
                      className="w-16 h-16" // Increased from 12
                    />
                  ) : (
                    <img
                      src={position.iconSrc}
                      alt={`Icon ${position.isLastStage ? "Trophy" : index}`}
                      className={`w-16 h-16 ${
                        position.isLocked ? "filter grayscale opacity-50" : ""
                      }`} // Increased from 12
                    />
                  )}
                </div>

                {/* Difficulty indicator - increased size */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20">
                  <img
                    src={position.fruitSrc}
                    alt={`Difficulty ${position.difficulty}`}
                    className={`w-20 h-12 ${
                      position.isLocked ? "opacity-50" : ""
                    }`} // Increased from 14x8
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Calculate total height needed for the roadmap */}
        <div
          style={{
            height: `${
              stagePositions.length > 0
                ? stagePositions[stagePositions.length - 1].verticalPosition +
                  100
                : 0
            }px`,
          }}
        />
      </div>
    </div>
  );
};

export default RoadmapContent;
