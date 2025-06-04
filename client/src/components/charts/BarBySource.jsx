import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useExpenseStore } from "@/context/expenseStore";
import api from "@/services/api";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarBySource() {
  const { selectedMonth } = useExpenseStore();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const expensesRes = await api.get(`/expenses?month=${selectedMonth}`);
      const sourcesRes = await api.get("/sources");

      const grouped = expensesRes.data.reduce((acc, curr) => {
        acc[curr.sourceId] = (acc[curr.sourceId] || 0) + curr.amount;
        return acc;
      }, {});

      const sourceMap = sourcesRes.data.reduce((acc, s) => {
        acc[s._id] = s.name;
        return acc;
      }, {});

      const labels = Object.keys(grouped).map(
        (id) => sourceMap[id] || "Unknown"
      );
      const values = Object.values(grouped);

      setData({
        labels,
        datasets: [
          {
            label: "Spent",
            data: values,
            backgroundColor: "#60A5FA",
          },
        ],
      });
    };

    fetchData();
  }, [selectedMonth]);

  if (!data.labels?.length) return <p>No data for this month.</p>;

  return (
    <div className="max-h-[300px] overflow-y-auto">
      <Bar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}
