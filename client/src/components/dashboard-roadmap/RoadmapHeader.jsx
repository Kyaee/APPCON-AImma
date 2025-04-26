import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import ReactDOM from "react-dom";

const RoadmapHeader = ({
  currentCourse = "Web Development",
  progression = 10,
  courseOptions = [], // Default to empty array instead of hardcoded values
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

  // Don't open dropdown if there are no options
  const toggleDropdown = () => {
    if (courseOptions && courseOptions.length > 0) {
      setIsDropdownOpen(!isDropdownOpen);
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

    // Improved scroll handler - close dropdown when scrolling the document/window
    // but not when scrolling occurs inside the dropdown
    const handleDocumentScroll = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    // This attaches to the document's scroll event, not a specific element
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleDocumentScroll);

    // Clean up
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleDocumentScroll);
    };
  }, [currentCourse, isDropdownOpen, isSidebarExpanded]);

  // Create dropdown portal
  const renderDropdown = () => {
    // Don't render dropdown if no options or only one option
    if (!isDropdownOpen || !courseOptions || courseOptions.length <= 1) {
      return null;
    }

    return ReactDOM.createPortal(
      <div
        id="roadmap-dropdown"
        className="fixed bg-primary-foreground dark:bg-dark-inner-bg border-2 border-black dark:border-dark-mode-highlight rounded-lg shadow-md scrollbar-thin scrollbar-thumb-[#CBB09B]/50 hover:scrollbar-thumb-[#CBB09B] scrollbar-track-transparent dark:scrollbar-thumb-dark-mode-highlight/50 dark:hover:scrollbar-thumb-dark-mode-highlight"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: dropdownWidth,
          zIndex: 9999,
          maxHeight: "300px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(203, 176, 155, 0.5) transparent",
        }}
        onClick={(e) => e.stopPropagation()}
        onScroll={(e) => e.stopPropagation()}
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
          {/* Use toggle function with checks */}
          <div
            ref={containerRef}
            onClick={toggleDropdown}
            className={`inline-flex items-start gap-3 ${
              courseOptions && courseOptions.length > 1 ? "cursor-pointer" : ""
            } group`}
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
            {/* Only show dropdown indicator if we have multiple options */}
            {courseOptions && courseOptions.length > 1 && (
              <ChevronRight
                className={`w-8 h-8 text-black dark:text-primary flex-shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            )}
          </div>

          <div
            className="h-[3px] bg-black dark:bg-primary mt-3"
            style={{ width: lineWidth }}
          />
        </div>
      </div>

      {renderDropdown()}

      <p className="text-black dark:text-primary font-medium mt-4 text-md">
        Current Progression: {progression}%
      </p>
    </div>
  );
};

export default RoadmapHeader;
