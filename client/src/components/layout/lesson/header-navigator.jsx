import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sprout, Target, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/config/AuthContext";
import { useEvaluation } from "@/api/INSERT";
import { useNavigation } from "@/context/navigationContext";

export default function Header({
  id,
  isAssessment,
  previousProgress,
  scrollProgress,
}) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { updateLesson } = useEvaluation();
  const location = useLocation();
  const { suppressNavigation } = useNavigation(); // Get the current suppression state

  // Define navigation tabs only if the lesson has an assessment
  const navItems = [];

  // Only add navigation tabs if the lesson has an assessment AND we're not suppressing center nav
  if (isAssessment && suppressNavigation !== "centerNav") {
    // Add Lesson tab
    navItems.push({
      icon: <Sprout size="20" />,
      label: "Lesson",
      path: `/lesson/${id}`,
    });

    // Add Assessment tab
    navItems.push({
      icon: <Target size="20" />,
      label: "Assessment",
      path: `/l/${id}/assessment`,
    });
  }

  const isActive = (path) => {
    if (path.includes("/lesson/") && location.pathname.includes("/lesson/")) {
      return true;
    }
    if (
      path.includes("/assessment") &&
      location.pathname.includes("/assessment")
    ) {
      return true;
    }
    return false;
  };

  // Handle quit button action - MODIFIED to return to lesson
  const handleQuit = () => {
    // If we're in assessment, go back to the lesson page
    if (location.pathname.includes("/assessment")) {
      navigate(`/lesson/${id}`);
    }
    // Otherwise use the original dashboard navigation logic
    else if (scrollProgress > previousProgress) {
      updateLesson({
        userId: session?.user?.id,
        lessonId: id,
        lastAccessed: new Date().toISOString(),
        progress: scrollProgress,
      });
      navigate(`/dashboard/${session?.user?.id}`);
    } else {
      navigate(`/dashboard/${session?.user?.id}`);
    }
  };

  return (
    <header className="fixed top-5 w-full px-8 flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
        <img src="/favicon.svg" alt="CapyCademy Logo" className="w-8 h-8" />
        <h1 className="text-2xl text-primary font-bold">CapyCademy</h1>
      </div>

      {/* Only show nav if we have tabs to display (lesson has an assessment) */}
      {navItems.length > 0 && (
        <nav className="flex items-center bg-white text-black border border-black custom-shadow-75 rounded-lg h-[48px] mr-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`group flex items-center gap-2 px-5 h-full first:rounded-l-lg last:rounded-r-lg transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-light-brown border-x"
                  : "hover:bg-light-brown"
              }`}
            >
              <div className="flex items-center gap-2 text-black">
                {item.icon}
                <span className="text-sm font-inter">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      )}

      {/* Always show the quit button */}
      <button
        onClick={handleQuit}
        className="text-md px-10 py-2 flex bg-brown hover:bg-dark-brown cursor-pointer transition-all duration-400 border border-black text-white gap-1 custom-shadow-75 rounded-md"
      >
        <ArrowUpRight size="20" />
        Quit
      </button>
    </header>
  );
}
