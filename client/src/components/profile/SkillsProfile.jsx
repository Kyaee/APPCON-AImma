export default function SkillsProfile({titles}) {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-black dark:text-primary tracking-tight">
        Skills to Improve:
      </h2>
      <div className="flex flex-wrap gap-3 *:bg-card dark:*:bg-dark-mode-bg *:py-2 *:px-4 *:border-2 *:border-black dark:*:border-background *:rounded-sm *:cursor-pointer *:tracking-tighter *:font-semibold">
        {titles.map((title) => (
          <button key={title} className="hover:bg-light-brown dark:hover:bg-dark-mode-highlight transition-all duration-300 text-black dark:text-white">
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}
