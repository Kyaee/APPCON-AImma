import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import ReactDOM from "react-dom";

const RoadmapHeader = ({
  currentCourse = "Web Development",
  progression = 10,
  courseOptions = [
    "Web Development",
    "Quality Assurance",
    "Mobile Development",
  ],
  className = "",
  isSidebarExpanded = false,
  onCourseSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [lineWidth, setLineWidth] = useState(
    isSidebarExpanded ? "695px" : "auto"
  );
  const [dropdownWidth, setDropdownWidth] = useState("auto");

  // Handle course selection from the dropdown
  const handleCourseSelection = (index) => {
    if (onCourseSelect) {
      onCourseSelect(index);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const measureWidth = () => {
      if (containerRef.current) {
        // Directly measure the width of the header container (h2 + chevron)
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;

        if (!isSidebarExpanded) {
          setLineWidth(`${containerWidth}px`);
          setDropdownWidth(`${containerWidth}px`);
        } else {
          setLineWidth("695px");
          // Use the same dynamic width measurement for the dropdown even when sidebar is expanded
          setDropdownWidth(`${containerWidth}px`);
        }

        // Calculate dropdown position
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 10,
          left: rect.left + window.scrollX,
        });
      }
    };

    // Measure immediately
    measureWidth();

    // Also measure after a small delay to ensure all elements are fully rendered
    const timeoutId = setTimeout(measureWidth, 50);

    // Add event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !document.getElementById("roadmap-dropdown")?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentCourse, isDropdownOpen, isSidebarExpanded]);

  // Create dropdown portal
  const renderDropdown = () => {
    if (!isDropdownOpen || !courseOptions || courseOptions.length === 0)
      return null;

    return ReactDOM.createPortal(
      <div
        id="roadmap-dropdown"
        className="fixed bg-primary-foreground dark:bg-dark-inner-bg border-2 border-black dark:border-dark-mode-highlight  rounded-lg shadow-md"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: dropdownWidth,
          zIndex: 9999,
        }}
      >
        {courseOptions.map((course, index) => (
          <div
            key={index}
            className="p-3 hover:bg-[#CBB09B] dark:hover:bg-dark-mode-highlight cursor-pointer text-black dark:text-primary text-lg truncate"
            onClick={() => handleCourseSelection(index)}
            title={course}
          >
            {course}
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <div className={`py-6 ml-25 ${className} relative z-50`}>
      <div className="relative inline-block">
        <div className="flex flex-col">
          <div
            ref={containerRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-start gap-3 cursor-pointer group"
          >
            <h2
              className={`text-2xl font-bold text-black dark:text-primary  ${
                isSidebarExpanded
                  ? "max-w-[660px] line-clamp-2"
                  : "max-w-[240px] break-words"
              }`}
              style={{
                wordWrap: isSidebarExpanded ? "normal" : "break-word",
                overflow: isSidebarExpanded ? "hidden" : "visible",
                textOverflow: isSidebarExpanded ? "ellipsis" : "clip",
                display: isSidebarExpanded ? "-webkit-box" : "block",
                WebkitLineClamp: isSidebarExpanded ? "2" : "none",
                WebkitBoxOrient: "vertical",
              }}
              title={currentCourse}
            >
              {currentCourse}
            </h2>
            <ChevronRight
              className={`w-8 h-8 text-black dark:text-primary flex-shrink-0 mt-1 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>

          <div
            className="h-[3px] bg-black dark:bg-primary mt-3"
            style={{ width: lineWidth }}
          />
        </div>
      </div>

      {renderDropdown()}

      <p className="text-black dark:text-primary  font-medium mt-4 text-md">
        Current Progression: {progression}%
      </p>
    </div>
  );
};

export default RoadmapHeader;
