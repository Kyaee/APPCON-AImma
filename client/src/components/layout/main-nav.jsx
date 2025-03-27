// import { useAuth } from "@/config/authContext";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/config/authContext";

// Components & Icons
import { Leaf, UserCircle, Inspect, ShoppingBag } from "lucide-react";

export default function MainNav() {
  const location = useLocation();
  const { session } = useAuth();  
  // const userId = session.user.id;

  // const navItems = [
  //   { icon: <Leaf className="size-5"/>, label: 'Roadmap', path: `/dashboard/${userId}`, id: 'roadmap' },
  //   { icon: <UserCircle className="size-5"/>, label: 'Profile', path: `/profile/${userId}`, id: 'profile' },
  //   { icon: <Inspect className="size-5"/>, label: 'Opportunities', path: `/job-opportunities/${userId}`, id: 'opportunities' },
  //   { icon: <ShoppingBag className="size-5" />, label: 'Shop', path: `/shop/${userId}`, id: 'shop' }
  // ];
  
  const navItems = [
    { icon: <Leaf className="size-5"/>, label: 'Roadmap', path: `/dashboard/:id`, id: 'roadmap' },
    { icon: <UserCircle className="size-5"/>, label: 'Profile', path: `/profile/:id`, id: 'profile' },
    { icon: <Inspect className="size-5"/>, label: 'Opportunities', path: `/job-opportunities/:id`, id: 'opportunities' },
    { icon: <ShoppingBag className="size-5" />, label: 'Shop', path: `/shop/:id`, id: 'shop' }
  ];

  const isActive = (path) => {
    const basePath = path.split('/:')[0];
    // Match exact base path instead of using startsWith
    return location.pathname.split('/')[1] === basePath.split('/')[1];
  };

  return (
    <nav className="fixed top-6 w-full px-4 flex justify-center items-center z-40">
      <div className="w-[700px] h-[48px] rounded-lg border-2 border-black bg-card flex custom-shadow-75">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              flex items-center justify-center h-full flex-1
              first:rounded-l-lg last:rounded-r-lg
              transition-all duration-300 cursor-pointer
              hover:bg-[#CBB09B]
              ${isActive(item.path) ? 'bg-[#CBB09B] border-x' : ''}
            `}
          >
            <div className="flex items-center gap-2 text-black">
              {item.icon}
              <span className="text-sm text-black font-inter">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
