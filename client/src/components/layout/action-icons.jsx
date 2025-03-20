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
import { Separator } from "@radix-ui/react-separator";
// import
import { Bell, Settings } from "lucide-react";
import { useState } from "react";

export default function IconButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center gap-4 hover:opacity-80 transition-opacity text-black *:size-6 z-50">
      <Bell onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="absolute top-8 -left-20 border border-foreground bg-white p-5 rounded-lg shadow-lg w-64 h-full">
          <p className="text-black">Notification 1</p>
          <p className="text-black">Notification 2</p>
          <p className="text-black">Notification 3</p>
        </div>
      )}
      {/* ----------------------------------- */}
      <AlertDialog>
        <AlertDialogTrigger>
          <Settings />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Settings</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator
            orientation="horizontal"
            className="border border-gray dark:bg-foreground"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
