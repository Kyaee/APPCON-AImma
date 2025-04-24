import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/layout/Background";

const NoLives = ({ userId }) => {
  // Generate URL with timestamp to force refresh
  const dashboardUrl = `/dashboard/${userId}?t=${Date.now()}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <VideoBackground />
      <h1 className="text-4xl font-bold mb-4 text-primary">
        You have no lives left!
      </h1>
      <p className="text-lg text-primary">Wait for more lives.</p>
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
