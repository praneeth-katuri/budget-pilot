import { useLocation } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <AuthForm isLogin={isLogin} />
    </main>
  );
}
