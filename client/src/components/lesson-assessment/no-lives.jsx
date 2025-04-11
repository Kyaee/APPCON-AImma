import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/layout/background";

const NoLives = ({ userId }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <VideoBackground />
      <h1 className="text-4xl font-bold mb-4 text-background">
        You have no lives left!
      </h1>
      <p className="text-lg text-background">Wait for more lives.</p>
      <Link
        to={`/dashboard/${userId}`}
        className="py-3 px-4 mt-8 text-lg bg-white text-black font-extrabold custom-shadow-50 rounded-md hover:bg-neutral-300"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NoLives;
