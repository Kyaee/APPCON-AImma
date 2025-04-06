import { Link, useLocation } from "react-router-dom";
import { Sprout, Target, ShoppingCart, ArrowUpRight } from "lucide-react";

export default function Header({ id, isAssessment, userId }) {
  const navItems = [
    { icon: <Sprout size="20" />, label: "Lesson", path: `/lesson/${id}` },
    { icon: <Target size="20" />, label: "Assessment", path: `/l/${id}/assessment` },
    { icon: <ShoppingCart size="20" />, label: "Shop", path: `/shop/${id}` },
  ];

  const location = useLocation(); 
  const isActive = (path) => {
    const basePath = path.split("/:")[0];
    return location.pathname.split("/")[1] === basePath.split("/")[1];
  };
  
  const filteredNavItems = isAssessment 
    ? navItems 
    : navItems.filter(item => item.label !== "Assessment");

  return (
    <header className="fixed top-5 w-full px-8 flex justify-between items-center z-50">
      <h1 className={`text-2xl ${location.pathname.split("/")[1] === "lesson" ? "text-foreground" : "text-background"}`}>
        CapaCademy
      </h1>
      <nav className="flex items-center bg-background text-foreground border border-foreground custom-shadow-75 rounded-lg h-[48px]">
        {filteredNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
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
      <Link
        to={`/dashboard/${userId}`}
        className={`${location.pathname.split("/")[1] === "lesson" ? "ml-6" : ""} text-sm mr-8 p-2 flex bg-background border border-foreground text-foreground gap-1 custom-shadow-50 rounded-md`}
      >
        <ArrowUpRight size="20" />
        Quit
      </Link>
    </header>
  );
}
