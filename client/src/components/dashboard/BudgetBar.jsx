import { useExpenseStore } from "@/context/expenseStore";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function BudgetBar() {
  const { selectedMonth } = useExpenseStore();
  const [budget, setBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [expensesRes, userRes] = await Promise.all([
        api.get(`/expenses?month=${selectedMonth}`),
        api.get("/auth/me"), // or /users/me depending on your route
      ]);

      const total = expensesRes.data.reduce((acc, exp) => acc + exp.amount, 0);
      setTotalSpent(total);
      setBudget(userRes.data.monthlyBudget);
    };

    fetchData();
  }, [selectedMonth]);

  const percent = Math.min((totalSpent / budget) * 100, 100);

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
