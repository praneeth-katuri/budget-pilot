import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useExpenseStore } from "@/context/expenseStore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieByCategory() {
  const expenses = useExpenseStore((s) => s.expenses);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const grouped = expenses.reduce((acc, curr) => {
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
  }, [expenses]);

  if (!data.labels?.length) return <p>No data for this month.</p>;

  return (
    <div className="h-[300px] flex justify-center m-4">
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
