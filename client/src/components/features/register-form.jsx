import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/config/AuthContext";

export function RegisterForm({ className, ...props }) {
  const [isLoading, setLoading] = useState(false);
  const [isPasswordError, setPasswordError] = useState();
  const [isError, setError] = useState();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isFormData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signUpNewUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    // Check if passwords match
    if (isFormData.password !== isFormData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    // Updated regex to be more forgiving
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(isFormData.password)) {
      setPasswordError(
        "Password must be:<br />" +
          " - At least 6 characters<br />" +
          " - Contain at least one uppercase letter<br />" +
          " - One lowercase letter<br />" +
          " - One number"
      );
      return false;
    }

    setPasswordError(null);
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    try {
      const result = await signUpNewUser(isFormData.email, isFormData.password); // Call context function

      if (result.success) {
        navigate("/auth/confirm-account", {
          state: { email: isFormData.email },
        });
      } else {
        setError(result.error.message); // Show error message on failure
      }
    } catch (err) {
      setError("An unexpected error occurred."); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 bg-white  text-black", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-black">Sign-up your account</h1>
        <p className="text-sm text-gray-600 mb-4">
          Start your personalized learning journey with us!
        </p>
      </div>
      <form className="grid gap-5" onSubmit={handleSignUp}>
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
          <Label className="text-gray-700">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword.password ? "text" : "password"} // Toggle input type
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
              onClick={() =>
                setShowPassword((prevState) => ({
                  ...prevState,
                  password: !prevState.password, // Toggle the password visibility
                }))
              } // Toggle visibility
            >
              {showPassword.password ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-gray-700">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword.confirmPassword ? "text" : "password"} // Toggle input type
              value={isFormData.confirmPassword}
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...isFormData, confirmPassword: e.target.value })
              }
              required
              className="bg-white border-gray-200 text-black"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600"
              onClick={() =>
                setShowPassword((prevState) => ({
                  ...prevState,
                  confirmPassword: !prevState.confirmPassword, // Toggle the confirmPassword visibility
                }))
              } // Toggle visibility
            >
              {showPassword.confirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {isPasswordError && (
            <p
              className="text-sm text-red-600"
              dangerouslySetInnerHTML={{ __html: isPasswordError }}
            ></p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white"
          disabled={
            !isFormData.email ||
            !isFormData.confirmPassword ||
            isLoading ||
            isError
          }
        >
          Sign-up
        </Button>
        {isError && <p className="text-sm text-red-600">{isError}</p>}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200">
          <span className="relative z-10 bg-white px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </form>
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
        Sign-up with Google
      </Button>
      <div className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth/login"
          className="underline underline-offset-4 text-blue-600"
        >
          Sign-in
        </Link>
      </div>
    </div>
  );
}
