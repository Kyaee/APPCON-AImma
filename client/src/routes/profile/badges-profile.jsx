import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BadgesProfile({
  badges = {
    name: "Example badge here",
    description: "You put the description here",
  },
}) {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold mb-5 text-black tracking-tight">
          Badges
        </h2>

        <AlertDialog>
          <AlertDialogTrigger>
            <button className="px-3 py-1 bg-white text-black cursor-pointer rounded-md text-sm hover:bg-blue-400 border border-black">
              More
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>All Your Badges</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="bg-background p-5 rounded-lg border-2 border-foreground">
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden py-1 pl-3 pb-3 [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="group transition">
            <img
              src="something"
              className="w-14 h-14 rounded-full cursor-pointer border border-foreground group-hover:scale-110 transition-transform duration-300"
              alt="badge"
            />
            <div
              className="fixed top-1/2 right-1/12 transform -translate-y-1/2 z-50
              h-150 w-150 p-10 rounded-xl shadow-2xl
              invisible group-hover:visible group-hover:opacity-100 transition-opacity ease-in duration-300 opacity-0   
              flex flex-col justify-center gap-6 items-center border border-foreground
              bg-background"
            >
              <img
                src="something"
                className="size-70 border-2 border-foreground"
                alt="Your Badge here"
              />
              <h2 className="text-foreground text-3xl font-extrabold tracking-tight">
                {badges.name === "" ? "Failed to fetch badge" : badges.name}
              </h2>
              <div className="grid grid-cols-2 gap-15">
                <p className="text-foreground font-bold tracking-tight">
                  Description
                  <br />
                  <span className="font-normal">
                    {badges.description === ""
                      ? "Failed to fetch details"
                      : badges.description}
                  </span>
                </p>
                <div>
                  <h3 className="mb-2 font-bold text-xl text-foreground">
                    Stat Bonus+
                  </h3>
                  <ul
                    className="flex flex-wrap gap-2
                  *:px-2 *:py-1 *:bg-light-brown *:rounded-md *:text-foreground *:font-semibold *:tracking-tight"
                  >
                    <li>Bonus 1</li>
                    <li>Bonus 2</li>
                    <li>Bonus 2</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="pl-3 text-sm text-black mt-1">
          Complete more lessons to gain badges!
        </p>
      </div>
    </section>
  );
}
