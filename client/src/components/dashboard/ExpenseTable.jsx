import { useExpenseStore } from "@/context/expenseStore";
import { useSourceStore } from "@/context/sourceStore";
import { useExpenses } from "@/hooks/useExpenses";

export default function ExpenseTable() {
  useExpenses();
  const expenses = useExpenseStore((s) => s.expenses);
  const sourceMap = useSourceStore((s) => s.sourceMap);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
      <h2 className="text-lg font-bold mb-4">Expenses</h2>

      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10">
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
                  <td className="p-2 py-4">{e.date.slice(0, 10)}</td>
                  <td className="p-2">{e.category}</td>
                  <td className="p-2">{sourceMap[e.sourceId]}</td>
                  <td className="p-2">₹{e.amount}</td>
                  <td className="p-2">{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!expenses.length && (
            <p className="p-4 text-center">No expenses found for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
}
