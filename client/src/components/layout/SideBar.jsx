import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import Logo from "@/assets/Logo.png";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Add Source", path: "/add-source" },
  { name: "Add Expense", path: "/add-expense" },
  { name: "Transfers", path: "/transfers" },
];

export default function Sidebar({ onClose }) {
  const location = useLocation();

  return (
    <aside className="bg-gray-900 text-white w-full md:w-64 h-screen p-4 fixed left-0 top-0">
      {/* Only show close button if onClose prop exists (mobile mode) */}

      <div className="flex justify-between md:justify-start md:gap-2 items-center text-xl font-bold mb-6">
        <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full block" />
        <span className="text-2xl">Budget Pilot</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "block px-3 py-2 rounded hover:bg-gray-800",
              location.pathname === item.path && "bg-gray-800"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
