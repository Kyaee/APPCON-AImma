import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/layout/background";
import { LoginForm } from "@/components/features/login-form";
import brandIcon from "@/assets/general/brandicon.png";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 d p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center text-white">
          <img
            src={brandIcon}
            alt="Capycademy Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl">CapyCademy</span>
        </Link>

        <VideoBackground />
        <LoginForm />
      </div>
    </div>
  );
}
