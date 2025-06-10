import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardPage from "@/pages/DashBoardPage";
import AddSource from "@/pages/AddSource";
import AddExpense from "@/pages/AddExpense";
import Transfers from "@/pages/TransferFunds";
import { Route, Navigate, Routes } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route path="login" element={<div />} />
      <Route path="signup" element={<div />} />
    </Route>

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/add-source"
      element={
        <ProtectedRoute>
          <AddSource />
        </ProtectedRoute>
      }
    />
    <Route
      path="/add-expense"
      element={
        <ProtectedRoute>
          <AddExpense />
        </ProtectedRoute>
      }
    />
    <Route
      path="/transfers"
      element={
        <ProtectedRoute>
          <Transfers />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/dashboard" />} />
  </Routes>
);

export default AppRoutes;
