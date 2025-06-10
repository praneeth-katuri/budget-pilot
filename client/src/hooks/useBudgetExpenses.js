import { useAuthStore } from "@/context/authStore";
import { useExpenseStore } from "@/context/expenseStore";

export const useBudgetExpenses = () => {
  const budget = useAuthStore((s) => s.user.monthlyBudget);
  const expenses = useExpenseStore((s) => s.expenses);

  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  const percent = Math.min((totalSpent / budget) * 100, 100);

  return { budget, totalSpent, percent };
};
