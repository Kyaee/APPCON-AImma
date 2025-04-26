import { Link, useLocation } from "react-router-dom";

// Components & Icons
import { Leaf, UserCircle, Inspect, ShoppingBag } from "lucide-react";

export default function MainNav({ userId }) {
  const location = useLocation();

  const navItems = [
    {
      icon: <Leaf className="size-5" />,
      label: "Roadmap",
      path: `/dashboard/${userId}`,
      id: "roadmap",
    },
    {
      icon: <UserCircle className="size-5" />,
      label: "Profile",
      path: `/profile/${userId}`,
      id: "profile",
    },
    {
      icon: <Inspect className="size-5" />,
      label: "Opportunities",
      path: `/job-opportunities/${userId}`,
      id: "opportunities",
    },
    {
      icon: <ShoppingBag className="size-5" />,
      label: "Shop",
      path: `/shop/${userId}`,
      id: "shop",
    },
  ];

  const isActive = (path) => {
    const basePath = path.split("/:")[0];
    // Match exact base path instead of using startsWith
    return location.pathname.split("/")[1] === basePath.split("/")[1];
  };

  return (
    <nav className="fixed top-6 w-full px-4 flex justify-center items-center z-40">
      <div className="w-[700px] h-[48px] rounded-lg border-2 border-black bg-card dark:bg-dark-inner-bg flex custom-shadow-75">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              group
              flex items-center justify-center h-full flex-1
              first:rounded-l-lg last:rounded-r-lg
              transition-all duration-300 cursor-pointer

              ${
                isActive(item.path)
                  ? "bg-light-brown dark:bg-dark-mode-highlight border-x"
                  : "hover:bg-light-brown dark:hover:bg-dark-mode-bg"
              }
            `}
          >
            <div
              className={`flex items-center gap-2 text-black dark:text-[#64646a] dark:group-hover:text-white ${
                isActive(item.path) ? "dark:!text-white" : ""
              }`}
            >
              {item.icon}
              <span
                className={`text-sm text-black dark:text-[#64646a] dark:group-hover:text-white font-inter ${
                  isActive(item.path) ? "dark:!text-white" : ""
                }`}
              >
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
