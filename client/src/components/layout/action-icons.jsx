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
import { useAuth } from "@/config/AuthContext";
import wavingCappy from "@/assets/job-opportunities/WaveCappy.png";
import CrocodileCappy from "@/assets/general/capy_crocodile.png";

export default function IconButton({ notification }) {
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
  };

  const notifications = [
    { id: 1, message: "Welcome New User!", created: notification },
  ];

  return (
    <div className="relative flex items-center justify-center gap-4 hover:opacity-95 transition-opacity text-foreground z-50">
      <Bell onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="animate-text-fade-short absolute top-10 right-10 border border-foreground dark:border-dark-mode-highlight bg-background dark:bg-dark-inner-bg p-5 rounded-lg shadow-lg w-72 min-w-[260px] max-w-xs z-50 h-72 overflow-y-auto">
          <h2 className="p-0 mt-1 mb-4 text-xl font-semibold">Notifications</h2>
          {notifications.map((data) => (
            <div
              key={data.id}
              className="relative group p-3 bg-muted dark:bg-dark-mode-bg hover:bg-accent/50 dark:hover:bg-dark-mode-highlight/50 text-sm transition-colors"
            >
              <span className="px-2 py-1 bg-neutral-200 dark:bg-dark-mode-highlight text-xs rounded-full group-hover:bg-accent dark:group-hover:bg-dark-mode-bg transition-colors">
                {new Date(data.created).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <p className="pl-1 pt-1 font-medium underline">{data.message}</p>
              <span className="absolute bg-indigo-500 dark:bg-dark-mode-highlight size-4 rounded-full -top-1 -right-1"></span>
            </div>
          ))}
          {/* <img src={CrocodileCappy} className="w-2/3 text-center" alt="Waving Cappy"/> */}
        </div>
      )}
      <AlertDialog>
        <AlertDialogTrigger>
          <Settings className="text-foreground dark:text-primary" />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-background dark:bg-dark-inner-bg border-2 border-foreground dark:border-dark-mode-highlight">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground dark:text-primary">
              Settings
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-7 py-8">
              <div className="flex items-center gap-2">
                <ModeToggle className="border-2 border-foreground dark:border-dark-mode-highlight" />
              </div>
              <div>
                <div className="text-foreground dark:text-primary">
                  Change the language of the app
                  <br />
                  <br />
                  <SelectLanguage
                    className="text-foreground dark:text-primary"
                    options={languages}
                    defaultValue="English"
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={logOut}
                  className="text-background dark:text-primary bg-brown dark:bg-dark-mode-bg border border-foreground dark:border-dark-mode-highlight max-w-30 hover:bg-light-brown dark:hover:bg-dark-inner-bg"
                >
                  Log-out
                </Button>
                <Button
                  variant="outline"
                  className="text-background dark:text-primary bg-brown dark:bg-dark-mode-bg border border-foreground dark:border-dark-mode-highlight max-w-30 hover:bg-light-brown dark:hover:bg-dark-inner-bg"
                >
                  Support Us
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator
            orientation="horizontal"
            className="border border-foreground dark:border-dark-mode-highlight"
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="text-foreground dark:text-primary bg-background dark:bg-dark-mode-bg hover:bg-accent dark:hover:bg-dark-inner-bg border border-foreground dark:border-dark-mode-highlight">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="text-background dark:text-primary bg-brown dark:bg-dark-mode-bg hover:bg-light-brown dark:hover:bg-dark-inner-bg border border-foreground dark:border-dark-mode-highlight">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
