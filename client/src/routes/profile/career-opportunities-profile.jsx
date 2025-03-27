import JobItem from "@/components/features/job-item";
import { Link } from "react-router-dom";

export default function ProfileCareerOpportunities({id}) {
  return (
    <section className="w-full relative col-span-full ">
      {/* Main container with black border and shadow */}
      <div className="bg-white rounded-lg border-2 border-black shadow-lg overflow-hidden">
        {/* Header section with enhanced border */}
        <div className="flex justify-between items-center p-8 ">
          <h2 className="text-3xl font-semibold text-black tracking-tight">
            Career Opportunities
          </h2>
          <Link
            to={`/job-opportunities/${id}`}
            className="text-lg font-semibold text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200"
          >
            Look for more
          </Link>
        </div>
        <div className="grid grid-cols-2 pt-4 p-8 gap-10">
          <JobItem />
          <JobItem />
        </div>
      </div>
    </section>
  );
}
