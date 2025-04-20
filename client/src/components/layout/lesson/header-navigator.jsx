import { Link, useLocation } from "react-router-dom";
import { Sprout, Target, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/config/AuthContext";
import { useEvaluation } from "@/api/INSERT";
import { useNavigate } from "react-router-dom";

export default function Header({
  id,
  isAssessment,
  previousProgress,
  scrollProgress,
  inShop = false, // New prop to indicate when used in shop
}) {
  const navigate = useNavigate(); // Initialize the navigate function
  const { session } = useAuth(); // Get the session from the auth contex
  const { updateLesson } = useEvaluation(); // Function to update user data

  // Updated navigation items - using state for shop navigation
  const navItems = [
    { icon: <Sprout size="20" />, label: "Lesson", path: `/lesson/${id}` },
    {
      icon: <Target size="20" />,
      label: "Assessment",
      path: `/l/${id}/assessment`,
    },
    // Use state to indicate shop is being accessed from a lesson
    {
      icon: <ShoppingCart size="20" />,
      label: "Shop",
      path: `/l/shop/${id}`,
      state: { source: "lesson" },
    },
  ];

  const location = useLocation();
  const isActive = (path) => {
    // Special cases for each navigation item
    if (path.includes("/lesson/") && location.pathname.includes("/lesson/")) {
      return true;
    }
    if (
      path.includes("/assessment") &&
      location.pathname.includes("/assessment")
    ) {
      return true;
    }
    if (path.includes("/shop/") && location.pathname.includes("/shop/")) {
      return true;
    }

    return false;
  };

  const filteredNavItems = isAssessment
    ? navItems
    : navItems.filter((item) => item.label !== "Assessment");

  const handleQuit = () => {
    if (scrollProgress > previousProgress) {
      updateLesson({
        userId: session?.user?.id,
        lessonId: id,
        lastAccessed: new Date().toISOString(),
        progress: scrollProgress,
      });
      navigate(`/dashboard/${session?.user?.id}`);
      console.log("successful");
    } else {
      navigate(`/dashboard/${session?.user?.id}`);
    }
  };

  return (
    <header className="fixed top-5 w-full px-8 flex justify-between items-center z-50">
      <h1
        className={`text-2xl ${
          location.pathname.split("/")[1] === "lesson"
            ? "text-foreground"
            : "text-background" // Changed from "text-background" to ensure visibility
        }`}
      >
        Capycademy
      </h1>
      <nav className="flex items-center bg-background text-foreground border border-foreground custom-shadow-75 rounded-lg h-[48px] mr-10">
        {filteredNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            state={item.state} // Use state if provided
            className={`
              flex items-center gap-2 px-5 h-full first:rounded-l-lg last:rounded-r-lg hover:bg-[#CBB09B] transition-all duration-300
              ${isActive(item.path) ? "bg-[#CBB09B] border-x" : ""}
             
            `}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={handleQuit}
        className="text-sm mr-6 p-2 flex bg-background border border-foreground text-foreground gap-1 custom-shadow-50 rounded-md"
      >
        <ArrowUpRight size="20" />
        Quit
      </button>
    </header>
  );
}
