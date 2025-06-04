import { useExpenseStore } from "@/context/expenseStore";

export default function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useExpenseStore();

  return (
    <div className="mb-4">
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border px-3 py-2 rounded"
      />
    </div>
  );
}
