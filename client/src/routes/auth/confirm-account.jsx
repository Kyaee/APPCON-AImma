import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ConfirmAccount() {
  const location = useLocation();
  const { data = { email: "" } } = location.state || {};

  return (
    <main className="text-lg bg-background h-screen flex items-center justify-center">
      <div>
        <h1 className="mb-6 font-bold text-4xl">Verify your email &lt;3</h1>
        <p className="text-lg">
          We've sent a verification message to {data.email || "your email"}.{" "}
          <br />
          Kindly check your inbox!
        </p>
        <div className="mt-10 flex items-center gap-4">
          {/* <Button className="">Resend email</Button> */}
          <Link to="/auth/login">
            <Button className="">Sign-in</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
