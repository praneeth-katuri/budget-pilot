import PieByCategory from "../charts/PieByCategory";
import BarBySource from "../charts/BarBySource";

export default function ChartsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl w-full overflow-hidden shadow">
        <h2 className="text-lg font-bold mb-2">Expenses by Category</h2>
        <PieByCategory />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-2">Expenses by Source</h2>
        <BarBySource />
      </div>
    </div>
  );
}
