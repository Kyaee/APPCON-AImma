import React, { useMemo, useRef, useEffect, useState } from "react";
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
import OpenLesson from "@/components/features/open-lesson-card";

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
  setIsSidebarExpanded, // Add this prop
  isOpenLesson, // Add this prop
  setOpenLesson, // Add this prop
  // Update default path color to black
  pathColor = "#706E6E", // Changed from #E6E0EA to black
  pathWidth = 4, // Slightly thinner
  pathDashLength = 8, // Shorter dashes
  pathDashGap = 6, // Slightly more gap between dashes
  pathBorderRadius = 30,
  isLoading,
  setLoading,
}) => {
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const navigate = useNavigate();
  // Create a ref for the canvas
  const canvasRef = useRef(null);

  // Modify the useMemo with shouldExtend = false
  const extendedLessons = lessons; // Just use the original lessons array directly

  // Generate positions for each stage in a wave-like pattern
  const stagePositions = useMemo(() => {
    // Constants for positioning
    const VERTICAL_GAP = 140; // Increased vertical gap
    const CENTER_POSITION = 50;
    const HORIZONTAL_STEP = 20; // Increased horizontal step

    const positions = [];

    // Capy position (always show the capy)
    positions.push({
      horizontalPosition: CENTER_POSITION,
      verticalPosition: 0,
      isCapy: true,
    });

    // If no lessons, just return the capy
    if (!extendedLessons || extendedLessons.length === 0) {
      return positions;
    }

    // First stage centered
    if (extendedLessons[0]) {
      positions.push({
        horizontalPosition: CENTER_POSITION,
        verticalPosition: VERTICAL_GAP,
        isCurrentStage: extendedLessons[0]?.status === "in_progress",
        isCompleted: extendedLessons[0]?.status === "completed",
        isLocked: extendedLessons[0]?.status === "locked",
        iconSrc: iconFirstSvg,
        fruitSrc: fruitOneSvg,
        difficulty: extendedLessons[0]?.lesson_difficulty,
        lessonId: extendedLessons[0]?.id,
        lessonTitle: extendedLessons[0]?.lesson_name || "Lesson 1",
        category: extendedLessons[0]?.lesson_category,
        isFirstStage: true,
      });
    }

    // If only one lesson, return just the capy and first stage
    if (extendedLessons.length === 1) {
      return positions;
    }

    // Define the wave pattern
    let currentPosition = CENTER_POSITION;
    let isMovingRight = true; // Start by moving right
    let consecutiveCount = 0; // Track consecutive moves in same direction
    const MAX_CONSECUTIVE = 2; // Maximum consecutive moves in same direction

    // Add explicit positioning for the SECOND stage (after Capy)
    // This is the stage at index 1 in extendedLessons
    if (extendedLessons[1]) {
      positions.push({
        // Position the second stage to the full right position
        horizontalPosition: CENTER_POSITION + HORIZONTAL_STEP, // Changed from 0.6 to full step
        verticalPosition: VERTICAL_GAP * 2, // Positioned 2 gaps down from top
        isCurrentStage: extendedLessons[1]?.status === "in_progress",
        isCompleted: extendedLessons[1]?.status === "completed",
        isLocked: extendedLessons[1]?.status === "locked",
        iconSrc: iconSecondSvg,
        fruitSrc: fruitOneSvg,
        difficulty: extendedLessons[1]?.lesson_difficulty,
        lessonId: extendedLessons[1]?.id,
        lessonTitle: extendedLessons[1]?.lesson_name || "Lesson 2",
        category: extendedLessons[1]?.lesson_category,
      });
    }

    // If only two lessons, return early
    if (extendedLessons.length === 2) {
      return positions;
    }

    // Update the current position and direction after placing the second stage
    currentPosition = CENTER_POSITION + HORIZONTAL_STEP; // Changed from 0.6 to full step
    consecutiveCount = 1; // We've made one move to the right

    // Now continue with the rest of the stages, starting from the THIRD stage
    for (let i = 2; i < extendedLessons.length; i++) {
      // Determine position based on pattern:
      // Stage 1: Center, Stage 2: Right, Stage 3: Center, Stage 4: Left, Stage 5: Center, etc.
      let newPosition;

      if (i % 4 === 0) {
        // Stages 5, 9, 13...
        newPosition = CENTER_POSITION;
      } else if (i % 4 === 1) {
        // Stages 6, 10, 14...
        newPosition = CENTER_POSITION + HORIZONTAL_STEP;
      } else if (i % 4 === 2) {
        // Stages 3, 7, 11...
        newPosition = CENTER_POSITION;
      } else {
        // Stages 4, 8, 12...
        newPosition = CENTER_POSITION - HORIZONTAL_STEP;
      }

      currentPosition = newPosition;

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
        status: extendedLessons[i].status,
        iconSrc,
        fruitSrc,
        difficulty: extendedLessons[i].lesson_difficulty,
        lessonId: extendedLessons[i].id,
        lessonTitle: extendedLessons[i].lesson_name,
        category: extendedLessons[i]?.lesson_category,
        isLastStage: i === extendedLessons.length - 1,
      });
    }

    return positions;
  }, [extendedLessons]);

  // Draw curved path lines on canvas when positions change
  useEffect(() => {
    if (!canvasRef.current || stagePositions.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Get container dimensions
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight =
      stagePositions[stagePositions.length - 1].verticalPosition + 100;

    // Set canvas dimensions
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set path style
    ctx.strokeStyle = pathColor; // Now defaults to black
    ctx.lineWidth = pathWidth;
    ctx.setLineDash([pathDashLength, pathDashGap]);
    ctx.lineCap = "round";

    // Start a single continuous path
    ctx.beginPath();

    // Skip the capy (index 0), start with the first educational stage
    const startIndex = 1;

    // Get precise center points for all stages (where the currentPlaySvg would be)
    const stageCenterPoints = stagePositions
      .slice(startIndex)
      .map((position, i) => {
        const x = (position.horizontalPosition / 100) * containerWidth;
        const y = position.verticalPosition + 60; // Center of stage where icon is
        return { x, y };
      });

    // Move to the first stage center
    ctx.moveTo(stageCenterPoints[0].x, stageCenterPoints[0].y);

    // Connect all subsequent stages with quarter-circle "O" shaped curves
    for (let i = 0; i < stageCenterPoints.length - 1; i++) {
      const current = stageCenterPoints[i];
      const next = stageCenterPoints[i + 1];

      // Determine which quarter of the "O" this segment represents (repeats every 4 segments)
      const quarterType = i % 4;

      // Calculate control point offset based on circle approximation
      // For quarter circles, use a bezier curve with control points at ~0.55 * radius
      const verticalDistance = next.y - current.y;
      const horizontalDistance = next.x - current.x;

      // Determine radius and control point positions based on quarter type
      let cp1x, cp1y, cp2x, cp2y;

      // The magic number is reduced to make curves less pronounced
      const curveFactor = 0.55; // Curve factor for bezier control points, change to 0 for straight lines

      switch (quarterType) {
        case 0: // Stage 1-2: Top right quarter
          cp1x = current.x + Math.abs(horizontalDistance) * curveFactor;
          cp1y = current.y;
          cp2x = next.x;
          cp2y = next.y - Math.abs(verticalDistance) * curveFactor;
          break;

        case 1: // Stage 2-3: Bottom right quarter
          cp1x = current.x;
          cp1y = current.y + Math.abs(verticalDistance) * curveFactor;
          cp2x = next.x + Math.abs(horizontalDistance) * curveFactor;
          cp2y = next.y;
          break;

        case 2: // Stage 3-4: Top left quarter
          cp1x = current.x - Math.abs(horizontalDistance) * curveFactor;
          cp1y = current.y;
          cp2x = next.x;
          cp2y = next.y - Math.abs(verticalDistance) * curveFactor;
          break;

        case 3: // Stage 4-5: Bottom left quarter
          cp1x = current.x;
          cp1y = current.y + Math.abs(verticalDistance) * curveFactor;
          cp2x = next.x - Math.abs(horizontalDistance) * curveFactor;
          cp2y = next.y;
          break;
      }

      // Draw the bezier curve through exact center points
      ctx.bezierCurveTo(
        cp1x,
        cp1y, // First control point for quarter-circle
        cp2x,
        cp2y, // Second control point for quarter-circle
        next.x,
        next.y // End point at exact center of next stage
      );
    }

    // Draw the entire path at once
    ctx.stroke();
  }, [
    stagePositions,
    pathColor,
    pathWidth,
    pathDashLength,
    pathDashGap,
    pathBorderRadius,
  ]);

  const handleStageClick = (position) => {
    if (!position.isLocked) {
      setCurrentLessonId(position.lessonId);
      setOpenLesson(true); // This now updates the parent state

      // Close the sidebar when opening a lesson
      if (isSidebarExpanded) {
        setIsSidebarExpanded(false);
      }

      console.log(
        stagePositions.findIndex((pos) => pos.lessonId === position.lessonId)
      );
    }
  };

  return (
    <div
      className={`relative mx-auto ${
        isSidebarExpanded ? "ml-[100px]" : "mt-4"
      }`}
      style={{ width: "90%" }}
    >
      {/* Show a message when there are no lessons for this roadmap */}
      {!lessons || lessons.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img src={capySvg} alt="Capy" className="w-32 h-32 mb-8" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No lessons available yet
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            It looks like lessons for this roadmap are still being developed.
            Check back soon!
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 max-w-md">
            <p>
              This roadmap is ready for you to start your learning journey, but
              content is still being prepared.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Canvas positioning fixed - make sure it's full width/height and behind stages */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          />

          {/* Stages with higher z-index to appear in front of canvas */}
          {stagePositions.map((position, index) => {
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2"
                style={{
                  left: `${position.horizontalPosition}%`,
                  top: `${position.verticalPosition}px`,
                  zIndex: 10, // Higher than canvas
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
                    onClick={() => handleStageClick(position)}
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
                          className="w-16 h-16 mb-4" // Increased from 12
                        />
                      ) : (
                        <img
                          src={position.iconSrc}
                          alt={`Icon ${
                            position.isLastStage ? "Trophy" : index
                          }`}
                          className={`w-16 h-16 mb-4 ${
                            position.isLocked
                              ? "filter grayscale opacity-50"
                              : ""
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
            );
          })}
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
        </>
      )}

      {isOpenLesson && lessons && lessons.length > 0 && (
        <OpenLesson
          lesson={lessons.find((lesson) => lesson.id === currentLessonId)}
          setOpenLesson={setOpenLesson}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default RoadmapContent;
