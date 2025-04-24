import { Link, useLocation } from "react-router-dom";
import { Sprout, Target, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/config/AuthContext";
import { useEvaluation } from "@/api/INSERT";
import { useNavigate } from "react-router-dom";

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

  // Define navigation tabs only if the lesson has an assessment
  const navItems = [];

  // Only add navigation tabs if the lesson has an assessment
  if (isAssessment) {
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

  // Handle quit button action
  const handleQuit = () => {
    if (scrollProgress > previousProgress) {
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
      <h1 className="text-2xl text-primary">CapyCademy</h1>

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
        className="text-sm mr-6 p-2 flex bg-white border border-black text-black gap-1 custom-shadow-50 rounded-md"
      >
        <ArrowUpRight size="20" />
        Quit
      </button>
    </header>
  );
}
