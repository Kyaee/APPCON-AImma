import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/config/AuthContext";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useAuth();
  const [isError, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { session, error } = await signInUser(
      isFormData.email,
      isFormData.password
    );

    if (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      navigate("/dashboard");
    }

    if (session) {
      closeModal();
      setError("");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-3 border-black bg-white text-black">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-black">Welcome back</CardTitle>
          <CardDescription className="text-gray-600">
            Login with your Google account
          </CardDescription>
          <div className="mt-4 flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
              onClick={signInWithGoogle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="grid gap-6">
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200">
                <span className="relative z-10 bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={isFormData.email}
                    onChange={(e) =>
                      setFormData({ ...isFormData, email: e.target.value })
                    }
                    required
                    className="bg-white border-gray-200 text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline text-blue-400"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"} // Toggle input type
                      value={isFormData.password}
                      placeholder="Password"
                      onChange={(e) =>
                        setFormData({ ...isFormData, password: e.target.value })
                      }
                      required
                      className="bg-white border-gray-200 text-black"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600"
                      onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  disabled={
                    !isFormData.email || !isFormData.password || isError
                  }
                >
                  Login
                </Button>
                {isError && (
                  <p className="text-red-600 text-center pt-4">{isError}</p>
                )}
              </div>
              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="underline underline-offset-4 text-blue-400"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-blue-50 [&_a]:hover:text-blue-300">
        By clicking continue, you agree to our{" "}
        <Link to="">Terms of Service</Link> and{" "}
        <Link to="">Privacy Policy</Link>.
      </div>
    </div>
  );
}
