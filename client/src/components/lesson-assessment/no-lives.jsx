import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/layout/Background";
import CapySad from "@/assets/lesson-assessment/CapySad.png"; // Import the sad capybara image

const NoLives = ({ userId }) => {
  // Generate URL with timestamp to force refresh
  const dashboardUrl = `/dashboard/${userId}?t=${Date.now()}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <VideoBackground />
      <img
        src={CapySad}
        alt="Sad Capybara"
        className="w-72 h-72 object-contain mb-2"
      />
      <h1 className="text-4xl font-bold mb-4 text-primary">
        You have no lives left!
      </h1>
      <p className="text-lg text-primary">
        Come back later or review lessons to continue.
      </p>{" "}
      {/* Updated text */}
      <Link
        to={dashboardUrl}
        className="py-3 px-4 mt-8 border-2 border-black text-lg bg-white hover:bg-brown hover:text-white text-black font-extrabold custom-shadow-75 rounded-md cursor-pointer transition-all duration-400"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NoLives;
