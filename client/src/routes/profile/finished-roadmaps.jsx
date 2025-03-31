export default function FinishedRoadmaps() {
  return (
    <section className="w-full mx-auto col-span-full ">
      <div className="flex justify-between items-center py-4 ">
        <h2 className="pb-2 text-3xl text-black font-semibold">
          Completed Skill Trees
        </h2>
        <button
          // onClick={toggleExpand}
          className="flex items-center px-3 py-1 bg-white text-gray-700 border-2 border-black rounded cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Expand
        </button>
      </div>

      <div className="bg-background p-4 rounded-b-xl border-2 border-foreground">
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-black cursor-pointer hover:text-blue-600">
            Finished Supabase Tutorial
          </li>
          <li className="text-black cursor-pointer hover:text-blue-600">
            Finished TypeScript
          </li>
          <li className="text-black cursor-pointer hover:text-blue-600">
            Sample
          </li>
          <li>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200"
            >
              Expand List
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
