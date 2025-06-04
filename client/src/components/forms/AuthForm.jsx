import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/context/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthForm({ type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const auth = useAuthStore();

  const onSubmit = async (data) => {
    try {
      if (type === "login") {
        await auth.login(data.email, data.password);
        toast.success("Logged in");
      } else {
        await auth.register(data.email, data.password);
        toast.success("Account created");
      }
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Auth failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto"
    >
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="input"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="input"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button type="submit" className="btn w-full">
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
