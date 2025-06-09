import { create } from "zustand";
import api from "@/services/api/api";

export const useExpenseStore = create((set, get) => ({
  expenses: [],

  selectedMonth: (() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  })(),
  setSelectedMonth: (month) => set({ selectedMonth: month }),

  fetchExpenses: async () => {
    const selectedMonth = get().selectedMonth;
    const res = await api.get(`/expenses/?month=${selectedMonth}`);
    set({ expenses: res.data });
    return res.data;
  },
}));
