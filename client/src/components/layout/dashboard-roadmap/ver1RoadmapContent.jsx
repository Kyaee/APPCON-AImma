// First version copy
import React, { useMemo } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  // Handle navigation between courses
  const handlePrevCourse = () => {
    if (onCourseChange) {
      onCourseChange("prev");
    }
  };

  const handleNextCourse = () => {
    if (onCourseChange) {
      onCourseChange("next");
    }
  };

  // Generate consistent random positions for each lesson based on course name
  const boxPositions = useMemo(() => {
    // Use course name as seed for randomization
    const courseSeed = currentCourse
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Set default minimum distances
    const MIN_VERTICAL_GAP = 200; // Minimum vertical gap between boxes
    const VERTICAL_VARIATION = 50; // Small variation in vertical gap
    const RIGHT_POSITION = 80; // Default position for right boxes
    // Dynamic left position based on sidebar state
    const LEFT_POSITION = isSidebarExpanded ? 30 : 20; // Default position for left boxes
    const HORIZONTAL_VARIATION = 5; // Small variation in horizontal position

    // Calculate positions and vertical offsets
    const positions = [];

    // First box is always centered at the top
    positions.push({
      horizontalPosition: 50, // center (%)
      verticalPosition: 0, // top
      boxSize: 42, // first box is smaller (reduced from 48px)
    });

    // Calculate positions for remaining boxes
    for (let i = 1; i < lessons.length; i++) {
      // Determine if box should be on left or right
      const isRight = i % 2 === 1; // odd indices (1, 3, 5...) are right

      // Generate random horizontal position with small variation around default position
      const seed1 = seededRandom(courseSeed + i * 100);
      const horizontalBase = isRight ? RIGHT_POSITION : LEFT_POSITION;
      const horizontalVariation = (seed1 * 2 - 1) * HORIZONTAL_VARIATION; // -5% to +5%
      const horizontalPosition = horizontalBase + horizontalVariation;

      // Generate random vertical gap with small variation around minimum
      const seed2 = seededRandom(courseSeed + i * 200);
      const verticalGap =
        MIN_VERTICAL_GAP + Math.floor(seed2 * VERTICAL_VARIATION);

      // Calculate vertical position based on previous box
      const prevBox = positions[i - 1];
      const verticalPosition =
        prevBox.verticalPosition + prevBox.boxSize + verticalGap;

      positions.push({
        horizontalPosition,
        verticalPosition,
        boxSize: 36, // regular boxes are 36px
        verticalGap, // store for line calculations
      });
    }

    return positions;
  }, [currentCourse, lessons, isSidebarExpanded]); // Added isSidebarExpanded to dependencies

  // Calculate consistent button positions
  const leftButtonPosition = isSidebarExpanded ? "27%" : "27%";
  const rightButtonPosition = isSidebarExpanded ? "27%" : "27%";

  return (
    <div className="relative w-full mt-10">
      {/* Roadmap content container - centered in the middle section */}
      <div className="relative w-full mx-auto">
        {/* Left navigation button - fixed position for consistency */}
        <div
          className="fixed top-1/2 z-20 transform -translate-y-1/2"
          style={{ left: leftButtonPosition }}
        >
          <button
            className="bg-white p-3 rounded-lg shadow-md hover:bg-gray-100 border-2 border-black"
            onClick={handlePrevCourse}
          >
            <ChevronLeft className="w-6 h-6 text-black fill-black" />
          </button>
        </div>

        {/* Right navigation button - fixed position for consistency */}
        <div
          className="fixed top-1/2 z-20 transform -translate-y-1/2"
          style={{ right: rightButtonPosition }}
        >
          <button
            className="bg-white p-3 rounded-lg shadow-md hover:bg-gray-100 border-2 border-black"
            onClick={handleNextCourse}
          >
            <ChevronRight className="w-6 h-6 text-black fill-black" />
          </button>
        </div>

        {/* Render connecting lines first (behind boxes) */}
        <div className="relative z-0 mx-auto" style={{ width: "80%" }}>
          {lessons.map((lesson, index) => {
            if (index === 0) return null; // Skip first box (no incoming line)

            const currentBox = boxPositions[index];
            const prevBox = boxPositions[index - 1];

            // Calculate exact center points of the boxes
            const prevBoxCenterX = `${prevBox.horizontalPosition}%`;
            const prevBoxCenterY =
              prevBox.verticalPosition + prevBox.boxSize / 2;

            const currentBoxCenterX = `${currentBox.horizontalPosition}%`;
            const currentBoxCenterY =
              currentBox.verticalPosition + currentBox.boxSize / 2;

            return (
              <svg
                key={`line-${index}`}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
              >
                <line
                  x1={prevBoxCenterX}
                  y1={prevBoxCenterY}
                  x2={currentBoxCenterX}
                  y2={currentBoxCenterY}
                  stroke="#6D4C41"
                  strokeOpacity="0.6"
                  strokeWidth="3"
                  strokeDasharray="8,8"
                  strokeLinecap="round"
                />
              </svg>
            );
          })}
        </div>

        {/* Render boxes (in front of lines) */}
        <div className="relative z-10 mx-auto" style={{ width: "80%" }}>
          {lessons.map((lesson, index) => {
            const position = boxPositions[index];

            return (
              <div
                key={lesson.id}
                className="absolute w-full"
                style={{
                  top: `${position.verticalPosition}px`,
                }}
              >
                {/* Box */}
                <div
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: `${position.horizontalPosition}%`,
                  }}
                >
                  <Link
                    to={`/lesson/${lesson.id}`}
                    className={`flex items-center justify-center bg-white border-2 border-black custom-shadow-75 rounded-2xl shadow-lg hover:bg-[#f0f0f0] transition-all duration-300 ${
                      index === 0 ? "w-42 h-42" : "w-36 h-36"
                    }`}
                  >
                    <Play
                      className={`${
                        index === 0 ? "w-14 h-14" : "w-12 h-12"
                      } text-[#6D4C41] fill-[#6D4C41]`}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculate total height needed for the roadmap */}
        <div
          style={{
            height: `${
              boxPositions.length > 0
                ? boxPositions[boxPositions.length - 1].verticalPosition +
                  boxPositions[boxPositions.length - 1].boxSize +
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
