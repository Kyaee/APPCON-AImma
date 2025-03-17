import React from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ isExpanded, onToggle }) => {
  const handleToggle = () => {
    console.log('Current state:', isExpanded);
    onToggle();
  };

  return (
    <>
      {!isExpanded ? (
        <div className="fixed top-6 left-18  z-50">
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg border border-black hover:bg-[#CBB09B] transition-colors bg-white"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      ) : (
        <div className="fixed top-0 left-0 h-screen w-[20%] transition-all duration-300 bg-white border-r border-black z-40">
          <div className="p-4">
            <button
              onClick={handleToggle}
              className="p-2 rounded-lg border border-black hover:bg-[#CBB09B] transition-colors bg-white"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;