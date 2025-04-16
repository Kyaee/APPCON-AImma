import { useState } from "react";
import { ModeToggle } from "../features/toggle-theme";

// Components & Icons
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
import { Bell, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { languages } from "@/lib/languages";
import SelectLanguage from "../features/select-language";
import { useAuth } from "@/config/authContext";
import wavingCappy from "@/assets/job-opportunities/WaveCappy.png";
import CrocodileCappy from "@/assets/general/capy_crocodile.png";

export default function IconButton({notification}) {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const logOut = () => {
    signOut()
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  }

  const notifications = [
    { id: 1, message: "Welcome New User!", created: notification },
  ];

  return (
    <div className="relative flex items-center justify-center gap-4 hover:opacity-95 transition-opacity text-foreground z-50">
      <Bell onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="animate-text-fade-short absolute top-10 right-10 border border-foreground bg-background p-5 rounded-lg shadow-lg w-72 min-w-[260px] max-w-xs z-50 h-72 overflow-y-auto">
          <h2 className="p-0 mt-1 mb-4 text-xl font-semibold">Notifications</h2>
          {notifications.map((data)=> 
            <div 
              key={data.id}
              className="relative group p-3 bg-muted hover:bg-blue-100 text-sm"
            >
              <span className="px-2 py-1 bg-neutral-200 text-xs rounded-full group-hover:bg-indigo-200">{new Date(data.created).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
              <p className="pl-1 pt-1 font-medium underline">{data.message}</p>
              <span className="absolute bg-indigo-500 size-4 rounded-full -top-1 -right-1"></span>
            </div>

          )}
          {/* <img src={CrocodileCappy} className="w-2/3 text-center" alt="Waving Cappy"/> */}

        </div>
      )}
      <AlertDialog>
        <AlertDialogTrigger>
          <Settings className="text-foreground" />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Settings
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-5 ">
              <div className="flex items-center gap-2">
                <ModeToggle className="border-2 border-foreground" />
                <div className="text-foreground">
                  Change the theme of the app
                  <br />
                  Guide how.{" "}
                  <a
                    className="text-blue-500"
                    href="https://ui.shadcn.com/docs/theming"
                  >
                    https://ui.shadcn.com/docs/theming
                  </a>
                </div>
              </div>
              <div>
                <div className="text-foreground">
                  Change the language of the app
                  <br />
                  <br />
                  <SelectLanguage
                    className="text-foreground"
                    options={languages}
                    defaultValue="English"
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={logOut} className="text-background bg-foreground max-w-30">
                  Log-out
                </Button>
                <Button variant="outline" className="max-w-30">
                  Support Us
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator
            orientation="horizontal"
            className="border border-foreground"
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="text-foreground bg-background hover:bg-accent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="text-background bg-foreground hover:bg-accent">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
