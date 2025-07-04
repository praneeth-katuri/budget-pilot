import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { useInitAuth } from "./hooks/useInitAuth";
import { useAuthStore } from "./context/authStore";
export default function App() {
  const isLoading = useAuthStore((s) => s.isLoading);
  useInitAuth();
  if (isLoading) return null;
  return (
    <>
      <Toaster />
      <AppRoutes />
      <Analytics />
    </>
  );
}
