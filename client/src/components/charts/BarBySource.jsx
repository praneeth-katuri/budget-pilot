import { Bar } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useExpenseStore } from "@/context/expenseStore";
import { useSourceStore } from "@/context/sourceStore";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COLORS = [
  "#60A5FA",
  "#F472B6",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#F87171",
  "#4ADE80",
  "#FACC15",
  "#38BDF8",
  "#818CF8",
  "#FB7185",
  "#14B8A6",
  "#D8B4FE",
  "#FCD34D",
];

export default function BarBySource() {
  const selectedMonth = useExpenseStore((s) => s.selectedMonth);
  const sourceMap = useSourceStore((s) => s.sourceMap);
  const expenses = useExpenseStore((s) => s.expenses);
  const [data, setData] = useState({});
  const rawAmountsRef = useRef([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const grouped = expenses.reduce((acc, curr) => {
          acc[curr.sourceId] = (acc[curr.sourceId] || 0) + curr.amount;
          return acc;
        }, {});

        const totalAmount = Object.values(grouped).reduce((a, b) => a + b, 0);

        const labels = Object.keys(grouped).map(
          (id) => sourceMap[id] || "Unknown"
        );
        const amounts = Object.values(grouped);
        const percentages = amounts.map((val) =>
          parseFloat(((val / totalAmount) * 100).toFixed(2))
        );
        const backgroundColors = labels.map(
          (_, i) => COLORS[i % COLORS.length]
        );

        rawAmountsRef.current = amounts;

        setData({
          labels,
          datasets: [
            {
              label: "Spent (%)",
              data: percentages,
              backgroundColor: backgroundColors,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch data for bar chart:", err);
      }
    };

    fetchData();
  }, [expenses, selectedMonth, sourceMap]);

  if (!data.labels?.length) return <p>No data for this month.</p>;

  return (
    <div className="h-[300px]">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
              },
              title: {
                display: true,
                text: "Percentage of Total Spending",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                generateLabels: (chart) => {
                  const dataset = chart.data.datasets[0];
                  return chart.data.labels.map((label, i) => ({
                    text: label,
                    fillStyle: dataset.backgroundColor[i],
                    strokeStyle: dataset.backgroundColor[i],
                    index: i,
                  }));
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const amount = rawAmountsRef.current[ctx.dataIndex];
                  const percent = ctx.dataset.data[ctx.dataIndex];
                  return `₹${amount.toLocaleString()} (${percent}%)`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
