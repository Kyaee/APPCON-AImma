import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/config/AuthContext";

export function RegisterForm({ className, ...props }) {
  const [isLoading, setLoading] = useState(false);
  const [isEmailError, setEmailError] = useState();
  const [isPasswordError, setPasswordError] = useState();
  const [isError, setError] = useState();
  const [isFormData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signUpNewUser } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    // Check if passwords match
    if (isFormData.password !== isFormData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    // Use a single regex pattern for all password requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!passwordRegex.test(isFormData.password)) {
      setPasswordError(
        "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      );
      return false;
    }

    setPasswordError(null);
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (validateForm()) return;
    setLoading(true);

    try {
      const result = await signUpNewUser(isFormData.email, isFormData.password); // Call context function

      if (result.success) {
        navigate("/dashboard/:id"); // Navigate to dashboard on success
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
    <form 
      className={cn("flex flex-col gap-6", className)} {...props}
      onSubmit={handleSignUp}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign-up your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={isFormData.email}
            onChange={(e) =>
              setFormData({ ...isFormData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input 
            type="password" 
            required 
            value={isFormData.password}
            onChange={(e) =>
              setFormData({ ...isFormData, password: e.target.value })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <Input 
            id="password" 
            type="password" 
            required 
            value={isFormData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...isFormData, confirmPassword: e.target.value })
            }
          />
          {isPasswordError && <p className="text-sm text-red-600">{isPasswordError}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={(!isFormData.email || !isFormData.confirmPassword) || isLoading || isError}>
          Sign-up
        </Button>
        {isError && <p className="text-sm text-red-600">{isError}</p>}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Sign-up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/auth/login" className="underline underline-offset-4">
          Sign-in
        </Link>
      </div>
    </form>
  );
}
