import { useAuthStore } from "@/context/authStore";

export default function Topbar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow">
      <div className="text-lg font-semibold">Welcome, {user?.email}</div>
      <div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
