import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 text-white md:hidden p-4">
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      )}

      <div className="flex">
        {/* Sidebar for desktop only */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="md:ml-64 flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Topbar onHamburgerClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
