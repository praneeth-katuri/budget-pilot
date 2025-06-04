import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Add Source", path: "/add-source" },
  { name: "Add Expense", path: "/add-expense" },
  { name: "Transfers", path: "/transfers" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-4 fixed left-0 top-0">
      <div className="text-xl font-bold mb-6">💸 Tracker</div>
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
