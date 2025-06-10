import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Navigate } from "react-router-dom";
import { loginSchema, signupSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthImg from "@/assets/login_image.jpg";
import { useAuthStore } from "@/context/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ isLogin }) {
  const schema = isLogin ? loginSchema : signupSchema;
  const { login, signup } = useAuthStore.getState();

  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Login-specific error handling
        try {
          await login(data.email, data.password);
          toast.success("Logged in successfully!");
          navigate("/dashboard"); // Redirect on success
        } catch (loginError) {
          // Specific login errors
          if (loginError.response?.status === 401) {
            toast.error("Invalid email or password");
          } else {
            toast.error("Login failed. Please try again.");
          }
          console.error("Login error:", loginError);
        }
      } else {
        // Signup-specific error handling
        try {
          await signup(data.username, data.email, data.password);
          toast.success("Account created! Please log in.");
          navigate("/login"); // Redirect to login after signup
        } catch (signupError) {
          // Specific signup errors
          if (signupError.response?.status === 409) {
            toast.error("Email already exists");
          } else if (signupError.response?.data?.errors?.password) {
            toast.error("Password requirements not met");
          } else {
            toast.error("Signup failed. Please try again.");
          }
          console.error("Signup error:", signupError);
        }
      }
    } catch (unexpectedError) {
      // Fallback for unexpected errors (e.g., network issues)
      toast.error("An unexpected error occurred");
      console.error("Unexpected error:", unexpectedError);
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {isLogin ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-muted-foreground text-balance">
                  {isLogin
                    ? "Login to your Budget Pilot account"
                    : "Sign up to start tracking your budget"}
                </p>
              </div>

              {!isLogin && (
                <div className="grid gap-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              )}

              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
                {isLogin && (
                  <div className="text-right text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="grid gap-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter Password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Sign Up"}
              </Button>

              <div className="text-center text-sm">
                {isLogin ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src={AuthImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {!isLogin && (
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <Link to="/terms">Terms of Service</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </div>
      )}
    </div>
  );
}
