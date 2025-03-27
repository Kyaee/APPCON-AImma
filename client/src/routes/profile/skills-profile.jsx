import { Link } from "react-router-dom";

export default function SkillsProfile({titles}) {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-black tracking-tight">
        Skills to Improve:
      </h2>
      <div
        className="flex flex-wrap gap-3 
      *:bg-background *:py-2 *:px-4 *:border *:border-foreground *:rounded-sm *:cursor-pointer *:tracking-tighter *:font-semibold
      "
      >
        {titles.map((title) => (
          <button key={title} className="hover:bg-light-brown hover:scale-110 transition ease-in">
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}
