import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useExpenseStore } from "@/context/expenseStore";
import api from "@/services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieByCategory() {
  const { selectedMonth } = useExpenseStore();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/expenses?month=${selectedMonth}`);
      const grouped = res.data.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});

      setData({
        labels: Object.keys(grouped),
        datasets: [
          {
            data: Object.values(grouped),
            backgroundColor: [
              "#34D399",
              "#60A5FA",
              "#FBBF24",
              "#F87171",
              "#A78BFA",
              "#F472B6",
              "#FDBA74",
              "#4ADE80",
            ],
          },
        ],
      });
    };

    fetchData();
  }, [selectedMonth]);

  if (!data.labels?.length) return <p>No data for this month.</p>;

  return <Pie data={data} />;
}
