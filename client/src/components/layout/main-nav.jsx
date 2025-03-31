// import { useAuth } from "@/config/authContext";
import { Link, useLocation } from "react-router-dom";

// Components & Icons
import { Leaf, UserCircle, Inspect, ShoppingBag } from "lucide-react";

export default function MainNav() {
  const location = useLocation();

  const navItems = [
    { icon: <Leaf className="size-5"/>, label: 'Roadmap', path: `/dashboard/:id`, id: 'roadmap' },
    { icon: <UserCircle className="size-5"/>, label: 'Profile', path: `/profile/:id`, id: 'profile' },
    { icon: <Inspect className="size-5"/>, label: 'Opportunities', path: `/job-opportunities/:id`, id: 'opportunities' },
    { icon: <ShoppingBag className="size-5" />, label: 'Shop', path: `/shop/:id`, id: 'shop' }
  ];

  const isActive = (path) => {
    const basePath = path.split('/:')[0];
    return location.pathname.split('/')[1] === basePath.split('/')[1];
  };

  return (
    <nav className="fixed top-6 w-full px-4 flex justify-center items-center z-40">
      <div className="w-[700px] h-[48px] rounded-lg border-2 border-black dark:border-background bg-card dark:bg-[#121214] flex custom-shadow-75">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              group
              flex items-center justify-center h-full flex-1
              first:rounded-l-lg last:rounded-r-lg
              transition-all duration-300 cursor-pointer
              hover:bg-[#CBB09B] dark:hover:bg-[#1d1d1e]
              ${isActive(item.path) ? 'bg-[#CBB09B] dark:bg-[#1d1d1e] border-x' : ''}
            `}
          >
            <div className={`flex items-center gap-2 text-black dark:text-[#64646a] dark:group-hover:text-white ${isActive(item.path) ? 'dark:!text-white' : ''}`}>
              {item.icon}
              <span className={`text-sm text-black dark:text-[#64646a] dark:group-hover:text-white font-inter ${isActive(item.path) ? 'dark:!text-white' : ''}`}>
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
