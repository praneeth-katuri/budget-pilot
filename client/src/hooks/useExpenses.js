import { useQuery } from "@tanstack/react-query";
import { useExpenseStore } from "@/context/expenseStore";

export const useExpenses = () => {
  const selectedMonth = useExpenseStore((s) => s.selectedMonth);
  const fetchExpenses = useExpenseStore.getState().fetchExpenses;

  return useQuery({
    queryKey: ["expenses", selectedMonth],
    queryFn: fetchExpenses,
    enabled: !!selectedMonth,
  });
};
