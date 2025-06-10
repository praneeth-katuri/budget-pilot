import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
