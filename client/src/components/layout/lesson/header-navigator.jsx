import { Link } from "react-router-dom";
import { Sprout, Target, ShoppingCart, ArrowUpRight } from "lucide-react";

export default function Header({ page }) {
  return (
    <header className="fixed top-5 w-full px-8 flex justify-between items-center z-50">
      <h1
        className={`${page == "lesson" ? "text-black font-semibold" : ""} 
        text-2xl`}
      >
        CapaCademy
      </h1>
      <nav
        className="p-3 px-4 flex items-center gap-4 bg-white text-black border border-black custom-shadow-75 rounded-lg 
      *:text-sm *:flex *:gap-2 *:px-4 *:py-1 *:rounded-md "
      >
        <Link to="/:id/lesson/:id" className="hover:bg-neutral-200">
          <Sprout size="20" />
          Lesson
        </Link>
        <Link to="/:id/lesson/assessment/:id" className="hover:bg-neutral-200">
          <Target size="19" />
          Assessment
        </Link>
        <Link to="/shop/:id" className="hover:bg-neutral-200">
          <ShoppingCart size="17  " />
          Shop
        </Link>
      </nav>
      <Link
        to="/dashboard/:id"
        className={`${page == "lesson" ? "" : "ml-3"} 
        text-sm mr-8 p-2 flex bg-white border border-black text-black gap-1 custom-shadow-50 rounded-md`}
      >
        <ArrowUpRight size="20" />
        Quit
      </Link>
    </header>
  );
}
