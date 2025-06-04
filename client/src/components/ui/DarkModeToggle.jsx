import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((v) => !v)}
      className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded text-sm"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
