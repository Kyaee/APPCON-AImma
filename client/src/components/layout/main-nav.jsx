import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Import icons from assets
import missionImage from '@/assets/job-opportunities/Mission.png';
import customerImage from '@/assets/job-opportunities/Customer.png';
import choiceImage from '@/assets/job-opportunities/Choice.png';
import shoppingImage from '@/assets/job-opportunities/Shopping Cart.png';

export default function MainNav() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  const navItems = [
    { icon: missionImage, label: 'Roadmap', path: '/dashboard/:id', id: 'roadmap' },
    { icon: customerImage, label: 'Profile', path: '/profile/:id', id: 'profile' },
    { icon: choiceImage, label: 'Opportunities', path: '/job-opportunities/:id', id: 'opportunities' },
    { icon: shoppingImage, label: 'Shop', path: '/shop/:id', id: 'shop' }
  ];

  const isActive = (path) => {
    const basePath = path.split('/:')[0];
    // Match exact base path instead of using startsWith
    return location.pathname.split('/')[1] === basePath.split('/')[1];
  };

  return (
    <nav className="fixed top-5 w-full px-8 flex justify-center items-center z-50">
      <div className="w-[700px] h-[48px] rounded-lg border border-black bg-white flex custom-shadow-75">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActiveItem(item.id)}
            className={`
              flex items-center justify-center h-full flex-1
              first:rounded-l-lg last:rounded-r-lg
              transition-all duration-300 cursor-pointer
              hover:bg-[#CBB09B]
              ${isActive(item.path) ? 'bg-[#CBB09B]' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              <img
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 object-contain"
              />
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
