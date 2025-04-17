// import { GalleryVerticalEnd } from "lucide-react";
import { VideoBackground } from "@/components/layout/Background";
import { RegisterForm } from "@/components/features/register-form";
import brandIcon from "@/assets/general/brandicon.png";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 border-r-4 border-black">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium text-xl">
            <img
              src={brandIcon}
              alt="Capycademy Logo"
              className="h-12 w-12 object-contain"
            />
            CapyCademy
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <VideoBackground />
      </div>
    </div>
  );
}
