import { useEffect, useState } from "react";
import { useExpenseStore } from "@/context/expenseStore";
import api from "@/services/api";

export default function ExpenseTable() {
  const { selectedMonth } = useExpenseStore();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/expenses?month=${selectedMonth}`);
      setExpenses(res.data);
    };
    fetch();
  }, [selectedMonth]);

  if (!expenses.length) return <p>No expenses found for this month.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
      <h2 className="text-lg font-bold mb-4">Expenses</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm border-b border-gray-600">
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Source</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e._id} className="text-sm border-t border-gray-700">
                <td className="p-2">{e.date.slice(0, 10)}</td>
                <td className="p-2">{e.category}</td>
                <td className="p-2">{/* Map sourceId to name */}</td>
                <td className="p-2">₹{e.amount}</td>
                <td className="p-2">{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
