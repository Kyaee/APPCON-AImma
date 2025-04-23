import React from 'react'

export default function Badges({ badges, statBonus, earned }) {
  // Use statBonus from badges object if not provided directly
  const bonusItems = statBonus || badges.statBonus || [];
  // Use earned from props or from badges object
  const isEarned = earned !== undefined ? earned : badges.earned;
  
  return (
    <div
      className="fixed top-1/2 right-1/12 transform -translate-y-1/2 z-50
      h-150 w-150 p-10 rounded-xl shadow-2xl
      invisible group-hover:visible group-hover:opacity-100 transition-opacity ease-in duration-300 opacity-0   
      flex flex-col justify-center gap-6 items-center border border-foreground
      bg-background dark:bg-dark-mode-bg"
    >
      <div className="relative">
        <img
          src={badges.image || "something"}
          className={`size-70 border-2 ${isEarned ? "border-green-500" : "border-gray-400 filter grayscale"}`}
          alt="Your Badge here"
        />
        {isEarned && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 text-xs">
            ✓
          </span>
        )}
      </div>
      <h2 className="text-foreground text-3xl font-extrabold tracking-tight">
        {badges.name || "Failed to fetch badge"}
      </h2>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <p className="text-foreground font-bold tracking-tight">
            Description
            <br />
            <span className="font-normal">
              {badges.description || "Failed to fetch details"}
            </span>
            {!isEarned && (
              <span className="block mt-2 text-sm text-amber-500 font-medium">
                Not yet earned
              </span>
            )}
          </p>
        </div>
        <div className="col-span-3">
          <h3 className="mb-2 font-bold text-xl text-foreground">
            Stat Bonus+
          </h3>
          <ul
            className="flex flex-wrap gap-2
            *:px-2 *:py-1 *:bg-light-brown *:rounded-md *:text-foreground *:font-semibold *:tracking-tight"
          >
            {bonusItems.length > 0 ? (
              bonusItems.map((bonus, index) => (
                <li key={index} className={!isEarned ? "opacity-50" : ""}>
                  {bonus}
                </li>
              ))
            ) : (
              <li>No bonuses available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
