import { useBudgetExpenses } from "@/hooks/useBudgetExpenses";

export default function BudgetBar() {
  const { budget, totalSpent, percent } = useBudgetExpenses();

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span>Monthly Budget Usage</span>
        <span>
          ₹{totalSpent} / ₹{budget}
        </span>
      </div>
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded">
        <div
          className={`h-4 rounded ${
            percent < 70
              ? "bg-green-500"
              : percent < 100
              ? "bg-yellow-500"
              : "bg-red-600"
          }`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
