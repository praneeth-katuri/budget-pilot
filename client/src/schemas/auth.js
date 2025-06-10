import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const signupSchema = loginSchema
  .extend({
    username: z
      .string()
      .min(1, "Username required")
      .min(3, "Username should be atleast 3 characters"),
    confirmPassword: z.string().min(1, "Re-enter your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
