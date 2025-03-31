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
import { Separator } from "@radix-ui/react-separator";

export default function IconButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center gap-4 hover:opacity-80 transition-opacity text-foreground *:size-6 z-50">
      <Bell onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="absolute top-8 -left-20 border border-foreground bg-background p-5 rounded-lg shadow-lg w-64 h-full">
          <p className="text-foreground">Notification 1</p>
          <p className="text-foreground">Notification 2</p>
          <p className="text-foreground">Notification 3</p>
        </div>
      )}
      <AlertDialog>
        <AlertDialogTrigger>
          <Settings className="text-foreground" />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Settings</AlertDialogTitle>
            <AlertDialogDescription className="flex gap-2 items-center">
              <ModeToggle className="border-2 border-foreground"/>
              <p className="text-foreground">
                Change the theme of the app<br/>
                Guide how. <a className="text-blue-500" href="https://ui.shadcn.com/docs/theming">https://ui.shadcn.com/docs/theming</a>
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator
            orientation="horizontal"
            className="border border-foreground"
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="text-foreground bg-background hover:bg-accent">Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-background bg-foreground hover:bg-accent">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
