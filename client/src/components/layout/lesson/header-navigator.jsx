import { Link } from "react-router-dom";
import { Sprout, Target, ShoppingCart, ArrowUpRight } from "lucide-react";

export default function Header({ page }) {
  return (
    <header className="fixed top-5 w-full px-8 flex justify-between items-center z-50">
      <h1 className={`${page == "lesson" ? "text-black font-semibold" : ""} text-2xl`}>
        CapaCademy
      </h1>
      <nav className="flex items-center bg-white text-black border border-black custom-shadow-75 rounded-lg h-[48px]">
        <Link to="/:id/lesson/:id" 
          className="flex items-center gap-2 px-4 h-full first:rounded-l-lg last:rounded-r-lg hover:bg-[#CBB09B] transition-all duration-300"
        >
          <Sprout size="20" />
          <span className="text-sm">Lesson</span>
        </Link>
        <Link to="/:id/lesson/assessment/:id" 
          className="flex items-center gap-2 px-4 h-full hover:bg-[#CBB09B] transition-all duration-300"
        >
          <Target size="20" />
          <span className="text-sm">Assessment</span>
        </Link>
        <Link to="/shop/:id" 
          className="flex items-center gap-2 px-4 h-full first:rounded-l-lg last:rounded-r-lg hover:bg-[#CBB09B] transition-all duration-300"
        >
          <ShoppingCart size="20" />
          <span className="text-sm">Shop</span>
        </Link>
      </nav>
      <Link
        to="/:id/dashboard"
        className={`${page == "lesson" ? "" : "ml-3"} text-sm mr-8 p-2 flex bg-white border border-black text-black gap-1 custom-shadow-50 rounded-md`}
      >
        <ArrowUpRight size="20" />
        Quit
      </Link>
    </header>
  );
}
