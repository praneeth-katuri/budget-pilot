import { useAuthStore } from "@/context/authStore";
import DarkModeToggle from "../ui/DarkModeToggle";
import { Menu } from "lucide-react";

export default function Topbar({ onHamburgerClick }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex items-center gap-4">
        {/* Mobile only hamburger */}
        <button
          onClick={onHamburgerClick}
          className="md:hidden text-gray-900 dark:text-white"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-lg font-semibold">Welcome, {user?.name}</div>
      </div>
      <div className="flex items-center">
        <DarkModeToggle />
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
