import { Popover } from "@headlessui/react";
import { useState, useRef, useEffect } from "react";
import { useExpenseStore } from "@/context/expenseStore";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

export default function MonthSelectors() {
  const { selectedMonth, setSelectedMonth } = useExpenseStore();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const panelRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        document.activeElement?.blur(); // Blur the Popover.Button
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (monthIndex, close) => {
    const formatted = `${selectedYear}-${String(monthIndex + 1).padStart(
      2,
      "0"
    )}`;
    setSelectedMonth(formatted);
    close(); // close popover
  };

  return (
    <Popover className="relative inline-block">
      {({ close }) => (
        <>
          <Popover.Button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none">
            {selectedMonth ? `Month: ${selectedMonth}` : "Select Month"}
          </Popover.Button>

          <Popover.Panel
            ref={panelRef}
            className="absolute z-10 mt-2 bg-white dark:bg-gray-800 p-4 rounded-md shadow-xl w-64 border dark:border-gray-700"
          >
            <div className="mb-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {months.map((month, i) => (
                <button
                  key={month}
                  onClick={() => handleSelect(i, close)}
                  className="rounded px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
                >
                  {month}
                </button>
              ))}
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
